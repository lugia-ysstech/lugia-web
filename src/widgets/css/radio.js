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
import { getBorder } from '@lugia/theme-css-hoc';

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
    selectNames: [['color'], ['font'], ['opacity'], ['margin'], ['padding'], ['width'], ['height']],
  },
  hover: {
    selectNames: [['opacity'], ['color']],
  },
  disabled: {
    selectNames: [['opacity']],
  },
  active: {
    selectNames: [['opacity']],
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

export const RadioChildrenSpan = StaticComponent({
  tag: 'span',
  className: 'radio-children-span',
  css: css`
    padding-left: ${em(padding)};
  `,
});

export const RadioCircleSpan = CSSComponent({
  tag: 'span',
  className: 'radio-children-span',
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
    selectNames: [['background'], ['border'], ['width'], ['height']],
    getCSS(themeMeta: Object): string {
      const { checked, isDisabled, isCancel } = themeMeta;
      if (checked) {
        const { background, width = 10, height = 10 } = checked;
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
            background-color: ${background
              ? background.color
              : isCancel
              ? colorsFunc(themeColor).disabledColor
              : isDisabled
              ? lightGreyColor
              : themeColor};
          }
        `;
      }

      return '';
    },
  },
  hover: {
    selectNames: [['background'], ['border']],
    defaultTheme: {
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }, { radius: '100%' }),
    },
  },
  disabled: {
    selectNames: [['background'], ['border']],
    defaultTheme: {
      background: { color: disableColor },
      border: getBorder(
        { color: borderDisableColor, width: 1, style: 'solid' },
        { radius: '100%' }
      ),
    },
  },
  active: {
    selectNames: [],
  },
});
