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
import * as Widget from '../consts/Widget';

type DropMenuProps = {
  action: Array<string>,
  menus: React.Node,
  children: React.Element<any>,
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
  };
  state: DropMenuState;
  static displayName = Widget.DropMenu;
  isAutoTriggerWidth: boolean;

  constructor (props: DropMenuProps) {
    super(props);
    this.state = { trigerWidth: '100%', };
    this.isAutoTriggerWidth = false;
  }

  render () {
    const { menus, children, action, } = this.props;
    const menuConfig = { [Widget.Menu]: { width: this.state.trigerWidth, }, };
    return <Trigger
      align="bottomLeft"
      action={action}
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

export default DropMenu;
