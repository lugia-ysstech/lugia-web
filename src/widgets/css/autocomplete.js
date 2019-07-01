import { MenuItemHeight } from './menu';
import Icon from '../icon';
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';
import { px2remcss } from '../css/units';
import ThemeHoc from '@lugia/theme-hoc';
import CSSComponent, { css } from '@lugia/theme-css-hoc';

const { disableColor, mediumGreyColor } = colorsFunc();

// export const OldValueItem = styled.div`
//   box-sizing: border-box;
//   width: 100%;
//   height: ${px2remcss(MenuItemHeight)};
//   line-height: ${px2remcss(MenuItemHeight)};
//   background: ${disableColor};
//   color: ${mediumGreyColor};
//   font-size: ${px2remcss(14)};
//   position: relative;
//   cursor: pointer;
//   overflow: hidden;
// `;

export const OldValueItem = ThemeHoc(
  CSSComponent({
    tag: 'div',
    className: 'OldValueItem',
    normal: {
      selectNames: [
        ['width'],
        ['height'],
        ['color'],
        ['background'],
        ['padding'],
        ['opacity'],
        ['font'],
        ['border'],
      ],
      getCSS: themeMeta => {
        const { height = MenuItemHeight } = themeMeta;
        return `line-height: ${px2remcss(height)}`;
      },
    },
    hover: {
      selectNames: [['color'], ['background'], ['opacity'], ['border']],
    },
    css: css`
      /* box-sizing: border-box; */
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
  }),

  'ItemWrap',
  { hover: true, active: true }
);
OldValueItem.displayName = 'oldValueItem';

export const TimeIcon = CSSComponent({
  extend: Icon,
  className: 'TimeIcon',
  normal: {
    selectNames: [],
  },
  css: css`
    margin: 0;
  `,
});

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
