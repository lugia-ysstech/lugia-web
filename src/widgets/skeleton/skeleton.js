/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Paragraph from './paragraph';
import { toNumber } from '../common/NumberUtils';

import {
  SkeletonWrap,
  SkeletonContainer,
  AvatarContainer,
  ParagraphContainer,
  PictrueContainer,
  Avatar,
  Picture,
  AnimationItem,
} from '../css/skeleton';

type ParagraphType = {
  rows: number,
};
const DefaultParagraphCount = 3;
type SkeletonProps = {
  title?: boolean,
  avatar?: boolean,
  paragraph?: ParagraphType,
  loading?: boolean,
  children?: any,
  picture?: boolean,
  animation?: boolean,
  getPartOfThemeProps: Function,
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
    const { paragraph, loading, children, getPartOfThemeProps } = this.props;
    const wrapThemeProps = getPartOfThemeProps('Wrap');
    return loading ? (
      <SkeletonWrap themeProps={wrapThemeProps}>
        <SkeletonContainer themeProps={wrapThemeProps}>
          {this.getAvatar()}
          <ParagraphContainer themeProps={wrapThemeProps}>
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
    const { avatar, animation } = this.props;
    if (!avatar) {
      return null;
    }
    const avatarThemeProps = this.props.getPartOfThemeProps('Avatar');

    return (
      <AvatarContainer themeProps={avatarThemeProps}>
        <Avatar themeProps={avatarThemeProps}>
          {animation ? <AnimationItem themeProps={avatarThemeProps} /> : null}
        </Avatar>
      </AvatarContainer>
    );
  }

  addPropsConfig(themeProps: Object, propsConfig: Object) {
    const newThemeProps = { ...themeProps };
    newThemeProps.propsConfig = propsConfig;
    return newThemeProps;
  }

  getTitle = () => {
    const { title } = this.props;
    if (!title) {
      return null;
    }
    const { animation, getPartOfThemeProps } = this.props;
    const titleThemeProps = getPartOfThemeProps('Title', {
      props: { type: 'title' },
    });

    return <Paragraph themeProps={titleThemeProps} animation={animation} />;
  };

  getParagraph = (paragraphCount: number) => {
    if (paragraphCount === 0) {
      return null;
    }
    const { animation, getPartOfThemeProps } = this.props;
    const paragraphArray = [];

    for (let i = 0; i < paragraphCount; i++) {
      const lastItem = this.isLastItem(paragraphCount, i);
      const firstItem = i === 0;

      const themeProps = getPartOfThemeProps('Paragraph', {
        selector: { index: i, count: paragraphCount },
        props: {
          type: 'paragraph',
          firstItem,
          lastItem,
        },
      });

      paragraphArray.push(<Paragraph themeProps={themeProps} animation={animation} />);
    }
    return paragraphArray;
  };

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
    const { animation, getPartOfThemeProps } = this.props;
    const pictureThemeProps = getPartOfThemeProps('Picture');

    return (
      <PictrueContainer themeProps={pictureThemeProps}>
        <Picture themeProps={pictureThemeProps}>
          {animation ? <AnimationItem themeProps={pictureThemeProps} /> : null}
        </Picture>
      </PictrueContainer>
    );
  };
}
