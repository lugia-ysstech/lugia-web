/**
 * Transfer
 * create by guorg
 * @flow
 */
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import { css } from 'styled-components';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';

const borderRadiusValue = '$lugia-dict.@lugia/lugia-web.borderRadiusValue';
const paddingToText = '$lugia-dict.@lugia/lugia-web.paddingToText';
const padding = '$lugia-dict.@lugia/lugia-web.padding';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const normalBorder = '$lugia-dict.@lugia/lugia-web.normalBorder';

export type SizeType = 'small' | 'default' | 'large';

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
  checkboxTheme: Object,
  headerTextTheme: Object,
  headerTheme: Object,
  cancelCheckboxTheme?: Object,
  cancelBoxMenuTheme?: Object,
  cancelCheckboxTheme?: Object,
  getPartOfThemeProps: Function,
  cancelBoxTheme: Object,
  menuTheme: Object,
  treeTheme: Object,
  inputTheme: Object,
  size: SizeType,
  transferClearIcon?: string,
  transferPrefixIcon?: string,
  transferSuffixIcon?: string,
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

const getHeightBySize = (size: SizeType) => {
  return size === 'large' ? 42 : size === 'small' ? 32 : 40;
};
const getFontSizeBySize = (size: SizeType) => {
  return size === 'small' ? 12 : 14;
};
export const TransFer = CSSComponent({
  className: 'TransFer',
  tag: 'div',
  css: css`
    display: inline-block;
    overflow: hidden;
    position: relative;
    vertical-align: middle;
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
      ['fontSize'],
    ],
    defaultTheme: {
      background: { color: '#fff' },
      fontSize: 12,
    },
  },
});

export const Check = CSSComponent({
  className: 'Check',
  tag: 'div',
  css: css`
    position: relative;
    display: flex;
    align-items: center;
  `,
  normal: {
    selectNames: [['background'], [['border'], ['bottom']], ['padding'], ['height']],
    defaultTheme: {
      background: { color: '#f8f8f8' },
      fontSize: 12,
      padding: {
        left: paddingToText,
        right: padding,
      },
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig: { size = 'default' } = {} } = themeProps;
      const { height } = themeMeta;
      return {
        height: height || getHeightBySize(size),
      };
    },
  },
});

export const CheckText = CSSComponent({
  className: 'CheckText',
  tag: 'span',
  css: css`
    position: absolute;
    right: ${px2remcss(10)};
    line-height: 1.5;
  `,
  normal: {
    selectNames: [['padding'], ['color'], ['font'], ['fontSize']],
    defaultTheme: { color: lightGreyColor, fontSize: 12 },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig: { size = 'default' } = {} } = themeProps;
      const { fontSize, font: { size: theFontSize } = {} } = themeMeta;
      return {
        fontSize: theFontSize || fontSize || getFontSizeBySize(size),
      };
    },
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
    selectNames: [
      ['width'],
      ['height'],
      ['margin'],
      ['padding'],
      ['background'],
      ['border', 'top'],
    ],
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
