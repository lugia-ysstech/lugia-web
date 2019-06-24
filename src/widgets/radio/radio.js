/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { deepMerge } from '@lugia/object-utils';
import { addMouseEvent } from '@lugia/theme-hoc';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { RadioProps } from '../css/radio';
import { RadioChildrenSpan, RadioContent, RadioCircleSpan, RadioWrap } from '../css/radio';
import colorsFunc from '../css/stateColor';

type RadioState = {
  checked: boolean,
};

const { themeColor, lightGreyColor } = colorsFunc();
const cancelColor = colorsFunc(themeColor).disabledColor;

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
        disabled,
        styles = 'default',
        cancel,
        themeProps,
        getPartOfThemeProps,
      } = this.props;
      const { checked } = this.state;
      const defaultProps = {
        normal: { width: 10, height: 10, background: { color: themeColor } },
        active: { width: 10, height: 10, background: { color: themeColor } },
        hover: { width: 10, height: 10, background: { color: themeColor } },
        disabled: { width: 10, height: 10, background: { color: lightGreyColor } },
        cancel: { width: 10, height: 10, background: { color: cancelColor } },
      };
      const RadioWrapTheme = getPartOfThemeProps('RadioWrap');
      const RadioTextTheme = getPartOfThemeProps('RadioText');
      const RadioEdgeCheckedTheme = getPartOfThemeProps('RadioEdgeChecked');
      const RadioEdgeUnCheckedTheme = getPartOfThemeProps('RadioEdgeUnChecked');
      const RadioInnerCheckedTheme = getPartOfThemeProps('RadioInnerChecked');
      RadioInnerCheckedTheme.themeConfig = deepMerge(
        defaultProps,
        RadioInnerCheckedTheme.themeConfig
      );
      const CircleEdgeTheme = checked ? RadioEdgeCheckedTheme : RadioEdgeUnCheckedTheme;
      CircleEdgeTheme.propsConfig.RadioInnerCheckedTheme = RadioInnerCheckedTheme;
      CircleEdgeTheme.propsConfig.isChecked = checked;
      CircleEdgeTheme.propsConfig.isCancel = cancel;
      CircleEdgeTheme.propsConfig.isDisabled = disabled;

      return (
        <RadioWrap
          themeProps={RadioWrapTheme}
          onClick={this.handleClick(value)}
          styles={styles}
          disabled={disabled}
          cancel={cancel}
          {...addMouseEvent(this)}
        >
          <RadioContent themeProps={themeProps}>
            <RadioCircleSpan
              themeProps={CircleEdgeTheme}
              cancel={cancel}
              disabled={disabled}
              checked={checked}
            />
          </RadioContent>
          <RadioChildrenSpan themeProps={RadioTextTheme}>{children}</RadioChildrenSpan>
        </RadioWrap>
      );
    }
  },
  Widget.Radio,
  { hover: true, active: true }
);
