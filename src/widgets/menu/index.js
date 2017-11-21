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
  getPrefix: Function,
  getSuffix: Function,
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
  user-select: none;
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
  isSelect: Function;

  constructor (props: MenuProps) {
    super(props);
    this.state = {
      start: 0,
      selectedKeys: this.getSelectedKeys(),
    };
    this.updateIsSelect(this.state, this.props);
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


  shouldComponentUpdate (nextProps: MenuProps, nextState: MenuState) {
    const { props, state, } = this;
    const dataChanged = props.data !== nextProps.data || props.children !== nextProps.children;
    const selectedChange = state.selectedKeys !== nextState.selectedKeys;

    if (dataChanged || selectedChange) {
      this.updateIsSelect(nextState, nextProps);
    }
    return dataChanged ||
      props.start !== nextProps.start
      || selectedChange;
  }


  render () {
    const { data, start, end, } = this.props;
    let items = [];
    if (data && data.length > 0) {
      items = this.computeItems(data, start, end, (obj: Object) => {
        const { key, value, } = obj;
        const { getPrefix, getSuffix, } = this.props;
        const prefix = getPrefix && getPrefix(obj);
        const suffix = getSuffix && getSuffix(obj);
        return <Item key={key}>{prefix}{value}{suffix}</Item>;
      });
    } else {
      const { children, } = this.props;
      if (children && children.length > 0) {
        items = this.computeItems(children, start, end, (obj: Object) => obj);
      }
    }


    return <MenuContainer theme={this.props.getTheme()}>{items}</MenuContainer>;
  }

  computeItems (data: Array<Object>, start: number, end: number, getItem: Function): Array<Object> {
    const items = [];
    for (let i = start; i < end; i++) {
      items.push(this.renderMenuItem(getItem(data[ i ]), this.isSelect));
    }
    return items;
  }


  renderMenuItem = (child: React.Element<typeof Item>, isSelect: Function) => {
    const { key, } = child;
    return React.cloneElement(child, this.fetchExtendProps(key, isSelect));
  };

  fetchExtendProps (key?: null | number | string, isSelect: Function): MenuItemProps {
    const { mutliple, } = this.props;
    const onClick = this.onMenuItemClick(key);
    if (!key || !isSelect(key)) {
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
        const keys = { selectedKeys: [...selectedKeys,], };
        this.setState(keys);
      },
    };
  };

  updateIsSelect (state: MenuState, props: MenuProps) {
    this.isSelect = this.createSelect(state, props);
  }

  createSelect = (state: MenuState, props: MenuProps) => {
    const existKey = {};
    const { selectedKeys, } = state;
    const len = selectedKeys.length;
    if (selectedKeys && len > 0) {
      const { mutliple, } = props;
      if (mutliple) {
        for (let i = 0; i < len; i++) {
          existKey[ selectedKeys[ i ] ] = true;
        }
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


