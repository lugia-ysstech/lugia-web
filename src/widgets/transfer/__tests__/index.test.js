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
import { getSourceDataAndTargetData, getTruthValue, splitSelectKeys, isContained } from '../utils';

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
    { text: '选项6', value: '选项6', disabled: false },
  ];
  const getComponent = (target: any) => {
    return target
      .find('Transfer')
      .at(0)
      .instance();
  };
  it('Transfer -> utils/getTruthValue', () => {
    const sourceSelctKeys = getTruthValue(
      'sourceSelectedKeys',
      { sourceSelectedKeys: ['1'] },
      undefined,
      'defaultSourceSelectedKeys'
    );
    expect(sourceSelctKeys).toEqual(['1']);

    const stateSourceSelctKeys = getTruthValue(
      'sourceSelectedKeys',
      {},
      { sourceSelectedKeys: ['1', '2'] },
      'defaultSourceSelectedKeys'
    );
    expect(stateSourceSelctKeys).toEqual(['1', '2']);

    const defaultSourceSelctKeys = getTruthValue(
      'sourceSelectedKeys',
      { defaultSourceSelectedKeys: ['a', 'b'] },
      undefined,
      'defaultSourceSelectedKeys'
    );
    expect(defaultSourceSelctKeys).toEqual(['a', 'b']);

    const spaceArray = getTruthValue(
      'sourceSelectedKeys',
      {},
      undefined,
      'defaultSourceSelectedKeys'
    );
    expect(spaceArray).toEqual([]);
  });

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
      { text: '选项6', value: '选项6', disabled: false },
    ];
    const targetData = [
      { text: '选项1', value: '选项1', disabled: false },
      { text: '选项2', value: '选项2', disabled: false },
    ];
    expect(sourceResult1).toEqual(sourceData);
    expect(targetResult1).toEqual(targetData);
  });

  it('Transfer -> utils/splitSelectKeys', () => {
    const mapaData = {
      选项1: { text: '选项1', value: '选项1', disabled: false },
      选项2: { text: '选项2', value: '选项2', disabled: false },
      选项3: { text: '选项3', value: '选项3', disabled: true },
    };
    const selectKey = ['选项1', '选项3'];
    const { validKeys, disabledKeys } = splitSelectKeys(mapaData, selectKey);
    expect(validKeys).toEqual(['选项1']);
    expect(disabledKeys).toEqual(['选项3']);
  });

  it('Transfer -> utils/isContained', () => {
    const result = isContained(['1', '2'], ['1']);
    expect(result).toBe(true);
    // const result1 = isContained('1', ['1']);
    // expect(result1).toBe(false);
    // const result2 = isContained(['1', '2'], '1');
    // expect(result2).toBe(false);
    const result3 = isContained(['1'], ['1', '2']);
    expect(result3).toBe(false);
  });

  it('Transfer: checkSelectKeys ', () => {
    const target = mount(<Transfer data={data} />);
    const component = getComponent(target);
    const result = component.checkSelectKeys(['1', '2', '3'], '1');
    expect(result).toEqual(['2', '3']);

    const newResult = component.checkSelectKeys(['1', '2', '3'], '4');
    expect(newResult).toEqual(['1', '2', '3', '4']);

    const newResults = component.checkSelectKeys([], '4');
    expect(newResults).toEqual(['4']);
  });

  it('Transfer: handleSourceSelect ', () => {
    const target = mount(<Transfer data={data} sourceSelectedKeys={[]} />);
    const component = getComponent(target);
    component.handleSourceSelect('1', '1', { title: 'a', value: '1' });
    const { sourceSelectedKeys } = component.state;
    expect(sourceSelectedKeys).toEqual([]);

    const newTarget = mount(<Transfer data={data} />);
    const newComponent = getComponent(newTarget);
    expect(newComponent.state.sourceSelectedKeys).toEqual([]);
    newComponent.handleSourceSelect('1', '1', { title: 'a', value: '1' });
    const { sourceSelectedKeys: newSourceSelectedKeys } = newComponent.state;
    expect(newSourceSelectedKeys).toEqual(['1']);
  });

  it('Transfer: handleTargetSelect ', () => {
    const target = mount(<Transfer data={data} targetSelectedKeys={[]} />);
    const component = getComponent(target);
    component.handleTargetSelect('1', '1', { title: 'a', value: '1' });
    const { targetSelectedKeys } = component.state;
    expect(targetSelectedKeys).toEqual([]);

    const newTarget = mount(<Transfer data={data} />);
    const newComponent = getComponent(newTarget);
    expect(newComponent.state.targetSelectedKeys).toEqual([]);
    newComponent.handleTargetSelect('1', '1', { title: 'a', value: '1' });
    const { targetSelectedKeys: newTargetSelectedKeys } = newComponent.state;
    expect(newTargetSelectedKeys).toEqual(['1']);
  });

  it('Transfer handleToLeft moveDataToLeft', () => {
    let targetKeys, direction, moveKey;
    const handleDirectionClick = (nextTargetKeys, dir, key) => {
      targetKeys = nextTargetKeys;
      direction = dir;
      moveKey = key;
    };
    const target = mount(
      <Transfer
        data={data}
        onDirectionClick={handleDirectionClick}
        targetKeys={['选项1', '选项2']}
        targetSelectedKeys={['选项1']}
      />
    );
    const component = getComponent(target);
    component.handleToLeft();
    expect(direction).toBe('left');
    expect(targetKeys).toEqual(['选项2']);
    expect(moveKey).toEqual(['选项1']);

    const newTarget = mount(
      <Transfer
        data={data}
        onDirectionClick={handleDirectionClick}
        defaultTargetKeys={['选项1', '选项2']}
        defaultTargetSelectedKeys={['选项1']}
      />
    );
    const newComponent = getComponent(newTarget);
    newComponent.handleToLeft();
    expect(direction).toBe('left');
    expect(targetKeys).toEqual(['选项2']);
    expect(moveKey).toEqual(['选项1']);

    const { targetSelectedKeys, targetKeys: newTarggetKeys } = newComponent.state;
    expect(targetSelectedKeys).toEqual([]);
    expect(newTarggetKeys).toEqual(['选项2']);
  });

  it('Transfer handleToRight moveDataToRight', () => {
    let targetKeys, direction, moveKey;
    const handleDirectionClick = (nextTargetKeys, dir, key) => {
      targetKeys = nextTargetKeys;
      direction = dir;
      moveKey = key;
    };
    const target = mount(
      <Transfer
        data={data}
        onDirectionClick={handleDirectionClick}
        targetKeys={['选项1', '选项2']}
        sourceSelectedKeys={['选项3', '选项4']}
      />
    );
    const component = getComponent(target);
    component.handleToRight();
    expect(direction).toBe('right');
    expect(targetKeys).toEqual(['选项1', '选项2', '选项3', '选项4']);
    expect(moveKey).toEqual(['选项3', '选项4']);

    const { sourceSelectedKeys, targetKeys: nowTargetKeys } = component.state;
    expect(sourceSelectedKeys).toEqual(['选项3', '选项4']);
    expect(nowTargetKeys).toEqual(['选项1', '选项2']);

    const newTarget = mount(
      <Transfer
        data={data}
        onDirectionClick={handleDirectionClick}
        defaultTargetKeys={['选项1', '选项2']}
        defaultSourceSelectedKeys={['选项3']}
      />
    );
    const newComponent = getComponent(newTarget);
    newComponent.handleToRight();
    expect(direction).toBe('right');
    expect(targetKeys).toEqual(['选项1', '选项2', '选项3']);
    expect(moveKey).toEqual(['选项3']);

    const {
      sourceSelectedKeys: newSourceSelectedKeys,
      targetKeys: newTarggetKeys,
    } = newComponent.state;
    expect(newSourceSelectedKeys).toEqual([]);
    expect(newTarggetKeys).toEqual(['选项1', '选项2', '选项3']);
  });

  it('Transfer checkAllForLeft', () => {
    const target = mount(
      <Transfer
        data={data}
        targetKeys={['选项1', '选项2']}
        sourceSelectedKeys={['选项3', '选项4']}
      />
    );
    const component = getComponent(target);
    component.checkAllForLeft(true);
    const { sourceSelectedKeys } = component.state;
    expect(sourceSelectedKeys).toEqual(['选项3', '选项4']);

    const newTarget = mount(
      <Transfer
        data={data}
        targetKeys={['选项1', '选项2']}
        defaultSourceSelectedKeys={['选项3', '选项4']}
      />
    );
    const newComponent = getComponent(newTarget);
    newComponent.checkAllForLeft(true);
    const { sourceSelectedKeys: newSourceSelectedKeys } = newComponent.state;
    expect(newSourceSelectedKeys).toEqual(['选项3', '选项4', '选项6']);
  });

  it('Transfer checkAllForRight', () => {
    const target = mount(
      <Transfer
        data={data}
        targetKeys={['选项1', '选项2', '选项3']}
        targetSelectedKeys={['选项1']}
      />
    );
    const component = getComponent(target);
    component.checkAllForRight(true);
    const { targetSelectedKeys } = component.state;
    expect(targetSelectedKeys).toEqual(['选项1']);

    const newTarget = mount(
      <Transfer
        data={data}
        targetKeys={['选项1', '选项2', '选项3']}
        defaultTargetSelectedKeys={['选项3']}
      />
    );
    const newComponent = getComponent(newTarget);
    newComponent.checkAllForRight(true);
    const { targetSelectedKeys: newTargetSelectedKeys } = newComponent.state;
    expect(newTargetSelectedKeys).toEqual(['选项1', '选项2', '选项3']);
  });

  it('Transfer searchCallbackForLeft', () => {
    const target = mount(<Transfer data={data} targetKeys={['选项1', '选项2', '选项3']} />);
    const component = getComponent(target);
    component.searchCallbackForLeft('');
    const { sourceSearchData } = component.state;
    expect(sourceSearchData).toEqual([
      { text: '选项4', value: '选项4', disabled: false },
      { text: '选项5', value: '选项5', disabled: true },
      { text: '选项6', value: '选项6', disabled: false },
    ]);
    component.searchCallbackForLeft('4');
    const { sourceSearchData: newSourceSearchData } = component.state;
    expect(newSourceSearchData).toEqual([{ text: '选项4', value: '选项4', disabled: false }]);
  });

  it('Transfer searchCallbackForRight', () => {
    const target = mount(<Transfer data={data} targetKeys={['选项1', '选项2', '选项3']} />);
    const component = getComponent(target);
    component.searchCallbackForRight('');
    const { targetSearchData } = component.state;
    expect(targetSearchData).toEqual([
      { text: '选项1', value: '选项1', disabled: false },
      { text: '选项2', value: '选项2', disabled: false },
      { text: '选项3', value: '选项3', disabled: false },
    ]);
    component.searchCallbackForRight('4');
    const { targetSearchData: newTargetSearchData } = component.state;
    expect(newTargetSearchData).toEqual([]);

    component.searchCallbackForRight('3');
    const { targetSearchData: nowTargetSearchData } = component.state;
    expect(nowTargetSearchData).toEqual([{ text: '选项3', value: '选项3', disabled: false }]);
  });

  it('Transfer: searchFilter ', () => {
    const target = mount(<Transfer data={data} />);
    const component = getComponent(target);
    const result = component.searchFilter(
      [
        { text: '选项1', value: '选项1', disabled: false },
        { text: '选项2', value: '选项2', disabled: false },
      ],
      '1',
      (value: string, option: Object): boolean => {
        return option.value.indexOf(value) > -1;
      }
    );
    expect(result).toEqual([{ text: '选项1', value: '选项1', disabled: false }]);

    const newResult = component.searchFilter(
      [
        { text: '选项1', value: '选项1', disabled: false },
        { text: '选项2', value: '选项2', disabled: false },
      ],
      '',
      (value: string, option: Object): boolean => {
        return option.value.indexOf(value) > -1;
      }
    );
    expect(newResult).toEqual([
      { text: '选项1', value: '选项1', disabled: false },
      { text: '选项2', value: '选项2', disabled: false },
    ]);
  });
});
