import * as React from 'react';
import { deepMerge } from '@lugia/object-utils';
import ThemeProvider from '../theme-provider';
import Widget from '../consts';
import { LabelWrapper, CheckInput, CheckSpan, CancelSpan, IconWrap } from '../css/check-button';
import type { CheckProps, CheckState } from '../css/check-button';

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
        getTheme,
        children,
        cancel = false,
        type = 'checkbox',
        getPartOfThemeProps,
        getPartOfThemeConfig,
        themeProps,
      } = this.props;
      const { hasChecked, hover, hasCancel } = this.state;
      const config = {};
      if (cancel) {
        config.onMouseEnter = this.handleMouseEnter;
        config.onMouseLeave = this.handleMouseLeave;
      }
      const defaultProps = {
        normal: {},
        active: {},
        hover: {},
        disabled: {},
      };
      const wrapTheme = getPartOfThemeProps('CheckButtonWrap');
      const textTheme = getPartOfThemeProps('CheckButtonText');
      const checkTheme = getPartOfThemeProps('Checked');
      const unCheckTheme = getPartOfThemeProps('UnChecked');
      wrapTheme.themeConfig = deepMerge(wrapTheme.themeConfig, defaultProps);
      wrapTheme.themeConfig.normal.props = { checked, disabled, cancel, hasChecked, type };
      textTheme.themeConfig = deepMerge(wrapTheme.themeConfig, textTheme.themeConfig);
      if (checked) {
        textTheme.themeConfig.normal = deepMerge(
          textTheme.themeConfig.normal,
          checkTheme.themeConfig.active
        );
      }
      if (disabled) {
        const targetObj = checked
          ? checkTheme.themeConfig.disabled
          : unCheckTheme.themeConfig.disabled;
        wrapTheme.themeConfig.disabled = deepMerge(wrapTheme.themeConfig.disabled, targetObj);
        textTheme.themeConfig.disabled = deepMerge(textTheme.themeConfig.disabled, targetObj);
        textTheme.themeConfig.disabled.bgColor = wrapTheme.themeConfig.normal.background;
        textTheme.themeConfig.disabled.isChecked = checked;
      }
      if (cancel) {
        textTheme.themeConfig.normal = deepMerge(
          textTheme.themeConfig.normal,
          wrapTheme.themeConfig.cancel
        );
        // textTheme.themeConfig.normal.props = { checked, disabled, cancel, hasChecked, type };
      }
      if (checked || disabled || cancel) {
        wrapTheme.themeState.hover = false;
        textTheme.themeState.hover = false;
      }
      return (
        <LabelWrapper
          size={size}
          checked={checked}
          disabled={disabled}
          hasCancel={hasCancel}
          themes={getTheme()}
          themeProps={wrapTheme}
        >
          <CheckInput themeProps={themeProps} type="radio" onBlur={this.handleBlur} />
          <CheckSpan
            {...config}
            onClick={this.handleClick}
            size={size}
            checked={checked}
            disabled={disabled}
            themes={getTheme()}
            hasChecked={hasChecked}
            cancel={cancel}
            type={type}
            themeProps={textTheme}
          >
            {children}
            {cancel && type === 'checkbox' ? (
              <CancelSpan onClick={this.handleCancel} hover={hover}>
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
