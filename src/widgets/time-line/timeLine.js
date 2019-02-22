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
import TimeLineItem from './timeLineItem';
import { getAttributeFromObject } from '../common/ObjectUtils';
import moment from 'moment';
const em = px2emcss(1.2);

const OutContainer = styled.div`
  ${getContainerHeight};
  width: ${em(20)};
`;
type TimeLineState = {};

type TimeLineProps = {
  mode: TimeLineMode,
  getTheme: Function,
  children: Array<React.Node>,
  reverse: boolean,
  pendingDot: React.Node,
  pending: boolean,
  data: Array<Object>,
  defaultData: Array<Object>,
};

function getDay(i: string) {
  return moment()
    .add('day', i)
    .format('YYYY-MM-DD');
}
const today = getDay('0');
const tomorrow = getDay('1');
const thirdDay = getDay('2');
const fourthDay = getDay('3');
const fifthDay = getDay('4');
const defaultData = [
  { time: today },
  { time: tomorrow },
  { time: thirdDay },
  { time: fourthDay },
  { time: fifthDay },
];
class TimeLine extends Component<TimeLineProps, TimeLineState> {
  static defaultProps = {
    pending: false,
    pendingDot: 'lugia-icon-financial_loading_o',
    mode: 'right',
    defaultData,
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
    const { reverse } = this.props;
    if (reverse === true) {
      return this.getMapChildren().reverse();
    }
    return this.getMapChildren();
  }

  getMapChildren() {
    const { data, defaultData, children } = this.props;
    return data
      ? this.data2Item(data)
      : Array.isArray(children) && children.length > 0
      ? React.Children.map(children, (child, i) => {
          return React.cloneElement(child, this.getItemProps(child, i));
        })
      : this.data2Item(defaultData);
  }

  getItemProps(child: Object, i: number) {
    const { reverse, mode, pendingDot, pending, data, children, defaultData } = this.props;
    const size = data ? data.length : children ? children.length : defaultData.length;
    const getDirection = this.getDirection(mode);
    return {
      isLast: this.isLast(i, size, reverse),
      direction: getDirection(i),
      pending,
      pendingDot,
      time: getAttributeFromObject(child, 'time', getAttributeFromObject(child.props, 'time', '')),
      icon: getAttributeFromObject(child, 'icon', getAttributeFromObject(child.props, 'icon', '')),
      description: getAttributeFromObject(
        child,
        'description',
        getAttributeFromObject(child.props, 'description', '')
      ),
      status: getAttributeFromObject(
        child,
        'status',
        getAttributeFromObject(child.props, 'status', 'normal')
      ),
      type: getAttributeFromObject(
        child,
        'type',
        getAttributeFromObject(child.props, 'type', 'icon')
      ),
    };
  }

  data2Item(data: Array<Object>) {
    return data.map((child, i) => {
      return this.getItem(child, i);
    });
  }

  getItem(child: Object, i: number) {
    return <TimeLineItem {...this.getItemProps(child, i)} />;
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
