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
import type { TimeLineType, TimeLineStatus } from '../css/time-line';
import {
  getLineDisplay,
  getDirection,
  getContainerHeight,
  getDotBackground,
  getDotSize,
  getDotLeft,
  getHoverBackground,
  getIconBackground,
  getIconIndex,
  getLineHeight,
  getKeyframes,
  getTimeColor,
  getDescriptionColor,
  getBorderColor,
} from '../css/time-line';

import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import Icon from '../icon';
import Explain from '../tooltip';
import Theme from '../theme';

const em = px2emcss(1.2);

const ItemContainer = styled.div`
  position: relative;
  ${getContainerHeight};
  width: 100%;
`;
const Time = styled.div`
  text-align: inherit;
  font-size: 1.4rem;
  ${getTimeColor};
  width: ${em(100)};
`;
const Description = styled.div`
  text-align: inherit;
  line-height: 1.5;
  font-size: 1.4rem;
  ${getDescriptionColor};
  width: ${em(100)};
  white-space: nowrap;
`;
const Content = styled.div`
  position: absolute;
  top: 0;
  ${getDirection};
`;
const DotContainer = styled.div`
  position: relative;
  width: ${em(20)};
`;

const Line = styled.div`
  position: relative;
  left: ${em(10)};
  ${getLineHeight};
  border-left: ${em(1)} solid ${getBorderColor};
  ${getLineDisplay};
  z-index: 2;
`;

const Dot = styled.div`
  position: absolute;
  ${getDotBackground};
  ${getDotSize};
  ${getDotLeft};
  z-index: 3;
  border-radius: 50%;
  transition: all 0.3s linear 0.1s;
  &:hover {
    ${getHoverBackground};
  }
`;
const TimeLineIcon: Object = styled(Icon)`
  position: absolute;
  user-select: none;
  text-align: center;
  font-size: 1.4rem;
  ${getIconBackground};
  ${getIconIndex};
  left: ${em(3.5)};
  ${getKeyframes};
`;

type TimeLineState = {};

type TimeLineProps = {
  time: string,
  icon: string,
  description: string,
  direction: string,
  getTheme: Function,
  isLast: boolean,
  status: TimeLineStatus,
  type: TimeLineType,
  pendingDot: string | React$Element<any>,
  pending: boolean | string | React$Element<any>,
};

class TimeLineItem extends Component<TimeLineProps, TimeLineState> {
  static defaultProps = {
    status: 'normal',
  };

  constructor(props: TimeLineProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: TimeLineProps, state: TimeLineState) {}

  render() {
    const { getTheme, description, time, isLast, direction, type } = this.props;
    const config = {
      [Widget.Tooltip]: {
        color: 'white',
        fontColor: '#000',
      },
    };
    const theTime = type !== 'explain' ? time : '';
    return (
      <Theme config={config}>
        <ItemContainer theme={getTheme()} description={description} type={type}>
          <DotContainer>{this.getDot()}</DotContainer>
          <Line theme={getTheme()} isLast={isLast} description={description} type={type} />
          <Content direction={direction}>
            <Time>{theTime} </Time>
            {this.getDescription()}
          </Content>
        </ItemContainer>
      </Theme>
    );
  }

  getDot() {
    const { icon, type, pending, pendingDot, isLast, time, description } = this.props;
    const hasIcon = icon !== null && icon !== undefined;
    if (pending === true) {
      if (isLast) {
        return <TimeLineIcon pending={pending} iconClass={pendingDot} />;
      }
    } else if (type === 'icon' && hasIcon) {
      return <TimeLineIcon iconClass={icon} />;
    }

    if (type === 'explain') {
      const theDescription = description !== null && description !== undefined ? description : '';
      const theTime = time !== null && time !== undefined ? time : '';
      return (
        <Explain placement="right" title={theTime + ' ' + theDescription} action={'hover'}>
          {this.getInnerDot()}
        </Explain>
      );
    }
    return this.getInnerDot();
  }

  getInnerDot() {
    const { type, getTheme, status } = this.props;
    return <Dot type={type} theme={getTheme()} status={status} />;
  }

  getDescription() {
    const { type, description } = this.props;
    if (type !== 'explain' && description !== null && description !== undefined) {
      return <Description>{description} </Description>;
    }
    return null;
  }
}

const TargetTimeLineItem = ThemeProvider(TimeLineItem, Widget.TimeLineItem);
export default TargetTimeLineItem;
