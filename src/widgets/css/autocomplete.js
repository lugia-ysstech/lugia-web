import { MenuItemHeight } from './menu';
import Icon from '../icon';
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';
import { px2remcss } from '../css/units';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import get from './theme-common-dict';
import changeColor from './utilsColor';

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
      const { height = get('smallSize') } = themeMeta;
      return `line-height: ${px2remcss(height)}`;
    },
  },
  hover: {
    selectNames: [['color'], ['background'], ['opacity'], ['border'], ['borderRadius'], ['font']],
  },
  css: css`
    display: flex;
    align-items: center;
    transition: all 0.3s;
    width: 100%;
    overflow: hidden;
    height: ${() => px2remcss(get('smallSize'))};
    padding: 0 ${() => px2remcss(get('padding'))};
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
    margin-left: ${() => px2remcss(get('paddingToText'))};
  `,
});
OldValueTitle.displayName = 'OldValueTitle';

export const EmptyBox = styled.div`
  height: 0;
`;
EmptyBox.displayName = 'emptyBox';
