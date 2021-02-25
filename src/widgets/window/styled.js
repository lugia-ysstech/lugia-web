import styled from 'styled-components';
import { getLockingWay } from './function/utils';
const dragHeight = 14;
const pubulicIconSize = 12;

const floatCircleNormal =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA4CAYAAACyutuQAAAAAXNSR0IArs4c6QAAA9dJREFUaAXtmjtoFEEYgGdmNyYSLNQmidqpYBVEG5X4QFKIjYXgA8FOUC6P5qIG9EajhORSeMEHsZLYCT6LpBC1ETUiNkoQLFTQIgFNkXeyt7/z390uO5u9sI/bzV64hWPnn93/8c38O/fv3RCyyg6lnHkAgM4rG3c2NR9dfPtqaBZZaLkCpdODteOTE8+BwGEBMUmYejDNE59ZOQIVYIYRBuMHQtYRop/GdtkBWWCaEMA8qP4e26rZUWhwDmyO3N6fJfpuSmC7SNMo0lKjlA338pYX9niscjEYEeH1dKr9Md4rBZvsymwDjTwgAHuthqJqK4zu6+Ft75z8LQtzrT1l6Jgp13lzoB40+LBSMBgQ6LDDCMx6dguDOmbKLczPDQh5g9VQpG1KR1lN1RO7Ty8wqJtLuUvdd9drswv/DGP5ZZAlqKKOKFldLCLhHooCi2o28Ytzqls9eYVB3dwMafPaLqshgZlJ89ZBqS90oUXy4AcGDeSeITEjmyVrlP2Q5IgFvzAYprkoRBxzUXdBYGIHFBQmVkClgIkNUKlgEMj8HkJhJQ4vMFiWzdD+AwrQsW7eOuoU74ouCl5gMPhp6H+oZ+H1og5fL/LMyVgBeYXh/I0KQE7kIYDqAKdiA1QMhjHalbYUmnLAP8XjAZY3bFojX89LkafccjC9vO2qU5Be+iIHGp+a6BNvmtLLGc5MKWAQ3PUqd+w8HBFl6n1RqcplUpHhE+XUb0bJuWf36LB0C0CjVS4lDNp1PUNeYNAwgqMOtq2HALgl3jAXxEenjF0p1cwYPlwDGQpBz+KN9JFarTZUrSENoqK/EdSeXd91ymH6eJklI+XsDlHu7kz8deovRZ9roMKzsKUUTsO0EXnKhQmDtitAYY9wUPuVGQo6gmHrV2Yo7BEOat/195DXWs5vYMYX8pIa0KVB1ynnpUpw6dvxtmI1oOPNDp2ugRx0Y9nlGghrOUyHsCmMlPPrx/UzVKnl/A5xQD3XKRfQT2TqFaDIhtqno8oM+Ry4yNQqMxTZUPt0tDpnCIiuWQdEbIlxXUFY9cJtz9hjkmI2fOdmiBJV+vNIVNbNxg1xOU9RzR6TFLMRZ456a33Vl+9/NNxAtzZ3AeB4MpV5KX6uHRGytBnCUIz2DHXij64zkk+Aj5JcEERxmz+SPNMh9tr0GHKcz2KgP9XSxj2cH1qSduaiUEta+yilQ3EGwdgooWMqZWedYPLXLQS4h7Mj1X9B/H9zWXRvslyKQ3NaDPhTtVppX+63cTPl7BEn+Z06JjYAihXPnEX7PVHJIobxatLyzb65KSr/K+rnP8mtrKB5o7CgAAAAAElFTkSuQmCC';

const floatCircleHover =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA4CAYAAACyutuQAAAAAXNSR0IArs4c6QAAAwdJREFUaAXtmjGsDUEUhu99bkFUoiGhpKAQopKQEIonOgqFQkhUah3CaxVqNY1E4SkUaCSvQClEKyhInoKIhJd3ff/N7mZ2dpaZvbs7E9mT/Lkzs+fM+f85s5vZmx2NBktnBabT6RjsB1vTYdWQCSI2g6dA9g0caDhV/DDIS8xzYNqt+MwaMECBS4yEndZ0E3tOLiwwdgQcBLvBGHRtayR4PB6Pl/+WSGLkBw5bfjeJfWCNjUYE7AIrIJYdqpDKBiBUV5kbzhgCtoPVWEqyvBdd5LgWJkaTELQcWcwb8m+xBYWKmd0f2URfjcm+074MXoCpMd5V8zcTv+c+WDcTSAz9unvmuulbahN4HJi2VHKI0IFM+DbLeRJ83lRD+0J+LcbvPGL0iE7KJAZC4dssU5GUoHnFSFMygtoQk4ygtsQkIShEDL4L4CjYI/K1hkOUpxx5gx7N+N8DsnVwNilBEAoVMyFmDeT20CUoykMBRnWP5iVOC3UnAL0ZbDBEbDTaRbN3Qf8Qc61g1rDRuyB46s3Sfp9RZeYWozXwFsTKLoIPwNfku6gklu2z+q2J0bzegvC9A3YoyNPkqxjbbjPwC+hkfbWtyuRJKq/g+YWufhFwn8o9Y/4J7c9t5wmp0CWSfwwgIF/FVAwhq12IUSLvCkFAJ+CdFXaJDYRUKDHqbjqDIPe6pDM6VCidWriZDBVyr0s6o94V0rkMhJzlcG9kdWdAr1XzFsRsoWc5LwIOp7ozoMO1OhQiqBqd4EiIoNCzXFO5tWdAnwmHs5zPKsX0CdlyMXl65x4EeS9VJMehQpEW3jvtUCHvpYrk+N9WSJ+mmOZ9gjCDOm7bnGzOs/R5hd5aZE5Y/RS6Nieb84xjrvo1vZ9gU8b8DG8yT2jrw4vSxxDZ9b5/tpHwnJX0pdUvdxFwpdHrWJygV6TNi1ESUnw6hoO23yNwsuSRXkf/hx/jn1znlsvvoREO2lqngL7x+QRSsx8Qugv21okR4aJC6phGxbRv9QFgIdq83nP7C/neZYvec+rI6f4AWkLPXLLDMKQAAAAASUVORK5CYII=';

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
  ${props => getMiddlePosition(props)};
`;
function getMiddlePosition(props) {
  const { x, top } = props;
  let position = '';
  const isNoX = x === undefined;
  const isNoY = top === undefined;
  if (isNoX) {
    position = 'left:50%;transform:translateX(-50%);';
  }
  if (isNoY) {
    position = 'top:50%;transform:translateY(-50%);';
  }
  if (isNoX && isNoY) {
    position = 'left:50%;top:50%;transform:translate(-50%,-50%);';
  }
  return position;
}
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
export const Mask = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: ${props => props.zIndex};
  background: rgba(0, 0, 0, 0.5);
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
