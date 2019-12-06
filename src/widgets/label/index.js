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
    ],
    getCSS: (theme: Object, themeProps: Object) => {
      const { textAlign } = theme;
      return `text-align: ${textAlign}`;
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['fontSize'], ['margin'], ['padding'], ['cursor']],
  },
  disabled: {
    selectNames: [['color'], ['cursor'], ['background']],
  },
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
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
    ],
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

type TriggerProps = {
  text?: string,
  prefix?: string,
  showPrefix?: boolean,
  children?: React.Element<any>,
  themeProps: Object,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
type TriggerState = {};

class Label extends React.Component<TriggerProps, TriggerState> {
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
