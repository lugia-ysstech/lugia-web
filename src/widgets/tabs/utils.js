/**
 *
 * create by liangguodong on 2018/9/26
 *
 * @flow
 */
import type { TabPositionType, TabType, EditEventType } from '../css/tabs';
import { getAttributeFromObject, getKeyfromIndex } from '../common/ObjectUtils';
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

export function addActivityKey2Data(data: Array<Object>) {
  const newData = [];
  if (data) {
    data.map((item, i) => {
      newData.push(
        Object.assign({}, item, {
          activityKey: getAttributeFromObject(
            item,
            'activityKey',
            getKeyfromIndex(data, i, 'activityKey')
          ),
        })
      );
    });
  }
  return newData;
}
export function addWidth2Data(data: Array<Object>, widthSize: Array<number>) {
  const newData = [];
  if (data) {
    data.map((item, i) => {
      newData.push(
        Object.assign({}, item, {
          width: widthSize[i],
        })
      );
    });
  }
  return newData;
}
