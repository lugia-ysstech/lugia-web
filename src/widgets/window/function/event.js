import { getOverflowSize, getNewFormsSize, fourLineChangeXY, getPosition } from './utils';
export function onMouseMoveEvent(e, state, sourceXY, direction, x, y, width, height, limitSize) {
  const isPiece = direction.endsWith('Piece');
  const { topIsDown, rightIsDown, bottomIsDown, leftIsDown } = state;

  if (topIsDown || rightIsDown || bottomIsDown || leftIsDown) {
    const { clientX, clientY } = e;
    const { sourceX, sourceY } = sourceXY;
    let newX = clientX;
    let newY = clientY;
    let newDownX = sourceX;
    let newDownY = sourceY;
    if (topIsDown || bottomIsDown) {
      newX = isPiece ? clientX : 0;
      newDownX = isPiece ? sourceX : 0;
    }
    if (rightIsDown || leftIsDown) {
      newY = isPiece ? clientY : 0;
      newDownY = isPiece ? sourceY : 0;
    }
    const result = getOverflowSize(newX, newY, newDownX, newDownY, state);
    const { overflowWidth, overflowHeight } = result;
    const sizes = getNewFormsSize(
      overflowWidth,
      overflowHeight,
      width,
      height,
      direction,
      limitSize
    );
    const moveXY = fourLineChangeXY(state, direction, x, y, clientX, clientY);

    const { moveX, moveY } = moveXY;
    const xy = getPosition(moveX, moveY, x, y);
    return { ...xy, direction, ...sizes };
  }
  return {
    x,
    y,
    width,
    height,
    direction,
  };
}
export function onMouseUp(param) {
  const { overflowWidth, overflowHeight, width, height, moveX, moveY, x, y, direction } = param;
  const sizes = getNewFormsSize(overflowWidth, overflowHeight, width, height, direction);
  const movePosition = getPosition(moveX, moveY, x, y);
  const resetOverflow = resetOverflowSize();
  const resetMove = resetMoveXY();
  return { ...sizes, ...movePosition, ...resetOverflow, ...resetMove };
}

export function dragXY(x, y, moveX, moveY) {
  const newX = x - moveX;
  const newY = y - moveY;
  const resetOverflow = resetOverflowSize();
  const resetMove = resetMoveXY();
  return { x: newX, y: newY, ...resetOverflow, ...resetMove };
}
function resetMoveXY() {
  return {
    moveX: 0,
    moveY: 0,
  };
}
function resetOverflowSize() {
  return {
    overflowWidth: 0,
    overflowHeight: 0,
  };
}
export function getNodeSize({ node, minWidth, minHeight, maxWidth, maxHeight }) {
  let w = minWidth;
  let h = minHeight;
  if (node) {
    const { current } = node;
    if (current) {
      const { height, width } = current.getBoundingClientRect();
      w = parseFloat(parseFloat(width).toFixed(2));
      h = parseFloat(parseFloat(height).toFixed(2));
    }
  }
  w = Math.min(Math.max(w, minWidth), maxWidth);
  h = Math.min(Math.max(h, minHeight), maxHeight);
  return { w, h };
}
