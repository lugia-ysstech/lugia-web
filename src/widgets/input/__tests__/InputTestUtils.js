//@flow
import type { ReactWrapper, } from 'enzyme';
import { mount, } from 'enzyme';
import React from 'react';
import Input from '../';
import 'jest-styled-components';
import chai from 'chai';

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
