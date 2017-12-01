/**
 * 用来策略字体的组件
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Item from './Item';
import * as Widget from '../consts/Widget';
import styled from 'styled-components';

type FontItemState = {
  text: string,
}
const HiddenItem = styled(Item)`
  position: absolute !important;
  top: -943124px;
`;
export default class  extends React.Component<any, FontItemState> {
  static displayName = Widget.FontItem;

  state: FontItemState;
  width: number;
  item: ?Item;

  constructor (props: any) {
    super(props);
    this.state = {
      text: '',
    };
  }

  async getWidth (text: string): Promise<number> {
    return new Promise(res => {
      this.setState({ text, }, () => {
        res(this.width);
      });
    });
  }


  shouldComponentUpdate (_: Object, nextState: FontItemState) {
    return this.state.text !== nextState.text;
  }

  render () {
    const { text, } = this.state;
    const fillItem: Function = (cmp: Object): void => {
      this.item = cmp;
    };
    return (
      <HiddenItem innerRef={fillItem}>{text}</HiddenItem>
    );
  }

  componentDidUpdate () {
    if (this.item) {
      this.width = this.item.getWidth();
    }
  }
}
