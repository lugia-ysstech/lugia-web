/**
 * 用来策略字体的组件
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Item from './Item';
import { hidden, } from './css.css';


export default class  extends React.Component<any, any, any> {

  render () {
    return (
      <Item closeable={false}>...</Item>
    );
  }
}
