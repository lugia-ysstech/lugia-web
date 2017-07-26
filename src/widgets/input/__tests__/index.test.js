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

    input.children[ 1 ].props.onFocus();
    input = component.toJSON();
    expect(input).toHaveStyleRule('box-shadow', /.*/);
    expect(input).toMatchSnapshot();
    input.children[ 1 ].props.onBlur();
    input = component.toJSON();
    expect(input).toHaveStyleRule('box-shadow', '');
    expect(input).toMatchSnapshot();
  });

  it('render state.focued no have fix', () => {
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

  it('exisit prefix', () => {
    const text = 'hello ligx';
    const prefix = <div className="prefix">{text}</div>;
    const component = mount(<Input prefix={prefix}/>);
    exp(component.find('.prefix').text()).to.be.equal(text);
  });

  it('exisit suffix', () => {
    const text = 'hello suffix';
    const suffix = <div className="suffix">{text}</div>;
    const component = mount(<Input suffix={suffix}/>);
    exp(component.find('.suffix').text()).to.be.equal(text);
  });

  it('exisit prefix&suffix', () => {
    const prefixTxt = 'hello ligx';
    const suffixTxt = 'hello kxy';
    const prefix = <div className="prefix">{prefixTxt}</div>;
    const suffix = <div className="suffix">{suffixTxt}</div>;

    const component = mount(<Input prefix={prefix} suffix={suffix}/>);
    exp(component.find('.prefix').text()).to.be.equal(prefixTxt);
    exp(component.find('.suffix').text()).to.be.equal(suffixTxt);
  });
});
