/**
 *
 * create by ligx
 *
 */
import React from 'react';

import 'jest-styled-components';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Carousel, { getInitStart } from '../carousel';
import { delay } from '@lugia/react-test-utils';

Enzyme.configure({ adapter: new Adapter() });

describe('Carousel', () => {
  it('getInitStart ', () => {
    const children = ['知行合一', '拙能胜巧', '有求皆苦', '无欲则刚'];
    expect(getInitStart({}, 0)).toBe(0);
    expect(getInitStart({ children }, '1')).toBe(1);
    expect(getInitStart({ children }, null)).toBe(0);
    expect(getInitStart({ children }, '')).toBe(0);
    expect(getInitStart({ children }, [])).toBe(0);
    expect(getInitStart({ children }, undefined)).toBe(0);
    expect(getInitStart({ children }, {})).toBe(0);
  });

  it('getAnimationTime ', () => {
    expect(Carousel.prototype.getAnimationTime({ animationTime: '1000' })).toBe(1000);
    expect(Carousel.prototype.getAnimationTime({ animationTime: null })).toBe(500);
    expect(Carousel.prototype.getAnimationTime({ animationTime: '' })).toBe(500);
    expect(Carousel.prototype.getAnimationTime({ animationTime: {} })).toBe(500);
    expect(Carousel.prototype.getAnimationTime({ animationTime: [] })).toBe(500);
  });
});
