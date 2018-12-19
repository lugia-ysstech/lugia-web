/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import { getTruthValue, getPanelSourceDataAndTargetData, isContained } from '../utils';

describe('Transfer.utils', () => {
  const data = [
    { text: '1', value: '1', disabled: true },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
  ];
  const mapData = {
    1: { text: '1', value: '1', disabled: true },
    2: { text: '2', value: '2' },
    3: { text: '3', value: '3' },
  };
  const targetKeys = ['2'];
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
    const expMapData = {
      1: { text: '1', value: '1', disabled: true },
      2: { text: '2', value: '2' },
      3: { text: '3', value: '3' },
    };
    const expTargetData = [{ text: '2', value: '2' }];
    const expSourceData = [{ text: '1', value: '1', disabled: true }, { text: '3', value: '3' }];
    expect(expMapData).toEqual(mapData);
    expect(targetData).toEqual(expTargetData);
    expect(sourceData).toEqual(expSourceData);
    expect(sourceKeys).toEqual(['1', '3']);
    expect(targetCheckKeys).toEqual(['2']);
    expect(sourceCheckKeys).toEqual(['3']);

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
    expect(isContained(['1', '2', '3'], ['1', '2'])).toBeTruthy();
    expect(isContained(['1', '2', '3'], [])).toBeTruthy();
    expect(isContained(['1', '2', '3'], ['1', '2', '4'])).toBeFalsy();
    expect(isContained(['1'], ['1', '2'])).toBeFalsy();
  });

  it('isContained', () => {
    expect(isContained(['1', '2', '3'], ['1', '2'])).toBeTruthy();
    expect(isContained(['1', '2', '3'], [])).toBeTruthy();
    expect(isContained(['1', '2', '3'], ['1', '2', '4'])).toBeFalsy();
    expect(isContained(['1'], ['1', '2'])).toBeFalsy();
  });
});
