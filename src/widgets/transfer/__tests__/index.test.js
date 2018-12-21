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
import TransferPanel from '../transfer';
import TransferModel from '../model';
import TransferButton from '../transfer-button';

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
  const mapData = {
    选项1: { text: '选项1', value: '选项1', disabled: false },
    选项2: { text: '选项2', value: '选项2', disabled: false },
    选项3: { text: '选项3', value: '选项3', disabled: false },
    选项4: { text: '选项4', value: '选项4', disabled: false },
    选项5: { text: '选项5', value: '选项5', disabled: true },
    选项6: { text: '选项6', value: '选项6', disabled: false },
  };
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
        value={['选项1', '选项2', 'A']}
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
    newTarget.setProps({ value: ['选项1', '选项2', '选项3'] });
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
      value: ['选项1', '选项2', '选项3', 'B'],
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
    const targetKeys = component.getTargetKeys({ value: ['1', '2'] });

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
      defaultValue: ['1'],
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

  it('Transfer: handleSourceSelect -> props: onSelectChange , sourcePanelState: selectedKeys', () => {
    let keys;
    const selectChange = (item: string[]) => {
      keys = item;
    };
    expect(keys).toBeUndefined();
    const target = mount(<Transfer data={data} onSelectChange={selectChange} />);
    const component = getComponent(target, 'Transfer', 0);
    component.handleSourceSelect(['1', '2']);
    expect(keys).toEqual(['1', '2']);
    const sourcePanelCom = getComponent(target, 'TransferPanel', 0);
    const { selectedKeys } = sourcePanelCom.state;
    expect(selectedKeys).toEqual(['1', '2']);

    const newTarget = mount(
      <Transfer data={data} sourceSelectedKeys={['1']} onSelectChange={selectChange} />
    );
    const newComponent = getComponent(newTarget, 'Transfer', 0);
    newComponent.handleSourceSelect(['1', '2', '3']);
    expect(keys).toEqual(['1', '2', '3']);
    const newSourcePanelCom = getComponent(newTarget, 'TransferPanel', 0);
    const { selectedKeys: newSelectedKeys } = newSourcePanelCom.state;
    expect(newSelectedKeys).toEqual(['1']);
    newTarget.setProps({ sourceSelectedKeys: ['2'] });
    expect(getComponent(newTarget, 'TransferPanel', 0).state.selectedKeys).toEqual(['2']);
  });

  it('Transfer: handleTargetSelect -> props: onSelectChange , targetPanelState: selectedKeys', () => {
    let sourceKey, targetKey;
    const selectChange = (sourceKeys, item: string[]) => {
      targetKey = item;
      sourceKey = sourceKeys;
    };
    expect(sourceKey).toBeUndefined();
    expect(targetKey).toBeUndefined();
    const target = mount(<Transfer data={data} onSelectChange={selectChange} />);
    const component = getComponent(target, 'Transfer', 0);
    component.handleTargetSelect(['1', '2']);
    expect(targetKey).toEqual(['1', '2']);
    expect(sourceKey).toEqual([]);
    const targetPanelCom = getComponent(target, 'TransferPanel', 1);
    const { selectedKeys } = targetPanelCom.state;
    expect(selectedKeys).toEqual(['1', '2']);

    const newTarget = mount(
      <Transfer data={data} targetSelectedKeys={['1']} onSelectChange={selectChange} />
    );
    const newComponent = getComponent(newTarget, 'Transfer', 0);
    newComponent.handleTargetSelect(['1', '2', '3']);
    expect(targetKey).toEqual(['1', '2', '3']);
    expect(sourceKey).toEqual([]);
    const newTargetPanelCom = getComponent(newTarget, 'TransferPanel', 1);
    const { selectedKeys: newSelectedKeys } = newTargetPanelCom.state;
    expect(newSelectedKeys).toEqual(['1']);
    newTarget.setProps({ targetSelectedKeys: ['2'] });
    expect(getComponent(newTarget, 'TransferPanel', 1).state.selectedKeys).toEqual(['2']);
  });

  it('Transfer: handleToRight', () => {
    let nextTargetKeys, direction, moveKey;
    const directionClick = (keys: string[], dir: string, moveKeys: string[]) => {
      nextTargetKeys = keys;
      direction = dir;
      moveKey = moveKeys;
    };
    const target = mount(
      <Transfer data={data} value={['选项4']} onDirectionClick={directionClick} />
    );
    const component = getComponent(target, 'Transfer', 0);
    component.sourceModel.getMoveAfterKeysForSource = function() {
      return {
        moveKey: ['选项2', '选项3'],
        disabledKeys: ['选项5'],
        nextTargetKeys: ['选项2', '选项3', '选项4'],
      };
    };
    component.handleToRight();
    expect(nextTargetKeys).toEqual(['选项2', '选项3', '选项4']);
    expect(direction).toBe('right');
    expect(moveKey).toEqual(['选项2', '选项3']);
    const sourcePanelCom = getComponent(target, 'TransferPanel', 0);
    expect(sourcePanelCom.state.selectedKeys).toEqual([]);

    const newTarget = mount(
      <Transfer data={data} defaultValue={['选项4']} onDirectionClick={directionClick} />
    );
    const newComponent = getComponent(newTarget, 'Transfer', 0);
    newComponent.sourceModel.getMoveAfterKeysForSource = function() {
      return {
        moveKey: ['选项1', '选项2'],
        disabledKeys: ['选项5'],
        nextTargetKeys: ['选项1', '选项2', '选项4'],
      };
    };
    newComponent.handleToRight();
    expect(nextTargetKeys).toEqual(['选项1', '选项2', '选项4']);
    expect(direction).toBe('right');
    expect(moveKey).toEqual(['选项1', '选项2']);
    const newSourcePanelCom = getComponent(newTarget, 'TransferPanel', 0);
    expect(newSourcePanelCom.state.selectedKeys).toEqual(['选项5']);
    expect(newComponent.sourceModel.getList()).toEqual(['选项1', '选项2', '选项4']);
    expect(newComponent.targetModel.getList()).toEqual(['选项1', '选项2', '选项4']);
  });

  it('Transfer: handleToLeft', () => {
    let nextTargetKeys, direction, moveKey;
    const directionClick = (keys: string[], dir: string, moveKeys: string[]) => {
      nextTargetKeys = keys;
      direction = dir;
      moveKey = moveKeys;
    };
    const target = mount(
      <Transfer
        data={data}
        value={['选项2', '选项3', '选项4', '选项5']}
        onDirectionClick={directionClick}
      />
    );
    const component = getComponent(target, 'Transfer', 0);
    component.targetModel.getMoveAfterKeysForTarget = function() {
      return {
        moveKey: ['选项2', '选项3'],
        disabledKeys: ['选项5'],
        nextTargetKeys: ['选项4', '选项5'],
      };
    };
    component.handleToLeft();
    expect(nextTargetKeys).toEqual(['选项4', '选项5']);
    expect(direction).toBe('left');
    expect(moveKey).toEqual(['选项2', '选项3']);
    const targetPanelCom = getComponent(target, 'TransferPanel', 1);
    expect(targetPanelCom.state.selectedKeys).toEqual([]);

    const newTarget = mount(
      <Transfer
        data={data}
        defaultValue={['选项2', '选项3', '选项4', '选项5']}
        onDirectionClick={directionClick}
      />
    );
    const newComponent = getComponent(newTarget, 'Transfer', 0);
    newComponent.targetModel.getMoveAfterKeysForTarget = function() {
      return {
        moveKey: ['选项2', '选项3'],
        disabledKeys: ['选项5'],
        nextTargetKeys: ['选项4', '选项5'],
      };
    };
    newComponent.handleToLeft();
    expect(nextTargetKeys).toEqual(['选项4', '选项5']);
    expect(direction).toBe('left');
    expect(moveKey).toEqual(['选项2', '选项3']);
    const newTargetPanelCom = getComponent(newTarget, 'TransferPanel', 1);
    expect(newTargetPanelCom.state.selectedKeys).toEqual(['选项5']);
    expect(newComponent.targetModel.getList()).toEqual(['选项4', '选项5']);
    expect(newComponent.sourceModel.getList()).toEqual(['选项4', '选项5']);
  });

  it('Transfer: getTreeCanCheckKeys', () => {
    const target = mount(<Transfer data={data} value={['选项2', '选项3', '选项4', '选项5']} />);
    const component = getComponent(target, 'Transfer', 0);
    const { sourceEnableKeys, targetEnableKeys } = component.getTreeCanCheckKeys(mapData, [
      '选项4',
      '选项5',
      '选项6',
    ]);
    expect(sourceEnableKeys).toEqual(['选项1', '选项2', '选项3']);
    expect(targetEnableKeys).toEqual(['选项4', '选项5', '选项6']);
    const {
      sourceEnableKeys: newSourceEnableKeys,
      targetEnableKeys: newTargetEnableKeys,
    } = component.getTreeCanCheckKeys(mapData, []);
    expect(newSourceEnableKeys).toEqual(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6']);
    expect(newTargetEnableKeys).toEqual([]);
  });

  it('Transfer: checkAllForLeft', () => {
    let sourceKeys, targetKeys;
    const checkAll = (sKeys: string[], tKeys: string[]) => {
      sourceKeys = sKeys;
      targetKeys = tKeys;
    };
    const target = mount(
      <Transfer
        data={data}
        onSelectChange={checkAll}
        value={['选项2', '选项3', '选项4', '选项5']}
        targetSelectedKeys={['选项2', '选项3']}
      />
    );
    const component = getComponent(target, 'Transfer', 0);
    component.sourceModel.getCheckAllKeys = function() {
      const checkKeys = ['选项1', '选项6'];
      return checkKeys;
    };
    component.checkAllForLeft();
    expect(sourceKeys).toEqual(['选项1', '选项6']);
    expect(targetKeys).toEqual(['选项2', '选项3']);
    expect(component.sourceModel.getSelectedkeys()).toEqual(['选项1', '选项6']);

    const newTarget = mount(
      <Transfer
        data={data}
        onSelectChange={checkAll}
        value={['选项2', '选项3', '选项4', '选项5']}
        sourceSelectedKeys={['选项2', '选项3']}
      />
    );
    const newComponent = getComponent(newTarget, 'Transfer', 0);
    newComponent.sourceModel.getCheckAllKeys = function() {
      const checkKeys = ['选项1', '选项6'];
      return checkKeys;
    };
    newComponent.checkAllForLeft();
    expect(newComponent.sourceModel.getSelectedkeys()).toEqual(['选项2', '选项3']);
  });

  it('Transfer: checkAllForRight', () => {
    let sourceKeys, targetKeys;
    const checkAll = (sKeys: string[], tKeys: string[]) => {
      sourceKeys = sKeys;
      targetKeys = tKeys;
    };
    const target = mount(
      <Transfer
        data={data}
        onSelectChange={checkAll}
        value={['选项2', '选项3', '选项4', '选项5']}
        targetSelectedKeys={['选项2', '选项3']}
      />
    );
    const component = getComponent(target, 'Transfer', 0);
    component.targetModel.getCheckAllKeys = function() {
      const checkKeys = ['选项1', '选项6'];
      return checkKeys;
    };
    component.checkAllForRight();
    expect(sourceKeys).toEqual([]);
    expect(targetKeys).toEqual(['选项1', '选项6']);
    expect(component.targetModel.getSelectedkeys()).toEqual(['选项2', '选项3']);

    const newTarget = mount(
      <Transfer
        data={data}
        onSelectChange={checkAll}
        value={['选项2', '选项3', '选项4', '选项5']}
        sourceSelectedKeys={['选项2', '选项3']}
      />
    );
    const newComponent = getComponent(newTarget, 'Transfer', 0);
    newComponent.targetModel.getCheckAllKeys = function() {
      const checkKeys = ['选项1', '选项6'];
      return checkKeys;
    };
    newComponent.checkAllForRight();
    expect(newComponent.targetModel.getSelectedkeys()).toEqual(['选项1', '选项6']);
  });

  it('Transfer: handleCancelItemClick', () => {
    let taragetKeys, displayValue;
    const cancelClick = (newTKeys: string[], newDisplay: string[]) => {
      taragetKeys = newTKeys;
      displayValue = newDisplay;
    };
    const target = mount(
      <Transfer
        data={data}
        value={['选项2', '选项3', 'a']}
        displayValue={['选项2', '选项3', 'A']}
        onCancelItemClick={cancelClick}
      />
    );
    const component = getComponent(target, 'Transfer', 0);
    component.handleCancelItemClick('a');
    expect(taragetKeys).toEqual(['选项2', '选项3']);
    expect(displayValue).toEqual(['选项2', '选项3']);
    expect(component.targetModel.getCancelItem()).toEqual([{ text: 'A', value: 'a' }]);

    const newTarget = mount(
      <Transfer
        data={data}
        value={['选项2', '选项3', 'a']}
        defaultDisplayValue={['选项2', '选项3', 'A']}
        onCancelItemClick={cancelClick}
      />
    );
    const newComponent = getComponent(newTarget, 'Transfer', 0);
    newComponent.handleCancelItemClick('a');
    expect(taragetKeys).toEqual(['选项2', '选项3']);
    expect(displayValue).toEqual(['选项2', '选项3']);
    expect(newComponent.targetModel.getCancelItem()).toEqual([]);
  });

  it('TransferPanel: getTreeData', () => {
    const target = mount(
      <TransferPanel
        data={data}
        model={
          new TransferModel({
            type: 'Target',
            selectedKeys: [],
            list: [],
          })
        }
      />
    );
    const component = getComponent(target, 'TransferPanel', 0);
    expect(component.state.treeDataLength).toBe(0);
    component.getTreeData([{}, {}]);
    expect(component.state.treeDataLength).toBe(2);
    component.getTreeData([1, 2]);
    expect(component.state.treeDataLength).toBe(2);
  });

  it('TransferPanel: getDataLength', () => {
    const target = mount(
      <TransferPanel
        data={data}
        model={
          new TransferModel({
            type: 'Target',
            selectedKeys: [],
            list: ['选项4', '选项5', '选项6'],
          })
        }
      />
    );
    const component = getComponent(target, 'TransferPanel', 0);
    component.props.model.cancelItem = [{}, {}];
    const targetLength = component.getDataLength();
    expect(targetLength).toBe(1);

    const source = mount(
      <TransferPanel
        data={data}
        model={
          new TransferModel({
            type: 'Source',
            selectedKeys: [],
            list: ['选项4', '选项5', '选项6'],
          })
        }
      />
    );
    const newComponent = getComponent(source, 'TransferPanel', 0);
    newComponent.props.model.cancelItem = [{}, {}];
    const sourceLength = newComponent.getDataLength();
    expect(sourceLength).toBe(5);
  });

  it('TransferButton: state disabled can not onClick run', () => {
    let cur1 = 0,
      cur2 = 0;
    const leftClick = () => {
      cur1 = cur1 + 1;
    };
    const rightClick = () => {
      cur2++;
    };
    const target = mount(
      <TransferButton
        onLeftClick={leftClick}
        onRightClick={rightClick}
        leftModel={{ getSelectedkeys: () => ['1', '2'], on: () => {} }}
        rightModel={{ getSelectedkeys: () => ['1', '2', '3'], on: () => {} }}
      />
    );
    const component = getComponent(target, 'TransferButton', 0);
    component.handleClick('left')();
    component.handleClick('right')();
    expect(cur1).toBe(1);
    expect(cur2).toBe(1);

    component.setState({
      leftDisabled: true,
      rightDisabled: true,
    });

    component.handleClick('left');
    component.handleClick('right');
    expect(cur1).toBe(1);
    expect(cur2).toBe(1);
  });
});
