/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BackTopDemo from '../demo';
import BackTop from '../back-top';
import renderer from 'react-test-renderer';
const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('BackTop', () => {
  it('css', () => {
    const Target = <BackTopDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
  it('BackTop needFixed ', () => {
    const target = mount(<BackTop />);
    const backTopElement = target
      .children()
      .at(0)
      .instance();

    expect(backTopElement.needFixed(100, 50)).toBe(true);
    expect(backTopElement.needFixed(50, 100)).toBe(false);
  });
});
