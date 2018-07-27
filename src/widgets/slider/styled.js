/*
* by wangcuixia
* @flow
* */
import styled from 'styled-components';
import { px2emcss } from '../css/units';
import {
  trackBackground,
  doneBackground,
  doingBackground,
  throughRangeBackground,
  trackDisabledBackground,
  btnDisabledBackground,
  tipBackground,
  tipColor,
} from './slider_public_color';

const em = px2emcss(1.2);
type CssTypeProps = {
  background?: string,
  changeBackground?: boolean,
  moveY?: number,
  btnWidth?: number,
  btnHeight?: number,
  SliderInnerWidth?: number,
  rangeW?: number,
  moveX?: number,
  value?: any,
  SliderInnerLeft?: number,
  btnDisabled?: boolean,
  disabled?: boolean,
  marksData?: Object,
};
export const SliderWrapper = styled.div`
  width: ${props => props.rangeW}px;
  height: ${props => props.rangeH}px;
  background: ${props => getStyled(props).wrapperBackground};
  margin-left: ${em(50)};
  border-radius: ${em(6)};
  position: relative;
`;
export const SliderInner = styled.div`
  width: ${props => getStyled(props).InnerWidth}%;
  height: ${props => props.rangeH}px;
  background: ${props => getStyled(props).innerBackground};
  border-radius: ${em(6)};
  position: absolute;
  left: ${props => getStyled(props).SliderInnerLeft}%;
  top: 0;
`;
export const Button = styled.span`
  width: ${props => getStyled(props).btnWidth}px;
  height: ${props => getStyled(props).btnHeight}px;
  border-radius: 50%;
  background: ${props => getStyled(props).btnBackground};
  position: absolute;
  left: ${props => props.moveX}%;
  top: ${props => (props.changeBackground && props.btnDisabled ? props.moveY - 3 : props.moveY)}px;
  transform: translateX(-50%);
  z-index: 2;
`;
export const Tips = styled.span`
  font-size: ${em(14)};
  text-align: center;
  position: absolute;
  left: 50%;
  top: -${em(40)};
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
`;
export const Tipinner = styled.span`
  display: block;
  min-width: ${em(21)};
  height: ${em(27)};
  line-height: ${em(27)};
  padding: 0 ${em(3)};
  background: ${tipBackground};
  color: ${tipColor};
  border-radius: ${em(3)};
`;
export const Tiparrow = styled.span`
  display: inline-block;
  vertical-align: top;
  border-top: ${em(6)} solid ${tipBackground};
  border-left: ${em(5)} solid transparent;
  border-right: ${em(5)} solid transparent;
  border-bottom: ${em(5)} solid transparent;
`;
export const Dot = styled.span`
  width: 6px;
  height: 6px;  
  border-radius: 50%;
  position: absolute;
  left: ${props => props.marksData.dotMoveX}%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  z-index: 1;  
  ${props => getStyled(props).dotStyle}
  ${props => getStyled(props).dotBackground}
  
  &:before {
    content: '${props => getStyled(props).marskText}';
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    top: 10px;
  }
`;

const getStyled = (props: CssTypeProps) => {
  const {
    changeBackground,
    SliderInnerWidth,
    moveX,
    value,
    SliderInnerLeft,
    btnDisabled,
    disabled,
    background,
    marksData,
  } = props;
  let { btnWidth, btnHeight } = props;
  let InnerWidth = moveX;
  if (Array.isArray(value) && value.length === 2) {
    InnerWidth = SliderInnerWidth;
  }
  const innerBackground = disabled
    ? trackDisabledBackground
    : changeBackground
      ? doingBackground
      : background;
  const wrapperBackground = changeBackground || disabled ? throughRangeBackground : trackBackground;
  const isChangeBg = changeBackground && btnDisabled;
  const btnBackground = disabled
    ? btnDisabledBackground
    : isChangeBg
      ? innerBackground
      : background;
  btnWidth = isChangeBg ? btnWidth + 6 * 1 : btnWidth;
  btnHeight = isChangeBg ? btnHeight + 6 * 1 : btnHeight;
  let isShowDot, dotStyle, marskText, isChangDotBg, dotBackground;
  if (marksData) {
    isShowDot = marksData.dotIndex === marksData.maxValue || marksData.index === marksData.minValue;
    dotStyle = marksData.marks.style;
    marskText = marksData.marks.text || marksData.marks;
    isChangDotBg = marksData.moveValue >= marksData.index && !isShowDot;
    if (isShowDot) {
      dotBackground = `
        border: none;
        background: none;
      `;
    } else {
      dotBackground = `
        border: 1px solid #cccccc;
        background: #fff;
      `;
    }
    if (isChangDotBg) {
      dotBackground = `
        border: none;
        background: #fff;
      `;
    }
  }
  return {
    InnerWidth,
    SliderInnerLeft,
    innerBackground,
    wrapperBackground,
    btnWidth,
    btnHeight,
    btnBackground,
    isShowDot,
    dotStyle,
    marskText,
    isChangDotBg,
    dotBackground,
  };
};
