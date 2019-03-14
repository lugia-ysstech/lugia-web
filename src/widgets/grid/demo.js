/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import Grid from './';
const { Row, Col } = Grid;
const Wrapper = styled.div`
  & > div > div {
    text-align: center;
  }
  & > div > div:nth-child(odd) {
    background: rgba(0, 160, 233, 0.7);
  }

  & > div > div:nth-child(even) {
    background: #00a0e9;
  }
`;
export const ColDemo = () => {
  return (
    <div>
      <Col span={6}>col-6</Col>
      <br />
      <Col span={6} offset={6}>
        col-6 col-offset-6
      </Col>
      <br />
      <Col span={6} push={6}>
        col-6 col-push-6
      </Col>
      <br />
      <Col span={6} pull={6}>
        col-6 col-pull-6
      </Col>
      <br />
      <Col span={6} order={1}>
        col-6 col-order-1
      </Col>
      <br />
    </div>
  );
};
export const RowDemo = () => {
  const data = [
    { span: 5, children: 'col-6' },
    { span: 5, children: 'col-6' },
    { span: 5, children: 'col-6' },
    { span: 5, children: 'col-6' },
  ];
  return (
    <div>
      <Wrapper>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </Wrapper>
      <br />
      <Wrapper>
        <Row>
          <Col span={6}>col-6</Col>
          {123}
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </Wrapper>
      <br />
      <Wrapper>
        <Row>
          <Col span={6} offset={6}>
            col-6 col-offset-6
          </Col>
          <Col span={6} offset={6}>
            col-6 col-offset-6
          </Col>
        </Row>
      </Wrapper>
      <br />
      <Wrapper>
        <Row>
          <Col span={18} push={6}>
            col-18 col-push-6
          </Col>
          <Col span={6} pull={18}>
            col-6 col-pull-18
          </Col>
        </Row>
      </Wrapper>
      <br />
      <p>type: flex, justify</p>
      <Wrapper>
        <Row type="flex" justify="start">
          <Col span={4}>col-4 justify-start</Col>
          <Col span={4}>col-4 justify-start</Col>
          <Col span={4}>col-4 justify-start</Col>
          <Col span={4}>col-4 justify-start</Col>
        </Row>
      </Wrapper>
      <br />
      <Wrapper>
        <Row type="flex" justify="center">
          <Col span={4}>col-4 justify-center</Col>
          <Col span={4}>col-4 justify-center</Col>
          <Col span={4}>col-4 justify-center</Col>
          <Col span={4}>col-4 justify-center</Col>
        </Row>
      </Wrapper>
      <br />
      <Wrapper>
        <Row type="flex" justify="end">
          <Col span={4}>col-4 justify-end</Col>
          <Col span={4}>col-4 justify-end</Col>
          <Col span={4}>col-4 justify-end</Col>
          <Col span={4}>col-4 justify-end</Col>
        </Row>
      </Wrapper>
      <br />
      <Wrapper>
        <Row type="flex" justify="spaceBetween">
          <Col span={4}>col-4 justify-spaceBetween</Col>
          <Col span={4}>col-4 justify-spaceBetween</Col>
          <Col span={4}>col-4 justify-spaceBetween</Col>
          <Col span={4}>col-4 justify-spaceBetween</Col>
        </Row>
      </Wrapper>
      <br />
      <Wrapper>
        <Row type="flex" justify="spaceAround">
          <Col span={4}>col-4 justify-spacAround</Col>
          <Col span={4}>col-4 justify-spacAround</Col>
          <Col span={4}>col-4 justify-spacAround</Col>
          <Col span={4}>col-4 justify-spacAround</Col>
        </Row>
      </Wrapper>
      <br />
      <p>type: flex, align</p>
      <Wrapper>
        <Row type="flex" justify="start" align="top">
          <Col span={4}>
            <div style={{ height: 80 }}>col-4 align-top</div>
          </Col>
          <Col span={4}>
            <div style={{ height: 60 }}>col-4 align-top</div>
          </Col>
          <Col span={4}>
            <div style={{ height: 100 }}>col-4 align-top</div>
          </Col>
          <Col span={4}>
            <div style={{ height: 120 }}>col-4 align-top</div>
          </Col>
        </Row>
      </Wrapper>
      <br />
      <Wrapper>
        <Row type="flex" justify="center" align="middle">
          <Col span={4}>
            <div style={{ height: 80 }}>col-4 align-middle</div>
          </Col>
          <Col span={4}>
            <div style={{ height: 60 }}>col-4 align-middle</div>
          </Col>
          <Col span={4}>
            <div style={{ height: 100 }}>col-4 align-middle</div>
          </Col>
          <Col span={4}>
            <div style={{ height: 120 }}>col-4 align-middle</div>
          </Col>
        </Row>
      </Wrapper>
      <Wrapper>
        <Row gutter={{ xs: 8, sm: 16, md: 24, xl: 24, lg: 24 }} data={data} />
      </Wrapper>
    </div>
  );
};
