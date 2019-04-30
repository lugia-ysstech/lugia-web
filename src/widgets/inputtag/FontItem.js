/**
 * 用来策略字体的组件
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Item from './Item';
import Widget from '../consts/index';
import styled from 'styled-components';
import { FontSize } from '../css';
type FontItemState = {
  text: string,
};
const HiddenItem: Object = styled(Item)`
  font-size: ${FontSize};
  position: absolute !important;
  top: -943124px;
`;
export default class extends React.Component<any, FontItemState> {
  static displayName = Widget.InputTagFontItem;

  state: FontItemState;
  width: number;
  item: ?Item;

  constructor(props: any) {
    super(props);
    this.state = {
      text: '',
    };
    this.width = 0;
  }

  async getWidth(text: string): Promise<number> {
    return new Promise(res => {
      this.setState({ text }, () => {
        res(this.width);
      });
    });
  }

  shouldComponentUpdate(_: Object, nextState: FontItemState) {
    return this.state.text !== nextState.text;
  }

  render() {
    const { text } = this.state;
    const fillItem: Function = (cmp: Object): void => {
      this.item = cmp;
    };
    return <HiddenItem ref={fillItem}>{text}</HiddenItem>;
  }

  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    if (this.item) {
      this.width = this.item.getWidth();
    }
  }
}
