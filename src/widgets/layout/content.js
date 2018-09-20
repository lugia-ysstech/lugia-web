/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import type { BlockProps, BlockState } from '../css/block';
import Block from './block';

export default class extends React.Component<BlockProps, BlockState> {
  render() {
    const { children } = this.props;
    return (
      <Block isContent={true} {...this.props}>
        {children}
      </Block>
    );
  }
}
