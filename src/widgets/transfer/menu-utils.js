/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import { createExistMap } from '../utils';

export function getMapData(data: Object[], valueField: string): Object {
  const mapData = {};
  if (!data) {
    return mapData;
  }
  data.forEach(item => {
    const key = item[valueField];
    mapData[key] = item;
  });

  return mapData;
}

export function getMenuDataByBlackList(data: Object[], valueField: string, blackList?: string[]) {
  const blackListData = [];
  if (!data || !blackList || blackList.length === 0) {
    return blackListData;
  }

  const existMap = createExistMap(blackList);
  data.forEach(item => {
    const key = item[valueField];
    const inBlack = existMap[key];
    if (!inBlack) {
      blackListData.push(item);
    }
  });

  return blackListData;
}

export function getWhiteListDataAndCancelItem(
  mapData: Object,
  displayValue: string[],
  valueField: string,
  displayField: string,
  whiteList?: string[]
): { whiteListData: Object[], cancelItem: Object[] } {
  const whiteListData = [],
    cancelItem = [];
  if (!whiteList || whiteList.length === 0) {
    return { whiteListData, cancelItem };
  }
  whiteList.forEach((item, index) => {
    const itemData = mapData[item];
    if (itemData) {
      whiteListData.push(itemData);
    } else {
      const text = displayValue[index];
      if (text) {
        const cancelObj = { [displayField]: text, [valueField]: item };
        cancelItem.push(cancelObj);
      }
    }
  });

  return { whiteListData, cancelItem };
}

export function getSearchData(data: Object[], query: string, filter: Function): Object[] {
  if (!data || !data.length) {
    return [];
  }
  if (!query) {
    return data;
  }
  if (!filter || typeof filter !== 'function') {
    return data;
  }
  const searchData = [];
  data.forEach(item => {
    if (filter(query, item)) {
      searchData.push(item);
    }
  });

  return searchData;
}

export function splitSelectKeys(
  mapData: Object,
  selectKeys: string[],
  opt: { blackList?: string[], whiteList?: string[] }
) {
  const canMoveKey = [],
    checkDisabledKey = [];
  if (!selectKeys || !selectKeys.length) {
    return { canMoveKey, checkDisabledKey };
  }
  const { blackList, whiteList } = opt;

  const exist = blackList ? blackList : whiteList;
  const existMap = createExistMap(exist);
  const isBlack = !!blackList;
  selectKeys.forEach(item => {
    const inExistMap = existMap[item];
    const split = isBlack ? !inExistMap : inExistMap;
    if (split) {
      if (mapData[item] && mapData[item].disabled) {
        checkDisabledKey.push(item);
      } else {
        canMoveKey.push(item);
      }
    }
  });

  return { canMoveKey, checkDisabledKey };
}
