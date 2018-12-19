/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import jsdom from 'jsdom';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TransferDemo from '../demo';
import renderer from 'react-test-renderer';
import Transfer from '../group';

const { expect: exp } = chai;
const { JSDOM } = jsdom;

Enzyme.configure({ adapter: new Adapter() });

describe('Transfer', () => {
  it('css', () => {
    const Target = <TransferDemo />;
    const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
    global.window = new JSDOM(documentHTML).window;
    global.document = global.window.document;
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
  const getComponent = (target: any, displayName: string, at: number) => {
    return target
      .find(displayName)
      .at(at)
      .instance();
  };

  it('Transfer: Source/Target-panel state', () => {
    const target = mount(<Transfer data={data} sourceSelectedKeys={[]} />);
    const sourcePanelComponent = getComponent(target, 'TransferPanel', 0);
    const {
      inputValue: sourceInputValue,
      selectedKeys: sourceSelectedKeys,
      typeList: sourceTypeList,
      cancelItem: sourceCancelItem,
    } = sourcePanelComponent.state;
    expect(sourceInputValue).toBe('');
    expect(sourceSelectedKeys).toEqual([]);
    expect(sourceTypeList).toEqual({ blackList: [] });
    expect(sourceCancelItem).toEqual([]);

    const targetPanelComponent = getComponent(target, 'TransferPanel', 1);
    const { inputValue, selectedKeys, typeList, cancelItem } = targetPanelComponent.state;
    expect(inputValue).toBe('');
    expect(selectedKeys).toEqual([]);
    expect(typeList).toEqual({ whiteList: [] });
    expect(cancelItem).toEqual([]);

    const newTarget = mount(
      <Transfer
        data={data}
        sourceSelectedKeys={[]}
        targetKeys={['选项1', '选项2', 'A']}
        displayValue={['1', '2', 'a']}
      />
    );
    const newSourcePanelComponent = getComponent(newTarget, 'TransferPanel', 0);
    expect(newSourcePanelComponent.state.typeList).toEqual({
      blackList: ['选项1', '选项2', 'A'],
    });
    expect(newSourcePanelComponent.state.cancelItem).toEqual([{ text: 'a', value: 'A' }]);
    const newTargetPanelComponent = getComponent(newTarget, 'TransferPanel', 1);
    expect(newTargetPanelComponent.state.typeList).toEqual({
      whiteList: ['选项1', '选项2', 'A'],
    });
    newTarget.setProps({ targetKeys: ['选项1', '选项2', '选项3'] });
    const sourcePanmeState = getComponent(newTarget, 'TransferPanel', 0).state;
    const targetPanmeState = getComponent(newTarget, 'TransferPanel', 1).state;
    expect(sourcePanmeState.typeList).toEqual({
      blackList: ['选项1', '选项2', '选项3'],
    });
    expect(targetPanmeState.typeList).toEqual({
      whiteList: ['选项1', '选项2', '选项3'],
    });
    newTarget.setProps({
      displayValue: ['1', '2', 'a', 'b'],
      targetKeys: ['选项1', '选项2', '选项3', 'B'],
    });
    expect(getComponent(newTarget, 'TransferPanel', 1).state.cancelItem).toEqual([
      { text: 'b', value: 'B' },
    ]);
  });

  it('Transfer: getTargetSelectedKeys/getSourceSelectedKeys/getTargetKeys/getDisplayValue', () => {
    const target = mount(<Transfer data={data} />);
    const component = getComponent(target, 'Transfer', 0);
    const targetSelectedKeys = component.getTargetSelectedKeys({ targetSelectedKeys: ['1', '2'] });
    const sourceSelectedKeys = component.getSourceSelectedKeys({ sourceSelectedKeys: ['1', '2'] });
    const displayValue = component.getDisplayValue({ displayValue: ['1', '2'] });
    const targetKeys = component.getTargetKeys({ targetKeys: ['1', '2'] });

    expect(targetSelectedKeys).toEqual(['1', '2']);
    expect(sourceSelectedKeys).toEqual(['1', '2']);
    expect(displayValue).toEqual(['1', '2']);
    expect(targetKeys).toEqual(['1', '2']);

    const newDefaultTargetSelectedKeys = component.getTargetSelectedKeys({
      defaultTargetSelectedKeys: ['1'],
    });
    const newDefaultSourceSelectedKeys = component.getSourceSelectedKeys({
      defaultSourceSelectedKeys: ['1'],
    });
    const newDefaultDisplayValue = component.getDisplayValue({
      defaultDisplayValue: ['1'],
    });
    const newDefaultTargetKeys = component.getTargetKeys({
      defaultTargetKeys: ['1'],
    });
    expect(newDefaultTargetSelectedKeys).toEqual(['1']);
    expect(newDefaultSourceSelectedKeys).toEqual(['1']);
    expect(newDefaultDisplayValue).toEqual(['1']);
    expect(newDefaultTargetKeys).toEqual(['1']);

    const newTargetSelectedKeys = component.getTargetSelectedKeys({});
    const newSourceSelectedKeys = component.getSourceSelectedKeys({});
    const newDisplayValue = component.getDisplayValue({});
    const newTargetKeys = component.getTargetKeys({});
    expect(newTargetSelectedKeys).toEqual([]);
    expect(newSourceSelectedKeys).toEqual([]);
    expect(newDisplayValue).toEqual([]);
    expect(newTargetKeys).toEqual([]);
  });
});
