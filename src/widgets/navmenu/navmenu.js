/**
 *
 * create by szfeng
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
`;

type RowData = { [key: string]: any };
type NavMenuProps = {
  getTheme: Function,
  onScroller?: Function,
  onlySelectLeaf: boolean,
  displayField: string,
  igronSelectField?: string,
  value: ?Array<string>,
  displayValue: ?Array<string>,
  defaultValue: ?Array<string>,
  onExpand?: Function,
  onSelect?: Function,
  onChange?: Function,
  inlineExpandAll?: boolean,
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
const openClassName = 'lugia-icon-direction_up';
const closeClassName = 'lugia-icon-direction_down';
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
  openClassName,
  closeClassName,
};

export default class MenuTree extends React.Component<NavMenuProps, NavMenuState> {
  static defaultProps = {
    mode: 'inline',
    valueField: 'value',
    displayField: 'text',
    inlineExpandAll: true,
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
    const { data, displayField, valueField, action = 'click', getTheme } = this.props;
    const { popupVisible } = this.state;
    const theme = getTheme();
    const { width, submenuWidth, height } = theme;
    const menuConfig = {
      [Widget.Menu]: {
        width,
        submenuWidth,
        height,
        autoHeight: true,
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
            size={'bigger'}
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
    const { inlineType, inlineExpandAll, valueField, displayField, getTheme } = this.props;
    const theme = getTheme();
    const { width } = theme;
    const config = {
      [Widget.Tree]: {
        width,
        autoHeight: true,
      },
    };
    const treeData = this.treeData;
    return (
      <Theme config={config}>
        <Tree
          expandAll={inlineExpandAll}
          inlineType={inlineType}
          data={treeData}
          size={'bigger'}
          mutliple={false}
          valueField={valueField}
          displayField={displayField}
          onlySelectLeaf={true}
          onChange={this.onChange}
          themeStyle={themeStyle}
          onSelect={this.onSelect}
        />
      </Theme>
    );
  };

  getItemObj = (value: string) => {
    const { data } = this.state;
    const { valueField } = this.props;
    if (!data || data.length === 0) {
      return {};
    }

    const item = data.find(item => item[valueField] === value);
    console.log('item', valueField);
  };

  onSelect = obj => {
    console.log('onSelect', obj);
    this.getItemObj(obj[0]);
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
