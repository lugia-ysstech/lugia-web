/**
 *
 * create by liangguodong on 2018/9/26
 *
 * @flow
 */
import type { TabPositionType, TabType } from '../css/tabs';
export function matchTab(
  tabPosition: TabPositionType | TabType,
  expect: TabPositionType | TabType
) {
  return tabPosition === expect;
}
export function isVertical(tabPosition: TabPositionType) {
  return matchTab(tabPosition, 'left') || matchTab(tabPosition, 'right');
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
