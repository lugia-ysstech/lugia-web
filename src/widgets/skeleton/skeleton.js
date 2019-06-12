/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Paragraph from './paragraph';
import Avatar from './avatar';
import Picture from './picture';
import { toNumber } from '../common/NumberUtils';
import { getNewThemeProps } from './utils';

import {
  SkeletonWrap,
  SkeletonContainer,
  AvatarContainer,
  ParagraphContainer,
  PictrueContainer,
} from '../css/skeleton';

type ParagraphType = {
  rows: number,
};
type ParagraphWidth = number | string | string[] | number[];
const DefaultParagraphCount = 3;
type SkeletonProps = {
  title?: boolean,
  titleWidth?: number | string,
  avatar?: boolean,
  paragraph?: ParagraphType,
  loading?: boolean,
  children?: any,
  paragraphWidth?: ParagraphWidth,
  picture?: boolean,
  pictureWidth?: number | string,
  pictureHeight?: number | string,
  animation?: boolean,
};

export function getLastIndex(paragraphCount: number) {
  return paragraphCount - 1;
}

export default class Skeleton extends React.Component<Object, SkeletonProps> {
  static defaultProps = {
    title: true,
    avatar: true,
    picture: false,
    loading: true,
    animation: false,
    paragraph: { rows: DefaultParagraphCount },
  };

  render() {
    const { paragraph, loading, children, themeProps } = this.props;
    return loading ? (
      <SkeletonWrap themeProps={themeProps}>
        <SkeletonContainer themeProps={themeProps}>
          {this.getAvatar()}
          <ParagraphContainer themeProps={themeProps}>
            {this.getTitle()}
            {this.getParagraph(this.getParagraphCount(paragraph))}
          </ParagraphContainer>
          {this.getPictrue()}
        </SkeletonContainer>
      </SkeletonWrap>
    ) : (
      children
    );
  }

  getAvatar() {
    const { avatar, animation, themeProps } = this.props;
    if (!avatar) {
      return null;
    }
    const avatarThemeProps = this.props.mergeThemeStateAndChildThemeProps('Avatar');

    return (
      <AvatarContainer themeProps={themeProps}>
        <Avatar themeProps={avatarThemeProps} animation={animation} />
      </AvatarContainer>
    );
  }

  getTitle = () => {
    const { title } = this.props;
    if (!title) {
      return null;
    }
    const { animation, themeProps } = this.props;
    const { themeConfig: titleThemeConfig } = this.props.mergeThemeStateAndChildThemeProps('Title');
    const { normal: titleNormal } = titleThemeConfig;
    const titleWidth = titleNormal ? titleNormal.width : 400;
    const titleThemeProps = getNewThemeProps(themeProps, {
      width: titleWidth,
      type: 'title',
    });

    return <Paragraph themeProps={titleThemeProps} animation={animation} />;
  };

  getParagraph = (paragraphCount: number) => {
    if (paragraphCount === 0) {
      return null;
    }
    const { paragraphWidth, animation, themeProps } = this.props;
    const paragraphArray = [];
    const widthConfig = this.getParagraphWidth(paragraphWidth, paragraphCount);

    for (let i = 0; i < paragraphCount; i++) {
      const lastItem = this.isLastItem(paragraphCount, i);

      const paragraphThemeProps = getNewThemeProps(themeProps, {
        width: widthConfig[i],
        type: 'paragraph',
        lastItem,
      });

      paragraphArray.push(<Paragraph themeProps={paragraphThemeProps} animation={animation} />);
    }
    return paragraphArray;
  };

  getParagraphWidth(paragraphWidth: ParagraphWidth, paragraphCount: number): any {
    const paragraphWidthConfig = [];

    if (Array.isArray(paragraphWidth) && paragraphWidth.length > 0) {
      for (let i = 0; i < paragraphCount; i++) {
        const itemWidth = i < paragraphWidth.length ? paragraphWidth[i] : null;
        paragraphWidthConfig.push(itemWidth);
      }
    } else {
      for (let i = 0; i < paragraphCount; i++) {
        const itemWidth = i === paragraphCount - 1 ? paragraphWidth : null;
        paragraphWidthConfig.push(itemWidth);
      }
    }

    return paragraphWidthConfig;
  }

  isLastItem(paragraphCount: number, index: number): boolean {
    if (paragraphCount <= 2) {
      return false;
    }
    return index === getLastIndex(paragraphCount);
  }

  getParagraphCount(paragraph?: ParagraphType = { rows: DefaultParagraphCount }): number {
    if (paragraph === null) {
      return DefaultParagraphCount;
    }
    const { rows = DefaultParagraphCount } = paragraph;
    return toNumber(rows, DefaultParagraphCount);
  }

  getPictrue = () => {
    const { picture } = this.props;
    if (!picture) {
      return null;
    }
    const { animation, mergeThemeStateAndChildThemeProps } = this.props;
    const pictureThemeProps = mergeThemeStateAndChildThemeProps('Picture');

    return (
      <PictrueContainer themeProps={pictureThemeProps}>
        <Picture themeProps={pictureThemeProps} animation={animation} />
      </PictrueContainer>
    );
  };
}
