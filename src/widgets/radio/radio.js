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

type RadioState = {
  checked: boolean,
};

export default ThemeProvider(
  class extends React.Component<RadioProps, RadioState> {
    static getDerivedStateFromProps(props, state) {
      const hasChecked = 'checked' in props;
      if (hasChecked) {
        return {
          checked: props.checked,
        };
      }
      if (!state) {
        const { defaultChecked } = props;
        return {
          checked: defaultChecked || false,
        };
      }
      return { checked: state.checked };
    }

    handleClick = (value: string) => (e: Event) => {
      const { onChange, disabled, cancel, onChangeForGroup } = this.props;
      if (!disabled && !cancel) {
        const { checked } = this.state;
        onChange && onChange(e, !checked);
        onChangeForGroup && onChangeForGroup(e, value);
        const inProps = 'checked' in this.props;
        if (!inProps) {
          this.setState({
            checked: !checked,
          });
        }
        e.stopPropagation();
        e.preventDefault();
      }
    };
    render() {
      const { children, value = '', getTheme, disabled, styles, cancel } = this.props;
      const { checked } = this.state;
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
              checked={checked}
            />
          </RadioContent>
          <RadioChildrenSpan>{children}</RadioChildrenSpan>
        </RadioWrap>
      );
    }
  },
  Widget.Radio
);
