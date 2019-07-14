/**
 * Transfer
 * create by guorg
 * @flow
 */
import CSSComponent from '@lugia/theme-css-hoc';
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import styled, { css } from 'styled-components';
import colorsFunc from '../css/stateColor';

const FontSize = 1.2;
const em = px2emcss(FontSize);

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
// export const TransFer = styled.div`
//   border: 1px solid ${borderColor};
//   border-radius: ${em(4)};
//   display: inline-block;
//   font-size: ${FontSize}rem;
//   overflow: hidden;
//   position: relative;
//   vertical-align: middle;
//   background: #fff;
// `;
export const TransFer = CSSComponent({
  className: 'TransFer',
  tag: 'div',
  css: css`
    border: 1px solid ${borderColor};
    border-radius: ${em(4)};
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
// export const Check = styled.div`
//   background: #f8f8f8;
//   padding: ${em(10)};
//   border-bottom: 1px solid #e8e8e8;
//   position: relative;
// `;
export const Check = CSSComponent({
  className: 'Check',
  tag: 'div',
  css: css`
    background: #f8f8f8;
    padding: ${em(10)};
    border-bottom: 1px solid #e8e8e8;
    position: relative;
  `,
  normal: {
    selectNames: [['background'], ['border']],
  },
});
// export const CheckText = styled.span`
//   position: absolute;
//   right: ${em(10)};
//   line-height: 1.5;
//   font-size: ${em(12)};
//   color: #ccc;
// `;
export const CheckText = CSSComponent({
  className: 'CheckText',
  tag: 'span',
  css: css`
    position: absolute;
    right: ${em(10)};
    line-height: 1.5;
    font-size: ${em(12)};
    color: #ccc;
  `,
  normal: {
    selectNames: [['padding'], ['color'], ['font']],
  },
});

const getNoDataHeight = (props: CSSProps) => {
  const { height } = props;

  return px2emcss(1.4)(height);
};
export const NoData = styled.div`
  font-size: ${em(14)};
  height: ${getNoDataHeight};
  color: #ccc;
  text-align: center;
`;
// export const CancelBox = styled.div`
//   border-top: 6px solid #f2f2f2;
//   box-sizing: border-box;
// `;
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
export const CancelBoxItem = styled.span`
  display: block;
  padding: ${em(5)};
`;
export const TreeWrap = styled.div`
  font-size: ${em(12)};
  height: ${props => em(props.height)};
`;
