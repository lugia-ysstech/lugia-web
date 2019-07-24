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
import { ItemWrap, DividerWrap, TextContainer, DefaultMenuItemHeight } from '../css/menu';
import CheckBox from '../checkbox';

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
  menuItemHeight: number,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};

class MenuItem extends React.Component<MenuItemProps> {
  static defaultProps = {
    checked: false,
    mutliple: false,
    disabled: false,
    divided: false,
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
      menuItemHeight = DefaultMenuItemHeight,
      getPartOfThemeProps,
    } = this.props;
    let title = '';
    React.Children.forEach(children, (item: Object) => {
      if (ObjectUtils.isString(item)) {
        title = item;
      }
    });
    const isCheckbox = checkedCSS === 'checkbox';

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
    } else {
      themeProps = getPartOfThemeProps('MenuItemWrap', {
        props: {
          checkedCSS,
          checked,
          menuItemHeight,
        },
      });
    }
    const ItemThemeProps = getPartOfThemeProps('Item');
    const DividerThemeProps = getPartOfThemeProps('Divider');

    const target = (
      <ItemWrap
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        title={title}
        disabled={disabled}
        themeProps={themeProps}
      >
        {divided && !isFirst ? <DividerWrap themeProps={DividerThemeProps} /> : null}
        {isCheckbox ? (
          <TextContainer themeProps={ItemThemeProps}>
            <CheckBox
              {...this.getCheckBoxTheme()}
              checked={checked}
              disabled={disabled}
              onChange={onClick}
            >
              {children}
            </CheckBox>
          </TextContainer>
        ) : (
          <TextContainer themeProps={themeProps}>{children}</TextContainer>
        )}
      </ItemWrap>
    );

    return target;
  }
}
export default ThemeHoc(MenuItem, Widget.MenuItem, { hover: true, active: true });
