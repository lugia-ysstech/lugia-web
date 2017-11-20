/**
 * 用来策略字体的组件
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Item from './Item';
import { hidden, } from './css.css';
import * as Widget from '../consts/Widget';


export default class  extends React.Component<any, any> {
  static displayName = Widget.MoreInputTagItem;
  render () {
    return (
      <Item closeable={false} {...this.props}>...</Item>
    );
  }
}
