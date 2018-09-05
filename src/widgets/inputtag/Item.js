/**
 * 标签输入框
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import '../css/sv.css';
import { ItemContainer, ItemText } from './ItemTag';
import Widget from '../consts/index';
import { FontSize } from '../css';
import CommonIcon from '../icon';
import { blackColor, mediumGreyColor } from '../css/inputtag';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);

const CloseButton = styled(CommonIcon)`
  font-size: ${FontSize};
  color: ${mediumGreyColor};
  position: absolute;
  padding: 0 0 0 ${em(5)};
  right: ${em(4)};
  top: 50%;
  transform: translateY(-50%);
  zoom: 1;

  :hover {
    color: ${blackColor};
  }
`;

CloseButton.displayName = Widget.InputTagCloseButton;
type ItemProps = {
  className?: string,
  closeable?: boolean,
  children: any,
  onClick?: Function,
  onCloseClick?: Function,
};

type ItemState = {};
export default class extends React.Component<ItemProps, ItemState> {
  list: Object;
  item: ?HTMLElement;
  width: number;
  static displayName = Widget.InputTagItem;
  render() {
    const { className, closeable = true, onClick, onCloseClick } = this.props;
    return (
      <ItemContainer
        className={className}
        closeable={closeable}
        innerRef={c => (this.item = c)}
        onClick={onClick}
      >
        <ItemText>{this.props.children}</ItemText>
        {closeable ? (
          <CloseButton iconClass="lugia-icon-reminder_close_circle" onClick={onCloseClick} />
        ) : null}
      </ItemContainer>
    );
  }

  componentDidMount() {
    this.updateWidth();
  }

  componentDidUpdate() {
    this.updateWidth();
  }

  updateWidth() {
    if (this.item) {
      this.width = this.item.offsetWidth;
    }
  }

  getWidth(): number {
    return this.width;
  }
}
