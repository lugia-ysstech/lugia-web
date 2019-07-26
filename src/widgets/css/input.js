/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';

const { themeColor, disableColor, dangerColor, lightGreyColor } = colorsFunc();

export const getInputBorderColor = (props: Object) => {
  const { validateStatus = Success } = props;
  return isSuccess(validateStatus) ? lightGreyColor : dangerColor;
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

export const FontSize = 1.2;
export const RadiusSize = 4;
export const LargeHeight = 40;
export const SmallHeight = 24;
export const DefaultHeight = 32;
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

export const getBackground = (props: CommonInputProps) => {
  const { disabled, theme } = props;
  const { backgroundColor } = theme;
  return `background:${disabled === true ? disableColor : backgroundColor ? backgroundColor : ''}`;
};

export const getCursor = (props: CommonInputProps) => {
  const { disabled } = props;
  return `cursor:${disabled ? 'not-allowed' : 'text'}`;
};

export function isValidateSuccess(
  validateStatus: ValidateStatus,
  validateType: InputValidateType,
  expType: InputValidateType
): boolean {
  return validateStatus === 'error' && expType === validateType;
}
