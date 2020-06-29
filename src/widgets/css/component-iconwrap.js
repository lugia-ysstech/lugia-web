/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2remcss } from '../css/units';
import { css, keyframes } from 'styled-components';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';

export type Type = 'info' | 'success' | 'error' | 'warning' | 'loading';
export type IconConProps = {
  icon?: string,
  iconType: Type,
  content: string,
  textTheme: Object,
  height: number,
  iconTheme: Object,
};
export type IconConState = {};

const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const sectionFontSize = '$lugia-dict.@lugia/lugia-web.sectionFontSize';

export const IconInfo = {
  info: {
    class: 'lugia-icon-reminder_info_circle',
    color: '$lugia-dict.@lugia/lugia-web.themeColor',
  },
  success: {
    class: 'lugia-icon-reminder_check_circle',
    color: '$lugia-dict.@lugia/lugia-web.successColor',
  },
  error: {
    class: 'lugia-icon-reminder_close_circle',
    color: '$lugia-dict.@lugia/lugia-web.dangerColor',
  },
  warning: {
    class: 'lugia-icon-reminder_exclamation_circle',
    color: '$lugia-dict.@lugia/lugia-web.warningColor',
  },
  loading: {
    class: 'lugia-icon-financial_loading_o',
    color: '$lugia-dict.@lugia/lugia-web.themeColor',
  },
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
      color: darkGreyColor,
      font: {
        size: sectionFontSize,
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
