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
  ItemBackgroundColor,
  SuffixElementWrap,
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
    const { viewClass, theme } = this.getIconTheme('PrefixIcon');

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

    const { viewClass, theme } = this.getIconTheme('SuffixIcon');

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

  getSwitchIcon() {
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
          singleTheme
          viewClass={viewClass}
          theme={theme}
          {...this.props.dispatchEvent([['hover'], ['active']], 'f2c')}
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

  getRenderSuffixItems(itemObj: Object) {
    const { renderSuffixItems } = this.props;
    const items = renderSuffixItems(itemObj);
    const suffixItems = React.Children.map(items, item => {
      const { props } = item;
      return React.cloneElement(item, {
        ...props,
        ...this.props.dispatchEvent([['hover'], ['active']], 'f2c'),
      });
    });
    return <SuffixElementWrap>{suffixItems}</SuffixElementWrap>;
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

    const { des } = item;

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
          <TextContainer themeProps={getPartOfThemeProps('TextContainer')}>
            <CheckBox
              {...this.getCheckBoxTheme()}
              checked={checked}
              disabled={disabled}
              onChange={onClick}
            >
              {this.getPreIcon()}
              <Text>{value ? value : children}</Text>
              {this.getSuffixIcon()}
            </CheckBox>
          </TextContainer>
        ) : (
          <TextContainer themeProps={getPartOfThemeProps('TextContainer')}>
            {this.getPreIcon()}
            <Text>{value ? value : children}</Text>
            {this.getSuffixIcon()}
          </TextContainer>
        )}

        {des ? (
          <DesContainer
            {...this.props.dispatchEvent([['hover']], 'f2c')}
            themeProps={
              checked
                ? getPartOfThemeProps('SelectedDesContainer')
                : getPartOfThemeProps('DesContainer')
            }
          >
            {des.toString()}
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
