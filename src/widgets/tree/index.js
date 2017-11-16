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


    let realyValue;
    const existDefault = 'defaultValue' in props;
    const isLimit = !this.isNotLimit(props);
    if (isLimit) {
      const { value = '', } = props;
      realyValue = value;
    } else if (existDefault) {
      const { defaultValue, } = props;
      realyValue = defaultValue;
    }

    const state = {
      start: 0,
      expandedKeys: this.getExpandedKeys(props, id2ExtendInfo),
      expand,
      selectValue: [],
      selectedInfo: this.getDefaultSelectedInfo(),
    };

    if (realyValue && realyValue.trim() !== '') {
      this.setLimitValue(props, state, id2ExtendInfo, realyValue);
    }

    this.state = state;
  }


  getDefaultSelectedInfo () {
    return {
      checked: {},
      value: {},
      halfchecked: {},
    };
  }

  componentWillReceiveProps (props: TreeProps) {
    this.loadData(props);
  }


  loadData (props: TreeProps) {

    const expand = this.updateExpandInfo(props);
    const { id2ExtendInfo, } = expand;

    const state: TreeState = {
      start: this.isQueryAll(props) ? this.state.start : 0,
      selectedInfo: this.getDefaultSelectedInfo(),
      expandedKeys: this.getExpandedKeys(props, id2ExtendInfo),
      expand,
      selectValue: [],
    };

    const isLimitValue = !this.isNotLimit(props);
    const isSingle = this.isSingleSelect();
    if (isLimitValue) {
      this.setLimitValue(props, state, id2ExtendInfo, props.value);
    } else {
      if (isSingle) {
        state.selectValue = this.state.selectValue;
      } else {
        const { selectedInfo, } = this.state;
        const { value, } = selectedInfo;
        const utils = this.getUtils(props);
        state.selectedInfo = utils.value2SelectInfo(value, id2ExtendInfo);
      }
    }
    this.setState(state);
  }

  isNotLimit (props: TreeProps) {
    return 'value' in props === false;
  }

  setLimitValue (props: TreeProps, state: TreeState, id2ExtendInfo: NodeId2ExtendInfo, value: any) {
    if (value) {
      if (this.isSingleSelectForProps(props)) {
        state.selectValue = [value,];
      } else {
        state.selectedInfo = this.getSelectedInfo(value, this.props, id2ExtendInfo);
      }
    }
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
      if (oneValue !== '') {
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
                         onExpand={this.onExpand}/>;
  }


  isEmpty (props: TreeProps) {
    const { data, } = props;
    return !data || data.length === 0;
  }

  onSelect = (selectValue: Array<string>) => {

    if (this.isSingleSelect() === false) {
      return;
    }
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
    if (this.isNotLimit(this.props)) {
      this.setState({ selectValue, });
    }
  };

  isSingleSelect () {
    return this.isSingleSelectForProps(this.props);
  }

  isSingleSelectForProps (props: TreeProps) {
    const { mutliple, } = props;
    return mutliple === false;
  }

  onScroller = (start: number) => {
    this.setState({ start, });
  };

  value: any;

  onCheck = (_, event) => {
    const { node, checked, shiftKey, } = event;
    const { props, } = node;
    const { eventKey, } = props;
    const { expand, selectedInfo, } = this.state;

    const { halfchecked, value, } = selectedInfo;
    const isHalfSelect = halfchecked[ eventKey ] === undefined;
    const isSelected = isHalfSelect && checked;

    const utils = this.getUtils(this.props);
    const { selectDirNode, unSelectNode, selectNode, } = utils;
    const onlySelectYourself = isSelected ? selectDirNode : unSelectNode;
    const select = isSelected ? selectNode : unSelectNode;

    const { id2ExtendInfo, } = expand;
    const check = shiftKey ? onlySelectYourself : select;
    check.call(utils, eventKey, selectedInfo, id2ExtendInfo);

    this.value = Object.keys(value);
    this.onChange();
    if (this.isNotLimit(this.props)) {
      this.setState({ selectedInfo: { ...selectedInfo, }, });
    }
  };


  onChange = () => {
    const { onChange, } = this.props;
    onChange && onChange(this.value);
  };

  onExpand = (expandedKeys: Array<string>, rowData: { expanded: boolean, node: Object, }) => {
    const { expanded, node, } = rowData;
    const noeKey = node.props.eventKey;
    const utils = this.getUtils(this.props);
    const { expand, } = this.state;
    const { id2ExtendInfo, } = expand;

    expanded ? utils.expandNode(noeKey, id2ExtendInfo) : utils.colapseNode(noeKey, id2ExtendInfo);

    if (this.isQueryAll(this.props)) {
      this.allExpandKeys = expandedKeys;
    }

    const newExpand = Object.assign({},
      this.state.expand,
      { id2ExtendInfo, });

    this.setState({
      expand: newExpand,
      expandedKeys,
    });

    const { onExpand, data = [], } = this.props;
    onExpand && onExpand(expandedKeys, data);
  };
}

const SvTree = ThemeProvider(Tree, Widget.Tree);
export default SvTree;
