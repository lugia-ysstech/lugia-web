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
    selectNames: [['color'], ['font'], ['lineHeight'], ['margin'], ['padding'], ['cursor']],
  },
  hover: {
    selectNames: [['color'], ['font'], ['margin'], ['padding'], ['cursor']],
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
    const { text = 'this is a Label', children } = this.props;
    const target = children ? children : text;
    const themeProps = this.props.getPartOfThemeProps('LabelConfig');
    return (
      <React.Fragment>
        <LabelContainer themeProps={themeProps}>{target}</LabelContainer>
      </React.Fragment>
    );
  }
}

export default ThemeProvider(Label, Widget.Label);
