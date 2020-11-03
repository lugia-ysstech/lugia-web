/**
 * Transfer
 * create by guorg
 * @flow
 */
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import { css } from 'styled-components';
import type { SizeType } from './transfer';

export type GroupProps = {
  getTheme: Function,
  data: Object[],
  showSearch?: boolean,
  value?: string[],
  defaultValue?: string[],
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {},
  onCancelItemClick?: (newValue: string[], newDisplayValue: string[]) => {},
  onDirectionClick?: (nextValue: string[], direction: 'left' | 'right', moveKeys: string[]) => {},
  sourceSelectedKeys?: string[],
  targetSelectedKeys?: string[],
  defaultSourceSelectedKeys?: string[],
  defaultTargetSelectedKeys?: string[],
  filterOption?: (inputValue: string, option: Object) => {},
  type?: 'tree' | 'panel',
  displayField?: string,
  valueField?: string,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  size: SizeType,
  transferButtonIcon?: Object,
};
export type GroupState = {
  inputValue: string,
  sourceSelectedKeys: string[],
  targetSelectedKeys: string[],
  sourceData: Object[],
  targetData: Object[],
  value: string[],
  sourceKeys: string[],
  mapData: Object,
  sourceSearchData: Object[],
  targetSearchData: Object[],
  sourceCheckKeys: string[],
  targetCheckKeys: string[],
  treeData: Object[],
  cancelItem: Object[],
  displayValue: string[],
  enableKeys: string[],
};

export const TransFerWrap = CSSComponent({
  className: 'TransFerWrap',
  tag: 'div',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['margin'],
      ['padding'],
      ['background'],
      ['border'],
      ['borderRadius'],
    ],
  },
});

export const OperationBtn = StaticComponent({
  className: 'OperationBtn',
  tag: 'span',
  css: css`
    display: inline-block;
    padding: ${px2remcss(8)};
    position: relative;
    vertical-align: middle;

    & > button {
      margin-bottom: ${px2remcss(10)};
      padding-left: ${px2remcss(12)};
      padding-right: ${px2remcss(14)};
    }
  `,
});
