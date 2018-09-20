/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';
import renderer from 'react-test-renderer';
import Wrapper from '../demo';
import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const { mockFunction, VerifyOrder, VerifyOrderConfig } = require('@lugia/jverify');

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('tabsDemo', () => {
  it('Component JSON', () => {
    const renders = renderer.create(<Wrapper />);
    expect(renders.toJSON()).toMatchSnapshot();
  });
});
