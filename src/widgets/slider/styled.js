/*
 * by wangcuixia
 * @flow
 * */
import styled, { css } from 'styled-components';
// import colorsFunc from '../css/stateColor';
import { valueInRange } from '../common/Math';
import { iconStyles, dotStyles } from './slider_public_size';
import { px2remcss } from '../css/units';
import {
  btnDisabledBackground,
  // themeColor,
  // throughRangeBackground,
  tipBackground,
  tipColor,
  // trackBackground,
  // trackDisabledBackground,
  dotNormalColor,
  dotThroughColor,
  iconNormalColor,
  iconChangeColor,
} from './slider_public_color';
import Widgets from '../consts';
import ThemeProvider from '../theme-provider';
import CSSProvider from '../theme/CSSProvider';

const em = px2remcss;
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
export const SliderBigBox = CSSProvider({
  tag: 'div',
  normal: {
    selectNames: [['border'], ['background'], ['width'], ['height'], ['margin'], ['padding']],
    getCSS(
      themeMate,
      {
        propsConfig: { vertical },
      }
    ) {
      const { width } = themeMate;
      return `
        ${vertical ? 'height' : 'width'}:${em(width)};
        ${vertical ? 'width' : 'height'}:'';
      `;
    },
  },
  hover: {
    selectNames: [['border'], ['background']],
  },
  actived: {
    selectNames: [['border'], ['background']],
  },
  disabled: {
    selectNames: [['border'], ['background']],
  },
  css: css`
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
  `,
});
export const SliderBox = CSSProvider({
  tag: 'div',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  actived: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    box-sizing: border-box;
    font-size: 1.4rem;
    display: inline-block;
    vertical-align: top;
    ${props => getPaddingSize(props)};
  `,
});
//${props => getSliderWrapperStyle(props).MarginValue};
export const SliderWrapper = CSSProvider({
  tag: 'div',
  className: 'SliderTrack',
  normal: {
    selectNames: [['background'], ['borderRadius'], ['border']],
    getCSS(themeMate) {
      return {
        ...themeMate,
      };
    },
  },
  hover: {
    selectNames: [['background']],
  },
  actived: {
    selectNames: [['background']],
  },
  disabled: {
    selectNames: [['background']],
  },
  css: css`
    font-size: 1.4rem;
    position: relative;
  `,
});
//width: ${props => getSliderWrapperStyle(props).rangeW};
//     height: ${props => getSliderWrapperStyle(props).rangeH};
//background-color: ${props => getSliderWrapperStyle(props).wrapperBackground};
export const SliderInner = CSSProvider({
  tag: 'div',
  className: 'SliderPassedWay',
  normal: {
    selectNames: [['background'], ['border']],
    getCSS(themeMate, themeProps) {
      const { propsConfig } = themeProps;
      const size = getSliderInnerHeight(themeMate, propsConfig);
      const { InnerWidth, InnerHeight, sliderInnerPosition } = getSliderInnerStyle(propsConfig);

      return `
        width:${InnerWidth};
        height:${InnerHeight};
        ${size};
        ${sliderInnerPosition};
      `;
    },
  },
  hover: {
    selectNames: [['background']],
    getCSS(themeMate, themeProps) {
      const { propsConfig } = themeProps;
      return getSliderInnerHeight(themeMate, propsConfig);
    },
  },
  actived: {
    selectNames: [['background']],
    getCSS(themeMate, themeProps) {
      const { propsConfig } = themeProps;
      return getSliderInnerHeight(themeMate, propsConfig);
    },
  },
  disabled: {
    selectNames: [['background']],
    getCSS(themeMate, themeProps) {
      const { propsConfig } = themeProps;
      return getSliderInnerHeight(themeMate, propsConfig);
    },
  },
  css: css`
    border-radius: ${em(6)};
    position: absolute;
    transition: ${transitionTime}s;
  `,
});
// width: ${props => getSliderInnerStyle(props).InnerWidth};
// ${props => getSliderInnerStyle(props).sliderInnerPosition};
//     height: ${props => getSliderInnerStyle(props).InnerHeight};
//background: ${props => getSliderInnerStyle(props).innerBackground};

export const Button = CSSProvider({
  tag: 'span',
  className: 'SliderButton',
  normal: {
    selectNames: [['width'], ['height'], ['background']],
  },
  hover: {
    selectNames: [['width'], ['height'], ['background']],
  },
  actived: {
    selectNames: [['width'], ['height'], ['background']],
  },
  disabled: {
    selectNames: [['width'], ['height'], ['background']],
  },
  css: css`
    border-radius: 50%;
    background-color: ${props => getButtonStyle(props).btnBackground};
    position: absolute;
    ${props => getButtonStyle(props).btnPosition};
  `,
});
//width: ${props => getButtonStyle(props).btnWidth};
//height: ${props => getButtonStyle(props).btnHeight};
export const Tips = CSSProvider({
  tag: 'span',
  normal: {
    selectNames: [],
  },
  css: css`
    font-size: ${em(14)};
    text-align: center;
    position: absolute;
    left: 50%;
    top: -50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  `,
});
export const Tipinner = CSSProvider({
  tag: 'span',
  className: 'SliderTips',
  normal: {
    selectNames: [
      ['border'],
      ['borderRadius'],
      ['background'],
      ['boxShadow'],
      ['color'],
      ['font'],
      ['fontSize'],
    ],
  },
  css: css`
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
  `,
});
export const Tiparrow = CSSProvider({
  tag: 'span',
  normal: {
    selectNames: [],
    getCSS(themeMate) {
      const { background: { backgroundColor } = {} } = themeMate;
      return `
         border-top-color:${backgroundColor};
      `;
    },
  },
  css: css`
    display: inline-block;
    vertical-align: top;
    border-top: ${em(6)} solid ${tipBackground};
    border-left: ${em(5)} solid transparent;
    border-right: ${em(5)} solid transparent;
    border-bottom: ${em(5)} solid transparent;
  `,
});
export const Dot = CSSProvider({
  tag: 'span',
  normal: {
    selectNames: [],
  },
  css: css`
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
  `,
});
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
function getPaddingSize(props) {
  const { vertical, levelPaddings, sliderVerticalPaddings } = props;
  const left = vertical ? sliderVerticalPaddings[0] : levelPaddings[0];
  const right = vertical ? sliderVerticalPaddings[1] : levelPaddings[1];
  const top = vertical ? levelPaddings[1] : sliderVerticalPaddings[0];
  const bottom = vertical ? levelPaddings[0] : sliderVerticalPaddings[1];
  return `padding:${top}px ${right}px ${bottom}px ${left}px;`;
}
// const getSliderWrapperStyle = (props: CssTypeProps) => {
//   const { changeBackground, disabled, vertical } = props;
//   const wrapperBackground = changeBackground || disabled ? throughRangeBackground : trackBackground;
//   let { rangeW, rangeH } = props;
//   const rangwWidth = rangeW;
//   const rangwHeight = rangeH;
//   if (vertical) {
//     rangeW = rangwHeight;
//     rangeH = rangwWidth;
//   }
//   rangeW = em(Number(rangeW));
//   rangeH = em(Number(rangeH));
//   return {
//     wrapperBackground,
//     rangeW,
//     rangeH,
//   };
// };
function getSliderInnerHeight(themeMate, propsConfig) {
  const { height } = themeMate;
  const { vertical } = propsConfig;
  return vertical ? `width:${em(height)};` : `height:${em(height)};`;
}

const getSliderInnerStyle = (props: CssTypeProps) => {
  const { rangeH, SliderInnerWidth, SliderInnerLeft } = props;
  const { vertical, value } = props;
  // const theme = getTheme(props);
  // const background = themeColor;
  // const doneBackground = background; //轨道划过完成的颜色
  // const { hoverColor: doingBackground } = colorsFunc(doneBackground);
  // const innerBackground = disabled
  //   ? trackDisabledBackground
  //   : changeBackground
  //   ? doingBackground
  //   : doneBackground;
  // SliderInnerWidth = Number(SliderInnerWidth);
  // SliderInnerLeft = Number(SliderInnerLeft);

  let InnerWidth = SliderInnerWidth + '%';
  let InnerHeight = em(rangeH);
  let sliderInnerPosition = `
      left:${SliderInnerLeft}%;
      top:50%;
      transform:translateY(-50%);
  `;
  if (vertical) {
    InnerHeight = SliderInnerWidth + '%';
    InnerWidth = em(rangeH);
    const { length } = value;
    const left = length === 1 ? SliderInnerLeft : 0;
    const bottom = length === 1 ? 0 : SliderInnerLeft;
    sliderInnerPosition = `
        left:50%;
        bottom:${bottom}%;
        transform:translateX(-50%);
      `;
  }
  return {
    InnerWidth,
    InnerHeight,
    sliderInnerPosition,
    //innerBackground,
  };
};
const getButtonStyle = (props: CssTypeProps) => {
  const { innerBackground } = getSliderInnerStyle(props);
  const { changeBackground, btnDisabled, disabled, vertical, getTheme } = props;
  // const { color } = getTheme();
  // const background = color || themeColor;
  const doneBackground = innerBackground; //轨道划过完成的颜色
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
    const dotTextLeft = vertical ? px2remcss(distanceForSlider) : '50%';
    const dotTextTop = vertical ? '50%' : px2remcss(distanceForSlider);
    const dotTextTrans = vertical ? 'translateY' : 'translateX';
    dotTextPosition = `
      font-size:${px2remcss(dotFontSize)};
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
    const distance = px2remcss(iconDistancen);
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
