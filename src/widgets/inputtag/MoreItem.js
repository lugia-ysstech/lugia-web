/**
 * 用来策略字体的组件
 * create by ligx
 *
 * @flow
 */
import React from 'react';
import Item from './Item';
import Widget from '../consts/index';
import Icon from '../icon';

export default class extends React.Component<any, any> {
  static displayName = Widget.InputTagMoreItem;
  render() {
    return (
      <Item closeable={false} {...this.props}>
        <Icon iconClass={'lugia-icon-financial_omit'} />
      </Item>
    );
  }

  getWidth() {}
}
