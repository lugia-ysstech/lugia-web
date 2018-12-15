/**
 *
 * create by liangguodong on 2018/8/27
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';
import type { AvatarSize, AvatarShape } from '../css/avatar';

import {
  getSize,
  getIconFontSize,
  getAvatarBackground,
  getAvatarColor,
  lineHeight,
  getNameFontSize,
  getBorderRadius,
} from '../css/avatar';

import Icon from '../icon';
import ThemeProvider from '../theme-provider';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import { getMargin } from '../common/ThemeUtils';

const BaseAvatar = styled.span`
  font-variant: tabular-nums;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  ${getAvatarBackground};
  white-space: nowrap;
  position: relative;
  ${getSize};
  line-height: ${lineHeight};
  ${getBorderRadius};
  ${getMargin};
`;
const AvatarIcon: Object = styled(Icon)`
  display: inline-block;
  font-style: normal;
  text-align: center;
  text-transform: none;
  vertical-align: middle !important;
  ${getIconFontSize};
  ${getAvatarColor};
`;

const Name = styled.span`
  user-select: none;
  ${getAvatarColor};
  ${getNameFontSize};
  ${getSize};
`;
const Picture = styled.img`
  ${getBorderRadius};
  ${getSize};
`;

type AvatarProps = {
  viewClass?: string,
  shape?: AvatarShape,
  size?: AvatarSize,
  src?: string,
  icon?: string,
  name: string,
  getTheme: Function,
};
type AvatarState = {};

class AvatarBox extends Component<AvatarProps, AvatarState> {
  static defaultProps = {
    viewClass: Widget.Avatar,
    shape: 'circle',
    size: 'default',
  };
  static displayName = Widget.Avatar;

  getChildren() {
    const { src, icon, getTheme, name, size, shape } = this.props;
    if (src !== undefined && src !== null) {
      return <Picture src={src} shape={shape} theme={getTheme()} />;
    } else if (icon !== undefined && icon !== null) {
      return <AvatarIcon size={size} iconClass={icon} theme={getTheme()} />;
    }
    let finalName = name + '';
    finalName = finalName.length > 5 ? finalName.substr(0, 5) : finalName;
    return (
      <Name size={size} theme={getTheme()}>
        {finalName}
      </Name>
    );
  }
  getAvatar() {
    const { props } = this;
    const { getTheme } = props;
    return (
      <BaseAvatar {...props} theme={getTheme()}>
        {this.getChildren()}
      </BaseAvatar>
    );
  }
  render() {
    return this.getAvatar();
  }
}
const Avatar = ThemeProvider(KeyBoardEventAdaptor(AvatarBox), Widget.Avatar);
export default Avatar;
