import React from 'react';
import Card from '../card';
import styled from 'styled-components';
import Theme from '../theme';
import Input from '../themeinput';
import Steps from '../steps';
import Widget from '../consts';

const Wrapper = styled.div`
  margin-left: 50px;
  margin-top: 50px;
  display: inline-block;
`;

export default () => {
  const card = {
    [Widget.Card]: {
      width: 380,
      height: 180,
    },
    [Widget.Input]: { width: 280, margin: 10 },
  };
  return (
    <Wrapper>
      <Theme config={card}>
        <Wrapper>
          <Theme
            config={{
              viewClassCard: { width: 500, height: 200 },
              viewInput: {
                backgroundColor: 'red',
                children: { SecPart: { normal: { backgroundColor: 'red', width: 100 } } },
              },
            }}
          >
            <Card
              viewClass="viewClassCard"
              type={'simple'}
              title={'this is title'}
              description={
                <div>
                  <Input viewClass="viewInput" />
                </div>
              }
            />
          </Theme>
        </Wrapper>
        <p />
        hover input
        <br />
        <Wrapper>
          <Theme
            config={{
              viewClassCard: { width: 500, height: 200 },
              InnerInput: { state: ['hover'], backgroundColor: 'green' },
            }}
          >
            <Card
              viewClass="viewClassCard"
              type={'simple'}
              title={'this is title'}
              description={
                <div>
                  <Input />
                </div>
              }
            />
          </Theme>
        </Wrapper>
        <p />
        改子组件
        <br />
        <Wrapper>
          <Theme
            config={{
              viewClassCard: { width: 600, height: 200 },
              InnerInput: { backgroundColor: 'pink' },
              SecPart: { backgroundColor: 'gray' },
            }}
          >
            <Card
              viewClass="viewClassCard"
              type={'simple'}
              title={'this is title'}
              description={
                <div>
                  <Input />
                </div>
              }
            />
          </Theme>
        </Wrapper>
        <p />
        改组件状态
        <br />
        <Wrapper>
          <Theme
            config={{
              viewClassCard: { width: 500, height: 200 },
              InnerInput: { state: ['hover'], backgroundColor: '#ff0000' },
              SecPart: { state: ['hover'], backgroundColor: '#0000ff' },
            }}
          >
            <Card
              viewClass="viewClassCard"
              type={'simple'}
              title={'this is title'}
              description={
                <div>
                  <Input />
                </div>
              }
            />
          </Theme>
        </Wrapper>
      </Theme>
    </Wrapper>
  );
};
