/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';

const { disableColor } = colorsFunc();

const Success = 'success';

export function isValidateSuccess(validateStatus: ValidateStatus) {
  return validateStatus === Success;
}

export const FontSize = 1.2;
export const RadiusSize = 4;
export const LargeHeight = 40;
export const SmallHeight = 24;
export const DefaultHeight = 32;
export const Padding = 2;
export const DefaultHelp = '验证出错';
export const DefaultAmountPrefix = '¥';

export type ValidateStatus = 'default' | 'error';

export type InputSize = 'small' | 'default' | 'large';
export type ValidateType = 'top' | 'bottom' | 'inner' | 'default';
export type ResizeType = 'both' | 'horizontal' | 'vertical' | 'none';

type CommonInputProps = {
  theme: ThemeType,
  size?: InputSize,
  prefix?: React$Element<any>,
  disabled: boolean,
  validateType: ValidateType,
  validateStatus: ValidateStatus,
  themeProps: Object,
};

export const getBackground = (props: CommonInputProps) => {
  const { disabled, theme } = props;
  const { backgroundColor } = theme;
  return `background:${disabled === true ? disableColor : backgroundColor ? backgroundColor : ''}`;
};

export function checkValidateResultFromStatusAndType(
  validateStatus: ValidateStatus,
  expStatus: ValidateStatus,
  validateType: ValidateType,
  expType: ValidateType
): boolean {
  return validateStatus === expStatus && checkValidateType(validateType, expType);
}
export function checkValidateType(validateType: ValidateType, expType: ValidateType): boolean {
  return expType === validateType;
}
