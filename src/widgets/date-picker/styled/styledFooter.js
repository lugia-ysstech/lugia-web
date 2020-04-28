import { css } from 'styled-components';

import { getDateWrrap, em } from './utils';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { getThemeUpdate } from './utils';

export const FooterButtonsWrap = StaticComponent({
  tag: 'div',
  css: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
});
export const FooterWrap = StaticComponent({
  tag: 'div',
  css: css`
    ${props => getBorder(props)};
    padding: ${em(10)} ${props => getDateWrrap(props).left};
  `,
});
function getBorder(props) {
  const { showFooter } = props;
  if (showFooter) {
    return `border-top: 1px solid ${getThemeUpdate().borderColor} ;`;
  }
  return '';
}
export const Footer = StaticComponent({
  tag: 'div',
  css: css`
    text-align: ${props => (props.showToday ? 'center' : '')};
  `,
});
export const FooterBtn = CSSComponent({
  tag: 'span',
  className: 'FooterBtn',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['padding'],
      ['margin'],
      ['color'],
      ['font'],
      ['fontSize'],
      ['border'],
      ['background'],
      ['borderRadius'],
    ],
    getCSS(themeMeta) {
      const { height } = themeMeta;
      return `line-height:${em(height)};`;
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize'], ['border'], ['background']],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  focus: {
    selectNames: [],
  },
  css: css`
    cursor: pointer;
    ${props => (props.showToday ? 'display:inline-block;margin:0 !important;' : '')};
  `,
  option: { hover: true },
});
export const FooterBtnToday = CSSComponent({
  tag: 'span',
  className: 'FooterBtnToday',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  hover: {
    selectNames: [['color'], ['font']],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  focus: {
    selectNames: [],
  },
  css: css`
    cursor: pointer;
  `,
  option: { hover: true },
});
export const FooterBtnTime = CSSComponent({
  tag: 'span',
  className: 'FooterBtnTime',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
    getCSS(themeMeta) {
      const { height } = themeMeta;
      return `line-height:${em(height)};`;
    },
  },
  hover: {
    selectNames: [['color']],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  focus: {
    selectNames: [],
  },
  css: css`
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    display: inline-block;
  `,
  option: { hover: true },
});
export const FooterBtnOk = CSSComponent({
  tag: 'span',
  className: 'FooterBtnOk',
  normal: {
    selectNames: [
      ['background'],
      ['margin'],
      ['padding'],
      ['borderRadius'],
      ['color'],
      ['font'],
      ['fontSize'],
    ],
    getCSS(themeMeta) {
      const { height } = themeMeta;
      return `line-height:${em(height)};`;
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize'], ['background']],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['color'], ['background']],
  },
  focus: {
    selectNames: [],
  },
  css: css`
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    display: inline-block;
  `,
  option: { hover: true },
});
export const ExtraFooter = CSSComponent({
  tag: 'div',
  className: 'ExtraFooter',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  focus: {
    selectNames: [],
  },
  css: css`
    line-height: ${em(26)};
    text-align: left;
    color: #999;
  `,
  option: { hover: true },
});
