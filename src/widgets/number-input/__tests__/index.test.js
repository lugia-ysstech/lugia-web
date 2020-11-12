/**
 *
 * create by liangguodong on 2018/8/14
 *
 * @flow
 */
import React from 'react';
import NumberInput from '../';
import Theme from '../../theme';
import renderer from 'react-test-renderer';
import chai from 'chai';
import 'jest-styled-components';
import { maxSafeNumber, minSafeNumber } from '../index';

import {
  assertInputValue,
  testFireNullKeyBoardEvent,
  testKeyBoardEvent,
} from '../../input/__tests__/InputTestUtils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Widget from '../../consts';
import type { ClickType } from '../../css/number-input';

Enzyme.configure({ adapter: new Adapter() });

const { expect: exp } = chai;
const { mockFunction, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

class LimitNumberInputBox extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: Object, preState: Object) {
    if (!preState) {
      return { value: nextProps.value };
    }
    return {};
  }

  onChange = ({ newValue: value }: any) => {
    this.setState({ value });
  };

  render() {
    return <NumberInput value={this.state.value} onChange={this.onChange} />;
  }
}

describe('NumberInput', () => {
  let order;
  let mockFunc;
  let onChange;
  beforeEach(() => {
    order = VerifyOrder.create();
    mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
    onChange = mockFunc.getFunction();
  });

  const defaultValue = 10;
  const firstValue = 20;
  const changeValue = 30;

  it('props: null', () => {
    expect(renderer.create(<NumberInput />).toJSON()).toMatchSnapshot();
  });

  function sizeTest(size) {
    it('props: size', () => {
      expect(renderer.create(<NumberInput size={size} />).toJSON()).toMatchSnapshot();
    });
  }

  sizeTest('small');
  sizeTest('large');

  function placeholderTest(placeholder) {
    it('props: placeholder ', () => {
      const jsx = <NumberInput placeholder={placeholder} />;
      const component = mount(jsx);
      expect(renderer.create(jsx).toJSON()).toMatchSnapshot();
      exp(component.props().placeholder).to.be.equal(placeholder);
    });
  }

  placeholderTest('请填写内容');
  placeholderTest('');

  it('props: getTheme: width:100,margin:10,', () => {
    const view = {
      [Widget.NumberInput]: {
        width: 300,
      },
    };
    const jsx = (
      <Theme config={view}>
        <NumberInput />
      </Theme>
    );
    expect(renderer.create(jsx)).toMatchSnapshot();
  });

  it('props: keyboard event is null but fire keyup event', () => {
    testFireNullKeyBoardEvent('onKeyUp', { keyCode: 49, Target: NumberInput });
    testFireNullKeyBoardEvent('onKeyDown', { keyCode: 49, Target: NumberInput });
    testFireNullKeyBoardEvent('onKeyPress', { keyCode: 49, Target: NumberInput });
    testFireNullKeyBoardEvent('onFocus', { keyCode: 49, Target: NumberInput });
    testFireNullKeyBoardEvent('onBlur', { keyCode: 49, Target: NumberInput });
  });

  it('props: onKeyUp', () => {
    testKeyBoardEvent(order, 'onKeyUp', { keyCode: 49, Target: NumberInput });
  });
  it('props: onKeyPress', () => {
    testKeyBoardEvent(order, 'onKeyPress', { keyCode: 49, Target: NumberInput });
  });
  it('props: onKeyDown', () => {
    testKeyBoardEvent(order, 'onKeyDown', { keyCode: 49, Target: NumberInput });
  });

  it('props: onFocus', () => {
    testKeyBoardEvent(order, 'onFocus', { keyCode: 49, Target: NumberInput });
  });
  it('props: onBlur', () => {
    testKeyBoardEvent(order, 'onBlur', { keyCode: 49, Target: NumberInput });
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

    const component = mount(<NumberInput {...props} />);
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

    const component = mount(<NumberInput {...props} />);
    component.find('input').simulate('keyDown', event);
    order.verify(arg => {});
  });

  it('props: null  Fired Enter', () => {
    const keyCode = 13;
    const event = { keyCode };
    const component = mount(<NumberInput />);
    component.find('input').simulate('keyDown', event);
  });

  it('props: value changed Limited NumberInput no changed', () => {
    const component = mount(<LimitNumberInputBox value={firstValue} />);
    assertInputValue(component, firstValue + '');
    component.setProps({ value: changeValue });
    assertInputValue(component, firstValue + '');
  });
  it('props: defaultValue', () => {
    class LimitNumberInput extends React.Component<any, any> {
      render() {
        return <NumberInput defaultValue={this.props.defaultValue} />;
      }
    }

    const component = mount(<LimitNumberInput defaultValue={defaultValue} />);
    assertInputValue(component, defaultValue + '');
    component.find('input').simulate('change', { target: { value: changeValue } });
    assertInputValue(component, changeValue + '');
  });
  it('props: defaultValue & value', () => {
    const component = mount(<NumberInput defaultValue={defaultValue} value={firstValue} />);
    assertInputValue(component, firstValue + '');
  });

  function getInputComponent(target) {
    const component = target
      .children()
      .children()
      .instance();
    return component;
  }

  function clickStepButton(component, button: string) {
    component.find(button).simulate('click');
  }

  function testClickButton(config: {
    title: string,
    clickPlusCount: number,
    clickMinusCount: number,
    defaultValue: number,
    step: number,
    expectValue: number,
  }) {
    it(`${config.title}`, () => {
      const component = mount(
        <NumberInput defaultValue={config.defaultValue} step={config.step} />
      );
      mutipleClickButton(component, 'Minus', config.clickMinusCount);
      mutipleClickButton(component, 'Plus', config.clickPlusCount);
      expect(getInputComponent(component).state.value).toBe(config.expectValue);
    });
  }

  testClickButton({
    title: 'clickPlusCount 1 clickMinusCount 0',
    clickPlusCount: 1,
    clickMinusCount: 0,
    defaultValue: 10,
    step: 5,
    expectValue: 15,
  });

  testClickButton({
    title: 'clickPlusCount 0 clickMinusCount 1',
    clickPlusCount: 0,
    clickMinusCount: 1,
    defaultValue: 10,
    step: 5,
    expectValue: 5,
  });
  testClickButton({
    title: 'clickPlusCount 1 clickMinusCount 1',
    clickPlusCount: 1,
    clickMinusCount: 1,
    defaultValue: 10,
    step: 5,
    expectValue: 10,
  });
  testClickButton({
    title: 'clickPlusCount 3 clickMinusCount 2',
    clickPlusCount: 3,
    clickMinusCount: 2,
    defaultValue: 10,
    step: 5,
    expectValue: 15,
  });
  testClickButton({
    title: 'clickPlusCount 10 clickMinusCount 0',
    clickPlusCount: 10,
    clickMinusCount: 0,
    defaultValue: 10,
    step: 5,
    expectValue: 60,
  });
  testClickButton({
    title: 'clickPlusCount 0 clickMinusCount 10',
    clickPlusCount: 0,
    clickMinusCount: 10,
    defaultValue: 10,
    step: 5,
    expectValue: -40,
  });
  testClickButton({
    title: 'clickPlusCount 5 clickMinusCount 5',
    clickPlusCount: 5,
    clickMinusCount: 5,
    defaultValue: 10,
    step: 5,
    expectValue: 10,
  });

  function mutipleClickButton(component, button: string, count: number) {
    for (let i = 0; i < count; i++) {
      clickStepButton(component, button);
    }
  }

  function testMaxAndMin(config: {
    props: {
      max: number,
      min: number,
      defaultValue: number,
      step: number,
    },
    title: string,
    clickPlusCount: number,
    clickMinusCount: number,
    expectValue: number,
  }) {
    it(` ${config.title} max ${config.props.max}, min ${config.props.min}, defaultValue ${config.props.defaultValue}, clickPlus ${config.clickPlusCount}, clickMinus ${config.clickMinusCount} `, () => {
      const component = mount(<NumberInput {...config.props} />);
      mutipleClickButton(component, 'Plus', config.clickPlusCount);
      mutipleClickButton(component, 'Minus', config.clickMinusCount);
      expect(getInputComponent(component).state.value).toBe(config.expectValue);
    });
  }

  testMaxAndMin({
    props: {
      defaultValue: 1,
      step: 5,
      max: 10,
      min: 0,
    },
    title: 'test max only click plus',
    clickPlusCount: 2,
    clickMinusCount: 0,
    expectValue: 10,
  });
  testMaxAndMin({
    props: {
      defaultValue: 10,
      step: 1,
      max: 10,
      min: 0,
    },
    title: 'test max click  plus>minus',
    clickPlusCount: 2,
    clickMinusCount: 1,
    expectValue: 9,
  });
  testMaxAndMin({
    props: {
      defaultValue: 10,
      step: 5,
      max: 10,
      min: 0,
    },
    title: 'test max click click plus>minus',
    clickPlusCount: 5,
    clickMinusCount: 1,
    expectValue: 5,
  });
  testMaxAndMin({
    props: {
      defaultValue: 10,
      step: 2,
      min: 1,
      max: 100,
    },
    title: 'test min only click plus',
    clickPlusCount: 0,
    clickMinusCount: 5,
    expectValue: 1,
  });
  testMaxAndMin({
    props: {
      defaultValue: 10,
      step: 5,
      min: 1,
      max: 100,
    },
    title: 'test min  click minus>plus',
    clickPlusCount: 2,
    clickMinusCount: 5,
    expectValue: 1,
  });
  testMaxAndMin({
    props: {
      defaultValue: 10,
      step: 5,
      min: 0,
      max: 100,
    },
    title: 'test min  click plus<minus',
    clickPlusCount: 2,
    clickMinusCount: 6,
    expectValue: 0,
  });

  function testDisabled(
    click: ClickType,
    disabled: boolean,
    clickPlusCount: number,
    clickMinusCount: number,
    expectValue: number
  ) {
    it(`props :disabled  click ${click}`, () => {
      const component = mount(<NumberInput disabled={disabled} defaultValue="10" step={5} />);
      mutipleClickButton(component, 'Plus', clickPlusCount);
      mutipleClickButton(component, 'Minus', clickMinusCount);
      expect(getInputComponent(component).state.value).toBe(expectValue);
    });
  }
  //disabled 直接抛出onchange.newValue
  testDisabled('plus', true, 10, 0, 10);
  testDisabled('minus', true, 0, 10, 10);
  testDisabled('plus', false, 10, 0, 60);
  testDisabled('minus', false, 0, 10, -40);

  function testStep(
    step: number,
    clickPlusCount: number,
    clickMinusCount: number,
    expectValue: number
  ) {
    it(` prop :step ${step}  `, () => {
      const component = mount(<NumberInput step={step} defaultValue={10} />);
      mutipleClickButton(component, 'Plus', clickPlusCount);
      mutipleClickButton(component, 'Minus', clickMinusCount);
      expect(getInputComponent(component).state.value).toBe(expectValue);
    });
  }

  testStep(3, 10, 0, 40);
  testStep(5, 10, 5, 35);
  testStep(0, 10, 20, 10);
  testStep(-1, 10, 20, 20);

  function testFormatterAndParser(
    props: {
      formatter: Function,
      parser: Function,
      defaultValue: number,
      step: number,
      max: number,
      min: number,
    },
    clickPlusCount: number,
    clickMinusCount: number,
    expectValue: number,
    expectFormatterValue: string
  ) {
    it('props :formatter&&parser', () => {
      const component = mount(<NumberInput {...props} />);
      mutipleClickButton(component, 'Plus', clickPlusCount);
      mutipleClickButton(component, 'Minus', clickMinusCount);
      expect(getInputComponent(component).state.value).toBe(expectValue);
      assertInputValue(component, expectFormatterValue);
    });
  }

  const parser = value => {
    return value.replace(/\$\s?|(,*)/g, '');
  };
  const formatter = value => {
    return `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  testFormatterAndParser(
    {
      formatter,
      parser,
      defaultValue: 10000,
      step: 50000,
      max: 1000000,
      min: 10000,
    },
    5,
    2,
    160000,
    '$160,000'
  );
  testFormatterAndParser(
    {
      formatter: value => `${value}%`,
      parser: value => value.replace('%', ''),
      defaultValue: 10,
      step: 5,
      max: 100,
      min: 10,
    },
    5,
    2,
    25,
    '25%'
  );

  function testPrecision(
    props: {
      precision: number,
      defaultValue: number,
      step: number,
      max: number,
      min: number,
    },
    clickPlusCount: number,
    clickMinusCount: number,
    expectValue: number
  ) {
    it(`props :precision ${props.precision}`, () => {
      const component = mount(<NumberInput {...props} />);
      mutipleClickButton(component, 'Plus', clickPlusCount);
      mutipleClickButton(component, 'Minus', clickMinusCount);
      expect(getInputComponent(component).state.value).toBe(expectValue);
    });
  }

  testPrecision(
    {
      precision: 0,
      defaultValue: 10,
      step: 5,
      max: 100,
      min: 10,
    },
    5,
    2,
    25
  );
  testPrecision(
    {
      precision: 2,
      defaultValue: 1.5,
      step: 0.5,
      max: 10,
      min: 1,
    },
    4,
    2,
    2.5
  );
  testPrecision(
    {
      precision: 3,
      defaultValue: 1.05,
      step: 0.05,
      max: 10,
      min: 1,
    },
    4,
    2,
    1.15
  );
  testPrecision(
    {
      precision: 4,
      defaultValue: 1.05,
      step: 0.005,
      max: 10,
      min: 1,
    },
    5,
    2,
    1.065
  );

  function testOnChange(
    config: {
      title: string,
      keyPressValue: number,
      stateValue: number,
      changeEventValue: number,
    },
    props: Object
  ) {
    it(`props: onchange ${config.title} `, () => {
      order = VerifyOrder.create();
      mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
      onChange = mockFunc.getFunction();

      const component = mount(<NumberInput {...props} onChange={onChange} />);
      component.find('input').simulate('change', { target: { value: config.keyPressValue } });
      expect(Number(getInputComponent(component).state.value)).toBe(config.stateValue);

      order.verify(({ onChange }) => {
        const { value, defaultValue } = props;
        onChange({
          newValue: config.changeEventValue,
          oldValue: 'value' in props ? value : defaultValue,
          event: VerifyOrder.Any,
        });
      });
    });
  }

  testOnChange(
    {
      title: 'props: onchange change value  ',
      keyPressValue: 20,
      stateValue: 20,
      changeEventValue: 20,
    },
    { step: 5, max: 100, defaultValue: 10, min: 10 }
  );
  testOnChange(
    {
      title: 'props: onchange change value 30  ',
      keyPressValue: 30,
      stateValue: 30,
      changeEventValue: 30,
    },
    { step: 5, max: 100, defaultValue: 10, min: 10 }
  );
  testOnChange(
    {
      title: 'props: onchange change value 50  ',
      keyPressValue: 50,
      stateValue: 50,
      changeEventValue: 50,
    },
    { step: 5, max: 100, defaultValue: 10, min: 10 }
  );
  it('props : value "."', () => {
    const component = mount(<NumberInput />);
    const inputComponent = getInputComponent(component);
    inputComponent.value = '.';
    expect(inputComponent.state.value).toBe('');
  });
  it(' onblur && max && below max number ', () => {
    const component = mount(<NumberInput max={500} onBlur={() => {}} />);
    const inputComponent = getInputComponent(component);
    component.find('input').simulate('change', { target: { value: 555 } });
    component.find('input').simulate('blur');
    expect(inputComponent.state.value).toBe(500);
  });
  const maxLengthNumber = 1234567890123456;
  it(' onblur && maxLengthNumber ', () => {
    const component = mount(<NumberInput onBlur={() => {}} />);
    const inputComponent = getInputComponent(component);
    component.find('input').simulate('change', { target: { value: maxLengthNumber } });
    component.find('input').simulate('blur');
    expect(inputComponent.state.value).toBe(maxLengthNumber);
  });
  const overMaxLengthNumber = 12345678901234567;
  it(' onblur && over maxLengthNumber ', () => {
    const component = mount(<NumberInput onBlur={() => {}} />);
    const inputComponent = getInputComponent(component);
    component.find('input').simulate('change', { target: { value: overMaxLengthNumber } });
    component.find('input').simulate('blur');
    expect(inputComponent.state.value).toBe(maxSafeNumber);
  });

  it(' onblur && below minLengthNumber ', () => {
    const component = mount(<NumberInput onBlur={() => {}} />);
    const inputComponent = getInputComponent(component);
    component.find('input').simulate('change', { target: { value: -overMaxLengthNumber } });
    component.find('input').simulate('blur');
    expect(inputComponent.state.value).toBe(minSafeNumber);
  });
  it(' onblur && min -100 ', () => {
    const component = mount(<NumberInput onBlur={() => {}} min={-100} />);
    const inputComponent = getInputComponent(component);
    component.find('input').simulate('change', { target: { value: -200 } });
    component.find('input').simulate('blur');
    expect(inputComponent.state.value).toBe(-100);
  });
  it(' onblur && min below minLengthNumber ', () => {
    const component = mount(<NumberInput onBlur={() => {}} />);
    const inputComponent = getInputComponent(component);
    component.find('input').simulate('change', { target: { value: -maxLengthNumber } });
    component.find('input').simulate('blur');
    expect(inputComponent.state.value).toBe(-maxLengthNumber);
  });
});
