/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { AnimationItem, CommonParagraph, ParagraphWrap } from '../css/skeleton';

type ParagraphProps = {
  type: 'title' | 'pragraph',
  lastItem: boolean,
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
    const { animation, themeProps } = this.props;

    return (
      <ParagraphWrap themeProps={themeProps}>
        <CommonParagraph themeProps={themeProps}>
          {animation ? <AnimationItem themeProps={themeProps} /> : null}
        </CommonParagraph>
      </ParagraphWrap>
    );
  }
}
