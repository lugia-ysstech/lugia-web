/**
 * Transfer
 * create by guorg
 * @flow
 */
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import { css } from 'styled-components';
import colorsFunc from '../css/stateColor';

const FontSize = 1.2;

export type TransferProps = {
  getTheme: Function,
  data?: Object[],
  selectedKeys?: string[],
  showSearch?: boolean,
  onSelect: Function,
  onSearch: (inputValue: string) => {},
  onCancelItemClick: Function,
  onCheckAll: Function,
  canCheckKeys: string[],
  cancelItem?: Object[],
  needCancelBox?: boolean,
  type: 'panel' | 'tree',
  direction: 'Source' | 'Target',
  blackList?: string[],
  whiteList?: string[],
  title: string,
  displayField: string,
  valueField: string,
  model: Object,
  theme: Object,
};
export type TransferState = {
  inputValue: string,
  selectedKeys: string[],
  typeList: Object,
  cancelItem?: Object[],
  treeData: Object[],
  treeDataLength: number,
};
type CSSProps = {
  isWrap?: boolean,
  theme: ThemeType,
  disabled: boolean,
  height: number,
};
const { borderColor } = colorsFunc();

export const TransFer = CSSComponent({
  className: 'TransFer',
  tag: 'div',
  css: css`
    border: 1px solid ${borderColor};
    border-radius: ${px2remcss(4)};
    display: inline-block;
    font-size: ${FontSize}rem;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
    background: #fff;
  `,
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['margin'],
      ['padding'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['opacity'],
    ],
  },
});

export const Check = CSSComponent({
  className: 'Check',
  tag: 'div',
  css: css`
    background: #f8f8f8;
    padding: ${px2remcss(10)};
    border-bottom: 1px solid #e8e8e8;
    position: relative;
  `,
  normal: {
    selectNames: [['background'], ['border']],
  },
});

export const CheckText = CSSComponent({
  className: 'CheckText',
  tag: 'span',
  css: css`
    position: absolute;
    right: ${px2remcss(10)};
    line-height: 1.5;
    font-size: ${px2remcss(12)};
    color: #ccc;
  `,
  normal: {
    selectNames: [['padding'], ['color'], ['font']],
  },
});

const getNoDataHeight = (props: CSSProps) => {
  const { height } = props;

  return px2remcss(height);
};

export const NoData = StaticComponent({
  className: 'NoData',
  tag: 'div',
  css: css`
    font-size: ${px2remcss(14)};
    height: ${getNoDataHeight};
    color: #ccc;
    text-align: center;
  `,
});

export const CancelBox = CSSComponent({
  className: 'CancelBox',
  tag: 'div',
  css: css`
    box-sizing: border-box;
  `,
  normal: {
    selectNames: [['width'], ['height'], ['margin'], ['padding'], ['background']],
    defaultTheme: {
      border: { top: { width: 6, style: 'solid', color: '#f2f2f2' } },
    },
  },
});

export const CancelBoxItem = StaticComponent({
  className: 'CancelBoxItem',
  tag: 'span',
  css: css`
    display: block;
    padding: ${px2remcss(5)};
  `,
});

export const TreeWrap = StaticComponent({
  className: 'TreeWrap',
  tag: 'div',
  css: css`
    font-size: ${px2remcss(12)};
    height: ${props => px2remcss(props.height)};
  `,
});
