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

import ThemeProvider from '../common/ThemeProvider';
import ThrottleTree from './ThrottleTree';
import * as Widget from '../consts/Widget';
import '../css/sv.css';
import './index.css';
import TreeUtils from './utils';
import 'babel-polyfill';

type RowData = {
  key: string,
  title: string,
  pid?: string,
  children?: Array<RowData>,
  path?: string,
  isLeaf?: boolean,
};
type TreeProps = {
  getTheme: Function,
  start: number,
  end: number,
  query: string,
  showLine?: boolean;
  /** 是否支持多选 */
  mutliple?: boolean;
  /** 默认展开所有树节点 */
  expandAll: boolean;
  onlySelectLeaf: boolean;

  value: ?string;
  defaultValue: ?string;

  /** 展开/收起节点时触发 */
  onExpand?: Function,
  /** 点击树节点触发 */
  onSelect?: Function,
  /**
   * 当值发生变化的时候出发
   */
  onChange?: Function,
  data?: Array<RowData>,
};

type TreeState = {
  start: number,
  expand: ExpandInfo,
  selectedInfo: NodeId2SelectInfo,
  expandedKeys: Array<string>,
  selectValue?: Array<string>,
}


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

  allExpandKeys: Array<string>;
  allExpandInfo: ExpandInfo;
  allStart: number;
  queryAllUtils: TreeUtils;
  utils: TreeUtils;
  value: any;


  constructor (props: TreeProps) {
    super(props);
    this.allExpandInfo = this.getEmptyExpandInfo();
    this.allStart = 0;

    this.createQueryAllTreelUtils(props);

    if (this.isEmpty(props)) {
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
    this.updateStateValuForLimitValue(props, state, id2ExtendInfo, this.getInitValue());
    this.state = state;

  }

  getInitValue () {
    let result = '';
    const { props, } = this;
    if (this.isNotLimit(props)) {
      const { defaultValue = '', } = props;
      result = defaultValue;
    } else {
      const { value = '', } = props;
      result = value;
    }
    return result;
  }

  getEmptyNodeId2SelectInfo (): NodeId2SelectInfo {
    return {
      checked: {},
      value: {},
      halfchecked: {},
    };
  }

  componentWillReceiveProps (props: TreeProps) {
    const expand = this.updateExpandInfo(props);
    const { id2ExtendInfo, } = expand;
    const newState: TreeState = {
      start: this.isQueryAll(props) ? this.allStart : 0,
      selectedInfo: this.getEmptyNodeId2SelectInfo(),
      expandedKeys: this.getExpandedKeys(props, id2ExtendInfo),
      expand,
      selectValue: [],
    };

    if (this.isNotLimit(props)) {
      const { selectValue = [], selectedInfo, } = this.state;
      this.updateStateValue(props, newState, id2ExtendInfo, selectValue, selectedInfo.value);
    } else {
      this.updateStateValuForLimitValue(props, newState, id2ExtendInfo, props.value);
    }
    this.setState(newState);
  }

  isNotLimit (props: TreeProps) {
    return ('value' in props) === false;
  }

  updateStateValuForLimitValue (props: TreeProps, state: TreeState, id2ExtendInfo: NodeId2ExtendInfo, value: any) {
    if (value === undefined || value === null) {
      value = '';
    }
    const isNotBlank = value.trim && value.trim() !== '';
    value = isNotBlank ? value : '';
    if (isNotBlank) {
      this.updateStateValue(props, state, id2ExtendInfo, [value,], this.getValueObject(value));
    }
  }

  getValueObject (value: string) {
    const valArray = value.split(',');
    const len = valArray.length;
    const valueObj = {};
    for (let i = 0; i < len; i++) {
      const oneValue = valArray[ i ];
      if (oneValue !== '') {
        valueObj[ oneValue ] = true;
      }
    }
    return valueObj;
  }

  updateStateValue (props: TreeProps, state: TreeState, id2ExtendInfo: NodeId2ExtendInfo, selectValue: Array<string>, valueObject: Object) {
    if (this.isSingleSelectForProps(props)) {
      state.selectValue = selectValue;
    } else {
      state.selectedInfo = this.getUtils(props).value2SelectInfo(valueObject, id2ExtendInfo);
    }
  }

  updateExpandInfo (props: TreeProps): ExpandInfo {
    let result = this.getEmptyExpandInfo();
    if (this.isQueryAll(props)) {
      result = this.allExpandInfo;
    }

    this.createQueryTreeUtils(props);
    this.getUtils(props).search(result, props.query);
    return result;
  }

  getEmptyExpandInfo (): ExpandInfo {
    return { id2ExtendInfo: {}, };
  }


  getExpandedKeys (props: TreeProps, id2ExtendInfo): Array<string> {
    let result = {};
    if (this.isQueryAll(props)) {
      if (this.allExpandKeys === undefined) {
        const { expandAll, } = this.props;
        this.allExpandKeys = expandAll ? Object.keys(id2ExtendInfo) : [];
      }
      result = this.allExpandKeys;
    } else {
      result = Object.keys(id2ExtendInfo);
    }
    return result;
  }

  isQueryAll (props: TreeProps): boolean {
    return props.query === '';
  }

  shouldComponentUpdate (nexProps: TreeProps, nextState: TreeState) {
    const { props, state, } = this;
    const dataChanged = nexProps.data !== props.data;
    if (dataChanged === true) {
      this.createQueryAllTreelUtils(nexProps);
      return true;
    }
    return props.query !== nexProps.query
      || state.start !== nextState.start
      || state.selectValue !== nextState.selectValue
      || state.expand !== nextState.expand
      || state.selectedInfo !== nextState.selectedInfo;
  }


  createQueryTreeUtils (props: TreeProps) {
    const { data, onlySelectLeaf, } = props;
    if (data) {
      this.utils = new TreeUtils(data, { expandAll: true, onlySelectLeaf, });
    }
  }

  createQueryAllTreelUtils (props: TreeProps) {
    const { data, expandAll = false, onlySelectLeaf, } = props;
    if (data) {
      this.queryAllUtils = new TreeUtils(data, { expandAll, onlySelectLeaf, });
    }
  }

  getUtils (props: TreeProps) {
    if (this.isQueryAll(props)) {
      return this.queryAllUtils;
    }
    return this.utils;
  }

  render () {
    const { props, state, } = this;
    if (this.isEmpty(props)) {
      return <span></span>;
    }
    const {
      query,
      showLine,
      mutliple,
    } = props;
    const { expand, expandedKeys, selectedInfo, start, selectValue, } = state;
    const { id2ExtendInfo, } = expand;
    const { checked, halfchecked, } = selectedInfo;
    const utils = this.getUtils(props);
    const data = utils.search(expand, query);
    if (this.isQueryAll(props)) {
      this.allStart = start;
    }
    return <ThrottleTree {...props} id2ExtendInfo={id2ExtendInfo}
                         start={start}
                         onScroller={this.onScroller}
                         onCheck={this.onCheck}
                         onSelect={this.onSelect}
                         data={data}
                         showLine={showLine}
                         selectable={this.isSingleSelect()}
                         selectedKeys={selectValue}
                         checkedKeys={Object.keys(checked)}
                         halfCheckedKeys={Object.keys(halfchecked)}
                         mutliple={mutliple}
                         utils={utils}
                         expandedKeys={expandedKeys}
                         onExpand={this.onExpand}/>;
  }


  onSelect = (selectValue: Array<string>) => {

    if (this.isSingleSelect() === false) {
      return;
    }
    const selVal = selectValue[ 0 ];
    this.value = (selVal !== undefined && selVal !== null) ? selVal : '';
    const { props, } = this;
    const { onlySelectLeaf, } = props;
    if (onlySelectLeaf === true) {
      const utils = this.getUtils(props);
      const { expand, } = this.state;
      const { id2ExtendInfo, } = expand;
      if (!utils.isLeaf(this.value, id2ExtendInfo)) {
        return;
      }
    }

    this.onChange();
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

    this.value = Object.keys(value);
    this.onChange();
    if (this.isNotLimit(props)) {
      this.setState({ selectedInfo: { ...selectedInfo, }, });
    }
  };


  onChange = () => {
    const { onChange, } = this.props;
    onChange && onChange(this.value);
  };

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

  isEmpty (props: TreeProps) {
    const { data, } = props;
    return !data || data.length === 0;
  }

  isSingleSelect () {
    return this.isSingleSelectForProps(this.props);
  }

  isSingleSelectForProps (props: TreeProps) {
    const { mutliple, } = props;
    return mutliple === false;
  }

}

export default ThemeProvider(Tree, Widget.Tree);
