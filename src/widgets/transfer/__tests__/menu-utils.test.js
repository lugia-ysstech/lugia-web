/**
 *
 * create by guorg
 *
 * @flow
 */
import {
  getMapData,
  getMenuDataByBlackList,
  getWhiteListDataAndCancelItem,
  getSearchData,
} from '../menu-utils';

describe('Transfer.menu-utils', () => {
  const data = [
    { title: '1', key: 'key1' },
    { title: '2', key: 'key2' },
    { title: '3', key: 'key3' },
  ];
  const valueField = 'key';
  const displayField = 'title';
  const mapData = {
    key1: { title: '1', key: 'key1' },
    key2: { title: '2', key: 'key2' },
    key3: { title: '3', key: 'key3' },
  };

  it('getMapData', () => {
    expect(getMapData(data, valueField)).toEqual(mapData);
    expect(getMapData(undefined, valueField)).toEqual({});
  });

  it('getMenuDataByBlackList', () => {
    const blackList = ['key2', 'key3'];
    const result = [{ title: '1', key: 'key1' }];
    expect(getMenuDataByBlackList(data, valueField, blackList)).toEqual(result);
    expect(getMenuDataByBlackList(undefined, valueField)).toEqual([]);
    expect(getMenuDataByBlackList(data, valueField)).toEqual(data);
    expect(getMenuDataByBlackList(data, valueField, [])).toEqual(data);
  });

  it('getWhiteListDataAndCancelItem', () => {
    const whiteList = ['key2', 'key3'];
    const displayValue = ['a', 'b', 'c'];

    const { whiteListData, cancelItem } = getWhiteListDataAndCancelItem(
      mapData,
      displayValue,
      valueField,
      displayField,
      whiteList
    );
    expect(whiteListData).toEqual([{ title: '2', key: 'key2' }, { title: '3', key: 'key3' }]);
    expect(cancelItem).toEqual([]);

    const list = ['key2', 'key3', 'key4'];
    const {
      whiteListData: newWhiteListData,
      cancelItem: newCancelItem,
    } = getWhiteListDataAndCancelItem(mapData, displayValue, valueField, displayField, list);
    expect(newWhiteListData).toEqual([{ title: '2', key: 'key2' }, { title: '3', key: 'key3' }]);
    expect(newCancelItem).toEqual([{ title: 'c', key: 'key4' }]);

    expect(
      getWhiteListDataAndCancelItem(mapData, [], valueField, displayField, list).cancelItem
    ).toEqual([]);

    expect(
      getWhiteListDataAndCancelItem(mapData, [], valueField, displayField).whiteListData
    ).toEqual([]);
    expect(getWhiteListDataAndCancelItem(mapData, [], valueField, displayField).cancelItem).toEqual(
      []
    );
    expect(
      getWhiteListDataAndCancelItem(mapData, [], valueField, displayField, []).whiteListData
    ).toEqual([]);
    expect(
      getWhiteListDataAndCancelItem(mapData, [], valueField, displayField, []).cancelItem
    ).toEqual([]);
  });

  it('getSearchData', () => {
    expect(getSearchData(data, '1', (value, option) => option.key.indexOf(value) > -1)).toEqual([
      { title: '1', key: 'key1' },
    ]);
    expect(getSearchData([], '1', (value, option) => option.key.indexOf(value) > -1)).toEqual([]);
    expect(getSearchData(data, '', (value, option) => option.key.indexOf(value) > -1)).toEqual(
      data
    );
  });
});
