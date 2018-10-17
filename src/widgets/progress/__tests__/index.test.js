/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import chai from 'chai';

import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../';
import { handlePercent } from '../../css/progress-line';
import Wrapper from '../demo';
import renderer from 'react-test-renderer';
import { delay } from '@lugia/react-test-utils';

const { expect: exp } = chai;

Enzyme.configure({ adapter: new Adapter() });

describe('Progress', () => {
  it('css', () => {
    const Target = <Wrapper />;
    expect(renderer.create(Target).toJSON()).toMatchSnapshot();
  });

  it('handlePercent', () => {
    expect(handlePercent(-1)).toBe(0);
    expect(handlePercent(0)).toBe(0);
    expect(handlePercent(1)).toBe(1);
    expect(handlePercent(100)).toBe(100);
    expect(handlePercent(101)).toBe(100);
  });
});
