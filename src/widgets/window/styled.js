import styled from 'styled-components';
import floatCircleNormal from './img/floatCircleNormal.png';
import floatCircleHover from './img/floatCircleHover.png';
import { getLockingWay } from './function/utils';
const dragHeight = 14;
const pubulicIconSize = 12;
export const DragWrap = styled.div`
  display: block;
`;
export const DragBox = styled.div`
  overflow: hidden;
  clear: both;
  user-select: none;
  display: flex;
  align-items: center;
  justify-items: center;
  background: ${props => (props.isFloat ? 'transparent' : '#f2f2f3')};
  border-radius: ${props => (props.isFloat ? '50%' : '')};
`;
export const Close = styled.span`
  cursor: default;
  display: inline-block;
  user-select: none;
  width: ${props => dragStyle(props).bthWidth}px;
  height: ${pubulicIconSize}px;
  text-align: center;
  margin: 0 3px;
  & > i {
    font-size: ${pubulicIconSize}px;
    ${props => (props.disableUp ? 'cursor:not-allowed;' : '')}
    color: ${props => (props.isChecked ? '#333;' : '#999')};
  }
`;

export const Drag = styled.span`
  display: ${props => (props.display ? props.display : ' inline-block;')};
  width: ${props => (props.width ? props.width : dragStyle(props).dragWidth)};
  height: ${props => (props.height ? props.height : `${dragHeight}px`)};
  cursor: default;
  background: #f2f2f3;
  user-select: none;
`;

export const Float = styled.span`
  display: inline-block;
  width: 50px;
  height: 50px;

  :hover {
    background: linear-gradient(to right, #4d68ff 0%, #8093ff 100%);
  }

  :active {
    background: #3d53cc;
  }
`;
export const Image = styled.i`
  display: block;
  width: 100%;
  height: 100%;
  background: url(${floatCircleNormal}) no-repeat center center;
  background-size: 50%;
  :hover {
    background: url(${floatCircleHover}) no-repeat center center;
    background-size: 50%;
  }
`;

function dragStyle(props) {
  const { isFloat, isLock, iconNumber } = props;
  const bthWidth = 15;
  const number = isLock ? 1 : iconNumber;
  const dragWidth = isFloat ? '100%' : `calc(100% - ${bthWidth * number}px)`;
  return {
    dragWidth,
    bthWidth,
  };
}

export const Box = styled.div`
  ${props => getDragStyle(props)};
  z-index: ${props => props.zIndex};
  background: #fff;
  ${props => getMinSize(props)}
  ${props => (props.isFloat ? 'border-radius:50%;' : '')};
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
  ${props => (props.isTransition ? 'transition:width 0.3s' : '')};
  opacity: ${props => getBoxOpacity(props)};
  overflow: hidden;
`;

function getBoxOpacity(props) {
  const { lockDirection, lockingWay, isLock } = props;
  const { isDrag } = getLockingWay(lockingWay);
  let opacity = 1;
  if (lockDirection && isDrag && !isLock) {
    opacity = 0.5;
  }
  return opacity;
}
function getMinSize(props) {
  const { lockingWay, isLock, isFloat, minHeight, minWidth } = props;
  const { isClick } = getLockingWay(lockingWay);
  let style = `
    min-height:${minHeight}px;
    min-width:${minWidth}px;
  `;
  if ((isClick && isLock) || isFloat) {
    style = '';
  }
  return style;
}
export const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
export const Children = styled.div`
  display: ${props => (props.isFloat ? 'none' : 'block')};
  height: calc(100% - ${props => (props.dragHeight ? props.dragHeight : dragHeight)}px);
  overflow: auto;
`;

function getDragStyle(props) {
  const {
    left,
    x,
    top,
    lockBottom,
    isLock,
    lockDirection,
    right,
    width,
    height,
    lockingWay,
    isFloat,
  } = props;
  const { isClick, isDrag } = getLockingWay(lockingWay);
  const newWidth = `${width === 'auto' ? 'auto' : `${width}px`}`;
  let newHeight = top;

  if (isLock && (isClick || isDrag) && lockDirection && !isFloat) {
    newHeight = top > 0 ? `calc(100% - ${top}px - ${lockBottom}px)` : '100%';
  } else {
    newHeight = `${height}px`;
  }
  if (isLock && isClick) {
    return `
    width: ${newWidth};
    height: ${newHeight};`;
  }
  let leftStyle = left && left !== '' ? left : `left:${x}px`;
  if (right) {
    leftStyle = '';
  }
  let rightStyle = right;
  if (leftStyle) {
    rightStyle = '';
  }
  return `
    position:fixed;
    ${leftStyle};
    ${rightStyle};
    top:${top}px;
    width: ${newWidth};
    height: ${newHeight};
    `;
}

export const DragLIne = styled.div`
  position: absolute;
  user-select: none;
  ${props => getPosition(props)};
  z-index: 100;
`;
function getPosition(props) {
  const { position, direction } = props;
  const isVertical = position === 'bottom' || position === 'top';
  const isHorizontal = position === 'left' || position === 'right';
  let style = '';
  let cursor = '';
  if (isVertical) {
    style = `
      left:0;
      height:6px;
      width: 100%;
    `;
  }
  if (isHorizontal) {
    style = `
      top:0;
      height: 100%;
      width: 6px;
    `;
  }
  if (direction && isHorizontal) {
    cursor = 'e-resize';
  }
  if (direction && isVertical) {
    cursor = 'n-resize';
  }
  return `
    ${position}:0px;
    ${style};
    cursor:${cursor};
  `;
}

export const DragPiece = styled.span`
  position: absolute;
  ${props => getPiecePosition(props)};
  width: 6px;
  height: 6px;
  user-select: none;
  z-index: 100;
`;
function getPiecePosition(props) {
  const { direction } = props;
  let position = '';
  if (direction === 'top') {
    position = `
      top:0px;
      left:0px;
      cursor:se-resize;
    `;
  }
  if (direction === 'right') {
    position = `
      top:0px;
      right:0px;
      cursor:ne-resize;
    `;
  }
  if (direction === 'bottom') {
    position = `
      bottom:0px;
      right:0px;
      cursor:se-resize;
    `;
  }
  if (direction === 'left') {
    position = `
      bottom:0px;
      left:0px;
      cursor:ne-resize;
    `;
  }
  return position;
}
export const Edge = styled.div`
  position: fixed;
  transition: width 0.3s;
  ${props => getRoomeStyle(props)};
  z-index: ${props => props.sideZIndex};
`;
const getRoomeStyle = props => {
  const { lockDirection, isShowSide, lockTop, lockBottom } = props;
  const newWidth = isShowSide ? 30 : 0;
  return `
    ${lockDirection ? `${lockDirection}:0` : ''};
    top:${lockTop ? lockTop : 0}px;
    bottom:${lockBottom}px
    border:${isShowSide ? '1px dashed #ddd' : 'none'};
    width:${newWidth}px;
    height:calc(100% - ${lockTop}px - ${lockBottom}px);
    background:${isShowSide ? 'rgba(0,0,255,0.03)' : 'none'};
  `;
};
