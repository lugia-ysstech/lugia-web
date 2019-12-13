/**
 *
 * create by liangguodong on 2018/8/24
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import Widget from '../consts/index';
import type { DividerProps } from '../css/divider';
import ThemeHoc from '@lugia/theme-hoc';
import CSSComponent, { css } from '../theme/CSSProvider';
import StaticComponent from '../theme/CSSProvider';
import colorsFunc from '../css/stateColor';

import { units } from '@lugia/css';

const { px2remcss } = units;
const { borderDisableColor } = colorsFunc();
const Divider = CSSComponent({
  tag: 'div',
  className: 'Divider',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['opacity'],
      ['margin'],
      ['padding'],
      ['boxShadow'],
      ['background'],
    ],
    defaultTheme: {
      background: {
        color: borderDisableColor,
      },
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { type, block },
      } = themeProps;
      const { width, height } = themeMeta;
      let size;
      let theSize;
      if (type === 'vertical') {
        size = 'height';
        theSize = height ? height : 200;
      } else {
        size = 'width';
        theSize = width ? width : block ? '100%' : 200;
      }
      return {
        [size]: theSize,
      };
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const {
        propsConfig: { type },
      } = themeProps;
      const { width, height } = themeMeta;
      const defaultWidth = 8;
      const defaultHeight = 1;
      let minWidth;
      let minHeight;

      if (type === 'vertical') {
        minHeight = height ? height : defaultWidth;
        minWidth = width ? width : defaultHeight;
      } else {
        minWidth = width ? width : defaultWidth;
        minHeight = height ? height : defaultHeight;
      }
      return `
       min-width: ${px2remcss(minWidth)};
       min-height: ${px2remcss(minHeight)};
      `;
    },
  },
  css: css`
    display: inline-block;
    white-space: nowrap;
    vertical-align: middle;
    position: relative;
  `,
});

const BorderDivider = CSSComponent({
  tag: 'div',
  className: 'HorizontalBorderDivider',
  normal: {
    selectNames: [['width'], ['height'], ['opacity'], ['margin'], ['padding'], ['boxShadow']],
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { dashed, position, content } = propsConfig;
      const { background = {}, height, width } = themeMeta;
      const { color = '' } = background;
      const theColor = color ? color : borderDisableColor;
      const theWidth = width
        ? px2remcss(width)
        : !content
        ? '100%'
        : position === 'left'
        ? '95%'
        : position === 'right'
        ? '5%'
        : '50%';
      const otherWidth = width
        ? px2remcss(width)
        : !content
        ? '100%'
        : position === 'left'
        ? '5%'
        : position === 'right'
        ? '95%'
        : '50%';
      const theDashed = dashed ? 'dashed' : 'solid';
      const theHeight = height ? px2remcss(height) : px2remcss(1);
      return ` ::before {
      content: '';
      display: table-cell;
      position: relative;
      width:${theWidth};
      border-top: ${theHeight} ${theDashed} ${theColor};
      transform: translateY(50%);
    }
    ::after {
      content: '';
      display: table-cell;
      position: relative;
      width:${otherWidth};
      border-top: ${theHeight} ${theDashed} ${theColor};
      transform: translateY(50%);
    }`;
    },
  },
  css: css`
    display: table;
    white-space: nowrap;
    text-align: center;
    background: transparent;
  `,
});
const ChildText = StaticComponent({
  tag: 'span',
  className: 'DividerChildText',
  normal: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    white-space: nowrap;
    text-align: center;
    background: transparent;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin: 0 ${px2remcss(6)};
  `,
});

class LineBox extends Component<DividerProps, any> {
  static defaultProps = {
    viewClass: Widget.Divider,
    dashed: false,
    type: 'horizontal',
  };
  static displayName = Widget.Divider;

  getChildText() {
    const { content, themeProps } = this.props;
    return content ? <ChildText themeProps={themeProps}>{content}</ChildText> : null;
  }
  getDivider() {
    const { type, position, dashed, content, block } = this.props;

    const hThemeProps = this.props.getPartOfThemeProps('Divider', {
      props: {
        dashed,
        position,
        content,
        type,
        block,
      },
    });

    if (position || content || dashed) {
      return (
        <BorderDivider
          dashed={dashed}
          position={position}
          content={content}
          themeProps={hThemeProps}
        >
          {this.getChildText()}
        </BorderDivider>
      );
    }
    return <Divider themeProps={hThemeProps}>{this.getChildText()}</Divider>;
  }
  render() {
    return this.getDivider();
  }
}
export default ThemeHoc(LineBox, Widget.Divider);
