//@flow
import type { ReactWrapper, } from 'enzyme';
import type { VerifyOrder, } from 'vx-mock';
import React from 'react';
import Input from '../';
import 'jest-styled-components';
import chai from 'chai';
import Enzyme,{ mount,}  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter(), });

const { mockFunction, VerifyOrder: VerifyOrderFactory, VerifyOrderConfig, } = require('vx-mock');

const { expect: exp, } = chai;

export function testPropsValue (value: string, expect: string) {
  const component = mount(<Input value={value}/>);
  assertInputValue(component, expect);
}

export function assertInputValue (component: ReactWrapper, expect: string) {
  const inputDOM = getInputDOM(component);
  if (inputDOM) {
    exp(inputDOM.value).to.be.equal(expect);
    return;
  }
  throw new Error('input创建失败');
}

function getInputDOM (component, text): HTMLInputElement | null {
  const result = component.find('input').getDOMNode();
  if (result instanceof HTMLInputElement) {
    return result;
  }
  return null;
}

type KeyEventType = 'onKeyUp' | 'onKeyPress' | 'onKeyDown' | 'onFocus' | 'onBlur';

export function testKeyBoardEvent (order: VerifyOrder, keyEvent: KeyEventType) {
  const mockFunc = mockFunction.create(VerifyOrderConfig.create(keyEvent, order));

  const keyCode = 49;
  const event = { keyCode, };
  mockFunc.mock(({ keyCode, }) => {
    exp(keyCode).to.be.equal(keyCode);
  });
  const props = {
    [keyEvent]: mockFunc.getFunction(),
  };

  const component = mount(<Input {...props}/>);
  component.find('input').simulate(keyEvent.substr(2).toLowerCase(), event);
  order.verify(arg => {
    arg[ keyEvent ](VerifyOrderFactory.Object);
  });
}

/*
*   键盘事件为空的情况
*/
export function testFireNullKeyBoardEvent (keyEvent: KeyEventType) {
  const component = mount(<Input/>);
  const keyCode = 49;
  const event = { keyCode, };

  component.find('input').simulate(keyEvent.substr(2).toLowerCase(), event);
}
