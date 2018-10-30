/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import AlertDemo from '../demo';

describe('Alert', () => {
  it('css', () => {
    const Target = <AlertDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
});
