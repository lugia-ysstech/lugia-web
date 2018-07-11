/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import { px2emcss } from './units';
import type { MarginType, ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';

const {
  themeColor,
  disableColor,
  borderDisableColor,
  borderSize,
  dangerColor,
  borderColor,
  blackColor,
} = colorsFunc();

export const getInputBorderColor = (props: Object) => {
  const { validateStatus = Success } = props;

  const color = isSuccess(validateStatus) ? borderDisableColor : dangerColor;
  return color;
};
const Success = 'success';

function isSuccess(validateStatus) {
  return validateStatus === Success;
}

export const getInputBorderHoverColor = (props: Object) => {
  const { validateStatus = Success } = props;
  return isSuccess(validateStatus) ? borderColor : dangerColor;
};

export const getFocusShadow = (props: Object) => {
  const { validateStatus = Success } = props;
  const color = isSuccess(validateStatus) ? 'rgba(104, 79, 255, 0.2)' : 'rgba(248, 172, 48, 0.2)';
  return 'box-shadow: 0 0 6px ' + color;
};
const em = px2emcss(1.2);

export const RadiusSize = '4px';
export const Height = 22;
export const LargeHeight = 38;
export const SmallHeight = 28;
export const DefaultHeight = 32;
export const Padding = 2;
export const DefaultHelp = '验证出错';

export const fontColor = blackColor;

export type ValidateStatus = 'success' | 'error';

export type InputSize = 'small' | 'default' | 'large';

type CommonInputProps = {
  theme: ThemeType,
  size?: InputSize,
  disabled: boolean,
};
export const getWidth = (props: CommonInputProps) => {
  const { theme } = props;
  const { width } = theme;
  return `width:${width ? em(width) : em(200)};`;
};
export const getPadding = (props: CommonInputProps) => {
  const { theme } = props;
  const { width } = theme;
  return `${width && width < 200 ? em(width / 20) : em(10)};`;
};
export const getRightPadding = (props: CommonInputProps) => {
  const { theme } = props;
  const { width } = theme;
  return `${width && width < 200 ? em(15 + width / 10) : em(35)};`;
};
export const getMargin = (props: CommonInputProps) => {
  const { theme } = props;
  const { margin } = theme;
  if (typeof margin === 'number') {
    return `margin:${em(margin)} `;
  }
};
export const getSize = (props: CommonInputProps) => {
  const { size } = props;
  return `height:${
    size === 'large'
      ? LargeHeight + 'px'
      : size === 'small'
        ? SmallHeight + 'px'
        : DefaultHeight + 'px'
  };`;
};

export const getBackground = (props: CommonInputProps) => {
  const { disabled } = props;
  return `background:${disabled ? disableColor : ''}`;
};

export const getCursor = (props: CommonInputProps) => {
  const { disabled } = props;
  return `cursor:${disabled ? 'not-allowed' : 'text'}`;
};

export const getFocusBorderColor = () => {
  return `border-color:${themeColor}`;
};
export const getInputBorderSize = () => {
  return `${borderSize}`;
};
