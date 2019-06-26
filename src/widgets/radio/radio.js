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
import { getBorder } from '@lugia/theme-css-hoc/lib/index';

type RadioState = {
  checked: boolean,
};

const { themeColor, lightGreyColor, disableColor, borderDisableColor } = colorsFunc();
const cancelColor = colorsFunc(themeColor).disabledColor;
const defaultProps = {
  normal: { width: 10, height: 10, background: { color: themeColor } },
  hover: { width: 10, height: 10, background: { color: themeColor } },
  disabled: { width: 10, height: 10, background: { color: lightGreyColor } },
};
const defaultEdgeCancelProps = {
  themeConfig: {
    normal: {
      width: 16,
      height: 16,
      background: { color: '#fff' },
      border: getBorder({ color: cancelColor, width: 1, style: 'solid' }, { radius: 100 }),
    },
    hover: {
      background: { color: '#fff' },
      border: getBorder({ color: cancelColor, width: 1, style: 'solid' }, { radius: 100 }),
    },
  },
};
const defaultInnerCancelProps = {
  normal: { width: 10, height: 10, background: { color: cancelColor } },
  hover: { width: 10, height: 10, background: { color: cancelColor } },
};
const defaultEdgeCheckedProps = {
  themeConfig: {
    normal: {
      width: 16,
      height: 16,
      background: { color: '#fff' },
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }, { radius: '100%' }),
    },
    hover: {
      background: { color: '#fff' },
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }, { radius: '100%' }),
    },
    disabled: {
      background: { color: disableColor },
      border: getBorder(
        { color: borderDisableColor, width: 1, style: 'solid' },
        { radius: '100%' }
      ),
    },
  },
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
        disabled,
        styles = 'default',
        cancel,
        themeProps,
        getPartOfThemeProps,
        getPartOfThemeConfig,
      } = this.props;
      const { checked } = this.state;
      const RadioWrapTheme = getPartOfThemeProps('RadioWrap');
      const RadioTextTheme = getPartOfThemeProps('RadioText');
      const RadioEdgeCheckedTheme = getPartOfThemeProps('RadioEdgeChecked');
      const RadioEdgeUnCheckedTheme = getPartOfThemeProps('RadioEdgeUnChecked');
      const RadioEdgeCancelTheme = getPartOfThemeProps('RadioEdgeCancel');
      const RadioInnerCheckedTheme = getPartOfThemeConfig('RadioInnerChecked');
      const RadioInnerCancelTheme = getPartOfThemeConfig('RadioInnerChecked');
      const CircleEdgeTheme = cancel
        ? deepMerge(defaultEdgeCancelProps, RadioEdgeCancelTheme)
        : checked
        ? deepMerge(defaultEdgeCheckedProps, RadioEdgeCheckedTheme)
        : RadioEdgeUnCheckedTheme;
      if (checked) {
        CircleEdgeTheme.propsConfig.RadioInnerCheckedTheme = deepMerge(
          defaultProps,
          RadioInnerCheckedTheme
        );
      }
      if (cancel) {
        CircleEdgeTheme.propsConfig.RadioInnerCheckedTheme = deepMerge(
          defaultInnerCancelProps,
          RadioInnerCancelTheme
        );
      }
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
