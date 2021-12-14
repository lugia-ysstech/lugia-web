/**
 * Table
 * create by guorg
 * @flow
 */

export type LugiadLayoutType = 'auto' | 'reactive' | 'fixed';
export type TableProps = {
  children?: any,
  columns: Object[],
  data: Object[],
  scrollerFixed?: number,
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
  expandIcon?: string | Function,
  collapseIcon?: string | Function,
  lugiadLayout?: { heightType: LugiadLayoutType },
};
export type TableState = {
  headChecked: boolean,
  headIndeterminate: boolean,
  selectRowKeys: any[],
  scroll: Object,
  data: Object[],
  sortOrder: boolean,
};
