/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import { getBorder } from '@lugia/theme-css-hoc/lib/index';
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

type CheckBoxState = {
  checked: boolean,
  hasChecked: boolean,
  hover: boolean,
  hasCancel: boolean,
};

const { themeColor, borderColor, borderDisableColor, disableColor, disabledColor } = colorsFunc();
const defaultColor = '#fff';

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
      handleCancelItemClick(value);
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
      } = this.props;
      const { checked, hasChecked, hasCancel } = this.state;
      const config = {};
      if (cancel) {
        config.enter = this.handleMouseEnter;
        config.leave = this.handleMouseLeave;
      }
      const CheckboxWrapProps = getPartOfThemeProps('CheckboxWrap');
      const CircleEdgeTheme = getPartOfThemeProps('CheckboxEdge');
      const CircleCheckedTheme = getPartOfThemeProps('CheckboxChecked');
      const defaultProps = {
        normal: {},
        active: {},
        hover: {},
        disabled: {},
      };
      const circleDcefaultProps = {
        normal: {
          background: {
            color: disabled
              ? disableColor
              : cancel
              ? disabledColor
              : checked || indeterminate
              ? themeColor
              : defaultColor,
          },
          border: getBorder(
            {
              color: disabled
                ? borderDisableColor
                : cancel
                ? disabledColor
                : checked || indeterminate
                ? themeColor
                : hasChecked
                ? themeColor
                : borderColor,
              width: 1,
              style: 'solid',
            },
            { radius: 2 }
          ),
        },
        active: {},
        hover: {},
        disabled: {},
      };
      const defaultIndeterminate = {
        background: { color: defaultColor },
        border: getBorder({ color: themeColor, width: 1, style: 'solid' }, { radius: 2 }),
      };
      CheckboxWrapProps.themeConfig = deepMerge(defaultProps, CheckboxWrapProps.themeConfig);
      CircleEdgeTheme.themeConfig = deepMerge(circleDcefaultProps, CircleEdgeTheme.themeConfig);
      if (indeterminate) {
        CircleEdgeTheme.themeConfig.normal.checked =
          CircleCheckedTheme.themeConfig.indeterminate || defaultIndeterminate;
        CircleEdgeTheme.themeConfig.normal.isIndeterminate = indeterminate;
      }
      if (checked) {
        CircleEdgeTheme.themeConfig.normal = deepMerge(
          CircleEdgeTheme.themeConfig.normal,
          CircleEdgeTheme.themeConfig.active
        );
        CheckboxWrapProps.themeConfig.normal = deepMerge(
          CheckboxWrapProps.themeConfig.normal,
          CheckboxWrapProps.themeConfig.active
        );
        CircleEdgeTheme.themeConfig.normal.checked = cancel
          ? CircleCheckedTheme.themeConfig.cancel || {}
          : disabled
          ? CircleCheckedTheme.themeConfig.disabled || {}
          : CircleCheckedTheme.themeConfig.active || {};
      }
      if (cancel) {
        CircleEdgeTheme.themeConfig = deepMerge(defaultProps, CircleEdgeTheme.themeConfig);
        CircleEdgeTheme.themeConfig.normal = deepMerge(
          CircleEdgeTheme.themeConfig.normal,
          CircleEdgeTheme.themeConfig.cancel
        );
      }

      CircleEdgeTheme.themeConfig.normal.isDisabled = disabled;
      CircleEdgeTheme.themeConfig.normal.isCancel = cancel;
      CircleEdgeTheme.themeConfig.normal.isChecked = checked;
      if (disabled || indeterminate || checked) {
        CircleEdgeTheme.themeState.hover = false;
        CheckboxWrapProps.themeState.hover = false;
      }

      return (
        <CheckBoxWrap
          themeProps={CheckboxWrapProps}
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
                themeProps={CircleEdgeTheme}
                cancel={cancel}
                disabled={disabled}
                checked={checked}
                hasChecked={hasChecked}
                indeterminate={indeterminate}
              />
            )}
          </CheckBoxContent>
          <CheckBoxLabelSpan>{children}</CheckBoxLabelSpan>
        </CheckBoxWrap>
      );
    }
  },
  Widget.Checkbox,
  { hover: true, active: true }
);
