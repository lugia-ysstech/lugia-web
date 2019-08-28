/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import { getBorder } from '@lugia/theme-utils';
import { deepMerge } from '@lugia/object-utils';
import colorsFunc from '../css/stateColor';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import type { CheckBoxProps } from '../css/checkbox';
import {
  CheckBoxContent,
  CheckBoxInnerSpan,
  CheckBoxInput,
  CheckBoxLabelSpan,
  CheckBoxWrap,
  HoverSpan,
  IconWrap,
} from '../css/checkbox';
import { addMouseEvent } from '@lugia/theme-hoc';
import { getBorderRadius } from '../theme/CSSProvider';

type CheckBoxState = {
  checked: boolean,
  hasChecked: boolean,
  hover: boolean,
  hasCancel: boolean,
};

const {
  themeColor,

  disableColor,
  disabledColor,
  lightGreyColor,
} = colorsFunc();
const defaultEdgeCancelProps = {
  themeConfig: {
    normal: {
      border: getBorder({ color: disabledColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(2),
      background: { color: disabledColor },
    },
  },
};
const defaultEdgeTheme = {
  themeConfig: {
    normal: {
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(2),
      background: { color: themeColor },
    },
    hover: {
      border: getBorder({ color: themeColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(2),
      background: { color: themeColor },
    },
    disabled: {
      border: getBorder({ color: disableColor, width: 1, style: 'solid' }),
      borderRadius: getBorderRadius(2),
      background: { color: disableColor },
    },
  },
};
const defaultInnerTheme = {
  normal: {
    color: '#fff',
  },
  hover: {
    color: '#fff',
  },
  disabled: {
    color: lightGreyColor,
  },
};

export default ThemeProvider(
  class extends React.Component<CheckBoxProps, CheckBoxState> {
    static displayName = Widget.Checkbox;
    static getDerivedStateFromProps(props, state) {
      const isChecked = 'checked' in props;
      const checked = isChecked ? props.checked : state ? state.checked : props.defaultChecked;
      if (!state) {
        return {
          checked,
          hasChecked: false,
          hover: false,
          hasCancel: false,
        };
      }
      return {
        checked,
      };
    }

    handleClick = value => e => {
      const { onChange, disabled, onChangeForGroup } = this.props;
      const { checked } = this.state;
      if (!disabled) {
        this.setState({
          checked: !checked,
          hasChecked: checked,
        });
        onChange && onChange(e, !checked);
        onChangeForGroup && onChangeForGroup(e, value);
        e.stopPropagation();
        e.preventDefault();
      }
    };
    handleBlur = () => {
      this.setState({
        hasChecked: false,
      });
    };
    handleMouseEnter = () => {
      this.setState({
        hover: true,
      });
    };
    handleMouseLeave = () => {
      this.setState({
        hover: false,
      });
    };
    handleCancel = e => {
      const { value, handleCancelItemClick } = this.props;
      handleCancelItemClick && handleCancelItemClick(value);
    };

    render() {
      const {
        value = this.props.children,
        disabled,
        cancel,
        indeterminate = false,
        styles = 'default',
        children,
        themeProps,
        getPartOfThemeProps,
        getPartOfThemeConfig,
      } = this.props;
      const { checked, hasChecked, hasCancel } = this.state;
      const config = {};
      if (cancel) {
        config.enter = this.handleMouseEnter;
        config.leave = this.handleMouseLeave;
      }

      const checkboxWrapProps = getPartOfThemeProps('Container');
      const circleEdgeCheckedTheme = getPartOfThemeProps('CheckboxEdgeChecked');
      const circleEdgeUnCheckedTheme = getPartOfThemeProps('CheckboxEdgeUnChecked');
      const circleEdgeCancelTheme = getPartOfThemeProps('CheckboxEdgeCancel');
      const circleEdgeIndeterminateTheme = getPartOfThemeProps('CheckboxEdgeIndeterminate');
      const checkboxTextTheme = getPartOfThemeProps('CheckboxText');
      const circleEdgeTheme = cancel
        ? deepMerge(defaultEdgeCancelProps, circleEdgeCancelTheme)
        : checked
        ? deepMerge(defaultEdgeTheme, circleEdgeCheckedTheme)
        : indeterminate
        ? deepMerge(defaultEdgeTheme, circleEdgeIndeterminateTheme)
        : circleEdgeUnCheckedTheme;
      const circleInnerCheckedTheme = getPartOfThemeConfig('CheckboxInnerChecked');
      const circleInnerCancelTheme = getPartOfThemeConfig('CheckboxInnerCancel');
      const circleInnerIndeterminateTheme = getPartOfThemeConfig('CheckboxInnerIndeterminate');
      circleEdgeTheme.propsConfig.checkboxInnerCheckedTheme = defaultInnerTheme;
      if (indeterminate) {
        circleEdgeTheme.propsConfig.checkboxInnerCheckedTheme = deepMerge(
          defaultInnerTheme,
          circleInnerIndeterminateTheme
        );
        circleEdgeTheme.propsConfig.isIndeterminate = indeterminate;
      }
      if (checked) {
        circleEdgeTheme.propsConfig.checkboxInnerCheckedTheme = deepMerge(
          defaultInnerTheme,
          circleInnerCheckedTheme
        );
        circleEdgeTheme.propsConfig.isChecked = checked;
      }
      if (cancel) {
        circleEdgeTheme.propsConfig.checkboxInnerCheckedTheme = deepMerge(
          defaultInnerTheme,
          circleInnerCancelTheme
        );
        circleEdgeTheme.propsConfig.isCancel = cancel;
      }
      circleEdgeTheme.propsConfig.isDisabled = disabled;
      circleEdgeTheme.propsConfig.hasChecked = hasChecked;

      return (
        <CheckBoxWrap
          themeProps={checkboxWrapProps}
          onClick={this.handleClick(value)}
          disabled={disabled}
          cancel={cancel}
          hasCancel={hasCancel}
          styles={styles}
          {...addMouseEvent(this, config)}
        >
          <CheckBoxContent themeProps={themeProps} onClick={cancel ? this.handleCancel : null}>
            <CheckBoxInput disabled={disabled} type="checkbox" onBlur={this.handleBlur} />
            {this.state.hover ? (
              <HoverSpan>
                <IconWrap iconClass="lugia-icon-reminder_close_circle" />
              </HoverSpan>
            ) : (
              <CheckBoxInnerSpan
                themeProps={circleEdgeTheme}
                cancel={cancel}
                disabled={disabled}
                checked={checked}
                hasChecked={hasChecked}
                indeterminate={indeterminate}
              />
            )}
          </CheckBoxContent>
          <CheckBoxLabelSpan themeProps={checkboxTextTheme}>{children}</CheckBoxLabelSpan>
        </CheckBoxWrap>
      );
    }
  },
  Widget.Checkbox,
  { hover: true, active: true }
);
