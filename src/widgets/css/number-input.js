/**
 * create by liangguodong on 2018/8/15
 *
 * @flow
 */
import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';
import { createGetWidthOrHeight } from '../common/ThemeUtils';

const { themeColor, disableColor } = colorsFunc();

const em = px2emcss(1.2);

export const LargeHeight = em(40);
export const SmallHeight = em(24);
export const DefaultHeight = em(32);

export const ButtonWrapperLargeHeight = em(38);
export const ButtonWrapperSmallHeight = em(22);
export const ButtonWrapperDefaultHeight = em(30);

export type InputSize = 'small' | 'default' | 'large';
export type ClickType = 'plus' | 'minus' | 'no';

type CommonNumberInputProps = {
  theme: ThemeType,
  size?: InputSize,
  disabled: boolean,
};
type ButtonContainerProps = {
  show: boolean,
  disabled: boolean,
};

type ButtonProps = {
  hover: ClickType,
};

export const getWidth = createGetWidthOrHeight('width', { fontSize: 1.2, defaultWidth: 200 });

export const getButtonSize = (props: CommonNumberInputProps) => {
  const { size } = props;
  return `height:${
    size === 'large'
      ? ButtonWrapperLargeHeight
      : size === 'small'
        ? ButtonWrapperSmallHeight
        : ButtonWrapperDefaultHeight
  };`;
};

export const getCursor = (props: CommonNumberInputProps) => {
  const { disabled } = props;
  return `cursor:${disabled ? 'not-allowed' : 'pointer'}`;
};

export const getShow = (props: ButtonContainerProps) => {
  const { show, disabled } = props;
  return `opacity:${show && !disabled ? '1' : '0'}`;
};
export const getIconHoverColor = () => {
  return themeColor;
};
export const getFocusBorderColor = () => {
  return `border-color:${themeColor}`;
};
export const getFocusShadow = () => {
  const color = 'rgba(248, 172, 48, 0.2)';
  return 'box-shadow: 0 0 6px ' + color;
};
export const getBorderHoverColor = (props: CommonNumberInputProps) => {
  const { disabled } = props;
  return `border-color:${!disabled ? themeColor : disableColor}`;
};

export const getPlusHoverHeight = (props: ButtonProps) => {
  const { hover } = props;
  return `height:${hover === 'no' ? '50%' : hover === 'plus' ? '60%' : '40%'}`;
};
export const getMinusHoverHeight = (props: ButtonProps) => {
  const { hover } = props;
  return `height:${hover === 'no' ? '50%' : hover === 'minus' ? '60%' : '40%'}`;
};
export const getBackground = (props: CommonNumberInputProps) => {
  const { disabled } = props;
  return `background:${disabled ? disableColor : ''}`;
};
