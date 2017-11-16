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
  utils: TreeUtils;
  queryAllUtils: TreeUtils;


  constructor (props: TreeProps) {
    super(props);

    this.createTreeQueryAllUtils(props);

    if (this.isEmpty(props)) {
      return;
    }
    const expand = this.updateExpandInfo(props);

    const { id2ExtendInfo, } = expand;

    let selectedInfo = {
      checked: {},
      value: {},
      halfchecked: {},
    };
    let selectValue = [];

    let realyValue;
    const existDefault = 'defaultValue' in props;
    const isLimit = this.isLmit(props);
    if (isLimit) {
      const { value = '', } = props;
      realyValue = value;
    } else if (existDefault) {
      const { defaultValue, } = props;
      realyValue = defaultValue;
    }

    if (realyValue && realyValue.trim() !== '') {
      const isSingle = this.isSingleSelect();
      if (isSingle) {
        selectValue = [realyValue,];
      } else {
        selectedInfo = this.getSelectedInfo(realyValue, props, id2ExtendInfo);
      }
    }

    const expandedKeys = this.getExpandedKeys(props, id2ExtendInfo);

    this.state = {
      start: 0,
      expandedKeys,
      expand,
      selectValue,
      selectedInfo,
    };
  }


  componentWillReceiveProps (props: TreeProps) {
    this.loadData(props);
  }


  loadData (props: TreeProps) {

    const expand = this.updateExpandInfo(props);
    const { id2ExtendInfo, } = expand;

    let newSelectedInfo = {
      checked: {},
      value: {},
      halfchecked: {},
    };

    const { selectValue: oldSingleValue = [], } = this.state;
    let selectValue: Array<string> = oldSingleValue;

    const isLimitValue = this.isLmit(props);
    const isSingle = this.isSingleSelect();
    const { value: propsValue, } = props;
    if (isSingle && isLimitValue) {
      selectValue = [];
      if (propsValue) {
        selectValue = [propsValue,];
      }
    }

    if (!isSingle) {
      if (isLimitValue) {
        if (propsValue) {
          newSelectedInfo = this.getSelectedInfo(propsValue, props, id2ExtendInfo);
        }
      } else {
        const { selectedInfo, } = this.state;
        const { value, } = selectedInfo;
        const utils = this.getUtils(props);
        newSelectedInfo = utils.value2SelectInfo(value, id2ExtendInfo);
      }
    }
    const expandedKeys = this.getExpandedKeys(props, id2ExtendInfo);

    this.setState({
      start: this.isQueryAll(props) ? this.state.start : 0,
      selectedInfo: newSelectedInfo,
      expandedKeys,
      expand,
      selectValue,
    });
  }

  isLmit (props: TreeProps) {
    return 'value' in props;
  }

  updateExpandInfo (props: TreeProps): ExpandInfo {
    let result = { id2ExtendInfo: {}, };
    if (this.isQueryAll(props)) {
      if (this.allExpandInfo === undefined) {
        this.allExpandInfo = result;
      }
      result = this.allExpandInfo;
    }

    this.createTreeQueryUtils(props);

    const utils = this.getUtils(props);
    utils.search(result, props.query);
    return result;
  }


  getSelectedInfo (value: string, props: TreeProps, id2ExtendInfo: NodeId2ExtendInfo) {
    const valArray = value.split(',');
    const len = valArray.length;
    const valueObj = {};
    for (let i = 0; i < len; i++) {
      const oneValue = valArray[ i ];
      if (oneValue != '') {
        valueObj[ oneValue ] = true;
      }
    }
    const utils = this.getUtils(props);
    return utils.value2SelectInfo(valueObj, id2ExtendInfo);
  }


  getExpandedKeys (props: TreeProps, id2ExtendInfo): Array<string> {
    let result;
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
    const { query, } = props;
    return (query === '');
  }

  shouldComponentUpdate (nexProps: TreeProps, nextState: TreeState) {
    const dataChanged = nexProps.data !== this.props.data;
    if (dataChanged) {
      this.createTreeQueryAllUtils(nexProps);
    }
    const needUpdate = dataChanged
      || this.props.query !== nexProps.query
      || this.state.start !== nextState.start
      || this.state.selectValue !== nextState.selectValue
      || nextState.expand !== this.state.expand
      || nextState.selectedInfo !== this.state.selectedInfo;
    return needUpdate;
  }


  createTreeQueryUtils (props: TreeProps) {
    const { data, onlySelectLeaf, } = props;
    if (data) {
      this.utils = new TreeUtils(data, { expandAll: true, onlySelectLeaf, });
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


  realyDatas: Array<RowData>;

  render () {
    if (this.isEmpty(this.props)) {
      return <span></span>;
    }
    const {
      showLine,
      mutliple,
    } = this.props;
    const { query, } = this.props;
    const { expand, expandedKeys, selectedInfo, start, selectValue, } = this.state;
    const { id2ExtendInfo, } = expand;
    const { checked, halfchecked, } = selectedInfo;
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
                         mutliple={mutliple}
                         utils={utils}
                         expandedKeys={expandedKeys}
                         onExpand={this.onExpand}></ThrottleTree>;
  }


  isEmpty (props: TreeProps) {
    const { data, } = props;
    return !data || data.length === 0;
  }

  onSelect = (selectValue: Array<string>) => {
    if (this.isSingleSelect()) {
      const selVal = selectValue[ 0 ];
      this.value = selVal != undefined ? selVal : '';
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
      if ('value' in props === false) {
        this.setState({ selectValue, });
      }
    }
  };

  isSingleSelect () {
    const { mutliple, } = this.props;
    return mutliple === false;
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
    const { id2ExtendInfo, } = expand;
    check.bind(utils)(eventKey, selectedInfo, id2ExtendInfo);
    this.value = Object.keys(value);
    this.onChange();
    if ('value' in this.props === false) {
      this.setState({ selectedInfo: { ...selectedInfo, }, });
    }
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
export default SvTree;
