import { MenuItemHeight } from './menu';
import Icon from '../icon';
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';
import { px2remcss } from '../css/units';
import CSSComponent, { css } from '@lugia/theme-css-hoc';

const { disableColor, mediumGreyColor } = colorsFunc();

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
    getCSS: themeMeta => {
      const { height = MenuItemHeight } = themeMeta;
      return `line-height: ${px2remcss(height)}`;
    },
  },
  hover: {
    selectNames: [['color'], ['background'], ['opacity'], ['border'], ['borderRadius'], ['font']],
  },
  css: css`
    transition: all 0.3s;
    width: 100%;
    height: ${px2remcss(MenuItemHeight)};
    line-height: ${px2remcss(MenuItemHeight)};
    padding: 0 ${px2remcss(10)};
    background: ${disableColor};
    color: ${mediumGreyColor};
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
    margin-left: ${px2remcss(10)};
    height: ${px2remcss(MenuItemHeight)};
  `,
});
OldValueTitle.displayName = 'OldValueTitle';

export const EmptyBox = styled.div`
  height: 0;
`;
EmptyBox.displayName = 'emptyBox';
