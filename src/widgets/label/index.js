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
  className: 'LabelConfig',
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
    selectNames: [['cursor']],
  },
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
  `,
  option: { hover: true },
});

type TriggerProps = {
  text?: string,
  children?: React.Element<any>,
  themeProps: Object,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
type TriggerState = {};

class Label extends React.Component<TriggerProps, TriggerState> {
  render() {
    const { text, children, onClick = () => {} } = this.props;
    const target = children ? children : text;
    const themeProps = this.props.getPartOfThemeProps('LabelConfig');
    return (
      <React.Fragment>
        <LabelContainer themeProps={themeProps} onClick={onClick}>
          {target}
        </LabelContainer>
      </React.Fragment>
    );
  }
}

export default ThemeProvider(Label, Widget.Label);
