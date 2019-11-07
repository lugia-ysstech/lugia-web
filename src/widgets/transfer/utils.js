/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import { recurTreeData } from '../menu/utils';
import { createExistMap } from '../utils';

export function getTruthValue(
  target: string,
  props: Object,
  state: ?Object,
  defaultTarget: string
) {
  const inProps = target in props && typeof props[target] !== 'undefined' && props[target] !== null;
  const result = inProps ? props[target] : state ? state[target] : props[defaultTarget] || [];

  return result;
}

export function getPanelSourceDataAndTargetData(
  data: ?(Object[]),
  targetKeys: ?(string[]),
  valueField: ?string
): Object {
  const sourceData = [],
    targetData = [],
    mapData = {},
    sourceKeys = [],
    targetCheckKeys = [],
    sourceCheckKeys = [];

  if (!data || !targetKeys || !valueField) {
    return {
      sourceData,
      targetData,
      mapData,
      sourceKeys,
      targetCheckKeys,
      sourceCheckKeys,
    };
  }

  const existMap = createExistMap(targetKeys);

  data.forEach(item => {
    const key = item[valueField];
    mapData[key] = item;
    const inTarget = existMap[key];
    const isEnable = !item.disabled;
    if (inTarget) {
      targetData.push(item);
      if (isEnable) {
        targetCheckKeys.push(key);
      }
    } else {
      sourceData.push(item);
      sourceKeys.push(key);
      if (isEnable) {
        sourceCheckKeys.push(key);
      }
    }
  });

  return {
    sourceData,
    targetData,
    mapData,
    sourceKeys,
    targetCheckKeys,
    sourceCheckKeys,
  };
}

export function splitSelectKeys(mapData: ?Object, selectKey: ?(string[])): Object {
  const validKeys = [],
    disabledKeys = [];
  if (!mapData || !selectKey) {
    return { validKeys, disabledKeys };
  }

  selectKey.forEach(item => {
    const theItem = mapData && mapData[item];
    const disabled = theItem && theItem.disabled;
    if (disabled) {
      disabledKeys.push(item);
    } else {
      validKeys.push(item);
    }
  });
  return { validKeys, disabledKeys };
}

export function isContained(sourceItems: string[], childItems: string[]): boolean {
  if (!Array.isArray(sourceItems) || !Array.isArray(childItems)) {
    return false;
  }

  const childLen = childItems.length;
  if (childLen === 0) {
    return true;
  }

  if (sourceItems.length < childLen) {
    return false;
  }
  const existMap = createExistMap(sourceItems);
  return childItems.every(item => existMap[item]);
}

export function getTreeData(
  data: Object[],
  opt: { displayField: string, valueField: string }
): Object {
  const target = [],
    mapData = {},
    enableKeys = [];
  const { displayField, valueField } = opt;
  recurTreeData(data, target, {}, 'disabled', {
    onAdd(newItem) {
      const { isLeaf } = newItem;
      const key = newItem[valueField];
      if (isLeaf) {
        if (!newItem.disabled) {
          enableKeys.push(key);
        }
      }
      mapData[key] = newItem;
    },
    displayField,
    valueField,
    pathSeparator: '/',
  });
  return { target, mapData, enableKeys };
}

export function getCancelItem(
  value: ?(string[]),
  mapData: Object,
  field: Object,
  displayValue?: string[]
): Object[] {
  const cancelItem = [];

  if (!value || !value.length) {
    return cancelItem;
  }

  const { valueField = 'value', displayField = 'text' } = field;
  if (!displayValue || !displayValue.length) {
    return cancelItem;
  }

  value.forEach((item, index) => {
    if (!mapData[item]) {
      cancelItem.push({
        [displayField]: displayValue && displayValue[index],
        [valueField]: item,
      });
    }
  });
  return cancelItem;
}

export function getKeys(data: ?(Object[]), valueField: ?string): string[] {
  if (!data || !valueField) {
    return [];
  }
  return data.map(item => {
    if (!item) {
      return '';
    }
    const res = item[valueField];
    return res ? res : '';
  });
}
export function filterEnableKeysFromSelectKeys(
  list: ?(string[]),
  selectKeys: string[],
  direction: 'Source' | 'Target'
): string[] {
  if (!list || !list.length) {
    return selectKeys;
  }
  if (!selectKeys || !selectKeys.length) {
    return [];
  }

  const existMap = createExistMap(list);
  if (direction === 'Source') {
    return selectKeys.filter(item => !existMap[item]);
  }
  return selectKeys.filter(item => existMap[item]);
}
