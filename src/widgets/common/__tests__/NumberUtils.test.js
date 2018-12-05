// flow
import { toNumber } from '../NumberUtils';

describe('Math', () => {
  it('toNumber', () => {
    expect(toNumber(0, undefined)).toEqual(0);
    expect(toNumber(1, undefined)).toEqual(1);
    expect(toNumber('1', 0)).toEqual(1);
    expect(toNumber([1], 0)).toEqual(1);
    expect(toNumber(undefined, 5)).toEqual(5);
    expect(toNumber(null, 5)).toEqual(5);
    expect(toNumber('', 5)).toEqual(5);
    expect(toNumber({}, 5)).toEqual(5);
    expect(toNumber([], 5)).toEqual(5);
  });
});
