/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';

import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { CardDemo } from '../demo';

describe('Card', () => {
  it('css', () => {
    const Target = <CardDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
});
