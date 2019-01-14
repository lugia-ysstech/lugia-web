/**
 * Table
 * create by guorg
 * @flow
 */
export type TableProps = {
  children?: any,
  columns: Object[],
  data: Object[],
  showHeader?: boolean,
  tableStyle?: 'zebraStripe' | 'linear' | 'bordered',
  getTheme: Function,
};
export type TableState = {};
