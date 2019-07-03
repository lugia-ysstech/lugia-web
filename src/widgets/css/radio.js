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
import { getBorder } from '@lugia/theme-utils';
import { getBorderRadius } from '../theme/CSSProvider';

const em = px2remcss;
const {
  themeColor,
  padding,
  borderColor,
  borderDisableColor,
  disableColor,
  marginToSameElement,
  marginToPeerElementForY,
  lightGreyColor,
  blackColor,
} = colorsFunc();

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
};
type RadioType = RadioProps & CSStype;

const getStyleCSS = (props: RadioType): string => {
  const { styles = 'default' } = props;
  if (styles === 'vertical') {
    return `
      display: block;
      margin-bottom: ${em(marginToPeerElementForY)};
    `;
  }
  return `
    display: inline-block;
    margin-right: ${em(marginToSameElement)};
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
  className: 'radio-wrap',
  css: css`
    line-height: 1.5;
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
  className: 'radio-content',
  css: css`
    margin: 0;
    outline: none;
    line-height: 1;
    vertical-align: text-bottom;
    display: inline-block;
  `,
});

export const RadioChildrenSpan = CSSComponent({
  tag: 'span',
  className: 'radio-children-span',
  css: css`
    padding-left: ${em(padding)};
  `,
  normal: {
    selectNames: [['color'], ['font'], ['padding']],
    defaultTheme: {
      color: blackColor,
      font: { fontSize: em(14) },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: padding,
      },
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
      color: lightGreyColor,
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
  className: 'radio-circle-span',
  css: css`
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: ${em(16)};
    height: ${em(16)};
    border-radius: 50%;
    border: 1px solid ${borderColor};
    background-color: #fff;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  `,
  normal: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['width'], ['height']],
    getCSS(themeMeta: Object, themeProps: Object): string {
      const { propsConfig, themeState } = themeProps;
      const { hover } = themeState;
      const { RadioInnerCheckedTheme: afterThemeConfig, isDisabled, isChecked } = propsConfig;
      if (isChecked) {
        const theme = isDisabled
          ? afterThemeConfig.disabled
          : hover
          ? afterThemeConfig.hover
          : afterThemeConfig.normal;
        const { background, width = 10, height = 10 } = theme;
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
            background-color: ${background.color};
          }
        `;
      }

      return '';
    },
    defaultTheme: {
      border: getBorder({ color: borderColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius('100%'),
      background: { color: '#fff' },
      width: 16,
      height: 16,
    },
  },
  hover: {
    selectNames: [['background'], ['borderRadius'], ['border']],
    defaultTheme: {
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius('100%'),
      background: { color: '#fff' },
    },
  },
  disabled: {
    selectNames: [['background'], ['borderRadius'], ['border']],
    defaultTheme: {
      background: { color: disableColor },
      border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius('100%'),
    },
  },
  active: {
    selectNames: [],
    defaultTheme: {
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
      background: { color: '#fff' },
      borderRadius: getBorderRadius('100%'),
    },
  },
});
