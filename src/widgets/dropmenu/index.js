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

const getShadow = props => {
  const { theme } = props;
  const { boxShadow } = theme;

  const isHasBoxShadow = typeof boxShadow !== undefined;
  return `box-shadow: ${isHasBoxShadow ? boxShadow : `0 ${em(1)} ${em(6)} ${lightGreyColor}`}`;
};

const MenuContainer = styled.div`
  padding: 0;
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
    this.isLeaf = true;
  }

  render() {
    const { menus, children, action, hideAction, align } = this.props;

    if (!children) {
      return <DropMenuButton>下拉菜单</DropMenuButton>;
    }

    const theme = this.props.getTheme();
    const { width = DefaultWidth, height = DefaultHeight } = theme;
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
      <MenuContainer key="menus" theme={theme}>
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
          lazy={false}
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
  setPopupVisible(popupVisible: boolean) {
    this.trigger && this.trigger.setPopupVisible(popupVisible);
  }
  ejectOnClick = (menu: Object): Object => {
    const newChildProps = {};
    if (!menu.props.onClick) {
      newChildProps.onClick = this.onMenuClick;
    } else {
      newChildProps.onClick = (...rest) => {
        menu.props.onClick.call(menu, ...rest);
        this.onMenuClick(...rest);
      };
    }
    return newChildProps;
  };
  onMenuClick = (e: Object, keys: string[], items: Object) => {
    const { children } = items;
    if (!children || children.length === 0) {
      this.isLeaf = true;
      this.onPopupVisibleChange(false);
    } else {
      this.isLeaf = false;
    }
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
    if (this.isLeaf) {
      setTimeout(() => {
        this.setState({ visible });
      }, 200);
      onPopupVisibleChange && onPopupVisibleChange(visible);
    }
  };
}

const Result = ThemeProvider(DropMenu, Widget.DropMenu);

Result.Button = DropMenuButton;

export default Result;
