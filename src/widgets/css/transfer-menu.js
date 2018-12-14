/**
 * Transfer
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import styled from 'styled-components';
import colorsFunc from '../css/stateColor';

const FontSize = 1.2;
const em = px2emcss(FontSize);

export type TransferMenuProps = {
  data: Object[],
  selectKeys: string[],
  blackList?: string[],
  whiteList?: string[],
};
export type TransferMenuState = {
  data: Object[],
  selectKeys: string[],
  blackList: string[],
  whiteList: string[],
};
