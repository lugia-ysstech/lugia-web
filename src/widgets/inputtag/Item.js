/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import '../css/sv.css';
import { ItemContainer, ItemText, } from './ItemTag';
import * as Widget from '../consts/Widget';

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
type ItemProps = {
  className?: string,
  closeable?: boolean,
  children: any,
  onClick?: Function,
  onCloseClick?: Function
};

type ItemState = {};
export default class  extends React.Component<ItemProps, ItemState> {
  list: Object;
  item: ?HTMLElement;
  width: number;
  static displayName = Widget.InputTagItem;
  render () {
    const { className, closeable = true, onClick, onCloseClick,} = this.props;
    return (
      <ItemContainer className={className} closeable={closeable} innerRef={c => this.item = c} onClick={onClick}>
        <ItemText>{this.props.children}</ItemText>
        {closeable ? <CloseButton className="iconfont icon-close" onClick={onCloseClick}></CloseButton> : null}
      </ItemContainer>
    );
  }

  componentDidMount () {
    this.updateWidth();
  }

  componentDidUpdate () {
    this.updateWidth();
  }

  updateWidth () {
    if (this.item) {
      this.width = this.item.offsetWidth;
    }
  }

  getWidth (): number {
    return this.width;
  }
}
