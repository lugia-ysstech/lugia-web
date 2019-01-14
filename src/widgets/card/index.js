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
import Avatar from '../avatar';

import {
  getCardContainerSize,
  getCardContainerShadow,
  getImageContainerSize,
  getImageContainerDisplay,
  getTitleColor,
  getFontWeight,
  getDescripitionColor,
  getCardContainerBorder,
  getOutContainerDirection,
  getCardContainerBackground,
  getContentTextAlign,
  getContentMargin,
  getAvatarMargin,
  getTipLineBackground,
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

const CardAvatar: Object = styled(Avatar)`
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
  ${getTitleColor};
  ${getFontWeight};
  overflow: hidden;
  white-space: nowrap;
`;
const TitleTipLine = styled.div`
  left: ${em(14)};
  position: absolute;
  display: inline-block;
  height: ${em(20)};
  width: ${em(5)};
  ${getTipLineBackground};
  border-radius: ${em(5)};
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
        {this.getDetails('operation')}
        {this.getImageContainer()}
        <Content imageOrientation={imageOrientation} type={type} content={content}>
          {this.getTitleTipLine()}
          {this.getDetails('title')}
          {this.getDetails('description')}
          {this.getContent()}
        </Content>
      </CardOutContainer>
    );
  }

  getTitleTipLine() {
    const { type } = this.props;
    return type === 'tip' ? <TitleTipLine /> : null;
  }

  getImageContainer() {
    const { type, imageOrientation, getThemeByDisplayName } = this.props;
    const { width, height } = getThemeByDisplayName(Widget.CardImage);
    if (type === 'avatar' || type === 'image')
      return (
        <ImageContainer type={type} imageOrientation={imageOrientation} size={{ width, height }}>
          {this.getAvatar()}
          {this.getImage()}
        </ImageContainer>
      );
    return null;
  }
  getDetails(information: string): React.Node | null {
    const { operation, title, description, content, children, type } = this.props;
    const hasNoContent = !(content && children);
    let details = '';
    switch (information) {
      case 'operation':
        details = hasNoContent && operation ? <Operation>{operation}</Operation> : null;
        break;
      case 'title':
        details = hasNoContent && title ? <Title type={type}>{title} </Title> : null;
        break;
      case 'description':
        details = hasNoContent && description ? <Descripition>{description} </Descripition> : null;
        break;
      default:
        break;
    }
    return details;
  }
  getContent(): React.Node | null {
    const { content, children } = this.props;
    return content ? content : children ? children : null;
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
