import React from 'react';
import chai from 'chai';
import renderer from 'react-test-renderer';
import { DefaultAmountInputDemo } from '../demo';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AmountInput from '../index.js';

import {
  assertInputValue,
  testFireNullKeyBoardEvent,
  testKeyBoardEvent,
} from '../../input/__tests__/InputTestUtils';
import { convertCurrency } from '../amountUtils';

const { mockFunction, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

class LimitAmountInput extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: Object, state: Object) {
    if (!state) {
      return { value: nextProps.value };
    }
    return {};
  }

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
  };

  render() {
    return <AmountInput value={this.state.value} onChange={this.onChange} />;
  }
}

describe('AmountInputDemo', () => {
  let order;
  let mockFunc;
  beforeEach(() => {
    order = VerifyOrder.create();
    mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
  });

  const defaultValue = 1234;
  const firstValue = '4321';
  const changeValue = '5678';
  const displayValue = '1,234';
  const activedValue = '¥1,234';
  const displayFirstValue = '4,321';
  const displayChangeValue = '5,678';
  const displayAmountDefaultValue = '壹仟贰佰叁拾肆元整';
  const displayAmountFirstValue = '壹仟贰佰叁拾肆元整';
  const displayAmountChangeValue = '伍仟陆佰柒拾捌元整';

  function tipTool(value: string, formatter: Function): string {
    if (value && formatter) {
      return formatter(value);
    }
    return '';
  }

  function testOnChange(
    title: string,
    props: Object,
    keyPressValue: Array<any>,
    stateValue: Array<any>,
    changeEventValue: Array<any>,
    tipValue: Array<any>
  ) {
    it(`props: onchange ${title} `, () => {
      const order = VerifyOrder.create();
      mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
      const onChange = mockFunc.getFunction();
      const InputFormatter = value => {
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      };

      const component = mount(<AmountInput {...props} onChange={onChange} />);
      const localProps = { ...props };

      if ('disabled' in localProps) {
        const disabled = localProps.disabled;
        if (!disabled) {
          keyPressValue &&
            keyPressValue.forEach((value: any, index: number) => {
              component.find('input').simulate('change', { target: { value } });
              assertInputValue(component, InputFormatter(stateValue[index]));
              expect(tipValue[index]).toBe(tipTool(value, convertCurrency));
            });

          order.verify(({ onChange }) => {
            changeEventValue &&
              changeEventValue.forEach((v, i) => {
                const { value } = props;
                onChange({
                  newValue: v,
                  oldValue: changeEventValue[i - 1] ? changeEventValue[i - 1] : value ? value : '',
                  event: VerifyOrder.Any,
                });
              });
          });
        }
      }
    });
  }

  it('Component JSON', () => {
    global.svtest = true;
    const renders = renderer.create(<DefaultAmountInputDemo />);
    expect(renders.toJSON()).toMatchSnapshot();
    global.svtest = false;
  });
  function placeholderTest(placeholder) {
    it('props: placeholder ', () => {
      global.svtest = true;
      const jsx = <AmountInput placeholder={placeholder} />;
      const component = mount(jsx);
      expect(renderer.create(jsx).toJSON()).toMatchSnapshot();
      exp(component.props().placeholder).to.be.equal(placeholder);
      global.svtest = false;
    });
  }

  placeholderTest('请填写内容');
  placeholderTest('');
  it('props: keyboard event is null but fire keyup event', () => {
    testFireNullKeyBoardEvent('onKeyUp', { keyCode: 49, Target: AmountInput });
    testFireNullKeyBoardEvent('onKeyDown', { keyCode: 49, Target: AmountInput });
    testFireNullKeyBoardEvent('onKeyPress', { keyCode: 49, Target: AmountInput });
    testFireNullKeyBoardEvent('onFocus', { keyCode: 49, Target: AmountInput });
    testFireNullKeyBoardEvent('onBlur', { keyCode: 49, Target: AmountInput });
  });

  it('props: onKeyUp', () => {
    testKeyBoardEvent(order, 'onKeyUp', { keyCode: 49, Target: AmountInput });
  });
  it('props: onKeyPress', () => {
    testKeyBoardEvent(order, 'onKeyPress', { keyCode: 49, Target: AmountInput });
  });
  it('props: onKeyDown', () => {
    testKeyBoardEvent(order, 'onKeyDown', { keyCode: 49, Target: AmountInput });
  });

  it('props: onFocus', () => {
    testKeyBoardEvent(order, 'onFocus', { keyCode: 49, Target: AmountInput });
  });
  it('props: onBlur', () => {
    testKeyBoardEvent(order, 'onBlur', { keyCode: 49, Target: AmountInput });
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

    const component = mount(<AmountInput {...props} />);
    component.find('input').simulate('keyDown', event);
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

    const component = mount(<AmountInput {...props} />);
    component.find('input').simulate('onKeyDown'.substr(2).toLowerCase(), event);
    order.verify(arg => {});
  });

  it('props: null  Fired Enter', () => {
    const keyCode = 13;
    const event = { keyCode };
    const component = mount(<AmountInput />);
    component.find('input').simulate('onKeyDown'.substr(2).toLowerCase(), event);
  });
  it('props: value', () => {
    const component = mount(<AmountInput value={firstValue} />);
    assertInputValue(component, displayFirstValue);
  });

  it('props: defaultValue & value', () => {
    const component = mount(<AmountInput defaultValue={defaultValue} value={firstValue} />);
    assertInputValue(component, displayFirstValue);
  });

  it('props: value onChange LimitAmountInput changed', () => {
    const component = mount(<LimitAmountInput value={firstValue} />);
    assertInputValue(component, displayFirstValue);
    component.find('input').simulate('change', { target: { value: changeValue } });
    assertInputValue(component, displayChangeValue);
  });

  it('props: value onChange LimitAmountInput no changed', () => {
    const component = mount(<LimitAmountInput value={firstValue} />);
    assertInputValue(component, displayFirstValue);
    component.setProps({ value: changeValue });
    assertInputValue(component, displayFirstValue);
  });
  it('props: value 壹仟贰佰叁拾肆元整 onChange LimitAmountInput changed', () => {
    const component = mount(<LimitAmountInput value={displayAmountDefaultValue} />);
    const getToolTip = () => component.children().find('lugia_widget_Tooltip');
    const getToolTipValue = () => {
      return getToolTip().props().title.props.children;
    };
    assertInputValue(component, displayAmountDefaultValue);
    expect(getToolTipValue()).toBe(activedValue);
    component
      .find('lugia_widget_AmountInput')
      .at(0)
      .simulate('focus');
    component
      .find('toolTip_title')
      .at(0)
      .simulate('click');
    assertInputValue(component, displayValue);
    expect(getToolTipValue()).toBe(displayAmountDefaultValue);
    component.find('input').simulate('change', { target: { value: changeValue } });
    assertInputValue(component, displayChangeValue);
    expect(getToolTipValue()).toBe(displayAmountChangeValue);
  });

  it('props: DefaultValueLimitAmountInput defaultValue', () => {
    class DefaultValueLimitAmountInput extends React.Component<any, any> {
      render() {
        return <AmountInput defaultValue={this.props.defaultValue} />;
      }
    }

    const component = mount(<DefaultValueLimitAmountInput defaultValue={defaultValue} />);
    assertInputValue(component, displayValue);
    component.find('input').simulate('change', { target: { value: changeValue } });
    assertInputValue(component, displayChangeValue);
  });
  testOnChange(
    'props: null keyPressValue : 1234  onChange ',
    {},
    ['1234567890', '0.000', '1.234', '9999999999999', '1234567890.123'],
    ['1,234,567,890', '0.000', '1.234', '9,999,999,999,999', '1,234,567,890.123'],
    ['1234567890', '0.000', '1.234', 9999999999999, 1234567890.123],
    [
      '壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾元整',
      '零元整',
      '壹元贰角叁分肆厘',
      '玖兆玖仟玖佰玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元整',
      '壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾元壹角贰分叁厘',
    ]
  );
  testOnChange(
    'props: disabled is true  onChange ',
    {
      disabled: true,
      value: '111',
    },
    ['1234', '5678'],
    ['111', '111'],
    [1234, 5678],
    [displayAmountFirstValue, displayAmountChangeValue]
  );

  function getInputComponent(target) {
    const component = target
      .children()
      .children()
      .instance();
    return component;
  }

  it('onTransform defaultValue: 1234', () => {
    const component = mount(<AmountInput defaultValue={defaultValue} />);
    const getToolTip = () => component.children().find('lugia_widget_Tooltip');
    const getToolTipValue = function() {
      return getToolTip().props().title.props.children;
    };
    component
      .find('lugia_widget_AmountInput')
      .at(0)
      .simulate('focus');
    expect(getToolTipValue()).toBe(displayAmountDefaultValue);
    component
      .find('toolTip_title')
      .at(0)
      .simulate('click');

    expect(getInputComponent(component).state.value).toBe(defaultValue + '');
    assertInputValue(component, displayAmountDefaultValue);
    expect(getToolTipValue()).toBe(activedValue);
    component
      .find('toolTip_title')
      .at(0)
      .simulate('click');
    expect(getInputComponent(component).state.value).toBe(defaultValue + '');
    assertInputValue(component, displayValue);
    expect(getToolTipValue()).toBe(displayAmountDefaultValue);
  });

  it('props.value 2 state.value', () => {
    const component = mount(<AmountInput defaultValue={defaultValue} />);
    component.setProps({ value: '壹佰元整' });
    expect(getInputComponent(component).state.value).toBe('100');

    const newValue = '100000';
    component.setProps({ value: newValue });
    expect(getInputComponent(component).state.value).toBe(newValue);
  });
});
