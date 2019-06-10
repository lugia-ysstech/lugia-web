import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import { getAttributeFromObject } from '../common/ObjectUtils';
import styled from 'styled-components';
import colorsFunc from '../css/stateColor';

const { dangerColor, defaultColor } = colorsFunc();
const em = px2emcss(1);

type BadgeProps = {
  theme: ThemeType,
};
export const Padding = 4;
export const getDotSize = () => {
  return `height: ${em(10)};
          width: ${em(10)};`;
};
const NumberSize = 14;

export const Height = em(NumberSize);

export const numDotHeight = () => {
  return `height: ${Height};`;
};
export const numDotWidht = (props: { bitCnt: number, isOverflow: boolean }) => {
  const { bitCnt, overflow } = props;

  const overWidth = overflow ? 6 : 0;

  const width = (bitCnt === 1 ? NumberSize : bitCnt * 6 + 2 * Padding) + overWidth;
  return `width: ${em(width)};`;
};
export const dotRight = (props: BadgeProps) => {
  const { theme } = props;
  const { position } = theme;
  const right = getAttributeFromObject(position, 'right', 0);
  return `right:${em(right)}`;
};
export const dotTop = (props: BadgeProps) => {
  const { theme } = props;
  const { position } = theme;
  const top = getAttributeFromObject(position, 'top', -5);
  return `top:${em(top)}`;
};
export const numDotRight = (props: BadgeProps) => {
  const { theme } = props;
  const { position } = theme;
  const right = getAttributeFromObject(position, 'right', 0);
  return `right:${em(right)}`;
};
export const numDotTop = (props: BadgeProps) => {
  const { theme } = props;
  const { position } = theme;
  const top = getAttributeFromObject(position, 'top', -8);
  return `top:${em(top)}`;
};

export const getBackground = (props: BadgeProps) => {
  const { theme } = props;
  const { backgroundColor } = theme;
  return `background:${backgroundColor ? backgroundColor : dangerColor}`;
};
export const getColor = (props: BadgeProps) => {
  const { theme } = props;
  const { color } = theme;
  return `color:${color ? color : defaultColor}`;
};
