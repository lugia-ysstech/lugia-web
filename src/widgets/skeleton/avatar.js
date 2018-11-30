/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontSizeNumber } from '../css';
import { CommonAvatar, AnimationItem } from '../css/skeleton';
import { px2emcss } from '../css/units';
const em = px2emcss(FontSizeNumber);

type AvatarProps = {
  animation?: boolean,
};

export default class Avatar extends React.Component<any, AvatarProps> {
  static defaultProps = {
    animation: false,
  };

  render() {
    const { animation } = this.props;
    return (
      <CommonAvatar>
        {animation ? <AnimationItem distance={300} width={16} height={16} /> : null}
      </CommonAvatar>
    );
  }
}
