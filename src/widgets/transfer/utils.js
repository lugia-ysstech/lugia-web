/**
 *
 * create by guorg
 *
 * @flow
 *
 */
export function getSourceDataAndTargetData(data: Object[], targetKeys: string[]): Object {
  const sourceData = [],
    targetData = [],
    mapData = {},
    sourceKeys = [],
    targetCheckKeys = [],
    sourceCheckKeys = [];

  if (data && data.length > 0) {
    data.forEach(item => {
      mapData[item.value] = item;
      const inTarget = targetKeys.includes(item.value);
      if (inTarget) {
        targetData.push(item);
        if (!item.disabled) {
          targetCheckKeys.push(item.value);
        }
      } else {
        sourceData.push(item);
        sourceKeys.push(item.value);
        if (!item.disabled) {
          sourceCheckKeys.push(item.value);
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
export function getSelectKeys(mapData: Object, selectKey: string[]): Object {
  const validKeys = [],
    disabledKeys = [];
  if (selectKey && selectKey.length > 0) {
    selectKey.forEach(item => {
      const disabled = mapData[item].disabled;
      if (!disabled) {
        validKeys.push(item);
      } else {
        disabledKeys.push(item);
      }
    });
  }
  return { validKeys, disabledKeys };
}
export function isContained(a: string[], b: string[]) {
  if (!(a instanceof Array) || !(b instanceof Array)) return false;
  if (a.length < b.length) return false;
  const aStr = a.toString();
  for (let i = 0, len = b.length; i < len; i++) {
    if (aStr.indexOf(b[i]) === -1) return false;
  }
  return true;
}
