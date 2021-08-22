/**
 * Transfer
 * create by guorg
 * @flow
 */

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
  menuThemeObj: Object,
};
export type TransferMenuState = {
  mapData: Object,
  menuData: Object[],
  cancelItem: Object[],
};
