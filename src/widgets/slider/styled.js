/*
* by wangcuixia
* @flow
* */
import styled from 'styled-components';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';
import {
  btnDisabledBackground,
  themeColor,
  throughRangeBackground,
  tipBackground,
  tipColor,
  trackBackground,
  trackDisabledBackground,
} from './slider_public_color';
import Widgets from '../consts';
import ThemeProvider from '../theme-provider';

const em = px2emcss(1.2);
type CssTypeProps = {
  background?: string,
  changeBackground?: boolean,
  getTheme: Function,
  moveY?: number,
  btnWidth?: number,
  btnHeight?: number,
  SliderInnerWidth?: number,
  rangeW?: number,
  rangeH?: number,
  moveX?: number,
  value?: any,
  SliderInnerLeft?: number,
  btnDisabled?: boolean,
  disabled?: boolean,
  marksData?: Object,
  iconStyle?: Object,
  middleVal?: number,
  vertical?: boolean,
};
export const SliderWrapper = styled.div`
  width: ${props => getStyled(props).rangeW};
  height: ${props => getStyled(props).rangeH};
  background: ${props => getStyled(props).wrapperBackground};
  border-radius: ${em(6)};
  position: relative;
  display: inline-block;
`;
export const SliderInner = styled.div`
  width: ${props => getStyled(props).InnerWidth};
  height: ${props => getStyled(props).InnerHeight};
  background: ${props => getStyled(props).innerBackground};
  border-radius: ${em(6)};
  position: absolute;
  ${props => getStyled(props).sliderInnerPosition};
`;

export const Button = ThemeProvider(
  styled.span`
    width: ${props => getStyled(props).btnWidth};
    height: ${props => getStyled(props).btnHeight};
    border-radius: 50%;
    background: ${props => getStyled(props).btnBackground};
    position: absolute;
    ${props => getStyled(props).btnPosition};
  `,
  Widgets.SliderButton
);
Button.displayName = Widgets.SliderButton;

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
  border-radius: 50%;
  position: absolute;
  ${props => getStyled(props).dotPosition};  
  z-index: 1;  
  ${props => getStyled(props).dotStyle};
  ${props => getStyled(props).dotBackground}
  width: ${props => getStyled(props).dotW};
  height: ${props => getStyled(props).dotH};
  
  &::before {
    content: '${props => getStyled(props).marskText}';
    display: block;
    position: absolute;
    ${props => getStyled(props).dotTextPosition}
  }
`;
export const Icons = styled.span`
  position: absolute;
  top: 50%;
  line-height: 0;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  color: #ccc;
  ${props => getStyled(props).iconPosition}
  ${props => getStyled(props).changeColor}
  font-size: ${props => em(parseInt(props.iconStyle.style.fontSize))};
`;

export const getStyled = (props: CssTypeProps) => {
  const {
    changeBackground,
    value,
    btnDisabled,
    disabled,
    marksData,
    iconStyle,
    middleVal,
    vertical,
    getTheme,
  } = props;
  const theme = getTheme();
  const background = theme.color || themeColor;
  const doneBackground = background; //轨道划过完成的颜色
  const { hoverColor } = colorsFunc(doneBackground);
  const doingBackground = hoverColor; //轨道划过过程的颜色
  let {
    btnWidth,
    btnHeight,
    rangeW,
    rangeH,
    SliderInnerWidth,
    SliderInnerLeft,
    moveX,
    moveY,
  } = props;
  SliderInnerWidth = Number(SliderInnerWidth);
  SliderInnerLeft = Number(SliderInnerLeft);
  rangeH = parseInt(rangeH);
  moveX = Number(moveX);
  moveY = Number(moveY);
  let InnerWidth = SliderInnerWidth + '%';
  let InnerHeight = em(rangeH);
  let sliderInnerPosition = `
      left:${SliderInnerLeft}%;
      top:0;
  `;
  if (Array.isArray(value) && value.length === 2) {
    InnerWidth = SliderInnerWidth + '%';
    if (vertical) {
      InnerWidth = em(rangeH);
      InnerHeight = SliderInnerWidth + '%';
      sliderInnerPosition = `
      left:0;
      bottom:${SliderInnerLeft}%;
    `;
    }
  }
  const innerBackground = disabled
    ? trackDisabledBackground
    : changeBackground
      ? doingBackground
      : doneBackground;
  const wrapperBackground = changeBackground || disabled ? throughRangeBackground : trackBackground;
  const isChangeBg = changeBackground && btnDisabled;
  const btnBackground = disabled
    ? btnDisabledBackground
    : isChangeBg
      ? innerBackground
      : doneBackground;
  btnWidth = isChangeBg ? btnWidth + 4 * 1 : btnWidth;
  btnHeight = isChangeBg ? btnHeight + 4 * 1 : btnHeight;
  let isShowDot,
    dotStyle,
    marskText,
    isChangDotBg,
    dotBackground,
    dotPosition,
    dotTextPosition,
    dotW,
    dotH;
  if (marksData) {
    const { dotIndex, maxValue, minValue, moveValue, marks, rangeW, rangeH } = marksData;
    isShowDot = dotIndex === maxValue || dotIndex === minValue;
    dotStyle = marks.style;
    marskText = marks.text || marks;
    isChangDotBg = moveValue >= dotIndex && !isShowDot;
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
    const { dotMoveX, vertical } = marksData;
    dotPosition = `
      left: ${dotMoveX}%;
      top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
    `;
    dotTextPosition = `
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      top: ${em(12)};
    `;
    if (vertical) {
      dotPosition = `
        left: 50%;
        bottom: ${dotMoveX}%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
    `;
      dotTextPosition = `
        left: ${em(15)};
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        top: 50%;
      `;
      dotW = rangeW;
      dotH = rangeW;
    }
    dotW = rangeH;
    dotH = rangeH;
    dotW = em(Number(dotW));
    dotH = em(Number(dotH));
  }

  let iconPosition;
  let changeColor;
  if (iconStyle && value && value.length === 1) {
    const emTimes = parseInt(iconStyle.style.fontSize) / 12;
    const positionValue = em((parseInt(iconStyle.style.fontSize) + 22) / emTimes);
    if (iconStyle.position === 'left') {
      iconPosition = `
        left:-${positionValue};
      `;
      if (value[0] <= middleVal) {
        changeColor = 'color:#999;';
      }
    } else {
      iconPosition = `
        right:-${positionValue};
      `;
      if (value[0] > middleVal) {
        changeColor = 'color:#999;';
      }
    }
  }

  const rangwWidth = rangeW;
  const rangwHeight = rangeH;
  const btnZIndex = `
  z-index:${isChangeBg ? '3' : '2'};
  `;
  let btnPosition = `
    left: ${moveX}%;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    ${btnZIndex}
  `;
  if (vertical) {
    rangeW = rangwHeight;
    rangeH = rangwWidth;
    if (value && value.length === 1) {
      InnerWidth = em(rangwHeight);
      InnerHeight = SliderInnerWidth + '%';
      sliderInnerPosition = `
        left:${SliderInnerLeft}%;
        bottom:0;
    `;
    }
    btnPosition = `
      left: 50%;
      bottom: ${moveY}% ;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      ${btnZIndex}
    `;
  }
  rangeW = em(Number(rangeW));
  rangeH = em(Number(rangeH));
  btnWidth = em(Number(btnWidth));
  btnHeight = em(Number(btnHeight));

  return {
    InnerWidth,
    InnerHeight,
    SliderInnerLeft,
    sliderInnerPosition,
    innerBackground,
    wrapperBackground,
    btnWidth,
    btnHeight,
    btnBackground,
    isShowDot,
    dotStyle,
    dotW,
    dotH,
    marskText,
    isChangDotBg,
    dotBackground,
    iconPosition,
    changeColor,
    rangeW,
    rangeH,
    btnPosition,
    dotPosition,
    dotTextPosition,
  };
};
