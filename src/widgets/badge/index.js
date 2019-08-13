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
import { getBoxShadow } from '@lugia/theme-utils';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';

const { px2remcss } = units;

const { dangerColor, defaultColor } = colorsFunc();

export const BaseRedPoint = CSSComponent({
  tag: 'sup',
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
    transform: translateX(50%);
    transform-origin: 100%;
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
      boxShadow: getBoxShadow('0 0 0 1 #fff'),
      height: 10,
      width: 10,
    },
  },
  css: css`
    border-radius: 100%;
    z-index: 10;
  `,
  option: {
    hover: true,
  },
});

const Container: Object = StaticComponent({
  tag: 'span',
  className: 'BadgeContainer',
  css: css`
    ${props => {
      if (!props.hasChildren) {
        const size = px2remcss(10);
        return `width:${size};height:${size};`;
      }
    }};
    background: transparent;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
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
    const { showZero = false, count = 0 } = this.props;
    const hasCount = 'count' in this.props;
    const hasShowZero = 'showZero' in this.props;
    const isZero = count === 0 || !count;
    const dot = <Dot themeProps={this.props.getPartOfThemeProps('BadgeDot')} />;

    if (hasShowZero && isZero) {
      return showZero ? this.getNumberTurn(0) : dot;
    }
    if (hasCount) {
      return showZero || !isZero ? this.getNumberTurn(count) : dot;
    }
  }

  getNumberTurn(count: ?number) {
    const { overflowCount } = this.props;
    return (
      <NumberTurn
        count={count}
        overflowCount={overflowCount}
        {...this.props.getPartOfThemeHocProps('BadgeNumber')}
      />
    );
  }
  render() {
    const { children } = this.props;
    const hasChildren = !!children;
    return (
      <Container hasChildren={hasChildren}>
        {children}
        {this.getDot()}
      </Container>
    );
  }
}

const Badge = ThemeHoc(KeyBoardEventAdaptor(BadgeBox), Widget.Badge);
export default Badge;
