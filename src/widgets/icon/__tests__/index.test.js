//@flow

import * as React from 'react';
import chai from 'chai';
import Icon from '../';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import Enzyme,{ mount, }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter(), });

const { mockFunction, VerifyOrder, VerifyOrderConfig, } = require('@lugia/jverify');

const { expect: exp, } = chai;

describe('Icon', () => {

  it('iconClass: sv-icon-close', () => {
    const target = renderer.create(<Icon iconClass="sv-icon-close"></Icon>).toJSON();
    expect(target).toMatchSnapshot();
  });

  it('iconClass: sv-icon-close', () => {
    const order = VerifyOrder.create();
    const mockClick = mockFunction.create(VerifyOrderConfig.create('eventHandle', order));
    const onClick = mockClick.getFunction();
    const target = mount(<Icon iconClass="sv-icon-close" onClick={onClick}></Icon>);
    target.find('i').simulate('click', {});
    order.verify(obj => {
      const { eventHandle, } = obj;
      eventHandle(VerifyOrder.Object);
    });
  });

});
