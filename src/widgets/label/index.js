/**
 *
 *
 * create by lyq
 * @flow
 */
import '../common/shirm';

import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import CSSComponent, { css } from '@lugia/theme-css-hoc';

const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const sectionFontSize = '$lugia-dict.@lugia/lugia-web.sectionFontSize';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';

const LabelContainer = CSSComponent({
  tag: 'div',
  className: 'Container',
  normal: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['lineHeight'],
      ['margin'],
      ['padding'],
      ['cursor'],
      ['width'],
      ['height'],
      ['background'],
      ['textAlign'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['font'],
      ['wordBreak'],
      ['whiteSpace'],
      ['textOverflow'],
      ['overflow'],
    ],
    getThemeMeta() {
      return {
        color: blackColor,
        fontSize: sectionFontSize,
      };
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { textAlign } = theme;
      return `text-align: ${textAlign}`;
    },
  },
  hover: {
    selectNames: [
      ['color'],
      ['font'],
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
  },
  disabled: {
    selectNames: [
      ['color'],
      ['font'],
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
  },
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: pre;
  `,
  option: { hover: true },
});
const LabelPrefix = CSSComponent({
  tag: 'span',
  className: 'LabelPrefix',
  normal: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['lineHeight'],
      ['margin'],
      ['cursor'],
      ['width'],
      ['height'],
      ['textAlign'],
      ['font'],
    ],
    getThemeMeta() {
      return {
        color: dangerColor,
        fontSize: sectionFontSize,
      };
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { textAlign } = theme;
      return `text-align: ${textAlign}`;
    },
  },
  hover: {
    selectNames: [['color'], ['cursor']],
  },
  disabled: {
    selectNames: [['color'], ['cursor']],
  },
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    vertical-align: top;
  `,
  option: { hover: true },
});

type LabelProps = {
  text?: string,
  prefix?: string,
  showPrefix?: boolean,
  children?: React.Element<any>,
  themeProps: Object,
  onClick: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
type LabelState = {};

class Label extends React.Component<LabelProps, LabelState> {
  render() {
    const { text, children, onClick = () => {}, showPrefix, prefix } = this.props;
    const target = children ? children : text;
    const themeProps = this.props.getPartOfThemeProps('Container');
    const prefixThemeProps = this.props.getPartOfThemeProps('LabelPrefix');
    return (
      <React.Fragment>
        <LabelContainer themeProps={themeProps} onClick={onClick}>
          {showPrefix && <LabelPrefix themeProps={prefixThemeProps}>{prefix}</LabelPrefix>}
          {target}
        </LabelContainer>
      </React.Fragment>
    );
  }
}

export default ThemeProvider(Label, Widget.Label);
