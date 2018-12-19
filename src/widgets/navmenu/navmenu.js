/**
 *
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import Tree from '../tree';
import Widget from '../consts/index';
import Theme from '../theme';
import Menu from '../menu';
import styled from 'styled-components';
import { getTreeData } from '../menu/utils';

import { MenuItemHeight, DefaultHeight } from '../css/navmenu';
import { TreeUl } from '../css/navmenu';
import {
  themeColor,
  Switcher,
  NullSwitcher,
  Li,
  ChildrenUl,
  TitleWrap,
  TitleSpan,
} from '../css/navmenu';

const MenuWrap = styled.div`
  display: inline-block;
  box-shadow: 0 0 1px 2px #ccc;
`;
//
type RowData = { [key: string]: any };
type NavMenuProps = {
  getTheme: Function,
  start: number,
  end: number,
  query: string,
  onScroller?: Function,
  /** 是否支持多选 */
  mutliple?: boolean,
  limitCount?: number,
  /** 默认展开所有树节点 */
  expandAll: boolean,
  onlySelectLeaf: boolean,
  displayField: string,
  igronSelectField?: string,
  value: ?Array<string>,
  displayValue: ?Array<string>,
  defaultValue: ?Array<string>,
  svThemVersion?: number,
  /** 展开/收起节点时触发 */
  onExpand?: Function,
  /** 点击树节点触发 */
  onSelect?: Function,
  /**
   * 当值发生变化的时候出发
   */
  onChange?: Function,
  splitQuery?: string,
  current: number,
  data?: Array<RowData>,
  inlineType: 'primary' | 'ellipse',
  mode: 'vertical' | 'inline',
  onClick?: Function,
  valueField?: string,
  displayField?: string,
  action?: 'click' | 'hover',
};

type NavMenuState = {
  data: Array<RowData>,
  popupVisible: boolean,
};
const themeStyle = {
  MenuItemHeight,
  DefaultHeight,
  TreeUl,
  themeColor,
  Switcher,
  NullSwitcher,
  Li,
  ChildrenUl,
  TitleWrap,
  TitleSpan,
};
export default class MenuTree extends React.Component<NavMenuProps, NavMenuState> {
  static defaultProps = {
    mode: 'inline',
    valueField: 'value',
    displayField: 'text',
  };

  treeData: Array<Object>;

  constructor(props: NavMenuProps) {
    super(props);
    this.state = {
      data: props.data ? props.data : [],
      popupVisible: false,
    };
    this.treeData = getTreeData(this.props);
  }

  render() {
    return this.getNavMenu();
  }

  getNavMenu = () => {
    const { mode } = this.props;
    if (mode === 'vertical') {
      return this.getVerticalNavMenu();
    }

    return this.getInlineNavMenu();
  };

  getVerticalNavMenu = () => {
    const { data, displayField, valueField, action = 'click' } = this.props;
    const { popupVisible } = this.state;
    const menuConfig = {
      [Widget.Menu]: {
        // width: 200,
        // submenuWidth: 180,
        // autoHeight: true,
        // height: 300,
      },
    };
    return (
      <MenuWrap>
        <Theme config={menuConfig}>
          <Menu
            data={data}
            separator={'/'}
            popupVisible={popupVisible}
            valueField={valueField}
            size={'large'}
            subsize={'bigger'}
            displayField={displayField}
            action={action}
            mutliple={false}
            handleIsInMenu={this.handleIsInMenu}
          />
        </Theme>
      </MenuWrap>
    );
  };

  getInlineNavMenu = () => {
    const config = {
      [Widget.Tree]: {
        // height: 800,
        // width: 220,
        // submenuWidth: 180,
        autoHeight: true,
        // height: 300,
      },
    };
    const { inlineType, expandAll, valueField, displayField } = this.props;
    const treeData = this.treeData;
    return (
      <Theme config={config}>
        <Tree
          expandAll={expandAll}
          inlineType={inlineType}
          data={treeData}
          mutliple={false}
          valueField={valueField}
          displayField={displayField}
          onlySelectLeaf={true}
          onChange={this.onChange}
          themeStyle={themeStyle}
          // onSelect={this.onSelect}
        />
      </Theme>
    );
  };

  handleIsInMenu = (isInMenu: boolean) => {
    const { popupVisible } = this.state;
    if (popupVisible && isInMenu) {
      return;
    }
    this.setState({ popupVisible: isInMenu });
  };

  onChange = (value: string[]) => {
    const item = this.getCheckedItem(value);
    const { onChange } = this.props;
    onChange && onChange(value);
  };

  getCheckedItem(value: string[]): Object {
    const key = value[0];
    const { valueField } = this.props;

    return this.treeData.find(item => item[valueField] === key);
  }

  // onExpand(expandedKeys: string[], data: Object[]) {
  //   console.log('onExpand', expandedKeys, data);
  // }
}
