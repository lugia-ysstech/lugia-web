/**
 * create by szfeng
 *
 * @flow
 */

import * as React from 'react';
import Item from './item';

type treeDataItem = {
  key: string,
  title: string,
  pid: string,
  path: string,
  isLeaf: boolean,
};

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
  selectedKeys?: string[],
  defaultSelectedKeys?: string[],
  valueField?: string,
  displayField?: string,
  indexOffsetY?: number,
  onClick?: Function,
  onChange?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  limitCount?: number,
  disabled?: boolean,
  checkbox?: boolean,
  checkedCSS?: 'background' | 'checkbox' | 'none' | 'mark',
  offsetX: number,
  offsetY: number,
  popupVisible?: boolean,
  separator: string,
  cancelData: Array<Object>,
  action: 'hover' | 'click',
  size: string,
  mouseDownInMenus?: Function,
  pushMenuInstance?: Function,
  deleteMenuInstance?: Function,
  setSelectedKeys?: Function,
  selectedKeysData?: string[],
  expandedData?: string[],
  expandedPath?: string[],
  handleIsInMenu?: Function,
  setExpandedPath: Function,
  allChildData?: Array<Object>,
  treeData?: treeDataItem[],
  getIndexOffsetY?: Function,
};

type MenuState = {
  selectedKeys: string[],
  expandedPath: string[],
  popupVisible: boolean,
  childData: Array<Object>,
  indexOffsetY: number,
};

const EmptyData = [];

export function isRoot(level: number): boolean {
  return level === 0;
}

export function getSelectedKeys(props: MenuProps, state: ?MenuState): Array<string> {
  const { selectedKeys = [], defaultSelectedKeys = [] } = props;
  if ('selectedKeys' in props) {
    return selectedKeys;
  } else if ('defaultSelectedKeys' in props) {
    return defaultSelectedKeys;
  }
  return state ? state.selectedKeys : [];
}

export function getPopupVisible(props: MenuProps, state: MenuState): boolean {
  const { popupVisible = false } = props;
  if ('popupVisible' in props) {
    return popupVisible;
  }
  const childData = state.childData;
  return childData && childData.length > 0 && popupVisible ? true : false;
}

export function getTargetOrDefaultTarget(condition: boolean, target: any, defaultTarget: any) {
  return condition ? target : defaultTarget;
}

export function getExpandedPath(props: MenuProps, state: ?MenuState): Array<string> {
  const { expandedPath = [] } = props;
  if ('expandedPath' in props) {
    return expandedPath;
  }
  return state ? state.expandedPath : [];
}

export function mapDataAndGetSelectedKeys(
  data: Object[],
  targetArr: string[],
  currentArr: string[] = []
) {
  if (targetArr.length === 0) {
    return currentArr;
  }

  const target = targetArr[0];
  data &&
    data.map(item => {
      if (item.value === target) {
        currentArr.push(item.value);
        if (item.children && item.children.length > 0) {
          targetArr.splice(0, 1);
          mapDataAndGetSelectedKeys(item.children, targetArr, currentArr);
        } else {
          return currentArr;
        }
      }
      return currentArr;
    });
}

export function getCascaderData(targetArray: string[] = [], separator: string): string[] {
  if (targetArray.length === 0) {
    return [];
  }

  return targetArray[0].split(separator);
}

export function getExpandDataOrSelectData(props: MenuProps, targetArray: string[] = []): string[] {
  if (!targetArray || targetArray.length === 0) {
    return [];
  }
  return letExpandpathOrSelectedKeysToArray(props, targetArray);
}

export function letExpandpathOrSelectedKeysToArray(
  props: MenuProps,
  target: string[] = []
): string[] {
  if (target.length === 0) {
    return [];
  }
  const { separator, data } = props;
  const result = [];

  const cascaderData = getCascaderData(target, separator);
  mapDataAndGetSelectedKeys(data, cascaderData, result);
  return result;
}

export function getExpandedPathFromPropsOrState(props: MenuProps, state: MenuState) {
  const isExpandedPath = 'expandedPath' in props;
  const { expandedPath: stateExpandedPath = [] } = state;
  const { expandedPath: propsExpandedPath = [] } = props;

  return isExpandedPath ? propsExpandedPath : stateExpandedPath;
}

export function getExpandedData(props: MenuProps, state: MenuState) {
  const { expandedData = [], level } = props;

  const rootExpandedPath = getExpandedPathFromPropsOrState(props, state);
  return getTargetOrDefaultTarget(
    isRoot(level),
    getExpandDataOrSelectData(props, rootExpandedPath),
    expandedData
  );
}

export function getChildData(props: MenuProps, state: MenuState) {
  const { level, allChildData } = props;
  const rootExpandedPath = getExpandedData(props, state);

  if (rootExpandedPath.length === 0) {
    return EmptyData;
  }
  const activeAllChildData = getTargetOrDefaultTarget(
    isRoot(level),
    getInitAllChildData(props, state),
    allChildData
  );
  return activeAllChildData[level];
}

export function getInitChildData(props: MenuProps, state: MenuState | null): any {
  if (!state) {
    return EmptyData;
  }
  if (state) {
    const rootExpandedPath = getExpandedPathFromPropsOrState(props, state);

    if (rootExpandedPath.length === 0) {
      return EmptyData;
    }
    const childData = getChildData(props, state) || EmptyData;
    return childData;
  }
}

/**
 * 获取所有的childrenData
 */

export function getInitAllChildData(props: MenuProps, state: MenuState): Object {
  const { data } = props;
  const expandedData = getExpandedData(props, state);
  const res = mapGetAllChildData(data, expandedData, 0);
  console.log('res', res);
  return res;
}

export function mapGetAllChildData(data: Object[], expandedData: string[], index: number): Object {
  let target = {};
  if (!expandedData || expandedData.length === 0) {
    return target;
  }
  data &&
    data.forEach(item => {
      const { value, children } = item;
      if (value === expandedData[index] && children && children.length > 0) {
        target[index] = children;
        index++;
        target = { ...target, ...mapGetAllChildData(children, expandedData, index++) };
      }
    });
  return target;
}

export function getTreeData(props: Object) {
  const newData = [];
  const { data } = props;
  if (data && data.length > 0) {
    forData(data, newData);
  }
  return newData;
}

export function forData(
  data: Object[],
  target: Object[],
  parentKey?: string,
  parentPath?: string[] = []
) {
  data &&
    data.forEach((item, index) => {
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
        target.push(newObj);
        forData(children, target, item.value, pidArr);
      }
    });
}
