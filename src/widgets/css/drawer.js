/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import styled, { css, keyframes } from 'styled-components';

type Direction = 'top' | 'right' | 'bottom' | 'left';
export type DrawerProps = {
  placement?: Direction,
  title?: string | React.ReactNode,
  visible: boolean,
  mask?: boolean,
  maskClosable?: boolean,
  closable?: boolean,
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
  const { placement, theme } = props;
  if (placement === 'top' || placement === 'bottom') {
    return theme.height || 256;
  }
  return theme.width || 256;
};
const getDrawerAnimate = (props: CSSProps): string => {
  const { open, opening, closing } = props;
  const distance = getWidthOrHeight(props);
  const Direction = getAnimateDirection(props);
  const openFrom = `${Direction}: ${em(-distance)};`;
  const openTo = `${Direction}: 0;`;
  const closeFrom = `${Direction}: 0;`;
  const closeTo = `${Direction}: ${em(-(distance + 8))};`;
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
      ${Direction}: ${em(-(distance + 8))};

      animation: ${CloseKeyframe} 0.3s;
    `;
  }
  if (open) {
    return `
      ${Direction}: 0;
    `;
  }
  return `
    ${Direction}: ${em(-(distance + 8))};
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
export const DrawerContentWrap = styled.div`
  position: fixed;
  ${getWidthOrHeightByDirection};
  ${getDrawerAnimate};
  box-shadow: ${em(-2)} 0 ${em(8)} rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
  ${getTransform};
`;
export const DrawerContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  border: 0;
  z-index: 1;
`;
export const DrawerContentHeader = styled.div`
  padding: ${HeaderEM(22)} ${HeaderEM(20)} ${HeaderEM(16)};
  font-size: ${em(16)};
  line-height: ${HeaderEM(22)};
  font-weight: 500;
  color: #333;
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
export const CloseText = styled.span`
  display: block;
  width: ${HeaderEM(56)};
  height: ${HeaderEM(60)};
  text-align: center;
  line-height: ${HeaderEM(60)};
  cursor: pointer;
`;
