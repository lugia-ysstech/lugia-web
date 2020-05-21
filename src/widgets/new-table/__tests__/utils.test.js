//flow
import 'jest-styled-components';
import { isValued, isEqualArray } from '../utils';

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
});
