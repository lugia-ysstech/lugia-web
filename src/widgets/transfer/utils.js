/**
 *
 * create by guorg
 *
 * @flow
 *
 */
export function getTruthValue(
  target: string,
  props: Object,
  state?: Object,
  defaultTarget: string
) {
  const inProps = target in props;
  const result = inProps ? props[target] : state ? state[target] : props[defaultTarget] || [];

  return result;
}
export function getSourceDataAndTargetData(
  data: Object[],
  targetKeys: string[],
  valueField: string
): Object {
  const sourceData = [],
    targetData = [],
    mapData = {},
    sourceKeys = [],
    targetCheckKeys = [],
    sourceCheckKeys = [];

  if (data && data.length > 0) {
    data.forEach(item => {
      const itemValue = item[valueField];
      mapData[itemValue] = item;
      const inTarget = targetKeys.includes(itemValue);
      if (inTarget) {
        targetData.push(item);
        if (!item.disabled) {
          targetCheckKeys.push(itemValue);
        }
      } else {
        sourceData.push(item);
        sourceKeys.push(itemValue);
        if (!item.disabled) {
          sourceCheckKeys.push(itemValue);
        }
      }
    });
  }
  return {
    sourceData,
    targetData,
    mapData,
    sourceKeys,
    targetCheckKeys,
    sourceCheckKeys,
  };
}
export function splitSelectKeys(mapData: Object, selectKey: string[]): Object {
  const validKeys = [],
    disabledKeys = [];
  if (selectKey && selectKey.length > 0) {
    selectKey.forEach(item => {
      const disabled = mapData[item] && mapData[item].disabled;
      if (!disabled) {
        validKeys.push(item);
      } else {
        disabledKeys.push(item);
      }
    });
  }
  return { validKeys, disabledKeys };
}
export function isContained(a: Array<any>, b: string[]) {
  if (!(a instanceof Array) || !(b instanceof Array)) return false;
  if (a.length < b.length) return false;
  const aStr = a.toString();
  for (let i = 0, len = b.length; i < len; i++) {
    if (aStr.indexOf(b[i]) === -1) return false;
  }
  return true;
}
export function getTreeData(
  data: Object[],
  targetObj: Object,
  parentKey?: string,
  parentPath?: string[]
): Object {
  if (data && data.length) {
    const { target = [], mapData = {}, leafKeys = [] } = targetObj;
    data.forEach(item => {
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
        if (parentPath) {
          newObj.pid = parentKey;
          if (parentPath.indexOf(parentKey) === -1) {
            parentPath.push(parentKey);
          }
          pidArr = [...parentPath];
          newObj.path = pidArr.join('/');
        }
      }
      if (!children || children.length === 0) {
        newObj.isLeaf = true;
        if (!item.disabled) {
          leafKeys.push(item.value);
        }
        target.push(newObj);
        mapData[item.value] = item;
      } else {
        target.push(newObj);
        mapData[item.value] = item;
        getTreeData(children, targetObj, item.value, pidArr);
      }
    });

    return targetObj;
  }

  return { target: [], leafKeys: [] };
}

export function getCancelItem(
  value: string[],
  mapData: Object,
  field: Object,
  displayValue?: string[]
): Object[] {
  const { valueField, displayField } = field;
  const hasValue = value && value.length;
  if (hasValue) {
    const cancelItem = [];
    if (displayValue && displayValue.length) {
      value.forEach((item, index) => {
        if (!mapData[item]) {
          cancelItem.push({
            [displayField]: displayValue && displayValue[index],
            [valueField]: item,
          });
        }
      });
    }
    console.info('cancelItem', cancelItem);
    return cancelItem;
  }
  return [];
}
export function getCanCheckKeys(allKeys: string[], targetKeys: string[]) {
  const sourceCanCheckKeys = [],
    targetCanCheckKeys = [];
  allKeys.forEach(item => {
    const inTarget = targetKeys.includes(item);
    if (inTarget) {
      targetCanCheckKeys.push(item);
    } else {
      sourceCanCheckKeys.push(item);
    }
  });
  return { targetCanCheckKeys, sourceCanCheckKeys };
}
