/**
 * create by szfeng
 *
 * @flow
 */

import * as React from 'react';
import Item from './item';

type treeDataItem = {
  value: string,
  text: string,
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
  const { popupVisible = true } = props;
  if ('popupVisible' in props) {
    return popupVisible;
  }

  return true;
}

export function getTargetOrDefaultTarget(condition: boolean, target: any, defaultTarget: any) {
  return condition ? target : defaultTarget;
}

export function getTargetOrDefaultTargetLazy(
  condition: boolean,
  target: Function,
  defaultTarget: Function
) {
  const matchFunc = getTargetOrDefaultTarget(condition, target, defaultTarget);
  return matchFunc();
}

export function getExpandedPath(props: MenuProps, state: ?MenuState): Array<string> {
  const { expandedPath = [] } = props;
  if ('expandedPath' in props) {
    return expandedPath;
  }
  return state ? state.expandedPath : [];
}

export function recurDataAndGetSelectedKeys(
  inData: Object[],
  inSelectedKeys: string[],
  outSelectedKeys: string[] = []
): void {
  if (!inSelectedKeys || inSelectedKeys.length === 0) {
    return;
  }

  const target = inSelectedKeys[0];
  inData &&
    inData.forEach(item => {
      const { value } = item;
      if (value === target) {
        outSelectedKeys.push(value);
        const { children } = item;
        if (children && children.length > 0) {
          inSelectedKeys.splice(0, 1);
          recurDataAndGetSelectedKeys(children, inSelectedKeys, outSelectedKeys);
        }
      }
    });
}

export function getCascaderKeys(targetArray: string[] = [], separator: string): string[] {
  if (!targetArray || targetArray.length === 0) {
    return [];
  }

  return targetArray[0].split(separator);
}

export const getExpandDataOrSelectData = letExpandpathOrSelectedKeysToArray;

export function letExpandpathOrSelectedKeysToArray(
  props: MenuProps,
  target: string[] = []
): string[] {
  const result = [];

  if (!props || !target || target.length === 0) {
    return result;
  }

  const { separator, data } = props;
  const cascaderKeys = getCascaderKeys(target, separator);
  recurDataAndGetSelectedKeys(data, cascaderKeys, result);
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
  return getTargetOrDefaultTargetLazy(
    isRoot(level),
    () => getExpandDataOrSelectData(props, rootExpandedPath),
    () => expandedData
  );
}

export function getChildData(props: MenuProps, state: MenuState) {
  const { level, allChildData } = props;
  const rootExpandedPath = getExpandedData(props, state);

  if (rootExpandedPath.length === 0) {
    return EmptyData;
  }
  const activeAllChildData = getTargetOrDefaultTargetLazy(
    isRoot(level),
    () => getInitAllChildData(props, state),
    () => allChildData
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
    return getChildData(props, state) || EmptyData;
  }
}

/**
 * 获取所有的childrenData
 */

export function getInitAllChildData(props: MenuProps, state: MenuState): Object {
  const { data } = props;
  return mapGetAllChildData(data, getExpandedData(props, state), 0);
}

export function mapGetAllChildData(
  levelData: Object[],
  expandedData: string[],
  level: number
): Object {
  let target = {};
  if (!expandedData || expandedData.length === 0) {
    return target;
  }
  const expandKey = expandedData[level];

  const expandItem =
    levelData &&
    levelData.find(item => {
      const { value, children } = item;
      return value === expandKey && children && children.length > 0;
    });

  if (expandItem) {
    const { children } = expandItem;
    target[level] = children;
    target = { ...target, ...mapGetAllChildData(children, expandedData, level + 1) };
  }
  return target;
}

export function getTreeData(props: Object) {
  const newData = [];
  const { data, valueField = 'value', displayField = 'text' } = props;
  if (data && data.length > 0) {
    recurTreeData(data, newData, {}, { displayField, valueField });
  }
  return newData;
}

export function recurTreeData(
  inTreeChildData: Object[],
  outTreeRowData: Object[],
  recursion: {
    parentKey?: string,
    parentPath?: string[],
  },
  opt?: { onAdd?: Function, displayField?: string, valueField?: string } = {}
) {
  const { parentKey, parentPath = [] } = recursion;
  const { displayField = 'text', valueField = 'value' } = opt;
  const { onAdd } = opt;
  inTreeChildData &&
    inTreeChildData.forEach(item => {
      const { children, [valueField]: value, [displayField]: text } = item;
      const newObj = {};
      newObj.pid = parentKey;
      newObj[valueField] = value;
      newObj[displayField] = text;
      let path;
      if (!parentKey) {
        path = [];
      } else {
        if (parentPath.indexOf(parentKey) === -1) {
          parentPath.push(parentKey);
        }
        path = [...parentPath];
        newObj.path = path.join('/');
      }

      const isLeaf = (newObj.isLeaf = !children || children.length === 0);
      outTreeRowData.push(newObj);
      onAdd && onAdd(newObj);
      if (!isLeaf) {
        recurTreeData(
          children,
          outTreeRowData,
          { parentKey: item[valueField], parentPath: path },
          opt
        );
      }
    });
}
