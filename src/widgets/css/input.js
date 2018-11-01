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

function isSuccess(validateStatus) {
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
const FontSize = 1.2;
const em = px2emcss(FontSize);

export const RadiusSize = em(4);
export const LargeHeight = em(40);
export const SmallHeight = em(24);
export const DefaultHeight = em(32);
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
};
export const getWidth = (props: CommonInputProps) => {
  const { theme } = props;
  const { width } = theme;
  return `width:${width ? em(width) : em(200)};`;
};
export const getPadding = (props: CommonInputProps) => {
  const { theme, prefix } = props;
  const { width } = theme;
  return `${prefix ? em(30) : width && width < 200 ? em(width / 20) : em(10)};`;
};
export const getRightPadding = (props: CommonInputProps) => {
  const { theme } = props;
  const { width } = theme;
  return `${width && width < 200 ? em(15 + width / 10) : em(35)};`;
};
export const getSize = (props: CommonInputProps) => {
  const { size } = props;
  return `height:${
    size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight
  };`;
};

export const getBackground = (props: CommonInputProps) => {
  const { disabled } = props;
  return `background:${disabled === true ? disableColor : ''}`;
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
    return `border:${em(borderSize)}`;
  }
  if (borderSize !== undefined) {
    const borderTop = getAttributeFromObject(borderSize, 'top', 0);
    const borderRight = getAttributeFromObject(borderSize, 'right', 0);
    const borderBottom = getAttributeFromObject(borderSize, 'bottom', 0);
    const borderLeft = getAttributeFromObject(borderSize, 'left', 0);
    return `
    border-top:${em(borderTop)};
    border-right:${em(borderRight)};
    border-bottom:${em(borderBottom)};
    border-left:${em(borderLeft)}`;
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
export const getClearButtonHoverColor = () => {
  return `color: ${darkGreyColor}`;
};
