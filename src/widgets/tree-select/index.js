/**
 *
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';

import React from 'react';
import InputTag from '../inputtag';
import Trigger from '../trigger';
import Tree from '../tree/index.js';
import Theme from '../theme';
import ThemeHoc from '@lugia/theme-hoc';
import Widget from '../consts/index';
import { deepMerge } from '@lugia/object-utils';
import styled from 'styled-components';
import Support from '../common/FormFieldWidgetSupport';
import QueryInput from '../common/QueryInput';
import { themeColor } from '../css/tree';
import { getNewValueOrOldValue } from '../select';
import { appendCustomValue, getTheme, setNewValue } from '../common/selectFunction';
import { DefaultHelp } from '../css/input';
import { FontSizeNumber, FontSize } from '../css';
import { px2emcss } from '../css/units';

const em = px2emcss(FontSizeNumber);

type ValidateStatus = 'success' | 'error';

type TreeSelectProps = {
  validateStatus: ValidateStatus,
  help?: string,
  data: Array<Object>,
  getTheme: Function,
  value?: Array<string>,
  displayValue?: Array<string>,
  svThemVersion?: number,
  onRefresh?: Function,
  valueField: string,
  displayField: string,
  mutliple: boolean,
  onlySelectLeaf: boolean,
  igronSelectField?: string,
  onTrigger?: Function,
  onChange?: Function,
  onSelect?: Function,
  expandAll: boolean,
  splitQuery?: string,
  onQuery?: Function,
  mode: 'local' | 'remote',
  throttle: number,
  limitCount: number,
  canInput: boolean,
  disabled: boolean,
  placeholder?: string,
  translateTreeData: boolean,
  label: string,
  labelSize: number,
  canSearch: boolean,
  createPortal?: boolean,
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
  themeConfig: Object,
};

// const Text = styled.span`
//   color: white;
//   font-size: ${FontSize};
//   width: 100%;
//   height: ${em(22)};
//   line-height: ${em(22)};
//   background: ${themeColor};
//   padding: 0 ${em(10)};
//   position: absolute;
//   border-radius: ${em(3)};
// `;

const Label = styled.span`
  display: inline-block;
  text-overflow: ellipsis;
  width: ${props => (props.size ? `${em(props.size)}` : 'auto')};
  overflow: hidden;
  white-space: nowrap;
  float: left;
`;
const FloatLeft = styled.div`
  float: left;
`;
const ClearFloat = styled.div`
  clear: both;
  height: 0;
  width: 0;
  line-height: 0;
  font-size: 0;
`;

Text.displayName = Widget.TreeSelectLimitTitle;

const DefaultLimitCount = 999999;

class TreeSelect extends React.Component<TreeSelectProps, TreeSelectState> {
  static defaultProps = {
    getTheme() {
      return {};
    },
    mutliple: false,
    onlySelectLeaf: false,
    canInput: false,
    valueField: 'value',
    displayField: 'text',
    mode: 'local',
    createPortal: false,
    throttle: 200,
    disabled: false,
    canSearch: false,
    expandAll: false,
    translateTreeData: false,
  };

  state: TreeSelectState;
  inputTag: Object;
  treeTriger: Object;
  oldValue: Array<string>;
  treeVisible: boolean;
  treeCmp: Object;
  queryInput: Object;
  queryHandle: TimeoutID;

  constructor(props: TreeSelectProps) {
    super(props);
    const { value, displayValue } = this.getInitValue(props);
    this.state = {
      open: false,
      query: '',
      validateStatus: 'success',
      help: DefaultHelp,
      treeFilter: '',
      value,
      displayValue,
      selectCount: value.length,
      current: -1,
      end: 0,
      start: 0,
      selectAll: false,
      themeConfig: this.getCurrentTheme(),
    };
    this.changeOldValue(value);
    this.treeVisible = false;
  }

  //TODO:受限问题
  //TODO: 放到Table元素中半选状态的样式问题
  //TODO: 选中结点时如果子节点特备多的时候性能有问题。
  getInitValue(props: TreeSelectProps) {
    const { value, displayValue } = Support.getCodeItemArray(props);
    return {
      value,
      displayValue: displayValue && displayValue.length > 0 ? displayValue : [...value],
    };
  }

  shouldComponentUpdate(nextProps: TreeSelectProps, nextState: TreeSelectState) {
    const { props } = this;
    const dataChanged = props.data !== nextProps.data;
    if (dataChanged === true) {
      return true;
    }
    const { state } = this;
    return (
      state.query !== nextState.query ||
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
      state.displayValue !== nextState.displayValue
    );
  }

  componentWillReceiveProps(nextProps: TreeSelectProps) {
    if (!Support.isNotLimit(nextProps)) {
      const { value = [] } = nextProps;
      this.changeOldValue(value);

      if (
        nextProps.value !== this.props.value ||
        nextProps.displayValue !== this.props.displayValue
      ) {
        const { value, displayValue } = this.getInitValue(nextProps);
        this.setState({ value, displayValue, selectCount: value.length });
      }
      if (this.props.svThemVersion !== nextProps.svThemVersion) {
        this.setState({
          themeConfig: this.getCurrentTheme(),
        });
      }
    }
  }

  getLabel(props) {
    /* create by ZhangBoPing */
    const { label, labelSize } = props;
    return (
      <Label key="textLabel" size={labelSize}>
        {label}
      </Label>
    );
  }

  mergeTheme = (target: string, defaultTheme: Object) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(target);

    const themeHoc = deepMerge(
      {
        [viewClass]: { ...defaultTheme },
      },
      theme
    );

    const newTheme = {
      viewClass,
      theme: themeHoc,
    };
    return newTheme;
  };

  getTreeTheme = () => {
    const { getPartOfThemeConfig } = this.props;
    const { InputTagWrap = {} } = getPartOfThemeConfig('InputTag');
    const { normal = {} } = InputTagWrap;
    const { width = 250 } = normal;
    const defaultMenuTheme = {
      TreeWrap: {
        normal: {
          width,
        },
      },
    };
    return this.mergeTheme('Tree', defaultMenuTheme);
  };

  getTreeTheme() {
    const { getPartOfThemeConfig } = this.props;
    const config = {
      [Widget.Tree]: getPartOfThemeConfig('Tree'),
    };
    return config;
  }

  getInner(props, state) {
    /* create by ZhangBoPing */
    const {
      data,
      disabled,
      help,
      validateStatus,
      placeholder,
      canSearch,
      mutliple,
      canInput,
      igronSelectField,
      valueField,
      displayField,
      expandAll,
      translateTreeData,
      createPortal,
    } = props;
    const { onSelect, ...res } = props;

    const {
      current,
      start,
      treeFilter,
      value,
      displayValue,
      selectCount,
      query,
      selectAll,
    } = state;

    const getTree: Function = (cmp: Object) => {
      this.treeCmp = cmp;
    };
    const { InputTagWrap = {} } = this.props.getPartOfThemeConfig('InputTag');
    const { normal = {} } = InputTagWrap;
    const { width = 250 } = normal;
    const tree = [
      <QueryInput
        query={query}
        width={width}
        onQueryInputChange={this.onQueryInputChange}
        onQueryInputKeyDown={this.onQueryInputKeyDown}
        refreshValue={this.onRefresh}
        addClick={this.onAdd}
        isCheckedAll={selectAll}
        onCheckAll={this.onSelectAll}
        canSearch={canSearch}
        mutliple={mutliple}
        canInput={canInput}
      />,
      <Tree
        data={data}
        key="tree"
        {...res}
        {...this.getTreeTheme()}
        current={current}
        start={start}
        expandAll={expandAll}
        onScroller={this.onScroller}
        query={treeFilter}
        ref={getTree}
        value={value}
        onChange={this.onTreeChange}
        valueField={valueField}
        displayField={displayField}
        displayValue={displayValue}
        igronSelectField={igronSelectField}
        translateTreeData={translateTreeData}
      />,
    ];

    // if (this.isMutliple()) {
    //   let str = `已选择${selectCount}个结点`;
    //   const { limitCount } = props;
    //   if (limitCount != undefined) {
    //     str += `,最多可选${limitCount}个结点`;
    //   }
    //   tree.push(<Text key="selInfo">{str}.</Text>);
    // }

    const getTreeTriger: Function = (cmp: Object) => {
      this.treeTriger = cmp;
    };
    const getInputTag: Function = (cmp: Object) => {
      this.inputTag = cmp;
    };
    return (
      <Trigger
        themePass
        popup={tree}
        onPopupVisibleChange={this.onTreePopupVisibleChange}
        align="bottomLeft"
        key="trigger"
        ref={getTreeTriger}
        createPortal={createPortal}
        action={disabled ? [] : ['click']}
        hideAction={['click']}
      >
        <InputTag
          key="inputtag"
          help={help}
          validateStatus={validateStatus}
          {...this.props.getPartOfThemeHocProps('InputTag')}
          onFocus={this.onFocus}
          disabled={disabled}
          value={value}
          displayValue={displayValue}
          onChange={this.onInputTagChange}
          mutliple={this.isMutliple()}
          placeholder={placeholder}
          ref={getInputTag}
          onPopupVisibleChange={this.onInputTagPopupVisibleChange}
        />
      </Trigger>
    );
  }

  setPopupVisible(...rest: any[]) {
    this.treeTriger && this.treeTriger.setPopupVisible(...rest);
  }

  render() {
    /* update by ZhangBoPing */
    const { props, state } = this;

    const { label } = props;
    const { themeConfig } = state;

    return (
      <Theme config={themeConfig} key="treesel_theme">
        {label
          ? [
              this.getLabel(props),
              <FloatLeft key="floatLeft">{this.getInner(props, state)}</FloatLeft>,
              <ClearFloat key="clearFloat" />,
            ]
          : this.getInner(props, state)}
      </Theme>
    );
  }

  onFocus = () => {};

  onClearQuery = () => {
    this.onQueryInputChange('');
  };
  onRefresh = (e: Object) => {
    const { props } = this;
    this.onQueryInputChange('');
    this.setValue([], [], {
      start: 0,
    });
    const { onRefresh } = props;
    onRefresh && onRefresh(e);
  };

  isMutliple() {
    const { mutliple } = this.props;
    return mutliple;
  }

  isCanInput() {
    const { canInput } = this.props;
    return canInput;
  }

  onQueryInputKeyDown = (e: Object) => {
    const isEnter = e.keyCode === 13;
    if (isEnter) {
      this.appendValue();
    }
    const isDown = e.keyCode === 40;
    if (isDown) {
      this.setState({ current: Math.min(this.state.current + 1, this.getViewData().length - 1) });
    }
    const isUp = e.keyCode === 38;
    if (isUp) {
      this.setState({ current: Math.max(this.state.current - 1, 0) });
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
    const { key, isLeaf = false } = currentRow;

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
        tree.select([key]);
      }
    }
  };

  getCurrentRow(): Object | null {
    const data = this.getTree().getViewData();
    if (data && data[this.state.current]) {
      return data[this.state.current];
    }
    return null;
  }

  onAdd = () => {
    this.appendValue();
  };

  appendValue() {
    const { props, state } = this;
    const { query, value, displayValue } = state;
    const inputValue = query;
    if (inputValue && inputValue.trim() && this.isCanInput() && !this.isLimit()) {
      clearTimeout(this.queryHandle);

      const { newValue, newDisplayValue } = appendCustomValue(props, query, value, displayValue);
      this.setValue([...newValue], [...newDisplayValue], {});
      this.onQueryInputChange('');
    }
  }

  isLimit(): boolean {
    const { limitCount = DefaultLimitCount } = this.props;
    return this.state.value.length >= limitCount;
  }

  componentDidUpdate() {
    if (this.props.disabled) {
      this.setTreePopupVisible(false);
    }
    this.setState({ selectAll: this.isSelectAll() });
  }

  getItems = (value: string[]) => {
    const length = value.length;

    if (length === 0) {
      return [];
    }

    const { data = [], valueField } = this.props;

    return data.filter(item => {
      const key = item[valueField];
      return value.indexOf(key) !== -1;
    });
  };

  expandOnSelect = (value: string[], displayValue: string[]) => {
    const { onSelect } = this.props;
    const items = this.getItems(value);
    onSelect && onSelect(value, displayValue, items);
  };

  onSelectAll = () => {
    const selectAll = !this.isSelectAll();
    const { displayField, valueField } = this.props;
    if (selectAll === true) {
      const data = this.getQueryData();
      const { value: stateValue, displayValue: stateDisplayValue } = this.state;
      const value = [...stateValue];
      const displayValue = [...stateDisplayValue];
      let cnt = 0;

      let { limitCount = DefaultLimitCount } = this.props;
      limitCount = limitCount - value.length;
      const inTreee = this.getInTree();
      for (let i = 0; i < data.length; i++) {
        const { [valueField]: key, [displayField]: title } = data[i];
        if (inTreee[key]) {
          continue;
        }
        if (cnt >= limitCount) break;
        if (!this.canSelect(key)) continue;
        value.push(key);
        displayValue.push(title);
        cnt++;
      }
      this.expandOnSelect(value, displayValue);
      this.setValue(value, displayValue, {});
    } else {
      //TODO: 这里修改了getInputTagValueObject方法的值.
      const valueObj = this.getInputTagValueObject();

      const items = this.getQueryData();
      const len = items.length;
      for (let i = 0; i < len; i++) {
        const { [valueField]: key } = items[i];
        const item = valueObj[key];
        if (item) {
          delete valueObj[key];
        }
      }
      const valArray = Object.keys(valueObj);

      const dispArray = [];
      for (let i = 0; i < valArray.length; i++) {
        dispArray.push(valueObj[valArray[i]][displayField]);
      }
      this.expandOnSelect([], []);
      this.setValue(valArray, dispArray, {});
    }
  };

  canSelect(key: string): boolean {
    const tree = this.getTree();
    return tree && tree.canSelect(key);
  }

  getNotInTree(): Object {
    const tree = this.getTree();
    if (!tree) {
      return {};
    }
    return tree.getNotInTree();
  }

  getInTree(): Object {
    const tree = this.getTree();
    if (!tree) {
      return {};
    }
    return tree.getInTree();
  }

  getViewData(): Array<Object> {
    if (this.treeCompontIsEmpty()) {
      return [];
    }
    return this.getTree().getViewData();
  }

  getQueryData(): Array<Object> {
    if (this.treeCompontIsEmpty()) {
      return [];
    }
    return this.getTree().getQueryData();
  }

  getTree() {
    return this.treeCmp.innerTree.current.getThemeTarget();
  }

  isSelectAll(): boolean {
    if (this.treeCompontIsEmpty()) {
      return false;
    }
    return this.getTree().isSelectAll();
  }

  treeCompontIsEmpty() {
    return !this.treeCmp || !this.treeCmp.innerTree.current;
  }

  onQueryInputChange = (nextValue: any) => {
    const { newValue } = nextValue;
    const value = newValue ? newValue : '';

    if (value === this.state.query) {
      return;
    }
    if (this.queryHandle) {
      clearTimeout(this.queryHandle);
    }

    this.setState({ query: value });
    const callback = () => {
      const { onQuery, mode } = this.props;
      onQuery && onQuery(value);
      if (mode === 'local') {
        this.setState({ treeFilter: value });
      } else {
        this.setState({ treeFilter: '' });
      }
    };

    const { throttle = -1 } = this.props;
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
    const { state } = this;
    if (visible) {
      const { onTrigger } = this.props;
      onTrigger && onTrigger();
      let { selectCount } = state;
      if (this.isMutliple()) {
        selectCount = this.getInputTagCount();
      }
      this.onQueryInputChange('');
      this.setState({ selectCount }, () => {
        if (this.queryInput && this.queryInput.getThemeTarget()) {
          this.queryInput.getThemeTarget().focus();
        }
      });
    }
    this.treeVisible = visible;
  };

  onInputTagChange = ({ value, displayValue }: Object) => {
    this.setValue(value, displayValue, {});
  };

  getInputTagCount(): number {
    const inputTag = this.getInputTag();
    if (!inputTag) {
      return 0;
    }
    return inputTag.getCount();
  }

  getInputTagValueObject(): Object {
    const inputTag = this.getInputTag();
    if (!inputTag) {
      return {};
    }
    return inputTag.getValueObject();
  }

  getInputTag() {
    if (!this.inputTag) {
      return null;
    }
    return this.inputTag.getThemeTarget();
  }

  onTreeChange = (value: Array<string>, displayValue: Array<string>) => {
    this.expandOnSelect(value, displayValue);
    this.setValue(value, displayValue, {}, () => {
      if (!this.isMutliple()) {
        this.setTreePopupVisible(false);
      }
    });
  };

  setValue(value: Array<string>, displayValue: Array<string>, other: Object, callback = () => {}) {
    this.onChange(value, displayValue);
    if (Support.isNotLimit(this.props)) {
      const { realyVal, realDisp } = setNewValue(value, displayValue);
      this.setState(
        {
          value: realyVal,
          displayValue: realDisp,
          ...other,
          selectCount: realyVal.length,
        },
        callback
      );
      this.changeOldValue(value);
    }
  }

  setTreePopupVisible(visible: boolean) {
    if (this.treeTriger && this.treeTriger.getThemeTarget()) {
      this.treeTriger.getThemeTarget().setPopupVisible(visible);
    }
  }

  onChange = (value: Array<string>, displayValue: Array<string>) => {
    const { mutliple } = this.props;
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
      const { onChange } = this.props;

      const newItem = getNewValueOrOldValue(this.getItems(value), mutliple);
      const oldItem = getNewValueOrOldValue(this.getItems(this.oldValue), mutliple);
      const obj = {
        newValue: value,
        oldValue: this.oldValue,
        newItem,
        oldItem,
        newDisplayValue: displayValue,
      };

      onChange && onChange(obj);
    }
    if (!mutliple) {
      this.setTreePopupVisible(false);
    }
  };

  getRows(valArray: Array<any> = []): Array<Object> {
    if (!valArray || valArray.length <= 0) {
      return [];
    }
    const tree = this.getTree();
    if (!tree) {
      return [];
    }
    return tree.getRows(valArray);
  }

  changeOldValue(value: any) {
    this.oldValue = value;
  }

  getCurrentTheme(): Object {
    return getTheme(this.props, Widget.Tree);
  }

  onScroller = (start: number) => {
    this.setState({ start });
  };

  componentDidCatch() {
    this.setState({ start: 0 });
  }
}

// export default ThemeProvider(TreeSelect, Widget.TreeSelect);
export default ThemeHoc(TreeSelect, Widget.TreeSelect, { hover: true });
