/**
 * 菜单
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import ThemeHoc from '@lugia/theme-hoc';
import Widget from '../consts/index';
import { FontSize } from '../css';
import { px2remcss } from '../css/units';
import { SelectIcon, ItemWrap, DividerWrap, TextContainer } from '../css/menu';
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

const getIcon = props => {
  const { checkedCSS } = props;
  return `
    ${
      checkedCSS !== 'mark'
        ? ''
        : `
    &::after {
      font-family: "sviconfont" !important;
      text-rendering: optimizeLegibility;
      content: "${SelectIcon}";
      color: transparent;
      display: inline-block;
      font-size: ${FontSize};
      transform: scale(.83333333) rotate(0deg);
      zoom: 1;
      transition: all .2s ease;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: ${px2remcss(12)};
      font-weight: 700;
      font-size: ${px2remcss(16)};
      text-shadow: 0 0.1px 0, 0.1px 0 0, 0 -0.1px 0, -0.1px 0;
    }
    `
    }
  `;
};

class MenuItem extends React.Component<MenuItemProps> {
  static defaultProps = {
    checked: false,
    mutliple: false,
    disabled: false,
    divided: false,
  };
  static displayName = Widget.MenuItem;

  render() {
    const {
      children,
      mutliple,
      checked,
      onClick,
      disabled,
      onMouseEnter,
      checkedCSS,
      divided,
      isFirst,
      menuItemHeight,
      getPartOfThemeHocProps,
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
              {...getPartOfThemeHocProps('Checkbox')}
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
