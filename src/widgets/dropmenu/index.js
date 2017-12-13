/**
 * 下拉菜单
 * by ligx
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Trigger from '../trigger';
import Theme from '../theme';
import ThemeProvider from '../common/ThemeProvider';
import * as Widget from '../consts/Widget';
import '../common/shirm';
import Input from '../input';
import QueryInput, { QueryInputPadding, } from '../common/QueryInputContainer';

const defaultWidth = 200;
type DropMenuProps = {
  action: Array<string>,
  hideAction: Array<string>,
  menus: React.Node,
  children: React.Element<any>,
  onPopupVisibleChange?: Function,
  onQuery: Function,
  getTheme: Function,
};
const MenuContainer = styled.div`
   background-color: #fff;
   box-shadow: 0 1px 6px rgba(0,0,0,.2);
   border-radius: 4px;
   box-sizing: border-box;
`;
type DropMenuState = {};

class DropMenu extends React.Component<DropMenuProps, DropMenuState> {
  static defaultProps = {
    action: ['click',],
    hideAction: ['click',],
    getTheme () {
      return {};
    },
  };
  state: DropMenuState;
  static displayName = Widget.DropMenu;

  trigger: ?Object;

  constructor (props: DropMenuProps) {
    super(props);
    this.state = { filter: '', };
  }

  render () {
    const { menus, children, action, hideAction, } = this.props;
    const { width = defaultWidth, } = this.props.getTheme();

    const queryInputWidth = (width) - (2 * QueryInputPadding);
    const menuConfig = {
      [ Widget.Menu ]: { width, },
      [ Widget.Input ]: { width: queryInputWidth, },
      [ Widget.Trigger ]: { width, },
    };
    const popup = [<QueryInput key="queryContainer"><Input onChange={this.onQuery} key="quernInput"/></QueryInput>,
      <MenuContainer key="menus">{menus}</MenuContainer>,];
    return <Theme config={menuConfig}> <Trigger
      onPopupVisibleChange={this.onPopupVisibleChange}
      ref={cmp => this.trigger = cmp}
      align="bottomLeft"
      action={action}
      hideAction={hideAction}
      popup={
        popup
      }>
      {children}
    </Trigger></Theme>;
  }

  onQuery = value => {
    const { onQuery, } = this.props;
    onQuery && onQuery(value);
  };
  onPopupVisibleChange = (visible: boolean) => {
    const { onPopupVisibleChange, } = this.props;
    onPopupVisibleChange && onPopupVisibleChange(visible);
  };

}

export default ThemeProvider(DropMenu, Widget.DropMenu);
