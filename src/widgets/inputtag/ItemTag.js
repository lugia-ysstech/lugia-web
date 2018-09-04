/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */
import styled from 'styled-components';
import '../css/sv.css';
import { MarginRight, MarginTop, PaddingLeft, PadingRight, Height } from '../css/inputtag';
import { Padding } from '../css/input';

const ItemTagHeight = Height - Padding - MarginTop * 2;

const getPaddingRight = (props: Object) => (props.closeable ? PadingRight : PaddingLeft);
export const ItemContainer = styled.li`
  margin-top: ${MarginTop}px;
  height: ${ItemTagHeight}px;
  line-height: ${ItemTagHeight}px;
  user-select: none;
  background: #f6f5ff;
  border-radius: ${ItemTagHeight}px;
  color: '#666666';
  cursor: default;
  float: left;
  margin-right: ${MarginRight}px;
  position: relative;
  overflow: hidden;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0 ${getPaddingRight}px 0 ${PaddingLeft}px;
`;

export const ItemText = styled.span`
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
`;
