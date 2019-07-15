/*
 * by wangcuixia
 * @flow
 * */
import { css } from 'styled-components';
import { valueInRange } from '../common/Math';
import { iconStyles, dotStyles } from './slider_public_size';
import { px2remcss } from '../css/units';
import {
  dotNormalColor,
  dotThroughColor,
  iconNormalColor,
  iconChangeColor,
} from './slider_public_color';
import CSSComponent from '@lugia/theme-css-hoc';
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
export const SliderBigBox = CSSComponent({
  tag: 'div',
  className: 'SliderContainer',
  normal: {
    selectNames: [
      ['border'],
      ['borderRadius'],
      ['background'],
      ['margin'],
      ['padding'],
      ['opacity'],
    ],
    getCSS(
      themeMate,
      {
        propsConfig: { vertical },
      }
    ) {
      const { width } = themeMate;
      const newWidth = width ? `${em(width)}` : 'auto';
      return vertical ? `height:${newWidth}` : `width:${newWidth}`;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['border'], ['borderRadius'], ['background'], ['opacity']],
  },
  css: css`
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
  `,
});
export const SliderBox = CSSComponent({
  tag: 'div',
  className: 'Div',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
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
export const SliderWrapper = CSSComponent({
  tag: 'div',
  className: 'SliderTrack',
  normal: {
    selectNames: [['background'], ['borderRadius'], ['border'], ['width'], ['height']],
  },
  hover: {
    selectNames: [['background']],
  },
  active: {
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
export const SliderInner = CSSComponent({
  tag: 'div',
  className: 'SliderPassedWay',
  normal: {
    selectNames: [['background'], ['borderRadius'], ['border']],
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
  active: {
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

export const Button = CSSComponent({
  tag: 'span',
  className: 'SliderButton',
  normal: {
    selectNames: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
    getCSS(themeMate, { propsConfig, themeConfig }) {
      const { width, height } = themeMate;
      const {
        normal: { width: normalW, height: normalH },
      } = themeConfig;
      return getButtonStyle({ ...propsConfig, width, height, normalW, normalH });
    },
  },
  hover: {
    selectNames: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
    getCSS(themeMate, { propsConfig, themeConfig }) {
      const { width, height } = themeMate;
      const {
        normal: { width: normalW, height: normalH },
      } = themeConfig;
      return getButtonStyle({ ...propsConfig, width, height, normalW, normalH });
    },
  },
  active: {
    selectNames: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
    getCSS(themeMate, { propsConfig, themeConfig }) {
      const { width, height } = themeMate;
      const {
        normal: { width: normalW, height: normalH },
      } = themeConfig;
      return getButtonStyle({ ...propsConfig, width, height, normalW, normalH });
    },
  },
  disabled: {
    selectNames: [['width'], ['height'], ['background'], ['border'], ['borderRadius']],
    getCSS(themeMate, { propsConfig, themeConfig }) {
      const { width, height } = themeMate;
      const {
        normal: { width: normalW, height: normalH },
      } = themeConfig;
      return getButtonStyle({ ...propsConfig, width, height, normalW, normalH });
    },
  },
  css: css`
    border-radius: 50%;
    position: absolute;
  `,
});
export const Tips = CSSComponent({
  tag: 'span',
  className: 'SliderTips',
  normal: {
    selectNames: [],
    getCSS(themeMate) {
      const { height } = themeMate;
      return `
        top: -${em(height + 10)};
      `;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
    getCSS(themeMate) {
      const { height } = themeMate;
      return `
        top: -${em(height + 10)};
      `;
    },
  },
  css: css`
    font-size: ${em(14)};
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
  `,
});
export const Tipinner = CSSComponent({
  tag: 'span',
  className: 'SliderTipsInner',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['border'],
      ['borderRadius'],
      ['background'],
      ['boxShadow'],
      ['color'],
      ['font'],
      ['fontSize'],
      ['padding'],
    ],
    getCSS(
      themeMate,
      {
        propsConfig: { tipsText },
      }
    ) {
      const {
        height,
        background: { color },
        border: { bottom: { color: bottomBorderColor } = {} } = {},
        boxShadow,
      } = themeMate;
      return `
        line-height:${em(height)};
        &::before{
          content:'${tipsText}';
          background:${color};          
        };
        
        &::after {
          background:${color};
          border-right-color:${bottomBorderColor};
          border-bottom-color:${bottomBorderColor};
          box-shadow:${boxShadow};
        }
      `;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['background'], ['color'], ['borderRadius'], ['border']],
    getCSS(themeMate) {
      const { height } = themeMate;
      return `
        line-height:${em(height)};
      `;
    },
  },
  css: css`
    display: block;
    min-width: ${em(25)};
    padding: 0 ${em(3)};
    user-select: none;
    -webkit-user-select: none;
    position: relative;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      border-radius: ${em(3)};
      padding: 0 ${em(3)};
      text-align: center;
    }

    &::after {
      content: '';
      display: block;
      width: ${em(12)};
      height: ${em(12)};
      position: absolute;
      left: 50%;
      bottom: -${em(3)};
      transform: translateX(-50%) rotate(45deg);
      border: 1px solid transparent;
    }
  `,
});
export const Dot = CSSComponent({
  tag: 'span',
  className: 'SliderMarks',
  normal: {
    selectNames: [['color'], ['font']],
    getCSS(themeMate, { propsConfig }) {
      const { color } = themeMate;
      const { dotPosition, dotBackground, dotW, dotH, marskText, dotTextPosition } = getDotStyle(
        propsConfig
      );
      return ` 
        ${dotPosition};  
        ${dotBackground};
        width:${dotW};
        height:${dotH};
       &::before{
        content:'${marskText}';
        ${dotTextPosition};
        color:${color};        
       }
      `;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['color'], ['font']],
    getCSS(themeMate) {
      const { color } = themeMate;
      return ` 
         &::before{
          color:${color};
         }
      `;
    },
  },

  css: css`
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    &::before {
      display: block;
      position: absolute;
    }
  `,
});
export const Icons = CSSComponent({
  tag: 'span',
  className: 'Icons',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    position: absolute;
    line-height: 0;
    ${props => getIconsStyle(props).iconPosition};
    ${props => getIconsStyle(props).changeColor};
    font-size: ${props => getIconsStyle(props).fontSize};
  `,
});

export const IconsInner = CSSComponent({
  className: 'IconsInner',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['color']],
  },
});

function getPaddingSize(props) {
  const { vertical, levelPaddings, sliderVerticalPaddings } = props;
  const left = vertical ? sliderVerticalPaddings[0] : levelPaddings[0];
  const right = vertical ? sliderVerticalPaddings[1] : levelPaddings[1];
  const top = vertical ? levelPaddings[1] : sliderVerticalPaddings[0];
  const bottom = vertical ? levelPaddings[0] : sliderVerticalPaddings[1];
  return `padding:${top}px ${right}px ${bottom}px ${left}px;`;
}
function getSliderInnerHeight(themeMate, propsConfig) {
  const { height } = themeMate;
  const { vertical } = propsConfig;
  return vertical ? `width:${em(height)};` : `height:${em(height)};`;
}

const getSliderInnerStyle = (props: CssTypeProps) => {
  const { rangeH, SliderInnerWidth, SliderInnerLeft } = props;
  const { vertical, value } = props;
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
  };
};
function getButtonPositionDisatance(normalSize, currentSize) {
  const differenceValue = normalSize - currentSize;
  const size = Math.abs(differenceValue) / 2;
  return differenceValue > 0 ? size : -size;
}
const getButtonStyle = (props: CssTypeProps) => {
  const { changeBackground, btnDisabled, vertical } = props;
  const { moveX, moveY, width = 0, height = 0, normalW = 0, normalH = 0 } = props;
  const isChangeBg = changeBackground && btnDisabled;
  const left = getButtonPositionDisatance(normalW, width);
  const top = getButtonPositionDisatance(normalH, height);
  const btnZIndex = `
  z-index:${isChangeBg ? '3' : '2'};
  `;
  const btnleft = vertical ? '50%' : `calc(${moveX}% + ${em(left)})`;
  const btnTorBot = vertical ? `bottom:calc(${moveY}% + ${em(top)})` : 'top: 50%';
  const btnTransform = vertical ? 'translateX' : 'translateY';
  const btnPosition = `
        left: ${btnleft};
        ${btnTorBot};
        transform: ${btnTransform}(-50%);
        -webkit-transform: ${btnTransform}(-50%);
        ${btnZIndex};
        transition:${transitionTime}s; 
      `;
  return btnPosition;
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
    const dotTextLeft = vertical ? 'left:calc(100% + 10px)' : 'left:50%';
    const dotTextTop = vertical ? '50%' : `-${em(distanceForSlider)}`;
    const dotTextTrans = vertical ? 'translateY(50%)' : 'translateX(-50%)';
    dotTextPosition = `
      font-size:${px2remcss(dotFontSize)};
      line-height:1;
      ${dotTextLeft};
      transform: ${dotTextTrans};
      -webkit-transform: ${dotTextTrans};
      bottom: ${dotTextTop};
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
    const distance = em(iconDistancen);
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
