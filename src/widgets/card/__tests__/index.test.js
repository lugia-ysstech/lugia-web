/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';

import 'jest-styled-components';
import Wrapper from '../demo';
import renderer from 'react-test-renderer';

describe('Card', () => {
  it('css', () => {
    const Target = <Wrapper />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
});
