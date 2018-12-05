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
  showTotal?: (total, range) => {},
  simple?: boolean,
  total?: boolean,
  onChange?: (page, pageSize) => {},
};
export type PaginationState = {};

const FontSize = 1.2;
const em = px2emcss(FontSize);
const { themeColor } = colorsFunc();
