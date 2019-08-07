/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */
import styled from 'styled-components';
import {
  MarginRight,
  MarginTop,
  PaddingLeft,
  PadingRight,
  Height,
  darkGreyColor,
} from '../css/inputtag';
import { ItemBackgroundColor } from '../css/menu';
import { Padding } from '../css/input';
import { px2remcss } from '../css/units';

const ItemTagHeight = Height - Padding - MarginTop * 2;

const getPaddingRight = (props: Object) =>
  (props.closeable ? px2remcss(PadingRight) : px2remcss(PaddingLeft));
export const ItemContainer = styled.li`
  margin-top: ${px2remcss(4)};
  height: ${px2remcss(ItemTagHeight)};
  line-height: ${px2remcss(ItemTagHeight)};
  user-select: none;
  background: ${ItemBackgroundColor};
  border-radius: ${px2remcss(ItemTagHeight)};
  color: ${darkGreyColor};
  cursor: default;
  float: left;
  position: relative;
  overflow: hidden;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0 ${getPaddingRight} 0 ${px2remcss(PaddingLeft)};
`;

export const ItemText = styled.span`
  height: ${px2remcss(20)};
  line-height: ${px2remcss(20)};
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
`;
