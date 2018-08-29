/**
 * Collapse 颜色公共值
 * create by guorg
 * @flow
 */
import colorsFunc from '../css/stateColor';
import styled, { keyframes } from 'styled-components';
import { px2emcss } from '../css/units';

const FontSize = 1.4;
const em = px2emcss(FontSize);

export type CollapseProps = {
  activeValue?: string | string[],
  defaultActiveValue?: string | string[],
  onChange?: Function,
  showArrow?: boolean,
  accordion?: boolean,
  getTheme: Function,
  children: any,
};
export type CollapseState = {
  value: string | string[],
};
