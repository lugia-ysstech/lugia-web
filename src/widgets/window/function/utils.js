/*
 *   @flow
 */

import { isNumber, isMinValue, isMaxValue } from './math';
import { lockingWayFlag } from '../initialState';
const { clickLock, dragLock } = lockingWayFlag;
export function getOverflowSize(
  x: number,
  y: number,
  downX: number,
  downY: number
): { overflowWidth: number, overflowHeight: number } {
  const overflowWidth = x - downX;
  const overflowHeight = y - downY;
  return {
    overflowWidth,
    overflowHeight,
  };
}
export function getNewFormsSize(
  overflowWidth: number,
  overflowHeight: number,
  oldWidth: number,
  oldHeight: number,
  direction: string,
  limitSize: Object
): {
  width: number,
  height: number,
} {
  const fourthQuadrant =
    direction === 'right' || direction === 'bottom' || direction === 'bottomPiece';
  const secondQuadrant = direction === 'left' || direction === 'top' || direction === 'topPiece';
  const thirdQuadrant = direction === 'leftPiece';
  const firstQuadrant = direction === 'rightPiece';
  const numberW = oldWidth * 1;
  const numberH = oldHeight * 1;
  const numberOverW = overflowWidth * 1;
  const numberOverH = overflowHeight * 1;
  let newWidth = numberW;
  let newHeight = numberH;
  if (fourthQuadrant) {
    //始终做加法
    newWidth = numberW + numberOverW;
    newHeight = numberH + numberOverH;
  }
  if (secondQuadrant) {
    //始终做减法
    newWidth = numberW - numberOverW;
    newHeight = numberH - numberOverH;
  }
  if (firstQuadrant) {
    // x 始终加
    // y始终减
    newWidth = numberW + numberOverW;
    newHeight = numberH - numberOverH;
  }
  if (thirdQuadrant) {
    // x 始终减
    // y始终加
    newWidth = numberW - numberOverW;
    newHeight = numberH + numberOverH;
  }
  const { minWidth, minHeight, maxWidth, maxHeight } = limitSize;
  newWidth = Math.min(Math.max(newWidth, minWidth), maxWidth);
  newHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);
  return {
    width: newWidth,
    height: newHeight,
  };
}

export function getMoveXY(
  sourceX: number,
  sourceY: number,
  currentX: number,
  currentY: number
): { moveX: number, moveY: number } {
  const moveX = sourceX - currentX;
  const moveY = sourceY - currentY;
  return {
    moveX,
    moveY,
  };
}

export function fourLineChangeXY(
  state: Object,
  direction: string,
  sourceX: number,
  sourceY: number,
  currentX: number,
  currentY: number
): {
  moveX: number,
  moveY: number,
} {
  const isPiece = direction.endsWith('Piece');
  const { topIsDown, rightIsDown, bottomIsDown, leftIsDown } = state;
  if (topIsDown || rightIsDown || bottomIsDown || leftIsDown) {
    let moveXY = {
      moveX: 0,
      moveY: 0,
    };
    if ((topIsDown && !isPiece) || (rightIsDown && isPiece)) {
      moveXY = getMoveXY(0, sourceY, 0, currentY);
    }
    if (leftIsDown) {
      moveXY = getMoveXY(sourceX, 0, currentX, 0);
    }
    if (topIsDown && isPiece) {
      moveXY = getMoveXY(sourceX, sourceY, currentX, currentY);
    }
    return moveXY;
  }

  return {
    moveX: 0,
    moveY: 0,
  };
}
export function getPosition(
  moveX: number,
  moveY: number,
  x: number,
  y: number
): { x: number, y: number } {
  return {
    x: x - moveX * 1,
    y: y - moveY * 1,
  };
}
type TypedragRange = {
  clientX: number,
  clientY: number,
};
export function dragRange(
  { clientX, clientY }: TypedragRange,
  isDrag: boolean,
  lockTop: number,
  windowWidth: number,
  windowHeight: number
): {
  currentX: number,
  currentY: number,
  lockDirection: string,
} {
  let currentX = clientX;
  let currentY = clientY;
  let lockDirection = '';
  if (currentX >= windowWidth) {
    currentX = windowWidth;
  }
  const isLockTop = currentY >= lockTop;
  if (currentX >= windowWidth - 20 && isLockTop && isDrag) {
    lockDirection = 'right';
  }
  if (currentX <= 0) {
    currentX = 0;
  }
  if (currentX <= 20 && isLockTop && isDrag) {
    lockDirection = 'left';
  }
  if (currentY >= windowHeight) {
    currentY = windowHeight;
  }
  if (currentY <= 0) {
    currentY = 0;
  }
  return {
    currentX,
    currentY,
    lockDirection,
  };
}
export function getLimitPosition(
  state: Object,
  direction: string,
  minWidth: number,
  minHeight: number,
  maxWidth: number,
  maxHeight: number
): Object {
  const isPiece = direction.endsWith('Piece');
  const { topIsDown, rightIsDown, bottomIsDown, leftIsDown, width, height, x, y } = state;
  if (topIsDown || rightIsDown || bottomIsDown || leftIsDown) {
    const ableWidth = minWidth / width; //最小可用宽度比
    const ableHeight = minHeight / height; //最小可用高度比
    const ableMaxWidthRuler = width / maxWidth;
    const ableMaxHeightRuler = height / maxHeight;
    let minlimitX = x;
    let minlimitY = y;
    let maxLimitX = x;
    let maxLimitY = y;
    if (topIsDown || (rightIsDown && isPiece)) {
      minlimitY = y + height * (1 - ableHeight);
      maxLimitY = y - maxHeight * (1 - ableMaxHeightRuler);
    }
    if (leftIsDown || bottomIsDown) {
      minlimitY = y + height * ableHeight;
      maxLimitY = y + maxHeight;
    }
    if (leftIsDown || (topIsDown && isPiece)) {
      minlimitX = x + width * (1 - ableWidth);
      maxLimitX = x - maxWidth * (1 - ableMaxWidthRuler);
    }
    if (rightIsDown) {
      minlimitX = x + width * ableWidth;
      maxLimitX = x + maxWidth;
    }

    return {
      limitY: { minlimitY, maxLimitY },
      limitX: { minlimitX, maxLimitX },
    };
  }
}
type TypelimitY = {
  minlimitY: number,
  maxLimitY: number,
};
type TypelimitX = {
  minlimitX: number,
  maxLimitX: number,
};
export function getXY(
  state: Object,
  direction: string,
  limitX: TypelimitX,
  limitY: TypelimitY,
  clientX: number,
  clientY: number
): {
  x: number,
  y: number,
} {
  const isPiece = direction.endsWith('Piece');

  const { topIsDown, rightIsDown, bottomIsDown, leftIsDown, maxX, maxY } = state;
  let x = clientX <= 0 ? 0 : clientX;
  let y = clientY <= 0 ? 0 : clientY;
  const { minlimitX, maxLimitX } = limitX;
  const { minlimitY, maxLimitY } = limitY;
  if (clientX >= maxX) {
    x = maxX;
  }

  if (clientY >= maxY) {
    y = maxY;
  }
  if (topIsDown || rightIsDown || bottomIsDown || leftIsDown) {
    if ((topIsDown && !isPiece) || (topIsDown && isPiece) || (rightIsDown && isPiece)) {
      if (clientY >= minlimitY) {
        y = minlimitY;
      }
      if (clientY <= maxLimitY) {
        y = maxLimitY;
      }
    }
    if ((leftIsDown && isPiece) || bottomIsDown) {
      if (clientY <= minlimitY) {
        y = minlimitY;
      }
      if (clientY >= maxLimitY) {
        y = maxLimitY;
      }
    }
    if (leftIsDown || (topIsDown && isPiece)) {
      if (clientX >= minlimitX) {
        x = minlimitX;
      }
      if (clientX <= maxLimitX) {
        x = maxLimitX;
      }
    }
    if (rightIsDown && isPiece) {
      if (clientX <= minlimitX) {
        x = minlimitX;
      }
      if (clientX >= maxLimitX) {
        x = maxLimitX;
      }
    }
  }

  return {
    x,
    y,
  };
}
type TypeDragCircle = {
  x: number,
  maxX: number,
  isFloat: boolean,
  direction?: string,
  width?: number,
  minWidth?: number,
};
export function dragCircle({
  x,
  maxX,
  isFloat,
  direction,
  width = 0,
  minWidth = 50,
}: TypeDragCircle): {
  left: string,
  right: string,
  x: number,
} {
  const middleX = maxX / 2;
  let right = '';
  let left = '';
  let newX = x;
  if (isFloat) {
    if (x >= middleX) {
      right = 1;
      newX = maxX - minWidth;
    } else {
      left = 1;
      newX = 1;
    }
  } else {
    if (direction === 'left') {
      left = 0;
      newX = 0;
    }
    if (direction === 'right') {
      right = 0;
      newX = maxX - width;
    }
  }

  const newLeft = left !== '' ? `left:${left}px` : '';
  const newRight = right !== '' ? `right:${right}px` : '';
  return {
    left: newLeft,
    right: newRight,
    x: newX,
  };
}
export function getComponentSize(
  width?: number,
  height?: number,
  minWidth: number,
  minHeight: number,
  maxWidth?: number,
  maxHeight?: number,
  canScale: boolean
): {
  newWidth: string | number,
  newHeight: string | number,
} {
  let w = width;
  let h = height;
  if ((width && !isNumber(width)) || isMinValue(width, minWidth)) {
    w = minWidth;
  }
  if ((height && !isNumber(height)) || isMinValue(height, minHeight)) {
    h = minHeight;
  }
  if (isMaxValue(width, maxWidth)) {
    w = maxWidth;
  }
  if (isMaxValue(height, maxHeight)) {
    h = maxHeight;
  }
  let newWidth = w || 'auto';
  let newHeight = h || 'auto';
  if (!canScale) {
    if (!width) {
      newWidth = 'auto';
    }
    if (!height) {
      newHeight = 'auto';
    }
  }
  return {
    newWidth,
    newHeight,
  };
}
type TypegetDownXY = {
  x: number,
  y: number,
  downX: number,
  downY: number,
  width: number,
  height: number,
  direction: string,
};
export function getDownXY({
  x,
  y,
  downX,
  downY,
  width,
  height,
  direction,
}: TypegetDownXY): { newX: number, newY: number } {
  let newX;
  let newY;
  switch (direction) {
    case 'top':
      newX = downX;
      newY = y;
      break;
    case 'right':
      newX = x + width;
      newY = downY;
      break;
    case 'bottom':
      newX = downX;
      newY = y + height;
      break;
    case 'left':
      newX = x;
      newY = downY;
      break;
    case 'rightPiece':
      newX = x + width;
      newY = y;
      break;
    case 'bottomPiece':
      newX = x + width;
      newY = y + height;
      break;
    case 'leftPiece':
      newX = x;
      newY = y + height;
      break;
    default:
      newX = x;
      newY = y;
  }
  return {
    newX,
    newY,
  };
}

export function getLockingWay(lockingWay?: string) {
  return {
    isDrag: lockingWay === dragLock,
    isClick: lockingWay === clickLock,
  };
}
