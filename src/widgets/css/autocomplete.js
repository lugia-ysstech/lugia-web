import { MenuItemHeight } from './menu';
import Icon from '../icon';
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';
import { px2remcss } from '../css/units';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import get from './theme-common-dict';
import changeColor from './utilsColor';

const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';

export const OldValueItem = CSSComponent({
  tag: 'div',
  className: 'OldValueItem',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['color'],
      ['background'],
      ['padding'],
      ['margin'],
      ['opacity'],
      ['font'],
      ['border'],
      ['borderRadius'],
    ],
    defaultTheme: {
      background: {
        color: changeColor(get('themeColor'), 0, 0, 10).rgba,
      },
      color: blackColor,
    },
    getCSS: themeMeta => {
      const { height = MenuItemHeight } = themeMeta;
      return `line-height: ${px2remcss(height)}`;
    },
  },
  hover: {
    selectNames: [['color'], ['background'], ['opacity'], ['border'], ['borderRadius'], ['font']],
    defaultTheme: {
      color: themeColor,
    },
  },
  css: css`
    display: flex;
    align-items: center;
    transition: all 0.3s;
    width: 100%;
    overflow: hidden;
    height: ${px2remcss(MenuItemHeight)};
    padding: 0 ${px2remcss(get('padding'))};
    font-size: ${px2remcss(14)};
    position: relative;
    cursor: pointer;
    overflow: hidden;
  `,
  option: { hover: true },
});
OldValueItem.displayName = 'oldValueItem';

export const TimeIcon = Icon;

export const OldValueTitle = CSSComponent({
  tag: 'div',
  className: 'OldValueTitle',
  normal: {
    selectNames: [['height']],
  },
  css: css`
    display: inline-block;
    margin-left: ${px2remcss(get('paddingToText'))};
    height: ${px2remcss(MenuItemHeight)};
  `,
});
OldValueTitle.displayName = 'OldValueTitle';

export const EmptyBox = styled.div`
  height: 0;
`;
EmptyBox.displayName = 'emptyBox';
