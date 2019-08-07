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
  className: 'HorizontalDivider',
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
    defaultTheme: {
      width: 500,
    },
  },
  css: css`
    display: table;
    white-space: nowrap;
    text-align: center;
    background: transparent;
  `,
});
const VerticalDivider = StaticComponent({
  tag: 'div',
  className: 'VerticalDivider',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['opacity'],
      ['margin'],
      ['padding'],
      ['boxShadow'],
    ],
    defaultTheme: {
      background: {
        color: borderDisableColor,
      },
      width: 1,
      height: 10,
      margin: {
        left: 6,
        right: 6,
      },
    },
  },
  css: css`
    display: inline-block;
    vertical-align: middle;
    position: relative;
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
    const { type, position, dashed, content } = this.props;

    const vThemeProps = this.props.getPartOfThemeProps('VerticalDivider', {
      props: {
        dashed,
        position,
        content,
      },
    });
    const hThemeProps = this.props.getPartOfThemeProps('HorizontalDivider', {
      props: {
        dashed,
        position,
        content,
      },
    });

    if (type === 'vertical') {
      return <VerticalDivider themeProps={vThemeProps} />;
    }
    return (
      <Divider dashed={dashed} position={position} content={content} themeProps={hThemeProps}>
        {this.getChildText()}
      </Divider>
    );
  }
  render() {
    return this.getDivider();
  }
}
export default ThemeHoc(LineBox, Widget.Divider);
