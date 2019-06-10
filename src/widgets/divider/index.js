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
  className: 'divider',
  normal: {
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { dashed, position, content } = propsConfig;
      const { color } = themeMeta;
      const theColor = color ? color : borderDisableColor;
      const theWidth = !content
        ? '100%'
        : position === 'left'
        ? '95%'
        : position === 'right'
        ? '5%'
        : '50%';
      const otherWidth = !content
        ? '100%'
        : position === 'left'
        ? '5%'
        : position === 'right'
        ? '95%'
        : '50%';
      const theDashed = dashed ? 'dashed' : 'solid';
      return ` ::before {
      content: '';
      display: table-cell;
      position: relative;
      top: 50%;
      width:${theWidth};
      border-top: ${px2remcss(1)} ${theDashed} ${theColor};
      transform: translateY(50%);
    }
    ::after {
      content: '';
      display: table-cell;
      position: relative;
      top: 50%;
      width:${otherWidth};
      border-top: ${px2remcss(1)} ${theDashed} ${theColor};
      transform: translateY(50%);
    }`;
    },
  },
  css: css`
    display: table;
    white-space: nowrap;
    text-align: center;
    background: transparent;
    font-weight: 500;
    width: ${px2remcss(500)};
  `,
});
const VerticalDivider = StaticComponent({
  tag: 'div',
  className: 'verticalDivider',
  css: css`
    margin: 0 ${px2remcss(6)};
    display: inline-block;
    height: 100%;
    width: ${px2remcss(1)};
    vertical-align: middle;
    position: relative;
    background: ${borderDisableColor};
  `,
});
const ChildText = StaticComponent({
  tag: 'span',
  className: 'dividerChildText',
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
    const { type, position, dashed, content, themeProps } = this.props;
    themeProps.propsConfig = { dashed, position, content };
    if (type === 'vertical') {
      return <VerticalDivider themeProps={themeProps} />;
    }
    return (
      <Divider dashed={dashed} position={position} content={content} themeProps={themeProps}>
        {this.getChildText()}
      </Divider>
    );
  }
  render() {
    return this.getDivider();
  }
}
export default ThemeHoc(LineBox, Widget.Divider);
