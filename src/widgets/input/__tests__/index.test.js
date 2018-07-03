//@flow
import React from 'react';
import Input, { TextBoxInner } from '../';
import Theme from '../../theme';
import renderer from 'react-test-renderer';
import chai from 'chai';
import 'jest-styled-components';

import {
  assertInputValue,
  testFireNullKeyBoardEvent,
  testKeyBoardEvent,
  testPropsValue,
} from './InputTestUtils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Widget from '../../consts';

Enzyme.configure({ adapter: new Adapter() });

const { expect: exp } = chai;
const { mockFunction, mockObject, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');
const { InputOnly, Input: InputElement } = require('../index');

describe('Input', () => {
  let order;
  beforeEach(() => {
    order = VerifyOrder.create();
  });
  it('props: null', () => {
    expect(renderer.create(<Input />).toJSON()).toMatchSnapshot();
  });

  function sizeTest(size) {
    it('props: size', () => {
      expect(renderer.create(<Input size={size} />).toJSON()).toMatchSnapshot();
    });
  }

  sizeTest('small');
  sizeTest('large');

  function disabledTest(disabled) {
    it('props: disabled', () => {
      const component = mount(<Input disabled={disabled} />);
      expect(renderer.create(component).toJSON()).toMatchSnapshot();
      exp(component.props().disabled).to.be.equal(disabled);
    });
  }

  disabledTest(false);
  disabledTest(true);

  it('props: disabled is true  onChange ', () => {
    const mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
    const oldValue = 'a';
    const value = 'b';
    const component = mount(
      <Input disabled={true} value={oldValue} onChange={mockFunc.getFunction()} />
    );
    component.find('input').simulate('change', { target: { value } });
    exp(value).to.not.equal(oldValue);
    order.verify(({ onChange }) => {
      onChange(value, oldValue);
    });
  });

  function placeholderTest(placeholder) {
    it('props: placeholder ', () => {
      const component = mount(<Input placeholder={placeholder} />);
      expect(renderer.create(component).toJSON()).toMatchSnapshot();
      exp(component.props().placeholder).to.be.equal(placeholder);
    });
  }

  placeholderTest('请填写内容');
  placeholderTest('');

  function validateStatusTest(validateStatus) {
    it('props: validateStatus', () => {
      const component = mount(<Input validateStatus={validateStatus} />);
      expect(renderer.create(component).toJSON()).toMatchSnapshot();
    });
  }

  validateStatusTest('success');
  validateStatusTest('error');
  it('props: getTheme: width:100,margin:10,', () => {
    const view = {
      [Widget.Input]: {
        width: 100,
        margin: 10,
      },
    };
    const component = mount(
      <Theme config={view}>
        <Input />
      </Theme>
    );
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });

  it('props: prefix', () => {
    const text = 'hello ligx';
    const prefix = <div className="prefix">{text}</div>;
    const component = mount(<Input prefix={prefix} />);
    exp(component.find('.prefix').text()).to.be.equal(text);
  });

  it('props: suffix', () => {
    const text = 'hello suffix';
    const suffix = <div className="suffix">{text}</div>;
    const component = mount(<Input suffix={suffix} />);
    exp(component.find('.suffix').text()).to.be.equal(text);
  });

  it('props: prefix&suffix', () => {
    const prefixTxt = 'hello ligx';
    const suffixTxt = 'hello kxy';
    const prefix = <div className="prefix">{prefixTxt}</div>;
    const suffix = <div className="suffix">{suffixTxt}</div>;

    const component = mount(<Input prefix={prefix} suffix={suffix} />);
    exp(component.find('.prefix').text()).to.be.equal(prefixTxt);
    exp(component.find('.suffix').text()).to.be.equal(suffixTxt);
  });

  it('props: value', () => {
    const value = '诸法为空';
    testPropsValue(value, value);
  });

  function onChangeMultipleTest(firstValue, secondValue) {
    it('props: onChange  ', () => {
      const mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
      const component = mount(<Input onChange={mockFunc.getFunction()} />);
      component.find('input').simulate('change', { target: { value: firstValue } });
      assertInputValue(component, firstValue);
      component.find('input').simulate('change', { target: { value: secondValue } });
      assertInputValue(component, secondValue);
      order.verify(({ onChange }) => {
        onChange(firstValue, '');
        onChange(secondValue, firstValue);
      });
    });
  }

  onChangeMultipleTest('', 'a');
  onChangeMultipleTest('a', 'b');

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
    const event = { keyCode };
    mockFunc.mock(({ keyCode }) => {
      exp(keyCode).to.be.equal(keyCode);
    });
    const props = {
      onEnter: mockFunc.getFunction(),
    };

    const component = mount(<Input {...props} />);
    component.find('input').simulate('onKeyDown'.substr(2).toLowerCase(), event);
    order.verify(arg => {
      arg.onEnter(VerifyOrder.Object);
    });
  });

  it('props: onEnter Not Fired', () => {
    const mockFunc = mockFunction.create(VerifyOrderConfig.create('onEnter', order));

    const keyCode = 44;
    const event = { keyCode };

    const props = {
      onEnter: mockFunc.getFunction(),
    };

    const component = mount(<Input {...props} />);
    component.find('input').simulate('onKeyDown'.substr(2).toLowerCase(), event);
    order.verify(arg => {});
  });

  it('props: null  Fired Enter', () => {
    const keyCode = 13;
    const event = { keyCode };
    const component = mount(<Input />);
    component.find('input').simulate('onKeyDown'.substr(2).toLowerCase(), event);
  });

  it('props: value onChange Limited Input changed', () => {
    const value = '诸行无常';
    const changeValue = 'hello ligx';

    class LimitInput extends React.Component<any, any> {
      constructor(props) {
        super(props);
        this.state = { value: props.value };
      }
      onChange = value => {
        this.setState({ value });
      };
      render() {
        return <Input value={this.state.value} onChange={this.onChange} />;
      }
    }
    const component = mount(<LimitInput value={value} />);
    assertInputValue(component, value);
    component.find('input').simulate('change', { target: { value: changeValue } });
    assertInputValue(component, changeValue);
  });
  it('props: value onChange Limited Input no changed', () => {
    const value = '诸行无常';
    const changeValue = 'hello ligx';

    class LimitInput extends React.Component<any, any> {
      constructor(props) {
        super(props);
        this.state = { value: props.value };
      }

      render() {
        return <Input value={this.state.value} />;
      }
    }
    const component = mount(<LimitInput value={value} />);
    assertInputValue(component, value);
    component.find('input').simulate('change', { target: { value: changeValue } });
    assertInputValue(component, value);
  });
  it('props: defaultValue', () => {
    const value = '诸行无常';
    const changeValue = 'hello ligx';

    class LimitInput extends React.Component<any, any> {
      render() {
        return <Input defaultValue={this.props.defaultValue} />;
      }
    }
    const component = mount(<LimitInput defaultValue={value} />);
    assertInputValue(component, value);
    component.find('input').simulate('change', { target: { value: changeValue } });
    assertInputValue(component, changeValue);
  });
  it('props: defaultValue & value', () => {
    const defaultValue = '诸行无常';
    const value = '诸法无我';
    const component = mount(<Input defaultValue={defaultValue} value={value} />);
    assertInputValue(component, value);
  });

  it('props: value onChange Limited Input changed for prefix: Icon', () => {
    const value = '诸行无常';
    const changeValue = 'hello ligx';

    class LimitInput extends React.Component<any, any> {
      constructor(props) {
        super(props);
        this.state = { value: props.value };
      }
      onChange = value => {
        this.setState({ value });
      };
      render() {
        return (
          <Input value={this.state.value} onChange={this.onChange} prefix={<div>hello</div>} />
        );
      }
    }
    const component = mount(<LimitInput value={value} />);
    assertInputValue(component, value);
    component.find('input').simulate('change', { target: { value: changeValue } });
    assertInputValue(component, changeValue);
  });

  it('props: value onChange Limited Input no changed  for prefix: Icon', () => {
    const value = '诸行无常';
    const changeValue = 'hello ligx';

    class LimitInput extends React.Component<any, any> {
      constructor(props) {
        super(props);
        this.state = { value: props.value };
      }
      render() {
        return <Input value={this.state.value} prefix={<div>hello</div>} />;
      }
    }

    const component = mount(<LimitInput value={value} />);

    assertInputValue(component, value);

    component.find('input').simulate('change', { target: { value: changeValue } });

    assertInputValue(component, value);
  });

  it('function: generateInput', () => {
    const InputMock = mockObject.create(
      TextBoxInner.prototype,
      VerifyOrderConfig.create('Input', order)
    );
    InputMock.mockFunction('generateInput').returned(<InputOnly />);
    mount(<Input />);
    order.verify(({ Input }) => {
      Input.generateInput(InputOnly);
    });
    InputMock.resetAll();
  });

  it('props: prefix function: generateInput', () => {
    const InputMock = mockObject.create(
      TextBoxInner.prototype,
      VerifyOrderConfig.create('Input', order)
    );
    InputMock.mockFunction('generateInput').returned(<InputOnly />);
    const prefix = <div />;

    mount(<Input prefix={prefix} />);
    order.verify(({ Input }) => {
      Input.generateInput(InputElement);
    });
    InputMock.resetAll();
  });

  it('props: null function: generateInput', () => {
    const InputMock = mockObject.create(
      TextBoxInner.prototype,
      VerifyOrderConfig.create('Input', order)
    );
    InputMock.mockFunction('generateInput').returned(<InputOnly />);
    mount(<Input />);
    order.verify(({ Input }) => {
      Input.generateInput(InputOnly);
    });
    InputMock.resetAll();
  });
});
