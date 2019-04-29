/**
 *
 * create by liangguodong on 2018/11/19
 *
 * @flow
 */
import type { TimeLineStatus, TimeLineType } from '../css/time-line';
import {
  getBorderColor,
  getDescriptionColor,
  getDirection,
  getDotBackground,
  getDotLeft,
  getDotSize,
  getHoverBackground,
  getIconBackground,
  getIconIndex,
  getItemContainerHeight,
  getKeyframes,
  getLineDisplay,
  getLineHeight,
  getTimeColor,
} from '../css/time-line';
import '../common/shirm';
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';
import { getString } from '../common/StringUtils';
import { ObjectUtils } from '@lugia/type-utils';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import Icon from '../icon';
import Explain from '../tooltip';
import Theme from '../theme';

const em = px2emcss(1.2);

const ItemContainer = styled.div`
  position: relative;
  ${getItemContainerHeight};
  width: 100%;
`;
const BaseText = styled.div`
  text-align: inherit;
  font-size: 1.4rem;
  max-width: ${em(150)};
  overflow: hidden;
  white-space: nowrap;
`;
const Time = styled(BaseText)`
  ${getTimeColor};
`;
const Description = styled(BaseText)`
  line-height: 1.5;
  ${getDescriptionColor};
`;
const Content = styled.div`
  position: absolute;
  top: 0;
  ${getDirection};
`;
const DotContainer = styled.div`
  position: relative;
  width: ${em(20)};
  text-align: center;
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
  timeLineType: TimeLineType,
  pendingDot: React.Node,
  pending: boolean,
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
    const { getTheme, description, time, isLast, direction, timeLineType } = this.props;
    const config = {
      [Widget.Tooltip]: {
        color: 'white',
        fontColor: '#000',
      },
    };
    const theTime = timeLineType !== 'explain' ? time : '';
    return (
      <Theme config={config}>
        <ItemContainer theme={getTheme()} description={description} timeLineType={timeLineType}>
          <DotContainer>{this.getDot()}</DotContainer>
          <Line
            theme={getTheme()}
            isLast={isLast}
            description={description}
            timeLineType={timeLineType}
          />
          <Content direction={direction}>
            <Time>{theTime} </Time>
            {this.getDescription()}
          </Content>
        </ItemContainer>
      </Theme>
    );
  }

  getDot() {
    const { icon, timeLineType, pending, pendingDot, isLast, time, description } = this.props;
    if (timeLineType === 'explain') {
      return (
        <Explain
          placement="right"
          title={getString(time) + ' ' + getString(description)}
          action={'hover'}
        >
          {this.getInnerDot()}
        </Explain>
      );
    }

    if (pending === true && isLast && pendingDot) {
      if (ObjectUtils.isString(pendingDot)) {
        return <TimeLineIcon pending={pending} iconClass={pendingDot} />;
      }
      return pendingDot;
    } else if (timeLineType === 'icon' && getString(icon)) {
      return <TimeLineIcon iconClass={icon} />;
    }

    return this.getInnerDot();
  }

  getInnerDot() {
    const { timeLineType, getTheme, status } = this.props;
    return <Dot timeLineType={timeLineType} theme={getTheme()} status={status} />;
  }

  getDescription() {
    const { timeLineType, description } = this.props;
    if (timeLineType !== 'explain' && getString(description)) {
      return <Description>{description} </Description>;
    }
    return null;
  }
}

const TargetTimeLineItem = ThemeProvider(TimeLineItem, Widget.TimeLineItem);
export default TargetTimeLineItem;
