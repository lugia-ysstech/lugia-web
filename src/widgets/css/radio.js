/**
 * Radio 颜色公共值
 * create by guorg
 * @flow
 */

import colorsFunc from '../css/stateColor';
import { css } from 'styled-components';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import { getBorder, getDictValue } from '@lugia/theme-utils';
import { getBorderRadius } from '../theme/CSSProvider';
import get from './theme-common-dict';
import { judgeStarts } from '../utils';

const em = px2remcss;
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';

type RadioStyleType = 'default' | 'vertical';
export type CSStype = {
  themes: ThemeType,
};
export type RadioProps = {
  checked?: boolean,
  defaultChecked?: boolean,
  disabled?: boolean,
  cancel?: boolean,
  styles?: RadioStyleType,
  getTheme: Function,
  onChange?: Function,
  item?: Object,
  value?: string,
  children?: any,
  themeProps: Object,
  getPartOfThemeConfig: Function,
  getPartOfThemeProps: Function,
} & ForGroupType;
type ForGroupType = {
  onChangeForGroup?: Function,
  last: ?boolean,
};
type RadioType = RadioProps & CSStype;

const getStyleCSS = (props: RadioType): string => {
  const { styles = 'default', last } = props;
  if (styles === 'vertical') {
    return `
      display: block;
      margin-bottom: ${last ? 0 : em(get('marginToPeerElementForY'))};
    `;
  }
  return `
    display: inline-block;
    margin-right: ${last ? 0 : em(get('marginToDifferentElement'))};
  `;
};

const RadioDefaultTheme = {
  opacity: 1,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

export const RadioWrap = CSSComponent({
  tag: 'label',
  className: 'RadioWrap',
  css: css`
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    ${props => (props.disabled || props.cancel ? 'cursor: not-allowed' : 'cursor: pointer')};
    ${getStyleCSS};
  `,
  normal: {
    selectNames: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
    defaultTheme: RadioDefaultTheme,
  },
  hover: {
    selectNames: [['opacity']],
    defaultTheme: {
      opacity: 1,
    },
  },
  disabled: {
    selectNames: [['opacity']],
    defaultTheme: {
      opacity: 1,
    },
  },
  active: {
    selectNames: [['opacity']],
    defaultTheme: {
      opacity: 1,
    },
  },
});

export const RadioContent = StaticComponent({
  tag: 'span',
  className: 'RadioContent',
  css: css`
    margin: 0;
    outline: none;
    line-height: 1;
    vertical-align: middle;
    display: inline-block;
  `,
});

export const RadioChildrenSpan = CSSComponent({
  tag: 'span',
  className: 'RadioChildrenSpan',
  css: css`
    padding-left: ${props => (props.hasChildren ? em(get('padding')) : 0)};
    vertical-align: middle;
  `,
  normal: {
    selectNames: [['color'], ['font'], ['padding']],
    defaultTheme: {
      color: blackColor,
      font: { size: 14 },
    },
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: blackColor,
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: disableTextColor,
    },
  },
  active: {
    selectNames: [['color']],
    defaultTheme: {
      color: blackColor,
    },
  },
});

export const RadioCircleSpan = CSSComponent({
  tag: 'span',
  className: 'RadioCircleSpan',
  css: css`
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: ${em(16)};
    height: ${em(16)};
    border-radius: 50%;
    border: 1px solid ${get('borderColor')};
    background-color: ${get('themeColor')};
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  `,
  normal: {
    selectNames: [
      ['background'],
      ['border'],
      ['borderRadius'],
      ['width'],
      ['height'],
      ['boxShadow'],
    ],
    getCSS(themeMeta: Object, themeProps: Object): string {
      const { propsConfig, themeState } = themeProps;
      const { hover } = themeState;
      const { radioInnerCheckedTheme: afterThemeConfig, isDisabled, isChecked } = propsConfig;
      if (isChecked) {
        const {
          disabled: disabledTheme,
          hover: hoverTheme,
          normal: normalTheme,
        } = afterThemeConfig;
        const theme = isDisabled ? disabledTheme : hover ? hoverTheme || normalTheme : normalTheme;
        const { background: { color } = {} } = theme;
        const { width = 10, height = 10 } = normalTheme;
        const backgroundColor = judgeStarts(color) ? getDictValue(color) : color;

        return css`
          &::after {
            position: absolute;
            width: ${em(width)};
            height: ${em(height)};
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 100%;
            display: table;
            border-top: 0;
            border-left: 0;
            content: ' ';
            background-color: ${backgroundColor};
          }
        `;
      }

      return '';
    },
    defaultTheme: {
      border: getBorder({
        color: '$lugia-dict.@lugia/lugia-web.borderColor',
        width: 1,
        style: 'solid',
      }),
      borderRadius: getBorderRadius('100%'),
      background: { color: themeColor },
      width: 16,
      height: 16,
    },
  },
  hover: {
    selectNames: [['background'], ['borderRadius'], ['border'], ['boxShadow']],
  },
  disabled: {
    selectNames: [['background'], ['borderRadius'], ['border']],
    defaultTheme: {
      background: { color: '$lugia-dict.@lugia/lugia-web.disableColor' },
      border: getBorder({
        color: '$lugia-dict.@lugia/lugia-web.borderDisableColor',
        width: 1,
        style: 'solid',
      }),
      borderRadius: getBorderRadius('100%'),
    },
  },
});
