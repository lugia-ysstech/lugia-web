/**
 *
 * create by szfeng
 *
 * @flow
 */
import '../common/shirm';
import Theme from '../theme';
import React from 'react';
import InputTag from '../inputtag';
import Trigger from '../trigger';
import Tree from '../tree/index.js';
import ThemeHoc from '@lugia/theme-hoc';
import Widget from '../consts/index';
import { deepMerge } from '@lugia/object-utils';
import ValidateHoc from '../input/validateHoc';
import Support from '../common/FormFieldWidgetSupport';
import QueryInput from '../common/QueryInput';
import { getNewValueOrOldValue } from '../select';
import { appendCustomValue, getTheme, setNewValue } from '../common/selectFunction';
import { DefaultHelp } from '../css/input';
import { getInputtagThemeHoc } from '../select/utils';
import { PopupMenuWrap } from '../css/select';
import changeColor from '../css/utilsColor';
import get from '../css/theme-common-dict';

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
  onFocus?: Function,
  onBlur?: Function,
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
  getPartOfThemeHocProps: Function,
  renderSuffixItems?: Function,
  onRightClick?: Function,
  pullIconClass?: string,
  clearIconClass?: string,
  canClear?: boolean,
  isShowClearButton?: boolean,
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
  menuVisible: Boolean,
};

const DefaultLimitCount = 999999;

class TreeSelect extends React.Component<TreeSelectProps, TreeSelectState> {
  static defaultProps = {
    getTheme() {
      return {};
    },
    mutliple: false,
    onlySelectLeaf: true,
    canInput: false,
    valueField: 'value',
    displayField: 'text',
    mode: 'local',
    createPortal: true,
    throttle: 200,
    disabled: false,
    canSearch: false,
    expandAll: false,
    translateTreeData: false,
    isShowClearButton: true,
    pullIconClass: 'lugia-icon-direction_down',
    clearIconClass: 'lugia-icon-reminder_close',
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
      menuVisible: false,
    };
    this.changeOldValue(value);
    this.treeVisible = false;
    this.inputTag = React.createRef();
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
      state.treeWidth !== nextState.treeWidth ||
      props.disabled !== nextProps.disabled ||
      props.validateStatus !== nextProps.validateStatus ||
      props.help !== nextProps.help ||
      props.mutliple !== nextProps.mutliple ||
      props.svThemVersion !== nextProps.svThemVersion ||
      state.selectCount !== nextState.selectCount ||
      state.value !== nextState.value ||
      state.displayValue !== nextState.displayValue ||
      state.menuVisible !== nextState.menuVisible
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

  getContainerWidth = () => {
    return this.state.treeWidth;
  };

  getTreeTheme = () => {
    const { mutliple } = this.props;
    const width = this.getContainerWidth();

    const initMenuTheme = {
      width,
      boxShadow: null,
    };

    const defaultMenuTheme = {
      Container: {
        normal: initMenuTheme,
      },
      TreeItem: {
        SelectedText: {
          normal: {
            background: {
              color: mutliple ? 'transparent' : changeColor(get('themeColor'), 0, 0, 10).rgba,
            },
          },
        },
      },
    };
    return this.mergeTheme('Tree', defaultMenuTheme);
  };

  getPopupTree = () => {
    const {
      data,
      canSearch,
      mutliple,
      canInput,
      igronSelectField,
      valueField,
      displayField,
      expandAll,
      translateTreeData,
      renderSuffixItems,
      onRightClick,
    } = this.props;
    const { onSelect, ...res } = this.props;
    const { current, start, treeFilter, value, displayValue, query, selectAll } = this.state;
    const getTree: Function = (cmp: Object) => {
      this.treeCmp = cmp;
    };

    const queryInputTheme = {
      [Widget.QueryInput]: {
        OutContainer: {
          normal: {
            margin: { top: 4, right: 4, bottom: 4, left: 4 },
          },
        },
      },
    };

    const tree = [
      data && data.length !== 0 ? (
        <QueryInput
          theme={queryInputTheme}
          query={query}
          onQueryInputChange={this.onQueryInputChange}
          onQueryInputKeyDown={this.onQueryInputKeyDown}
          refreshValue={this.onRefresh}
          addClick={this.onAdd}
          isCheckedAll={selectAll}
          onCheckAll={this.onSelectAll}
          canSearch={canSearch}
          mutliple={mutliple}
          canInput={canInput}
        />
      ) : null,
      <Tree
        data={data}
        key="tree"
        {...res}
        size={'default'}
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
        renderSuffixItems={renderSuffixItems}
        onRightClick={onRightClick}
      />,
    ];
    const menuThemeConfig = this.props.getPartOfThemeProps('Menu');
    const { themeConfig } = menuThemeConfig;
    menuThemeConfig.themeConfig = deepMerge(themeConfig.Container);
    return <PopupMenuWrap themeProps={menuThemeConfig}>{tree}</PopupMenuWrap>;
  };

  getInner(props, state) {
    const {
      disabled,
      help,
      validateStatus,
      placeholder,
      createPortal,
      pullIconClass,
      clearIconClass,
      isShowClearButton,
      canClear,
      onFocus,
      onBlur,
      size = 'default',
    } = props;
    const { value, displayValue, menuVisible } = state;

    const getTreeTriger: Function = (cmp: Object) => {
      this.treeTriger = cmp;
    };
    const tree = this.getPopupTree();
    return (
      <Theme config={getInputtagThemeHoc(props)}>
        <Trigger
          themePass
          popup={tree}
          onPopupVisibleChange={this.onTreePopupVisibleChange}
          align="bottomLeft"
          key="trigger"
          offsetY={4}
          ref={getTreeTriger}
          createPortal={createPortal}
          action={disabled ? [] : ['click']}
          hideAction={['click']}
        >
          <InputTag
            size={size}
            ref={this.inputTag}
            key="inputtag"
            help={help}
            menuVisible={menuVisible}
            value={value}
            displayValue={displayValue}
            validateStatus={validateStatus}
            onChange={this.onInputTagChange}
            onPopupVisibleChange={this.onInputTagPopupVisibleChange}
            disabled={disabled}
            createPortal={createPortal}
            placeholder={placeholder}
            mutliple={this.isMutliple()}
            onClear={this.onClear}
            pullIconClass={pullIconClass}
            clearIconClass={clearIconClass}
            canClear={canClear}
            isShowClearButton={isShowClearButton}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </Trigger>
      </Theme>
    );
  }

  onClear = (e: Object) => {
    const { onClear } = this.props;
    onClear && onClear(e);
  };

  setPopupVisible(...rest: any[]) {
    this.treeTriger && this.treeTriger.setPopupVisible(...rest);
  }

  render() {
    const { props, state } = this;

    return this.getInner(props, state);
  }

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
    this.setState({ menuVisible: visible });
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
    return this.inputTag.current.getThemeTarget();
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

  componentDidMount() {
    setTimeout(() => {
      const treeWidth = this.inputTag.current.getThemeTarget().container.offsetWidth;
      this.setState({
        treeWidth,
      });
    }, 0);
  }

  componentDidCatch() {
    this.setState({ start: 0 });
  }
}

export default ThemeHoc(ValidateHoc(TreeSelect), Widget.TreeSelect, { hover: true });
