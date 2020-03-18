import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
export type StepType = 'simple' | 'flat' | 'icon' | 'dot';
export type StepStatus = 'finish' | 'process' | 'next' | 'wait' | 'error';
export type SizeType = 'normal' | 'mini';
export type OrientationType = 'horizontal' | 'vertical';
export type AlignType = 'center' | 'left';
const em = px2emcss(1.2);

const lightThemeColor = '$lugia-dict.@lugia/lugia-web.themeHoverColor';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const successColor = '$lugia-dict.@lugia/lugia-web.successColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';

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
export const getIndex = props => {
  const { stepType, stepStatus } = props;
  const index = stepType === 'flat' && (stepStatus === 'wait' || stepStatus === 'next') ? 9 : 11;
  return `z-index: ${index};`;
};
export const getWidth = props => {
  const { theme, orientation } = props;
  const { width } = theme;
  const theWidth = orientation === 'vertical' ? '' : em(width) ? em(width) : em(500);
  return ` width: ${theWidth};`;
};
