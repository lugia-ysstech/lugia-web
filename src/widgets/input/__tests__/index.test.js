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

class LimitInputBox extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: Object, preState: Object) {
    if (!preState) {
      return { value: nextProps.value };
    }
    return {};
  }

  onChange = value => {
    this.setState({ value });
  };

  render() {
    return <Input value={this.state.value} onChange={this.onChange} />;
  }
}

describe('Input', () => {
  let order;
  let mockFunc;
  let onChange;
  beforeEach(() => {
    order = VerifyOrder.create();
    mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
    onChange = mockFunc.getFunction();
  });

  function testOnChange(
    title: string,
    props: Object,
    keyPressValue: Array<any>,
    stateValue: Array<any>,
    changeEventValue: Array<any>
  ) {
    it(`props: onchange ${title} `, () => {
      const order = VerifyOrder.create();
      mockFunc = mockFunction.create(VerifyOrderConfig.create('onChange', order));
      const onChange = mockFunc.getFunction();

      const component = mount(<Input {...props} onChange={onChange} />);
      keyPressValue &&
        keyPressValue.forEach((value: any, index: number) => {
          component.find('input').simulate('change', { target: { value } });
          assertInputValue(component, stateValue[index]);
        });

      order.verify(({ onChange }) => {
        changeEventValue &&
          changeEventValue.forEach((v, i) => {
            const { value } = props;
            onChange(v, stateValue[i - 1] ? stateValue[i - 1] : value ? value : '');
          });
      });
    });
  }

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

  function placeholderTest(placeholder) {
    it('props: placeholder ', () => {
      const component = mount(<Input placeholder={placeholder} />);
      expect(renderer.create(component).toJSON()).toMatchSnapshot();
      exp(component.props().placeholder).to.be.equal(placeholder);
    });
  }

  placeholderTest('请填写内容');
  placeholderTest('');

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

    const component = mount(<LimitInputBox value={value} />);
    assertInputValue(component, value);
    component.find('input').simulate('change', { target: { value: changeValue } });
    assertInputValue(component, changeValue);
  });
  it('props: value onChange Limited Input no changed', () => {
    const value = '诸行无常';
    const changeValue = 'hello ligx';

    const component = mount(<LimitInputBox value={value} />);
    assertInputValue(component, value);
    component.setProps({ value: changeValue });
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

    const component = mount(<LimitInputBox value={value} prefix={<div>hello</div>} />);
    assertInputValue(component, value);
    component.find('input').simulate('change', { target: { value: changeValue } });
    assertInputValue(component, changeValue);
  });

  it('props: value onChange Limited Input no changed  for prefix: Icon', () => {
    const value = '诸行无常';
    const changeValue = 'hello ligx';

    const component = mount(<LimitInputBox value={value} prefix={<div>hello</div>} />);

    assertInputValue(component, value);
    component.setProps({ value: changeValue });
    assertInputValue(component, value);
  });

  const parser = value => {
    return value.replace(/\$\s?|(,*)/g, '');
  };
  const formatter = value => {
    return `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const noop = value => {
    return value;
  };
  testOnChange(
    'props: disabled is true  onChange ',
    {
      disabled: true,
      value: 'a',
    },
    ['b', 'b'],
    ['a', 'a'],
    ['b', 'b']
  );

  testOnChange('twice ["", a]', {}, ['', 'a'], ['', 'a'], ['', 'a']);
  testOnChange('twice ["a", "b"] ', {}, ['a', 'b'], ['a', 'b'], ['a', 'b']);

  testOnChange(
    'props: onchange formatter&&parser both is null ',
    { formatter: noop, parser: noop },
    ['1234567'],
    ['1234567'],
    ['1234567']
  );
  testOnChange(
    'props: onchange parser:null ',
    { formatter, parser: noop },
    ['1234567'],
    ['$1,234,567'],
    ['1234567']
  );
  testOnChange(
    'props: onchange formatter:null ',
    { formatter: noop, parser },
    ['1234567'],
    ['1234567'],
    ['1234567']
  );
  testOnChange(
    'props: onchange formatter&&parser ',
    { formatter, parser },
    ['1234567'],
    ['$1,234,567'],
    ['1234567']
  );

  it('function: generateInput', () => {
    const InputMock = mockObject.create(
      TextBoxInner.prototype,
      VerifyOrderConfig.create('Input', order)
    );
    InputMock.mockFunction('generateInput').returned(<InputOnly />);
    mount(<Input />);
    order.verify(({ Input }) => {
      Input.generateInput(InputElement);
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
});
