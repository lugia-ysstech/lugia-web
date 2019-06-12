/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { AnimationItem, CommonPicture } from '../css/skeleton';
import { getNewThemeProps } from './utils';

type PictrueProps = {
  pictureWidth: number,
  pictureHeight: number,
};

export default class Picture extends React.Component<any, PictrueProps> {
  render() {
    const { themeProps, animation } = this.props;

    const { themeConfig } = themeProps;
    const { width = 180, height = 128 } = themeConfig.normal;

    const AnimationThemeProps = getNewThemeProps(themeProps, {
      width,
      height,
    });

    return (
      <CommonPicture themeProps={themeProps}>
        {animation ? <AnimationItem themeProps={AnimationThemeProps} /> : null}
      </CommonPicture>
    );
  }
}
