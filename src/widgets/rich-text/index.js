/**
 *
 *
 * create by shine
 * @flow
 */
import '../common/shirm';

import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import CSSComponent, { css } from '@lugia/theme-css-hoc';

const sectionFontSize = '$lugia-dict.@lugia/lugia-web.sectionFontSize';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';

const LabelContainer = CSSComponent({
  tag: 'div',
  className: 'Container',
  normal: {
    selectNames: [
      ['margin'],
      ['padding'],
      ['cursor'],
      ['width'],
      ['height'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
    defaultTheme: {
      color: blackColor,
      fontSize: sectionFontSize,
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { textAlign } = theme;
      return `text-align: ${textAlign}`;
    },
  },
  hover: {
    selectNames: [['cursor'], ['border'], ['borderRadius'], ['boxShadow'], ['background']],
  },
  disabled: {
    selectNames: [['cursor'], ['border'], ['borderRadius'], ['boxShadow'], ['background']],
  },
  css: css`
    display: inline-block;
    box-sizing: border-box;
    line-height: 1.4;
    font-size: 14px;
    font-family: sans-serif !important;
    white-space: normal;
    word-break: break-word;
  `,
  option: { hover: true },
});

type RichTextProps = {
  text?: string,
  title?: string,
  themeProps: Object,
  onClick: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
type RichTextState = {};

class RichText extends React.Component<RichTextProps, RichTextState> {
  render() {
    const { text = 'RichText', title = '', onClick = () => {} } = this.props;
    const themeProps = this.props.getPartOfThemeProps('Container');
    return (
      <LabelContainer
        themeProps={themeProps}
        onClick={onClick}
        title={title}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }
}

export default ThemeProvider(RichText, Widget.RichText);
