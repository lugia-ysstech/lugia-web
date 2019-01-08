//@flow

import * as React from 'react';
import chai from 'chai';
import Icon from '../';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const { mockFunction, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

const { expect: exp } = chai;

describe('Icon', () => {
  it('iconClass: lugia-icon-reminder_close_circle_o', () => {
    const target = renderer
      .create(<Icon iconClass="lugia-icon-reminder_close_circle_o" />)
      .toJSON();
    expect(target).toMatchSnapshot();
  });

  it('iconClass: lugia-icon-reminder_close_circle_o', () => {
    const order = VerifyOrder.create();
    const mockClick = mockFunction.create(VerifyOrderConfig.create('eventHandle', order));
    const onClick = mockClick.getFunction();
    const target = mount(<Icon iconClass="lugia-icon-reminder_close_circle_o" onClick={onClick} />);
    target.find('i').simulate('click', {});
    order.verify(obj => {
      const { eventHandle } = obj;
      eventHandle(VerifyOrder.Object);
    });
  });
});
