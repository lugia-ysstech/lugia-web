/**
 * 菜单
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import ThemeHoc from '@lugia/theme-hoc';
import Widget from '../consts/index';
import { deepMerge } from '@lugia/object-utils';
import { addMouseEvent } from '@lugia/theme-hoc';

import {
  ItemWrap,
  DividerWrap,
  TextContainer,
  DefaultMenuItemHeight,
  Text,
  SwitchIconContainer,
  DesContainer,
  SuffixElementWrap,
} from '../css/menu';
import CheckBox from '../checkbox';
import Icon from '../icon';
import get from '../css/theme-common-dict';
import changeColor from '../css/utilsColor';
import { px2remcss } from '../css/units';
import { getMenuThemeDefaultConfig } from '../css//menu';

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';
const smallSize = '$lugia-dict.@lugia/lugia-web.smallSize';
const normalSize = '$lugia-dict.@lugia/lugia-web.normalSize';
const largeSize = '$lugia-dict.@lugia/lugia-web.largeSize';

const Utils = require('@lugia/type-utils');
const { ObjectUtils } = Utils;
export type SizeType = 'large' | 'default' | 'small';
export type MenuItemProps = {
  key?: any,
  checked: boolean,
  mutliple: boolean,
  onClick?: Function,
  onMouseEnter?: Function,
  children?: React.Node,
  disabled: boolean,
  divided: ?boolean,
  checkedCSS?: 'none' | 'background' | 'checkbox',
  theme: Object,
  isFirst: boolean,
  value: string,
  icon: string,
  icons: Object,
  item: Object,
  mutliple: boolean,
  menuItemHeight: number,
  switchIconClass: Object,
  marginBottom?: Number,
  renderSuffixItems?: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
  createEventChannel: Function,
  size: SizeType,
};

class MenuItem extends React.Component<MenuItemProps> {
  static defaultProps = {
    checked: false,
    mutliple: false,
    disabled: false,
    divided: false,
    switchIconClass: {
      iconClass: 'lugia-icon-direction_right',
    },
    size: 'default',
  };
  static displayName = Widget.MenuItem;

  mergeTheme = (target: string, defaultTheme: Object) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(target);

    const themeHoc = deepMerge(
      {
        [viewClass]: { ...defaultTheme },
      },
      theme
    );

    const treeTheme = {
      viewClass,
      theme: themeHoc,
    };
    return treeTheme;
  };

  getCheckBoxTheme = () => {
    const { size } = this.props;
    const defaultTheme = getMenuThemeDefaultConfig(size, 'Checkbox');
    return this.mergeTheme('Checkbox', defaultTheme);
  };

  getIconTheme = (iconType: string, selectedIconType: string) => {
    const { size, checked } = this.props;
    const { viewClass, theme } = checked
      ? this.props.getPartOfThemeHocProps(selectedIconType)
      : this.props.getPartOfThemeHocProps(iconType);
    const paddingLeft = iconType === 'SuffixIcon' ? px2remcss(get('padding')) : 0;
    const paddingRight = iconType === 'PrefixIcon' ? px2remcss(get('paddingToText')) : 0;
    const defaultTheme = {
      normal: {
        padding: {
          left: paddingLeft,
          right: paddingRight,
        },
        getCSS: () => {
          return `
          transition: all 0.3s
          `;
        },
      },
    };

    return {
      viewClass,
      theme: deepMerge(
        {
          [viewClass]: { ...deepMerge(defaultTheme, getMenuThemeDefaultConfig(size, iconType)) },
        },
        theme
      ),
    };
  };

  getPreIcon() {
    const { icon, icons = {}, disabled } = this.props;
    if (!icon && !icons) {
      return null;
    }
    const { prefixIconClass, prefixIconSrc } = icons;
    const iconClass = prefixIconClass ? prefixIconClass : icon;
    if (!iconClass && !prefixIconSrc) {
      return null;
    }
    const { viewClass, theme } = this.getIconTheme('PrefixIcon', 'SelectedPrefixIcon');

    return (
      <Icon
        iconClass={iconClass}
        src={prefixIconSrc}
        singleTheme
        disabled={disabled}
        viewClass={viewClass}
        theme={theme}
        {...this.props.dispatchEvent([['hover'], ['active']], 'f2c')}
      />
    );
  }

  getSuffixIcon() {
    const { icon, icons = {}, disabled } = this.props;
    if (!icon && !icons) {
      return null;
    }
    const { suffixIconClass, suffixIconSrc } = icons;
    if (!suffixIconClass && !suffixIconSrc) {
      return null;
    }

    const { viewClass, theme } = this.getIconTheme('SuffixIcon', 'SelectedSuffixIcon');

    return (
      <Icon
        iconClass={suffixIconClass}
        src={suffixIconSrc}
        singleTheme
        disabled={disabled}
        viewClass={viewClass}
        theme={theme}
        {...this.props.dispatchEvent([['hover'], ['active']], 'f2c')}
      />
    );
  }

  getSwitchIconTheme = () => {
    const { checked, getPartOfThemeHocProps, size, hoverState, item } = this.props;
    const iconType = checked ? 'SwitchIconSelected' : 'SwitchIcon';
    const { viewClass, theme } = getPartOfThemeHocProps(iconType);
    if (hoverState && !checked) {
      theme[viewClass].normal = theme[viewClass].hover;
    } else {
      theme[viewClass].normal = theme[viewClass].normal || {};
    }
    return {
      viewClass,
      theme: deepMerge(
        {
          [viewClass]: getMenuThemeDefaultConfig(size, iconType),
        },
        theme
      ),
    };
  };

  getSwitchIcon() {
    const {
      mutliple,
      checkedCSS,
      item: { children, disabled } = {},
      switchIconClass: { iconClass, iconSrc },
    } = this.props;
    if (mutliple === true || checkedCSS === 'checkbox' || !children || children.length === 0) {
      return null;
    }
    return (
      <SwitchIconContainer>
        <Icon
          iconClass={iconClass}
          disabled={disabled}
          src={iconSrc}
          singleTheme
          {...this.getSwitchIconTheme()}
          {...this.props.dispatchEvent([['hover'], ['active']], 'f2c')}
        />
      </SwitchIconContainer>
    );
  }

  getItemCheckedCSS = (checkedCSS: string) => {
    const { disabled } = this.props;
    const color =
      checkedCSS === 'background' ? defaultColor : checkedCSS === 'none' ? themeColor : blackColor;
    const backgroundColor =
      checkedCSS === 'background' ? (disabled ? '' : themeColor) : defaultColor;
    return {
      color,
      background: {
        color: backgroundColor,
      },
    };
  };

  getMenuItemThemeProps() {
    const {
      getPartOfThemeProps,
      checked,
      checkedCSS,
      hoverState,
      menuItemHeight = DefaultMenuItemHeight,
    } = this.props;
    const hoverColor =
      checkedCSS === 'background' ? 'transparent' : changeColor(get('themeColor'), 0, 0, 10).rgba;
    const hoverTheme = {
      color: themeColor,
      background: { color: hoverColor },
    };
    let themeProps;
    if (checked) {
      const checkedTheme = this.getItemCheckedCSS(checkedCSS);
      themeProps = getPartOfThemeProps('SelectedMenuItemWrap', {
        props: {
          checkedCSS,
          checked,
          menuItemHeight,
        },
      });
      const { themeConfig } = themeProps;
      const { normal = {} } = themeConfig;
      normal.height = '';
      if (normal.height) {
        delete normal.height;
      }
      themeConfig.normal = deepMerge(checkedTheme, normal);
    } else {
      themeProps = getPartOfThemeProps('MenuItemWrap', {
        props: {
          checkedCSS,
          checked,
          menuItemHeight,
        },
      });
      const { themeConfig } = themeProps;
      const { hover = {} } = themeConfig;
      themeConfig.hover = deepMerge(hoverTheme, hover);
      if (hoverState && !checked) {
        themeConfig.normal = themeConfig.hover;
      } else {
        themeConfig.normal = deepMerge({ color: blackColor }, themeConfig.normal);
      }
    }
    return themeProps;
  }

  getRenderSuffixItems(itemObj: Object) {
    const { renderSuffixItems } = this.props;
    const items = renderSuffixItems(
      itemObj,
      this.props.dispatchEvent([['hover'], ['active']], 'f2c')
    );
    const suffixItems = React.Children.map(items, item => {
      const { props } = item;
      return React.cloneElement(item, {
        ...props,
        ...this.props.dispatchEvent([['hover'], ['active']], 'f2c'),
      });
    });
    return <SuffixElementWrap>{suffixItems}</SuffixElementWrap>;
  }

  getTextThemeProps = () => {
    const { getPartOfThemeProps, size } = this.props;
    const themeProps = getPartOfThemeProps('Text');
    const defaultTextTheme = getMenuThemeDefaultConfig(size, 'Text');
    return deepMerge({ themeConfig: { ...defaultTextTheme } }, themeProps);
  };

  getDesContainer = () => {
    const { checked, getPartOfThemeProps, checkedCSS } = this.props;
    const isCheckbox = checkedCSS === 'checkbox';
    const defaultSelectedDesContainerTheme = {
      themeConfig: {
        normal: {
          color:
            checkedCSS === 'background'
              ? defaultColor
              : checkedCSS === 'checkbox'
              ? blackColor
              : themeColor,
        },
        hover: {
          color: checkedCSS === 'background' ? defaultColor : themeColor,
        },
        disabled: {
          color: disableTextColor,
        },
      },
    };
    const defaultDesContainerTheme = {
      themeConfig: {
        normal: {
          color: darkGreyColor,
        },
        hover: {
          color: themeColor,
        },
        disabled: {
          color: disableTextColor,
        },
      },
    };

    const desContainerTheme = checked
      ? deepMerge(
          defaultSelectedDesContainerTheme,
          getPartOfThemeProps('SelectedDesContainer', {
            props: { isCheckbox },
          })
        )
      : deepMerge(
          defaultDesContainerTheme,
          getPartOfThemeProps('DesContainer', { props: { isCheckbox } })
        );
    return desContainerTheme;
  };

  getTextContainerThemeProps = () => {
    const { getPartOfThemeProps, size = 'default' } = this.props;
    const sizeToDictName = {
      small: smallSize,
      default: normalSize,
      large: largeSize,
    };
    const defaultThemeConfig = {
      themeConfig: {
        normal: {
          height: sizeToDictName[size],
        },
      },
    };
    return deepMerge(defaultThemeConfig, getPartOfThemeProps('TextContainer'));
  };

  render() {
    const {
      children,
      checked,
      onClick,
      disabled,
      onMouseEnter,
      checkedCSS,
      divided,
      isFirst,
      value,
      item = {},
      getPartOfThemeProps,
      renderSuffixItems,
      dispatchEvent,
      isShowAuxiliaryText,
      auxiliaryTextField,
    } = this.props;

    let title = '';
    React.Children.forEach(children, (item: Object) => {
      if (ObjectUtils.isString(item)) {
        title = item;
      }
    });
    const isCheckbox = checkedCSS === 'checkbox';
    const themeProps = this.getMenuItemThemeProps(checked);

    const DividerThemeProps = getPartOfThemeProps('Divider');
    const target = (
      <ItemWrap
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        disabled={disabled}
        title={title}
        checked={checked}
        themeProps={themeProps}
        {...addMouseEvent(this)}
      >
        {divided && !isFirst ? <DividerWrap themeProps={DividerThemeProps} /> : null}
        {isCheckbox ? (
          <TextContainer
            themeProps={this.getTextContainerThemeProps('TextContainer')}
            {...dispatchEvent(['hover'], 'f2c')}
          >
            <CheckBox
              {...this.getCheckBoxTheme()}
              checked={checked}
              disabled={disabled}
              onChange={onClick}
              {...dispatchEvent(['hover'], 'f2c')}
            >
              {this.getPreIcon()}
              <Text {...dispatchEvent(['hover'], 'f2c')} themeProps={this.getTextThemeProps()}>
                {value ? value : children}
              </Text>
              {this.getSuffixIcon()}
            </CheckBox>
          </TextContainer>
        ) : (
          <TextContainer
            themeProps={this.getTextContainerThemeProps('TextContainer')}
            {...dispatchEvent(['hover'], 'f2c')}
          >
            {this.getPreIcon()}
            <Text {...dispatchEvent(['hover'], 'f2c')} themeProps={this.getTextThemeProps()}>
              {value ? value : children}
            </Text>
            {this.getSuffixIcon()}
          </TextContainer>
        )}

        {isShowAuxiliaryText ? (
          <DesContainer
            {...this.props.dispatchEvent([['hover']], 'f2c')}
            themeProps={this.getDesContainer()}
          >
            {item[auxiliaryTextField] && item[auxiliaryTextField].toString()}
          </DesContainer>
        ) : null}
        {renderSuffixItems ? this.getRenderSuffixItems(item) : null}
        {this.getSwitchIcon()}
      </ItemWrap>
    );

    return target;
  }
}
export default ThemeHoc(MenuItem, Widget.MenuItem, { hover: true, active: true });
