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
import Theme from '../theme';
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
import { SeparatorBorder } from '../css/dropmenubutton';

const em = px2emcss(FontSizeNumber);
const LeftIcon = styled(CommonIcon)`
  font-size: ${em(12)};
  padding-right: ${px2emcss(1.2)(10)};
`;
const RightIcon = styled.span`
  position: absolute;
  right: ${em(12)};
  top: 50%;
  transform: translateY(-50%);
`;
const Placeholder = {};

const getHeight = props => {
  const { theme } = props;
  const { height: themeHeight } = theme;
  const height = themeHeight || themeHeight === 0 ? themeHeight : DefaultHeight;
  return `${em(height)}`;
};
const getWidth = props => {
  const { theme, level } = props;
  const { width, submenuWidth } = theme;
  if (level === 0) {
    return width ? `width: ${em(width)};` : '';
  }
  return submenuWidth ? `width: ${em(submenuWidth)};` : '';
};
const MenuContainer = styled.ul`
  ${getWidth};
  outline: none;
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
  action: string,
  onClick: Function,
  popupVisible?: boolean,
  separator: string,
  size: 'large' | 'small' | 'bigger',
  checkedCSS?: 'background' | 'checkbox' | 'none' | 'mark',
|};

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
  indexOffsetY?: number,
  onClick?: Function,
  onChange?: Function,
  onMouseLeave?: Function,
  limitCount?: number,
  disabled?: boolean,
  checkbox?: boolean,
  checkedCSS?: 'background' | 'checkbox' | 'none' | 'mark',
  offsetX: number,
  offsetY: number,
  popupVisible?: boolean,
  separator: string,
  cancelData: Object[],
  action: string,
  mouseDownInMenus?: Function,
  pushMenuInstance?: Function,
  deleteMenuInstance?: Function,
  setActiveLevelData?: Function,
  setSelectedKeys?: Function,
  thisActiveLevelData?: string[],
  expandedPath?: string[],
};

type MenuState = {
  init: boolean,
  selectedKeys: Array<string>,
  popupVisible: boolean,
  childData: Array<string> | [],
  indexOffsetY: number,
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

function getExpandedPath(props: MenuProps, state: ?MenuState): Array<string> {
  const { expandedPath = [] } = props;
  if ('expandedPath' in props) {
    return expandedPath;
  }
  return state ? state.expandedPath : [];
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
    size: 'bigger',
  };
  static displayName = Widget.Menu;
  isSelect: Function;
  trigger: Object;
  activeLevelData: string[] | [];

  constructor(props: MenuProps) {
    super(props);
    this.state = {
      selectedKeys: getSelectedKeys(props, null),
      expandedPath: getExpandedPath(props, null),
      // popupVisible: getPopupVisible(props, null),
      popupVisible: false,
      childData: this.getInitChildData(),
    };
    // 将menu数组展开成属性解构数据，方便去遍历取出单项数据path路径
    this.treeData = this.getPathData(this.props);
    this.activeLevelData = this.getInitLevelData(props);
    this.allChildData = this.getInitAllChildData(props);
    this.updateIsSelect(this.state, this.props);
    this.level2MenuInstance = {};
    this.rootMenuPopupVisible = this.getRootPopupVisible(props);
  }

  getRootPopupVisible = (props: MenuProps) => {
    const { level } = props;
    if (level === 0) {
      // console.log('props.Visible', props.popupVisible);
    }
  };

  static getDerivedStateFromProps(props: MenuProps, state: MenuState) {
    if (!state) {
      return {
        start: 0,
        indexOffsetY: 0,
        // 静态方法没有this
      };
    }

    return {
      selectedKeys: getSelectedKeys(props, state),
      expandedPath: getExpandedPath(props, state),
      popupVisible: state.childData && state.childData.length > 0 ? true : false,
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

    const expandedPathChanged =
      nextState.expandedPath !== state.expandedPath ||
      nextProps.expandedPath !== props.expandedPath;
    if (expandedPathChanged) {
      this.activeLevelData = this.getInitLevelData(nextProps);
      this.allChildData = this.getInitAllChildData(nextProps);
    }
    const popupChanged =
      nextState.popupVisible !== state.popupVisible ||
      nextProps.popupVisible !== props.popupVisible ||
      nextState.childData !== state.childData;

    return (
      dataChanged ||
      popupChanged ||
      props.start !== nextProps.start ||
      props.svThemVersion !== nextProps.svThemVersion ||
      selectedChange ||
      expandedPathChanged
    );
  }

  mapDataAndGetSelectedKeys(data: Object[], targetArr: string[], currentArr: [] | string[]) {
    if (targetArr.length === 0) {
      return currentArr;
    }
    const target = targetArr[0];
    data.map(item => {
      if (item.value === target) {
        currentArr.push(item.value);
        if (item.children && item.children.length > 0) {
          targetArr.splice(0, 1);
          this.mapDataAndGetSelectedKeys(item.children, targetArr, currentArr);
        } else {
          return currentArr;
        }
      }
      return currentArr;
    });
  }

  getInitLevelData = (props: MenuProps) => {
    const { expandedPath = [], separator, data, level } = props;

    if (expandedPath.length === 0) {
      return [];
    }
    if (level === 0) {
      console.log('expandedPath', expandedPath);
    }
    const initLevelArray = [];
    const cascaderData = expandedPath[0].split(separator);
    this.mapDataAndGetSelectedKeys(data, cascaderData, initLevelArray);
    return initLevelArray;
  };

  // 将所有ChildData在第一层Menu中遍历出来，然后逐层传递
  getChildData = () => {
    const { thisActiveLevelData, level, data } = this.props;
    const levelData = this.isRoot() ? this.getInitLevelData(this.props) : thisActiveLevelData;
    let childData = [];
    if (levelData.length > 0) {
      data.forEach(item => {
        if (item.value === levelData[level]) {
          childData = item.children;
        }
      });
      return childData;
    }
  };

  mapGetAllChildData = (data: Object[], levelArray: string[], index: number): Object => {
    let target = {};
    if (!levelArray) {
      return target;
    }
    data.forEach(item => {
      const { value, children } = item;
      if (value === levelArray[index] && children && children.length > 0) {
        target[index] = children;
        index++;
        target = { ...target, ...this.mapGetAllChildData(children, levelArray, index++) };
      }
    });
    return target;
  };

  // 获取所有的ChildData
  getInitAllChildData = (props: MenuProps) => {
    const { data, level } = props;
    const levelData = this.activeLevelData;
    const res = this.mapGetAllChildData(data, levelData, 0);
    if (level === 0) {
      console.log('res', res);
    }
    return res;
  };

  // 第二种方法，在每一层的state中，独自遍历获取自己的ChildData
  getInitChildData = () => {
    const { expandedPath = [], data, level } = this.props;
    if (expandedPath.length === 0) {
      return [];
    }
    const childData = this.getChildData() || [];
    return childData;
  };

  getPathData = (props: Object) => {
    const newData = [];
    const { data } = props;
    if (data && data.length > 0) {
      this.forData(data, newData);
    }
    return newData;
  };

  forData = (data: Object[], target: Object[], parentKey?: string[], parentPath?: string[]) => {
    data.map((item, index) => {
      const { children } = item;
      const newObj = {};
      newObj.key = item.value;
      newObj.title = item.text;
      let pidArr;
      if (!parentKey) {
        newObj.pid = undefined;
        newObj.path = undefined;
        pidArr = [];
      } else {
        newObj.pid = parentKey;
        if (parentPath.indexOf(parentKey) === -1) {
          parentPath.push(parentKey);
        }
        pidArr = [...parentPath];
        newObj.path = pidArr.join('/');
      }

      if (!children || children.length === 0) {
        newObj.isLeaf = true;
        target.push(newObj);
      } else {
        newObj.alwaysExpanded = item.alwaysExpanded;
        target.push(newObj);
        this.forData(children, target, item.value, pidArr);
      }
    });
  };

  render() {
    const { props } = this;
    let { start, end, checkedCSS, mutliple, cancelData, size, data, level, expandedPath } = props;
    console.log('nextProps', level, expandedPath);
    // console.log('allChildrenArray', allChildData);

    start = Math.round(start);
    end = Math.round(end);
    let items = [];
    if (data && data.length > 0) {
      items = this.computeItems(data, start, end, (obj: Object) => {
        const { valueField, displayField } = this.props;
        const { [valueField]: key, [displayField]: value, disabled, children, icon } = obj;
        const { getPrefix, getSuffix } = props;

        const prefix = getPrefix && getPrefix(obj);
        const suffix = getSuffix && getSuffix(obj);
        const rightIcon =
          checkedCSS !== 'none' || mutliple === true ? null : this.getCascaderIcon(children);

        if (obj === Placeholder) {
          return <li />;
        }

        const Icon = icon ? <LeftIcon iconClass={icon} /> : null;
        return (
          <Item key={key} size={size} disabled={disabled} checkedCSS={checkedCSS}>
            {prefix}
            {Icon}
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
    const bodyContent = (
      <MenuContainer theme={this.getTheme()} level={this.props.level}>
        {items}
      </MenuContainer>
    );
    if (!Array.isArray(this.state.childData) || this.state.childData.length === 0) {
      return bodyContent;
    }

    const { offsetX, getTheme } = this.props;
    const { popupVisible = false, childData } = this.state;
    const x = offsetX === 0 || offsetX ? offsetX : 4;
    const { submenuWidth } = getTheme();
    return (
      <Theme config={{ [Widget.Trigger]: { width: submenuWidth } }}>
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
      </Theme>
    );
  }

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
    const {
      mutliple,
      onClick,
      onChange,
      limitCount = 999999,
      action = 'click',
      checkedCSS,
      level,
      separator,
    } = this.props;
    return {
      onClick: (event: Object) => {
        if (!key) {
          return;
        }
        this.setState({ indexOffsetY });
        const str = key + '';
        let { selectedKeys } = this.state;
        const isHasSelectedKeys = this.props.selectedKeys;
        // 此处如果加上if条件，则会出现报错
        // if (!isHasSelectedKeys)
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
          const pathArr = this.getPathArr(key);
          const setActiveLevelData = this.getSetActiveLevelData();
          const newLevelData = setActiveLevelData(pathArr);
          selectedKeys = [newLevelData.join(separator)];
        }

        const keys = { selectedKeys: [...selectedKeys] };

        const setSelectedKeys = this.getSetSelectedKeys();
        setSelectedKeys(selectedKeys);

        if (action === 'click' && checkedCSS === 'none' && mutliple === false) {
          const newState = { popupVisible: false, childData: [] };
          this.setState(newState);

          setTimeout(() => {
            if (item.children) {
              newState.childData = item.children;
              newState.popupVisible = true;
            }
            this.setState(newState);
          }, 0);
        }

        /**
         *  add by szfeng
         */
        onClick && onClick(event, keys, item);
        onChange && onChange(keys);

        event.preventDefault();
        event.stopPropagation();
      },
      onMouseEnter: (event: Object) => {
        const { action = 'click', checkedCSS, onMouseEnter } = this.props;
        if (action !== 'hover' || checkedCSS !== 'none' || mutliple === true) {
          return;
        }
        const pathArr = this.getPathArr(key);
        const setActiveLevelData = this.getSetActiveLevelData();
        const newLevelData = setActiveLevelData(pathArr);
        const expandedPath = [newLevelData.join(separator)];
        onMouseEnter && onMouseEnter(event, expandedPath, item);
        // if ('expandedPath' in this.props) {
        //   const pathArr = this.getPathArr(key);
        //   const newExpandedPath = [pathArr.join(separator)];
        //   if (item.children && item.children.length > 0) {
        //     onMouseEnter && onMouseEnter(newExpandedPath);
        //   }
        // }
        // const newState = { childData: [], popupVisible: false };
        // this.setState(newState);
        // setTimeout(() => {
        //   if (item.children) {
        //     newState.childData = item.children;
        //     newState.popupVisible = true;
        //     this.setState(newState);
        //   }
        // }, 0);
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

  getPathArr = (key: string) => {
    const { treeData, separator } = this.props;
    const pathArr = [];
    if (this.isRoot()) {
      return [key];
    }
    treeData.forEach(item => {
      if (key === item.key) {
        const newPath = item.path + '/' + key;
        pathArr.push(newPath);
      }
    });

    return pathArr[0].split(separator);
  };

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

  setActiveLevelData = (levelData: Object[]) => {
    this.activeLevelData = JSON.parse(JSON.stringify(levelData));
    return this.activeLevelData;
  };

  setSelectedKeys = (selectedKeys: string[]) => {
    this.setState({ selectedKeys });
  };

  thisActiveLevelData = () => {
    return this.activeLevelData;
  };

  getPopupMenu(childrenData: Object[] = []) {
    const {
      action,
      checkedCSS,
      offsetX,
      offsetY,
      separator,
      level,
      onClick,
      onMouseEnter,
      onChange,
      popupVisible,
    } = this.props;
    const { selectedKeys, expandedPath: rootExpandedPath, allChildData } = this.state;
    const treeData = this.isRoot() ? this.treeData : this.props.treeData;
    const expandedPath = this.isRoot() ? rootExpandedPath : this.props.expandedPath;
    const x = offsetX === 0 || offsetX ? offsetX : 4;
    const y = offsetY === 0 || offsetY ? offsetY : null;
    return (
      <Result
        mutliple={false}
        ref={cmp => (this.childMenu = cmp)}
        data={childrenData}
        popupVisible={popupVisible}
        checkedCSS={checkedCSS}
        action={action}
        separator={separator}
        selectedKeys={selectedKeys}
        allChildData={allChildData}
        offsetX={x}
        offsetY={y}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onChange={onChange}
        pushMenuInstance={this.getPushMenuInstance()}
        deleteMenuInstance={this.getDeleteMenuInstance()}
        mouseDownInMenus={this.getMouseDownInMenus()}
        level={level + 1}
        setActiveLevelData={this.getSetActiveLevelData()}
        setSelectedKeys={this.getSetSelectedKeys()}
        thisActiveLevelData={this.getThisActiveLevelData()}
        treeData={treeData}
        expandedPath={expandedPath}
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

  getSetActiveLevelData = () => {
    return this.isRoot() ? this.setActiveLevelData : this.props.setActiveLevelData;
  };

  getSetSelectedKeys = () => {
    return this.isRoot() ? this.setSelectedKeys : this.props.setSelectedKeys;
  };

  getThisActiveLevelData = () => {
    return this.isRoot() ? this.activeLevelData : this.props.thisActiveLevelData;
  };

  isCascaderData = () => {
    const { selectedKeys = [], separator } = this.props;
    if (selectedKeys.length > 0) {
      return !!(selectedKeys[0].indexOf(separator) !== -1);
    }
    return false;
  };

  // this.isSelect,返回一个箭头函数，验证key是否被选中。
  createSelect = (state: MenuState, props: MenuProps) => {
    const existKey = {};
    const { selectedKeys } = state;
    const { level, thisActiveLevelData } = props;
    const len = selectedKeys.length;
    if (selectedKeys && len > 0) {
      const { mutliple } = props;
      if (mutliple) {
        for (let i = 0; i < len; i++) {
          existKey[selectedKeys[i]] = true;
        }
      } else {
        // console.log('this.isCascaderData()', this.isCascaderData());
        // if (this.isCascaderData()) {
        // 出现BUG，当点击第一层，再点击第二层时，会出现selectedKeys不生效
        const activeLevelData = this.isRoot() ? this.activeLevelData : thisActiveLevelData;
        existKey[activeLevelData[level]] = true;
        // } else {
        // existKey[selectedKeys[selectedKeys.length - 1]] = true;
        // }
      }
    }
    return (key: number | string) => {
      return existKey[key];
    };
  };

  forceAlign() {
    this.trigger && this.trigger.getThemeTarget().forceAlign();
    if (this.childMenu) {
      this.childMenu.getThemeTarget().scrollerTarget.forceAlign();
    }
  }
  componentDidMount() {
    const { level } = this.props;
    if (level === 0) {
      this.forceAlign();
    }
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
