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
import Widget from '../consts/index';
import { FontSizeNumber } from '../css';
import { px2emcss } from '../css/units';
import ThemeProvider from '../theme-provider';
const em = px2emcss(FontSizeNumber);

const defaultDistance = 800;

type SkeletonProps = {
  title?: boolean,
  avatar?: boolean,
  paragraph?: { rows: any } | boolean,
  picture?: boolean,
  loading?: boolean,
  children?: any,
  paragraphWidth?: number | string | string[] | number[],
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

const getChildrenHeight = (props: SkeletonProps) => {
  const { loading } = props;
  return `height: ${loading ? 0 : ''}`;
};

const ChildrenContainer = styled.div`
  ${getChildrenHeight};
  overflow: hidden;
`;

export default ThemeProvider(
  class Skeleton extends React.Component<any, SkeletonProps> {
    static defaultProps = {
      title: true,
      avatar: true,
      paragraph: { rows: 3 },
      picture: false,
      loading: true,
      animation: false,
    };

    constructor(props: SkeletonProps) {
      super(props);
      // this.distance = this.getInitDistance(props);
    }

    render() {
      const { avatar, title, picture, paragraph, loading, children, animation } = this.props;
      const showParagraphNumber = this.renderParagraphNumber(paragraph);

      return loading ? (
        <SkeletonContainer>
          {avatar ? (
            <AvatarContainer>
              <Avatar animation={animation} />
            </AvatarContainer>
          ) : (
            <div />
          )}

          <ParagraphContainer>
            {title ? this.getTitle() : <div />}
            {this.getParagraph(showParagraphNumber)}
          </ParagraphContainer>

          {picture ? <PictrueContainer>{this.getPictrue()}</PictrueContainer> : <div />}
        </SkeletonContainer>
      ) : (
        <ChildrenContainer>{children}</ChildrenContainer>
      );
    }

    getTitle = () => {
      const { titleWidth, animation } = this.props;
      const activeTitleWidth = this.valueToNumber(titleWidth);
      return <Paragraph animation={animation} type={'title'} titleWidth={activeTitleWidth} />;
    };

    getParagraph = (paragraphNumber: number) => {
      if (!paragraphNumber) {
        return <div />;
      }
      const { paragraphWidth, animation } = this.props;
      const isString = typeof paragraphWidth === 'string';
      const isNumber = typeof paragraphWidth === 'number';
      const isArray = paragraphWidth instanceof Array && paragraphWidth.length !== 0;
      const paragraphArray = [];

      if (isArray) {
        for (let i = 0; i < paragraphNumber; i++) {
          paragraphArray.push(
            <Paragraph animation={animation} paragraphWidth={paragraphWidth[i]} />
          );
        }
        return paragraphArray;
      }
      if (isNumber || isString) {
        for (let i = 0; i < paragraphNumber; i++) {
          paragraphArray.push(<Paragraph animation={animation} />);
        }
        const lastItemWidth = this.valueToNumber(paragraphWidth);
        paragraphArray.pop();

        paragraphArray.push(
          <Paragraph animation={animation} lastItem paragraphWidth={lastItemWidth} />
        );

        return paragraphArray;
      }

      for (let i = 0; i < paragraphNumber; i++) {
        paragraphArray.push(<Paragraph animation={animation} />);
      }
      if (paragraphNumber > 2) {
        paragraphArray.pop();
        paragraphArray.push(<Paragraph animation={animation} lastItem />);
      }
      return paragraphArray;
    };

    renderParagraphNumber = (paragraph: boolean | Object) => {
      if (paragraph === false) {
        return 0;
      }

      if (!paragraph) {
        return 3;
      }
      const { rows } = paragraph;
      const activeRows = this.valueToNumber(rows);
      if (activeRows === 0) {
        return 0;
      }
      if (paragraph.constructor !== Object || paragraph === true || !activeRows) {
        return 3;
      }
      return rows;
    };

    getPictrue = () => {
      const { pictureWidth, pictureHeight, animation } = this.props;
      const activePictrueWidth = this.valueToNumber(pictureWidth);
      const activePictrueHeight = this.valueToNumber(pictureHeight);
      return (
        <Picture
          animation={animation}
          pictureWidth={activePictrueWidth}
          pictureHeight={activePictrueHeight}
        />
      );
    };

    valueToNumber = (value: string | number) => {
      const newValue = parseInt(value);
      if (isNaN(newValue)) {
        return undefined;
      }
      return newValue;
    };
  },
  Widget.Skeleton
);
