import * as React from 'react';
import { deepMerge } from '@lugia/object-utils';
import { addMouseEvent } from '@lugia/theme-hoc';
import ThemeProvider from '../theme-provider';
import Widget from '../consts';
import { LabelWrapper, CheckInput, CheckSpan, CancelSpan, IconWrap } from '../css/check-button';
import type { CheckProps, CheckState } from '../css/check-button';
import colorsFunc from '../css/stateColor';

const { disabledColor, themeColor, borderDisableColor, spiritColor, lightGreyColor } = colorsFunc();
const defaultCancelTheme = {
  themeConfig: {
    normal: {
      color: '#fff',
      background: { color: disabledColor },
    },
    hover: {
      color: '#fff',
      background: { color: disabledColor },
    },
  },
};
const defaultCheckedTheme = {
  themeConfig: {
    normal: {
      color: '#fff',
      background: { color: themeColor },
      border: {
        top: { color: themeColor, width: 1, style: 'solid' },
        right: { color: '#fff', width: 1, style: 'solid' },
        bottom: { color: themeColor, width: 1, style: 'solid' },
      },
    },
    hover: {
      color: '#fff',
      background: { color: themeColor },
      border: {
        top: { color: themeColor, width: 1, style: 'solid' },
        right: { color: '#fff', width: 1, style: 'solid' },
        bottom: { color: themeColor, width: 1, style: 'solid' },
      },
    },
    disabled: {
      color: lightGreyColor,
      background: { color: spiritColor },
      border: {
        top: { color: borderDisableColor, width: 1, style: 'solid' },
        right: { color: '#fff', width: 1, style: 'solid' },
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
      if (cancel) {
        config.enter = this.handleMouseEnter;
        config.leave = this.handleMouseLeave;
      }
      const checkedTheme = getPartOfThemeProps('CheckButtonChecked', {
        selector: { index: childrenIndex, count: childrenCount },
      });
      const unCheckedTheme = getPartOfThemeProps('CheckButtonUnChecked', {
        selector: { index: childrenIndex, count: childrenCount },
      });
      const cancelTheme = getPartOfThemeProps('CheckButtonCancel');
      const CheckButtonTheme = cancel
        ? deepMerge(defaultCancelTheme, cancelTheme)
        : checked
        ? deepMerge(defaultCheckedTheme, checkedTheme)
        : unCheckedTheme;

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
