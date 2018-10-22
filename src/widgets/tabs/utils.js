/**
 *
 * create by liangguodong on 2018/9/26
 *
 * @flow
 */
import type { EditEventType, TabPositionType, TabType } from '../css/tabs';
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

export function addActivityKey2Data(data: Array<Object>): Array<Object> {
  if (data) {
    return data.map(
      (item: Object, i: number): Object => {
        return Object.assign({}, item, {
          activityKey: getAttributeFromObject(
            item,
            'activityKey',
            getKeyfromIndex(data, i, 'activityKey')
          ),
        });
      }
    );
  }
  return [];
}

export function addWidth2Data(data: Array<Object>, widthSize: Array<number>): Array<Object> {
  if (data) {
    return data.map((item, i) => {
      return Object.assign({}, item, {
        width: widthSize[i],
      });
    });
  }
  return [];
}
