/**
 *
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import { px2rem, rem2em, px2emcss,} from '../units';


describe('Button', () => {
  beforeEach(() => {
  });


  it('px2rem', () => {
    expect(px2rem(5)).toBe(0.5);
    expect(px2rem(1)).toBe(0.1);
  });
  it('rem2em', () => {
    expect(rem2em(5, 1)).toBe(5);
    expect(rem2em(2, 0.5)).toBe(4);
    expect(rem2em(2, 2)).toBe(1);
  });
  it('px2em', () => {
    expect(px2emcss(1)(100)).toBe('10em');
  });
});
