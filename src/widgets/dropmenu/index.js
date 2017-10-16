/**
 * 下拉菜单
 * by ligx
 * @flow
 */
import * as React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import Trigger from '../trigger';
import Theme from '../theme';
import ThemeProvider from '../common/ThemeProvider';
import * as Widget from '../consts/Widget';

type DropMenuProps = {
  action: Array<string>,
  hideAction: Array<string>,
  menus: React.Node,
  children: React.Element<any>,
  getTheme: Function,
};
const MenuContainer = styled.div`
   background-color: #fff;
   box-shadow: 0 1px 6px rgba(0,0,0,.2);
   border-radius: 4px;
   box-sizing: border-box;
`;
type DropMenuState = {
  trigerWidth: string;
};

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
  isAutoTriggerWidth: boolean;

  constructor (props: DropMenuProps) {
    super(props);
    const { getTheme, } = props;
    const { width, } = getTheme();
    if (width) {
      this.state = { trigerWidth: width, };
      this.isAutoTriggerWidth = true;
    } else {
      this.state = { trigerWidth: '100%', };
      this.isAutoTriggerWidth = false;

    }
  }

  trigger: ?Object;

  render () {
    const { menus, children, action, hideAction,} = this.props;
    const menuConfig = { [Widget.Menu]: { width: this.state.trigerWidth, }, };
    return <Trigger
      ref={cmp => this.trigger = cmp}
      align="bottomLeft"
      action={action}
      hideAction={hideAction}
      popup={
        <MenuContainer><Theme config={menuConfig}>{menus}</Theme></MenuContainer>
      }>
      {children}
    </Trigger>;
  }

  componentDidMount () {
    this.autoMenuWidth();
  }

  componentDidUpdate () {
    this.autoMenuWidth();
  }

  autoMenuWidth () {
    if (!this.isAutoTriggerWidth) {
      this.isAutoTriggerWidth = true;
      const domNode = ReactDom.findDOMNode(this);
      if (domNode && domNode.offsetWidth) {
        this.setState({ trigerWidth: `${String(domNode.offsetWidth)}`, }, () => {
          this.isAutoTriggerWidth = false;
        });
      }
    }
  }
}

export default ThemeProvider(DropMenu, Widget.DropMenu);
