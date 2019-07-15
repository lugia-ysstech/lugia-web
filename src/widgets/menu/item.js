/**
 * 菜单
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import ThemeHoc from '@lugia/theme-hoc';
import Widget from '../consts/index';
import Divider from '../divider';
import { FontSize } from '../css';
import { px2remcss } from '../css/units';
import { deepMerge } from '@lugia/object-utils';
import { SelectIcon, ItemWrap, DividerWrap, TextContainer } from '../css/menu';
import CheckBox from '../checkbox';
import Theme from '../theme';

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
  size?: 'large' | 'default' | 'bigger',
  checkedCSS?: 'none' | 'background' | 'mark' | 'checkbox',
  theme: Object,
  isFirst: boolean,
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

  mergeTheme(theme: Object, viewClass: string, params: Object) {
    theme[viewClass] = deepMerge(theme[viewClass], { propsConfig: params });
  }

  getDividerTheme() {
    // const { getPartOfThemeConfig } = this.props;
    return {
      // Divider没有完成，所以没办法配置
    };
  }

  render() {
    const {
      children,
      mutliple,
      checked,
      onClick,
      disabled,
      onMouseEnter,
      checkedCSS,
      size,
      divided,
      isFirst,
      getPartOfThemeHocProps,
      getPartOfThemeProps,
    } = this.props;

    // const { viewClass, theme: itemTheme } = theme;
    let title = '';
    React.Children.forEach(children, (item: Object) => {
      if (ObjectUtils.isString(item)) {
        title = item;
      }
    });
    const isCheckbox = checkedCSS === 'checkbox';

    let themeProps;
    if (checked) {
      themeProps = getPartOfThemeProps('SelectedItem', {
        props: {
          size,
          checkedCSS,
          checked,
        },
      });
    } else {
      themeProps = getPartOfThemeProps('Item', {
        props: {
          size,
          checkedCSS,
          checked,
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
        {divided && !isFirst ? (
          <DividerWrap themeProps={DividerThemeProps}>
            <Theme config={this.getDividerTheme()}>
              <Divider />
            </Theme>
          </DividerWrap>
        ) : null}
        {isCheckbox ? (
          <TextContainer themeProps={ItemThemeProps}>
            <Theme
              config={
                {
                  // checkbox 还未完成，暂时只能等待checkbox完成后再配置
                }
              }
            >
              <CheckBox checked={checked} disabled={disabled} onChange={onClick}>
                {children}
              </CheckBox>
            </Theme>
          </TextContainer>
        ) : (
          <TextContainer themeProps={ItemThemeProps}>{children}</TextContainer>
        )}
      </ItemWrap>
    );

    return target;
  }
}
export default ThemeHoc(MenuItem, Widget.MenuItem, { hover: true, active: true });
