/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { ParagraphWrap, CommonParagraph, AnimationItem } from '../css/skeleton';

type ParagraphProps = {
  type: 'title' | 'pragraph',
  lastItem: boolean,
  paragraphWidth?: number,
  titleWidth?: number,
  animation?: boolean,
};

export default class Paragraph extends React.Component<any, ParagraphProps> {
  static defaultProps = {
    type: 'pragraph',
    lastItem: false,
    animation: true,
  };
  static displayName = 'ParagraphItem';

  render() {
    const { type, lastItem, paragraphWidth, titleWidth, animation } = this.props;
    return (
      <ParagraphWrap
        type={type}
        lastItem={lastItem}
        paragraphWidth={paragraphWidth}
        titleWidth={titleWidth}
      >
        <CommonParagraph>
          {animation ? <AnimationItem width={60} height={60} /> : null}
        </CommonParagraph>
      </ParagraphWrap>
    );
  }
}
