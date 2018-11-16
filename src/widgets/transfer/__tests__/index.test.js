/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TransferDemo from '../demo';
import renderer from 'react-test-renderer';
import Transfer from '../group';
import { getSourceDataAndTargetData } from '../utils';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Transfer', () => {
  it('css', () => {
    const Target = <TransferDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
  const data = [
    { text: '选项1', value: '选项1', disabled: false },
    { text: '选项2', value: '选项2', disabled: false },
    { text: '选项3', value: '选项3', disabled: false },
    { text: '选项4', value: '选项4', disabled: false },
    { text: '选项5', value: '选项5', disabled: true },
  ];
  const getState = (target: any) => {
    return target.instance().state;
  };
  it('Transfer -> utils/getSourceDataAndTargetData ', () => {
    const sourceResult = getSourceDataAndTargetData(data, []).sourceData;
    const targetResult = getSourceDataAndTargetData(data, []).targetData;
    expect(sourceResult).toEqual(data);
    expect(targetResult).toEqual([]);

    const targetKeys = ['选项1', '选项2'];
    const sourceResult1 = getSourceDataAndTargetData(data, targetKeys).sourceData;
    const targetResult1 = getSourceDataAndTargetData(data, targetKeys).targetData;
    const sourceData = [
      { text: '选项3', value: '选项3', disabled: false },
      { text: '选项4', value: '选项4', disabled: false },
      { text: '选项5', value: '选项5', disabled: true },
    ];
    const targetData = [
      { text: '选项1', value: '选项1', disabled: false },
      { text: '选项2', value: '选项2', disabled: false },
    ];
    expect(sourceResult1).toEqual(sourceData);
    expect(targetResult1).toEqual(targetData);
  });

  it('Transfer: checkSelectKeys ', () => {
    const target = mount(<Transfer data={data} />);
    const component = target
      .find('Transfer')
      .at(0)
      .instance();
    const result = component.checkSelectKeys(['1', '2', '3'], '1');
    expect(result).toEqual(['2', '3']);

    const newResult = component.checkSelectKeys(['1', '2', '3'], '4');
    expect(newResult).toEqual(['1', '2', '3', '4']);
  });
});
