/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';
import { getAttributeFromObject } from '../common/ObjectUtils.js';
import { units } from '@lugia/css';
const { px2remcss } = units;
const {
  themeColor,
  disableColor,
  dangerColor,
  blackColor,
  mediumGreyColor,
  darkGreyColor,
  lightGreyColor,
} = colorsFunc();

export const getInputBorderColor = (props: Object) => {
  const { validateStatus = Success } = props;

  const color = isSuccess(validateStatus) ? lightGreyColor : dangerColor;
  return color;
};
const Success = 'success';

export function isSuccess(validateStatus: ValidateStatus) {
  return validateStatus === Success;
}

export const getInputBorderHoverColor = (props: Object) => {
  const { validateStatus = Success, theme, disabled } = props;
  const { borderColor } = theme;
  return borderColor
    ? borderColor
    : disabled
    ? lightGreyColor
    : isSuccess(validateStatus)
    ? themeColor
    : dangerColor;
};

export const getFocusShadow = (props: Object) => {
  const { validateStatus = Success } = props;
  const color = isSuccess(validateStatus) ? 'rgba(104, 79, 255, 0.2)' : 'rgba(248, 172, 48, 0.2)';
  return 'box-shadow: 0 0 6px ' + color;
};
export const FontSize = 1.2;
const em = px2emcss(FontSize);

export const RadiusSize = px2remcss(4);
export const LargeHeight = px2remcss(40);
export const SmallHeight = px2remcss(24);
export const DefaultHeight = px2remcss(32);
export const Padding = 2;
export const DefaultHelp = '验证出错';
export const DefaultAmountPrefix = '¥';

export type ValidateStatus = 'success' | 'error';

export type InputSize = 'small' | 'default' | 'large';
export type InputValidateType = 'top' | 'bottom' | 'inner' | 'default';

type CommonInputProps = {
  theme: ThemeType,
  size?: InputSize,
  prefix?: React$Element<any>,
  disabled: boolean,
  validateType: InputValidateType,
  validateStatus: ValidateStatus,
  themeProps: Object,
};
export const getWidth = (props: CommonInputProps) => {
  const { theme } = props;
  const { width } = theme;
  const theWidth = width ? px2remcss(width) : px2remcss(200);
  return `width:${theWidth};`;
};
export const getPadding = (props: CommonInputProps) => {
  const { theme, prefix } = props;
  const { width } = theme;
  return `${
    prefix ? px2remcss(30) : width && width < 200 ? px2remcss(width / 20) : px2remcss(10)
  };`;
};
export const getRightPadding = (props: CommonInputProps) => {
  const { theme } = props;
  const { width } = theme;
  return `${width && width < 200 ? px2remcss(15 + width / 10) : px2remcss(35)};`;
};
export const getSize = (props: CommonInputProps) => {
  const { size } = props;
  return `height:${
    size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight
  };`;
};

export const getBackground = (props: CommonInputProps) => {
  const { disabled, theme } = props;
  const { backgroundColor } = theme;
  return `background:${disabled === true ? disableColor : backgroundColor ? backgroundColor : ''}`;
};

export const getCursor = (props: CommonInputProps) => {
  const { disabled } = props;
  return `cursor:${disabled ? 'not-allowed' : 'text'}`;
};

export const getFocusBorderColor = () => {
  return `border-color:${themeColor}`;
};
export const getInputBorderSize = (props: CommonInputProps) => {
  const { theme } = props;
  const { borderSize } = theme;
  if (typeof borderSize === 'number') {
    return `border:${px2remcss(borderSize)}`;
  }
  if (borderSize !== undefined) {
    const borderTop = getAttributeFromObject(borderSize, 'top', 0);
    const borderRight = getAttributeFromObject(borderSize, 'right', 0);
    const borderBottom = getAttributeFromObject(borderSize, 'bottom', 0);
    const borderLeft = getAttributeFromObject(borderSize, 'left', 0);
    return `
    border-top:${px2remcss(borderTop)};
    border-right:${px2remcss(borderRight)};
    border-bottom:${px2remcss(borderBottom)};
    border-left:${px2remcss(borderLeft)}`;
  }
  return `border:${colorsFunc().borderSize}`;
};

export const getFontColor = (props: CommonInputProps) => {
  const { validateType, validateStatus } = props;
  return `color: ${
    isValidateSuccess(validateStatus, validateType, 'inner') ? dangerColor : blackColor
  };`;
};
export const getVisibility = (props: CommonInputProps) => {
  const { validateType, validateStatus } = props;
  return `visibility:${
    isValidateSuccess(validateStatus, validateType, 'bottom') ? 'visible' : 'hidden'
  };`;
};

export function isValidateSuccess(
  validateStatus: ValidateStatus,
  validateType: InputValidateType,
  expType: InputValidateType
): boolean {
  return validateStatus === 'error' && expType === validateType;
}

export const getPlaceholderFontColor = () => {
  return mediumGreyColor;
};
export const getClearButtonColor = () => {
  return `color: ${mediumGreyColor}`;
};
export const getDisplay = (props: Object) => {
  const { show } = props;
  return show ? 'inline-block' : '';
};
export const getClearButtonHoverColor = () => {
  return `color: ${darkGreyColor}`;
};
