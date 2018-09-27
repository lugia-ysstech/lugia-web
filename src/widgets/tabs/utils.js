/**
 *
 * create by liangguodong on 2018/9/26
 *
 * @flow
 */
import { matchTabPosition } from '../css/tabs';
import type { TabPositionType } from '../css/tabs';

export function isVertical(tabPosition: TabPositionType) {
  return matchTabPosition(tabPosition, 'left') || matchTabPosition(tabPosition, 'right');
}
export function plusWidth(index: number, width: Array<number>): number {
  let sum = 0;
  for (let i = 0; i <= index; i++) {
    sum += width[i];
  }
  return sum;
}
