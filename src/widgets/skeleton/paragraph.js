/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { AnimationItem, CommonParagraph, ParagraphWrap } from '../css/skeleton';
import { getNewThemeProps } from './utils';

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
    const { paragraphWidth = 600, animation, themeProps } = this.props;
    const AnimationThemeProps = getNewThemeProps(themeProps, {
      width: paragraphWidth,
      height: 20,
    });

    return (
      <ParagraphWrap themeProps={themeProps}>
        <CommonParagraph themeProps={themeProps}>
          {animation ? <AnimationItem themeProps={AnimationThemeProps} /> : null}
        </CommonParagraph>
      </ParagraphWrap>
    );
  }
}
