import * as React from 'react';
import { deepMerge } from '@lugia/object-utils';
import { addMouseEvent } from '@lugia/theme-hoc';
import ThemeProvider from '../theme-provider';
import Widget from '../consts';
import { LabelWrapper, CheckInput, CheckSpan, CancelSpan, IconWrap } from '../css/check-button';
import type { CheckProps, CheckState } from '../css/check-button';
import colorsFunc from '../css/stateColor';

const {
  disabledColor,
  themeColor,
  borderDisableColor,
  spiritColor,
  lightGreyColor,
  darkGreyColor,
  borderColor,
} = colorsFunc();
const cancelCommonTheme = {
  color: '#fff',
  background: { color: disabledColor },
};
const defaultRadioCancelTheme = {
  themeConfig: {
    normal: cancelCommonTheme,
  },
};
const defaultCancelTheme = {
  themeConfig: {
    normal: cancelCommonTheme,
    hover: cancelCommonTheme,
  },
};
const checkedCommonTheme = {
  color: '#fff',
  background: { color: themeColor },
  border: {
    top: { color: themeColor, width: 1, style: 'solid' },
    right: { color: '#fff', width: 1, style: 'solid' },
    bottom: { color: themeColor, width: 1, style: 'solid' },
  },
};
const checkedDisabledCommonTheme = {
  color: lightGreyColor,
  background: { color: spiritColor },
  border: {
    top: { color: borderDisableColor, width: 1, style: 'solid' },
    right: { color: '#fff', width: 1, style: 'solid' },
    bottom: { color: borderDisableColor, width: 1, style: 'solid' },
  },
};
const defaultCheckedTheme = {
  themeConfig: {
    normal: checkedCommonTheme,
    hover: checkedCommonTheme,
    disabled: checkedDisabledCommonTheme,
  },
};
const defaultRadioCheckedTheme = {
  themeConfig: {
    normal: checkedCommonTheme,
    disabled: checkedDisabledCommonTheme,
  },
};
const defaultUnCheckedTheme = {
  themeConfig: {
    normal: {
      color: darkGreyColor,
      border: {
        top: { color: borderColor, width: 1, style: 'solid' },
        right: { color: borderColor, width: 1, style: 'solid' },
        bottom: { color: borderColor, width: 1, style: 'solid' },
      },
      background: { color: '#fff' },
      fontSize: 12,
      padding: {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10,
      },
    },
    hover: {
      color: themeColor,
    },
    disabled: {
      color: lightGreyColor,
      border: {
        top: { color: borderDisableColor, width: 1, style: 'solid' },
        right: { color: borderDisableColor, width: 1, style: 'solid' },
        bottom: { color: borderDisableColor, width: 1, style: 'solid' },
      },
    },
  },
};

CheckSpan.displayName = 'hello';
CancelSpan.displayName = 'cancel';
export default ThemeProvider(
  class extends React.Component<CheckProps, CheckState> {
    static getDerivedStateFromProps(props, state) {
      if (!state) {
        return {
          hasChecked: false,
          hover: false,
          hasCancel: false,
        };
      }
      return {};
    }
    render() {
      const {
        size,
        checked,
        disabled,
        children,
        cancel = false,
        type = 'checkbox',
        getPartOfThemeProps,
        themeProps,
        childrenCount,
        childrenIndex,
      } = this.props;
      const { hasChecked, hover, hasCancel } = this.state;
      const config = {};
      let dftCancelTheme = defaultCancelTheme;
      let dftCheckedTheme = defaultCheckedTheme;
      if (cancel) {
        config.enter = this.handleMouseEnter;
        config.leave = this.handleMouseLeave;
        if (type === 'radio') {
          dftCancelTheme = defaultRadioCancelTheme;
        }
      }
      if (checked && type === 'radio') dftCheckedTheme = defaultRadioCheckedTheme;
      const checkedTheme = getPartOfThemeProps('CheckButtonChecked', {
        selector: { index: childrenIndex, count: childrenCount },
      });
      const unCheckedTheme = getPartOfThemeProps('CheckButtonUnChecked', {
        selector: { index: childrenIndex, count: childrenCount },
      });
      const cancelTheme = getPartOfThemeProps('CheckButtonCancel');
      const CheckButtonTheme = cancel
        ? deepMerge(dftCancelTheme, cancelTheme)
        : checked
        ? deepMerge(dftCheckedTheme, checkedTheme)
        : deepMerge(defaultUnCheckedTheme, unCheckedTheme);
      return (
        <LabelWrapper
          size={size}
          checked={checked}
          disabled={disabled}
          hasCancel={hasCancel}
          themeProps={CheckButtonTheme}
          {...config}
          {...addMouseEvent(this, config)}
        >
          <CheckInput themeProps={themeProps} type="radio" onBlur={this.handleBlur} />
          <CheckSpan
            onClick={this.handleClick}
            size={size}
            checked={checked}
            disabled={disabled}
            hasChecked={hasChecked}
            cancel={cancel}
            type={type}
            themeProps={CheckButtonTheme}
          >
            {children}
            {cancel && type === 'checkbox' ? (
              <CancelSpan onClick={this.handleCancel} themeProps={CheckButtonTheme} hover={hover}>
                <IconWrap size={size} iconClass="lugia-icon-reminder_close" />
              </CancelSpan>
            ) : null}
          </CheckSpan>
        </LabelWrapper>
      );
    }
    handleClick = e => {
      const {
        onChange,
        value = this.props.children,
        disabled = false,
        checked = false,
        cancel = false,
        type = 'checkbox',
      } = this.props;
      if (!disabled) {
        if (cancel && type === 'radio') {
          return;
        }
        this.setState({
          hasChecked: checked,
        });
        onChange && onChange(e, value);
      }
    };
    handleBlur = e => {
      this.setState({
        hasChecked: false,
      });
      e.stopPropagation();
      e.preventDefault();
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
    handleCancel = () => {
      const { handleCancelItemClick, value = this.props.children } = this.props;
      handleCancelItemClick(value);
    };
  },
  Widget.CheckButton,
  { hover: true, active: true }
);
