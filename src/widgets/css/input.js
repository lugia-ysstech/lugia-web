/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import type { ThemeType } from '@lugia/lugia-web';
import type { ValidateStatus, ValidateType } from './validateHoc';
import get from '../css/theme-common-dict';

const smallSize = '$lugia-dict.@lugia/lugia-web.smallSize';
const normalSize = '$lugia-dict.@lugia/lugia-web.normalSize';
const largeSize = '$lugia-dict.@lugia/lugia-web.largeSize';
const xxsFontSize = '$lugia-dict.@lugia/lugia-web.xxsFontSize';
const xsFontSize = '$lugia-dict.@lugia/lugia-web.xsFontSize';

export const FontSize = 1.2;
export const RadiusSize = 4;
export const DefaultHeight = 32;
export const Padding = 2;
export const DefaultHelp = '验证出错';
export const DefaultAmountPrefix = '¥';
export type InputSize = 'small' | 'default' | 'large';
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
  return `background:${
    disabled === true ? get('disableColor') : backgroundColor ? backgroundColor : ''
  }`;
};

export function getInputHeight(height: string | number, size: InputSize) {
  return height ? height : size === 'large' ? largeSize : size === 'small' ? smallSize : normalSize;
}
export function getInputIconSize(size: InputSize) {
  return size === 'small' ? xxsFontSize : xsFontSize;
}
export function getInputFixSize(size: InputSize) {
  return size === 'small' ? 12 : 14;
}
