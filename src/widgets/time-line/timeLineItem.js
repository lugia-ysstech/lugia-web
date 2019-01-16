/**
 *
 * create by liangguodong on 2018/11/19
 *
 * @flow
 */
import type { TimeLineStatus, TimeLineType } from '../css/time-line';
import '../common/shirm';
import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import Widget from '../consts/index';
import { getString } from '../common/StringUtils';
import { ObjectUtils } from '@lugia/type-utils';

import {
  getLineDisplay,
  getDirection,
  getItemContainerHeight,
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
const Time = BaseText.extend`
  ${getTimeColor};
`;
const Description = BaseText.extend`
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
  type: TimeLineType,
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
    if (pending === true && isLast && pendingDot) {
      if (ObjectUtils.isString(pendingDot)) {
        return <TimeLineIcon pending={pending} iconClass={pendingDot} />;
      }
      return pendingDot;
    } else if (type === 'icon' && getString(icon)) {
      return <TimeLineIcon iconClass={icon} />;
    }

    if (type === 'explain') {
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
    return this.getInnerDot();
  }

  getInnerDot() {
    const { type, getTheme, status } = this.props;
    return <Dot type={type} theme={getTheme()} status={status} />;
  }

  getDescription() {
    const { type, description } = this.props;
    if (type !== 'explain' && getString(description)) {
      return <Description>{description} </Description>;
    }
    return null;
  }
}

const TargetTimeLineItem = ThemeProvider(TimeLineItem, Widget.TimeLineItem);
export default TargetTimeLineItem;
