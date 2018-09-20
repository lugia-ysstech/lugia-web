/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from '../demo';
import CheckButton from '../button';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  it('ChedckButton CSS', () => {
    const Target = <Button />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });

  it('ChedckButton props: onChange', () => {
    let values = '';
    const handleChange = (e, value: string) => {
      values = value;
    };
    const target = mount(<CheckButton onChange={handleChange}>value</CheckButton>);
    const span = target.find('span');
    span.at(0).simulate('click');
    expect(values).toBe('value');
  });

  it('ChedckButton props: onChange disabled', () => {
    let triggerCnt = 0;
    const value = 'hello';
    const handleChange = (_, val: string) => {
      triggerCnt++;
      expect(val).toBe(value);
    };
    const target = mount(
      <CheckButton value={value} disabled onChange={handleChange}>
        value
      </CheckButton>
    );
    const span = target.find('span');
    span.at(0).simulate('click');
    expect(triggerCnt).toBe(0);

    target.setProps({ disabled: false });
    span.at(0).simulate('click');
    expect(triggerCnt).toBe(1);
    span.at(0).simulate('click');
    expect(triggerCnt).toBe(2);

    target.setProps({ disabled: true });
    span.at(0).simulate('click');
    expect(triggerCnt).toBe(2);
  });

  it('ChedckButton props: onChange cancel', () => {
    let triggerCnt = 0;
    const value = 'hello';
    const handleChange = (_, val: string) => {
      triggerCnt++;
      expect(val).toBe(value);
    };
    const target = mount(
      <CheckButton value={value} cancel type="radio" onChange={handleChange}>
        value
      </CheckButton>
    );
    const span = target.find('span');
    span.at(0).simulate('click');
    expect(triggerCnt).toBe(0);

    target.setProps({ type: 'checkbox' });
    span.at(0).simulate('click');
    expect(triggerCnt).toBe(1);

    target.setProps({ cancel: false });
    span.at(0).simulate('click');
    expect(triggerCnt).toBe(2);
  });
});
