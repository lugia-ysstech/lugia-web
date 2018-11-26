import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';
import changeColor from './utilsColor';
const {
  themeColor,
  blackColor,
  successColor,
  lightGreyColor,
  dangerColor,
  defaultColor,
} = colorsFunc();
export type StepType = 'simple' | 'flat' | 'icon' | 'dot';
export type StepStatus = 'finish' | 'process' | 'next' | 'wait' | 'error';
export type SizeType = 'normal' | 'mini';
export type OrientationType = 'horizontal' | 'vertical';
export type AlignType = 'center' | 'left';
const em = px2emcss(1.2);
export const DotSize = 12;
const lightThemeColor = changeColor(themeColor, 20).rgb;
export const getStepColor = (props: Object) => {
  const { stepStatus, stepType } = props;
  let color = defaultColor;
  switch (stepStatus) {
    case 'finish':
      if (stepType === 'simple' || stepType === 'dot') return (color = successColor);
      if (stepType === 'flat') return (color = lightThemeColor);
      return (color = themeColor);
    case 'process':
      if (stepType === 'flat') return (color = lightThemeColor);
    case 'next':
      color = themeColor;
      break;
    case 'wait':
      color = lightGreyColor;
      break;
    case 'error':
      color = dangerColor;
      break;
    default:
      break;
  }
  return color;
};
export const getStepBackgroundColor = (props: Object) => {
  const { stepStatus, stepType } = props;
  const color =
    (stepStatus === 'finish' || stepStatus === 'process') && stepType === 'flat'
      ? lightThemeColor
      : stepStatus === 'process'
        ? themeColor
        : stepStatus === 'error' && stepType === 'flat'
          ? dangerColor
          : defaultColor;
  return color;
};
export const getStepFontColor = (props: Object) => {
  const { stepStatus, stepType } = props;
  const color =
    stepStatus === 'error'
      ? dangerColor
      : stepStatus === 'finish' && stepType === 'flat'
        ? lightThemeColor
        : stepStatus === 'finish' || stepStatus === 'process'
          ? blackColor
          : lightGreyColor;
  return color;
};
export const getFinishDisplay = props => {
  const { stepStatus } = props;
  const display =
    stepStatus === 'finish' || stepStatus === 'error' ? 'inline-block' : 'none !important';
  return `display:  ${display};`;
};
export const getShow = props => {
  const { isFirst } = props;
  const display = isFirst ? 'width:0;' : 'flex: 1;';
  return display;
};
export const getFinishIconColor = props => {
  const { stepType, stepStatus } = props;
  const color =
    stepType === 'flat' && (stepStatus === 'finish' || stepStatus === 'error')
      ? defaultColor
      : stepStatus === 'finish'
        ? successColor
        : stepStatus === 'error'
          ? dangerColor
          : themeColor;
  return color;
};

export const getLineSize = props => {
  const { stepType, orientation } = props;
  const size = stepType === 'flat' ? em(6) : em(1);
  const theSize =
    orientation === 'horizontal' ? `height:${size};width:100%;` : `width:${size};height:100%;`;
  return theSize;
};
export const getLineColor = props => {
  const { stepType, stepStatus } = props;
  if (stepType === 'flat' && (stepStatus === 'wait' || stepStatus === 'next')) {
    const color = 'rgba(104, 79, 255,0.3)';
    return ` box-shadow: 0 0 ${em(4)} ${color} inset;`;
  }
  return `background-color: ${getStepColor({ stepType, stepStatus })};`;
};
export const getIndex = props => {
  const { stepType, stepStatus } = props;
  const index = stepType === 'flat' && (stepStatus === 'wait' || stepStatus === 'next') ? 9 : 11;
  return `z-index: ${index};`;
};
export const getStepNumberSize = props => {
  const { size } = props;
  const fontSize = size === 'normal' ? '1.8rem' : '1.6rem';
  return fontSize;
};
export const getStepSize = props => {
  const { size, stepStatus, stepType } = props;
  let theSize = em(24);
  if (stepType === 'dot') return (theSize = em(12));
  switch (stepStatus) {
    case 'finish':
    case 'process':
    case 'error':
      theSize = size === 'normal' ? em(32) : em(24);
      break;
    case 'next':
    case 'wait':
      theSize =
        size === 'normal' && stepType === 'flat'
          ? em(32)
          : size === 'mini' && stepType === 'flat'
            ? em(24)
            : size === 'normal'
              ? em(20)
              : em(12);
      break;
    default:
      break;
  }
  return theSize;
};
export const stepContainerSize = props => {
  const { size } = props;
  const fontSize = size === 'normal' ? em(32) : em(24);
  return fontSize;
};
export const getStepContainerSize = props => {
  const { orientation, size } = props;
  const theSize =
    orientation === 'horizontal'
      ? `height:${stepContainerSize(size)};width:100%;`
      : `width:${stepContainerSize(size)};height:100%;`;
  return theSize;
};
export const getStepOutContanerSize = props => {
  const { theme, size, orientation } = props;
  const { width, height } = theme;
  const type = orientation === 'horizontal' ? 'width' : 'height';
  let theSize;
  if (type === 'width') {
    theSize = width && width > 0 ? em(width) : size === 'normal' ? em(212) : em(204);
  } else {
    theSize = height && height > 0 ? em(height) : size === 'normal' ? em(82) : em(74);
  }
  return `${type}:${theSize}`;
};
export const getStepInnerContainerPosition = props => {
  const { orientation } = props;
  const position =
    orientation === 'horizontal' ? 'align-items: center;' : 'justify-content: center;';
  return position;
};
export const stepInnerContainerPosition = props => {
  const { orientation } = props;
  const position = orientation !== 'horizontal' ? 'height' : 'width';
  return position;
};
export const getStepContainerWidth = props => {
  const { size, isFirst, stepType } = props;

  const width =
    stepType === 'dot' && isFirst
      ? em(12)
      : size === 'normal' && isFirst
        ? em(32)
        : size === 'mini' && isFirst
          ? em(24)
          : '100%';
  return `width:${width};`;
};
export const getLinePadding = props => {
  const { stepType, orientation } = props;
  const padding = stepType === 'flat' ? 0 : em(6);
  let hsize = padding;
  let vsize = 0;
  if (orientation === 'horizontal') {
    hsize = 0;
    vsize = padding;
  }
  return `padding: ${hsize} ${vsize};`;
};
export const getContentMargin = props => {
  const { orientation } = props;
  const position = orientation === 'horizontal' ? 'top' : 'left';
  return `margin-${position}: ${em(10)}`;
};
export const getContentPosition = props => {
  const { size, stepType, orientation } = props;
  const top = stepType === 'dot' ? em(10) : size === 'normal' ? em(30) : em(20);
  const position = orientation === 'horizontal' ? `top: ${top};` : `left:${top};`;
  return position;
};
export const getFlexDirection = props => {
  const { orientation } = props;
  const direction = orientation === 'horizontal' ? 'row' : 'column';
  return `flex-direction: ${direction};`;
};
export const getDotLineSize = props => {
  const { orientation, isDashed } = props;
  const styled = isDashed ? 'dashed' : 'solid';
  const direction = orientation === 'horizontal' ? 'bottom' : 'left';
  return ` border-${direction}: ${em(1)} ${styled} ;`;
};
export const getStepInnerBorder = props => {
  const { stepType, stepStatus } = props;
  if (stepType !== 'flat') {
    return ` border: ${em(1)} solid ${getStepColor({ stepType, stepStatus })};`;
  }
};
export const getTitleLineHeight = props => {
  const { description, size, stepStatus, stepType, orientation } = props;
  const lineHeight =
    orientation === 'vertical' && (description === null || description === undefined)
      ? getStepSize({ size, stepStatus, stepType })
      : '';
  return `line-height:${lineHeight};`;
};
export const getTextAlign = props => {
  const { orientation, desAlign } = props;
  const textAlign = orientation === 'horizontal' && desAlign === 'center' ? 'center' : 'left';
  const transform = textAlign === 'center' ? `transform: translateX(-40%);width:${em(150)};` : '';
  return `text-align: ${textAlign};${transform}`;
};
export const getBeforeGap = props => {
  const { orientation } = props;
  let width = em(4);
  let height = em(6);
  let beforeDirection = 'left';
  let afterDirection = 'top';
  if (orientation === 'horizontal') {
    width = em(6);
    height = em(4);
    beforeDirection = 'top';
    afterDirection = 'left';
  }
  return getGap({
    ...props,
    ...{ afterDirection },
    ...{ beforeDirection },
    ...{ width },
    ...{ height },
  });
};
export const getAfterGap = props => {
  const { orientation } = props;
  let width = em(4);
  let height = em(6);
  let beforeDirection = 'left';
  let afterDirection = 'bottom';
  if (orientation === 'horizontal') {
    width = em(6);
    height = em(4);
    beforeDirection = 'top';
    afterDirection = 'right';
  }
  return getGap({
    ...props,
    ...{ afterDirection },
    ...{ beforeDirection },
    ...{ width },
    ...{ height },
  });
};
export const getGap = props => {
  const { stepType, stepStatus, afterDirection, beforeDirection, width, height } = props;
  if (stepType === 'flat' && (stepStatus === 'next' || stepStatus === 'wait')) {
    return `
    content: '';
    opacity: 1;
    position: absolute;
    width: ${width};
    ${beforeDirection}:${em(1)};
    ${afterDirection}: ${em(-2)};
    background: ${defaultColor};
    height: ${height};
   `;
  }
};
