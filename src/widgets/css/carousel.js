/**
 * create by szfeng
 *
 * @flow
 */
import { px2remcss } from '../css/units';
import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';

export const defaultWidth = 400;
export const defaultHeight = 200;
export const defaultButtonFontSize = 30;
export const defaultButtonPadding = 20;

const buttonCSS = `
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 200;
      border-radius: 50%;
      transition: all 0.2s linear;
`;

export const PreButton = CSSComponent({
  tag: 'span',
  className: 'PreButton',
  normal: {
    selectNames: [['boxShadow'], ['margin'], ['border'], ['opacity']],
    getCSS: (themeMeta, themeProps) => {
      const { font = {} } = themeMeta;
      const { size = defaultButtonFontSize } = font;
      return `
        left: -${px2remcss(size)};
        width: ${px2remcss(size)};
        height: ${px2remcss(size)}
        `;
    },
  },
  hover: {
    selectNames: [['boxShadow'], ['border'], ['opacity']],
    defaultTheme: {},
  },
  css: css`
    ${buttonCSS};
    z-index: 1000;
  `,
  option: { hover: true },
});

PreButton.displayName = 'PreButton';

export const NextButton = CSSComponent({
  tag: 'span',
  className: 'NextButton',
  normal: {
    selectNames: [['boxShadow'], ['margin'], ['border'], ['opacity']],
    getCSS: (themeMeta, themeProps) => {
      const { font = {} } = themeMeta;
      const { size = defaultButtonFontSize } = font;
      return `
        right: -${px2remcss(size)};
        width: ${px2remcss(size)};
        height: ${px2remcss(size)}
        `;
    },
  },
  hover: {
    selectNames: [['boxShadow'], ['border'], ['opacity']],
  },
  css: css`
    ${buttonCSS};
    z-index: 1000;
  `,
  option: { hover: true },
});

NextButton.displayName = 'NextButton';

export const Wrap = CSSComponent({
  tag: 'div',
  className: 'Wrap',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['borderRadius'],
      ['boxShadow'],
      ['border'],
      ['opacity'],
      ['margin'],
      ['border'],
      ['padding'],
    ],
    defaultTheme: {
      width: defaultWidth,
      height: defaultHeight,
    },
  },
  hover: {
    selectNames: [['opacity'], ['boxShadow'], ['boxShadow'], ['borderRadius'], ['border']],
  },
  css: css`
    position: relative;
    box-sizing: content-box;
  `,
});

export const CarouselContainer = CSSComponent({
  tag: 'div',
  className: 'carouselContainer',
  normal: {
    selectNames: [['width'], ['height']],
    defaultTheme: {
      width: defaultWidth,
      height: defaultHeight,
    },
  },
  hover: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { preButtonFontSize, nextButtonFontSize } = propsConfig;
      const leftTrans = preButtonFontSize + defaultButtonPadding;
      const rightTrans = nextButtonFontSize + defaultButtonPadding;
      return `
      &:hover > span:nth-child(1) {
        transform: translate(${px2remcss(leftTrans)}, -50%);
        opacity: 0.6;
      }
    
      &:hover > span:nth-child(2) {
        transform: translate(-${px2remcss(rightTrans)}, -50%);
        opacity: 0.6;
      }
      `;
    },
  },
  css: css`
    overflow: hidden;
    position: relative;
    width: ${px2remcss(defaultWidth)};
    height: ${px2remcss(defaultHeight)};
  `,
});

const getIndicatorWrapCSS = (indicatorType: string, width: number, height: number) => {
  return indicatorType === 'vertical'
    ? `
  right: ${px2remcss(0)};
  top: 50%;
  transform: translateY(-50%);
  `
    : indicatorType === 'outside'
    ? `
    top: ${px2remcss(height)};
    left: 50%;
    transform: translateX(-50%);
    `
    : `
  bottom: ${px2remcss(0)};
  left: 50%;
  transform: translateX(-50%);
  `;
};

export const IndicatorWrap = CSSComponent({
  tag: 'div',
  className: 'IndicatorWrap',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { indicatorType, width, height } = propsConfig;
      const indicatorContainerCSS = getIndicatorWrapCSS(indicatorType, width, height);
      return indicatorContainerCSS;
    },
  },
  hover: {
    selectNames: [],
  },
  css: `
    margin: 0;
    padding: 0;
    position: absolute;
    z-index: 100;
  `,
});
IndicatorWrap.displayName = 'IndicatorWrap';

const getIndicatorContainerCSS = (indicatorType: string) => {
  return indicatorType === 'vertical'
    ? `
         display: block;
         padding-right: ${px2remcss(10)};
        `
    : indicatorType === 'outside'
    ? `
    display: inline-block;
    padding-top: ${px2remcss(0)};
    `
    : `
         display: inline-block;
         padding-bottom: ${px2remcss(10)};
        `;
};

export const IndicatorContainer = CSSComponent({
  tag: 'div',
  className: 'IndicatorContainer',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { indicatorType } = propsConfig;
      const indicatorWrapCSS = getIndicatorContainerCSS(indicatorType);
      return indicatorWrapCSS;
    },
  },
  hover: {
    selectNames: [],
  },
  css: `
    cursor: pointer;
  `,
});

IndicatorContainer.displayName = 'IndicatorContainer';

const defaultIndicatorCSS = `
width: ${px2remcss(20)};
height: ${px2remcss(2)};
display: inline-block;
margin: 0 ${px2remcss(3)};
`;
const verticalIndicatorCSS = `
width: ${px2remcss(2)};
height: ${px2remcss(20)};
display: block;
margin: ${px2remcss(3)} 0;
`;

const getIndicatorCSS = (indicatorType: string) => {
  return indicatorType === 'vertical' ? verticalIndicatorCSS : defaultIndicatorCSS;
};

const getBackground = (themeConfig: Object) => {
  const { normal = {}, hover = {} } = themeConfig;
  const { background: defaultBg = {} } = normal;
  const { background: checkedBg = {} } = hover;
  const { color: defaultColor = '#999' } = defaultBg;
  const { color: checkedColor = '#ddd' } = checkedBg;
  return {
    defaultColor,
    checkedColor,
  };
};

export const Indicator = CSSComponent({
  tag: 'div',
  className: 'indicator',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['margin'],
      ['padding'],
      ['opacity'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig, themeConfig } = themeProps;

      const { animationTime, indicatorType, checked } = propsConfig;
      const indicatorCSS = getIndicatorCSS(indicatorType);

      const { defaultColor, checkedColor } = getBackground(themeConfig);
      const backgroundColor = checked ? checkedColor : defaultColor;

      return `
        transition: all ${animationTime}s;
        ${indicatorCSS};
        background: ${backgroundColor};
      `;
    },
  },
  hover: {
    selectNames: [['opacity'], ['border'], ['borderRadius'], ['boxShadow']],
  },
  css: `
    border-radius: ${px2remcss(2)};
  `,
  option: { hover: true },
});

Indicator.displayName = 'indicator';

const getAnimation = (
  switchType: string,
  preStart: number,
  nextStart: number,
  width: number,
  height: number
) => {
  if (nextStart === preStart || switchType === 'fade') {
    return null;
  }

  const unit = switchType === 'vertical' ? height : width;

  const nowTrans = -(preStart * unit);

  const addTrans = (nextStart - preStart) * unit;

  const toTrans = nowTrans - addTrans;

  let animation;
  if (switchType === 'vertical') {
    animation = keyframes`
      0% {
        top: ${px2remcss(nowTrans)};
      }
      100% {
        top: ${px2remcss(toTrans)};
      }
    `;
  } else {
    animation = keyframes`
      0% {
        left: ${px2remcss(nowTrans)};
      }
      100% {
        left: ${px2remcss(toTrans)};
      }
    `;
  }

  return animation;
};

export const AllItemsContainer = CSSComponent({
  tag: 'div',
  className: 'AllItemsContainer',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const {
        width,
        height,
        switchType,
        preStart,
        nextStart,
        animationTime,
      } = themeProps.propsConfig;
      const animation = getAnimation(switchType, preStart, nextStart, width, height);
      return css`
        animation: ${animation} ${animationTime}s linear;
        animation-fill-mode: forwards;
      `;
    },
    getStyle: (themeMeta, themeProps) => {
      const { switchType, len, width, height } = themeProps.propsConfig;
      const isFade = switchType === 'fade';
      const isVertical = switchType === 'vertical';
      const activeWidth = isVertical || isFade ? width : width * (len + 1);
      const activeHeight = isVertical ? height * (len + 1) : height;
      return {
        width: activeWidth,
        height: activeHeight,
        background: '#ccc',
      };
    },
  },
  hover: {
    selectNames: [],
  },
  css: `
    position: absolute;
    z-index: 1;
  `,
});

export const ItemWrap = CSSComponent({
  tag: 'div',
  className: 'itemWrap',
  normal: {
    selectNames: [['width'], ['height']],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { switchType, checked, animationTime } = propsConfig;
      const isFade = switchType === 'fade';
      const positionType = isFade ? 'absolute' : 'relative';
      const opacity = isFade && !checked ? 0 : 1;
      return `
        position: ${positionType};
        opacity: ${opacity}
        transition: opacity ${animationTime}s
      `;
    },
  },
  hover: {
    selectNames: [],
  },
  css: css`
    overflow: hidden;
    vertical-align: top;
    display: inline-block;
    width: ${px2remcss(defaultWidth)};
    height: ${px2remcss(defaultHeight)};
    opacity: 1;
  `,
});

export const Empty = CSSComponent({
  tag: 'div',
  className: 'empty',
  normal: {
    selectNames: [['width'], ['height']],
    getCSS: themeMeta => {
      const { height } = themeMeta;
      return `line-height: ${px2remcss(height)};`;
    },
  },
  hover: {
    selectNames: [],
  },
  css: css`
    display: block;
    width: ${px2remcss(defaultWidth)};
    height: ${px2remcss(defaultHeight)};
    line-height: ${px2remcss(defaultHeight)};
    text-align: center;
    background: #161651;
    color: #fff;
    font-size: ${px2remcss(12)};
  `,
});
