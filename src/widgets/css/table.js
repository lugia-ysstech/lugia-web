/**
 * Table
 * create by guorg
 * @flow
 */
export type TableProps = {
  children?: any,
  columns: Object[],
  data: Object[],
  size?: 'default' | 'small' | 'large',
  showHeader?: boolean,
  tableStyle?: 'zebraStripe' | 'linear' | 'bordered',
  getTheme: Function,
  getPartOfThemeConfig: Function,
  selectOptions?: Object,
  expandIconColumnIndex?: number,
  tableLineHeight?: number,
};
export type TableState = {
  headChecked: boolean,
  headIndeterminate: boolean,
  selectRowKeys: any[],
  scroll: Object,
};
