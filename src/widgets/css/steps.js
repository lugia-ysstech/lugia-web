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
type StepType = 'simple' | 'flat' | 'description' | 'icon' | 'dot';
type StepStatus = 'finish' | 'process' | 'next' | 'wait' | 'error';
type SizeType = 'normal' | 'mini';
const em = px2emcss(1.2);

const lightThemeColor = changeColor(themeColor, 20).rgb;
export const getStepColor = (props: Object) => {
  const { stepStatus, stepType } = props;
  let color = defaultColor;
  switch (stepStatus) {
    case 'finish':
      if (stepType === 'simple' || stepType === 'description' || stepType === 'dot')
        return (color = successColor);
      if (stepType === 'flat') return (color = lightThemeColor);
      return (color = themeColor);
    case 'process':
    case 'next':
      color = stepType === 'description' ? lightGreyColor : themeColor;
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
    stepStatus === 'finish' && stepType === 'flat'
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
        : stepStatus === 'process' || stepStatus === 'finish'
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

export const getLineHeight = props => {
  const { stepType } = props;
  const height = stepType === 'flat' ? em(4) : em(1);
  return height;
};
export const getLineBorder = props => {
  const { stepType, stepStatus } = props;
  if (stepType === 'flat' && (stepStatus === 'next' || stepStatus === 'wait')) {
    const color =
      stepStatus === 'process' || stepStatus === 'next'
        ? themeColor
        : stepStatus === 'error'
          ? dangerColor
          : lightGreyColor;
    const border = `${em(1)} solid ${color}`;
    return `border-top:${border};border-bottom:${border};`;
  }
};
export const getStepNumberSize = props => {
  const { size } = props;
  const fontSize = size === 'normal' ? '1.8rem' : '1.6rem';
  return fontSize;
};
export const getStepSize = props => {
  const { size, stepStatus, stepType } = props;
  let width = em(24);
  switch (stepStatus) {
    case 'finish':
    case 'process':
    case 'error':
      width = size === 'normal' ? em(32) : em(24);
      break;
    case 'next':
    case 'wait':
      width =
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
  return width;
};
export const getStepContainerSize = props => {
  const { size } = props;
  const fontSize = size === 'normal' ? em(32) : em(24);
  return fontSize;
};
export const getStepWidth = props => {
  const { theme, size } = props;
  const { width } = theme;
  const theWidth = width ? em(width) : size === 'normal' ? em(212) : em(204);
  return `width:${theWidth}`;
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
  return `width:${width}`;
};
export const getDashed = props => {
  const { isDashed } = props;
  const styled = isDashed ? 'dashed' : 'solid';
  return styled;
};
export const getLineMargin = props => {
  const { stepType } = props;
  const margin = stepType === 'flat' ? 0 : em(6);
  return `padding: 0 ${margin};`;
};
export const getContentTop = props => {
  const { size } = props;
  const top = size === 'normal' ? em(40) : em(20);
  return `  top: ${top};`;
};
