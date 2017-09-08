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
  selectKeys?: Array<string>,
  defaultSelectKeys?: Array<string>,
};
const MenuContainer = styled.ul`
  outline: none;
  margin-bottom: 0;
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
  selectKeys: Array<string>,
}

class Menu extends React.Component<MenuProps, MenuState> {
  static MenuItem: typeof Item;
  static defaultProps = {
    mutliple: false,
  };

  constructor (props: MenuProps) {
    super(props);
    this.state = {
      selectKeys: this.getSelectkeys(),
    };
  }

  getSelectkeys (): Array<string> {
    const { selectKeys = [], defaultSelectKeys = [], } = this.props;
    if ('selectKeys' in this.props) {
      return selectKeys;
    } else if ('defaultSelectedKeys' in this.props) {
      return defaultSelectKeys;
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
    const { selectKeys, } = this.state;
    const onClick = this.onMenuItemClick(key);
    if (!key || !this.isSelect(selectKeys)(key)) {
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
        const { selectKeys, } = this.state;
        const index = selectKeys.indexOf(str);

        const noIn = index === -1;
        if (noIn) {
          selectKeys.push(str);
        } else {
          selectKeys.splice(index, 1);
        }
        this.setState({ selectKeys, });
      },
    };
  };

  isSelect (selectedKeys?: Array<string>): (number | string) => boolean {
    const existKey = {};
    selectedKeys && selectedKeys.forEach(key => {
      existKey[ key ] = true;
    });
    return (key: number | string) => {
      return existKey[ key ];
    };
  }
}

Menu.MenuItem = Item;
export default Menu;


