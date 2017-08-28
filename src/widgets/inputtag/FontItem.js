/**
 * 用来策略字体的组件
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Item from './Item';
import { hidden, } from './css.css';


type FontItemState = {
  text: string,
  visible: boolean,
}
export default class  extends React.Component<any, any, FontItemState> {
  state: FontItemState;
  width: number;
  item: Object;

  constructor (props: any) {
    super(props);
    this.state = {
      visible: true,
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

  async setVisible (visible: boolean): Promise<boolean> {
    return new Promise(res => {
      this.setState({ visible, }, () => {
        res(true);
      });
    });
  }

  shouldComponentUpdate (_: Object, nextState: FontItemState) {
    return this.state.text !== nextState.text ||
      this.state.visible !== nextState.visible;
  }

  render () {
    const { text, visible, } = this.state;
    return (
      <Item className={visible ? '' : hidden} ref={cmp => this.item = cmp}>{text}</Item>
    );
  }

  componentDidUpdate () {
    this.width = this.item.getWidth();
  }
}
