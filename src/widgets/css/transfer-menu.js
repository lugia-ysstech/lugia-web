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
  blackList?: string[],
  whiteList?: string[],
  displayField: string,
  valueField: string,
  displayValue?: string[],
  direction: 'Source' | 'Target',
  onSelect: Function,
  query?: string,
  filterOption?: Function,
  selectedKeys: string[],
  height: number,
};
export type TransferMenuState = {
  mapData: Object,
  menuData: Object[],
  cancelItem: Object[],
};
