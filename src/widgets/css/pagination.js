/**
 * Pagination
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';

export type PaginationProps = {
  current?: number,
  defaultCurrent?: number,
  defaultPageSize?: number,
  hideOnSinglePage?: boolean,
  pageSize?: number,
  pageSizeOptions?: string[],
  showQuickJumper?: boolean,
  showQuickJumper?: boolean,
  showTotal?: (total: number, range: number) => void,
  simple?: boolean,
  total?: number,
  onChange?: (page: number, pageSize: number) => void,
};
export type PaginationState = {};
