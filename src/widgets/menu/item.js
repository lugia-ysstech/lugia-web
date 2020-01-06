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
import {
  ItemWrap,
  DividerWrap,
  TextContainer,
  DefaultMenuItemHeight,
  Text,
  SwitchIconContainer,
  DesContainer,
  ItemBackgroundColor,
} from '../css/menu';
import CheckBox from '../checkbox';
import Icon from '../icon';
import colorsFunc from '../css/stateColor';

const { themeColor, blackColor, disableColor } = colorsFunc();
const Utils = require('@lugia/type-utils');
const { ObjectUtils } = Utils;
export type SizeType = 'large' | 'default' | 'bigger';
export type MenuItemProps = {
  key?: any,
  checked: boolean,
  mutliple: boolean,
  onClick?: Function,
  onMouseEnter?: Function,
  children?: React.Node,
  disabled: boolean,
  divided: ?boolean,
  checkedCSS?: 'none' | 'background' | 'mark' | 'checkbox',
  theme: Object,
  isFirst: boolean,
  value: string,
  icon: string,
  icons: Object,
  item: Object,
  mutliple: boolean,
  menuItemHeight: number,
  switchIconClass: Object,
  renderSuffixItems?: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
  createEventChannel: Function,
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

  getCheckBoxTheme() {
    const defaultTheme = {
      CheckboxText: {
        normal: {
          font: { size: 13, fontWeight: 500 },
        },
        hover: { font: { size: 13, fontWeight: 500 } },
        disabled: { font: { size: 13, fontWeight: 500 } },
      },
    };
    return this.mergeTheme('Checkbox', defaultTheme);
  }

  getIconTheme = (iconType: string) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(iconType);
    const paddingLeft = iconType === 'SuffixIcon' ? 3 : 0;
    const paddingRight = iconType === 'PrefixIcon' ? 3 : 0;
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
          [viewClass]: { ...defaultTheme },
        },
        theme
      ),
    };
  };

  getPreIcon(channel: Object) {
    const { icon, icons = {}, disabled } = this.props;
    if (!icon && !icons) {
      return null;
    }
    const { prefixIconClass, prefixIconSrc } = icons;
    if (!prefixIconClass && !prefixIconSrc) {
      return null;
    }
    const { viewClass, theme } = this.getIconTheme('PrefixIcon');

    const iconClass = prefixIconClass ? prefixIconClass : icon;
    return (
      <Icon
        iconClass={iconClass}
        src={prefixIconSrc}
        lugiaConsumers={channel.consumer}
        singleTheme
        disabled={disabled}
        viewClass={viewClass}
        theme={theme}
      />
    );
  }

  getSuffixIcon(channel: Object) {
    const { icon, icons = {}, disabled } = this.props;
    if (!icon && !icons) {
      return null;
    }
    const { suffixIconClass, suffixIconSrc } = icons;
    if (!suffixIconClass && !suffixIconSrc) {
      return null;
    }

    const { viewClass, theme } = this.getIconTheme('SuffixIcon');

    return (
      <Icon
        iconClass={suffixIconClass}
        src={suffixIconSrc}
        lugiaConsumers={channel.consumer}
        singleTheme
        disabled={disabled}
        viewClass={viewClass}
        theme={theme}
      />
    );
  }

  getSwitchIcon(channel: Object) {
    const {
      mutliple,
      checkedCSS,
      item: { children } = {},
      switchIconClass: { iconClass, iconSrc },
    } = this.props;
    if (mutliple === true || checkedCSS !== 'none' || !children || children.length === 0) {
      return null;
    }
    const { viewClass, theme } = this.getIconTheme('SwitchIcon');

    return (
      <SwitchIconContainer>
        <Icon
          iconClass={iconClass}
          src={iconSrc}
          lugiaConsumers={channel.consumer}
          singleTheme
          viewClass={viewClass}
          theme={theme}
        />
      </SwitchIconContainer>
    );
  }

  getItemCheckedCSS = (checked: Boolean, checkedCSS: string) => {
    const color = checked && checkedCSS !== 'background' ? themeColor : blackColor;
    const backgroundColor = checked && checkedCSS === 'background' ? disableColor : '';
    return {
      color,
      background: {
        color: backgroundColor,
      },
      font: {
        weight: 900,
      },
    };
  };

  getMenuItemThemeProps() {
    const {
      getPartOfThemeProps,
      checked,
      checkedCSS,
      menuItemHeight = DefaultMenuItemHeight,
    } = this.props;
    const checkedTheme = this.getItemCheckedCSS(checked, checkedCSS);
    const hoverTheme = {
      color: themeColor,
      background: { color: ItemBackgroundColor },
      font: { weight: 900 },
    };
    let themeProps;
    if (checked) {
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
    }
    return themeProps;
  }

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
    const channel = this.props.createEventChannel(['active', 'hover', 'disabled']);

    const { des } = item;

    const target = (
      <ItemWrap
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        disabled={disabled}
        title={title}
        themeProps={themeProps}
        {...channel.provider}
      >
        {divided && !isFirst ? <DividerWrap themeProps={DividerThemeProps} /> : null}
        {isCheckbox ? (
          <TextContainer themeProps={this.props.getPartOfThemeProps('TextContainer')}>
            <CheckBox
              {...this.getCheckBoxTheme()}
              checked={checked}
              disabled={disabled}
              onChange={onClick}
            >
              {this.getPreIcon(channel)}
              {value ? value : children}
              {this.getSuffixIcon(channel)}
            </CheckBox>
          </TextContainer>
        ) : (
          <TextContainer themeProps={this.props.getPartOfThemeProps('TextContainer')}>
            {this.getPreIcon(channel)}
            <Text>{value ? value : children}</Text>
            {this.getSuffixIcon(channel)}
          </TextContainer>
        )}

        {des ? (
          <DesContainer
            lugiaConsumers={channel.consumer}
            themeProps={this.props.getPartOfThemeProps('DesContainer')}
          >
            {des.toString()}
          </DesContainer>
        ) : null}
        {renderSuffixItems ? renderSuffixItems(item, channel) : null}
        {this.getSwitchIcon(channel)}
      </ItemWrap>
    );

    return target;
  }
}
export default ThemeHoc(MenuItem, Widget.MenuItem, { hover: true, active: true });
