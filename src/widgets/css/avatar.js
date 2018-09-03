/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';

const { borderColor } = colorsFunc();

const em = px2emcss(1.2);

export const LargeHeight = em(40);
export const SmallHeight = em(24);
export const DefaultHeight = em(32);

export type AvatarShape = 'circle' | 'square';

export type AvatarSize = 'small' | 'default' | 'large';

type AvatarProps = {
  theme: ThemeType,
  size: AvatarSize,
  shape: AvatarShape,
  avatarBackground: string,
  avatarColor: string,
};

const getMeasure = (size: AvatarSize) => {
  return size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight;
};
export const getNameFontSize = (props: AvatarProps) => {
  const { size } = props;
  return `font-size:${size === 'large' ? '1.2em' : size === 'small' ? '0.8em' : '1.0em'}`;
};
export const getIconFontSize = (props: AvatarProps) => {
  const { size } = props;
  return `font-size:${size === 'large' ? '2.2em' : size === 'small' ? '1.2em' : '1.8em'}`;
};
export const getSize = (props: AvatarProps) => {
  const { size } = props;
  return `
    height:${getMeasure(size)};
    width: ${getMeasure(size)};
     `;
};
export const lineHeight = (props: AvatarProps) => {
  const { size } = props;
  return `${getMeasure(size)};`;
};
export const getBorderRadius = (props: AvatarProps) => {
  const { shape } = props;
  return `border-radius:${shape === 'circle' ? '50%' : '10%'};`;
};
export const getAvatarBackground = (props: AvatarProps) => {
  const { theme } = props;
  const { backgroundColor } = theme;
  return `background:${backgroundColor ? backgroundColor : borderColor}`;
};
export const getAvatarColor = (props: AvatarProps) => {
  const { theme } = props;
  const { color } = theme;
  return `color:${color ? color : 'white'}`;
};
