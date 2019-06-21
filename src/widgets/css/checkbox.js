/**
 * Checkbox 颜色公共值
 * create by guorg
 * @flow
 */

import colorsFunc from '../css/stateColor';
import styled, { css } from 'styled-components';
import CSSComponent, { StaticComponent, getBorder } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import type { ThemeType } from '@lugia/lugia-web';
import Icon from '../icon';

const FontSize = 1.4;
const defaultColor = '#fff';
const em = px2remcss;
const {
  themeColor,
  mediumGreyColor,
  marginToDifferentElement,
  marginToPeerElementForY,
  blackColor,
  lightGreyColor,
} = colorsFunc();

export type CSStype = {
  themes: ThemeType,
  hasChecked: boolean,
  hasCancel: boolean,
};
type ForGroupType = {
  onChangeForGroup: (event: Object, value: any) => any,
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
  const { styles = 'default', hasCancel } = props;
  if (hasCancel) {
    return `
      display: none;
    `;
  }
  if (styles === 'vertical') {
    return `
      display: block;
      margin-bottom: ${em(marginToPeerElementForY)};
    `;
  }
  return `
    display: inline-block;
    margin-right: ${em(marginToDifferentElement)};
  `;
};

export const CheckBoxWrap = CSSComponent({
  tag: 'label',
  className: 'checkbox-wrap',
  css: css`
    font-size: ${FontSize}rem;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    box-sizing: border-box;
    padding: 0;
    list-style: none;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    ${getStyleCSS};
  `,
  normal: {
    defaultTheme: {
      color: blackColor,
    },
    selectNames: [['color'], ['font'], ['opacity'], ['margin'], ['padding'], ['width'], ['height']],
  },
  hover: {
    defaultTheme: {
      color: blackColor,
    },
    selectNames: [['opacity'], ['color']],
  },
  disabled: {
    defaultTheme: {
      color: lightGreyColor,
    },
    selectNames: [['opacity'], ['color']],
  },
  active: {
    defaultTheme: {
      color: blackColor,
    },
    selectNames: [['opacity'], ['color']],
  },
});

export const CheckBoxContent = StaticComponent({
  tag: 'span',
  className: 'checkbox-content',
  css: css`
    margin: 0;
    outline: none;
    line-height: 1;
    vertical-align: text-bottom;
    display: inline-block;
  `,
});

export const CheckBoxLabelSpan = StaticComponent({
  tag: 'span',
  className: 'checkbox-label-span',
  css: css`
    padding-left: ${em(10)};
  `,
});

export const CheckBoxInput = StaticComponent({
  tag: 'input',
  className: 'checkbox-input',
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
  className: 'checkbox-inner-span',
  css: css`
    position: relative;
    box-sizing: border-box;
    top: 0;
    left: 0;
    display: block;
    width: ${em(18)};
    height: ${em(18)};
    transition: all 0.3s;
  `,
  normal: {
    selectNames: [['background'], ['border']],
    getCSS(themeMeta: Object): string {
      const { checked, isDisabled, isIndeterminate, isChecked } = themeMeta;
      if (checked) {
        const defaultWidth = isChecked ? 6 : isIndeterminate ? 10 : 6;
        const defaultHeight = isChecked ? 10 : isIndeterminate ? 1 : 10;
        const { background } = checked;
        const colors = background ? background.color : isDisabled ? lightGreyColor : defaultColor;

        return css`
          &::after {
            position: absolute;
            box-sizing: border-box;
            ${getAfterTransform({ indeterminate: isIndeterminate, checked: isChecked })};
            left: 50%;
            top: 50%;
            width: ${em(defaultWidth)};
            height: ${em(defaultHeight)};
            display: table;
            border: ${em(2)} solid ${colors};
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
    selectNames: [['background'], ['border']],
    defaultTheme: {
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }, { radius: 2 }),
    },
  },
  disabled: { selectNames: [['background'], ['border']] },
  active: { selectNames: [] },
});

export const HoverSpan = StaticComponent({
  tag: 'span',
  className: 'checkbox-hover-span',
  css: css`
    box-sizing: border-box;
    display: block;
    width: ${em(18)};
    height: ${em(18)};
  `,
});
export const IconWrap: Object = styled(Icon)`
  vertical-align: text-bottom !important;
  font-size: ${em(18)};
  color: ${mediumGreyColor};
`;
