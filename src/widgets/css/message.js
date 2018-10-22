/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import changeColor from './utilsColor';
import type { ThemeType } from '@lugia/lugia-web';
import { createGetWidthOrHeight } from '../common/ThemeUtils';
import styled, { keyframes } from 'styled-components';
import Icon from '../icon';

type Type = 'info' | 'success' | 'error' | 'warning';
export type MessageProps = {};
export type MessageState = {};
type CSSProps = {};

const FontSize = 1.2;
const em = px2emcss(FontSize);
const {
  themeColor,
  successColor,
  warningColor,
  dangerColor,
  mediumGreyColor,
  blackColor,
  darkGreyColor,
  padding,
  marginToSameElement,
} = colorsFunc();

export const Message = styled.div`
  position: fixed;
  width: 100%;
  top: 10px;
  text-align: center;
`;
