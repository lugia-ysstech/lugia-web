/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { deepMerge } from '@lugia/object-utils';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { RadioProps } from '../css/radio';
import { RadioChildrenSpan, RadioContent, RadioCircleSpan, RadioWrap } from '../css/radio';

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
      const {
        children,
        value = '',
        getTheme,
        disabled,
        styles = 'default',
        cancel,
        themeProps,
        getPartOfThemeProps,
      } = this.props;
      const { checked } = this.state;
      const RadioWrapProps = getPartOfThemeProps('RadioWrap');
      const CircleEdgeTheme = getPartOfThemeProps('RadioEdge');
      const CircleCheckedTheme = getPartOfThemeProps('RadioChecked');
      const defaultProps = {
        normal: {},
        active: {},
        hover: {},
        disabled: {},
      };
      if (checked) {
        CircleEdgeTheme.themeConfig = deepMerge(defaultProps, CircleEdgeTheme.themeConfig);
        CircleEdgeTheme.themeConfig.normal = deepMerge(
          CircleEdgeTheme.themeConfig.normal,
          CircleEdgeTheme.themeConfig.active
        );
        CircleEdgeTheme.themeState.hover = false;
        RadioWrapProps.themeState.hover = false;
        CircleEdgeTheme.themeConfig.normal.checked = cancel
          ? CircleCheckedTheme.themeConfig.cancel || {}
          : disabled
          ? CircleCheckedTheme.themeConfig.disabled || {}
          : CircleCheckedTheme.themeConfig.active || {};
        CircleEdgeTheme.themeConfig.normal.isDisabled = disabled;
        CircleEdgeTheme.themeConfig.normal.isCancel = cancel;
      }
      if (disabled) {
        CircleEdgeTheme.themeConfig = deepMerge(defaultProps, CircleEdgeTheme.themeConfig);
        CircleEdgeTheme.themeState.hover = false;
        RadioWrapProps.themeState.hover = false;
      }

      console.log('themeProps', themeProps);
      return (
        <RadioWrap
          themes={getTheme()}
          themeProps={RadioWrapProps}
          onClick={this.handleClick(value)}
          styles={styles}
          disabled={disabled}
          cancel={cancel}
        >
          <RadioContent themeProps={themeProps}>
            <RadioCircleSpan
              themes={getTheme()}
              themeProps={CircleEdgeTheme}
              cancel={cancel}
              disabled={disabled}
              checked={checked}
            />
          </RadioContent>
          <RadioChildrenSpan themeProps={themeProps}>{children}</RadioChildrenSpan>
        </RadioWrap>
      );
    }
  },
  Widget.Radio,
  { hover: true, active: true }
);
