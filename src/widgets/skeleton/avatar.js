/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { AnimationItem, CommonAvatar } from '../css/skeleton';

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
