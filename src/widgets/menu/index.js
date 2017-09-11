/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Item from './item';
import '../css/sv.css';

type MenuProps = {
  mutliple: boolean,
  children: React.ChildrenArray<React.Element<typeof Item>>,
  selectedKeys?: Array<string>,
  defaultSelectedKeys?: Array<string>,
};
const MenuContainer = styled.ul`
  outline: none;
  margin: 0;
  padding-left: 0;
  list-style: none;
  max-height: 250px;
  overflow: auto;
`;


type MenuItemProps = {|
  checked?: boolean,
  mutliple: boolean,
  onClick: Function,
|} ;
type MenuState = {
  selectedKeys: Array<string>,
}

class Menu extends React.Component<MenuProps, MenuState> {
  static MenuItem: typeof Item;
  static defaultProps = {
    mutliple: false,
  };

  constructor (props: MenuProps) {
    super(props);
    this.state = {
      selectedKeys: this.getSelectedKeys(),
    };
  }

  getSelectedKeys (): Array<string> {
    const { selectedKeys = [], defaultSelectedKeys = [], } = this.props;
    if ('selectedKeys' in this.props) {
      return selectedKeys;
    } else if ('defaultSelectedKeys' in this.props) {
      return defaultSelectedKeys;
    }
    return [];
  }

  render () {
    const { children, } = this.props;
    const items = [];
    if (children !== null) {
      React.Children.forEach(children, (child: React.Element<typeof Item>) => {
        items.push(this.renderMenuItem(child));
      });
    }
    return <MenuContainer>{items}</MenuContainer>;
  }

  renderMenuItem = (child: React.Element<typeof Item>) => {
    const { key, } = child;
    return React.cloneElement(child, this.fetchExtendProps(key));
  };

  fetchExtendProps (key?: null | number | string): MenuItemProps {
    const { mutliple, } = this.props;
    const onClick = this.onMenuItemClick(key);
    if (!key || !this.isSelect()(key)) {
      return { mutliple, ...onClick, checked: false, };
    }
    return { checked: true, mutliple, ...onClick, };
  }

  onMenuItemClick = (key?: null | number | string): Object => {
    if (!key) {
      return {};
    }
    return {
      onClick: () => {
        if (!key) {
          return;
        }
        const str = key + '';
        const { mutliple, } = this.props;
        let { selectedKeys, } = this.state;
        if (mutliple) {
          const index = selectedKeys.indexOf(str);
          const noIn = index === -1;
          if (noIn) {
            selectedKeys.push(str);
          } else {
            selectedKeys.splice(index, 1);
          }
        } else {
          selectedKeys = [str,];
        }
        this.setState({ selectedKeys, });
      },
    };
  };

  isSelect (): (number | string) => boolean {
    const existKey = {};
    const { selectedKeys, } = this.state;
    const { mutliple, } = this.props;
    if (selectedKeys && selectedKeys.length > 0) {
      if (mutliple) {
        selectedKeys.forEach(key => {
          existKey[ key ] = true;
        });
      } else {
        existKey[ selectedKeys[ selectedKeys.length - 1 ] ] = true;
      }
    }

    return (key: number | string) => {
      return existKey[ key ];
    };
  }
}

Menu.MenuItem = Item;
export default Menu;


