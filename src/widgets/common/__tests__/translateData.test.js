//@flow
import * as React from 'react';
import chai from 'chai';
import Enzyme, { mount, shallow } from 'enzyme';
import translateData from '../translateData';
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
});
