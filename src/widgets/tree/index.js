/**
 *
 * create by ligx
 *
 * @flow
 */
import type { ExpandInfo, NodeId2ExtendInfo, NodeId2SelectInfo, } from 'sv-widget';
import animation from '../common/openAnimation';
import * as React from 'react';
import { TreeNode, } from './rc-tree';
import Support from '../common/FormFieldWidgetSupport';
import ThemeProvider from '../common/ThemeProvider';
import ThrottleTree from './ThrottleTree';
import * as Widget from '../consts/Widget';
import '../css/sv.css';
import './index.css';
import TreeUtils from './utils';
import styled from 'styled-components';
import 'babel-polyfill';

type RowData = { [key: string]: any, }
type TreeProps = {
  getTheme: Function,
  start: number,
  end: number,
  query: string,
  /** 是否支持多选 */
  mutliple?: boolean;
  limitCount?: number;
  /** 默认展开所有树节点 */
  expandAll: boolean;
  onlySelectLeaf: boolean;
  displayField?: string,
  igronSelectField?: string,
  value: ?string;
  displayValue: ? string;
  defaultValue: ?string;

  /** 展开/收起节点时触发 */
  onExpand?: Function,
  /** 点击树节点触发 */
  onSelect?: Function,
  /**
   * 当值发生变化的时候出发
   */
  onChange?: Function,
  splitQuery?: string,
  data?: Array<RowData>,
};

type TreeState = {
  start: number,
  expand: ExpandInfo,
  selectedInfo: NodeId2SelectInfo,
  expandedKeys: Array<string>,
  selectValue?: Array<string>,
}
const Empty = styled.span`
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  display: block;
`;

class Tree extends React.Component<TreeProps, TreeState> {

  static displayName = Widget.Tree;
  static defaultProps = {
    expandAll: false,
    mutliple: false,
    defaultValue: '',
    showIcon: false,
    query: '',
    openAnimation: animation,
  };

  static TreeNode: TreeNode;

  allExpandKeys: Array<string> | null;
  allExpandInfo: ExpandInfo;
  allStart: number;
  queryAllUtils: TreeUtils;
  utils: TreeUtils;
  value: any;
  data: Array<RowData>;

  constructor (props: TreeProps) {
    super(props);
    this.allExpandInfo = this.getEmptyExpandInfo();
    this.allStart = 0;

    this.createQueryAllTreelUtils(props);

    if (this.isEmpty(props)) {
      this.state = {
        start: 0,
        expandedKeys: [],
        expand: this.getEmptyExpandInfo(),
        selectValue: [],
        selectedInfo: this.getEmptyNodeId2SelectInfo(),
      };
      return;
    }

    const expand = this.updateExpandInfo(props);
    const { id2ExtendInfo, } = expand;
    const state = {
      start: 0,
      expandedKeys: this.getExpandedKeys(props, id2ExtendInfo),
      expand,
      selectValue: [],
      selectedInfo: this.getEmptyNodeId2SelectInfo(),
    };
    this.updateStateValuForLimitValue(props, state, id2ExtendInfo, this.getInitValue(props));
    this.state = state;

  }

  getData (): Array<RowData> {
    const { data, } = this;
    return data ? data : [];
  }

  isSelectAll () {
    const { selectedInfo, } = this.state;
    const { checked, } = selectedInfo;
    const chkLen = Object.keys(checked).length;
    return chkLen > 0 && chkLen >= this.getData().length;
  }

  getInitValue (props: TreeProps) {
    return Support.getInitValue(props);

  }

  isNotLimit (props: TreeProps) {
    return Support.isNotLimit(props);
  }


  componentWillReceiveProps (props: TreeProps) {
    const dataChanged = props.data !== this.props.data;
    if (dataChanged === true) {
      this.createQueryAllTreelUtils(props);
    }
    const queryChanged = this.props.query !== props.query;
    const valueChanged = props.value != this.props.value;
    if (dataChanged || queryChanged || valueChanged) {
      const expand = this.updateExpandInfo(props);
      const { id2ExtendInfo, } = expand;
      const newState: TreeState = {
        start: this.isQueryAll(props) ? this.allStart : 0,
        selectedInfo: this.state.selectedInfo,
        expandedKeys: this.getExpandedKeys(props, id2ExtendInfo),
        expand,
        selectValue: [],
      };

      if (valueChanged) {
        newState.selectedInfo = this.getEmptyNodeId2SelectInfo();
        if (this.isNotLimit(props)) {
          const { selectValue = [], selectedInfo, } = this.state;
          const { value, } = selectedInfo;
          this.updateStateValue(props, newState, id2ExtendInfo, selectValue, value, Object.keys(value));
        } else {
          this.updateStateValuForLimitValue(props, newState, id2ExtendInfo, props.value);
        }
      }
      this.setState(newState);
    }

  }


  getEmptyNodeId2SelectInfo (): NodeId2SelectInfo {
    return {
      checked: {},
      value: {},
      halfchecked: {},
    };
  }

  updateStateValuForLimitValue (props: TreeProps, state: TreeState, id2ExtendInfo: NodeId2ExtendInfo, value: any) {
    const notString = Object.prototype.toString.call(value) !== '[object String]';
    const emptyValue = value === undefined || value === null || notString;
    value = emptyValue ? '' : value.trim();
    const { obj, val, } = this.getValueObject(value);
    this.updateStateValue(props, state, id2ExtendInfo, [value,], obj, val);
  }

  getValueObject (value: string) {
    const valArray = value.split(',');
    const len = valArray.length;
    const result = {};
    for (let i = 0; i < len; i++) {
      const oneValue = valArray[ i ];
      if (oneValue !== '') {
        result[ oneValue ] = true;
      }
    }
    return { obj: result, val: valArray, };
  }


  updateStateValue (props: TreeProps, state: TreeState, id2ExtendInfo: NodeId2ExtendInfo,
                    selectValue: Array<string>, valueObject: Object,
                    val: Array<string>) {
    const { displayValue = '', } = props;
    if (this.isSingleSelectForProps(props)) {
      state.selectValue = selectValue;
    } else {
      state.selectedInfo = this.getUtils(props).value2SelectInfo(val, displayValue ? displayValue.split(',') : [], valueObject, id2ExtendInfo);
    }
  }

  updateExpandInfo (props: TreeProps): ExpandInfo {
    let result = this.getEmptyExpandInfo();
    if (this.isQueryAll(props)) {
      result = this.allExpandInfo;
    }

    this.createQueryTreeUtils(props);
    this.search(this.getUtils(props), result, props.query);
    return result;
  }

  getEmptyExpandInfo (): ExpandInfo {
    return { id2ExtendInfo: {}, };
  }


  getExpandedKeys (props: TreeProps, id2ExtendInfo): Array<string> {
    if (this.isQueryAll(props)) {
      if (this.allExpandKeys == undefined) {
        const { expandAll, } = this.props;
        this.allExpandKeys = expandAll ? Object.keys(id2ExtendInfo) : [];
      }
      return this.allExpandKeys;
    }
    return Object.keys(id2ExtendInfo);

  }

  isQueryAll ({ query, }): boolean {
    return query === '';
  }

  shouldComponentUpdate (nexProps: TreeProps, nextState: TreeState) {
    const { props, } = this;
    const dataChanged = props.data !== nexProps.data;

    const { state, } = this;
    return props.query !== nexProps.query
      || dataChanged
      || state.start !== nextState.start
      || state.selectValue !== nextState.selectValue
      || state.expand !== nextState.expand
      || state.selectedInfo !== nextState.selectedInfo;
  }


  createQueryTreeUtils (props: TreeProps) {
    const utils = this.createUtils(props, true);
    if (utils) {
      this.utils = utils;
    }
  }

  createQueryAllTreelUtils (props: TreeProps) {
    const utils = this.createUtils(props);
    if (utils) {
      this.queryAllUtils = utils;
      this.allExpandKeys = null;
      this.allStart = 0;
    }
  }

  createUtils ({ data, onlySelectLeaf, expandAll, displayField, limitCount, splitQuery, }, realyExpandAll: boolean = expandAll): ?TreeUtils {
    if (!data) {
      return null;
    }
    return new TreeUtils(data, { expandAll: realyExpandAll, onlySelectLeaf, displayField, limitCount, splitQuery, });
  }

  getUtils (props: TreeProps) {
    if (this.isQueryAll(props)) {
      return this.queryAllUtils;
    }
    return this.utils;
  }

  render () {
    const { props, state, } = this;
    const empty = <Empty>查无结果</Empty>;
    if (this.isEmpty(props)) {
      return empty;
    }
    const {
      query,
    } = props;
    const { expand, expandedKeys, selectedInfo, start, selectValue, } = state;
    const { id2ExtendInfo, } = expand;
    const { checked, halfchecked, } = selectedInfo;
    const utils = this.getUtils(props);
    const data = this.search(utils, expand, query);
    this.data = data;
    if (data.length === 0) {
      return empty;
    }
    if (this.isQueryAll(props)) {
      this.allStart = start;
    }
    return <ThrottleTree {...props} id2ExtendInfo={id2ExtendInfo}
                         start={start}
                         onScroller={this.onScroller}
                         onCheck={this.onCheck}
                         onSelect={this.onSelect}
                         data={data}
                         selectable={this.isSingleSelect()}
                         selectedKeys={selectValue}
                         checkedKeys={Object.keys(checked)}
                         halfCheckedKeys={Object.keys(halfchecked)}
                         utils={utils}
                         expandedKeys={expandedKeys}
                         onExpand={this.onExpand}/>;
  }

  search (utils: TreeUtils, expand: ExpandInfo, query: string): Array<RowData> {
    return this.data = utils.search(expand, query);
  }

  onSelect = (selectValue: Array<string>) => {

    if (this.isSingleSelect() === false) {
      return;
    }
    const selVal = selectValue[ 0 ];
    const value = (selVal !== undefined && selVal !== null) ? selVal : '';
    const { props, } = this;
    const { onlySelectLeaf = false, igronSelectField = '', limitCount, } = props;
    if (limitCount != undefined && limitCount <= 0) {
      return;
    }
    if (onlySelectLeaf === true || igronSelectField) {

      const utils = this.getUtils(props);
      const { expand, } = this.state;
      const { id2ExtendInfo, } = expand;
      if (!utils.isLeaf(value, id2ExtendInfo)) {
        return;
      }
      if (igronSelectField != '' && igronSelectField != undefined) {
        const row = utils.getRow(value, id2ExtendInfo);
        if (row && (!!row[ igronSelectField ] === true)) {
          return;
        }
      }

    }
    this.onChange([value,]);
    if (this.isNotLimit(props)) {
      this.setState({ selectValue, });
    }
  };


  onCheck = (_, event) => {
    const { node, checked, shiftKey, } = event;
    const { eventKey, } = node.props;
    const { state, props, } = this;

    const { selectedInfo, } = state;
    const { halfchecked, value, } = selectedInfo;
    const isHalfSelect = halfchecked[ eventKey ] === undefined;
    const isSelected = isHalfSelect && checked;

    const utils = this.getUtils(props);
    const { selectDirNode, unSelectNode, selectNode, } = utils;
    const onlyProcessYouself = isSelected ? selectDirNode : unSelectNode;
    const processAllNode = isSelected ? selectNode : unSelectNode;

    const { expand, } = state;
    const { id2ExtendInfo, } = expand;
    const check = shiftKey ? onlyProcessYouself : processAllNode;
    check.call(utils, eventKey, selectedInfo, id2ExtendInfo);

    this.onChange(Object.keys(value));
    if (this.isNotLimit(props)) {
      this.setState({ selectedInfo: { ...selectedInfo, }, });
    }
  };


  onChange = (value: any) => {
    this.value = value;
    const { props, } = this;
    const { onChange, } = props;
    if (onChange) {
      onChange(value, this.getTitle(value));
    }
  };

  getTitle (value: Array<string>): Array<string> {
    const { id2ExtendInfo, } = this.allExpandInfo;
    return this.queryAllUtils.getTitle(value, id2ExtendInfo);
  }

  onExpand = (expandedKeys: Array<string>, event: { expanded: boolean, node: Object, }) => {
    const { props, state, } = this;
    const { expanded, node, } = event;
    const key = node.props.eventKey;
    const utils = this.getUtils(props);
    const { expand, } = state;
    const { id2ExtendInfo, } = expand;

    expanded ? utils.expandNode(key, id2ExtendInfo) : utils.colapseNode(key, id2ExtendInfo);

    if (this.isQueryAll(props)) {
      this.allExpandKeys = expandedKeys;
    }

    const newExpand = Object.assign({},
      expand,
      { id2ExtendInfo, });

    this.setState({
      expand: newExpand,
      expandedKeys,
    });

    const { onExpand, data = [], } = props;
    onExpand && onExpand(expandedKeys, data);
  };

  onScroller = (start: number) => {
    this.setState({ start, });
  };

  isEmpty ({ data, }) {
    return !data || data.length === 0;
  }

  isSingleSelect () {
    return this.isSingleSelectForProps(this.props);
  }

  isSingleSelectForProps ({ mutliple, }) {
    return mutliple === false;
  }

}

export default ThemeProvider(Tree, Widget.Tree);
