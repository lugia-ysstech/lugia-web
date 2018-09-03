/**
 * Collapse 颜色公共值
 * create by guorg
 * @flow
 */
import styled, { keyframes } from 'styled-components';
import { px2emcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import { getThemeWidthCSS, getThemeMarginCSS } from '../css/panel';

const FontSize = 1.4;
const em = px2emcss(FontSize);

export type CollapseProps = {
  activeValue?: string | string[],
  defaultActiveValue?: string | string[],
  onChange?: Function,
  showArrow?: boolean,
  accordion?: boolean,
  getTheme: Function,
  children: any,
};
export type CollapseState = {
  value: string | string[],
};
type CSSProps = {
  panelTheme: ThemeType,
};

const getFirstPanelBorder = (props: CSSProps) => {
  const { borderColor, border } = props.panelTheme;
  if (border || (border && border.bottom !== 0)) {
    let borderSize;
    if (typeof border === 'number') {
      borderSize = border;
    } else {
      borderSize = border.bottom || 0;
    }
    return `
      border-top: ${em(borderSize)} solid ${borderColor};
    `;
  }
};
export const Wrap = styled.div`
  font-size: ${FontSize}rem;
  & > div:first-child {
    ${getFirstPanelBorder};
  }

  ${getThemeWidthCSS};
  ${getThemeMarginCSS};
`;
