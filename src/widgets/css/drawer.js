/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import styled, { css, keyframes } from 'styled-components';
import CSSComponent from '@lugia/theme-css-hoc';

type Direction = 'top' | 'right' | 'bottom' | 'left';
export type DrawerProps = {
  placement?: Direction,
  title?: string | React.ReactNode,
  visible: boolean,
  mask?: boolean,
  maskClosable?: boolean,
  closable?: boolean,
  handle?: boolean,
  onToggle: Function,
  onClose?: Function,
  children: any,
  getTheme: Function,
};
export type DrawerState = {
  open: boolean,
  opening: boolean,
  closing: boolean,
  transform: boolean,
};
type CSSProps = {
  open: boolean,
  opening: boolean,
  close: boolean,
  closing: boolean,
  visible: boolean,
  transform: boolean,
  placement: Direction,
  theme: Object,
};

const FontSize = 1.2;
const em = px2emcss(FontSize);
const HeaderEM = px2emcss(1.6);
const ContentEM = px2emcss(1.4);

const direction = ['top', 'right', 'bottom', 'left'];

const getDrawerWidth = (props: CSSProps) => {
  const { visible } = props;
  if (visible) {
    return `
      width: 100%;
    `;
  }
  return `
    width: 0;
  `;
};
export const Drawer = styled.div`
  font-size: ${FontSize}rem;
  position: fixed;
  top: 0;
  ${getDrawerWidth};
  height: 100%;
  z-index: 1000;
`;
const getMaskStyle = (props: CSSProps) => {
  const { visible } = props;
  if (visible) {
    return `
      height: 100%;
      opacity: 0.3;
    `;
  }
  return `
    height: 0;
    opacity: 0;
  `;
};
export const DrawerMask = styled.div`
  position: fixed;
  width: 100%;
  transition: opacity 0.3s linear;
  ${getMaskStyle};
  background-color: rgba(0, 0, 0, 0.65);
`;
const getAnimateDirection = (props: CSSProps): string => {
  const { placement } = props;
  if (direction.includes(placement)) {
    return placement;
  }
  return 'right';
};
const getWidthOrHeight = (props: CSSProps) => {
  const {
    placement,
    themeProps: { themeConfig: { normal: { width = 256, height = 200 } = {} } = {} } = {},
  } = props;
  if (placement === 'top' || placement === 'bottom') {
    return height;
  }
  return width;
};
const getDrawerAnimate = (props: CSSProps): string => {
  const { open, opening, closing } = props;
  const distance = getWidthOrHeight(props);
  const Direction = getAnimateDirection(props);
  const isNumber = typeof distance === 'number';
  const trueDistance = isNumber ? em(-distance) : distance;
  const closeDistance = isNumber ? em(-(distance + 8)) : `calc(-${distance} - 8px)`;
  const openFrom = `${Direction}: ${trueDistance};`;
  const openTo = `${Direction}: 0;`;
  const closeFrom = `${Direction}: 0;`;
  const closeTo = `${Direction}: ${closeDistance};`;
  const OpenKeyframe = keyframes`
    from {
      ${openFrom}
    }
    to {
      ${openTo}
    }
  `;
  const CloseKeyframe = keyframes`
    from {
      ${closeFrom}
    }
    to {
      ${closeTo}
    }
  `;
  if (opening) {
    const zero = `${Direction}: 0;`;
    return css`
      ${zero}
      animation: ${OpenKeyframe} 0.3s;
    `;
  }
  if (closing) {
    return css`
      ${Direction}: ${closeDistance};

      animation: ${CloseKeyframe} 0.3s;
    `;
  }
  if (open) {
    return `
      ${Direction}: 0;
    `;
  }
  return `
    ${Direction}: ${closeDistance};
  `;
};
const getWidthOrHeightByDirection = (props: CSSProps) => {
  const { placement } = props;
  const distance = getWidthOrHeight(props);
  if (placement === 'top' || placement === 'bottom') {
    return `height: ${em(distance)};width: 100%;`;
  }
  return `width: ${em(distance)};height: 100%;`;
};
const getTransform = (props: CSSProps) => {
  const { transform, placement } = props;
  if (transform) {
    const defaultOffset = 180;
    if (placement === 'top' || placement === 'bottom') {
      return `transform: translateY(${
        placement === 'top' ? em(defaultOffset) : em(-defaultOffset)
      });`;
    }
    return `transform: translateX(${
      placement === 'left' ? em(defaultOffset) : em(-defaultOffset)
    });`;
  }
};
const getPositionCSS = (props: CSSProps): string => {
  const { type } = props;
  if (type === 'Drawer') {
    return '';
  }
  return css`
    position: fixed;
  `;
};
const iconAngleData = {
  visible: { top: -90, bottom: 90, right: 0, left: 180 },
  invisible: { top: 90, bottom: -90, right: 180, left: 0 },
};
export const getIconTransfrom = (visible, placement) => {
  if (visible) {
    return `transform: rotateZ(${iconAngleData.visible[placement]}deg)`;
  }
  return `transform: rotateZ(${iconAngleData.invisible[placement]}deg)`;
};
export const DrawerContentWrap = CSSComponent({
  tag: 'div',
  className: 'Drawer',
  css: css`
    ${getPositionCSS};
    ${getWidthOrHeightByDirection};
    ${getDrawerAnimate};
    box-shadow: ${em(-2)} 0 ${em(8)} rgba(0, 0, 0, 0.15);
    transition: transform 0.3s;
    ${getTransform};
    min-width: 256px;
    min-height: 100px;
  `,
  normal: {
    selectNames: [['width'], ['height']],
  },
});

export const DrawerContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  border: 0;
  z-index: 1;
`;
const getHeaderLugiadCSS = (props: CSSProps): string => {
  const { __lugiad__header__absolute__ = false, type } = props;
  if (__lugiad__header__absolute__ || type === 'Drawer') {
    return css`
      position: absolute;
      left: 20px;
      top: 22px;
      z-index: 4000;
      padding: 0;
    `;
  }
  return '';
};
export const DrawerContentHeader = styled.div`
  padding: ${HeaderEM(22)} ${HeaderEM(20)} ${HeaderEM(16)};
  font-size: ${em(16)};
  line-height: ${HeaderEM(22)};
  font-weight: 500;
  color: #333;
  ${getHeaderLugiadCSS}
`;
export const DrawerContentMain = styled.div`
  font-size: ${em(14)};
  color: #666;
  padding-left: ${ContentEM(20)};
  padding-right: ${ContentEM(20)};
  line-height: 1.5;
  word-wrap: break-word;
`;
export const DrawerClose = styled.div`
  font-size: ${em(16)};
  position: absolute;
  right: 0;
  top: 0;
`;
const getCloseLugiadCSS = (props: CSSProps): string => {
  const { __lugiad__header__absolute__ = false, type } = props;
  if (__lugiad__header__absolute__ || type === 'Drawer') {
    return css`
      z-index: 4000;
    `;
  }
  return '';
};
export const CloseText = styled.span`
  display: block;
  width: ${HeaderEM(56)};
  height: ${HeaderEM(60)};
  text-align: center;
  line-height: ${HeaderEM(60)};
  cursor: pointer;
  ${getCloseLugiadCSS}
`;
const horizontalCommonProperty = `
  height:16px;
  width:48px;
  left:calc(50% - 24px);
`;
const verticalCommonProperty = `
  height:48px;
  width:16px;
  top:calc(50% - 24px);
`;
const getHandleWidthOrHeightByDirection = (props: CSSProps) => {
  const { visible, placement = 'right' } = props;
  const absolutePosition = visible ? '-16px' : '-24px';
  if (placement === 'top' || placement === 'bottom') {
    const isLocateTop = placement === 'top';
    return `
      ${isLocateTop ? 'bottom' : 'top'}: ${absolutePosition}; ${horizontalCommonProperty};
      border-radius: ${isLocateTop ? '0 0 3px 3px' : '3px 3px 0 0'}
    `;
  }
  const isLoacteRight = placement === 'right';
  return `
    ${isLoacteRight ? 'left' : 'right'}: ${absolutePosition}; ${verticalCommonProperty}
    border-radius: ${isLoacteRight ? '3px 0 0 3px' : '0 3px 3px 0'}
  `;
};
export const HandleWrap = CSSComponent({
  tag: 'div',
  className: 'HandleWrap',
  css: css`
    position: absolute;
    ${getHandleWidthOrHeightByDirection}
    background: #fff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
});
