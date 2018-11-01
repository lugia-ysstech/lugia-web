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
import { FontSizeNumber } from '../css';
import CommonIcon from '../icon';
import { DisplayField, ValueField } from '../consts/props';
import contains from 'rc-util/lib/Dom/contains';
import { getCanSeeCountRealy } from '../scroller/support';

const em = px2emcss(FontSizeNumber);
const RightIcon = styled.span`
  position: absolute;
  right: ${em(12)};
  top: 50%;
  transform: translateY(-50%);
`;
const Placeholder = {};

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
  checkbox?: boolean,
  checkedCSS?: 'background' | 'checkbox' | 'none' | 'mark',
  offsetX: number,
  offsetY: number,
};
const getHeight = props => {
  const { theme } = props;
  const { height: themeHeight } = theme;
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
  popupVisible?: boolean,
  separator: string,
  checkedCSS?: 'background' | 'checkbox' | 'none' | 'mark',
|};
type MenuState = {
  init: boolean,
  selectedKeys: Array<string>,
  popupVisible: boolean,
  childData: Array<string> | [],
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
    displayField: DisplayField,
    valueField: ValueField,
    end: 0,
    separator: '|',
    checkedCSS: 'none',
    getTheme: () => {
      return {};
    },
  };
  static displayName = Widget.Menu;
  isSelect: Function;
  trigger: Object;

  constructor(props: MenuProps) {
    super(props);
    this.state = {
      start: 0,
      selectedKeys: getSelectedKeys(props, null),
      init: true,
      popupVisible: false,
      childData: [],
      indexOffsetY: props.indexofY,
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
    let { start, end, checkedCSS, mutliple, separator } = this.props;
    start = Math.round(start);
    end = Math.round(end);
    let items = [];
    if (data && data.length > 0) {
      items = this.computeItems(data, start, end, (obj: Object) => {
        const { valueField, displayField } = this.props;
        const { [valueField]: key, [displayField]: value, disabled, children } = obj;
        const { getPrefix, getSuffix } = props;

        const prefix = getPrefix && getPrefix(obj);
        const suffix = getSuffix && getSuffix(obj);
        const rightIcon =
          checkedCSS !== 'none' || mutliple === true ? null : this.getCascaderIcon(children);

        if (obj === Placeholder) {
          return <li />;
        }
        return (
          <Item key={key} disabled={disabled} checkedCSS={checkedCSS}>
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

    const length = data.length;
    const bodyContent = (
      <MenuContainer
        onMouseLeave={this.onMouseLeaveContainer}
        onMouseEnter={this.onMouseEnterContainer}
        onMouseDown={this.onMouseDownContainer}
        onMouseMove={this.onMouseMoveContainer}
        length={length}
        theme={this.getTheme()}
      >
        {items}
      </MenuContainer>
    );
    if (!Array.isArray(this.state.childData) || this.state.childData.length === 0) {
      return bodyContent;
    }
    const { offsetX } = this.props;
    const { popupVisible, childData } = this.state;
    const x = offsetX === 0 || offsetX ? offsetX : 4;
    return (
      <Trigger
        ref={cmp => (this.trigger = cmp)}
        align={'rightTop'}
        offsetX={x}
        offsetY={this.getOffSetY()}
        createPortal
        popupVisible={popupVisible}
        popup={this.getPopupMenu(childData)}
      >
        {bodyContent}
      </Trigger>
    );
  }

  onMouseEnterContainer = () => {
    const { onMouseEnter } = this.props;
    onMouseEnter && onMouseEnter();
  };

  onMouseMoveContainer = () => {
    const { onMouseMove } = this.props;
    onMouseMove && onMouseMove();
  };

  onMouseDownContainer = () => {
    const { onMouseDown } = this.props;
    onMouseDown && onMouseDown();
  };

  onMouseLeaveContainer = () => {
    const { onMouseLeave } = this.props;
    onMouseLeave && onMouseLeave();
  };

  getOffSetY = () => {
    const { offsetY } = this.props;
    const { indexOffsetY } = this.state;
    if (offsetY === 0) {
      return 0;
    }
    return offsetY || indexOffsetY * MenuItemHeight;
  };

  onMouseLeave = (e: Object) => {
    const { onMouseLeave } = this.props;
    onMouseLeave && onMouseLeave(e);
  };

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
      const indexOffsetY = i - start;
      items.push(this.renderMenuItem(getItem(item), this.isSelect, item, indexOffsetY));
    }
    return items;
  }

  renderMenuItem = (
    child: React.Element<typeof Item>,
    isSelect: Function,
    item: Object,
    indexOffsetY: number
  ) => {
    const { key, props } = child;
    const { disabled } = props;
    return React.cloneElement(
      child,
      this.fetchExtendProps(key, isSelect, item, disabled, indexOffsetY)
    );
  };

  fetchExtendProps(
    key?: null | number | string,
    isSelect: Function,
    item: Object,
    disabled: boolean,
    indexOffsetY: number
  ): MenuItemProps {
    const { mutliple, checkbox } = this.props;
    const eventConfig = this.onMenuItemEventHandler(key, item, disabled, indexOffsetY);
    if (!key || !isSelect(key)) {
      return { mutliple, ...eventConfig, checked: false, checkbox, disabled };
    }
    return { checked: true, mutliple, ...eventConfig, disabled };
  }

  onMenuItemEventHandler = (
    key?: null | number | string,
    item: Object,
    disabled: boolean,
    indexOffsetY: number
  ): Object => {
    if (!key || disabled) {
      return {};
    }
    const { mutliple, onClick, limitCount = 999999, action = 'click', checkedCSS } = this.props;
    return {
      onClick: (event: Object) => {
        if (!key) {
          return;
        }
        this.setState({ indexOffsetY });
        const str = key + '';
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
        this.setState({ selectedKeys: [...selectedKeys] });

        if (action === 'click' && checkedCSS === 'none' && mutliple === false) {
          const newState = { popupVisible: false, childData: [] };

          if (item.children) {
            newState.childData = item.children;
            newState.popupVisible = true;
          }

          const { popupVisible } = this.state;
          if (popupVisible) {
            if (item.children === []) {
              newState.childData = [];
              newState.popupVisible = false;
            } else {
              newState.childData = item.children;
              newState.popupVisible = true;
            }
          }
          this.setState(newState);
        }

        /**
         *  add by szfeng
         */
        onClick && onClick(event, keys, item);
        event.preventDefault();
        event.stopPropagation();
      },
      onMouseEnter: (event: Object) => {
        const { action = 'click', checkedCSS } = this.props;
        if (action !== 'hover' || checkedCSS !== 'none' || mutliple === true) {
          return;
        }
        const newState = { childData: [], popupVisible: false };

        if (item.children) {
          newState.childData = item.children;
          newState.popupVisible = true;
        }
        this.setState(newState);
      },
      getIndexOffsetY: () => {
        const { getIndexOffsetY } = this.props;
        getIndexOffsetY && getIndexOffsetY(indexOffsetY);
      },
    };
  };

  updateIsSelect(state: MenuState, props: MenuProps) {
    this.isSelect = this.createSelect(state, props);
  }

  level2MenuInstance: { [level: string]: Object };

  pushMenuInstance = (level: number, instance: Object) => {
    this.level2MenuInstance[level + ''] = instance;
  };

  deleteMenuInstance = (level: number) => {
    delete this.level2MenuInstance[level + ''];
  };

  mouseDownInMenus = (target: Object) => {
    const { handleIsInMenu } = this.props;
    const isInMenuRange = Object.values(this.level2MenuInstance).some((instance: Object) => {
      const domNode = findDOMNode(instance);
      return contains(domNode.parentNode.parentNode, target);
    });
    handleIsInMenu && handleIsInMenu(isInMenuRange);
    return isInMenuRange;
  };

  getPopupMenu(childrenData: Object[] = []) {
    const { action, checkedCSS, offsetX, offsetY, popupVisible } = this.props;
    const x = offsetX === 0 || offsetX ? offsetX : 4;
    const y = offsetY === 0 || offsetY ? offsetY : null;
    if (!popupVisible) {
      return <div />;
    }
    return (
      <Result
        mutliple={false}
        data={childrenData}
        popupVisible={popupVisible}
        checkedCSS={checkedCSS}
        action={action}
        offsetX={x}
        offsetY={y}
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

Result.Placeholder = Placeholder;
Result.computeCanSeeCount = (height?: number = DefaultHeight): number => {
  return Math.floor(getCanSeeCountRealy(height, MenuItemHeight));
};
Result.MenuItem = Item;
export default Result;
