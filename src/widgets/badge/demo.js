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
import { getBorder } from '@lugia/theme-utils';

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
    const newCount = type === 'plus' ? this.state.count + 1 : this.state.count - 1;
    const count = newCount <= 0 ? 0 : newCount > 100 ? 100 : newCount;
    this.setState({ count });
  };

  render() {
    const config = {
      [Widget.Badge]: {
        BadgeNumber: {
          normal: { position: { top: -5, right: -5 } },
        },
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

class ZeroBadge extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
    };
  }

  click = () => {
    this.setState({ count: 0 });
  };

  render() {
    const config = {
      [Widget.Badge]: {
        BadgeNumber: {
          normal: { position: { top: -5, right: -5 } },
        },
      },
    };
    return (
      <Wrapper>
        <div>清空count为0 时不显示提醒</div>
        <br />
        <Theme config={config}>
          <Badge count={this.state.count}>
            <Box />
          </Badge>

          <div onClick={this.click}>清空</div>
        </Theme>
        <div>无Count 时显示原点</div>
        <br />
        <Theme config={config}>
          <Badge>
            <Box />
          </Badge>

          <div onClick={this.click}>清空</div>
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
          position: { top: -10, right: -10 },
          background: { color: 'orange' },
          width: 20,
          height: 20,
          border: getBorder({ color: 'white', width: 1, style: 'solid' }),
        },
      },
      BadgeNumber: {
        normal: {
          height: 15,
          position: { top: -5, right: -5 },
        },
      },
    },
  };
  return (
    <div>
      <div>无配置主题样式时徽标显示状态</div>
      <Wrapper>
        <Row>
          <Col span={4}>
            <Badge count={4}>
              <Box />
            </Badge>
          </Col>
          <Col span={4}>
            <Badge count={98}>
              <Box />
            </Badge>
          </Col>
          <Col span={4}>
            <Badge count={99}>
              <Box />
            </Badge>
          </Col>
          <Col span={4}>
            <Badge count={100}>
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
      <div>配置主题时徽标显示状态</div>
      <Theme config={dot}>
        <Wrapper>
          <Row>
            <Col span={4}>
              <Badge count={4}>
                <Box />
              </Badge>
            </Col>
            <Col span={4}>
              <Badge count={98}>
                <Box />
              </Badge>
            </Col>
            <Col span={4}>
              <Badge count={99}>
                <Box />
              </Badge>
            </Col>
            <Col span={4}>
              <Badge count={100}>
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
                      position: { top: -5, right: -5 },
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
                      position: { top: -5, right: -5 },
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
                      position: { top: -5, right: -5 },
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
                      position: { top: -5, right: -5 },
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
      <Wrapper>
        <Row>
          <Col span={4}>
            <Theme
              config={{
                green: {
                  Badge: {
                    normal: {
                      position: { top: -5, right: -5 },
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
                  Badge: {
                    normal: {
                      position: { top: -5, right: -5 },
                      background: { color: 'purple' },
                    },
                  },
                },
              }}
            >
              <Badge viewClass="purple" count={4}>
                <Box />
              </Badge>
            </Theme>
          </Col>
          <Col span={4}>
            <Theme
              config={{
                yellow: {
                  Badge: {
                    normal: {
                      position: { top: -5, right: -5 },
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
                  Badge: {
                    normal: {
                      position: { top: -5, right: -5 },
                      background: { color: 'blue' },
                    },
                  },
                },
              }}
            >
              <Badge viewClass="blue" count={98}>
                <Box />
              </Badge>
            </Theme>
          </Col>
        </Row>
      </Wrapper>
      <Turn />
      <ZeroBadge />
    </div>
  );
};
