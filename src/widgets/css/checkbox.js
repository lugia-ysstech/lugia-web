/**
 * Checkbox 颜色公共值
 * create by guorg
 * @flow
 */

import styled, { css } from 'styled-components';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import get from './theme-common-dict';
import { px2remcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import Icon from '../icon';
import { judgeStarts } from '../utils';
import { getDictValue } from '@lugia/theme-utils';

const FontSize = 1.4;
const em = px2remcss;
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const sectionFontSize = '$lugia-dict.@lugia/lugia-web.sectionFontSize';

export type CSStype = {
  themes: ThemeType,
  hasChecked: boolean,
  hasCancel: boolean,
};
type ForGroupType = {
  onChangeForGroup: (event: Object, value: any) => any,
  last: ?boolean,
};
export type CheckBoxProps = {
  checked?: boolean,
  defaultChecked?: boolean,
  disabled?: boolean,
  indeterminate?: boolean,
  cancel?: boolean,
  getTheme: Function,
  onChange?: (event: Object, checked: boolean) => any,
  value?: string,
  children?: any,
  styles?: 'default' | 'vertical',
  handleCancelItemClick: Function,
  getPartOfThemeProps: Function,
  getPartOfThemeConfig: Function,
  themeProps: Object,
} & ForGroupType;
type CheckBoxType = CheckBoxProps & CSStype;

const getAfterTransform = (props: { checked: boolean, indeterminate: boolean }): string => {
  const { checked, indeterminate } = props;
  if (checked) {
    return `
      transform: translate(-50%, -50%) rotate(45deg) scale(1);
      transition: all .2s cubic-bezier(.71,-.46,.88,.6);
  `;
  }
  if (indeterminate) {
    return `
      transform: translate(-50%, -50%) scale(1);
      transition: all .2s cubic-bezier(.03,.86,.56,.87);
    `;
  }
  return `
    transform: translate(-50%, -50%) rotate(45deg) scale(0);
    transition: all .2s cubic-bezier(.71,-.46,.88,.6);
  `;
};
const getStyleCSS = (props: CheckBoxType): string => {
  const { styles = 'default', hasCancel, last = false } = props;
  if (hasCancel) {
    return `
      display: none;
    `;
  }
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

export const CheckBoxWrap = CSSComponent({
  tag: 'label',
  className: 'CheckBoxWrap',
  css: css`
    font-size: ${FontSize}rem;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    box-sizing: border-box;
    padding: 0;
    list-style: none;
    line-height: 1;
    ${getStyleCSS};
    display: flex;
    overflow: hidden;
    align-items: center;
    text-overflow: ellipsis;
  `,
  normal: {
    defaultTheme: {
      opacity: 1,
    },
    selectNames: [['opacity'], ['margin'], ['padding'], ['width'], ['height']],
  },
  hover: {
    defaultTheme: {
      opacity: 1,
    },
    selectNames: [['opacity']],
  },
  disabled: {
    defaultTheme: {
      opacity: 1,
    },
    selectNames: [['opacity']],
  },
});

export const CheckBoxContent = StaticComponent({
  tag: 'span',
  className: 'CheckBoxContent',
  css: css`
    margin: 0;
    outline: none;
    line-height: 1;
    vertical-align: middle;
    display: inline-block;
    position: relative;
  `,
});

export const CheckBoxLabelSpan = CSSComponent({
  tag: 'span',
  className: 'CheckBoxLabelSpan',
  css: css`
    padding-left: ${props => (props.hasChildren ? em(get('marginToSameElement')) : 0)};
    vertical-align: middle;
  `,
  normal: {
    selectNames: [['color'], ['font'], ['padding']],
    defaultTheme: {
      color: blackColor,
      font: { size: sectionFontSize },
    },
  },
  hover: {
    selectNames: [['color'], ['font']],
    defaultTheme: {
      color: blackColor,
      font: { fontSize: sectionFontSize },
    },
  },
  disabled: {
    selectNames: [['color'], ['font']],
    defaultTheme: {
      color: disableTextColor,
      font: { fontSize: sectionFontSize },
    },
  },
});

export const CheckBoxInput = StaticComponent({
  tag: 'input',
  className: 'CheckBoxInput',
  css: css`
    position: absolute;
    left: 0;
    z-index: 1;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    opacity: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  `,
});

export const CheckBoxInnerSpan = CSSComponent({
  tag: 'span',
  className: 'CheckBoxInnerSpan',
  css: css`
    position: relative;
    box-sizing: border-box;
    top: 0;
    left: 0;
    display: block;
    transition: all 0.3s;
  `,
  normal: {
    selectNames: [
      ['background'],
      ['borderRadius'],
      ['boxShadow'],
      ['border'],
      ['width'],
      ['height'],
    ],
    defaultTheme: {
      width: 16,
      height: 16,
    },
    getCSS(themeMeta: Object, themeConfig: Object): string {
      const { propsConfig, themeState } = themeConfig;
      const { hover } = themeState;
      const {
        checkboxInnerCheckedTheme,
        isCancel,
        isDisabled,
        isChecked,
        isIndeterminate,
      } = propsConfig;
      if (isCancel || isChecked || isIndeterminate) {
        const {
          normal: normalTheme,
          hover: hoverTheme,
          disabled: disabledTheme,
        } = checkboxInnerCheckedTheme;
        const defaultWidth = isChecked ? 6 : isIndeterminate ? 10 : 6;
        const defaultHeight = isChecked ? 10 : isIndeterminate ? 1 : 10;
        const currentTheme = isDisabled ? disabledTheme : hover ? hoverTheme : normalTheme;
        const {
          background: { color },
          width = defaultWidth,
          height = defaultHeight,
        } = currentTheme;
        const borderColor = judgeStarts(color) ? getDictValue(color) : color;

        return css`
          &::after {
            position: absolute;
            box-sizing: border-box;
            ${getAfterTransform({
              indeterminate: isIndeterminate,
              checked: isChecked || isCancel,
            })};
            left: 50%;
            top: 50%;
            width: ${em(width)};
            height: ${em(height)};
            display: table;
            border: ${em(2)} solid ${borderColor};
            border-top: 0;
            border-left: 0;
            content: ' ';
          }
        `;
      }

      return '';
    },
  },
  hover: {
    selectNames: [['background'], ['borderRadius'], ['boxShadow'], ['border']],
  },
  disabled: {
    selectNames: [['background'], ['borderRadius'], ['boxShadow'], ['border']],
  },
});

export const HoverSpan = StaticComponent({
  tag: 'span',
  className: 'CheckboxHoverSpan',
  css: css`
    box-sizing: border-box;
    display: block;
    width: ${em(18)};
    height: ${em(18)};
  `,
});
export const IconWrap: Object = styled(Icon)`
  vertical-align: text-bottom !important;
  font-size: ${em(16)};
  color: ${get('mediumGreyColor')};
`;
