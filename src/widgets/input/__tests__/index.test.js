//@flow
import React from 'react';
import Input, { TextBoxInner, } from '../';
import renderer from 'react-test-renderer';
import chai from 'chai';
import 'jest-styled-components';


import Support from '../../common/FormFieldWidgetSupport';
import { assertInputValue, testFireNullKeyBoardEvent, testKeyBoardEvent, testPropsValue, } from './InputTestUtils';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter(), });

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

  it('props: onChange oldValue is "" ', () => {
    const mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
    const text = 'hello suffix';
    const component = mount(<Input onChange={mockFunc.getFunction()}/>);
    component.find('input').simulate('change', { target: { value: text, }, });
    assertInputValue(component, text);
    order.verify(({ onChange, }) => {
      onChange(text, '');
    });
  });
  it('props: onChange oldValue "a" ', () => {
    const mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
    const text0 = 'a';
    const text1 = 'b';
    const component = mount(<Input onChange={mockFunc.getFunction()}/>);

    component.find('input').simulate('change', { target: { value: text0, }, });
    assertInputValue(component, text0);

    component.find('input').simulate('change', { target: { value: text1, }, });
    assertInputValue(component, text1);

    order.verify(({ onChange, }) => {
      onChange(text0, '');
      onChange(text1, text0);
    });
  });

  it('props: onKeyUp', () => {
    testKeyBoardEvent(order, 'onKeyUp');
  });
  it('props: keyboard event is null but fire keyup event', () => {
    testFireNullKeyBoardEvent('onKeyUp');
    testFireNullKeyBoardEvent('onKeyDown');
    testFireNullKeyBoardEvent('onKeyPress');
    testFireNullKeyBoardEvent('onFocus');
    testFireNullKeyBoardEvent('onBlur');
  });

  it('props: onKeyPress', () => {
    testKeyBoardEvent(order, 'onKeyPress');
  });
  it('props: onKeyDown', () => {
    testKeyBoardEvent(order, 'onKeyDown');
  });

  it('props: onFocus', () => {
    testKeyBoardEvent(order, 'onFocus');
  });
  it('props: onBlur', () => {
    testKeyBoardEvent(order, 'onBlur');
  });
  it('props: onEnter Fired', () => {
    const mockFunc = mockFunction.create(VerifyOrderConfig.create('onEnter', order));

    const keyCode = 13;
    const event = { keyCode, };
    mockFunc.mock(({ keyCode, }) => {
      exp(keyCode).to.be.equal(keyCode);
    });
    const props = {
      onEnter: mockFunc.getFunction(),
    };

    const component = mount(<Input {...props}/>);
    component.find('input').simulate('onKeyDown'.substr(2).toLowerCase(), event);
    order.verify(arg => {
      arg.onEnter(VerifyOrder.Object);
    });
  });

  it('props: onEnter Not Fired', () => {
    const mockFunc = mockFunction.create(VerifyOrderConfig.create('onEnter', order));

    const keyCode = 44;
    const event = { keyCode, };


    const props = {
      onEnter: mockFunc.getFunction(),
    };

    const component = mount(<Input {...props}/>);
    component.find('input').simulate('onKeyDown'.substr(2).toLowerCase(), event);
    order.verify(arg => {
    });
  });
  it('props: null  Fired Enter', () => {

    const keyCode = 13;
    const event = { keyCode, };
    const component = mount(<Input/>);
    component.find('input').simulate('onKeyDown'.substr(2).toLowerCase(), event);
  });


  it('props: value onChange Limited Input changed', () => {


    const value = '诸行无常';
    const changeValue = 'hello ligx';

    class LimitInput extends React.Component<any, any> {
      constructor (props) {
        super(props);
        this.state = { value: props.value, };
      }

      onChange = value => {
        this.setState({ value, });
      };

      render () {
        return <Input value={this.state.value} onChange={this.onChange}/>;
      }
    }

    const component = mount(<LimitInput value={value}/>);

    assertInputValue(component, value);

    component.find('input').simulate('change', { target: { value: changeValue, }, });

    assertInputValue(component, changeValue);

  });
  it('props: value onChange Limited Input no changed', () => {


    const value = '诸行无常';
    const changeValue = 'hello ligx';

    class LimitInput extends React.Component<any, any> {
      constructor (props) {
        super(props);
        this.state = { value: props.value, };
      }

      render () {
        return <Input value={this.state.value}/>;
      }
    }

    const component = mount(<LimitInput value={value}/>);

    assertInputValue(component, value);

    component.find('input').simulate('change', { target: { value: changeValue, }, });

    assertInputValue(component, value);

  });


  it('props: value onChange Limited Input changed for prefix: Icon', () => {


    const value = '诸行无常';
    const changeValue = 'hello ligx';

    class LimitInput extends React.Component<any, any> {
      constructor (props) {
        super(props);
        this.state = { value: props.value, };
      }

      onChange = value => {
        this.setState({ value, });
      };

      render () {
        return <Input value={this.state.value} onChange={this.onChange} prefix={<div>helllo</div>}/>;
      }
    }

    const component = mount(<LimitInput value={value}/>);

    assertInputValue(component, value);

    component.find('input').simulate('change', { target: { value: changeValue, }, });

    assertInputValue(component, changeValue);

  });

  it('props: value onChange Limited Input no changed  for prefix: Icon', () => {


    const value = '诸行无常';
    const changeValue = 'hello ligx';

    class LimitInput extends React.Component<any, any> {
      constructor (props) {
        super(props);
        this.state = { value: props.value, };
      }

      render () {
        return <Input value={this.state.value} prefix={<div>helllo</div>}/>;
      }
    }

    const component = mount(<LimitInput value={value}/>);

    assertInputValue(component, value);

    component.find('input').simulate('change', { target: { value: changeValue, }, });

    assertInputValue(component, value);

  });


  it('function: getValue', () => {
    const SupportMock = mockObject.create(Support, VerifyOrderConfig.create('Support', order));
    const returnValue = 'hello';
    const value = 'ligx';
    SupportMock.mockFunction('getValue').returned(returnValue);
    testPropsValue(value, returnValue);
  });

  it('function: generateInput', () => {
    const InputMock = mockObject.create(TextBoxInner.prototype, VerifyOrderConfig.create('Input', order));
    InputMock.mockFunction('generateInput').returned(<InputOnly/>);
    mount(<Input/>);
    order.verify(({ Input, }) => {
      Input.generateInput(InputOnly);
    });
    InputMock.resetAll();
  });

  it('props: prefix function: generateInput', () => {
    const InputMock = mockObject.create(TextBoxInner.prototype, VerifyOrderConfig.create('Input', order));
    InputMock.mockFunction('generateInput').returned(<InputOnly/>);
    const prefix = <div></div>;

    mount(<Input prefix={prefix}/>);
    order.verify(({ Input, }) => {
      Input.generateInput(InputElement);
    });
    InputMock.resetAll();
  });

  it('props: null function: generateInput', () => {
    const InputMock = mockObject.create(TextBoxInner.prototype, VerifyOrderConfig.create('Input', order));
    InputMock.mockFunction('generateInput').returned(<InputOnly/>);
    mount(<Input/>);
    order.verify(({ Input, }) => {
      Input.generateInput(InputOnly);
    });
    InputMock.resetAll();
  });


});
