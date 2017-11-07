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

const defaultHeight = 250;
const menuItemHeight = 18;
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
  multiple?: boolean;
  /** 默认展开所有树节点 */
  expandAll: boolean;
  onlySelectLeaf: boolean;

  defaultValue: string;

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
    multiple: false,
    showIcon: false,
    query: '',
    openAnimation: animation,
  };

  static TreeNode: TreeNode;
  utils: TreeUtils;
  queryAllUtils: TreeUtils;

  constructor (props: TreeProps) {
    super(props);
    this.createTreeUtils(props);
    this.loadData(props, true);
  }

  componentWillReceiveProps (props: TreeProps) {
    this.loadData(props);
  }

  allExpandKeys: Array<string>;

  loadData (props, init: boolean = false) {

    const expand = this.getExpandInfo(props);
    let expandedKeys;
    const { expandAll, } = this.props;
    const notFirstAndNotQueryALl = !this.isQueryAll(props) && !init;
    if (notFirstAndNotQueryALl) {
      this.createTreeQueryUtils(props);
    }

    const utils = this.getUtils(props);
    utils.search(expand, props.query);

    if (this.isQueryAll(props)) {
      if (this.allExpandKeys === undefined) {
        this.allExpandKeys = this.getExpandedKeys(expandAll, expand);
      }
      expandedKeys = this.allExpandKeys;
    } else {
      expandedKeys = this.getExpandedKeys(expandAll, expand);
    }

    if (init) {
      this.state = {
        start: 0,
        expandedKeys,
        expand,
        selectedInfo: {
          checked: {},
          value: {},
          halfchecked: {},
        },
      };
    } else {
      const { multiple, } = this.props;

      let newSelectedInfo = {
        checked: {},
        value: {},
        halfchecked: {},
      };

      if (multiple) {
        const { id2ExtendInfo, } = expand;
        const { selectedInfo, } = this.state;
        const { value, } = selectedInfo;
        newSelectedInfo = utils.value2SelectInfo(value, id2ExtendInfo);
      }

      this.setState({
        start: 0,
        selectedInfo: newSelectedInfo,
        expandedKeys,
        expand,
      }, () => {
      });

    }
  }

  getExpandedKeys (expandAll: boolean, expand: ExpandInfo): Array<string> {
    return expandAll ? Object.keys(expand.id2ExtendInfo) : [];
  }

  allExpandInfo: ExpandInfo;

  getExpandInfo (props: TreeProps): ExpandInfo {
    const empty = { id2ExtendInfo: {}, };
    if (this.isQueryAll(props)) {
      if (this.allExpandInfo === undefined) {
        this.allExpandInfo = empty;
      }
      return this.allExpandInfo;
    }
    return empty;
  }


  shouldComponentUpdate (nexProps: TreeProps, nextState: TreeState) {
    const dataChanged = nexProps.data !== this.props.data;
    if (dataChanged) {
      this.createTreeUtils(nexProps);
    }
    const needUpdate = dataChanged
      || this.props.query !== nexProps.query
      || this.state.start !== nextState.start
      || this.state.selectValue !== nextState.selectValue
      || nextState.expand !== this.state.expand
      || nextState.selectedInfo !== this.state.selectedInfo;
    return needUpdate;
  }

  createTreeUtils (props: TreeProps) {
    this.createTreeQueryAllUtils(props);
    this.createTreeQueryUtils(props);
  }

  createTreeQueryUtils (props: TreeProps) {
    const { data, expandAll = false, onlySelectLeaf, } = props;
    if (data) {
      this.utils = new TreeUtils(data, { expandAll, onlySelectLeaf, });
    }
  }

  createTreeQueryAllUtils (props: TreeProps) {
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

  isQueryAll (props: TreeProps): boolean {
    const { query, } = props;
    return (query === '');
  }

  realyDatas: Array<RowData>;

  render () {
    const {
      showLine,
      multiple,
      data,
    } = this.props;
    const { query, } = this.props;
    const { expand, expandedKeys, selectedInfo, start, selectValue, } = this.state;
    const { id2ExtendInfo, } = expand;
    const { checked, halfchecked, } = selectedInfo;
    if (data) {
      const utils = this.getUtils(this.props);
      this.realyDatas = utils.search(expand, query);
      return <ThrottleTree {...this.props} id2ExtendInfo={id2ExtendInfo}
                           start={start}
                           onScroller={this.onScroller}
                           onCheck={this.onCheck}
                           onSelect={this.onSelect}
                           data={this.realyDatas}
                           showLine={showLine}
                           selectable={this.isSingleSelect()}
                           selectedKeys={selectValue}
                           checkedKeys={Object.keys(checked)}
                           halfCheckedKeys={Object.keys(halfchecked)}
                           mutliple={multiple}
                           utils={utils}
                           expandedKeys={expandedKeys}
                           onExpand={this.onExpand}></ThrottleTree>;
    }
    return <div></div>;

  }

  onSelect = (selectValue: Array<string>) => {
    if (this.isSingleSelect()) {
      this.value = selectValue[ 0 ];
      this.setState({ selectValue, }, () => {
        this.onChange();
      });
    }
  };

  isSingleSelect () {
    const { multiple, } = this.props;
    return multiple === false;
  }

  onScroller = (start: number) => {
    this.setState({ start, });
  };
  value: any;
  onCheck = (_, event) => {
    const { node, checked, } = event;
    const { props, } = node;
    const { eventKey, } = props;
    const { expand, selectedInfo, } = this.state;
    const { halfchecked, value, } = selectedInfo;
    const utils = this.getUtils(this.props);
    let check = () => {};
    if (event.shiftKey) {
      check = halfchecked[ eventKey ] === undefined && checked ? utils.selectDirNode : utils.unSelectNode;
    } else {
      check = halfchecked[ eventKey ] === undefined && checked ? utils.selectNode : utils.unSelectNode;
    }
    check.bind(utils)(eventKey, selectedInfo, expand.id2ExtendInfo);
    this.value = Object.keys(value);
    this.setState({ selectedInfo: { ...selectedInfo, }, }, () => {
      this.onChange();
    });
  };


  onChange = () => {
    const { onChange, } = this.props;
    onChange && onChange(this.value);
  };
  onExpand = (expandedKeys: Array<string>, rowData: { expanded: boolean, node: Object, }) => {
    const { onExpand, data = [], } = this.props;
    const { expanded, node, } = rowData;
    const { expand, } = this.state;


    const noeKey = node.props.eventKey;

    const { id2ExtendInfo, } = expand;
    const utils = this.getUtils(this.props);
    if (expanded) {
      utils.expandNode(noeKey, id2ExtendInfo);
    } else {
      utils.colapseNode(noeKey, id2ExtendInfo);
    }
    if (this.isQueryAll(this.props)) {
      this.allExpandKeys = expandedKeys;
    }
    this.setState({ expand: Object.assign({}, this.state.expand, { id2ExtendInfo, }), expandedKeys, });
    onExpand && onExpand(expandedKeys, data);
  };
}

const SvTree = ThemeProvider(Tree, Widget.Tree);
SvTree.TreeNode = TreeNode;
export default SvTree;
