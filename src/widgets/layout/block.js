/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import type { BlockProps, BlockState } from '../css/block';
import { Block } from '../css/block';

export default class extends React.Component<BlockProps, BlockState> {
  render() {
    const { getTheme, children } = this.props;
    return <Block theme={getTheme()}>{children}</Block>;
  }
}
