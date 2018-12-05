/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Paragraph from './paragraph';
import Avatar from './avatar';
import Picture from './picture';
import styled from 'styled-components';
import { FontSizeNumber } from '../css';
import { px2emcss } from '../css/units';
import { toNumber } from '../common/NumberUtils';

const em = px2emcss(FontSizeNumber);
type ParagraphType = {
  rows: number,
};
type ParagraphWidth = number | string | string[] | number[];
const DefaultParagraphCount = 3;
type SkeletonProps = {
  title?: boolean,
  avatar?: boolean,
  paragraph?: ParagraphType,
  picture?: boolean,
  loading?: boolean,
  children?: any,
  paragraphWidth?: ParagraphWidth,
  titleWidth?: number | string,
  picture?: boolean,
  pictureWidth?: number | string,
  pictureHeight?: number | string,
  animation?: boolean,
};

const SkeletonContainer = styled.div`
  display: inline-block;
`;

const AvatarContainer = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const ParagraphContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 0 ${em(10)};
`;

const PictrueContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 0 ${em(10)};
`;

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
  };

  render() {
    const { paragraph, loading, children } = this.props;
    return loading ? (
      <SkeletonContainer>
        {this.getAvatar()}
        <ParagraphContainer>
          {this.getTitle()}
          {this.getParagraph(this.getParagraphCount(paragraph))}
        </ParagraphContainer>
        {this.getPictrue()}
      </SkeletonContainer>
    ) : (
      children
    );
  }

  getAvatar() {
    const { avatar, animation } = this.props;
    return avatar ? (
      <AvatarContainer>
        {' '}
        <Avatar animation={animation} />{' '}
      </AvatarContainer>
    ) : null;
  }

  getTitle = () => {
    const { title } = this.props;
    if (!title) {
      return null;
    }
    const { titleWidth, animation } = this.props;
    return <Paragraph animation={animation} type={'title'} titleWidth={titleWidth} />;
  };

  getParagraph = (paragraphCount: number) => {
    if (paragraphCount === 0) {
      return null;
    }
    const { paragraphWidth, animation } = this.props;
    const paragraphArray = [];
    const widthConfig = this.getParagraphWidth(paragraphWidth, paragraphCount);
    for (let i = 0; i < paragraphCount; i++) {
      const lastItem = this.isLastItem(paragraphCount, i);
      paragraphArray.push(
        <Paragraph animation={animation} paragraphWidth={widthConfig[i]} lastItem={lastItem} />
      );
    }
    return paragraphArray;
  };

  getParagraphWidth(paragraphWidth: ParagraphWidth, paragraphCount: number): any {
    if (Array.isArray(paragraphWidth) && paragraphWidth.length > 0) {
      return paragraphWidth;
    }
    const res = {};
    res[getLastIndex(paragraphCount)] = paragraphWidth;
    return res;
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
    const { pictureWidth, pictureHeight, animation } = this.props;
    return (
      <PictrueContainer>
        <Picture animation={animation} pictureWidth={pictureWidth} pictureHeight={pictureHeight} />
      </PictrueContainer>
    );
  };
}
