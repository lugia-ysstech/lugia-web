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

export function limitToSet(val: number[], range: number[]): number[] {
  return [];
}

export function getMinAndMax(range: number[]): { min: number, max: number } {
  let min = range[0],
    max = range[0];

  function check(val: number, negative: boolean = false) {
    return val !== undefined ? val : negative ? -Infinity : Infinity;
  }

  range &&
    range.forEach(item => {
      min = Math.min(item, min);
      max = Math.max(item, max);
    });

  return { min: check(min, true), max: check(max) };
}

export function sortable(a: number, b: number): number {
  return a - b;
}
