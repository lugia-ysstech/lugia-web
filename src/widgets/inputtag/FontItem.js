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
}
export default class  extends React.Component<any, FontItemState> {
  state: FontItemState;
  width: number;
  item: Object;

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
      <Item className={hidden} ref={fillItem}>{text}</Item>
    );
  }

  componentDidUpdate () {
    this.width = this.item.getWidth();
  }
}
