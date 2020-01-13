/**
 *
 * create by liangguodong on 2018/8/27
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import Widget from '../consts/index';
import NumberTurn from './numberturn/index';
import ThemeHoc from '@lugia/theme-hoc';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import CSSComponent, { StaticComponent, css } from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';
const { px2remcss } = units;

const { dangerColor, defaultColor } = colorsFunc();

export const BaseRedPoint = CSSComponent({
  tag: 'div',
  className: 'BaseRedPoint',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['position'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
    ],
    defaultTheme: {
      background: {
        color: dangerColor,
      },
      color: defaultColor,
      fontSize: 10,
    },
  },
  css: css`
    box-sizing: border-box;
    position: absolute;
    z-index: 10;
  `,
});

const Dot: Object = CSSComponent({
  extend: BaseRedPoint,
  className: 'BadgeDot',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['position'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
    ],
    defaultTheme: {
      height: 10,
      width: 10,
    },
  },
  css: css`
    border-radius: 100%;
  `,
});

const Container: Object = CSSComponent({
  tag: 'div',
  className: 'BadgeContainer',
  normal: {
    selectNames: [],
    getCSS(themeMeta: Object, themeProps: Object) {
      const { width, height } = themeMeta;
      const theWidth = width ? width : 10;
      const theHeight = height ? height : 10;
      return `
        min-width: ${px2remcss(theWidth)};
        min-height: ${px2remcss(theHeight)};
      `;
    },
  },
  css: css`
    background: transparent;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    line-height: 1;
  `,
});

type BadgeProps = {
  viewClass?: string,
  getTheme: Function,
  count?: number,
  showZero?: boolean,
  children: React$Element<any>,
  overflowCount: number,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};
type BadgeState = {};

class BadgeBox extends Component<BadgeProps, BadgeState> {
  static defaultProps = {
    viewClass: Widget.Badge,
    size: 'default',
    overflowCount: '99',
  };
  static displayName = Widget.Badge;

  getDot() {
    const { showZero = false, count = 0, getPartOfThemeProps } = this.props;
    const hasCount = 'count' in this.props;
    const hasShowZero = 'showZero' in this.props;
    const isZero = count === 0 || !count;
    const theThemeProps = getPartOfThemeProps('BadgeDot') || getPartOfThemeProps('Badge');
    const dot = <Dot themeProps={theThemeProps} />;

    if (hasShowZero && isZero) {
      return showZero ? this.getNumberTurn(0) : dot;
    }
    if (hasCount) {
      return showZero || !isZero ? this.getNumberTurn(count) : dot;
    }
    return dot;
  }

  getNumberTurn(count: ?number) {
    const { overflowCount, getPartOfThemeHocProps } = this.props;
    const theThemeProps = { ...getPartOfThemeHocProps('BadgeNumber') } || {
      ...getPartOfThemeHocProps('Badge'),
    };
    return (
      <NumberTurn count={count} overflowCount={overflowCount} singleTheme {...theThemeProps} />
    );
  }
  render() {
    const { children, getPartOfThemeProps } = this.props;
    const hasChildren = !!children;
    const theThemeProps = getPartOfThemeProps('BadgeDot') || getPartOfThemeProps('Badge');
    return (
      <Container hasChildren={hasChildren} themeProps={theThemeProps}>
        {children}
        {this.getDot()}
      </Container>
    );
  }
}

const Badge = ThemeHoc(KeyBoardEventAdaptor(BadgeBox), Widget.Badge);
export default Badge;
