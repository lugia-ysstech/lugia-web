import * as React from 'react';
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
      } = this.props;
      const { hasChecked, hover, hasCancel } = this.state;
      const config = {};
      if (cancel) {
        config.onMouseEnter = this.handleMouseEnter;
        config.onMouseLeave = this.handleMouseLeave;
      }
      return (
        <LabelWrapper
          size={size}
          checked={checked}
          disabled={disabled}
          hasCancel={hasCancel}
          themes={getTheme()}
        >
          <CheckInput type="radio" onBlur={this.handleBlur} />
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
  Widget.CheckButton
);
