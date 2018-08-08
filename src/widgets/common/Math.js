/**
 *
 * create by ligx
 *
 * @flow
 */

export function limit(val: number, range: number[]) {
  const { min, max } = getMinAndMax(range);
  return Math.min(max, Math.max(val, min));
}

export function getMinAndMax(range: number[]): { min: number, max: number } {
  range.sort(sortable);

  function check(val: number, negative: boolean = false) {
    return val !== undefined ? val : negative ? -Infinity : Infinity;
  }

  return { min: check(range[0], true), max: check(range[range.length - 1]) };
}

export function sortable(a: number, b: number): number {
  return a - b;
}
