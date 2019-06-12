/**
 * create by szfeng
 *
 * @flow
 */
import styled, { css, keyframes } from 'styled-components';
import { FontSizeNumber } from '../css';
import { px2emcss } from '../css/units';
import Icon from '../icon';
import colorsFunc from '../css/stateColor';
import CSSProvider from '../theme/CSSProvider';

const { lightGreyColor, mediumGreyColor, defaultColor } = colorsFunc();
const em = px2emcss(FontSizeNumber);

export const defaultWidth = 400;
export const defaultHeight = 200;

type CarouselProps = {
  getTheme?: Function,
  start?: number,
  autoPlay?: boolean,
  delay?: number,
  action?: 'hover' | 'click',
  indicatorType?: 'horizontal' | 'vertical' | 'outside',
  preStart?: number,
  nextStart?: number,
  width?: number,
  height?: number,
  switchType?: 'horizontal' | 'vertical' | 'fade',
  initStart?: number,
  checked: boolean,
  animationTime: number,
  activeWidth?: number,
  activeHeight?: number,
};

// export const CommonButton = styled.span`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   width: ${em(30)};
//   height: ${em(30)};
//   z-index: 200;
//   border-radius: 50%;
//   transition: all 0.2s linear;
// `;

export const CommonButton = CSSProvider({
  tag: 'span',
  normal: {
    selectNames: [],
  },
  css: css`
    width: ${em(30)};
    height: ${em(30)};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: red;
    z-index: 200;
    border-radius: 50%;
    transition: all 0.2s linear;
  `,
});

// export const PreButton = styled(CommonButton)`
//   left: -${em(30)};
// `;
export const PreButton = CSSProvider({
  extend: CommonButton,
  css: css`
    left: -${em(30)};
  `,
});

PreButton.displayName = 'preButton';

// export const NextButton = styled(CommonButton)`
//   right: -${em(30)};
// `;

export const NextButton = CSSProvider({
  extend: CommonButton,
  css: css`
    right: -${em(30)};
  `,
});

NextButton.displayName = 'nextButton';

export const SwitchIcon: Object = styled(Icon)`
  font-size: ${em(30)};
  color: ${lightGreyColor};
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;

const getShadowWidth = (props: CarouselProps) => {
  const { width = 0 } = props;
  return `width: ${em(width)}`;
};

const getShadowHeight = (props: CarouselProps) => {
  const { height = 0 } = props;
  return `height: ${em(height)}`;
};

const getWrapWidthAndHeight = (props: CarouselProps) => {
  const { width = 0, height = 0 } = props;
  return `width: ${em(width)};height: ${em(height)}`;
};

const getWrapPadding = (props: CarouselProps) => {
  const { indicatorType } = props;
  return `padding-bottom: ${indicatorType === 'outside' ? em(15) : 0}`;
};
// export const Wrap = styled.div`
//   box-sizing: content-box;
//   position: relative;
//   ${getWrapWidthAndHeight};
//   ${getWrapPadding};
// `;

export const Wrap = CSSProvider({
  tag: 'div',
  normal: {
    selectNames: [['width'], ['height']],
  },
  css: css`
    position: relative;
    box-sizing: content-box;
    width: ${em(defaultWidth)};
    height: ${em(defaultHeight)};
  `,
});

// export const CarouselContainer = styled.div`
//   ${getShadowWidth};
//   ${getShadowHeight};
//   overflow: hidden;
//   position: relative;

//   &:hover > span:nth-child(1) {
//     transform: translate(${em(50)}, -50%);
//   }

//   &:hover > span:nth-child(2) {
//     transform: translate(-${em(50)}, -50%);
//   }
// `;

export const CarouselContainer = CSSProvider({
  tag: 'div',
  className: 'carouselContainer',
  normal: {
    selectNames: [['width'], ['height']],
  },
  hover: {
    getCSS: () => {
      return `
      &:hover > span:nth-child(1) {
        transform: translate(${em(50)}, -50%);
      }
    
      &:hover > span:nth-child(2) {
        transform: translate(-${em(50)}, -50%);
      }
      `;
    },
  },
  css: css`
    overflow: hidden;
    position: relative;
    background: #999;
    width: ${em(defaultWidth)};
    height: ${defaultHeight};
  `,
});

const getIndicatorContainerCSS = (props: CarouselProps) => {
  const { indicatorType } = props;
  return indicatorType === 'vertical'
    ? `
  right: ${em(0)};
  top: 50%;
  transform: translateY(-50%);
  `
    : `
  bottom: ${em(0)};
  left: 50%;
  transform: translateX(-50%);
  `;
};

export const IndicatorContainer = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  ${getIndicatorContainerCSS};
  z-index: 100;
`;

const getIndicatorBackground = (props: CarouselProps) => {
  const { checked, indicatorType } = props;
  return !checked
    ? `background: ${lightGreyColor}; opacity: 0.6;`
    : indicatorType === 'outside'
    ? `background : ${mediumGreyColor}`
    : `background : ${defaultColor}`;
};

const getIndicatorWrapCSS = (props: CarouselProps) => {
  const { indicatorType } = props;
  return indicatorType === 'vertical'
    ? `
         display: block;
         padding-right: ${em(10)};
        `
    : indicatorType === 'outside'
    ? `
    display: inline-block;
    padding-top: ${em(10)};
    `
    : `
         display: inline-block;
         padding-bottom: ${em(10)};
        `;
};

export const IndicatorWrap = styled.div`
  ${getIndicatorWrapCSS};
  cursor: pointer;
`;
IndicatorWrap.displayName = 'indicatorWrap';

const getIndicatorCSS = (props: CarouselProps) => {
  const { indicatorType } = props;
  return indicatorType === 'vertical'
    ? `width: ${em(2)};
         height: ${em(20)};
         display: block;
         margin: ${em(3)} 0;
        `
    : `
        width: ${em(20)};
         height: ${em(2)};
         display: inline-block;
         margin: 0 ${em(3)};
        `;
};

const getAnimationTime = (props: CarouselProps) => {
  const { animationTime } = props;
  return `${animationTime}s`;
};

export const Indicator = styled.div`
  ${getIndicatorCSS};
  border-radius: ${em(2)};
  ${getIndicatorBackground};
  transition: all ${getAnimationTime};
`;
Indicator.displayName = 'indicator';

const getAnimation = (props: CarouselProps) => {
  const { preStart = 0, nextStart = 0, width = 0, height = 0, switchType } = props;
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
        top: ${em(nowTrans)};
      }
      100% {
        top: ${em(toTrans)};
      }
    `;
  } else {
    animation = keyframes`
      0% {
        left: ${em(nowTrans)};
      }
      100% {
        left: ${em(toTrans)};
      }
    `;
  }

  return animation;
};

const getInitLeft = (isHorizontal: boolean, initStart: number, width: number) => {
  const left = initStart * width;
  console.log('left', initStart, width, left);
  return `left: -${isHorizontal ? em(left) : 0}`;
};

const getInitTop = (isVertical: boolean, initStart: number, height: number) => {
  // const { initStart = 0, height = 0, switchType } = props;

  const top = initStart * height;
  console.log('top', top);
  return `top: -${isVertical ? em(top) : 0}`;
};

const getActiveWidth = (props: CarouselProps) => {
  const { activeWidth = 0, switchType, width = 0, len } = props;
  // return `width: ${activeWidth}`;

  return `width: ${switchType === 'vertical' ? em(width) : em(width * (len + 1))}`;
};

const getActiveHeight = (props: CarouselProps) => {
  const { activeHeight = 0, switchType, height = 0, len } = props;
  // return `height: ${activeHeight}`;

  return `height: ${switchType === 'vertical' ? em(height * (len + 1)) : em(height)}`;
};

// export const AllItemsContainer = styled.div`
//   position: absolute;
//   animation: ${getAnimation} ${getAnimationTime} linear;
//   ${getInitLeft};
//   ${getInitTop};
//   ${getActiveWidth};
//   ${getActiveHeight};
//   z-index: 1;
//   animation-fill-mode: forwards;
// `;

export const AllItemsContainer = CSSProvider({
  tag: 'div',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { switchType, len, initStart } = propsConfig;
      console.log('initStart', initStart);
      const { width, height } = themeMeta;
      const isHorizontal = switchType === 'horizontal';
      const isVertical = switchType === 'vertical';
      const activeWidth = isHorizontal ? width * (len + 1) : width;
      const activeHeight = isVertical ? height * (len + 1) : height;
      const left = getInitLeft(isHorizontal, initStart, width);
      const top = getInitTop(isVertical, initStart, height);

      return `
        width: ${em(activeWidth)};
        height: ${em(activeHeight)};
      `;
    },
  },
  css: css`
    position: absolute;
    animation: ${getAnimation} ${getAnimationTime} linear;
    z-index: 1;
    animation-fill-mode: forwards;
  `,
});

const getImgWidth = (props: CarouselProps) => {
  const { width = 0 } = props;
  return `width: ${em(width)}`;
};

const getImgHeight = (props: CarouselProps) => {
  const { height = 0 } = props;
  return `height: ${em(height)}`;
};

const getIsFadeCSS = (props: CarouselProps) => {
  const { switchType, checked } = props;
  return switchType === 'fade' && checked
    ? 'position: absolute;opacity: 1;'
    : switchType === 'fade'
    ? 'position: absolute;opacity: 0;'
    : '';
};

export const ItemWrap = styled.div`
  display: inline-block;
  ${getIsFadeCSS};
  ${getImgHeight};
  ${getImgWidth};
  transition: opacity ${getAnimationTime};
  overflow: hidden;
  vertical-align: top;
`;

export const Empty = styled.div`
  display: block;
  width: ${px2emcss(1.4)(defaultWidth)};
  height: ${px2emcss(1.4)(defaultHeight)};
  line-height: ${px2emcss(1.4)(defaultHeight)};
  text-align: center;
  background: #161651;
  color: #fff;
  font-size: 14px;
`;
