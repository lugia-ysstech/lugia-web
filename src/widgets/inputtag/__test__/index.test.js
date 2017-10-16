//@flow
import React from 'react';
import InputTag from '../';
import chai from 'chai';
import 'jest-styled-components';
import Enzyme, { mount, } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Theme from '../../theme';
import * as Widget from '../../consts/Widget';

Enzyme.configure({ adapter: new Adapter(), });

const { expect: exp, } = chai;

describe('InputTag', () => {
  it('InputTag items: 3 item,  can see  3', () => {
    expect(renderer.create(<Theme config={{ [Widget.InputTag]: { width: 200, }, }} key="1">
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={{ a: { text: 'a', }, b: { text: 'b', }, c: { text: 'c', }, }}/>
    </Theme>).toJSON()).toMatchSnapshot();

  });
  it('InputTag items: 3 item,  can see  1', () => {
    expect(renderer.create(<Theme config={{ [Widget.InputTag]: { width: 200, }, }}>
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={{ a: { text: '12345678901234', }, b: { text: 'b', }, c: { text: 'c', }, }}/>

    </Theme>).toJSON()).toMatchSnapshot();

  });
  it('InputTag items: 3 item,  can see  1 more item', () => {
    expect(renderer.create(<Theme config={{ [Widget.InputTag]: { width: 200, }, }}>
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={{ a: { text: 'abcdeddfasdddfadasf', }, b: { text: 'b', }, c: { text: 'c', }, }}/>
    </Theme>).toJSON()).toMatchSnapshot();

  });
  it('InputTag items: 1 item,  can see  1', () => {
    expect(renderer.create(<Theme config={{ [Widget.InputTag]: { width: 200, }, }}>
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={{ a: { text: 'abcdeddfasdddfadasf', }, b: { text: 'b', }, c: { text: 'c', }, }}/>

    </Theme>).toJSON()).toMatchSnapshot();

  });
  it('InputTag items: 1 item,  can see  0', () => {
    expect(renderer.create(<Theme config={{ [Widget.InputTag]: { width: 200, }, }}>
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={{ a: { text: '123456789012345676890780dfasfasfa', }, }}/>
    </Theme>).toJSON()).toMatchSnapshot();

  });
  it('InputTag items: 3 item,  can see  0', () => {
    expect(renderer.create(<Theme config={{ [Widget.InputTag]: { width: 200, }, }}>
      <InputTag prefix={<i>11</i>} suffix={<i>12</i>}
                value={{ a: { text: '123456789012345676890780', }, b: { text: 'b', }, c: { text: 'c', }, }}/>
    </Theme>).toJSON()).toMatchSnapshot();

  });


});
