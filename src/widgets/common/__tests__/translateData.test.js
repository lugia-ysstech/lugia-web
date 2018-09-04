//@flow
import * as React from 'react';
import chai from 'chai';
import Enzyme, { mount, shallow } from 'enzyme';
import translateData, { getItems } from '../translateData';
import Adapter from 'enzyme-adapter-react-16';
import { delay } from '@lugia/react-test-utils';

const { expect: exp } = chai;
Enzyme.configure({ adapter: new Adapter() });

describe('translateData', () => {
  const props = {
    data: [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }],
    value: ['a', 'c'],
    displayValue: ['B', 'C'],
    displayField: 'label',
    valueField: 'value',
  };
  it('translateData displayValue:[]', () => {
    const testProps = { ...props };
    testProps.displayValue = [];
    const result = translateData(testProps, testProps.displayValue);
    expect(result).toEqual({
      dataItem: {
        a: { label: 'A', value: 'a' },
        b: { label: 'B', value: 'b' },
      },
    });
  });
  it('translateData data:[]', () => {
    const testProps = { ...props };
    testProps.data = [];
    const result = translateData(testProps, testProps.displayValue);
    expect(result).toEqual({
      cancelItem: [{ label: 'B', value: 'a' }, { label: 'C', value: 'c' }],
      cancelItemData: { a: { label: 'B', value: 'a' }, c: { label: 'C', value: 'c' } },
      dataItem: {},
    });
  });
  it('translateData value:[]', () => {
    const testProps = { ...props };
    testProps.value = [];
    const result = translateData(testProps, testProps.displayValue);
    expect(result).toEqual({
      dataItem: {
        a: { label: 'A', value: 'a' },
        b: { label: 'B', value: 'b' },
      },
    });
  });

  it('translateData result', () => {
    const result = translateData(props, props.displayValue);
    const resultData = {
      cancelItem: [{ label: 'C', value: 'c' }],
      cancelItemData: { c: { label: 'C', value: 'c' } },
      dataItem: {
        a: { label: 'A', value: 'a' },
        b: { label: 'B', value: 'b' },
      },
    };
    expect(result).toEqual(resultData);
  });
  it('getItems not in cancel & data', () => {
    const result = getItems(
      ['1', '2'],
      true,
      { props: {} },
      {
        needUpdate: () => false,
        getMapData() {
          return {
            cancelItemData: {},
            dataItem: {},
          };
        },
        updateHanlder() {},
      }
    );
    expect(result).toEqual({
      items: [undefined, undefined],
      displayValue: ['1', '2'],
    });
  });
  it('getItems  in data ', () => {
    const values = ['a', 'b'];

    const items = {
      [values[0]]: { label: 'aaaa' },
      [values[1]]: { label: 'bbbb' },
    };
    const result = getItems(
      values,
      true,
      {
        props: {
          displayField: 'label',
        },
      },
      {
        needUpdate: () => false,
        getMapData() {
          return {
            cancelItemData: {},
            dataItem: items,
          };
        },
        updateHanlder() {},
      }
    );
    const itemA = items[values[0]];
    const itemB = items[values[1]];
    expect(result).toEqual({
      items: [itemA, itemB],
      displayValue: [itemA.label, itemB.label],
    });
  });
  it('getItems  one in data one undefined', () => {
    const values = ['a', 'b'];

    const items = {
      [values[0]]: { label: 'aaaa' },
    };
    const result = getItems(
      values,
      true,
      {
        props: {
          displayField: 'label',
        },
      },
      {
        needUpdate: () => false,
        getMapData() {
          return {
            cancelItemData: {},
            dataItem: items,
          };
        },
        updateHanlder() {},
      }
    );
    const itemA = items[values[0]];
    const itemB = undefined;
    expect(result).toEqual({
      items: [itemA, itemB],
      displayValue: [itemA.label, values[1]],
    });
  });
});
