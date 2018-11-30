/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Theme from '../theme';
import { CommonPicture, AnimationItem } from '../css/skeleton';
import { FontSizeNumber } from '../css';
import { px2emcss } from '../css/units';

const em = px2emcss(FontSizeNumber);

type PictrueProps = {
  pictureWidth: number,
  pictureHeight: number,
};

export default class Picture extends React.Component<any, PictrueProps> {
  render() {
    const { pictureWidth = 180, pictureHeight = 128, animation } = this.props;
    return (
      <CommonPicture pictureWidth={pictureWidth} pictureHeight={pictureHeight}>
        {animation ? (
          <AnimationItem width={pictureHeight} height={pictureHeight} distance={1000} />
        ) : null}
      </CommonPicture>
    );
  }
}
