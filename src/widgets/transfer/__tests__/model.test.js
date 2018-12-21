/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import TransferModel from '../model';
import chai from 'chai';

const { expect: exp } = chai;

describe('Transfer.model', () => {
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
  const valueField = 'value';
  const displayValue = ['a', 'b'];
  const targetKeys = ['value3', '4'];
  const sourceModel = new TransferModel({
    type: 'Source',
    selectedKeys: ['value1'],
    list: targetKeys,
  });
  const targetModel = new TransferModel({
    type: 'Target',
    selectedKeys: ['value3'],
    list: targetKeys,
  });

  it('model.setMapData/getMapData', () => {
    expect(sourceModel.getMapData()).toBeUndefined();
    sourceModel.setMapData(mapData);
    const modelMapData = sourceModel.getMapData();
    expect(modelMapData).toEqual(mapData);
  });

  it('model.setDisplayValue/getDisplayValue', () => {
    expect(sourceModel.getDisplayValue()).toBeUndefined();
    sourceModel.setDisplayValue(displayValue);
    const modelDisplayValue = sourceModel.getDisplayValue();
    expect(modelDisplayValue).toEqual(displayValue);
  });

  it('model.setTreeData/getTreeData', () => {
    expect(sourceModel.getTreeData()).toBeUndefined();
    sourceModel.setTreeData(data);
    const modelTreeData = sourceModel.getTreeData();
    expect(modelTreeData).toEqual(data);
  });

  it('model.setCanCheckKeys/getCanCheckKeys', () => {
    expect(sourceModel.getCanCheckKeys()).toBeUndefined();
    sourceModel.setCanCheckKeys(['value2']);
    const modelCanKeys = sourceModel.getCanCheckKeys();
    expect(modelCanKeys).toEqual(['value2']);
  });

  it('model.changeSelectedKeys', () => {
    sourceModel.changeSelectedKeys(['value1', 'value2']);
    expect(sourceModel.getSelectedkeys()).toEqual(['value1', 'value2']);
  });

  it('model.handleSplitSelectKeys', () => {
    const { validKeys, disabledKeys } = sourceModel.handleSplitSelectKeys();
    expect(validKeys).toEqual(['value2']);
    expect(disabledKeys).toEqual(['value1']);
  });

  it('model.getCheckAllKeys', () => {
    const checkKeys = sourceModel.getCheckAllKeys(false);
    expect(checkKeys).toEqual(['value1']);
    const newCheckKeys = sourceModel.getCheckAllKeys(true);
    expect(newCheckKeys.sort()).toEqual(['value1', 'value2'].sort());
  });

  it('model.getMoveAfterKeysForSource', () => {
    const { moveKey, disabledKeys, nextTargetKeys } = sourceModel.getMoveAfterKeysForSource();
    expect(moveKey).toEqual(['value2']);
    expect(disabledKeys).toEqual(['value1']);
    expect(nextTargetKeys.sort()).toEqual(['value2', 'value3', '4'].sort());
  });

  it('model.getMoveAfterKeysForTarget', () => {
    const { moveKey, disabledKeys, nextTargetKeys } = sourceModel.getMoveAfterKeysForTarget();
    expect(moveKey).toEqual(['value2']);
    expect(disabledKeys).toEqual(['value1']);
    expect(nextTargetKeys.sort()).toEqual(['value3', '4'].sort());
  });

  it('model.setCancelItem/getCancelItem', () => {
    expect(targetModel.getCancelItem()).toBeUndefined();
    targetModel.setCancelItem([{ text: 'b', value: '4' }]);
    const cancelItem = targetModel.getCancelItem();
    expect(cancelItem).toEqual([{ text: 'b', value: '4' }]);
  });

  it('model.getTypeList', () => {
    const { blackList } = sourceModel.getTypeList();
    const { whiteList } = targetModel.getTypeList();
    expect(blackList).toEqual(['value3', '4']);
    expect(whiteList).toEqual(['value3', '4']);
  });
});
