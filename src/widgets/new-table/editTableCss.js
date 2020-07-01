//@flow
import * as React from 'react';
import type { TableProps } from './tableCss';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { getBorder } from '@lugia/theme-utils';

import colorsFunc from '../css/stateColor';
const { themeColor, borderSize, disableColor } = colorsFunc();

export type EditTableProps = TableProps & {
  dataType?: string,
  showAddCol?: boolean,
  showAddRow?: boolean,
  allowEditHead?: boolean,
  onChange?: Function,
  onCell?: Function,
  onHeaderCell?: Function,
  customEditElement?: any,
  selectSuffixElement?: any,
};

export type EditTableState = {};

export type Direction = 'left' | 'right' | 'top' | 'bottom';

export const Container = CSSComponent({
  tag: 'div',
  className: 'Container',
  normal: {
    selectNames: [['width'], ['height']],
  },
});

export const EditDiv = CSSComponent({
  tag: 'div',
  className: 'EditDiv',
  normal: {
    selectNames: [['width'], ['height'], ['border'], ['background'], ['padding'], ['color']],
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { isSelect, isLugiaHead, isDisableEdit },
      } = themeProps;
      const editBorderColor = isSelect ? themeColor : 'transparent';
      const backgroundColor = isLugiaHead ? disableColor : 'transparent';
      let border = getBorder({ color: editBorderColor, width: borderSize, style: 'solid' });
      if (isDisableEdit) {
        border = getBorder({ color: 'transparent', width: borderSize, style: 'solid' });
      }
      return {
        border,
        background: { color: backgroundColor },
      };
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { align = 'left' },
      } = themeProps;
      const flexMap = { right: 'flex-end', left: 'flex-start', center: 'center' };

      return `
      justify-content: ${flexMap[align]};
      `;
    },
  },
  css: `
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;`,
});

export const TdContainer = StaticComponent({
  tag: 'div',
  className: 'TdContainer',
  css: `
    width: 100%;
    height: 100%;
    font-size:0;
    position: relative;`,
});

export const InnerTriggerDiv = StaticComponent({
  tag: 'div',
  className: 'InnerTriggerDiv',
  css: `
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);`,
});
