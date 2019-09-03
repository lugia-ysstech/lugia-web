export type PaginationProps = {
  current?: number,
  defaultCurrent?: number,
  defaultPageSize?: number,
  hideOnSinglePage?: boolean,
  pageSize?: number,
  pageSizeOptions?: string[],
  showQuickJumper?: boolean,
  showTotal?: (total: number, range: number) => void,
  simple?: boolean,
  total?: number,
  onChange?: (page: number, pageSize: number) => void,
  getPartOfThemeProps: Function,
};
export type MorePageType = 'default' | 'pre' | 'next';

export type PaginationState = {
  current: number,
  pageSize: number,
  showMorePageType: MorePageType,
};
