/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import styled from 'styled-components';
import Trigger from '../trigger';
import Theme from '../theme';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import '../common/shirm';
import Input from '../input';
import DropMenuButton from './dropmenuButton';
import QueryInput, { QueryInputPadding } from '../common/QueryInputContainer';
import { DefaultHeight, DefaultWidth, Height, lightGreyColor, MenuItemHeight } from '../css/menu';
import { adjustValue } from '../utils';
import { px2emcss } from '../css/units';

const em = px2emcss(1.2);

const alignType = 'topLeft | top | topRight | bottomLeft | bottom | bottomRight';

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
  align: alignType,
};
const MenuContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 ${em(1)} ${em(6)} ${lightGreyColor};
  border-radius: ${em(4)};
  box-sizing: border-box;
`;
type DropMenuState = {
  visible: boolean,
};

class DropMenu extends React.Component<DropMenuProps, DropMenuState> {
  static defaultProps = {
    action: 'click',
    hideAction: 'click',
    needQueryInput: false,
    align: 'bottom',
    getTheme() {
      return {};
    },
  };
  state: DropMenuState;
  static displayName = Widget.DropMenu;

  trigger: ?Object;

  constructor(props: DropMenuProps) {
    super(props);
    this.state = { filter: '', visible: false };
  }

  render() {
    const { menus, children, action, hideAction, align } = this.props;
    const { width = DefaultWidth, height = DefaultHeight } = this.props.getTheme();
    const offsetY = this.getOffSetY(align);
    const queryInputWidth = width;
    const oldMenuHeight = height - (Height + 2 * QueryInputPadding);
    const menuHeight = adjustValue(oldMenuHeight, MenuItemHeight);
    const menuConfig = {
      [Widget.Menu]: { width, height: menuHeight },
      [Widget.Input]: { width: queryInputWidth },
      [Widget.Trigger]: { width, height: height + (menuHeight - oldMenuHeight) },
    };
    const menu = React.Children.only(menus);

    const popup = [
      this.isNeedQueryInput(),
      <MenuContainer key="menus">
        {React.cloneElement(menu, this.ejectOnClick(menu))}
      </MenuContainer>,
    ];

    return (
      <Theme config={menuConfig}>
        <Trigger
          ref={cmp => (this.trigger = cmp)}
          align={align}
          action={action}
          offsetY={offsetY}
          hideAction={hideAction}
          onPopupVisibleChange={this.onPopupVisibleChange}
          popupVisible={this.state.visible}
          popup={popup}
        >
          {children}
        </Trigger>
      </Theme>
    );
  }

  ejectOnClick = (menu: Object): Object => {
    const newChildProps = {};

    if (!menu.props.onClick) {
      newChildProps.onClick = this.onMenuClick;
    } else {
      newChildProps.onClick = (...rest) => {
        menu.props.onClick.call(menu, ...rest);
        this.onMenuClick();
      };
    }
    return newChildProps;
  };
  onMenuClick = () => {
    this.onPopupVisibleChange(false);
  };

  getOffSetY = (align: string) => {
    const isTop = align === 'topLeft' || align === 'topRight' || align === 'top';
    return isTop ? -4 : 4;
  };

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
    this.setState({ visible });
    onPopupVisibleChange && onPopupVisibleChange(visible);
  };
}

const Result = ThemeProvider(DropMenu, Widget.DropMenu);

Result.Button = DropMenuButton;

export default Result;
