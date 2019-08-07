/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2remcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import { css, keyframes } from 'styled-components';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';

export type Type = 'info' | 'success' | 'error' | 'warning' | 'loading';
export type IconConProps = {
  iconType: Type,
  content: string,
  textTheme: Object,
  height: number,
  iconTheme: Object,
};
export type IconConState = {};

const { themeColor, successColor, warningColor, dangerColor } = colorsFunc();

export const IconInfo = {
  info: { class: 'lugia-icon-reminder_info_circle', color: themeColor },
  success: { class: 'lugia-icon-reminder_check_circle', color: successColor },
  error: { class: 'lugia-icon-reminder_close_circle', color: dangerColor },
  warning: { class: 'lugia-icon-reminder_exclamation_circle', color: warningColor },
  loading: { class: 'lugia-icon-financial_loading_o', color: themeColor },
};

const IconSpin = keyframes`
  0% {
     transform: rotate(0deg);
  }
  100% {
     transform: rotate(360deg);
  }
`;
export const getLoadingIconStyle = (props: Object): string => {
  const { iconType } = props;
  if (iconType === 'loading') {
    return css`
      animation: ${IconSpin} 1s infinite linear;
    `;
  }

  return '';
};

export const MessageText = CSSComponent({
  tag: 'span',
  className: 'MessageText',
  normal: {
    selectNames: [['font'], ['color']],
    defaultTheme: {
      color: '#000',
      font: {
        size: 14,
      },
    },
  },
});
export const MessageTextWrap = StaticComponent({
  tag: 'span',
  className: 'MessageTextWrap',
  css: css`
    display: inline-block;
    line-height: ${props => px2remcss(props.height || 20)};
  `,
});
