/**
 * CheckBoxGroup 单元测试
 * create by guorg
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckBox from '../checkbox';
import CheckBoxGroup from '../checkbox-group';
import { CheckboxGroupDemo } from '../demo';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('CheckBox', () => {
  const createMount = (config: Object) => {
    return (
      <CheckBoxGroup {...config}>
        <CheckBox value="1" />
        <CheckBox value="2" />
        <CheckBox value="3" />
      </CheckBoxGroup>
    );
  };
  const getState = (target: any): Object => {
    const state = target
      .children()
      .at(0)
      .instance().state;
    return state;
  };
  const options = [
    { label: 'check1', value: '11', name: '1' },
    { label: 'check2', value: '22', name: '2' },
    { label: 'check3', value: '33', name: '3' },
  ];
  const compare = function(obj1, obj2) {
    const val1 = obj1.label;
    const val2 = obj2.label;
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    }
    return 0;
  };
  it('CheckBoxGroup CSS', () => {
    const target = <CheckboxGroupDemo />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });

  it('CheckBoxGroup value | defaultValue', () => {
    const target = mount(createMount({ value: ['1'] }));
    const newTarget = mount(createMount({ defaultValue: ['1'] }));
    const cmp = getState(target);
    const newCmp = getState(newTarget);

    expect(cmp.value).toEqual(['1']);
    expect(newCmp.value).toEqual(['1']);
  });

  it('CheckBoxGroup disabled', () => {
    let value = 0;
    const handleOnChange = () => {
      value++;
    };
    const target = mount(createMount({ disabled: true, onChange: handleOnChange }));
    const newTarget = mount(createMount({ onChange: handleOnChange }));

    function onClick(target: any, disabled?: boolean) {
      const label = target.find('label');
      for (let i = 0; i < 3; i++) {
        label.at(i).simulate('click');
        expect(value).toBe(disabled ? 0 : i + 1);
      }
    }

    onClick(target, true);
    onClick(newTarget);
  });
  it('CheckBoxGroup displayValue', () => {
    let oldResult: Object = {};
    let newResult = {};
    const handleOnChange = (obj: Object) => {
      oldResult = { ...newResult };
      newResult = { ...obj };
    };

    const target = mount(
      <CheckBoxGroup
        onChange={handleOnChange}
        styles="vertical"
        data={options}
        defaultValue={['11']}
        displayField="label"
      />
    );
    const label = target.find('label');

    label.at(0).simulate('click');
    const result = [];
    const items = [];

    function compareResult(num: number, nth: number) {
      label.at(num).simulate('click');
      if (nth === 1) {
        result.push(options[num].value);
        items.push(options[num]);
      } else {
        result.splice(0, 1);
        items.splice(0, 1);
      }

      expect(newResult.newValue).toEqual(result);
      expect(newResult.newItem).toEqual(items);
      expect(newResult.oldValue).toEqual(oldResult.newValue);
      expect(newResult.oldItem).toEqual(oldResult.newItem);
    }

    for (let i = 0; i < 3; i++) {
      compareResult(i, 1);
    }
    for (let i = 0; i < 3; i++) {
      compareResult(i, 2);
    }
  });

  it('CheckBoxGroup displayValue onChange:oldItem & newItem value:onChange', () => {
    let oldResult = {};
    let newResult = {};
    const handleOnChange = (obj: Object) => {
      oldResult = { ...newResult };
      newResult = { ...obj };
    };
    const target = mount(
      <CheckBoxGroup
        onChange={handleOnChange}
        styles="vertical"
        data={options}
        defaultValue={['11', '44']}
        displayValue={['check4', 'check5']}
        displayField="label"
      />
    );
    const label = target.find('label');
    label.at(1).simulate('click');
    expect(newResult.newValue).toEqual(['44']);
    label.at(1).simulate('click');
    expect(newResult.newValue.sort()).toEqual(['11', '44'].sort());
    expect(newResult.newItem.length).toBe(2);
    expect(newResult.oldItem).toEqual(oldResult.newItem);
    label.at(2).simulate('click');
    expect(newResult.newValue).toEqual(['11', '44', '22']);
    expect(newResult.newItem.length).toBe(3);
    expect(newResult.oldItem.sort(compare)).toEqual(oldResult.newItem.sort(compare));
    const innerSpan = label
      .at(0)
      .find('span')
      .at(0);
    innerSpan.simulate('click');
    expect(newResult.newValue).toEqual(['11', '22']);
    expect(newResult.newItem.length).toBe(2);
    expect(newResult.newItem.length).toBe(2);
    expect(newResult.oldItem.sort(compare)).toEqual(oldResult.newItem.sort(compare));
    target.setProps({
      value: ['11'],
    });
    const changedLabel = target.find('label');
    changedLabel.at(2).simulate('click');
    const cmpState = target
      .children()
      .at(0)
      .instance().state;
    expect(newResult.newValue).toEqual(['11', '33']);
    expect(cmpState.value).toEqual(['11']);
    target.setProps({ value: newResult.newValue }); //value: ['11','33']
    changedLabel.at(2).simulate('click');
    expect(newResult.oldItem).toEqual([
      { label: 'check1', name: '1', value: '11' },
      { label: 'check3', value: '33', name: '3' },
    ]);
    expect(newResult.newItem).toEqual([{ label: 'check1', name: '1', value: '11' }]);
    expect(
      target
        .children()
        .at(0)
        .instance().state.value
    ).toEqual(['11', '33']);
  });

  const MapTestTarget = mount(
    <CheckBoxGroup
      styles="vertical"
      data={options}
      defaultValue={['11', '44']}
      displayValue={['check4', 'check5']}
      displayField="label"
    />
  );
  it('CheckBoxGroup: MapData props:data change-render', () => {
    const cmp = MapTestTarget.children()
      .at(0)
      .instance();
    const oldDataMaptoItem = cmp.dataItem;
    expect(cmp.dataItem).toBe(oldDataMaptoItem);
    const newOptions = [...options];
    MapTestTarget.setProps({ data: newOptions });
    expect(cmp.dataItem).not.toBe(oldDataMaptoItem);

    cmp.props.data.push({ label: 'aaa', value: '44' });
    cmp.handleChange('1', [11]);
    expect(cmp.dataItem).not.toBe(oldDataMaptoItem);
  });
  it('CheckBoxGroup: MapData props:data data push item-not render', () => {
    const cmp = MapTestTarget.children()
      .at(0)
      .instance();
    const oldDataMaptoItem = cmp.dataItem;
    cmp.props.data.push({ label: 'check1', value: '111', name: '111' });
    cmp.handleChange('1', '111');
    expect(cmp.dataItem).not.toBe(oldDataMaptoItem);
  });

  const createCheckBoxGroup = (obj: Object) => {
    return <CheckBoxGroup childType="button" data={options} displayValue="d" {...obj} />;
  };
  it('CheckBoxGroup: props: {childType: button, data,, value}', () => {
    let num = 0;
    const handleChange = () => {
      num++;
    };
    const target = mount(createCheckBoxGroup({ value: ['11'], onChange: handleChange }));
    const span = target.find('hello');
    const cmp = target
      .children()
      .at(0)
      .instance();
    span.at(0).simulate('click');
    expect(num).toBe(1);
    span.at(1).simulate('click');
    expect(num).toBe(2);
    expect(cmp.state.value).toEqual(['11']);
    target.setProps({
      defaultValue: '1',
    });
    expect(cmp.state.value).toEqual(['11']);
  });

  it('CheckBoxGroup: props: {childType: button, data, displayValue, defaultValue}', () => {
    let num = 0;
    const handleChange = () => {
      num++;
    };
    const target = mount(createCheckBoxGroup({ defaultValue: ['44'], onChange: handleChange }));
    const span = target.find('hello');
    const cmp = target
      .children()
      .at(0)
      .instance();
    span.at(0).simulate('click');
    expect(num).toBe(1);
    expect(cmp.state.value).toEqual([]);
    span.at(1).simulate('click');
    expect(num).toBe(2);
    expect(cmp.state.value).toEqual(['11']);
  });
  it('CheckBoxGroup: props: {childType: button, data, displayValue, value}', () => {
    let num = 0;
    const handleChange = () => {
      num++;
    };
    const target = mount(createCheckBoxGroup({ value: ['44'], onChange: handleChange }));
    const span = target.find('hello');
    const cancelSpan = target.find('cancel');
    const cmp = target
      .children()
      .at(0)
      .instance();
    cancelSpan.at(0).simulate('click');
    expect(num).toBe(1);
    expect(cmp.state.value).toEqual(['44']);
    span.at(1).simulate('click');
    expect(num).toBe(2);
    expect(cmp.state.value).toEqual(['44']);
  });
  it('CheckBoxGroup: props: {childType: button, data, displayValue, defaultValue}  cancelItem', () => {
    const target = mount(createCheckBoxGroup({ defaultValue: ['44'] }));
    const span = target.find('hello');
    const cancelSpan = target.find('cancel');
    const cmp = target
      .children()
      .at(0)
      .instance();
    expect(cmp.cancelItem).toEqual([{ text: 'd', value: '44' }]);
    cancelSpan.at(0).simulate('click');
    expect(cmp.cancelItem).toEqual([]);
    span.at(1).simulate('click');
    expect(cmp.cancelItem).toEqual([]);
  });
});
