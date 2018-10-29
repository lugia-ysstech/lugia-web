/**
 * 菜单
 * create by ligx
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import styled from 'styled-components';
import Item from './item';
import CommonIcon from '../icon';
import { DefaultHeight, MenuItemHeight } from '../css/menu';
import ThemeProvider from '../theme-provider';
import ThrolleScroller from '../scroller/ThrottleScroller';
import Widget from '../consts/index';
import '../css/sv.css';
import { adjustValue } from '../utils';
import { px2emcss } from '../css/units';
import { FontSize, FontSizeNumber } from '../css';

const em = px2emcss(FontSizeNumber);

type MenuProps = {
  start: number,
  end: number,
  getTheme: Function,
  getPrefix: Function,
  getSuffix: Function,
  svThemVersion?: number,
  mutliple: boolean,
  children: Array<React.Element<typeof Item>>,
  data: Array<Object>,
  selectedKeys?: Array<string>,
  valueField?: string,
  displayField?: string,
  defaultSelectedKeys?: Array<string>,
  onClick?: Function,
  limitCount?: number,
  checkbox: boolean,
  handleItemWrap?: Function,
};
const getHeight = props => {
  const themeHeight = props.theme.height;
  const height = themeHeight || themeHeight === 0 ? themeHeight : DefaultHeight;
  return `${em(height)}`;
};
const getWidth = props => (props.theme.width ? `width: ${em(props.theme.width)};` : '');
const MenuContainer = styled.ul`
  ${getWidth} outline: none;
  margin: 0;
  user-select: none;
  padding-left: 0;
  list-style: none;
  height: ${getHeight};
  max-height: ${getHeight};
  overflow: hidden;
  overflow: auto;
`;

type MenuItemProps = {|
  mutliple: boolean,
  onClick: Function,
|};
type MenuState = {
  init: boolean,
  selectedKeys: Array<string>,
  checkbox: boolean,
  disabled: boolean,
};

const RightIcon = styled.span`
  position: absolute;
  right: ${em(12)};
  top: 50%;
  transform: translateY(-50%);
`;

function getSelectedKeys(props: MenuProps, state: ?MenuState): Array<string> {
  const { selectedKeys = [], defaultSelectedKeys = [] } = props;
  if ('selectedKeys' in props) {
    return selectedKeys;
  } else if ('defaultSelectedKeys' in props) {
    return defaultSelectedKeys;
  }
  return state ? state.selectedKeys : [];
}

class Menu extends React.Component<MenuProps, MenuState> {
  static defaultProps = {
    mutliple: false,
    start: 0,
    displayField: 'text',
    valueField: 'value',
    checkbox: false,
    end: 0,
    getTheme: () => {
      return {};
    },
  };
  static displayName = Widget.Menu;
  isSelect: Function;

  constructor(props: MenuProps) {
    super(props);
    this.state = {
      start: 0,
      selectedKeys: getSelectedKeys(props, null),
      init: true,
    };
    this.updateIsSelect(this.state, this.props);
  }

  static getDerivedStateFromProps(props: MenuProps, state: MenuState) {
    if (state.init) {
      return {
        init: false,
      };
    }

    return {
      selectedKeys: getSelectedKeys(props, state),
    };
  }

  shouldComponentUpdate(nextProps: MenuProps, nextState: MenuState) {
    const { props, state } = this;
    const dataChanged =
      props.data !== nextProps.data ||
      props.children !== nextProps.children ||
      nextProps.selectedKeys !== props.selectedKeys;
    const selectedChange = state.selectedKeys !== nextState.selectedKeys;

    if (dataChanged || selectedChange) {
      this.updateIsSelect(nextState, nextProps);
    }
    return (
      dataChanged ||
      props.start !== nextProps.start ||
      props.svThemVersion !== nextProps.svThemVersion ||
      selectedChange
    );
  }

  render() {
    const { props } = this;
    const { data } = props;
    let { start, end, handleItemWrap } = this.props;
    start = Math.round(start);
    end = Math.round(end);
    let items = [];
    if (data && data.length > 0) {
      items = this.computeItems(data, start, end, (obj: Object) => {
        const { valueField, displayField, checkbox } = this.props;
        const { [valueField]: key, [displayField]: value, disabled, children } = obj;
        const { getPrefix, getSuffix } = props;
        const prefix = getPrefix && getPrefix(obj);
        const suffix = getSuffix && getSuffix(obj);
        const rightIcon = checkbox ? null : this.getCascaderIcon(children);
        return (
          <Item
            key={key}
            disabled={disabled}
            handleItemWrap={handleItemWrap}
            childrenData={children}
          >
            {prefix}
            {value}
            {suffix}
            {rightIcon}
          </Item>
        );
      });
    } else {
      const { children } = props;
      if (children && children.length > 0) {
        items = this.computeItems(children, start, end, (obj: Object) => obj);
      }
    }

    return <MenuContainer theme={this.getTheme()}>{items}</MenuContainer>;
  }

  getTheme() {
    const { getTheme } = this.props;
    const theme = getTheme();
    const { height = DefaultHeight } = theme;
    theme.height = adjustValue(height, MenuItemHeight);
    return theme;
  }

  computeItems(data: Array<Object>, start: number, end: number, getItem: Function): Array<Object> {
    const items = [];
    for (let i = start; i < end; i++) {
      items.push(this.renderMenuItem(getItem(data[i]), this.isSelect));
    }
    return items;
  }

  renderMenuItem = (child: React.Element<typeof Item>, isSelect: Function) => {
    const { key, props } = child;
    const { disabled } = props;
    return React.cloneElement(child, this.fetchExtendProps(key, isSelect, disabled));
  };

  fetchExtendProps(
    key?: null | number | string,
    isSelect: Function,
    disabled: boolean
  ): MenuItemProps {
    const { mutliple, checkbox } = this.props;
    const onClick = this.onMenuItemClick(key, disabled);
    if (!key || !isSelect(key)) {
      return { mutliple, ...onClick, checked: false, checkbox, disabled };
    }
    return { checked: true, mutliple, ...onClick, checkbox, disabled };
  }

  onMenuItemClick = (key?: null | number | string, disabled: boolean): Object => {
    if (!key || disabled) {
      return {};
    }
    return {
      onClick: (event: Object) => {
        if (!key) {
          return;
        }
        const str = key + '';
        const { mutliple, onClick, limitCount = 999999 } = this.props;
        let { selectedKeys } = this.state;
        if (mutliple) {
          const index = selectedKeys.indexOf(str);
          const noIn = index === -1;
          if (noIn) {
            if (selectedKeys.length < limitCount) {
              selectedKeys.push(str);
            } else {
              return;
            }
          } else {
            selectedKeys.splice(index, 1);
          }
        } else {
          selectedKeys = [str];
        }
        const keys = { selectedKeys: [...selectedKeys] };
        this.setState(keys);
        /**
         *  add by szfeng
         */
        onClick && onClick(event, keys, str);
      },
    };
  };

  updateIsSelect(state: MenuState, props: MenuProps) {
    this.isSelect = this.createSelect(state, props);
  }

  createSelect = (state: MenuState, props: MenuProps) => {
    const existKey = {};
    const { selectedKeys } = state;
    const len = selectedKeys.length;
    if (selectedKeys && len > 0) {
      const { mutliple } = props;
      if (mutliple) {
        for (let i = 0; i < len; i++) {
          existKey[selectedKeys[i]] = true;
        }
      } else {
        existKey[selectedKeys[selectedKeys.length - 1]] = true;
      }
    }

    return (key: number | string) => {
      return existKey[key];
    };
  };

  getCascaderIcon = (children: Object[]) => {
    if (children && children.length > 0) {
      return (
        <RightIcon>
          <CommonIcon iconClass="lugia-icon-direction_right" />
        </RightIcon>
      );
    }
    return null;
  };
}

const Result = ThemeProvider(ThrolleScroller(Menu, MenuItemHeight), Widget.Menu);
Result.MenuItem = Item;
export default Result;
