import styled, { keyframes } from 'styled-components';
import { px2emcss } from '../css/units';
import { FontSize, FontSizeNumber } from '../css/index';

export const em = px2emcss(FontSizeNumber);
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
      width:${em(width)};
      height:${em(width)};
      position:relative;
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
      animation: ${WrapperKeyframes} ${props.time}s infinite;
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
export const LodingBox = styled.div`
  display: inline-block;
`;
export const LodingWrapper = styled.div`
  ${props => getStyled(props).LodingWrapperStyle};
`;
export const LodingInner = styled.div`
  ${props => getStyled(props).LodingInnerStyle};
`;
export const LodingInnerCircle = styled.span`
  ${props => getStyled(props).LodingInnerCircleStyle};
`;
export const LoadingTip = styled.p`
  font-size: 1.4rem;
  line-height: ${em(24)};
  text-align: center;
  color: ${props => props.color};
`;
export const IconLoading = styled.span`
  display: block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: rotate ${props => props.time}s linear infinite;
  font-size: ${props => props.size}px;
  color: ${props => props.color};

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
