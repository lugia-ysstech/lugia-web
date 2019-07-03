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
  borderColor,
  borderDisableColor,
  disableColor,
  disabledColor,
  lightGreyColor,
} = colorsFunc();
const defaultColor = '#fff';
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
        getPartOfThemeConfig,
      } = this.props;
      const { checked, hasChecked, hasCancel } = this.state;
      const config = {};
      if (cancel) {
        config.enter = this.handleMouseEnter;
        config.leave = this.handleMouseLeave;
      }

      const CheckboxWrapProps = getPartOfThemeProps('CheckboxWrap');
      const CircleEdgeCheckedTheme = getPartOfThemeProps('CheckboxEdgeChecked');
      const CircleEdgeUnCheckedTheme = getPartOfThemeProps('CheckboxEdgeUnChecked');
      const CircleEdgeCancelTheme = getPartOfThemeProps('CheckboxEdgeCancel');
      const CircleEdgeIndeterminateTheme = getPartOfThemeProps('CheckboxEdgeIndeterminate');
      const checkboxTextTheme = getPartOfThemeProps('CheckboxText');
      const CircleEdgeTheme = cancel
        ? deepMerge(defaultEdgeCancelProps, CircleEdgeCancelTheme)
        : checked
        ? deepMerge(defaultEdgeTheme, CircleEdgeCheckedTheme)
        : indeterminate
        ? deepMerge(defaultEdgeTheme, CircleEdgeIndeterminateTheme)
        : CircleEdgeUnCheckedTheme;
      const CircleInnerCheckedTheme = getPartOfThemeConfig('CheckboxInnerChecked');
      const CircleInnerCancelTheme = getPartOfThemeConfig('CheckboxInnerCancel');
      const CircleInnerIndeterminateTheme = getPartOfThemeConfig('CheckboxInnerIndeterminate');
      CircleEdgeTheme.propsConfig.checkboxInnerCheckedTheme = defaultInnerTheme;
      if (indeterminate) {
        CircleEdgeTheme.propsConfig.checkboxInnerCheckedTheme = deepMerge(
          defaultInnerTheme,
          CircleInnerIndeterminateTheme
        );
        CircleEdgeTheme.propsConfig.isIndeterminate = indeterminate;
      }
      if (checked) {
        CircleEdgeTheme.propsConfig.checkboxInnerCheckedTheme = deepMerge(
          defaultInnerTheme,
          CircleInnerCheckedTheme
        );
        CircleEdgeTheme.propsConfig.isChecked = checked;
      }
      if (cancel) {
        CircleEdgeTheme.propsConfig.checkboxInnerCheckedTheme = deepMerge(
          defaultInnerTheme,
          CircleInnerCancelTheme
        );
        CircleEdgeTheme.propsConfig.isCancel = cancel;
      }
      CircleEdgeTheme.propsConfig.isDisabled = disabled;
      CircleEdgeTheme.propsConfig.hasChecked = hasChecked;

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
          <CheckBoxLabelSpan themeProps={checkboxTextTheme}>{children}</CheckBoxLabelSpan>
        </CheckBoxWrap>
      );
    }
  },
  Widget.Checkbox,
  { hover: true, active: true }
);
