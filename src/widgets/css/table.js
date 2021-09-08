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
  rowKey?: string,
  scroll?: Object,
  showHeader?: boolean,
  tableStyle?: 'zebraStripe' | 'linear' | 'bordered',
  getTheme: Function,
  onChange: Function,
  getPartOfThemeConfig: Function,
  getPartOfThemeProps: Function,
  selectOptions?: Object,
  expandIconColumnIndex?: number,
  expandIcon?: Function,
  collapseIcon?: Function,
};
export type TableState = {
  headChecked: boolean,
  headIndeterminate: boolean,
  selectRowKeys: any[],
  scroll: Object,
  data: Object[],
  sortOrder: boolean,
};
