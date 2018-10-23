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
import { DefaultHeight, MenuItemHeight } from '../css/menu';
import ThemeProvider from '../theme-provider';
import ThrolleScroller from '../scroller/ThrottleScroller';
import Widget from '../consts/index';
import '../css/sv.css';
import { adjustValue } from '../utils';
import { px2emcss } from '../css/units';
import Trigger from '../trigger';
import { findDOMNode } from 'react-dom';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { FontSize, FontSizeNumber } from '../css';
import CommonIcon from '../icon';
import contains from 'rc-util/lib/Dom/contains';

const em = px2emcss(FontSizeNumber);
const RightIcon = styled.span`
  position: absolute;
  right: ${em(FontSize)};
  top: 50%;
  transform: translateY(-50%);
`;

type MenuProps = {
  start: number,
  level: number,
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
  disabled?: boolean,
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
`;

type MenuItemProps = {|
  mutliple: boolean,
  onClick: Function,
|};
type MenuState = {
  init: boolean,
  selectedKeys: Array<string>,
};

function getSelectedKeys(props: MenuProps, state: ?MenuState): Array<string> {
  const { selectedKeys = [], defaultSelectedKeys = [] } = props;
  if ('selectedKeys' in props) {
    return selectedKeys;
  } else if ('defaultSelectedKeys' in props) {
    return defaultSelectedKeys;
  }
  return state ? state.selectedKeys : [];
}

let Result = () => <div />;

class Menu extends React.Component<MenuProps, MenuState> {
  static defaultProps = {
    mutliple: false,
    start: 0,
    level: 0,
    displayField: 'text',
    valueField: 'value',
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
    this.level2MenuInstance = {};
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
    const popupChanged =
      nextState.popupVisible !== state.popupVisible || nextState.childData !== state.childData;
    return (
      dataChanged ||
      popupChanged ||
      props.start !== nextProps.start ||
      props.svThemVersion !== nextProps.svThemVersion ||
      selectedChange
    );
  }

  render() {
    const { props } = this;
    const { data } = props;
    let { start, end } = this.props;
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
          <Item key={key} disabled={disabled}>
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
    console.info(this.state.popupVisible);
    const bodyContent = <MenuContainer theme={this.getTheme()}>{items}</MenuContainer>;
    if (!Array.isArray(this.state.childData) || this.state.childData.length === 0) {
      return bodyContent;
    }
    return (
      <Trigger
        ref={cmp => (this.trigger = cmp)}
        align={'rightTop'}
        createPortal
        action={'hover'}
        hideAction={'hover'}
        popupVisible={this.state.popupVisible}
        popup={this.getPopupMenu(this.state.childData)}
      >
        {bodyContent}
      </Trigger>
    );
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
      const item = data[i];
      items.push(this.renderMenuItem(getItem(item), this.isSelect, item));
    }
    return items;
  }

  renderMenuItem = (child: React.Element<typeof Item>, isSelect: Function, item: Object) => {
    const { key, props } = child;
    const { disabled } = props;
    return React.cloneElement(child, this.fetchExtendProps(key, isSelect, item, disabled));
  };

  fetchExtendProps(
    key?: null | number | string,
    isSelect: Function,
    item: Object,
    disabled: boolean
  ): MenuItemProps {
    const { mutliple, checkbox } = this.props;
    const eventConfig = this.onMenuItemEventHandler(key, item, disabled);
    if (!key || !isSelect(key)) {
      return { mutliple, ...eventConfig, checked: false, checkbox, disabled };
    }
    return { checked: true, mutliple, ...eventConfig, disabled };
  }

  onMenuItemEventHandler = (
    key?: null | number | string,
    item: Object,
    disabled: boolean
  ): Object => {
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

        const newState = { selectedKeys: [...selectedKeys], popupVisible: false, childData: [] };
        if (item.children) {
          newState.childData = item.children;
          newState.popupVisible = true;
        }
        this.setState(newState);

        /**
         *  add by szfeng
         */
        onClick && onClick(event, keys, str);
        event.preventDefault();
        event.stopPropagation();
      },
      onMouseEnter: () => {
        // const newState = { childData: [], popupVisible: false };
        // if (item.children) {
        //   newState.childData = item.children;
        //   newState.popupVisible = true;
        // }
        // this.setState(newState);
      },
    };
  };

  updateIsSelect(state: MenuState, props: MenuProps) {
    this.isSelect = this.createSelect(state, props);
  }

  level2MenuInstance: { [level: string]: Object };

  pushMenuInstance = (level: number, instance: Object) => {
    this.level2MenuInstance[level + ''] = instance;
    console.info('this.level2MenuInstanc', this.level2MenuInstance);
  };

  deleteMenuInstance = (level: number) => {
    delete this.level2MenuInstance[level + ''];
    console.info('this.level2MenuInstanc', this.level2MenuInstance);
  };

  mouseDownInMenus = (target: Object) => {
    const isInMenuRange = Object.values(this.level2MenuInstance).some((instance: Object) => {
      const domNode = findDOMNode(instance);
      console.info(domNode.parentNode.parentNode);
      return contains(domNode.parentNode.parentNode, target);
    });
    console.info('mouseDownInMenus', this.props.level, target, isInMenuRange);
    return isInMenuRange;
  };

  getPopupMenu(childrenData: Object[] = []) {
    return (
      <Result
        mutliple={false}
        data={childrenData}
        pushMenuInstance={this.getPushMenuInstance()}
        deleteMenuInstance={this.getDeleteMenuInstance()}
        mouseDownInMenus={this.getMouseDownInMenus()}
        level={this.props.level + 1}
      />
    );
  }

  isRoot() {
    return this.props.level === 0;
  }

  getMouseDownInMenus() {
    return this.isRoot() ? this.mouseDownInMenus : this.props.mouseDownInMenus;
  }

  getPushMenuInstance() {
    return this.isRoot() ? this.pushMenuInstance : this.props.pushMenuInstance;
  }

  getDeleteMenuInstance() {
    return this.isRoot() ? this.deleteMenuInstance : this.props.deleteMenuInstance;
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

  componentDidMount() {
    const pushMenuInstance = this.getPushMenuInstance();
    pushMenuInstance(this.props.level, this);
    let currentDocument;
    if (!this.clickOutsideHandler) {
      currentDocument = document;
      this.clickOutsideHandler = addEventListener(
        currentDocument,
        'mousedown',
        this.onDocumentClick
      );
    }
    // always hide on mobile
    if (!this.touchOutsideHandler) {
      currentDocument = currentDocument || document;
      this.touchOutsideHandler = addEventListener(
        currentDocument,
        'touchstart',
        this.onDocumentClick
      );
    }
  }

  clearOutsideHandler() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.clickOutsideHandler = null;
    }

    if (this.touchOutsideHandler) {
      this.touchOutsideHandler.remove();
      this.touchOutsideHandler = null;
    }
  }

  onDocumentClick = (e: Object) => {
    const mouseDownInMenus = this.getMouseDownInMenus();
    if (!mouseDownInMenus(e.target)) {
      this.setState({ childData: [], popupVisible: false });
    }
  };

  componentWillUnmount() {
    const deleteMenuInstance = this.getDeleteMenuInstance();
    deleteMenuInstance(this.props.level);
    this.clearOutsideHandler();
  }

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

Result = ThemeProvider(ThrolleScroller(Menu, MenuItemHeight), Widget.Menu);

Result.MenuItem = Item;
export default Result;
