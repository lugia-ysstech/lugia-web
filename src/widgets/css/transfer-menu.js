/**
 * Transfer
 * create by guorg
 * @flow
 */
import type { ThemeType } from '@lugia/lugia-web';

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
