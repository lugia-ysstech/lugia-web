/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { RadioProps } from '../css/radio';
import { RadioChildrenSpan, RadioContent, RadioInnerSpan, RadioWrap } from '../css/radio';

type RadioState = {};

export default ThemeProvider(
  class extends React.Component<RadioProps, RadioState> {
    handleClick = (value: string) => (e: Event) => {
      const { onChange, disabled, cancel } = this.props;
      if (!disabled && !cancel) {
        onChange && onChange(e, value);
        e.stopPropagation();
        e.preventDefault();
      }
    };
    render() {
      const {
        children,
        value = '',
        getTheme,
        disabled,
        styles,
        checked,
        cancel,
        defaultChecked,
      } = this.props;
      return (
        <RadioWrap
          themes={getTheme()}
          onClick={this.handleClick(value)}
          styles={styles}
          disabled={disabled}
          cancel={cancel}
        >
          <RadioContent>
            <RadioInnerSpan
              themes={getTheme()}
              cancel={cancel}
              disabled={disabled}
              checked={checked || defaultChecked}
            />
          </RadioContent>
          <RadioChildrenSpan>{children}</RadioChildrenSpan>
        </RadioWrap>
      );
    }
  },
  Widget.Radio
);
