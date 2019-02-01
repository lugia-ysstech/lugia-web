/*
 * by wangcuixia
 * @flow
 * */
import styled from 'styled-components';
import colorsFunc from '../css/stateColor';
import { valueInRange } from '../common/Math';
import { iconStyles, dotStyles } from './slider_public_size';
import { px2emcss } from '../css/units';
import {
  btnDisabledBackground,
  themeColor,
  throughRangeBackground,
  tipBackground,
  tipColor,
  trackBackground,
  trackDisabledBackground,
  dotNormalColor,
  dotThroughColor,
  iconNormalColor,
  iconChangeColor,
} from './slider_public_color';
import Widgets from '../consts';
import ThemeProvider from '../theme-provider';

const em = px2emcss(1.4);
type CssTypeProps = {
  background: string,
  changeBackground: boolean,
  getTheme: Function,
  moveY: number,
  btnWidth: number,
  btnHeight: number,
  SliderInnerWidth?: number,
  rangeW: number,
  rangeH: number,
  moveX: number,
  value: Array<number>,
  SliderInnerLeft?: number,
  btnDisabled?: boolean,
  disabled?: boolean,
  marksData?: Object,
  iconStyle?: Object,
  minValue: number,
  maxValue: number,
  vertical?: boolean,
};
const transitionTime = '0.1';
export const SliderBox = styled.div`
  box-sizing: border-box;
  font-size: 1.4rem;
  display: inline-block;
  vertical-align: top;
  ${props => getSliderWrapperStyle(props).paddingSize};
  ${props => getSliderWrapperStyle(props).MarginValue};
`;

export const SliderWrapper = ThemeProvider(
  styled.div`
    font-size: 1.4rem;
    width: ${props => getSliderWrapperStyle(props).rangeW};
    height: ${props => getSliderWrapperStyle(props).rangeH};
    background: ${props => getSliderWrapperStyle(props).wrapperBackground};
    border-radius: ${em(6)};
    position: relative;
  `,
  Widgets.Slider
);
export const SliderInner = styled.div`
  width: ${props => getSliderInnerStyle(props).InnerWidth};
  height: ${props => getSliderInnerStyle(props).InnerHeight};
  background: ${props => getSliderInnerStyle(props).innerBackground};
  border-radius: ${em(6)};
  position: absolute;
  transition: ${transitionTime}s;
  ${props => getSliderInnerStyle(props).sliderInnerPosition};
`;

export const Button = ThemeProvider(
  styled.span`
    width: ${props => getButtonStyle(props).btnWidth};
    height: ${props => getButtonStyle(props).btnHeight};
    border-radius: 50%;
    background: ${props => getButtonStyle(props).btnBackground};
    position: absolute;
    ${props => getButtonStyle(props).btnPosition};
  `,
  Widgets.SliderButton
);
//Button.displayName = Widgets.SliderButton;

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
  user-select: none;
  -webkit-user-select: none;
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
  ${props => getDotStyle(props).dotPosition};  
  z-index: 1;
  ${props => getDotStyle(props).dotBackground}; 
  width: ${props => getDotStyle(props).dotW};
  height: ${props => getDotStyle(props).dotH};
  &::before {
    content: '${props => getDotStyle(props).marskText}';
    display: block;
    position: absolute;
    ${props => getDotStyle(props).dotTextPosition}
  }
`;
export const Icons = ThemeProvider(
  styled.span`
    position: absolute;
    line-height: 0;
    ${props => getIconsStyle(props).iconPosition};
    ${props => getIconsStyle(props).changeColor};
    font-size: ${props => getIconsStyle(props).fontSize};
  `,
  Widgets.SliderIcon
);
function getMarginSize(vertical: boolean, LevelPaddings: number, sliderVerticalPaddings: number) {
  const left = vertical ? sliderVerticalPaddings[0] : LevelPaddings[0];
  const right = vertical ? sliderVerticalPaddings[1] : LevelPaddings[1];
  const top = vertical ? LevelPaddings[1] : sliderVerticalPaddings[0];
  const bottom = vertical ? LevelPaddings[0] : sliderVerticalPaddings[1];
  return `padding:${em(top)} ${em(right)} ${em(bottom)} ${em(left)};`;
}
const getSliderWrapperStyle = (props: CssTypeProps) => {
  const {
    changeBackground,
    disabled,
    vertical,
    getTheme,
    LevelPaddings,
    sliderVerticalPaddings,
  } = props;
  const wrapperBackground = changeBackground || disabled ? throughRangeBackground : trackBackground;
  const { margin } = getTheme();
  let MarginValue;
  if (margin && typeof margin === 'object') {
    const { top, left, bottom, right } = margin;
    MarginValue = `margin:${em(top)} ${em(right)} ${em(bottom)} ${em(left)}`;
  }
  if (margin && typeof margin === 'number') {
    MarginValue = `margin:${em(margin)}`;
  }
  let { rangeW, rangeH } = props;
  const rangwWidth = rangeW;
  const rangwHeight = rangeH;
  if (vertical) {
    rangeW = rangwHeight;
    rangeH = rangwWidth;
  }
  rangeW = em(Number(rangeW));
  rangeH = em(Number(rangeH));
  const paddingSize = getMarginSize(vertical, LevelPaddings, sliderVerticalPaddings);
  return {
    wrapperBackground,
    rangeW,
    rangeH,
    MarginValue,
    paddingSize,
  };
};
const getSliderInnerStyle = (props: CssTypeProps) => {
  let { rangeH, SliderInnerWidth, SliderInnerLeft } = props;
  const { vertical, value, disabled, changeBackground, getTheme } = props;
  const theme = getTheme(props);
  const background = theme.color || themeColor;
  const doneBackground = background; //轨道划过完成的颜色
  const { hoverColor: doingBackground } = colorsFunc(doneBackground);
  const innerBackground = disabled
    ? trackDisabledBackground
    : changeBackground
    ? doingBackground
    : doneBackground;
  SliderInnerWidth = Number(SliderInnerWidth);
  SliderInnerLeft = Number(SliderInnerLeft);

  let InnerWidth = SliderInnerWidth + '%';
  let InnerHeight = em(rangeH);
  let sliderInnerPosition = `
      left:${SliderInnerLeft}%;
      top:0;
  `;
  if (vertical) {
    InnerHeight = SliderInnerWidth + '%';
    InnerWidth = em(rangeH);
    const { length } = value;
    const left = length === 1 ? SliderInnerLeft : 0;
    const bottom = length === 1 ? 0 : SliderInnerLeft;
    sliderInnerPosition = `
        left:${left}%;
        bottom:${bottom}%;
      `;
  }
  return {
    InnerWidth,
    InnerHeight,
    sliderInnerPosition,
    innerBackground,
  };
};
const getButtonStyle = (props: CssTypeProps) => {
  const { innerBackground } = getSliderInnerStyle(props);
  const { changeBackground, btnDisabled, disabled, vertical, getTheme } = props;
  const { color } = getTheme();
  const background = color || themeColor;
  const doneBackground = background; //轨道划过完成的颜色
  let { btnWidth, btnHeight, moveX, moveY } = props;
  const isChangeBg = changeBackground && btnDisabled;

  const btnBackground = disabled
    ? btnDisabledBackground
    : isChangeBg
    ? innerBackground
    : doneBackground;

  if (isChangeBg) {
    btnWidth = btnWidth + 4;
    btnHeight = btnHeight + 4;
  }
  btnWidth = em(btnWidth);
  btnHeight = em(btnHeight);
  const newBtnWidth = vertical ? btnHeight : btnWidth;
  const newBtnHeight = vertical ? btnWidth : btnHeight;
  const btnZIndex = `
  z-index:${isChangeBg ? '3' : '2'};
  `;
  const btnleft = vertical ? 50 : moveX;
  const btnTorBot = vertical ? `bottom:${moveY}%` : 'top: 50%';
  const btnTransform = vertical ? 'translateX' : 'translateY';
  const btnPosition = `
        left: ${btnleft}%;
        ${btnTorBot};
        transform: ${btnTransform}(-50%);
        -webkit-transform: ${btnTransform}(-50%);
        ${btnZIndex};
        transition:${transitionTime}s; 
      `;
  return {
    btnWidth: newBtnWidth,
    btnHeight: newBtnHeight,
    btnBackground,
    btnPosition,
  };
};
const getDotStyle = (props: CssTypeProps) => {
  const { marksData } = props;
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
    const { dotIndex, value, maxValue, minValue, moveValue, marks, rangeW, rangeH } = marksData;
    isShowDot = dotIndex === maxValue || dotIndex === minValue;
    dotStyle = marks.style;
    marskText = marks.text || marks;
    isChangDotBg = moveValue >= dotIndex && !isShowDot;
    const { length } = value;
    let isBiger = value[0] >= dotIndex;
    if (length === 2) {
      isChangDotBg = valueInRange(dotIndex, value);
      isBiger = isChangDotBg;
    }
    let dotBorder = '#cccccc';
    let dotBg = '#ffffff';
    let dotColor = dotNormalColor;
    let dotFontSize = 14;
    if (isShowDot) {
      dotBorder = 'transparent';
      dotBg = 'none';
    }
    if (isChangDotBg) {
      dotBorder = 'transparent';
      dotBg = '#ffffff';
    }
    if (isBiger) {
      dotColor = dotThroughColor;
    }
    if (dotStyle && dotStyle.color) {
      dotColor = dotStyle.color;
    }
    if (dotStyle && dotStyle.fontSize) {
      dotFontSize = dotStyle.fontSize;
    }
    dotBackground = `
      border-width:${em(1)};
      border-style:solid;
      border-color:${dotBorder};
      background: ${dotBg};
    `;

    const { dotMoveX, vertical } = marksData;
    const dotPosLeft = vertical ? 50 : dotMoveX;
    const dotPosTorBot = vertical ? `bottom: ${dotMoveX}%` : 'top: 50%';
    const dotPosTrans = vertical ? 'translateX' : 'translateY';
    const { distanceForSlider } = dotStyles;
    const dotTextLeft = vertical ? px2emcss(1.4)(distanceForSlider) : '50%';
    const dotTextTop = vertical ? '50%' : px2emcss(1.4)(distanceForSlider);
    const dotTextTrans = vertical ? 'translateY' : 'translateX';
    dotTextPosition = `
      font-size:${px2emcss(1.4)(dotFontSize)};
      line-height:1;
      left: ${dotTextLeft};
      transform: ${dotTextTrans}(-50%);
      -webkit-transform: ${dotTextTrans}(-50%);
      top: ${dotTextTop};
      color:${dotColor};
    `;
    dotPosition = `
      font-size:1.4rem;
      left: ${dotPosLeft}%;
      ${dotPosTorBot};
      transform: ${dotPosTrans}(-50%);
      -webkit-transform: ${dotPosTrans}(-50%);
    `;
    dotW = em(Math.min(rangeH, rangeW));
    dotH = dotW;
  }
  return {
    dotStyle,
    marskText,
    isChangDotBg,
    dotBackground,
    dotPosition,
    dotTextPosition,
    dotW,
    dotH,
  };
};
const getIconsStyle = (props: CssTypeProps) => {
  const { value, iconStyle, minValue, maxValue, vertical } = props;
  const { fontSizeNormal } = iconStyles;
  let iconfontSize = fontSizeNormal;
  let iconColor = iconNormalColor;
  let iconPosition;
  let iconChangeColors = iconChangeColor;
  let changeColor;
  if (iconStyle && value && value.length === 1) {
    const middleVal = (minValue + maxValue) / 2;
    const { fontSize, iconDistancen } = iconStyle;
    if (iconStyle.style) {
      const { color = iconNormalColor, changeColor = iconChangeColor } = iconStyle.style;
      iconColor = color;
      iconChangeColors = changeColor;
    }
    iconfontSize = fontSize;
    const { index } = iconStyle;
    let iconPos;
    const iconCenterP = vertical ? 'left:50%' : 'top: 50%';
    const iconTrans = vertical ? 'translateX' : 'translateY';
    const theValue = value[0];
    const distance = px2emcss(fontSize / 10)(iconDistancen);
    if (index === 0) {
      iconPos = `${vertical ? 'bottom' : 'left'}:-${distance}`;
      if (theValue <= middleVal) {
        changeColor = `color:${iconChangeColors}`;
      } else {
        changeColor = `color:${iconColor};`;
      }
    } else {
      iconPos = `${vertical ? 'top' : 'right'}:-${distance}`;
      if (theValue >= middleVal) {
        changeColor = `color:${iconChangeColors}`;
      } else {
        changeColor = `color:${iconColor};`;
      }
    }
    iconPosition = `
      ${iconCenterP};
      transform: ${iconTrans}(-50%);
      -webkit-transform: ${iconTrans}(-50%);
      ${iconPos};
    `;
  }
  return {
    iconPosition,
    changeColor,
    fontSize: em(iconfontSize),
  };
};
