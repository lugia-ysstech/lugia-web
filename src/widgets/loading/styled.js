import styled, { keyframes } from 'styled-components';
import { px2emcss } from '../css/units';
import { FontSize, FontSizeNumber } from '../css/index';

const em = px2emcss(FontSizeNumber);
type CssProps = {
  circleDiameter?: number,
  width?: number,
  color?: string,
  delay?: number,
  scale?: boolean,
};
export const WrapperKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
export const circleKeyframes = keyframes`
  0% {
    transform: scale (1, 1);
    opacity: 0.5;
  }
  40% {
    transform: scale (1, 1);
    opacity: 1;
  }
  60% {
    transform: scale (1, 1);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.5;
  }
`;
const getStyled = (props?: CssProps) => {
  const { width, color, circleDiameter, delay, scale } = props;
  const LodingWrapperStyle = `
      font-size:${FontSize};
      position: absolute;
      width:${em(width)};
      height:${em(width)};
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      -webkit-transform:translate(-50%,-50%);
  `;
  const LodingInnerStyle = `
      height: ${em(width)};
      width: ${em(circleDiameter)};
      position: absolute;
      left: ${em(width / 2 - circleDiameter / 2)};
      top: 0;
      transform:translateY(-50%);
      -webkit-transform:translateY(-50%);
      transform: rotate(0deg);
      animation: ${WrapperKeyframes} 2.5s infinite;
      animation-timing-function: cubic-bezier(0.28, 0.8, 0.69, 1);
      animation-delay: ${delay}s;
  `;
  const LodingInnerCircleStyle = `
    display: block;
    width: ${em(circleDiameter)};
    height: ${em(circleDiameter)};
    background: ${color};
    border-radius: 50%;
    ${
      scale
        ? `transform:scale(1.2);
          animation:${circleKeyframes} 2.5s infinite;
          animation-delay: 0.6s;
        `
        : `
        transform:scale(1);
        `
    }
  `;
  return {
    LodingWrapperStyle,
    LodingInnerStyle,
    LodingInnerCircleStyle,
  };
};
export const LodingWrapper = styled.div`
  ${props => getStyled(props).LodingWrapperStyle};
`;
export const LodingInner = styled.div`
  ${props => getStyled(props).LodingInnerStyle};
`;
export const LodingInnerCircle = styled.span`
  ${props => getStyled(props).LodingInnerCircleStyle};
`;
