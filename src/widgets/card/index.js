/**
 *
 * create by liangguodong on 2018/11/29
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import Theme from '../theme';
import Avatar from '../avatar';

import {
  getCardContainerSize,
  getCardContainerShadow,
  getImageContainerSize,
  getImageContainerDisplay,
  getTitleColor,
  getDescripitionColor,
  getCardContainerBorder,
  getOutContainerDirection,
  getCardContainerBackground,
  getContentTextAlign,
  getContentMargin,
  getAvatarMargin,
} from '../css/card';
import type { CardProps, CardState } from '../css/card';
import { ObjectUtils } from '@lugia/type-utils';
import { px2emcss } from '../css/units';

const em = px2emcss(1.2);

const CardOutContainer = styled.div`
  position: relative;
  display: flex;
  ${getCardContainerSize};
  ${getCardContainerShadow};
  ${getCardContainerBorder};
  ${getCardContainerBackground};
  ${getOutContainerDirection};
  border-radius: ${em(5)};
`;
const Content = styled.div`
  ${getContentMargin};
  font-size: 1.2rem;
  ${getContentTextAlign};
  display: inline-block;
  width: inherit;
  height: inherit;
`;
const Image = styled.img`
  width: inherit;
  height: inherit;
`;
const ImageContainer = styled.div`
  position: relative;
  ${getImageContainerSize};
  ${getImageContainerDisplay};
  text-align: center;
`;
ImageContainer.displayName = Widget.CardImage;

const CardAvatar = styled(Avatar)`
  ${getAvatarMargin};
  border-radius: 50%;
`;

const Basetext = styled.div`
  text-align: inherit;
`;
const Title = Basetext.extend`
  display: inline-block;
  flex: 1;
  font-size: 1.6rem;
  font-weight: 500;
  ${getTitleColor};
  overflow: hidden;
  white-space: nowrap;
`;
const Descripition = Basetext.extend`
  font-size: 1.4rem;
  margin-top: ${em(12)};
  ${getDescripitionColor};
`;
const Operation = styled.div`
  position: absolute;
  font-size: 1.4rem;
  font-weight: 400;
  right: ${em(20)};
  top: ${em(16)};
`;

class Card extends React.Component<CardProps, CardState> {
  static defaultProps = {
    type: 'simple',
    imageOrientation: 'horizontal',
  };

  constructor(props: CardProps) {
    super(props);
  }
  static getDerivedStateFromProps(nextProps, prevState) {}

  render() {
    const { getTheme, shadow, type, imageOrientation, content } = this.props;
    return (
      <CardOutContainer
        theme={getTheme()}
        shadow={shadow}
        type={type}
        imageOrientation={imageOrientation}
      >
        {this.getOperation()}
        {this.getImageContainer()}
        <Content imageOrientation={imageOrientation} type={type} content={content}>
          {this.getTitle()}
          {this.getDescripition()}
          {this.getContent()}
        </Content>
      </CardOutContainer>
    );
  }

  getImageContainer() {
    const { type, imageOrientation, getThemeByDisplayName } = this.props;
    const { width, height } = getThemeByDisplayName(Widget.CardImage);
    const view = {
      [Widget.CardImage]: {
        width,
        height,
      },
    };
    if (type === 'avatar' || type === 'image')
      return (
        <Theme config={view}>
          <ImageContainer type={type} imageOrientation={imageOrientation} size={{ width, height }}>
            {this.getAvatar()}
            {this.getImage()}
          </ImageContainer>
        </Theme>
      );
    return null;
  }

  getOperation(): React.Node | null {
    const { operation } = this.props;
    return Operation ? <Operation>{operation}</Operation> : null;
  }
  getTitle(): React.Node | null {
    const { title } = this.props;
    return title ? <Title>{title} </Title> : null;
  }
  getDescripition(): React.Node | null {
    const { description } = this.props;
    return description ? <Descripition>{description} </Descripition> : null;
  }
  getContent(): React.Node | null {
    const { content } = this.props;
    return content ? content : null;
  }
  getImage() {
    const { image, getTheme } = this.props;
    if (ObjectUtils.isString(image)) {
      return <Image theme={getTheme()} src={image} />;
    }
    return image;
  }
  getAvatar() {
    const { avatar, imageOrientation } = this.props;
    if (ObjectUtils.isString(avatar)) {
      return <CardAvatar shape={'circle'} imageOrientation={imageOrientation} src={avatar} />;
    }
    return avatar;
  }
}
export default ThemeProvider(Card, Widget.Card);
