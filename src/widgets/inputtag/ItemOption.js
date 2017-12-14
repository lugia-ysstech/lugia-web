/**
 * 显示的一个个项
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Item from './Item';
import * as Widget from '../consts/Widget';


export default class  extends React.Component<any, any> {
  static displayName = Widget.ItemOption;

  render () {
    return (
      <Item {...this.props}/>
    );
  }
}
