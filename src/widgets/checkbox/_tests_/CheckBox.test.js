/**
 * CheckBox 单元测试
 * create by guorg
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckBox from '../';
import { CheckBoxDemo } from '../demo';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('CheckBox', () => {
  const getState = (target: any): Object => {
    const state = target
      .children()
      .at(0)
      .instance().state;
    return state;
  };
  const createTarget = (config: Object): any => {
    const target = mount(<CheckBox {...config} />);
    return target;
  };

  it('CheckBox CSS', () => {
    const target = <CheckBoxDemo />;
    expect(renderer.create(target).toJSON()).toMatchSnapshot();
  });

  function onClick(target: any, result: boolean) {
    expect(getState(target).checked).toBe(true);
    const label = target.find('label');
    label.at(0).simulate('click');
    expect(getState(target).checked).toBe(result);
  }

  it('CheckBox: props: checked = true event: click ', () => {
    const config = { checked: true };
    const target = createTarget(config);
    onClick(target, true);
    onClick(target, true);
  });

  it('CheckBox props.checked mapTo state.checked ', () => {
    const config = { checked: true };
    const target = createTarget(config);
    expect(getState(target).checked).toBe(true);

    target.setProps({ checked: false });
    expect(getState(target).checked).toBe(false);

    target.setProps({ checked: true });
    expect(getState(target).checked).toBe(true);
  });

  it('CheckBox: props: defaultChecked = true event: click ', () => {
    const newConfig = { defaultChecked: true };
    const newTarget = createTarget(newConfig);
    onClick(newTarget, false);
  });

  it('CheckBox props: disabled  & onChange', () => {
    let triggerCnt = 0;
    const value = 'hello';
    const handleChange = (_, val) => {
      triggerCnt++;
      expect(val).toBe(value);
    };
    const config = { disabled: true, onChange: handleChange, value };

    const target = createTarget(config);

    function expectAfterClick(result: number) {
      const label = target.find('label');
      label.at(0).simulate('click');
      expect(triggerCnt).toBe(result);
    }

    expectAfterClick(0);
    expectAfterClick(0);

    target.setProps({ disabled: false });

    expectAfterClick(1);
    expectAfterClick(2);

    target.setProps({ disabled: true });
    expectAfterClick(2);
  });
});
