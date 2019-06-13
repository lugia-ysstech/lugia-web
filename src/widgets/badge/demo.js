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
      [Widget.Badge]: {
        children: {
          [Widget.NumberTurn]: {
            normal: { position: { top: -5, right: -5 } },
          },
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

export default () => {
  const view = {
    [Widget.Badge]: {
      normal: {
        position: { top: -5, right: 0 },
        background: { backgroundColor: 'orange' },
        color: 'black',
      },
    },
  };
  return (
    <div>
      <Theme
        config={{
          [Widget.Badge]: {
            children: {
              [Widget.NumberTurn]: {
                normal: { position: { top: -5, right: -5 } },
              },
            },
          },
        }}
      >
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
          <Theme config={view}>
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
                  <Badge>
                    <Box />
                  </Badge>
                </a>
              </Col>
            </Row>
          </Theme>
        </Wrapper>
        <Wrapper>
          <Row>
            <Col span={4}>
              <Theme
                config={{
                  green: {
                    normal: {
                      position: { top: -5, right: 2 },
                      background: { backgroundColor: 'green' },
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
                    normal: {
                      position: { top: -5, right: 2 },
                      background: { backgroundColor: 'purple' },
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
                    normal: {
                      position: { top: -5, right: 2 },
                      background: { backgroundColor: 'yellow' },
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
                    normal: {
                      position: { top: -5, right: 2 },
                      background: { backgroundColor: 'blue' },
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
      </Theme>
    </div>
  );
};
