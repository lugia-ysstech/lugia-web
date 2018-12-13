/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import { isContained } from '../utils';

describe('Transfer.utils', () => {
  it('isContained', () => {
    expect(isContained(['1', '2', '3'], ['1', '2'])).toBeTruthy();
    expect(isContained(['1', '2', '3'], [])).toBeTruthy();
    expect(isContained(['1', '2', '3'], ['1', '2', '4'])).toBeFalsy();
    expect(isContained(['1'], ['1', '2'])).toBeFalsy();
  });
});
