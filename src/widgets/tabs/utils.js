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

export function isInFirstPage(currentPage, pageSplitInfo) {
  return pageSplitInfo && currentPage < getFirstPageLength(pageSplitInfo);
}
export function getFirstPageLength(pageSplitInfo) {
  return pageSplitInfo && pageSplitInfo[0] && pageSplitInfo[0].length - 1;
}

export const defaultCardBlock = 8;

export function computeMoveDistance(param) {
  const { currentPage, titleSize, tabType, pagedType, pageSplitInfo } = param;
  const blockDistance = tabType === 'card' ? defaultCardBlock : 0;
  let distance = 0;
  switch (pagedType) {
    case 'single':
      const firstPageLength = pageSplitInfo[0].length - 1;
      const moveLength = currentPage - firstPageLength;
      if (moveLength > 0) {
        const movedSzie = titleSize.slice(firstPageLength, firstPageLength + moveLength);
        distance = movedSzie.length
          ? movedSzie.reduce(function(prev, curr) {
              return prev + curr + blockDistance;
            })
          : 0;
      }
      break;
    case 'page':
      const distanceLength = currentPage - 1;
      if (distanceLength) {
        const length = getLengthByCurrentPage(distanceLength, pageSplitInfo);
        if (length) {
          for (let i = 0; i < length; i++) {
            distance += titleSize[Math.min(i, titleSize.length - 1)] + blockDistance;
          }
        }
      }
      break;
    default:
      break;
  }

  return -Math.max(0, distance);
}

export const getLengthByCurrentPage = (distanceLength, pageSplitInfo) => {
  let length = 0;
  for (let i = 1; i <= distanceLength; i++) {
    const silgleLength = pageSplitInfo[i].length;
    if (silgleLength) {
      length += silgleLength;
    }
  }
  return length;
};

export const isPagedType = (pagedType: 'page' | 'single') => {
  return pagedType === 'page';
};
