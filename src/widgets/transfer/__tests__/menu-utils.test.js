/**
 *
 * create by guorg
 *
 * @flow
 */
import { getMapData, getMenuDataByBlackList, getWhiteListDataAndCancelItem } from '../menu-utils';

describe('Transfer.menu-utils', () => {
  const data = [{ title: '1', key: '11' }, { title: '2', key: '22' }, { title: '3', key: '33' }];
  const valueField = 'key';
  const displayField = 'title';
  const mapData = {
    11: { title: '1', key: '11' },
    22: { title: '2', key: '22' },
    33: { title: '3', key: '33' },
  };

  it('getMapData', () => {
    expect(getMapData(data, valueField)).toEqual(mapData);
    expect(getMapData('', valueField)).toEqual({});
  });

  it('getMenuDataByBlackList', () => {
    const blackList = ['22', '33'];
    const result = [{ title: '1', key: '11' }];
    expect(getMenuDataByBlackList(data, valueField, blackList)).toEqual(result);
    expect(getMenuDataByBlackList(undefined, valueField)).toEqual([]);
    expect(getMenuDataByBlackList(data, valueField)).toEqual(data);
    expect(getMenuDataByBlackList(data, valueField, [])).toEqual(data);
  });

  it('getWhiteListDataAndCancelItem', () => {
    const whiteList = ['22', '33'];
    const displayValue = ['a', 'b', 'c'];

    const { whiteListData, cancelItem } = getWhiteListDataAndCancelItem(
      mapData,
      displayValue,
      valueField,
      displayField,
      whiteList
    );
    expect(whiteListData).toEqual([{ title: '2', key: '22' }, { title: '3', key: '33' }]);
    expect(cancelItem).toEqual([]);

    const list = ['22', '33', '44'];
    const {
      whiteListData: newWhiteListData,
      cancelItem: newCancelItem,
    } = getWhiteListDataAndCancelItem(mapData, displayValue, valueField, displayField, list);
    expect(newWhiteListData).toEqual([{ title: '2', key: '22' }, { title: '3', key: '33' }]);
    expect(newCancelItem).toEqual([{ title: 'c', key: '44' }]);

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
});
