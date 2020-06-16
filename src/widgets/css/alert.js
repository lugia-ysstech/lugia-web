/**
 * Layout
 * create by guorg
 * @flow
 */
import CSSComponent from '@lugia/theme-css-hoc';
import { units } from '@lugia/css';
import { css, keyframes } from 'styled-components';
import get from './theme-common-dict';

const { px2remcss } = units;
export type Type = 'info' | 'success' | 'error' | 'warning';
export type AlertProps = {
  type?: Type,
  message: string,
  showIcon?: boolean,
  getTheme: Function,
  closeText?: string | React.ReactNode,
  closable?: boolean,
  description?: string | React.ReactNode,
  onClose?: Function,
  icon?: string,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};
export type AlertState = {
  visible: boolean,
  animateStart: boolean,
  height: number,
};
type CSSProps = {
  showIcon: boolean,
  type: Type,
  theme: Object,
  themeProps: Object,
  closable: boolean,
  textInProps: boolean,
  hasDect: boolean,
  visible: boolean,
  height: number,
  animateStart: boolean,
};

const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';

export const TypeCSS = {
  info: {
    color: '$lugia-dict.@lugia/lugia-web.themeColor',
    hoverColor: '$lugia-dict.@lugia/lugia-web.themeHoverColor',
    activeColor: '$lugia-dict.@lugia/lugia-web.themeActiveColor',
    focusColor: '$lugia-dict.@lugia/lugia-web.themeFocusColor',
    background: '$lugia-dict.@lugia/lugia-web.alertThemeColorReduceA',
  },
  success: {
    color: '$lugia-dict.@lugia/lugia-web.successColor',
    hoverColor: '$lugia-dict.@lugia/lugia-web.successHoverColor',
    activeColor: '$lugia-dict.@lugia/lugia-web.successActiveColor',
    focusColor: '$lugia-dict.@lugia/lugia-web.successFocusColor',
    background: '$lugia-dict.@lugia/lugia-web.alertSuccessColorReduceA',
  },
  warning: {
    color: '$lugia-dict.@lugia/lugia-web.warningColor',
    hoverColor: '$lugia-dict.@lugia/lugia-web.warningHoverColor',
    activeColor: '$lugia-dict.@lugia/lugia-web.warningActiveColor',
    focusColor: '$lugia-dict.@lugia/lugia-web.warningFocusColor',
    background: '$lugia-dict.@lugia/lugia-web.alertWarningColorReduceA',
  },
  error: {
    color: '$lugia-dict.@lugia/lugia-web.dangerColor',
    hoverColor: '$lugia-dict.@lugia/lugia-web.dangerHoverColor',
    activeColor: '$lugia-dict.@lugia/lugia-web.dangerActiveColor',
    focusColor: '$lugia-dict.@lugia/lugia-web.dangerFocusColor',
    background: '$lugia-dict.@lugia/lugia-web.alertDangerColorReduceA',
  },
};

const getLineHeight = (props: CSSProps): number => {
  const { hasDect } = props;
  if (hasDect) {
    return 1.5;
  }
  return 1;
};
const getPadding = (props: CSSProps): string => {
  const { themeProps } = props;
  const { themeConfig } = themeProps;
  const { padding = { top: 12, bottom: 12, left: 10, right: 10 } } = themeConfig.normal;
  const { top, bottom, left, right } = padding;

  return `${top} ${right} ${bottom} ${left}`;
};
const getAlertAnimate = (props: CSSProps) => {
  const { height, animateStart } = props;
  const closeAnimate = keyframes`
    0% {
      padding: ${getPadding(props)};
      height: ${height}px;
    }

    50% {
      padding: 0;
      height: 0;
    }
    70% {
      padding: 0;
      height: 0;
    }
  `;
  if (animateStart) {
    return css`
      animation: ${closeAnimate} 0.5s;
    `;
  }
};

export const Alert = CSSComponent({
  tag: 'div',
  className: 'alert-wrap',
  css: css`
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    line-height: ${props => getLineHeight(props)};
    border-radius: ${px2remcss(get('borderRadiusValue'))};
    ${getAlertAnimate};
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
      ['border', 'left'],
      ['borderRadius'],
      ['boxShadow'],
    ],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig = {} } = themeProps;
      const { hasDect, showIcon } = propsConfig;
      let verticalPad = 12;
      let leftPad = 10;
      if (showIcon) {
        leftPad = `${get('padding') +
          get(hasDect ? 'mFontSize' : 'sFontSize') +
          get('paddingToText')}`;
      }
      if (hasDect) {
        verticalPad = 18;
      }

      return {
        padding: { top: verticalPad, bottom: verticalPad, left: leftPad, right: 10 },
      };
    },
  },
});

export const getPosition = (props: Object) => {
  const { hasDect } = props;
  const computedDist = hasDect ? (18 - get('mFontSize')) / 2 : (14 - get('sFontSize')) / 2;

  return `
    top: ${hasDect ? px2remcss(20) : px2remcss(12)};
    left: ${px2remcss(get('padding') - computedDist)}
    transform: translateX(${px2remcss(computedDist)}) translateY(${px2remcss(computedDist)});
  `;
};

export const Message = CSSComponent({
  tag: 'span',
  className: 'alert-message',
  css: css`
    vertical-align: text-bottom;
  `,
  normal: {
    defaultTheme: { color: darkGreyColor, font: { fontSize: 14 } },
    selectNames: [['color'], ['font']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig = {} } = themeProps;
      const { hasDect } = propsConfig;

      return {
        font: { size: hasDect ? get('headLineFontSize') : get('sectionFontSize') },
        color: hasDect ? blackColor : darkGreyColor,
      };
    },
  },
});

const getCloseTop = (props: CSSProps): string => {
  const { hasDect } = props;
  if (hasDect) {
    return px2remcss(24);
  }
  return px2remcss(13);
};
const getCloseTextColor = (props: Object, name: string) => {
  const { propsConfig = {} } = props;
  const { textInProps, type } = propsConfig;
  if (textInProps) {
    const typeCSSColor = TypeCSS[type];
    const color = typeCSSColor ? typeCSSColor[name] : TypeCSS.info[name];
    return {
      color,
    };
  }
};

export const CloseText = CSSComponent({
  tag: 'a',
  className: 'alert-close-text',
  css: css`
    overflow: hidden;
    position: absolute;
    top: ${props => getCloseTop(props)};
    right: ${px2remcss(get('padding'))};
  `,
  normal: {
    defaultTheme: { font: { size: get('descriptionFontSize') } },
    selectNames: [['color'], ['font']],
    getThemeMeta(themeMeta, themeProps) {
      return getCloseTextColor(themeProps, 'color');
    },
  },
  hover: {
    defaultTheme: {},
    selectNames: [['color']],
    getThemeMeta(themeMeta, themeProps) {
      return getCloseTextColor(themeProps, 'hoverColor');
    },
  },
  active: {
    defaultTheme: {},
    selectNames: [['color']],
    getThemeMeta(themeMeta, themeProps) {
      return getCloseTextColor(themeProps, 'activeColor');
    },
  },
  focus: {
    defaultTheme: {},
    selectNames: [['color']],
    getThemeMeta(themeMeta, themeProps) {
      return getCloseTextColor(themeProps, 'focusColor');
    },
  },
  option: { hover: true, active: true, focus: true },
});

export const Description = CSSComponent({
  tag: 'span',
  className: 'alert-description',
  css: css`
    display: block;
  `,
  normal: {
    defaultTheme: {
      color: darkGreyColor,
      font: { size: get('sectionFontSize') },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    },
    selectNames: [['color'], ['font'], ['padding']],
  },
});
