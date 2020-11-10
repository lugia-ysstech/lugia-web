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
const TabsWrapper = styled.div`
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
  height: 45px;
  padding-top: 34px;
  padding-bottom: 26px;
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
          <PriceNum style={{ fontSize: 60, marginTop: 16 }}>{int}</PriceNum>
          <PriceNum style={{ fontSize: 18 }}>{decimals}</PriceNum>
        </PriceNum>
        <Buy>{'购买'}</Buy>
      </CardContainer>
    );
  }
}
export const CardDemo = () => {
  const avatarHCard = {
    [Widget.Card]: {
      Container: { normal: { width: 240 } },
      CardTitle: { normal: { padding: { top: 30 } } },
    },
  };
  return (
    <Wrapper>
      <p>基本样式</p>
      <Card />
      <p>内容撑开卡片样式</p>
      <Wrapper>
        <Card
          title={'this is title'}
          description={[
            <div>{'this is description'}</div>,
            <div>{'this is description'}</div>,
            <div>{'this is description'}</div>,
            <div>{'this is description'}</div>,
            <div>{'this is description'}</div>,
            <div>{'this is description'}</div>,
          ]}
        />
      </Wrapper>
      <p>tip样式</p>
      <Wrapper>
        <Card
          type={'tip'}
          title={'this is title'}
          description={[<div>{'this is description'}</div>, <div>{'this is description'}</div>]}
        />
      </Wrapper>

      <Wrapper>
        <Card
          showTipBottomLine
          type={'tip'}
          title={'this is title'}
          description={[<div>{'this is description'}</div>, <div>{'this is description'}</div>]}
        />
      </Wrapper>

      <p>头像样式</p>
      <Wrapper>
        <Card
          type={'avatar'}
          title={'this is title'}
          description={'this is description'}
          imageOrientation={'vertical'}
          avatar={
            'http://192.168.102.73:8081/BigFrontend/Work/ued/lugia/raw/4d4bd6db04b1c6015acf4c933607956a9f2d62a1/lugiaweb%E7%BB%84%E4%BB%B6/%E5%8D%A1%E7%89%87/Bitmap2.png'
          }
        />
      </Wrapper>

      <p>头像样式</p>
      <Theme config={avatarHCard}>
        <Wrapper>
          <Card
            type={'avatar'}
            title={'this is title'}
            description={
              <div>
                <div>{'this is description'}</div>
              </div>
            }
            avatar={
              'http://192.168.102.73:8081/BigFrontend/Work/ued/lugia/raw/4d4bd6db04b1c6015acf4c933607956a9f2d62a1/lugiaweb%E7%BB%84%E4%BB%B6/%E5%8D%A1%E7%89%87/Bitmap2.png'
            }
          />
        </Wrapper>
      </Theme>

      <p>图片样式</p>
      <Wrapper>
        <Card
          viewClass={'cardImage'}
          type={'image'}
          imageOrientation={'vertical'}
          title={'this is title'}
          description={'this is description'}
          image={
            'http://192.168.102.73:8081/BigFrontend/Work/ued/lugia/raw/2eac1a340185301d24d6fac426aebd9abe6dea0e/lugiaweb%E7%BB%84%E4%BB%B6/%E5%8D%A1%E7%89%87/18081548404150_.pic_hd.jpg'
          }
        />
      </Wrapper>
      <p>图片样式</p>
      <Wrapper>
        <Card
          type={'image'}
          title={'this is title'}
          imageOrientation={'horizontal'}
          description={'this is description'}
          image={
            'http://192.168.102.73:8081/BigFrontend/Work/ued/lugia/raw/2eac1a340185301d24d6fac426aebd9abe6dea0e/lugiaweb%E7%BB%84%E4%BB%B6/%E5%8D%A1%E7%89%87/18081548404150_.pic_hd.jpg'
          }
        />
      </Wrapper>
    </Wrapper>
  );
};
export const ComboDemo = () => {
  const price = {
    [Widget.Card]: {
      Container: {
        normal: { width: 200, height: 220 },
      },
    },
  };
  const tabsCard = {
    [Widget.Card]: {
      Container: {
        normal: { width: '100%', height: 240 },
      },
    },
  };
  const defaultData = [
    {
      title: 'Tab1',
      content: 'content of Tab1',
    },
    {
      title: 'Tab2',
      content: 'content of Tab2',
    },
    {
      title: 'Tab3',
      content: 'content of Tab3',
    },
  ];
  return (
    <div>
      <p>组合样式</p>
      <Theme config={tabsCard}>
        <Wrapper>
          <Card
            operation={'操作'}
            type={'combo'}
            content={
              <TabsWrapper>
                <Tabs data={defaultData} />
              </TabsWrapper>
            }
          />
        </Wrapper>
      </Theme>
      <p>组合样式</p>
      <Theme config={price}>
        <Wrapper>
          <Card viewClass={'price'} type={'combo'} content={<AmountCard />} />
        </Wrapper>
      </Theme>
      <p>响应式盒子</p>
      <Wrapper>
        <Card type={'responsive'}>sdfdsfsdfsd</Card>
      </Wrapper>
    </div>
  );
};

export default () => {
  return [<CardDemo />, <ComboDemo />];
};
