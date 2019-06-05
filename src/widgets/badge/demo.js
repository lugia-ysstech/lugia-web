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
    return (
      <Row>
        <Col span={4}>
          <Badge count={this.state.count} showZero overflowCount={9}>
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
    );
  }
}

export default () => {
  const view = {
    [Widget.Badge]: { normal: { background: { backgroundColor: 'orange' }, color: 'black' } },
  };
  return (
    <div>
      <Theme config={{ [Widget.Row]: { normal: { margin: 50 } } }}>
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
        <Row>
          <Col span={4}>
            <Theme config={{ green: { normal: { background: { backgroundColor: 'green' } } } }}>
              <Badge viewClass="green">
                <Box />
              </Badge>
            </Theme>{' '}
          </Col>
          <Col span={4}>
            <Theme config={{ purple: { normal: { background: { backgroundColor: 'purple' } } } }}>
              <Badge viewClass="purple">
                <Box />
              </Badge>
            </Theme>{' '}
          </Col>
          <Col span={4}>
            <Theme config={{ yellow: { normal: { background: { backgroundColor: 'yellow' } } } }}>
              <Badge viewClass="yellow">
                <Box />
              </Badge>
            </Theme>
          </Col>
          <Col span={4}>
            <Theme config={{ blue: { normal: { background: { backgroundColor: 'blue' } } } }}>
              <Badge viewClass="blue">
                <Box />
              </Badge>
            </Theme>
          </Col>
        </Row>
        <Turn />
      </Theme>
    </div>
  );
};
