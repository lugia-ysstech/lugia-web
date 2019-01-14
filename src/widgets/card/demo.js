/**
 *
 * create by liangguodong on 2018/11/29
 *
 * @flow
 */
import React from 'react';
import Card from './index';
import styled from 'styled-components';
import Theme from '../theme';
import Tabs from '../tabs/tabs';
import Widget from '../consts';

const Wrapper = styled.div`
  margin-left: 50px;
  margin-top: 50px;
  display: inline-block;
`;
const CardContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
`;
const Price = styled.div`
  text-align: center;
  font-size: 16px;
  color: #666;
  margin-bottom: 26px;
  width: 100%;
`;
const PriceNum = styled.div`
  text-align: center;
  color: #4d63ff;
  display: inline-block;
`;
const Buy = styled.button`
  position: absolute;
  text-align: center;
  font-size: 14px;
  border-radius: 20px;
  margin-top: 32px;
  color: #fff;
  bottom: 10%;
  width: 80%;
  background-color: #4d63ff;
  height: 32px;
  border: 2px solid #4d63ff;
  left: 10%;
`;

class AmountCard extends React.Component<Object, Object> {
  render() {
    const price = '9.88';
    let int = 0;
    let decimals = 0;
    if (price.indexOf('.') > 0) {
      int = price.substring(0, price.indexOf('.'));
      decimals = price.substring(price.indexOf('.'));
    }
    return (
      <CardContainer>
        <Price>{'价格'}</Price>
        <PriceNum>
          <PriceNum style={{ fontSize: 32 }}>{int}</PriceNum>
          <PriceNum style={{ fontSize: 18 }}>{decimals}</PriceNum>
        </PriceNum>
        <Buy>{'购买'}</Buy>
      </CardContainer>
    );
  }
}

export default () => {
  const view = {
    [Widget.Card]: {
      width: 300,
      height: 200,
    },
  };
  const combo = {
    register: {
      width: 700,
      height: 300,
    },
    vertical: {
      width: 200,
      height: 220,
    },
  };
  const avatar = {
    [Widget.Avatar]: {
      width: 80,
      height: 80,
    },
  };
  const cardImage = {
    [Widget.CardImage]: {
      width: 200,
      height: 130,
    },
  };
  const defaultData = [
    {
      icon: 'lugia-icon-financial_archive',
      title: 1111111111,
      content: 1111,
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 22222222222,
      content: 22222,
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 3333333,
      content: 333,
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 44444444,
      content: 4444444,
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 55555555,
      content: 5555555,
    },
  ];
  return (
    <Wrapper>
      <p>基本样式</p>
      <Wrapper>
        <Card
          title={'this is title'}
          description={'this is description'}
          shadow={'always'}
          operation={'操作'}
        />
      </Wrapper>
      <p>基本样式</p>
      <Theme config={view}>
        <Wrapper>
          <Card
            title={<div>{'this is title'}</div>}
            description={[
              <div>{'this is description'}</div>,
              <div>{'this is description'}</div>,
              <div>{'this is description'}</div>,
              <div>{'this is description'}</div>,
            ]}
            shadow={'always'}
          />
        </Wrapper>
      </Theme>
      <p>children样式 </p>
      <Wrapper>
        <Card>
          <div>children 样式的卡片</div>
        </Card>
      </Wrapper>
      <p>头像样式</p>
      <Theme config={avatar}>
        <Wrapper>
          <Card
            type={'avatar'}
            title={'this is title'}
            description={'this is description'}
            avatar={
              'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=7878a9471d38534398c28f73f27adb1b/738b4710b912c8fc8e9cace6f1039245d68821a9.jpg'
            }
            shadow={'hover'}
          />
        </Wrapper>
      </Theme>
      <Theme config={avatar}>
        <p>头像样式</p>
        <Wrapper>
          <Card
            type={'avatar'}
            title={'this is title'}
            description={'this is description'}
            imageOrientation={'vertical'}
            avatar={
              'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=7878a9471d38534398c28f73f27adb1b/738b4710b912c8fc8e9cace6f1039245d68821a9.jpg'
            }
            shadow={'hover'}
          />
        </Wrapper>
      </Theme>
      <p>图片样式</p>
      <Wrapper>
        <Card
          type={'image'}
          title={'this is title'}
          imageOrientation={'horizontal'}
          description={'this is description'}
          image={
            'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=4f88e0c6b3de9c82b268f1dd0de8eb6f/f9198618367adab4973d1fbc8bd4b31c8601e464.jpg'
          }
          shadow={'hover'}
        />
      </Wrapper>
      <Theme config={cardImage}>
        <p>图片样式</p>
        <Wrapper>
          <Card
            viewClass={'cardImage'}
            type={'image'}
            imageOrientation={'vertical'}
            title={'this is title'}
            description={'this is description'}
            image={
              'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=4f88e0c6b3de9c82b268f1dd0de8eb6f/f9198618367adab4973d1fbc8bd4b31c8601e464.jpg'
            }
            shadow={'hover'}
          />
        </Wrapper>
      </Theme>
      <p>组合样式</p>
      <Theme config={combo}>
        <Wrapper>
          <Card
            operation={'操作'}
            viewClass={'register'}
            type={'combo'}
            content={<Tabs data={defaultData} />}
            shadow={'hover'}
          />
        </Wrapper>

        <p>组合样式</p>
        <Wrapper>
          <Card viewClass={'vertical'} type={'combo'} content={<AmountCard />} shadow={'hover'} />
        </Wrapper>
      </Theme>
    </Wrapper>
  );
};
