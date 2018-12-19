/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import {
  getTruthValue,
  getPanelSourceDataAndTargetData,
  splitSelectKeys,
  isContained,
  getTreeData,
  getCancelItem,
  getKeys,
  filterEnableKeysFromSelectKeys,
} from '../utils';

describe('Transfer.utils', () => {
  const data = [
    { text: '1', value: 'value1', disabled: true },
    { text: '2', value: 'value2' },
    { text: '3', value: 'value3' },
  ];
  type MapDataType = { [key: string]: Object };
  const mapData: MapDataType = {
    value1: { text: '1', value: 'value1', disabled: true },
    value2: { text: '2', value: 'value2' },
    value3: { text: '3', value: 'value3' },
  };
  const targetKeys = ['value2'];
  const valueField = 'value';
  it('getTruthValue', () => {
    const props = {
      value: undefined,
      defaultValues: '1',
    };
    const state = {
      value: undefined,
      displayValue: '1',
    };
    expect(getTruthValue('value', props, state, 'defaultValue')).toBeUndefined();
    expect(getTruthValue('displayValue', props, state, 'defaultDisplayValue')).toBe('1');
    expect(getTruthValue('values', props, undefined, 'defaultValues')).toBe('1');
    expect(getTruthValue('text', props, undefined, 'defaultText')).toEqual([]);
  });

  it('getPanelSourceDataAndTargetData', () => {
    const {
      mapData,
      targetData,
      sourceData,
      sourceKeys,
      targetCheckKeys,
      sourceCheckKeys,
    } = getPanelSourceDataAndTargetData(data, targetKeys, valueField);
    const expMapData: MapDataType = {
      value1: { text: '1', value: 'value1', disabled: true },
      value2: { text: '2', value: 'value2' },
      value3: { text: '3', value: 'value3' },
    };
    const expTargetData = [{ text: '2', value: 'value2' }];
    const expSourceData = [
      { text: '1', value: 'value1', disabled: true },
      { text: '3', value: 'value3' },
    ];
    expect(expMapData).toEqual(mapData);
    expect(targetData).toEqual(expTargetData);
    expect(sourceData).toEqual(expSourceData);
    expect(sourceKeys).toEqual(['value1', 'value3']);
    expect(targetCheckKeys).toEqual(['value2']);
    expect(sourceCheckKeys).toEqual(['value3']);

    const {
      mapData: errMapData,
      targetData: errTargetData,
      sourceData: errSourceData,
      sourceKeys: errSourceKeys,
      targetCheckKeys: errTargetCheckKeys,
      sourceCheckKeys: errSourceCheckKeys,
    } = getPanelSourceDataAndTargetData(undefined, targetKeys, valueField);
    expect(errMapData).toEqual({});
    expect(errTargetData).toEqual([]);
    expect(errSourceData).toEqual([]);
    expect(errSourceKeys).toEqual([]);
    expect(errTargetCheckKeys).toEqual([]);
    expect(errSourceCheckKeys).toEqual([]);

    const {
      mapData: newErrMapData,
      targetData: newErrTargetData,
      sourceData: newErrSourceData,
    } = getPanelSourceDataAndTargetData(data, undefined, valueField);
    expect(newErrMapData).toEqual({});
    expect(newErrTargetData).toEqual([]);
    expect(newErrSourceData).toEqual([]);

    const {
      sourceKeys: newErrSourceKeys,
      targetCheckKeys: newErrTargetCheckKeys,
      sourceCheckKeys: newErrSourceCheckKeys,
    } = getPanelSourceDataAndTargetData(data, targetKeys, undefined);
    expect(newErrSourceKeys).toEqual([]);
    expect(newErrTargetCheckKeys).toEqual([]);
    expect(newErrSourceCheckKeys).toEqual([]);
  });

  it('splitSelectKeys', () => {
    const { validKeys, disabledKeys } = splitSelectKeys(mapData, ['value1', 'value2', 'value3']);
    expect(validKeys).toEqual(['value2', 'value3']);
    expect(disabledKeys).toEqual(['value1']);
    expect(splitSelectKeys(undefined, []).validKeys).toEqual([]);
    expect(splitSelectKeys(undefined, []).disabledKeys).toEqual([]);
    expect(splitSelectKeys({}, undefined).validKeys).toEqual([]);
    expect(splitSelectKeys({}, undefined).disabledKeys).toEqual([]);
  });

  it('isContained', () => {
    expect(isContained(['1', '2', '3'], ['1', '2'])).toBeTruthy();
    expect(isContained(['1', '2', '3'], [])).toBeTruthy();
    expect(isContained(['1', '2', '3'], ['1', '2', '4'])).toBeFalsy();
    expect(isContained(['1'], ['1', '2'])).toBeFalsy();
  });

  it('getTreeData', () => {
    const data = [
      {
        text: '1',
        value: 'value1',
        children: [{ text: '1-1', value: 'value11' }, { text: '1-2', value: 'value12' }],
      },
      {
        text: '2',
        value: 'value2',
        children: [{ text: '2-1', value: 'value21' }, { text: '2-2', value: 'value22' }],
      },
    ];
    const expTarget = [
      { pid: undefined, value: 'value1', text: '1' },
      { pid: 'value1', value: 'value11', text: '1-1', path: 'value1', isLeaf: true },
      { pid: 'value1', value: 'value12', text: '1-2', path: 'value1', isLeaf: true },
      { pid: undefined, value: 'value2', text: '2' },
      { pid: 'value2', value: 'value21', text: '2-1', path: 'value2', isLeaf: true },
      { pid: 'value2', value: 'value22', text: '2-2', path: 'value2', isLeaf: true },
    ];
    const expMapData = {
      value1: { pid: undefined, value: 'value1', text: '1' },
      value11: { pid: 'value1', value: 'value11', text: '1-1', path: 'value1', isLeaf: true },
      value12: { pid: 'value1', value: 'value12', text: '1-2', path: 'value1', isLeaf: true },
      value2: { pid: undefined, value: 'value2', text: '2' },
      value21: { pid: 'value2', value: 'value21', text: '2-1', path: 'value2', isLeaf: true },
      value22: { pid: 'value2', value: 'value22', text: '2-2', path: 'value2', isLeaf: true },
    };
    const expEnableKeys = ['value11', 'value12', 'value21', 'value22'];
    const { target, mapData, enableKeys } = getTreeData(data, {
      displayField: 'text',
      valueField: 'value',
    });
    expect(target).toEqual(expTarget);
    expect(mapData).toEqual(expMapData);
    expect(enableKeys).toEqual(expEnableKeys);
  });

  it('getCancelItem', () => {
    const targetKeys = ['value1', 'value4', 'value5'];
    const displayValue = ['value1', 'dis1', 'dis2'];
    const expCancelItem = [{ text: 'dis1', value: 'value4' }, { text: 'dis2', value: 'value5' }];
    const cancelItem = getCancelItem(targetKeys, mapData, {}, displayValue);
    expect(cancelItem).toEqual(expCancelItem);

    expect(getCancelItem(undefined, mapData, {}, displayValue)).toEqual([]);
    expect(getCancelItem([], mapData, {}, displayValue)).toEqual([]);
    expect(getCancelItem(targetKeys, mapData, {}, undefined)).toEqual([]);
    expect(getCancelItem(targetKeys, mapData, {}, [])).toEqual([]);
  });

  it('getKeys', () => {
    const keys = getKeys(data, valueField);
    expect(keys).toEqual(['value1', 'value2', 'value3']);

    expect(getKeys(undefined, valueField)).toEqual([]);
    expect(getKeys(data, undefined)).toEqual([]);
  });

  it('filterEnableKeysFromSelectKeys', () => {
    const selectedKeys = filterEnableKeysFromSelectKeys(
      ['value1', 'value2'],
      ['value1', 'value2', 'value3']
    );
    expect(selectedKeys).toEqual(['value3']);

    expect(filterEnableKeysFromSelectKeys([], ['value3'])).toEqual(['value3']);
    expect(filterEnableKeysFromSelectKeys(undefined, ['value3'])).toEqual(['value3']);
    expect(filterEnableKeysFromSelectKeys(['value1', 'value2'], undefined)).toEqual([]);
    expect(filterEnableKeysFromSelectKeys(['value1', 'value2'], [])).toEqual([]);
  });
});
