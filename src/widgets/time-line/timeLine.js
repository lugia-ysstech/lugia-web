/**
 *
 * create by liangguodong on 2018/11/19
 *
 * @flow
 */
import '../common/shirm';
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';

import ThemeProvider from '../theme-provider';
import type { TimeLineMode } from '../css/time-line';
import { getContainerHeight } from '../css/time-line';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);

const OutContainer = styled.div`
  ${getContainerHeight};
  width: ${em(20)};
`;
type TimeLineState = {};

type TimeLineProps = {
  mode: TimeLineMode,
  getTheme: Function,
  children: React.Node,
  reverse: boolean,
  pendingDot: React.Node,
  pending: boolean,
};

class TimeLine extends Component<TimeLineProps, TimeLineState> {
  static defaultProps = {
    pending: false,
    pendingDot: 'lugia-icon-financial_loading_o',
    mode: 'right',
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

  getMapChildren(children: Object[]) {
    const { reverse, mode, pendingDot, pending } = this.props;

    const getDirection = this.getDirection(mode);
    const size = children.length;
    return React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        isLast: this.isLast(i, size, reverse),
        direction: getDirection(i),
        pending,
        pendingDot,
      });
    });
  }

  getDirection(mode: TimeLineMode): (index: number) => 'left' | 'right' {
    return (index: number) => (mode === 'alternate' && index % 2 === 0 ? 'left' : 'right');
  }

  isLast(index: number, size: number, reverse: boolean): boolean {
    return reverse ? index === 0 : size - 1 === index;
  }
}

const TargetTimeLine = ThemeProvider(TimeLine, Widget.TimeLine);
export default TargetTimeLine;
