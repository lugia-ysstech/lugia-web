/**
 * Collapse 颜色公共值
 * create by guorg
 * @flow
 */
import styled, { css } from 'styled-components';
import CSSComponent from '@lugia/theme-css-hoc';
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import { createGetMargin } from '../common/ThemeUtils';

const FontSize = 1.4;
const em = px2emcss(FontSize);
export const getMargin = createGetMargin({
  fontSize: FontSize,
  default: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

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
// export const Wrap = styled.div`
//   font-size: ${FontSize}rem;
//   & > div:first-child {
//     ${getFirstPanelBorder};
//   }
// `;
export const Wrap = CSSComponent({
  tag: 'div',
  className: 'CheckBoxWrap',
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
