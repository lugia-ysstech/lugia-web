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
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
import get from '../css/theme-common-dict';

type RadioState = {
  checked: boolean,
};

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const borderDisableColor = '$lugia-dict.@lugia/lugia-web.borderDisableColor';

const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
const cancelColor = '$lugia-dict.@lugia/lugia-web.themeDisabledColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';

const defaultProps = {
  normal: { width: 10, height: 10, background: { color: themeColor } },
  disabled: { width: 10, height: 10, background: { color: lightGreyColor } },
};
const defaultEdgeCancelProps = () => ({
  themeConfig: {
    normal: {
      width: 16,
      height: 16,
      background: { color: defaultColor },
      border: getBorder({ color: cancelColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(100),
    },
  },
});
const defaultInnerCancelProps = {
  normal: { width: 10, height: 10, background: { color: cancelColor } },
};
const defaultTextCancelProps = {
  themeConfig: {
    normal: {
      color: darkGreyColor,
    },
  },
};
const defaultEdgeUnCheckedProps = () => ({
  themeConfig: {
    normal: {
      width: 16,
      height: 16,
      background: { color: defaultColor },
      border: getBorder(get('normalBorder')),
      borderRadius: getBorderRadius('100%'),
    },
    hover: {
      border: getBorder(get('hoverBorder')),
      borderRadius: getBorderRadius('100%'),
      background: { color: defaultColor },
    },
    focus: {
      border: getBorder(get('focusBorder')),
    },
    disabled: {
      background: { color: disableColor },
      border: getBorder(get('disabledBorder')),
      borderRadius: getBorderRadius('100%'),
    },
  },
});
const defaultEdgeCheckedProps = {
  themeConfig: {
    normal: {
      width: 16,
      height: 16,
      background: { color: defaultColor },
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius('100%'),
    },
    disabled: {
      background: { color: disableColor },
      border: getBorder({ color: borderDisableColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius('100%'),
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
        last = true,
      } = this.props;
      const { checked } = this.state;
      const radioWrapTheme = getPartOfThemeProps('Container');
      const radioTextNormalTheme = getPartOfThemeProps('RadioText');
      const radioTextCancelTheme = getPartOfThemeProps('RadioTextCancel');
      const radioEdgeCheckedTheme = getPartOfThemeProps('RadioEdgeChecked');
      const radioEdgeUnCheckedTheme = getPartOfThemeProps('RadioEdgeUnChecked');
      const radioEdgeCancelTheme = getPartOfThemeProps('RadioEdgeCancel');
      const radioInnerCheckedTheme = getPartOfThemeConfig('RadioInnerChecked');
      const radioInnerCancelTheme = getPartOfThemeConfig('RadioInnerChecked');
      const circleEdgeTheme = cancel
        ? deepMerge(defaultEdgeCancelProps(), radioEdgeCancelTheme)
        : checked
        ? deepMerge(defaultEdgeCheckedProps, radioEdgeCheckedTheme)
        : deepMerge(defaultEdgeUnCheckedProps(), radioEdgeUnCheckedTheme);
      const radioTextTheme = cancel
        ? deepMerge(defaultTextCancelProps, radioTextCancelTheme)
        : radioTextNormalTheme;
      if (checked) {
        circleEdgeTheme.propsConfig.radioInnerCheckedTheme = deepMerge(
          defaultProps,
          radioInnerCheckedTheme
        );
      }
      if (cancel) {
        circleEdgeTheme.propsConfig.radioInnerCheckedTheme = deepMerge(
          defaultInnerCancelProps,
          radioInnerCancelTheme
        );
      }
      circleEdgeTheme.propsConfig.isChecked = checked;
      circleEdgeTheme.propsConfig.isCancel = cancel;
      circleEdgeTheme.propsConfig.isDisabled = disabled;
      return (
        <RadioWrap
          themeProps={radioWrapTheme}
          onClick={this.handleClick(value)}
          styles={styles}
          disabled={disabled}
          cancel={cancel}
          last={last}
          {...addMouseEvent(this)}
        >
          <RadioContent themeProps={themeProps}>
            <RadioCircleSpan
              themeProps={circleEdgeTheme}
              cancel={cancel}
              disabled={disabled}
              checked={checked}
            />
          </RadioContent>
          <RadioChildrenSpan hasChildren={!!children} cancel={cancel} themeProps={radioTextTheme}>
            {children}
          </RadioChildrenSpan>
        </RadioWrap>
      );
    }
  },
  Widget.Radio,
  { hover: true, active: true }
);
