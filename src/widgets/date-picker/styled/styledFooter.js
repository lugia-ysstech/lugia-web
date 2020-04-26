import styled, { css } from 'styled-components';

import { themeColor, getDateWrrap, em } from './utils';
import CSSComponent from '@lugia/theme-css-hoc';
const { borderColor } = themeColor;
export const FooterButtonsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FooterWrap = styled.div`
  ${props => getBorder(props)};
  padding: ${em(10)} ${props => getDateWrrap(props).left};
`;
function getBorder(props) {
  const { showFooter } = props;
  if (showFooter) {
    return `border-top: 1px solid ${borderColor} ;`;
  }
  return '';
}
export const Footer = styled.div`
  text-align: ${props => (props.showToday ? 'center' : '')};
`;
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
    getCSS() {
      console.log('hover');
    },
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
    cursor: pointer;
    display: inline-block;
  `,
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
    cursor: pointer;
    display: inline-block;
  `,
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
});
