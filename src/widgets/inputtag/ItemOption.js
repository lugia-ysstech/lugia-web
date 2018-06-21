/**
 * 显示的一个个项
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Item from './Item';
import Widget from '../consts/index';

export default class extends React.Component<any, any> {
  static displayName = Widget.ItemTagOption;

  render() {
    return <Item {...this.props} />;
  }
}
