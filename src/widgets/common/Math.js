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
  const rangeVal = range.sort(sortable);
  const min = rangeVal[0],
    max = rangeVal[1];
  let NewVal = [];
  //去重
  for (const i in val) {
    if (NewVal.indexOf(val[i]) < 0) {
      NewVal.push(val[i]);
    }
  }
  //排序
  NewVal.sort(sortable);
  //删除不在范围内的值
  const minIndex = NewVal.indexOf(min);
  const maxIndex = NewVal.indexOf(max);
  if (minIndex > -1 && maxIndex > -1) {
    NewVal = NewVal.slice(minIndex, maxIndex + 1);
  }
  //返回区间内的值;
  return NewVal;
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
