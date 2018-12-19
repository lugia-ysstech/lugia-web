/**
 *
 * create by liangguodong on 2018/8/27
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';
import { px2emcss } from '../css/units';
import { BaseRedPoint, dotRight, dotTop, getDotSize } from '../css/badge';
import NumberTurn from './numberturn/index';

import ThemeProvider from '../theme-provider';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import Theme from '../theme';

const em = px2emcss(1.2);

const Dot = BaseRedPoint.extend`
  ${dotRight};
  ${dotTop};
  ${getDotSize};
  border-radius: 100%;
  z-index: 10;
  box-shadow: 0 0 0 ${em(1)} #fff;
`;
const Container = styled.span`
  background: transparent;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
`;

type BadgeProps = {
  viewClass?: string,
  getTheme: Function,
  count?: number,
  showZero?: boolean,
  children: React$Element<any>,
  overflowCount: number,
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
    const { showZero, count, getTheme } = this.props;

    const theme = getTheme();
    const hasCount = 'count' in this.props;
    const hasShowZero = 'showZero' in this.props;
    const isZero = count === 0 || !count;
    if (hasShowZero && isZero) {
      return showZero ? this.getNumberTurn(0) : null;
    }

    if (hasCount) {
      return showZero || !isZero ? this.getNumberTurn(count) : null;
    }

    return <Dot theme={theme} />;
  }

  getNumberTurn(count: ?number) {
    const { getTheme, overflowCount } = this.props;
    const numberView = { [Widget.NumberTurn]: getTheme() };
    return (
      <Theme config={numberView}>
        <NumberTurn count={count} overflowCount={overflowCount} />
      </Theme>
    );
  }

  render() {
    return (
      <Container>
        {this.props.children}
        {this.getDot()}
      </Container>
    );
  }
}

const Badge = ThemeProvider(KeyBoardEventAdaptor(BadgeBox), Widget.Badge);
export default Badge;
