/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import '../../sv.css';
import { ItemMarginRight, ItemPaddingLeft, ItemPadingRight, } from './style';
import { RadiusSize, } from '../css/input';

const Item = styled.li`
  margin-top: 3px;
  height: 20px;
  line-height: 20px;
  user-select: none;
  background: #f3f3f3;
  border-radius: ${RadiusSize};
  color: rgba(0, 0, 0, 0.65);
  cursor: default;
  float: left;
  margin-right: ${ItemMarginRight}px;
  position: relative;
  overflow: hidden;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0 ${(props: Object) => ( props.closeable ? ItemPadingRight : ItemPaddingLeft)}px 0 ${ItemPaddingLeft}px;
`;

const Text = styled.span`
  height: 20px;
  line-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
`;
const CloseButton = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.47);
  position: absolute;
  padding: 0 0 0 5px;
  right: 4px;
  zoom: 1;
  :hover {
    color: #000;
  }
`;

export default class  extends React.Component {
  list: Object;
  item: Object;
  width: number;

  render () {
    const { className, closeable = true, } = this.props;
    return (
      <Item className={className} closeable={closeable} innerRef={c => this.item = c}>
        <Text>{this.props.children}</Text>
        {closeable ? <CloseButton className="iconfont icon-close"></CloseButton> : null}
      </Item>
    );
  }

  componentDidMount () {
    this.updateWidth();
  }

  componentDidUpdate () {
    this.updateWidth();
  }

  updateWidth () {
    this.width = this.item.offsetWidth;
  }

  getWidth (): number {
    return this.width;
  }
}
