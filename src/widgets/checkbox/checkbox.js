/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
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

type CheckBoxState = {
  checked: boolean,
  hasChecked: boolean,
  hover: boolean,
  hasCancel: boolean,
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
        getTheme,
        disabled,
        cancel,
        indeterminate = false,
        styles = 'default',
        children,
      } = this.props;
      const { checked, hasChecked, hasCancel } = this.state;
      const config = {};
      if (cancel) {
        config.onMouseEnter = this.handleMouseEnter;
        config.onMouseLeave = this.handleMouseLeave;
      }

      return (
        <CheckBoxWrap
          themes={getTheme()}
          onClick={this.handleClick(value)}
          disabled={disabled}
          cancel={cancel}
          hasCancel={hasCancel}
          styles={styles}
          {...config}
        >
          <CheckBoxContent onClick={cancel ? this.handleCancel : null}>
            <CheckBoxInput disabled={disabled} type="checkbox" onBlur={this.handleBlur} />
            {this.state.hover ? (
              <HoverSpan>
                <IconWrap iconClass="lugia-icon-reminder_close_circle" />
              </HoverSpan>
            ) : (
              <CheckBoxInnerSpan
                themes={getTheme()}
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
  Widget.Checkbox
);
