/**
 * 下拉菜单
 * by ligx
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Trigger from '../trigger';
import Theme from '../theme';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import '../common/shirm';
import Input from '../input';
import QueryInput, { QueryInputPadding } from '../common/QueryInputContainer';
import { Height } from '../css/menu';
import { adjustValue } from '../utils';
import { MenuItemHeight, DefaultHeight, DefaultWidth, lightGreyColor } from '../css/menu';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);

type DropMenuProps = {
  action: Array<string>,
  hideAction: Array<string>,
  menus: React.Node,
  children: React.Element<any>,
  onPopupVisibleChange?: Function,
  onQuery: Function,
  getTheme: Function,
  query: string,
  needQueryInput: boolean,
};
const MenuContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 ${em(1)} ${em(6)} ${lightGreyColor};
  border-radius: ${em(4)};
  box-sizing: border-box;
`;
type DropMenuState = {};

class DropMenu extends React.Component<DropMenuProps, DropMenuState> {
  static defaultProps = {
    action: ['click'],
    hideAction: ['click'],
    needQueryInput: false,
    getTheme() {
      return {};
    },
  };
  state: DropMenuState;
  static displayName = Widget.DropMenu;

  trigger: ?Object;

  constructor(props: DropMenuProps) {
    super(props);
    this.state = { filter: '' };
  }

  render() {
    const { menus, children, action, hideAction } = this.props;
    const { width = DefaultWidth, height = DefaultHeight } = this.props.getTheme();

    const queryInputWidth = width;
    const oldMenuHeight = height - (Height + 2 * QueryInputPadding);
    const menuHeight = adjustValue(oldMenuHeight, MenuItemHeight);
    const menuConfig = {
      [Widget.Menu]: { width, height: menuHeight },
      [Widget.Input]: { width: queryInputWidth },
      [Widget.Trigger]: { width, height: height + (menuHeight - oldMenuHeight) },
    };
    const popup = [this.isNeedQueryInput(), <MenuContainer key="menus">{menus}</MenuContainer>];
    return (
      <Theme config={menuConfig}>
        <Trigger
          onPopupVisibleChange={this.onPopupVisibleChange}
          ref={cmp => (this.trigger = cmp)}
          align="bottomLeft"
          action={action}
          hideAction={hideAction}
          popup={popup}
        >
          {children}
        </Trigger>
      </Theme>
    );
  }

  isNeedQueryInput() {
    const { needQueryInput, query } = this.props;
    if (needQueryInput) {
      return (
        <QueryInput key="queryContainer">
          <Input onChange={this.onQuery} key="quernInput" value={query} />
        </QueryInput>
      );
    }
    return null;
  }

  onQuery = value => {
    const { onQuery } = this.props;
    onQuery && onQuery(value);
  };
  onPopupVisibleChange = (visible: boolean) => {
    const { onPopupVisibleChange } = this.props;
    onPopupVisibleChange && onPopupVisibleChange(visible);
  };
}

export default ThemeProvider(DropMenu, Widget.DropMenu);
