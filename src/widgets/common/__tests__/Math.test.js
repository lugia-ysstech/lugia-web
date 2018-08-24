//@flow
import { getMinAndMax, limit, limitToSet, valueInRange, accAdd, checkNumber } from '../Math';

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

  function testAccAdd(value: number, step: number, precision: number, expectValue: number) {
    it(` accAdd value+step ${value + step} precision ${precision} `, () => {
      expect(accAdd(value, step, precision)).toBe(expectValue);
    });
  }

  testAccAdd(5, 5, 0, 10);
  testAccAdd(0.5, 0.5, 1, 1.0);
  testAccAdd(5, 0.05, 2, 5.05);
  testAccAdd(0.95, -0.001, 5, 0.949);
  testAccAdd(0.949, -0.001, 5, 0.948);
  testAccAdd(0.948, -0.001, 5, 0.947);

  function testCheckNumber(value: string, expectValue: string) {
    it(`checkNumber value ${value} `, () => {
      expect(checkNumber(value)).toBe(expectValue);
    });
  }

  testCheckNumber('-.5', '-.5');
  testCheckNumber('-1', '-1');
  testCheckNumber('0', '0');
  testCheckNumber('5', '5');
  testCheckNumber('.5', '.5');
  testCheckNumber('1.5', '1.5');
  testCheckNumber('123456.111', '123456.111');
  testCheckNumber('qwqeqwe', '');
  testCheckNumber(',.`1234!@$`', '.1234');
  testCheckNumber('12345.qwer!@#$', '12345.');
});
