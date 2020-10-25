/**
 * Collapse 颜色公共值
 * create by guorg
 * @flow
 */
import { css } from 'styled-components';
import CSSComponent from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';

type CollapseDesignProps = {
  data?: Object[],
};
export type CollapseProps = {
  activeValue?: string | string[],
  value?: string | string[],
  defaultActiveValue?: string | string[],
  defaultValue?: string | string[],
  onChange?: Function,
  showArrow?: boolean,
  accordion?: boolean,
  zebraStripe?: boolean,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  children: any,
} & CollapseDesignProps;
export type CollapseState = {
  value: string | string[],
};

export const Wrap = CSSComponent({
  tag: 'div',
  className: 'CollapseWrap',
  css: css`
    font-size: ${px2remcss(14)};
    overflow: hidden;
  `,
  normal: {
    defaultTheme: {
      opacity: 1,
    },
    selectNames: [
      ['opacity'],
      ['margin'],
      ['padding'],
      ['width'],
      ['height'],
      ['background'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
    ],
  },
});
