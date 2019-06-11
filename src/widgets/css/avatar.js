/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';
import { ObjectUtils } from '@lugia/type-utils';

const { borderColor } = colorsFunc();

const em = px2emcss(1.2);

export const LargeHeight = em(40);
export const SmallHeight = em(24);
export const DefaultHeight = em(32);

export type AvatarShape = 'circle' | 'square';

export type AvatarSize = 'small' | 'default' | 'large';

type AvatarCssProps = {
  theme: ThemeType,
  size: AvatarSize,
  shape: AvatarShape,
};

const getMeasure = (size: AvatarSize) => {
  return size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight;
};
export const getNameFontSize = (props: AvatarCssProps) => {
  const { size } = props;
  return `font-size:${size === 'large' ? '1.2em' : size === 'small' ? '0.8em' : '1.0em'}`;
};
export const getIconFontSize = (props: AvatarCssProps) => {
  const { size } = props;
  return `font-size:${size === 'large' ? '2.2em' : size === 'small' ? '1.2em' : '1.8em'}`;
};
export const getSize = (props: Object) => {
  const { size, theme } = props;
  const { width, height } = theme;
  const theWidth = ObjectUtils.isNumber(width) ? em(width) : getMeasure(size);
  const theHeight = ObjectUtils.isNumber(height) ? em(height) : getMeasure(size);
  return `width :${theWidth};height:${theHeight};`;
};
export const lineHeight = (props: AvatarCssProps) => {
  const { size } = props;
  return `${getMeasure(size)};`;
};
export const getBorderRadius = (props: AvatarCssProps) => {
  const { shape } = props;
  return `border-radius:${shape === 'circle' ? '50%' : '10%'};`;
};
export const getAvatarBackground = (props: AvatarCssProps) => {
  const { theme, src, icon } = props;
  const { backgroundColor } = theme;
  return `background:${backgroundColor ? backgroundColor : src || icon ? '' : borderColor}`;
};
export const getAvatarColor = (props: AvatarCssProps) => {
  const { theme } = props;
  const { color } = theme;
  return `color:${color ? color : 'white'}`;
};
