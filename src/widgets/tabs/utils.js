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

export function computePage(data: Array<Object>, maxIndex: number): number {
  const totalPage = Math.ceil(data.length / maxIndex);
  return totalPage;
}

export function addActivityValue2Data(data: Array<Object>): Array<Object> {
  if (data) {
    return data.map((item: Object, i: number): Object => {
      return Object.assign({}, item, {
        activityValue: getAttributeFromObject(
          item,
          'activityValue',
          getKeyfromIndex(data, i, 'activityValue')
        ),
      });
    });
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
export function getTextAlign(textAlign: string) {
  let justify = 'center';
  switch (textAlign) {
    case 'left':
      justify = 'flex-start';
      break;
    case 'right':
      justify = 'flex-end';
      break;
    case 'justify':
      justify = 'space-between';
      break;
    default:
      break;
  }
  return `${justify}`;
}

export function isValued(value: string) {
  return value || value === '' || value === 0;
}

export function isBatchValued(value: string[]) {
  return value.some(item => isValued(item));
}

export const defaultCardBlock = 8;

export function computeMoveDistance(param) {
  const { maxIndex, currentPage, titleSize, tabType, pagedType, tabPosition } = param;
  const isPageType = pagedType === 'page';
  const distanceLength = currentPage - 1;
  const blockDistance = tabType === 'card' ? defaultCardBlock : 0;

  const length = isPageType
    ? isVertical(tabPosition)
      ? distanceLength * maxIndex - 1
      : distanceLength * maxIndex
    : maxIndex;
  let beforeWidth = 0;
  if (length) {
    for (let i = 0; i < length; i++) {
      beforeWidth += titleSize[Math.min(i, titleSize.length - 1)] + blockDistance;
    }
  }
  let distance = 0;
  switch (pagedType) {
    case 'single':
      if (distanceLength) {
        const movedSzie = titleSize.slice(maxIndex, maxIndex + distanceLength);
        distance = movedSzie.length
          ? movedSzie.reduce(function(prev, curr) {
              return prev + curr + blockDistance;
            })
          : 0;
      }
      break;
    case 'page':
      distance = beforeWidth;
      break;
    default:
      break;
  }

  return -Math.max(0, distance);
}
