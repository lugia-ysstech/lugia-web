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
        styles,
        cancel,
        themeProps,
        mergeThemeStateAndChildThemeProps,
      } = this.props;
      const { checked } = this.state;
      const CircleEdgeTheme = mergeThemeStateAndChildThemeProps('RadioEdge');
      const CircleCheckedTheme = mergeThemeStateAndChildThemeProps('RadioChecked');
      const defaultProps = {
        normal: {},
        actived: {},
        hover: {},
        disabled: {},
      };
      if (checked) {
        CircleEdgeTheme.themeConfig = deepMerge(defaultProps, CircleEdgeTheme.themeConfig);
        CircleEdgeTheme.themeConfig = deepMerge(defaultProps, CircleEdgeTheme.themeConfig);
        CircleEdgeTheme.themeConfig.normal = deepMerge(
          CircleEdgeTheme.themeConfig.normal,
          CircleEdgeTheme.themeConfig.actived
        );
        CircleEdgeTheme.themeState.hover = false;
        themeProps.themeState.hover = false;
        CircleEdgeTheme.themeConfig.normal.checked = cancel
          ? CircleCheckedTheme.themeConfig.cancel || {}
          : disabled
          ? CircleCheckedTheme.themeConfig.disabled || {}
          : CircleCheckedTheme.themeConfig.actived || {};
        CircleEdgeTheme.themeConfig.normal.isDisabled = disabled;
        CircleEdgeTheme.themeConfig.normal.isCancel = cancel;
      }
      if (disabled) {
        CircleEdgeTheme.themeConfig = deepMerge(defaultProps, CircleEdgeTheme.themeConfig);
        CircleEdgeTheme.themeState.hover = false;
        themeProps.themeState.hover = false;
      }

      // console.log(
      //   'deepMerge(CircleEdgeTheme.normal, CircleEdgeTheme.actived)',
      //   deepMerge(CircleEdgeTheme.normal, CircleEdgeTheme.actived)
      // );
      console.log('CircleCheckedTheme', CircleCheckedTheme);
      return (
        <RadioWrap
          themes={getTheme()}
          themeProps={themeProps}
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
  { hover: true, actived: true }
);
