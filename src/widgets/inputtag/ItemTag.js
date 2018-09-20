/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */
import styled from 'styled-components';
import '../css/sv.css';
import {
  MarginRight,
  MarginTop,
  PaddingLeft,
  PadingRight,
  Height,
  ItemContainerBackgroundColor,
  darkGreyColor,
} from '../css/inputtag';
import { Padding } from '../css/input';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);

const ItemTagHeight = Height - Padding - MarginTop * 2;

const getPaddingRight = (props: Object) => (props.closeable ? em(PadingRight) : em(PaddingLeft));
export const ItemContainer = styled.li`
  margin-top: ${em(4)};
  height: ${em(ItemTagHeight)};
  line-height: ${em(ItemTagHeight)};
  user-select: none;
  background: ${ItemContainerBackgroundColor};
  border-radius: ${em(ItemTagHeight)};
  color: ${darkGreyColor};
  cursor: default;
  float: left;
  margin-right: ${em(MarginRight)};
  position: relative;
  overflow: hidden;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0 ${getPaddingRight} 0 ${em(PaddingLeft)};
`;

export const ItemText = styled.span`
  height: ${em(20)};
  line-height: ${em(20)};
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
`;
