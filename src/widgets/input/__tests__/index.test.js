//@flow
import React from 'react';
import Input from '../';
import renderer from 'react-test-renderer';
import { mount, } from 'enzyme';
import chai from 'chai';
import 'jest-styled-components';


const { expect: exp, } = chai;

describe('Input', () => {

  beforeEach(() => {
  });

  it('render normal', () => {
    expect(renderer.create(<Input/>).toJSON()).toMatchSnapshot();
  });

  it('render state.focued has prefix', () => {
    const prefix = <div></div>;
    const component = renderer.create(<Input prefix={prefix}/>);
    let input = component.toJSON();

    input.children[ 0 ].props.onFocus();
    input = component.toJSON();
    expect(input).toHaveStyleRule('box-shadow', /.*/);
    expect(input).toMatchSnapshot();
    input.children[ 0 ].props.onBlur();
    input = component.toJSON();
    expect(input).toHaveStyleRule('box-shadow', '');
    expect(input).toMatchSnapshot();
  });

  it('render state.focued has fix', () => {
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

  it('render input event', () => {
    const input = mount(<Input/>);
    input.find('input').simulate('focus');
    exp(input.state('focused')).to.be.true;
    input.find('input').simulate('blur');
    exp(input.state('focused')).to.be.false;
  });

  it('clear', () => {

    // const mockOnChange = mockFunction.create(VerifyOrderConfig.create('onChange', order));
    //
    // const input = mount(<Input onChange={mockOnChange.getFunction()}/>);
    //
    // const txt = 'hello';
    // input.find('.svInputInput').simulate('change', { target: { value: txt, }, });
    // input.find('.clear').simulate('click');
    //
    // order.verify(({ onChange, }) => {
    //   onChange(txt);
    //   onChange('');
    // });
  });
});
