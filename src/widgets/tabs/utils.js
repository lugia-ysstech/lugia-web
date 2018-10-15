/**
 *
 * create by liangguodong on 2018/9/26
 *
 * @flow
 */
import type { TabPositionType, TabType, EditEventType } from '../css/tabs';
export function matchType(
  type: TabPositionType | TabType | EditEventType,
  expectType: TabPositionType | TabType | EditEventType
) {
  return type === expectType;
}
export function isVertical(tabPosition: TabPositionType) {
  return matchType(tabPosition, 'left') || matchType(tabPosition, 'right');
}
export function plusWidth(index: number, width: Array<number>): number {
  let sum = 0;
  for (let i = 0; i <= index; i++) {
    sum += width[i];
  }
  return sum;
}
export function computePage(offset: number, actualSize: number): number {
  const totalPage = Math.ceil(actualSize / offset);
  return totalPage;
}
