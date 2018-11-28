/**
 *
 * create by liangguodong on 2018/11/19
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';

import ThemeProvider from '../theme-provider';
import type { TimeLineMode } from '../css/time-line';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);

const OutContainer = styled.div`
  width: ${em(20)};
`;
type TimeLineState = {};

type TimeLineProps = {
  mode: TimeLineMode,
  getTheme: Function,
  children: React$Element<any>,
  reverse: boolean,
  pendingDot: string | React$Element<any>,
  pending: boolean,
};

class TimeLine extends Component<TimeLineProps, TimeLineState> {
  static defaultProps = {
    pending: false,
    pendingDot: 'lugia-icon-financial_loading_o',
    mode: 'simple',
  };
  static displayName = Widget.TimeLine;

  constructor(props: TimeLineProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: TimeLineProps, state: TimeLineState) {}

  render() {
    const { getTheme } = this.props;
    return <OutContainer theme={getTheme()}>{this.getChildren()}</OutContainer>;
  }

  getChildren() {
    const { children, reverse } = this.props;
    if (Array.isArray(children) && children.length > 0) {
      if (reverse === true) {
        return this.getMapChildren(children).reverse();
      }
      return this.getMapChildren(children);
    }
  }

  getMapChildren(children) {
    const { reverse, mode, pendingDot, pending } = this.props;
    return React.Children.map(children, (child, i) => {
      const isLast = reverse ? i === 0 : children.length - 1 === i;
      const direction = mode === 'alternate' && i % 2 === 0 ? 'left' : 'right';
      return [
        React.cloneElement(child, {
          isLast,
          direction,
          pending,
          pendingDot,
        }),
      ];
    });
  }
}

const TargetTimeLine = ThemeProvider(TimeLine, Widget.TimeLine);
export default TargetTimeLine;
