/**
 *
 * create by lianggd
 *
 *
 */
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { SimpleDemo } from '../demo';

describe('timeLineDemo', () => {
  it('Component JSON', () => {
    const Target = <SimpleDemo />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });
});
