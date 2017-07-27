//@flow
import { mount, } from 'enzyme';
import React from 'react';
import Input from '../';
import renderer from 'react-test-renderer';
import chai from 'chai';
import 'jest-styled-components';


import Support from '../../common/FormFieldWidgetSupport';
import { assertInputValue, testPropsValue, } from './InputTestUtils';

const { expect: exp, } = chai;
const { mockFunction, mockObject, VerifyOrder, VerifyOrderConfig, } = require('vx-mock');
const { InputOnly, Input: InputElement, } = require('../index');

describe('Input', () => {
  let order;
  beforeEach(() => {
    order = VerifyOrder.create();
  });

  it('props: null', () => {
    expect(renderer.create(<Input/>).toJSON()).toMatchSnapshot();
  });

  it('props: prefix state: focus', () => {
    const prefix = <div></div>;
    const component = renderer.create(<Input prefix={prefix}/>);
    let input = component.toJSON();

    input.children[ 1 ].props.onFocus();
    input = component.toJSON();
    expect(input).toHaveStyleRule('box-shadow', /.*/);
    expect(input).toMatchSnapshot();
    input.children[ 1 ].props.onBlur();
    input = component.toJSON();
    expect(input).toHaveStyleRule('box-shadow', '');
    expect(input).toMatchSnapshot();
  });

  it('props: null state: focus', () => {
    const component = renderer.create(<Input/>);
    let input = component.toJSON();

    input.props.onFocus();
    input = component.toJSON();
    expect(input).toHaveStyleRule('box-shadow', '0 0 0 2px rgba(16,142,233,.2)');
    expect(input).toMatchSnapshot();
    exp(input.children).to.be.null;
    input.props.onBlur();
    input = component.toJSON();
    expect(input).toHaveStyleRule('box-shadow', '');
    expect(input).toMatchSnapshot();
  });

  it('props: null event: focus', () => {
    const input = mount(<Input/>);
    input.find('input').simulate('focus');
    exp(input.state('focused')).to.be.true;
    input.find('input').simulate('blur');
    exp(input.state('focused')).to.be.false;
  });

  it('props: prefix', () => {
    const text = 'hello ligx';
    const prefix = <div className="prefix">{text}</div>;
    const component = mount(<Input prefix={prefix}/>);
    exp(component.find('.prefix').text()).to.be.equal(text);
  });

  it('props: suffix', () => {
    const text = 'hello suffix';
    const suffix = <div className="suffix">{text}</div>;
    const component = mount(<Input suffix={suffix}/>);
    exp(component.find('.suffix').text()).to.be.equal(text);
  });

  it('props: prefix&suffix', () => {
    const prefixTxt = 'hello ligx';
    const suffixTxt = 'hello kxy';
    const prefix = <div className="prefix">{prefixTxt}</div>;
    const suffix = <div className="suffix">{suffixTxt}</div>;

    const component = mount(<Input prefix={prefix} suffix={suffix}/>);
    exp(component.find('.prefix').text()).to.be.equal(prefixTxt);
    exp(component.find('.suffix').text()).to.be.equal(suffixTxt);
  });


  it('props: value', () => {
    const value = '诸法为空';
    testPropsValue(value, value);
  });

  it('props: onChange', () => {
    const mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
    const text = 'hello suffix';
    const component = mount(<Input onChange={mockFunc.getFunction()}/>);
    component.find('input').simulate('change', { target: { value: text, }, });
    assertInputValue(component, text);
    order.verify(({ onChange, }) => {
      onChange(text, '');
    });
  });

  it('props: value onChange Limited Input', () => {

    const mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
    mockFunc.forever('ok');

    const value = '诸行无常';
    const changeValue = 'hello ligx';

    const component = mount(<Input value={value} onChange={mockFunc.getFunction()}/>);

    assertInputValue(component, value);

    component.find('input').simulate('change', { target: { value: changeValue, }, });

    assertInputValue(component, value);

    order.verify(({ onChange, }) => {
    });
  });

  it('function: getValue', () => {
    const SupportMock = mockObject.create(Support, VerifyOrderConfig.create('Support', order));
    const returnValue = 'hello';
    const value = 'ligx';
    SupportMock.mockFunction('getValue').returned(returnValue);
    testPropsValue(value, returnValue);
  });

  it('function: generateInput', () => {
    const InputMock = mockObject.create(Input.prototype, VerifyOrderConfig.create('Input', order));
    InputMock.mockFunction('generateInput').returned(<InputOnly/>);
    const component = mount(<Input/>);
    order.verify(({ Input, }) => {
      Input.generateInput(InputOnly);
    });
    InputMock.resetAll();
  });

  it('props: prefix function: generateInput', () => {
    const InputMock = mockObject.create(Input.prototype, VerifyOrderConfig.create('Input', order));
    InputMock.mockFunction('generateInput').returned(<InputOnly/>);
    const prefix = <div></div>;

    const component = mount(<Input prefix={prefix}/>);
    order.verify(({ Input, }) => {
      Input.generateInput(InputElement);
    });
    InputMock.resetAll();
  });

});
