/**
 *
 * create by liangguodong on 2018/8/27
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Badge from './';
import { Col, Row } from '../grid';
import Widget from '../consts';
import Theme from '../theme';
import Icon from '../icon';

const Box = styled.div`
  width: 40px;
  height: 40px;
  background: #ccc;
  margin-left: 10px;
`;
const Wrapper = styled.div`
  margin-left: 10px;
  margin-top: 50px;
`;

class Turn extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  click = type => () => {
    const count = type === 'plus' ? this.state.count + 1 : this.state.count - 1;
    this.setState({ count });
  };

  render() {
    const config = {
      [Widget.NumberTurn]: {
        normal: { position: { top: -5, right: -5 } },
      },
    };
    return (
      <Wrapper>
        <Theme config={config}>
          <Row>
            <Col span={4}>
              <Badge count={this.state.count} showZero overflowCount={99}>
                <Box />
              </Badge>
              <Icon
                style={{ fontSize: '2em' }}
                iconClass="lugia-icon-reminder_plus_square_o"
                onClick={this.click('plus')}
              />
              <Icon
                style={{ fontSize: '2em' }}
                iconClass="lugia-icon-reminder_minus_square_o"
                onClick={this.click('minus')}
              />
            </Col>
          </Row>
        </Theme>
      </Wrapper>
    );
  }
}

export default () => {
  const dot = {
    [Widget.Badge]: {
      BadgeDot: {
        normal: {
          position: { top: -5, right: 6 },
          background: { color: 'orange' },
          width: 20,
          height: 20,
        },
      },
      BadgeNumber: {
        normal: { position: { top: -5, right: -5 } },
      },
    },
  };
  return (
    <div>
      <Theme config={dot}>
        <Wrapper>
          <Row>
            <Col span={4}>
              <Badge count={4}>
                <Box />
              </Badge>
            </Col>
            <Col span={4}>
              <Badge count={99}>
                <Box />
              </Badge>
            </Col>
            <Col span={4}>
              <Badge>
                <Box />
              </Badge>
            </Col>
          </Row>
        </Wrapper>
        <Wrapper>
          <Row>
            <Col span={4}>
              <Badge count={0}>
                <Box />
              </Badge>
            </Col>
            <Col span={4}>
              <Badge showZero>
                <Box />
              </Badge>
            </Col>
            <Col span={4}>
              <Badge showZero count={0}>
                <Box />
              </Badge>
            </Col>
            <Col span={4}>
              <a href="www.baidu.com">
                <Theme config={dot}>
                  <Badge viewClass="dot">
                    <Box />
                  </Badge>
                </Theme>
              </a>
            </Col>
          </Row>
        </Wrapper>
      </Theme>
      <Wrapper>
        <Row>
          <Col span={4}>
            <Theme
              config={{
                green: {
                  BadgeDot: {
                    normal: {
                      position: { top: -5, right: 2 },
                      background: { color: 'green' },
                    },
                  },
                },
              }}
            >
              <Badge viewClass="green">
                <Box />
              </Badge>
            </Theme>
          </Col>
          <Col span={4}>
            <Theme
              config={{
                purple: {
                  BadgeDot: {
                    normal: {
                      position: { top: -5, right: 2 },
                      background: { color: 'purple' },
                    },
                  },
                },
              }}
            >
              <Badge viewClass="purple">
                <Box />
              </Badge>
            </Theme>
          </Col>
          <Col span={4}>
            <Theme
              config={{
                yellow: {
                  BadgeDot: {
                    normal: {
                      position: { top: -5, right: 2 },
                      background: { color: 'yellow' },
                    },
                  },
                },
              }}
            >
              <Badge viewClass="yellow">
                <Box />
              </Badge>
            </Theme>
          </Col>
          <Col span={4}>
            <Theme
              config={{
                blue: {
                  BadgeDot: {
                    normal: {
                      position: { top: -5, right: 2 },
                      background: { color: 'blue' },
                    },
                  },
                },
              }}
            >
              <Badge viewClass="blue">
                <Box />
              </Badge>
            </Theme>
          </Col>
        </Row>
      </Wrapper>
      <Turn />
    </div>
  );
};
