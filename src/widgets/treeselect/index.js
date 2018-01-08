/**
 *
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';

import React from 'react';
import InputTag from '../inputtag';
import Input from '../input';
import Trigger from '../trigger';
import Tree from '../tree';
import Theme from '../theme';
import '../css/sv.css';
import * as Widget from '../consts/Widget';
import ThemeProvider from '../common/ThemeProvider';
import styled from 'styled-components';
import Support from '../common/FormFieldWidgetSupport';
import AddIcon from '../icon/AddIcon';
import Refresh from '../icon/RefreshIcon';
import CheckIcon from '../icon/CheckIcon';
import ClearIcon from '../icon/ClearIcon';
import { FontSize, } from '../css';
import QueryInput, { QueryInputPadding, } from '../common/QueryInputContainer';
import { DefaultHeight, MenuItemHeight, } from '../css/tree';

import { adjustValue, } from '../utils';
import { DefaultHelp, } from '../css/input';

type ValidateStatus = 'sucess' | 'error';

type TreeSelectProps = {
  validateStatus: ValidateStatus,
  help?: string;

  data: Array<Object>,
  getTheme: Function,
  value?: Array<string>,
  displayValue?: Array<string>,
  svThemVersion?: number;
  onRefresh?: Function,
  displayField: string,
  defaultValue?: string,
  mutliple: boolean,
  onlySelectLeaf: boolean,
  igronSelectField?: string,
  onTrigger?: Function,
  onChange?: Function,
  onSelect?: Function,

  splitQuery?: string,
  onQuery?: Function,
  mode: 'local' | 'remote',
  throttle: number,
  limitCount: number,
  canInput: boolean,
  disabled: boolean,
  placeholder?: string,
  defaultDisplayValue?: string,
};
type TreeSelectState = {
  open: boolean,
  treeFilter: string,
  value: Array<string>,
  displayValue: Array<string>,
  query: string,
  selectAll: boolean,
  current: number,
  selectCount: number,
  end: number,
  start: number,
  themeConfig: Object
};
const SelectedIcon = 'SelectedIcon';
const Text = styled.span`
  color: white;
  font-size: ${FontSize};
  width: 100%;
  background: #108ee9;
  padding: 0.1rem;
  position: absolute;
  border-radius: 3px;
`;
Text.displayName = Widget.TreeSelectLimitTitle;

const DefaultLimitCount = 999999;

class TreeSelect extends React.Component<TreeSelectProps, TreeSelectState> {
  static defaultProps = {
    getTheme () {
      return {};
    },
    mutliple: false,
    onlySelectLeaf: false,
    canInput: false,
    displayField: 'title',
    mode: 'local',
    throttle: 200,
    disabled: false,
  };

  state: TreeSelectState;
  inputTag: Object;
  treeTriger: Object;
  oldValue: Array<string>;
  treeVisible: boolean;
  treeCmp: Object;
  queryInput: Object;
  queryHandle: number;

  constructor (props: TreeSelectProps) {
    super(props);
    const { value, displayValue, } = this.getInitValue(props);
    this.state = {
      open: false,
      query: '',
      validateStatus: 'sucess',
      help: DefaultHelp,
      treeFilter: '',
      value,
      displayValue,
      selectCount: value.length,
      current: -1,
      end: 0,
      start: 0,
      selectAll: false,
      themeConfig: this.getTheme(),
    };
    this.changeOldValue(value);
    this.treeVisible = false;
  }

  //TODO:受限问题
  //TODO: 放到Table元素中半选状态的样式问题
  //TODO: 选中结点时如果子节点特备多的时候性能有问题。
  getInitValue (props: TreeSelectProps) {
    const { value, displayValue, } = Support.getCodeItemArray(props);
    return { value, displayValue: displayValue && displayValue.length > 0 ? displayValue : [...value,], };
  }

  shouldComponentUpdate (nextProps: TreeSelectProps, nextState: TreeSelectState) {
    const { props, } = this;
    const dataChanged = props.data !== nextProps.data;
    if (dataChanged === true) {
      return true;
    }
    const { state, } = this;
    return state.query !== nextState.query ||
      state.current !== nextState.current ||
      state.treeFilter !== nextState.treeFilter ||
      state.start !== nextState.start ||
      state.selectAll !== nextState.selectAll ||
      props.disabled !== nextProps.disabled ||
      props.validateStatus !== nextProps.validateStatus ||
      props.help !== nextProps.help ||
      props.mutliple !== nextProps.mutliple ||
      props.svThemVersion !== nextProps.svThemVersion ||
      state.selectCount !== nextState.selectCount ||
      state.value !== nextState.value ||
      state.displayValue !== nextState.displayValue;
  }

  componentWillReceiveProps (nextProps: TreeSelectProps) {
    if (!Support.isNotLimit(nextProps)) {
      const { value = [], } = nextProps;
      this.changeOldValue(value);

      if (nextProps.value !== this.props.value || nextProps.displayValue !== this.props.displayValue) {
        const { value, displayValue, } = this.getInitValue(nextProps);
        this.setState({ value, displayValue, selectCount: value.length, });
      }
      if (this.props.svThemVersion !== nextProps.svThemVersion) {
        this.setState({
          themeConfig: this.getTheme(),
        });
      }
    }
  }

  render () {
    const { props, state, } = this;
    const { data, placeholder, } = props;
    const { query, value, displayValue, selectCount, treeFilter, current, start, } = state;
    const getTree: Function = (cmp: Object) => {
      this.treeCmp = cmp;
    };
    const getQueryInput: Function = (cmp: Object) => {
      this.queryInput = cmp;
    };
    const tree = [<QueryInput key="queryContainer"><Input key="queryInput" ref={getQueryInput} placeholder="输入查询条件"
                                                           value={query}
                                                           onChange={this.onQueryInputChange}
                                                           suffix={this.getSuffix()}
                                                           onKeyDown={this.onQueryInputKeyDown}/></QueryInput>,
      <Tree data={data}
            key="tree"
            {...props}
            className="sv"
            current={current}
            start={start}
            onScroller={this.onScroller}
            query={treeFilter}
            ref={getTree}
            value={value}
            onChange={this.onTreeChange}
            displayValue={displayValue}>
      </Tree>,];

    if (this.isMutliple()) {
      let str = `已选择${selectCount}个结点`;
      const { limitCount, } = props;
      if (limitCount != undefined) {
        str += `,最多可选${limitCount}个结点`;
      }
      tree.push(<Text key="selInfo">{str}.</Text>);
    }

    const getTreeTriger: Function = (cmp: Object) => {
      this.treeTriger = cmp;
    };
    const getInputTag: Function = (cmp: Object) => {
      this.inputTag = cmp;
    };
    const { disabled, help, validateStatus, } = props;
    const { themeConfig, } = state;

    return <Theme config={themeConfig} key="treesel_theme">
      <Trigger popup={tree}
               onPopupVisibleChange={this.onTreePopupVisibleChange}
               align="bottomLeft"
               key="trigger"
               ref={getTreeTriger}
               action={disabled ? [] : ['click',]}
               hideAction={['click',]}>
        <InputTag key="inputtag"
                  help={help}
                  validateStatus={validateStatus}
                  onFocus={this.onFocus}
                  disabled={disabled}
                  value={value}
                  displayValue={displayValue}
                  onChange={this.onInputTagChange}
                  mutliple={this.isMutliple()}
                  placeholder={placeholder}
                  ref={getInputTag}
                  onPopupVisibleChange={this.onInputTagPopupVisibleChange}/>
      </Trigger>
    </Theme>;
  }

  onFocus = () => {

  };

  getSuffix = () => {
    const result = [];
    if (this.isCanInput()) {
      result.push(<AddIcon key="add" onClick={this.onAdd} viewClass={SelectedIcon}></AddIcon>);
    }
    if (this.isMutliple()) {
      result.push(<CheckIcon checked={this.state.selectAll} key="selAll" onClick={this.onSelectAll}
                             viewClass={SelectedIcon}></CheckIcon>);
    }
    result.push(<Refresh key="refresh" onClick={this.onRefresh} viewClass={SelectedIcon}></Refresh>);
    result.push(<ClearIcon key="clear" onClick={this.onClearQuery} viewClass={SelectedIcon}></ClearIcon>);
    return result;
  };
  onClearQuery = () => {
    this.onQueryInputChange('');
  };
  onRefresh = () => {
    const { props, } = this;
    this.onQueryInputChange('');
    this.setValue([], [], {
      start: 0,
    });
    const { onRefresh, } = props;
    onRefresh && onRefresh();
  };

  isMutliple () {
    const { mutliple, } = this.props;
    return mutliple;
  }

  isCanInput () {
    const { canInput, } = this.props;
    return canInput;
  }

  onQueryInputKeyDown = (e: Object) => {
    const isEnter = e.keyCode === 13;
    if (isEnter) {
      this.appendValue();
    }
    const isDown = e.keyCode === 40;
    if (isDown) {
      this.setState({ current: Math.min(this.state.current + 1, this.getViewData().length - 1), });
    }
    const isUp = e.keyCode === 38;
    if (isUp) {
      this.setState({ current: Math.max(this.state.current - 1, 0), });
    }
    const isLeft = e.keyCode === 37;
    const tree = this.getTree();
    if (!tree) {
      return;
    }
    const currentRow = this.getCurrentRow();
    if (!currentRow) {
      return;
    }
    const { key, isLeaf = false, } = currentRow;

    if (isLeft) {
      if (isLeaf) {
        return;
      }
      tree.collapse(key);
    }
    const isRight = e.keyCode === 39;
    if (isRight) {
      tree.expand(key);
    }
    const isShift = e.keyCode === 16;
    const isCtrl = e.keyCode === 17;
    if (isShift || isCtrl) {
      if (this.isMutliple()) {
        tree.check(key, !tree.isChecked(key), isShift);
      } else {
        tree.select([key,]);
      }
    }
  };

  getCurrentRow (): Object | null {
    const data = this.getTree().getViewData();
    if (data && data[ this.state.current ]) {
      return data[ this.state.current ];
    }
    return null;
  }

  onAdd = () => {
    this.appendValue();
  };

  appendValue () {
    const inputValue = this.state.query;
    if (inputValue && inputValue.trim() && this.isCanInput() && !this.isLimit()) {
      clearTimeout(this.queryHandle);
      if (this.isMutliple()) {
        const { value = [], displayValue = [], } = this.state;
        const newValue = [...value,],
          newDisplayValue = [...displayValue,];
        newValue.push(inputValue);
        newDisplayValue.push(inputValue);
        this.setValue([...newValue,], [...newDisplayValue,], {});
        this.onQueryInputChange('');
      } else {
        this.setValue([inputValue,], [inputValue,], {});
        this.onQueryInputChange('');
      }
    }
  }

  isLimit (): boolean {
    const { limitCount = DefaultLimitCount, } = this.props;
    return this.state.value.length >= limitCount;
  }

  componentDidUpdate () {
    if (this.props.disabled) {
      this.setTreePopupVisible(false);
    }
    this.setState({ selectAll: this.isSelectAll(), });
  }

  onSelectAll = () => {

    const selectAll = !this.isSelectAll();
    const { onSelect, } = this.props;
    if (selectAll === true) {
      const { displayField, } = this.props;
      const data = this.getQueryData();
      const { value: stateValue, displayValue: stateDisplayValue, } = this.state;
      const value = [...stateValue,];
      const displayValue = [...stateDisplayValue,];
      let cnt = 0;

      let { limitCount = DefaultLimitCount, } = this.props;
      limitCount = limitCount - value.length;
      const inTreee = this.getInTree();
      for (let i = 0; i < data.length; i++) {
        const { key, [ displayField ]: title, } = data[ i ];
        if (inTreee[ key ]) {
          continue;
        }
        if (cnt >= limitCount) break;
        if (!this.canSelect(key)) continue;
        value.push(key);
        displayValue.push(title);
        cnt++;
      }
      onSelect && onSelect({ value, displayValue, });
      this.setValue(value, displayValue, {});
    } else {
      //TODO: 这里修改了getInputTagValueObject方法的值.
      const valueObj = this.getInputTagValueObject();
      const items = this.getQueryData();
      const len = items.length;
      for (let i = 0; i < len; i++) {
        const { key, } = items[ i ];
        const item = valueObj[ key ];
        if (item) {
          delete valueObj[ key ];
        }
      }
      const valArray = Object.keys(valueObj);
      const dispArray = [];
      for (let i = 0; i < valArray.length; i++) {
        dispArray.push(valueObj[ valArray[ i ] ].text);
      }
      onSelect && onSelect({ value: [], displayValue: [], });
      this.setValue(valArray, dispArray, {});
    }
  };

  canSelect (row: Object): boolean {
    const tree = this.getTree();
    return tree && tree.canSelect(row);
  }

  getNotInTree (): Object {
    const tree = this.getTree();
    if (!tree) {
      return {};
    }
    return tree.getNotInTree();
  }

  getInTree (): Object {
    const tree = this.getTree();
    if (!tree) {
      return {};
    }
    return tree.getInTree();
  }

  getViewData (): Array<Object> {
    if (this.treeCompontIsEmpty()) {
      return [];
    }
    return this.getTree().getViewData();
  }

  getQueryData (): Array<Object> {
    if (this.treeCompontIsEmpty()) {
      return [];
    }
    return this.getTree().getQueryData();
  }

  getTree () {
    return this.treeCmp.getThemeTarget();
  }

  isSelectAll (): boolean {
    if (this.treeCompontIsEmpty()) {
      return false;
    }
    return this.getTree().isSelectAll();
  }

  treeCompontIsEmpty () {
    return !this.treeCmp || !this.treeCmp.getThemeTarget();
  }

  onQueryInputChange = value => {
    if (value === this.state.query) {
      return;
    }
    if (this.queryHandle) {
      clearTimeout(this.queryHandle);
    }

    this.setState({ query: value, });
    const callback = () => {
      const { onQuery, mode, } = this.props;
      onQuery && onQuery(value);
      if (mode === 'local') {
        this.setState({ treeFilter: value, });
      } else {
        this.setState({ treeFilter: '', });
      }
    };

    const { throttle = -1, } = this.props;
    if (throttle > 0) {
      this.queryHandle = setTimeout(callback, throttle);
    } else {
      callback();
    }
  };

  onInputTagPopupVisibleChange = (visible: boolean) => {
    if (visible) {
      this.setTreePopupVisible(false);
    }
  };

  onTreePopupVisibleChange = (visible: boolean) => {
    const { state, } = this;
    if (visible) {
      const { onTrigger, } = this.props;
      onTrigger && onTrigger();
      let { selectCount, } = state;
      if (this.isMutliple()) {
        selectCount = this.getInputTagCount();
      }
      this.onQueryInputChange('');
      this.setState({ selectCount, }, () => {
        if (this.queryInput && this.queryInput.getThemeTarget()) {
          this.queryInput.getThemeTarget().focus();
        }
      });
    }
    this.treeVisible = visible;
  };

  onInputTagChange = ({ value, displayValue, }: Object) => {
    this.setValue(value, displayValue, {});
  };

  getInputTagCount (): number {

    const inputTag = this.getInputTag();
    if (!inputTag) {
      return 0;
    }
    return inputTag.getCount();
  }

  getInputTagValueObject (): Object {
    const inputTag = this.getInputTag();
    if (!inputTag) {
      return {};
    }
    return inputTag.getValueObject();
  }

  getInputTag () {
    if (!this.inputTag) {
      return null;
    }
    return this.inputTag.getThemeTarget();
  }

  onTreeChange = (value: Array<string>, displayValue: Array<string>) => {
    const { onSelect, } = this.props;
    onSelect && onSelect({ value, displayValue, });
    this.setValue(value, displayValue, {}, () => {
      if (!this.isMutliple()) {
        this.setTreePopupVisible(false);
      }
    });
  };

  setValue (value: Array<string>, displayValue: Array<string>, other: Object, callback = () => {}) {
    this.onChange(value, displayValue);
    if (Support.isNotLimit(this.props)) {

      const realyVal = [];
      const realDisp = [];
      if (value && value.length > 0) {
        const len = value.length;
        const isHas = {};
        for (let i = 0; i < len; i++) {
          const key = value[ i ];
          const title = displayValue[ i ];
          if (isHas[ key ]) {
            continue;
          }
          isHas[ key ] = true;
          realyVal.push(key);
          realDisp.push(title);
        }
      }
      this.setState({
        value: realyVal,
        displayValue: realDisp, ...other,
        selectCount: realyVal.length,
      }, callback);
      this.changeOldValue(value);
    }
  }

  setTreePopupVisible (visible: boolean) {
    if (this.treeTriger && this.treeTriger.getThemeTarget()) {
      this.treeTriger.getThemeTarget().setPopupVisible(visible);
    }
  }

  onChange = (value: Array<string>, displayValue: Array<string>) => {
    if (this.oldValue.length === 0 && value.length === 0) {
      return;
    }
    if (this.oldValue === value) {
      return;
    }

    const valueEqual = value && this.oldValue && value.toString() === this.oldValue.toString();
    if (valueEqual) {
      return;
    }
    if (this.oldValue !== value) {
      const { onChange, } = this.props;
      onChange && onChange({ value, displayValue, });
    }
  };

  getRows (valArray: Array<any> = []): Array<Object> {
    if (!valArray || valArray.length <= 0) {
      return [];
    }
    const tree = this.getTree();
    if (!tree) {
      return [];
    }
    return tree.getRows(valArray);
  }

  changeOldValue (value: any) {
    this.oldValue = value;
  }

  getTheme (): Object {
    const { getTheme = () => ({}), } = this.props;
    const theme = getTheme();
    const { width, } = theme;
    let queryInputConfig = {};
    if (width) {
      queryInputConfig.width = width - 2 * QueryInputPadding;
    }
    const inputTag = { ...theme, };
    queryInputConfig = Object.assign({}, theme, queryInputConfig);
    delete queryInputConfig.height;
    const treeConfig = { ...theme, };
    const { height = DefaultHeight, } = treeConfig;
    treeConfig.height = adjustValue(height, MenuItemHeight);
    return {
      [ Widget.Tree ]: treeConfig,
      [ Widget.Trigger ]: theme,
      [ Widget.InputTag ]: inputTag,
      [ SelectedIcon ]: { color: '#d9d9d9', hoverColor: '#108ee9', },
      [ Widget.Input ]: queryInputConfig,
    };
  }

  onScroller = (start: number) => {
    this.setState({ start, });
  };

  componentDidCatch () {
    this.setState({ start: 0, });
  }
}

export default ThemeProvider(TreeSelect, Widget.TreeSelect);
