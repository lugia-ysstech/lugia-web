/**
 * Collapse 颜色公共值
 * create by guorg
 * @flow
 */
import { css } from 'styled-components';
import CSSComponent from '@lugia/theme-css-hoc';
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';

const FontSize = 1.4;
const em = px2emcss(FontSize);

type CollapseDesignProps = {
  data?: Object[],
};
export type CollapseProps = {
  activeValue?: string | string[],
  defaultActiveValue?: string | string[],
  onChange?: Function,
  showArrow?: boolean,
  accordion?: boolean,
  getTheme: Function,
  children: any,
} & CollapseDesignProps;
export type CollapseState = {
  value: string | string[],
};
type CSSProps = {
  panelTheme: ThemeType,
};

const getFirstPanelBorder = (props: CSSProps) => {
  const { borderColor = '#e8e8e8', borderSize } = props.panelTheme;
  if (borderSize || (borderSize && borderSize.bottom !== 0)) {
    let border = 0;
    if (typeof borderSize === 'number') {
      border = borderSize;
    } else {
      border = borderSize.bottom || 0;
    }
    return `
      border-top: ${em(border)} solid ${borderColor};
    `;
  }
};
export const Wrap = CSSComponent({
  tag: 'div',
  className: 'CollapseWrap',
  css: css`
    font-size: ${FontSize}rem;
    & > div:first-child {
      ${getFirstPanelBorder};
    }
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
    ],
  },
});
