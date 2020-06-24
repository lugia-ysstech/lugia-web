//@flow
import type { EditTableEventListenerHandle } from '@lugia/lugia-web';
import * as React from 'react';
import { px2emcss } from '../css/units';
import changeColor from '../css/utilsColor';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';

import { getBorder } from '@lugia/theme-utils';

import colorsFunc from '../css/stateColor';

const fontSize = 1.4;
const em = px2emcss(fontSize);

const { borderColor, themeColor, borderSize } = colorsFunc();

const size = {
  large: 48,
  middle: 32,
  small: 28,
};

export type ColumnsType = {
  columnType?: string,
  dataIndex: string,
  editType?: string,
  align?: string,
  disableEdit?: boolean,
  ellipsis?: boolean,
  title: string,
  key?: string,
  width?: number | string,
  render?: Function,
  children?: Array,
  customEditElement?: React.Element<any>,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};

export type TableCellProps = ColumnsType & {
  index: number,
  record: Object,
  text: ?string | Object | number,
  listener: EditTableEventListenerHandle,
  customRender: ?Function,
  selectSuffixElement: ?Function,
};

export type TableCellState = {
  isSelect: boolean,
  enterEdit: ?boolean,
  selectCell: Object,
  editCell: ?Object,
  editing: boolean,
  clearValue: boolean,
  selectSuffixElement?: Function,
};

export type TableProps = {
  columns: ColumnsType[],
  data?: Object[],
  showHeader?: boolean,
  tableStyle?: 'zebraStripe' | 'linear' | 'bordered',
  tableSize?: 'small' | 'middle' | 'large',
  title?: string | React.Element<any>,
  footer?: string | React.Element<any>,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  rowKey: string | Function,
};

export type TableState = {};

export const Container = CSSComponent({
  tag: 'div',
  className: 'Container',
  normal: {
    selectNames: [['width'], ['height'], ['background']],
    defaultTheme: {
      width: '100%',
    },
  },
  css: `
  background: #fff;
  &:focus {
    outline: none;
  }
  `,
});

export const Tr = CSSComponent({
  tag: 'div',
  className: 'Tr',
  normal: {
    selectNames: [['background']],
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { tableStyle },
      } = themeProps;
      if (tableStyle !== 'zebraStripe') {
        return '';
      }
      return `&:nth-child(even) {
        background: ${changeColor(themeColor, 0, 0, 5).rgba};
      }`;
    },
  },
  css: `
   border-bottom: 1px solid ${borderColor};
   display: table-row;
  `,
});

export const Td = CSSComponent({
  tag: 'div',
  className: 'Td',
  normal: {
    selectNames: [['width'], ['height'], ['border'], ['padding']],
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { align = '', ellipsis, tableStyle },
      } = themeProps;
      const ellipsisStyle = ellipsis ? 'hidden' : '';
      const textOverflowStyle = ellipsis ? 'ellipsis' : '';
      const whiteSpaceStyle = ellipsis ? 'nowrap' : '';
      let border = '';
      if (tableStyle === 'bordered') {
        border = `border-right: ${borderSize}px solid ${borderColor}`;
      }
      return `
        text-align:${align};
        overflow:${ellipsisStyle};
        text-overflow:${textOverflowStyle};
        white-space:${whiteSpaceStyle};
        &:last-child{
        ${border};
        }
      `;
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { tableSize, tableStyle },
      } = themeProps;
      let border = getBorder(
        { color: borderColor, width: borderSize, style: 'solid' },
        { directions: ['b'] }
      );
      if (tableStyle === 'bordered') {
        border = getBorder(
          { color: borderColor, width: borderSize, style: 'solid' },
          { directions: ['l', 'b'] }
        );
      }
      return { height: em(size[tableSize]), border };
    },
  },
  css: `
  display: table-cell;
  vertical-align: middle;
  padding: 0 10px;
  height: 100%;
  `,
});

export const CustomBlock = CSSComponent({
  tag: 'div',
  className: 'CustomBlock',
  normal: {
    selectNames: [['height'], ['padding']],
  },
  css: `
 width: 100%;
  `,
});

export const THead = StaticComponent({
  tag: 'div',
  className: 'THead',
  css: `
  display: table-header-group;
  `,
});

export const TBody = StaticComponent({
  tag: 'div',
  className: 'TBody',
  css: `
   display: table-row-group;
  `,
});

export const NoData = CSSComponent({
  tag: 'div',
  className: 'NoData',
  normal: {
    selectNames: [['height'], ['padding'], ['font']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { tableSize },
      } = themeProps;
      return { height: em(size[tableSize]) };
    },
  },
  css: `
    width: 100%;
    text-align: center;
    border-bottom: 1px solid ${borderColor};
    display: flex;
    justify-content: center;
    align-items: center;
  `,
});

export const LugiaTable = CSSComponent({
  tag: 'div',
  className: 'LugiaTable',
  normal: {
    selectNames: [],
  },
  css: `
    width: 100%;
    display: table;
    table-layout: fixed;
    border-top: 1px solid ${borderColor};
  `,
});
