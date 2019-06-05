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
import { css } from '../theme/CSSProvider';
import CSSComponent from '../theme/CSSProvider';
import colorsFunc from '../css/stateColor';
import { units } from '@lugia/css';

const { px2remcss } = units;
const { dangerColor, defaultColor } = colorsFunc();

export const BaseRedPoint = CSSComponent({
  tag: 'sup',
  className: 'baseRedPoint',
  normal: {
    selectNames: [['width'], ['height'], ['background'], ['color'], ['position']],
    defaultTheme: {},
  },
  css: css`
    font-size: 1rem;
    box-sizing: border-box;
    position: absolute;
    transform: translateX(50%);
    transform-origin: 100%;
    z-index: 10;
    background: ${dangerColor};
    color: ${defaultColor};
  `,
});

const Dot: Object = CSSComponent({
  extend: BaseRedPoint,
  className: 'badgeDot',
  normal: {
    selectNames: [['width'], ['height'], ['position']],
  },
  css: css`
    height: ${px2remcss(10)};
    width: ${px2remcss(10)};
    border-radius: 100%;
    z-index: 10;
    box-shadow: 0 0 0 ${px2remcss(1)} #fff;
  `,
});

const Container: Object = CSSComponent({
  tag: 'span',
  className: 'badgeContainer',
  normal: {
    selectNames: [['padding'], ['margin'], ['position']],
  },
  css: css`
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
    const { showZero = false, count = 0, themeProps } = this.props;

    const hasCount = 'count' in this.props;
    const hasShowZero = 'showZero' in this.props;
    const isZero = count === 0 || !count;
    if (hasShowZero && isZero) {
      return showZero ? this.getNumberTurn(0) : null;
    }

    if (hasCount) {
      return showZero || !isZero ? this.getNumberTurn(count) : null;
    }

    return <Dot themeProps={themeProps} />;
  }

  getNumberTurn(count: ?number) {
    const { overflowCount } = this.props;
    const { theme, viewClass } = this.props.getChildThemeHocProps(Widget.NumberTurn);
    return (
      <NumberTurn count={count} overflowCount={overflowCount} viewClass={viewClass} theme={theme} />
    );
  }

  render() {
    const { themeProps } = this.props;
    return (
      <Container themeProps={themeProps}>
        {this.props.children}
        {this.getDot()}
      </Container>
    );
  }
}

const Badge = ThemeHoc(KeyBoardEventAdaptor(BadgeBox), Widget.Badge);
export default Badge;
