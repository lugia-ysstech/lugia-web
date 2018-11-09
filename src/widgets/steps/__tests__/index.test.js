/**
 *
 * create by lianggd
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Wrapper from '../demo';
import 'jest-styled-components';

describe('stepsDemo', () => {
  it('Component JSON', () => {
    const renders = renderer.create(<Wrapper />);
    expect(renders.toJSON()).toMatchSnapshot();
  });
});
