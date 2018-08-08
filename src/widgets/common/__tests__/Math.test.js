//@flow
import { getMinAndMax, limit } from '../Math';

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
  });
});
