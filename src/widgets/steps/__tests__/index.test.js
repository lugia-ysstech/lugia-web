/**
 *
 * create by lianggd
 *
 * @flow
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Wrapper from '../demo';
import { _Step } from '../step';
import 'jest-styled-components';

describe('stepsDemo', () => {
  it('Component JSON', () => {
    const renders = renderer.create(<Wrapper />);
    expect(renders.toJSON()).toMatchSnapshot();
  });
  it('getIcon', () => {
    expect(_Step.prototype.getIcon()).toBe('');
    expect(_Step.prototype.getIcon('finish')).toBe('');
  });
  it('getStepValue', () => {
    expect(_Step.prototype.getStepValue(50, '')).toBe('');
    expect(_Step.prototype.getStepValue(500, 'finish')).toBe('');
  });
});
