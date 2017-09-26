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
import ThrolleScroller from '../scroller/ThrottleScroller';
import * as Widget from '../consts/Widget';
import '../css/sv.css';

type MenuProps = {
  start: number,
  end: number,
  getTheme: Function,
  mutliple: boolean,
  children: Array<React.Element<typeof Item>>,
  data: Array<Object>,
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

type MenuItemProps = {|
  checked?: boolean,
  mutliple: boolean,
  onClick: Function,
|} ;
type MenuState = {
  selectedKeys: Array<string>,
}

class Menu extends React.Component<MenuProps, MenuState> {
  static defaultProps = {
    mutliple: false,
    start: 0,
    end: 0,
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
    const { data, start, end,} = this.props;
    let items = [];
    if (data && data.length > 0) {
      items = this.computeItems(data, start, end, (obj: Object) => {
        const { key, value, } = obj;
        return <Item key={key}>{value}</Item>;
      });
    } else {
      const { children, } = this.props;

      if (children && children.length > 0) {
        items = this.computeItems(children,start, end,  (obj: Object) => obj);
      }
    }


    return <MenuContainer theme={this.props.getTheme()}>{items}</MenuContainer>;
  }

  computeItems (data: Array<Object>, start: number, end: number, getItem: Function): Array<Object> {
    const items = [];
    for (let i = start; i < end; i++) {
      items.push(this.renderMenuItem(getItem(data[ i ])));
    }
    return items;
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

const Result = ThemeProvider(ThrolleScroller(Menu, menuItemHeight), Widget.Menu);
Result.MenuItem = Item;
export default Result;


