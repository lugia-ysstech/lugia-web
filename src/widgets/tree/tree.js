/**
 *
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import type { ExpandInfo, NodeId2ExtendInfo, NodeId2SelectInfo, QueryType } from '@lugia/lugia-web';
import animation from '../common/openAnimation';
import ThemeHoc from '@lugia/theme-hoc';
import Empty from '../empty';
import * as React from 'react';
import { TreeNode } from './rc-tree';
import Support from '../common/FormFieldWidgetSupport';
import ThrottleTree from './ThrottleTree';
import Widget from '../consts/index';
import './index.css';
import TreeUtils from './utils';
import { deleteValue } from '../utils/index';
import styled from 'styled-components';
import { FontSize, FontSizeNumber } from '../css';
import { px2emcss } from '../css/units';

const em = px2emcss(FontSizeNumber);

type RowData = { [key: string]: any };
export type TreeProps = {
  start: number,
  end: number,
  query: string,
  pathSeparator?: string,
  onScroller?: Function,
  /** 是否支持多选 */
  mutliple?: boolean,
  limitCount?: number,
  /** 默认展开所有树节点 */
  expandAll: boolean,
  onlySelectLeaf: boolean,
  displayField: string,
  valueField: string,
  igronSelectField?: string,
  value: ?Array<string>,
  displayValue: ?Array<string>,
  defaultValue: ?Array<string> | string,
  svThemVersion?: number,
  /** 展开/收起节点时触发 */
  onExpand?: Function,
  /** 点击树节点触发 */
  onSelect?: Function,
  /**
   * 当值发生变化的时候出发
   */
  onChange?: Function,
  /**
   * 子项选中后,父级是否高亮
   */
  parentIsHighlight?: boolean,
  getTreeData?: Function,
  splitQuery?: string,
  current: number,
  data?: Array<RowData>,
  inlineType: 'primary' | 'ellipse',
  blackList: ?(string[]),
  whiteList: ?(string[]),
  searchType?: QueryType,
  shape: 'default' | 'round',
  showSwitch: boolean,
  __navmenu: boolean,
  __dontShowEmpty?: boolean,
  switchAtEnd?: boolean,
  switchIconNames?: Object,
  getPartOfThemeProps: Function,
  renderSuffixItems?: Function,
  onRightClick?: Function,
  theme?: Object,
};

export type TreeState = {
  start: number,
  expand: ExpandInfo,
  selectedInfo: NodeId2SelectInfo,
  expandedKeys: Array<string>,
  selectValue?: Array<string>,
  hasError: boolean,
  parentHighlightKeys: Array<string>,
};
const EmptyBox = styled.span`
  font-size: ${FontSize};
  line-height: ${em(20)};
  text-align: center;
  display: block;
`;

const ErrorTooltip = styled(EmptyBox)`
  color: red;
`;

class Tree extends React.Component<TreeProps, TreeState> {
  static displayName = Widget.Tree;
  static defaultProps = {
    expandAll: false,
    mutliple: false,
    pathSeparator: '|',
    defaultValue: '',
    displayField: 'title',
    valueField: 'key',
    onlySelectLeaf: false,
    query: '',
    current: -1,
    openAnimation: animation,
    igronSelectField: 'disabled',
    inlineType: 'primary',
    parentIsHighlight: false,
    shape: 'default',
    showSwitch: true,
    __navmenu: false,
    switchAtEnd: false,
    switchIconNames: {
      open: 'lugia-icon-direction_caret_down',
      close: 'lugia-icon-direction_caret_right',
    },
  };

  static TreeNode: TreeNode;

  allExpandKeys: Array<string> | null;
  allExpandInfo: ExpandInfo;
  allStart: number;
  queryAllUtils: TreeUtils;
  utils: TreeUtils;
  value: any;
  data: Array<RowData>;
  end: number;
  canSeeCount: number;

  constructor(props: TreeProps) {
    super(props);
    this.allExpandInfo = this.getEmptyExpandInfo();
    this.allStart = 0;
    this.end = 0;
    this.canSeeCount = 0;

    this.createQueryAllTreelUtils(props);
    if (this.isEmpty(props)) {
      this.state = {
        start: 0,
        hasError: false,
        expandedKeys: [],
        expand: this.getEmptyExpandInfo(),
        selectValue: [],
        selectedInfo: this.getEmptyNodeId2SelectInfo(),
        parentHighlightKeys: [],
        __dontShowEmpty: false,
      };
      return;
    }

    const expand = this.updateExpandInfo(props);
    const { id2ExtendInfo } = expand;
    const state = {
      hasError: false,
      start: Support.getInitStart(props, 0),
      expandedKeys: this.getExpandedKeys(props, id2ExtendInfo),
      expand,
      selectValue: [],
      selectedInfo: this.getEmptyNodeId2SelectInfo(),
      parentHighlightKeys: [],
    };
    this.updateStateValuForLimitValue(props, state, id2ExtendInfo, this.getInitValue(props));
    this.state = state;
  }

  getViewData(): Array<RowData> {
    const { data = [] } = this;
    return data;
  }

  getQueryData(): Array<RowData> {
    const { props } = this;
    if (this.isQueryAll(props)) {
      const { data = [] } = props;
      return data;
    }
    return this.getViewData();
  }

  isSelectAll() {
    const { expand } = this.state;
    const { id2ExtendInfo } = expand;
    const { props } = this;
    const { limitCount = 9999999 } = props;
    const utils = this.getUtils(props);
    const userInput = Object.keys(this.getNotInTree()).length;
    const canSelect = Math.min(utils.getCanTotal(id2ExtendInfo), limitCount);
    if (canSelect <= 0) {
      return false;
    }
    return utils.selCount + userInput >= canSelect;
  }

  isChecked(key: string) {
    const { selectedInfo } = this.state;
    const { checked, halfchecked } = selectedInfo;
    return checked[key] || halfchecked[key];
  }

  getInitValue(props: TreeProps): Array<string> {
    return Support.getInitValueArray(props);
  }

  isNotLimit(props: TreeProps) {
    return Support.isNotLimit(props);
  }

  componentWillReceiveProps(props: TreeProps) {
    const dataChanged = JSON.stringify(props.data) !== JSON.stringify(this.props.data);
    if (dataChanged === true) {
      this.allExpandInfo = this.getEmptyExpandInfo();
      this.createQueryAllTreelUtils(props);
    }
    const queryChanged = this.props.query !== props.query;
    const blackListChange = this.props.blackList !== props.blackList;
    const whiteListChange = this.props.whiteList !== props.whiteList;
    const valueChanged = props.value != this.props.value;
    if (dataChanged || queryChanged || valueChanged || blackListChange || whiteListChange) {
      const expand = this.updateExpandInfo(props);
      const { id2ExtendInfo } = expand;
      const newState: TreeState = {
        hasError: false,
        start: this.isQueryAll(props)
          ? this.allStart
          : Support.getInitStart(props, this.state.start),
        selectedInfo: this.getEmptyNodeId2SelectInfo(),
        expandedKeys: this.getExpandedKeys(props, id2ExtendInfo),
        expand,
        selectValue: [],
      };

      if (this.isNotLimit(props)) {
        const { selectValue = [], selectedInfo } = this.state;
        const { value } = selectedInfo;
        this.updateStateValue(
          props,
          newState,
          id2ExtendInfo,
          selectValue,
          value,
          Object.keys(value)
        );
      } else {
        this.updateStateValuForLimitValue(props, newState, id2ExtendInfo, this.getInitValue(props));
      }
      this.setState(newState);
    }
    const startChange = this.props.start !== props.start;
    if (startChange) {
      this.setState({ start: Support.getInitStart(props, this.state.start) });
    }
    const { current } = this.props;
    const currentChange = current !== props.current;
    if (currentChange) {
      if (current > this.end - 2) {
        const start = Math.min(this.state.start + this.canSeeCount, this.getViewData().length - 1);
        this.setState({ start });
      }
      if (current < this.state.start) {
        this.setState({ start: Math.max(this.state.start - this.canSeeCount, 0) });
      }
    }
    this.setState({ hasError: false });
  }

  getEmptyNodeId2SelectInfo(): NodeId2SelectInfo {
    return {
      checked: {},
      value: {},
      halfchecked: {},
    };
  }

  getNotInTree(): Object {
    return this.getUtils(this.props).getNotInTree();
  }

  getInTree(): Object {
    return this.getUtils(this.props).getInTree();
  }

  updateStateValuForLimitValue(
    props: TreeProps,
    state: TreeState,
    id2ExtendInfo: NodeId2ExtendInfo,
    value: Array<string>
  ) {
    const { obj, val } = this.getValueObject(props, value);
    this.updateStateValue(props, state, id2ExtendInfo, value, obj, val);
  }

  getValueObject(props: TreeProps, value: Array<string>) {
    if (this.isSingleSelectForProps(props)) {
      if (!value || value.length === 0) {
        return { obj: {}, val: [] };
      }
      const first = value[0];
      return { obj: { [first]: true }, val: [first] };
    }
    const len = value.length;
    const result = {};
    for (let i = 0; i < len; i++) {
      const oneValue = value[i];
      if (oneValue !== '') {
        result[oneValue] = true;
      }
    }
    return { obj: result, val: value };
  }

  updateStateValue(
    props: TreeProps,
    state: TreeState,
    id2ExtendInfo: NodeId2ExtendInfo,
    selectValue: Array<string>,
    valueObject: Object,
    val: Array<string>
  ) {
    const { displayValue = [] } = props;
    if (this.isSingleSelectForProps(props)) {
      state.selectValue = selectValue;
    } else {
      state.selectedInfo = this.getUtils(props).value2SelectInfo(
        val,
        displayValue ? displayValue : [],
        valueObject,
        id2ExtendInfo
      );
    }
  }

  updateExpandInfo(props: TreeProps): ExpandInfo {
    let result = this.getEmptyExpandInfo();
    if (this.isQueryAll(props)) {
      result = this.allExpandInfo;
    }

    this.createQueryTreeUtils(props);
    const { query, blackList, whiteList, searchType = 'include' } = props;

    const utils = this.getUtils(props);

    this.search(utils, result, query, searchType, blackList, whiteList);
    if (this.state) {
      this.allExpandKeys = this.state.expandedKeys;
      const usableExpandKeys = this.filterUsableExpandKeys(
        this.state.expandedKeys,
        result.id2ExtendInfo
      );
      if (usableExpandKeys.length > 0) {
        usableExpandKeys.forEach(item => {
          utils.expandNode(item, result.id2ExtendInfo);
        });
      }
    }
    return result;
  }

  filterUsableExpandKeys(source, id2ExtendInfo) {
    return source.filter(item => id2ExtendInfo[item] && item !== 'lugia_tree_root');
  }

  getEmptyExpandInfo(): ExpandInfo {
    return { id2ExtendInfo: {} };
  }

  getExpandedKeys(props: TreeProps, id2ExtendInfo): Array<string> {
    if (this.isQueryAll(props)) {
      const utils = this.getUtils(props);
      if (this.allExpandKeys == undefined || utils.isWhiteOrBlackListChanged()) {
        const { expandAll } = this.props;
        this.allExpandKeys = expandAll
          ? Object.keys(id2ExtendInfo)
          : this.state
          ? this.filterUsableExpandKeys(this.state.expandedKeys, id2ExtendInfo)
          : [];
      }
      return this.allExpandKeys;
    }
    const newAllExpandKeys = this.allExpandKeys || [];
    return Array.from(
      new Set([
        ...newAllExpandKeys.filter(item => item !== 'lugia_tree_root'),
        ...Object.keys(id2ExtendInfo).filter(item => item !== 'lugia_tree_root'),
      ])
    );
  }

  isQueryAll({ query }): boolean {
    return query === '';
  }

  shouldComponentUpdate(nextProps: TreeProps, nextState: TreeState) {
    const { props } = this;
    const dataChanged = props.data !== nextProps.data;
    const blackListChange = props.blackList !== nextProps.blackList;
    const whiteListChange = props.whiteList !== nextProps.whiteList;
    const themeChange = nextProps.theme !== props.theme;

    const { state } = this;
    return (
      props.query !== nextProps.query ||
      dataChanged ||
      blackListChange ||
      whiteListChange ||
      props.current !== nextProps.current ||
      state.hasError !== nextState.hasError ||
      state.start !== nextState.start ||
      props.svThemVersion !== nextProps.svThemVersion ||
      props.mutliple !== nextProps.mutliple ||
      state.selectValue !== nextState.selectValue ||
      state.expand !== nextState.expand ||
      state.selectedInfo !== nextState.selectedInfo ||
      state.parentHighlightKeys !== nextState.parentHighlightKeys ||
      themeChange
    );
  }

  createQueryTreeUtils(props: TreeProps) {
    const utils = this.createUtils(props, true);
    if (utils) {
      this.utils = utils;
    }
  }

  createQueryAllTreelUtils(props: TreeProps) {
    const utils = this.createUtils(props);
    if (utils) {
      this.queryAllUtils = utils;
      this.allExpandKeys = null;
      this.allStart = 0;
    }
  }

  createUtils(
    {
      data,
      onlySelectLeaf,
      expandAll,
      displayField,
      valueField,
      limitCount,
      splitQuery,
      igronSelectField,
      pathSeparator,
      pathField,
      pidField,
    },
    realyExpandAll: boolean = expandAll
  ): ?TreeUtils {
    if (!data) {
      return null;
    }
    return new TreeUtils(data, {
      expandAll: realyExpandAll,
      onlySelectLeaf,
      displayField,
      valueField,
      limitCount,
      splitQuery,
      igronSelectField,
      pathSeparator,
      pathField,
      pidField,
    });
  }

  getUtils(props: TreeProps) {
    if (this.isQueryAll(props)) {
      return this.queryAllUtils;
    }
    return this.utils;
  }

  render() {
    const { props, state } = this;
    const empty = <Empty themeInfo={props.getPartOfThemeProps('Container')} />;
    const { __dontShowEmpty } = props;
    if (this.isEmpty(props) && !__dontShowEmpty) {
      return empty;
    }
    if (this.state.hasError) {
      return <ErrorTooltip>树形数据错误</ErrorTooltip>;
    }
    const {
      query,
      current,
      igronSelectField,
      blackList,
      whiteList,
      searchType = 'include',
      valueField,
      getTreeData,
    } = props;
    const {
      expand,
      expandedKeys,
      selectedInfo,
      start,
      selectValue = [],
      parentHighlightKeys = [],
    } = state;
    const { id2ExtendInfo } = expand;
    const { checked, halfchecked } = selectedInfo;
    const utils = this.getUtils(props);

    const data = this.search(utils, expand, query, searchType, blackList, whiteList);
    this.data = data;
    getTreeData && getTreeData(data);

    if (data.length === 0 && !__dontShowEmpty) {
      return empty;
    }
    if (this.isQueryAll(props)) {
      this.allStart = start;
    }
    const highlight = [];
    const row = data[current];
    if (row) {
      const { [valueField]: key } = row;
      highlight.push(key + '');
    }
    return (
      <ThrottleTree
        {...props}
        id2ExtendInfo={id2ExtendInfo}
        start={start}
        igronSelectField={igronSelectField}
        onScroller={this.onScroller}
        onScrollerEndChange={this.onScrollerEndChange}
        onCanSeeCountChange={this.onCanSeeCountChange}
        onCheck={this.onCheck}
        onSelect={this.onSelect}
        data={data}
        selectable={this.isSingleSelect()}
        highlight={highlight}
        selectedKeys={selectValue}
        parentHighlightKeys={parentHighlightKeys}
        checkedKeys={Object.keys(checked)}
        halfCheckedKeys={Object.keys(halfchecked)}
        utils={utils}
        expandedKeys={expandedKeys}
        onExpand={this.onExpand}
      />
    );
  }

  onScrollerEndChange = (end: number) => {
    this.end = end;
  };
  onCanSeeCountChange = (count: number) => {
    this.canSeeCount = count;
  };

  search(
    utils: TreeUtils,
    expand: ExpandInfo,
    query: string,
    searchType: QueryType = 'include',
    blackList: ?(string[]),
    whiteList: ?(string[])
  ): Array<RowData> {
    return (this.data = utils.search(expand, query, searchType, blackList, whiteList));
  }

  onSelect = (selectValue: Array<string>, eventObject: any, itemObj: Object) => {
    const { parentIsHighlight, pathField, pathSeparator } = this.props; // 是否开启选中子节点，父节点高亮
    const {
      node: {
        props: {
          item: { [pathField]: nodePath = '' },
          isLeaf,
        },
      },
    } = eventObject;
    const parentHighlightKeys = parentIsHighlight ? nodePath.split(pathSeparator) : [];
    const { onSelect } = this.props;
    onSelect && onSelect(selectValue, itemObj);
    this.select(selectValue, parentHighlightKeys, itemObj);
  };

  select(selectValue: Array<string>, parentHighlightKeys: Array<string>, itemObj: Object) {
    if (this.isSingleSelect() === false) {
      return;
    }
    const selVal = selectValue[0];
    const value = selVal !== undefined && selVal !== null ? selVal : '';
    const { props } = this;
    const { onlySelectLeaf = false, igronSelectField = '', limitCount } = props;
    if (limitCount != undefined && limitCount <= 0) {
      return;
    }
    if (onlySelectLeaf === true || igronSelectField) {
      const utils = this.getUtils(props);
      const { expand } = this.state;
      const { id2ExtendInfo } = expand;

      if (onlySelectLeaf && !utils.isLeaf(value, id2ExtendInfo)) {
        return;
      }
      if (igronSelectField != '' && igronSelectField != undefined) {
        const row = utils.getRow(value, id2ExtendInfo);
        if (row && row[igronSelectField] === true) {
          return;
        }
      }
    }
    this.onChange([value], itemObj);
    if (this.isNotLimit(props)) {
      this.setState({ selectValue, parentHighlightKeys });
    } else {
      this.setState({ parentHighlightKeys });
    }
  }

  onCheck = (_, event, item) => {
    const { node, checked, shiftKey } = event;
    const { eventKey } = node.props;
    this.check(eventKey, checked, shiftKey, item);
  };

  check(eventKey: string, checked: boolean, shiftKey: boolean = false, item: Object) {
    const { state, props } = this;

    const { selectedInfo } = state;
    const { halfchecked, value } = selectedInfo;
    const isHalfSelect = halfchecked[eventKey] === undefined;
    const isSelected = isHalfSelect && checked;

    const utils = this.getUtils(props);
    const { selectDirNode, unSelectNode, selectNode } = utils;
    const onlyProcessYouself = isSelected ? selectDirNode : unSelectNode;
    const processAllNode = isSelected ? selectNode : unSelectNode;

    const { expand } = state;
    const { id2ExtendInfo } = expand;
    const check = shiftKey ? onlyProcessYouself : processAllNode;
    check.call(utils, eventKey, selectedInfo, id2ExtendInfo);

    this.onChange(Object.keys(value), item, selectedInfo);

    if (this.isNotLimit(props)) {
      const newState: TreeState = {
        start: this.state.start,
        hasError: false,
        selectedInfo: this.getEmptyNodeId2SelectInfo(),
        expandedKeys: this.state.expandedKeys,
        expand: this.state.expand,
        selectValue: [],
        parentHighlightKeys: [],
      };

      const { value } = selectedInfo;
      this.updateStateValue(props, newState, id2ExtendInfo, [], value, Object.keys(value));
      this.setState(newState);
    }
  }

  getRows(valArray: Array<any> = []): Array<any> {
    if (!valArray || valArray.length <= 0) {
      return [];
    }
    const result = [];
    const { props, state } = this;
    const { expand } = state;
    const { id2ExtendInfo } = expand;
    const utils = this.getUtils(props);

    const len = valArray.length;
    for (let i = 0; i < len; i++) {
      const val = valArray[i];
      const row = utils.getRow(val, id2ExtendInfo);
      if (row) {
        result.push(row);
      } else {
        result.push(null);
      }
    }
    return result;
  }

  onChange = (value: any, item: Object, selectedInfo?: Object) => {
    this.value = value;
    const { props } = this;
    const { onChange } = props;
    const checkedItems = this.getCheckedItems(value);
    onChange && onChange(value, this.getTitle(value), { item, checkedItems, selectedInfo });
  };

  getCheckedItems = (keys: any) => {
    const checkedItems = [];
    if ((keys || []).length === 0) {
      return checkedItems;
    }

    const { data, valueField } = this.props;
    data.forEach(item => {
      const value = item[valueField];
      if (keys.indexOf(value) !== -1) {
        checkedItems.push(item);
      }
    });

    return checkedItems;
  };

  getTitle(value: Array<string>): Array<string> {
    const { id2ExtendInfo } = this.allExpandInfo;
    return this.queryAllUtils.getTitle(value, id2ExtendInfo);
  }

  onExpand = (expandedKeys: Array<string>, event: { expanded: boolean, node: Object }) => {
    const { expanded, node } = event;
    const key = node.props.eventKey;
    this.expandOrCollapse(key, expandedKeys, expanded);
  };

  expand(key: string) {
    if (this.isExpand(key)) {
      return;
    }
    this.state.expandedKeys.push(key + '');
    this.expandOrCollapse(key, [...this.state.expandedKeys], true);
  }

  collapse(key: string) {
    if (!this.isExpand(key)) {
      return;
    }
    deleteValue(this.state.expandedKeys, key + '');
    this.expandOrCollapse(key, [...this.state.expandedKeys], false);
  }

  isExpand(key: string): boolean {
    return this.state.expandedKeys.indexOf(key + '') !== -1;
  }

  expandOrCollapse(key: string, expandedKeys: Array<string>, expanded: boolean) {
    const { props, state } = this;
    const utils = this.getUtils(props);
    const { expand } = state;
    const { id2ExtendInfo } = expand;

    expanded ? utils.expandNode(key, id2ExtendInfo) : utils.colapseNode(key, id2ExtendInfo);

    if (this.isQueryAll(props)) {
      this.allExpandKeys = expandedKeys;
    }

    const newExpand = Object.assign({}, expand, { id2ExtendInfo });

    this.setState({
      expand: newExpand,
      expandedKeys,
    });
    const { onExpand, data = [] } = props;

    onExpand && onExpand(expandedKeys, data);
  }

  onScroller = (start: number, end: number) => {
    if (!this.isLimitStart()) {
      this.setState({ start });
    }

    const { onScroller } = this.props;
    onScroller && onScroller(start, end);
  };

  isLimitStart() {
    return 'start' in this.props;
  }

  isEmpty({ data }) {
    return !data || data.length === 0;
  }

  isSingleSelect() {
    return this.isSingleSelectForProps(this.props);
  }

  canSelect(key: string) {
    return this.state.expand.id2ExtendInfo[key].can;
  }

  isSingleSelectForProps({ mutliple }) {
    return mutliple === false;
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }
}

export default ThemeHoc(Tree, Widget.Tree, { hover: true });
