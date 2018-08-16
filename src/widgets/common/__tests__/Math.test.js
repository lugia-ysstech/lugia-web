//@flow
import { getMinAndMax, limit, limitToSet, valueInRange } from '../Math';

describe('Math', () => {
  it('getMinAndMax', () => {
    expect(getMinAndMax([-Infinity, 2, 3, 4, Infinity])).toEqual({ min: -Infinity, max: Infinity });
    expect(getMinAndMax([1, 2, 3, 4, 5])).toEqual({ min: 1, max: 5 });
    expect(getMinAndMax([5, 4, 3, 2, 1])).toEqual({ min: 1, max: 5 });
    expect(getMinAndMax([3, 5, 2, 1, 4])).toEqual({ min: 1, max: 5 });
    expect(getMinAndMax([0, 5, 2, 1, 4])).toEqual({ min: 0, max: 5 });
  });

  it('getMinAndMax expect', () => {
    expect(getMinAndMax([])).toEqual({ min: -Infinity, max: Infinity });
  });

  it('limit', () => {
    expect(limit(5, [1, 3])).toEqual(3);
    expect(limit(5, [5, 5])).toEqual(5);
  });

  it('limitToSet', () => {
    expect(limitToSet([1, 2, 3, 4, 5], [1, 3])).toEqual([1, 2, 3]);
  });

  it('limitToSet repeat', () => {
    expect(limitToSet([1, 1, 2, 3, 4, 5], [1, 5])).toEqual([1, 2, 3, 4, 5]);
  });
  it('limitToSet index<0', () => {
    expect(limitToSet([1, 1, 2, 3, 4, 5], [1, 6])).toEqual([1, 2, 3, 4, 5]);
  });
  it('valueInRange in', () => {
    expect(valueInRange(3, [1, 5])).toBe(true);
  });
  it('valueInRange out', () => {
    expect(valueInRange(6, [1, 5])).toBe(false);
  });
  it('valueInRange equal', () => {
    expect(valueInRange(1, [1, 5])).toBe(true);
  });
  it('valueInRange', () => {
    expect(valueInRange(1, [5, 1])).toBe(true);
  });
});
