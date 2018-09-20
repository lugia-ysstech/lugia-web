/**
 * RadioGroup 单元测试
 * create by guorg
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Radio from '../radio';
import RadioGroup from '../radio-group';
import CheckButton from '../../check-button/button';
import { RadioGroupDemo } from '../demo';
import renderer from 'react-test-renderer';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('RadioGroup', () => {
  const createMount = (obj?: Object): any => {
    const config = obj ? obj : { value: '1' };
    return (
      <RadioGroup {...config}>
        <Radio value="1">Radio</Radio>
        <Radio value="2">Radio2</Radio>
        <Radio value="3">Radio3</Radio>
      </RadioGroup>
    );
  };
  const creatRadioButton = (obj?: Object): any => {
    return (
      <RadioGroup {...obj}>
        <CheckButton value="1">CheckBox1</CheckButton>
        <CheckButton value="2">CheckBox2</CheckButton>
        <CheckButton value="3">CheckBox3</CheckButton>
      </RadioGroup>
    );
  };
  const geyState = (target: any): Object => {
    return target
      .children()
      .at(0)
      .instance().state;
  };
  //toTest:state( value in props / disabled);
  function commonTest(target: any, stateValue: string) {
    const { value } = geyState(target);
    expect(value).toBe(stateValue);
    const label = target.find('label');
    for (let i = 0; i < 3; i++) {
      label.at(i).simulate('click');
      expect(value).toBe(stateValue);
    }
  }

  it('RadioGroup css', () => {
    const target = <RadioGroupDemo />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });
  it('RadioGroup value | defaultValue', () => {
    const target = mount(createMount());
    const newTarget = mount(createMount({ defaultValue: '1' }));
    const { value } = geyState(target);
    const newCheckValue = geyState(newTarget).value;
    expect(value).toBe('1');
    expect(newCheckValue).toBe('1');
    newTarget.setProps({ defaultValue: '2' });
    expect(newCheckValue).toBe('1');
  });
  it('RadioGroup props:value can not Change ', () => {
    const target = mount(createMount());
    commonTest(target, '1');
  });
  it('RadioGroup props:disabled Click', () => {
    const target = mount(createMount({ defaultValue: '1', disabled: true }));
    commonTest(target, '1');
  });
  it('RadioGroup props:data( disabled in item ) Click', () => {
    const optionsWithStyles = [
      { text: 'Apple', value: 'apple', disabled: true },
      { text: 'Pear', value: 'pear' },
      { text: 'Orange', value: 'orange', disabled: true },
    ];
    const target = mount(<RadioGroup defaultValue="apple" data={optionsWithStyles} />);
    const label = target.find('label');
    const { value } = geyState(target);
    expect(value).toBe('apple');
    for (let i = 0; i < 3; i++) {
      label.at(i).simulate('click');
      expect(geyState(target).value).toBe(i === 0 ? 'apple' : 'pear');
    }
  });
  it('RadioGroup props:onChange', () => {
    let testValues = '0';
    const handleChange = obj => {
      testValues = obj.newValue;
    };
    const target = mount(createMount({ onChange: handleChange }));
    const label = target.find('label');
    for (let i = 0; i < 3; i++) {
      label.at(i).simulate('click');
      expect(testValues).toBe(`${i + 1}`);
    }
  });
  it('RadioGroup changeValue === stateValue onChange', () => {
    let a = 0;
    function add() {
      a++;
    }
    const target = mount(createMount({ onChange: add }));
    const label = target.find('label');
    function simulateClick(repeat: boolean) {
      for (let i = 0; i < 3; i++) {
        label.at(repeat ? 0 : i).simulate('click');
        expect(a).toBe(repeat ? 1 : i + 1);
      }
    }
    simulateClick(false);
    a = 0;
    simulateClick(true);
  });
  it('RadioGroup onChange: oldItem oldValue newItem newValue', () => {
    let result = {},
      changeValue = '0',
      oldResult: Object = {};
    const data = [
      { text: 'Apple', value: 'apple' },
      { text: 'Pear', value: 'pear' },
      { text: 'Orange', value: 'orange' },
    ];
    function handleChange(obj: Object) {
      oldResult = { ...result };
      changeValue = obj.newValue;
      result = { ...obj };
    }
    const target = mount(<RadioGroup defaultValue="apple" data={data} onChange={handleChange} />);
    const label = target.find('label');
    //不抛出onChange 事件
    label.at(0).simulate('click');
    expect(changeValue).toBe('0');
    //start 赋值给oldResult;
    label.at(1).simulate('click');
    expect(changeValue).toBe('pear');
    function compare(num: number) {
      label.at(num).simulate('click');
      expect(changeValue).toBe(data[num].value);
      expect(result.newValue).toBe(data[num].value);
      expect(result.newItem).toEqual(data[num]);
      expect(result.oldValue).toBe(oldResult.newValue);
      expect(result.oldItem).toEqual(oldResult.newItem);
    }
    for (let i = 0; i < 3; i++) {
      compare(i);
    }
  });

  const data = [{ text: 'a', value: '1' }, { text: 'b', value: '2' }, { text: 'c', value: '3' }];
  const MapTestTarget = mount(<RadioGroup data={data} />);
  it('RadioGroup: MapData props:data change-render', () => {
    const cmp = MapTestTarget.children()
      .at(0)
      .instance();
    const oldDataMaptoItem = cmp.dataItem;
    const newOptions = [...data];
    expect(cmp.dataItem).toBe(oldDataMaptoItem);
    newOptions[0].value = '111';
    MapTestTarget.setProps({ data: newOptions });
    expect(cmp.dataItem).not.toBe(oldDataMaptoItem);

    cmp.props.data.push({ text: 'aaa', value: '44' });
    cmp.handleChange({ label: '1', value: '1' })('1', '44');
    expect(cmp.dataItem).not.toBe(oldDataMaptoItem);
  });
  it('RadioGroup: MapData props:data data push item-not render', () => {
    const cmp = MapTestTarget.children()
      .at(0)
      .instance();
    const oldDataMaptoItem = cmp.dataItem;
    cmp.props.data.push({ label: 'check1', value: '111', name: '111' });
    cmp.handleChange({ label: 'check1', value: '111', name: '111' })('666');
    expect(cmp.dataItem).not.toBe(oldDataMaptoItem);
  });

  it('RadioGroup: props: childType: button; value same not onChange', () => {
    let num = 0;
    const handleChange = () => {
      num++;
    };
    const target = mount(
      creatRadioButton({ childType: 'button', onChange: handleChange, defaultValue: '1' })
    );
    const span = target.find('hello');
    span.at(0).simulate('click');
    expect(num).toBe(0);
    span.at(1).simulate('click');
    expect(num).toBe(1);
    span.at(2).simulate('click');
    expect(num).toBe(2);
  });
  it('RadioGroup: props: {childType: button, disabled: true}', () => {
    let num = 0;
    const handleChange = () => {
      num++;
    };
    const target = mount(
      creatRadioButton({ childType: 'button', onChange: handleChange, disabled: true })
    );
    const span = target.find('hello');
    span.at(0).simulate('click');
    expect(num).toBe(0);
    span.at(1).simulate('click');
    expect(num).toBe(0);
  });
  const createRadioGroup = (obj: Object) => {
    return <RadioGroup childType="button" data={data} displayValue="d" {...obj} />;
  };
  it('RadioGroup: props: {childType: button, data, displayValue, value}', () => {
    let num = 0;
    const handleChange = () => {
      num++;
    };
    const target = mount(createRadioGroup({ value: '4', onChange: handleChange }));
    const span = target.find('hello');
    const cmp = target
      .children()
      .at(0)
      .instance();
    span.at(0).simulate('click');
    expect(num).toBe(0);
    span.at(1).simulate('click');
    expect(num).toBe(1);
    expect(cmp.state.value).toBe('4');
    target.setProps({
      defaultValue: '1',
    });
    expect(cmp.state.value).toBe('4');
  });
  const datas = [{ text: 'a', value: '1' }, { text: 'b', value: '2' }, { text: 'c', value: '3' }];

  it('RadioGroup: props: {childType: button, data, displayValue, defaultValue}', () => {
    let num = 0;
    const handleChange = () => {
      num++;
    };
    const target = mount(
      createRadioGroup({ defaultValue: '4', onChange: handleChange, data: datas })
    );
    const span = target.find('hello');
    const cmp = target
      .children()
      .at(0)
      .instance();
    span.at(0).simulate('click');
    expect(num).toBe(0);
    expect(cmp.state.value).toBe('4');
    span.at(1).simulate('click');
    expect(num).toBe(1);
    expect(cmp.state.value).toBe('1');
  });
  it('RadioGroup: props: {childType: button, data, displayValue, value}', () => {
    let num = 0;
    const handleChange = () => {
      num++;
    };
    const target = mount(createRadioGroup({ value: '4', onChange: handleChange, data: datas }));
    const span = target.find('hello');
    const cmp = target
      .children()
      .at(0)
      .instance();
    span.at(0).simulate('click');
    expect(num).toBe(0);
    expect(cmp.state.value).toBe('4');
    span.at(1).simulate('click');
    expect(num).toBe(1);
    expect(cmp.state.value).toBe('4');
  });
});
