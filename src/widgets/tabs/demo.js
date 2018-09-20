/**
 *
 * create by liangguodong
 *
 * @flow
 */
import * as React from 'react';
import Tabs from './index';
import Tabpane from './tabpane';
import Widget from '../consts/index';
import Theme from '../theme/';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: left;
  margin: 50px;
`;
const RightWrapper = styled.div`
  margin: 50px;
  text-align: right;
`;
export default () => {
  const data = [
    {
      icon: 'lugia-icon-financial_archive',
      tab: 11111,
      content: 1111,
      activityKey: 0,
    },
    {
      icon: 'lugia-icon-financial_archive',
      tab: 222222,
      content: 22222,
      activityKey: 1,
    },
    {
      icon: 'lugia-icon-financial_archive',
      tab: 333,
      content: 333,
      activityKey: 2,
    },
    {
      icon: 'lugia-icon-financial_archive',
      tab: 44444,
      content: 4444444,
      activityKey: 3,
    },
    {
      icon: 'lugia-icon-financial_archive',
      tab: 55555,
      content: 555555,
      activityKey: 4,
    },
    {
      icon: 'lugia-icon-financial_archive',
      tab: 666666,
      content: 66666,
      activityKey: 5,
    },
    {
      icon: 'lugia-icon-financial_archive',
      tab: 7777777,
      content: 777777,
      activityKey: 6,
    },
    {
      icon: 'lugia-icon-financial_archive',
      tab: 88888,
      content: 888888,
      activityKey: 7,
    },
  ];
  const data1 = [
    {
      activityKey: 0,
      tab: 111,
      content: <div>1111111</div>,
    },
    {
      activityKey: 1,
      tab: 222222,
      content: (
        <div>
          <div>222222</div>
        </div>
      ),
    },
    {
      activityKey: 2,
      tab: 333,
      content: 333,
    },
    {
      activityKey: 3,
      tab: 222222,
      content: 22222,
    },
    {
      activityKey: 4,
      tab: 333,
      content: 333,
    },
    {
      activityKey: 5,
      tab: 4444,
      content: 44444,
    },
  ];
  const view = {
    [Widget.Tabs]: {
      width: 500,
    },
  };
  const onPrevClick = e => {
    console.log(1111111, e);
  };
  const onNextClick = e => {
    console.log(22222, e);
  };
  return (
    <div>
      <Theme config={view}>
        <Wrapper>
          <Tabs
            tabType={'line'}
            tabPosition={'top'}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          >
            <Tabpane
              tab={'1111'}
              content={'11111111111111111111111111'}
              activityKey={0}
              icon={'lugia-icon-financial_archive'}
            />
            <Tabpane tab={'2222'} content={<div>22222222222222</div>} activityKey={1} />
            <Tabpane
              tab={'3333'}
              content={
                <div>
                  <div>
                    <div>33333333</div>
                  </div>
                </div>
              }
              activityKey={2}
            />
            <Tabpane
              tab={'4444'}
              content={
                <div>
                  <div>
                    <div>44444</div>
                  </div>
                </div>
              }
              activityKey={3}
            />
            <Tabpane
              tab={'555555'}
              content={
                <div>
                  <div>
                    <div>55555</div>
                  </div>
                </div>
              }
              activityKey={4}
            />
          </Tabs>
        </Wrapper>
        <Wrapper>
          <Tabs
            tabType={'line'}
            tabPosition={'left'}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          >
            <Tabpane
              tab={'11111'}
              content={'11111111111111111111111111'}
              activityKey={0}
              icon={'lugia-icon-financial_archive'}
            />
            <Tabpane tab={'2222'} content={<div>22222222222222</div>} activityKey={1} />
            <Tabpane
              tab={'3333'}
              content={
                <div>
                  <div>
                    <div>33333333</div>
                  </div>
                </div>
              }
              activityKey={2}
            />
          </Tabs>
        </Wrapper>
        <RightWrapper>
          <Tabs
            tabType={'line'}
            tabPosition={'right'}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          >
            <Tabpane
              tab={'11111'}
              content={'11111111111111111111111111'}
              activityKey={0}
              icon={'lugia-icon-financial_archive'}
            />
            <Tabpane tab={'2222'} content={<div>22222222222222</div>} activityKey={1} />
            <Tabpane
              tab={'3333'}
              content={
                <div>
                  <div>
                    <div>33333333</div>
                  </div>
                </div>
              }
              activityKey={2}
            />
          </Tabs>
        </RightWrapper>
        <Wrapper>
          <Tabs
            tabType={'line'}
            tabPosition={'bottom'}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          >
            <Tabpane
              tab={'11111'}
              content={'11111111111111111111111111'}
              activityKey={0}
              icon={'lugia-icon-financial_archive'}
            />
            <Tabpane tab={'2222'} content={<div>22222222222222</div>} activityKey={1} />
            <Tabpane
              tab={'3333'}
              content={
                <div>
                  <div>
                    <div>33333333</div>
                  </div>
                </div>
              }
              activityKey={2}
            />
            <Tabpane
              tab={'4444'}
              content={
                <div>
                  <div>
                    <div>44444</div>
                  </div>
                </div>
              }
              activityKey={3}
            />
            <Tabpane
              tab={'555555'}
              content={
                <div>
                  <div>
                    <div>55555</div>
                  </div>
                </div>
              }
              activityKey={4}
            />
          </Tabs>
        </Wrapper>
        <Wrapper>
          <Tabs tabType={'line'} data={data} onPrevClick={onPrevClick} onNextClick={onNextClick} />
        </Wrapper>
        <br />
        <Wrapper>
          <Tabs
            tabType={'line'}
            tabPosition={'left'}
            data={data1}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        </Wrapper>
        <br />
        <RightWrapper>
          <Tabs
            tabType={'line'}
            tabPosition={'right'}
            data={data1}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        </RightWrapper>
        <br />
        <Wrapper>
          <Tabs
            tabType={'line'}
            data={data}
            tabPosition={'bottom'}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        </Wrapper>
        <br />
        <Wrapper>
          <Tabs tabType={'card'} data={data1} onPrevClick={onPrevClick} onNextClick={onNextClick} />
        </Wrapper>
        <br />
      </Theme>
    </div>
  );
};
