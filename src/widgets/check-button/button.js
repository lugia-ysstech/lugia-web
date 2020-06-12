import * as React from 'react';
import { deepMerge } from '@lugia/object-utils';
import { addMouseEvent } from '@lugia/theme-hoc';
import ThemeProvider from '../theme-provider';
import Widget from '../consts';
import { LabelWrapper, CheckInput, CheckSpan, CancelSpan, IconWrap } from '../css/check-button';
import type { CheckProps, CheckState } from '../css/check-button';
import { getBorder } from '@lugia/theme-utils';
import get from '../css/theme-common-dict';

const borderDisableColor = '$lugia-dict.@lugia/lugia-web.borderDisableColor';
const spiritColor = '$lugia-dict.@lugia/lugia-web.spiritColor';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const themeDisabledColor = '$lugia-dict.@lugia/lugia-web.themeDisabledColor';
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';

const cancelCommonTheme = {
  color: defaultColor,
  background: { color: themeDisabledColor },
};
const normalCancelCommonTheme = {
  normal: {
    ...cancelCommonTheme,
    border: getBorder({ color: themeDisabledColor, width: 1, style: 'solid' }),
  },
};
const defaultRadioCancelTheme = () => ({
  themeConfig: { ...normalCancelCommonTheme },
});
const defaultCancelTheme = () => ({
  themeConfig: { ...normalCancelCommonTheme, hover: cancelCommonTheme },
});
const checkedCommonTheme = () => ({
  color: defaultColor,
  background: { color: themeColor },
  border: {
    ...getBorder(
      {
        color: themeColor,
        width: 1,
        style: 'solid',
      },
      { directions: ['t', 'b'] }
    ),
    ...getBorder(
      {
        color: '#fff',
        width: 1,
        style: 'solid',
      },
      { directions: ['r'] }
    ),
  },
});
const checkedDisabledCommonTheme = {
  color: lightGreyColor,
  background: { color: spiritColor },
  border: {
    ...getBorder(
      {
        color: borderDisableColor,
        width: 1,
        style: 'solid',
      },
      { directions: ['t', 'b'] }
    ),
    ...getBorder(
      {
        color: '#fff',
        width: 1,
        style: 'solid',
      },
      { directions: ['r'] }
    ),
  },
};
const defaultCheckedTheme = () => ({
  themeConfig: {
    normal: checkedCommonTheme(),
    hover: checkedCommonTheme(),
    disabled: checkedDisabledCommonTheme,
  },
});
const defaultRadioCheckedTheme = () => ({
  themeConfig: {
    normal: checkedCommonTheme(),
    disabled: checkedDisabledCommonTheme,
  },
});
const defaultUnCheckedTheme = () => ({
  themeConfig: {
    normal: {
      color: blackColor,
      border: {
        ...getBorder(get('normalBorder'), { directions: ['t', 'r', 'b'] }),
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
      color: disableTextColor,
      border: {
        ...getBorder(get('disabledBorder'), { directions: ['t', 'r', 'b'] }),
      },
    },
  },
});

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
      let dftCancelTheme = defaultCancelTheme();
      let dftCheckedTheme = defaultCheckedTheme();
      if (cancel) {
        config.enter = this.handleMouseEnter;
        config.leave = this.handleMouseLeave;
        if (type === 'radio') {
          dftCancelTheme = defaultRadioCancelTheme();
        }
      }
      if (checked && type === 'radio') dftCheckedTheme = defaultRadioCheckedTheme();
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
        : deepMerge(defaultUnCheckedTheme(), unCheckedTheme);
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
