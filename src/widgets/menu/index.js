/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Item, { menuItemHeight, } from './item';
import ThemeProvider from '../common/ThemeProvider';
import * as Widget from '../consts/Widget';
import Scroller from '../scroller';
import '../css/sv.css';

type MenuProps = {
  getTheme: Function,
  mutliple: boolean,
  children: Array<React.Element<typeof Item>>,
  selectedKeys?: Array<string>,
  defaultSelectedKeys?: Array<string>,
};
const defaultHeight = 250;
const height = props => {
  const height = props.theme.height ? props.theme.height : defaultHeight;
  return `${height}px`;
};
const MenuContainer = styled.ul`
  ${props => (props.theme.width ? `width: ${props.theme.width}px;` : '')}
  outline: none;
  margin: 0;
  padding-left: 0;
  list-style: none;
  height: ${height};
  max-height: ${height};
  overflow: hidden;
`;

const MenuCol = styled.div`
  display: inline-block;
`;
const MenuScrollerContainer = styled.div`
  position: relative;
`;
type MenuItemProps = {|
  checked?: boolean,
  mutliple: boolean,
  onClick: Function,
|} ;
type MenuState = {
  start: number,
  selectedKeys: Array<string>,
}

class Menu extends React.Component<MenuProps, MenuState> {
  static defaultProps = {
    mutliple: false,
    getTheme: () => {
      return {};
    },
  };
  static displayName = Widget.Menu;

  constructor (props: MenuProps) {
    super(props);
    this.state = {
      start: 0,
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
    const { start, } = this.state;
    let needScroller = false;
    const items = [];
    let totalSize = 0;
    const viewSize = this.fetchViewHeigh();
    if (children !== null) {
      const seeCount = this.computeCanSeeMenuItemCount();
      totalSize = menuItemHeight * children.length;

      needScroller = seeCount < children.length;
      for (let i = start; i < seeCount + start; i++) {
        items.push(this.renderMenuItem(children[ i ]));
      }
    }
    const menus = <MenuContainer theme={this.props.getTheme()}>{items}</MenuContainer>;
    if (needScroller) {

      return <MenuScrollerContainer>
        <MenuCol>{menus}</MenuCol>
        <MenuCol>
          <Scroller viewSize={viewSize} totalSize={totalSize} onChange={this.onScroller}/>
        </MenuCol>
      </MenuScrollerContainer>;
    }
    return menus;
  }


  onScroller = (value: number) => {
    this.setState({ start: Math.floor(value / menuItemHeight), });
  };

  computeCanSeeMenuItemCount (): number {
    return Math.ceil(this.fetchViewHeigh() / menuItemHeight);
  }

  fetchViewHeigh () {
    const { height = defaultHeight, } = this.props.getTheme();
    return height;
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

const Result = ThemeProvider(Menu, Widget.Menu);
Result.MenuItem = Item;
export default Result;


