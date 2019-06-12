/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { AnimationItem, CommonAvatar } from '../css/skeleton';
import { getNewThemeProps } from './utils';

type AvatarProps = {
  animation?: boolean,
};

export default class Avatar extends React.Component<any, AvatarProps> {
  static defaultProps = {
    animation: false,
  };

  render() {
    const { animation, themeProps } = this.props;
    const { themeConfig } = themeProps;
    const { normal = {} } = themeConfig;
    const { width = 40 } = normal;

    const AnimationThemeProps = getNewThemeProps(themeProps, {
      width,
      height: width,
    });

    return (
      <CommonAvatar themeProps={themeProps}>
        {animation ? <AnimationItem themeProps={AnimationThemeProps} /> : null}
      </CommonAvatar>
    );
  }
}
