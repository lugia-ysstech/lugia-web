//@flow
import 'jest-styled-components';
import { isValued, isEqualArray, isInArray, isObject, isEqualObject } from '../utils';

describe('new-table utils', () => {
  it(' isValued ', () => {
    expect(isValued(0)).toBeTruthy();
    expect(isValued(1)).toBeTruthy();
    expect(isValued(2)).toBeTruthy();
    expect(isValued(undefined)).toBeFalsy();
    expect(isValued(null)).toBeFalsy();
  });

  it(' isEqualArray ', () => {
    expect(isEqualArray([], [])).toBeTruthy();
    expect(isEqualArray([1, 2, 3], [1, 2, 3])).toBeTruthy();
    expect(
      isEqualArray(
        [{ a: 111, b: 222 }, { a: 123, b: 123 }],
        [{ a: 111, b: 222 }, { a: 123, b: 123 }]
      )
    ).toBeTruthy();
    expect(isEqualArray([], [1])).toBeFalsy();
    expect(isEqualArray([1, 2, 3], [1, 2])).toBeFalsy();
    expect(isEqualArray([1, 2, 3], [1, 2, 4])).toBeFalsy();
    expect(isEqualArray([{ a: 111, b: 222 }, { a: 123, b: 123 }], [])).toBeFalsy();
    expect(
      isEqualArray([{ a: 111, b: 222 }, { a: 123, b: 123 }], [{ a: 111, b: 222 }])
    ).toBeFalsy();
    expect(
      isEqualArray(
        [{ a: 111, b: 222 }, { a: 123, b: 123 }],
        [{ a: 111, b: 222 }, { a: 123, b: 124 }]
      )
    ).toBeFalsy();
    expect(isEqualArray([])).toBeFalsy();
    expect(isEqualArray(undefined, [1])).toBeFalsy();
    expect(isEqualArray(null, [1])).toBeFalsy();
  });

  it(' isInArray ', () => {
    expect(isInArray([{ a: 1, b: 2 }, { a: 1, b: 3 }], { a: 1, b: 2 })).toBeTruthy();
    expect(isInArray([{ a: 1, b: 2 }, { a: 1, b: 3 }], { b: 2, a: 1 })).toBeTruthy();
    expect(isInArray([{ a: 1, b: 2, c: 3 }, { a: 1, b: 3 }], { a: 1, b: 2 })).toBeFalsy();
    expect(isInArray(null, { a: 1, b: 2 })).toBeFalsy();
    expect(isInArray([{ a: 1, b: 2 }, { a: 1, b: 3 }], null)).toBeFalsy();
  });

  it(' isObject ', () => {
    expect(isObject({ a: 1, b: 2 })).toBeTruthy();
    expect(isObject([])).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject(undefined)).toBeFalsy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject('abc')).toBeFalsy();
  });

  it(' isEqualObject ', () => {
    expect(isEqualObject({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeTruthy();
    expect(isEqualObject({ a: 1, b: 2 }, { b: 2, a: 1 })).toBeTruthy();
    expect(isEqualObject({ a: 1, b: 2 }, { b: 2, a: 1, c: 3 })).toBeFalsy();
    expect(isEqualObject([], [])).toBeFalsy();
    expect(isEqualObject(null, null)).toBeFalsy();
    expect(isEqualObject(undefined, undefined)).toBeFalsy();
    expect(isEqualObject(1, 1)).toBeFalsy();
    expect(isEqualObject('abc', 'abc')).toBeFalsy();
  });
});
