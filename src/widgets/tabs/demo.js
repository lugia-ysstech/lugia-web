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
      title: 1111111111,
      content: 1111,
      activityKey: '0',
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 22222222222,
      content: 22222,
      activityKey: '1',
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 3333333,
      content: 333,
      activityKey: '2',
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 44444444,
      content: 4444444,
      activityKey: '3',
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 55555,
      content: 555555,
      activityKey: '4',
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 666666,
      content: 66666,
      activityKey: '5',
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 7777777,
      content: 777777,
      activityKey: '6',
    },
    {
      icon: 'lugia-icon-financial_archive',
      title: 88888,
      content: 888888,
      activityKey: '7',
    },
  ];
  const data1 = [
    {
      activityKey: '0',
      title: 111,
      content: <div>1111111</div>,
    },
    {
      activityKey: '1',
      title: 222222,
      content: (
        <div>
          <div>222222</div>
        </div>
      ),
    },
    {
      activityKey: '2',
      title: 333,
      content: 333,
    },
    {
      activityKey: '3',
      title: 44444,
      content: 44444,
    },
    {
      activityKey: '4',
      title: 55555,
      content: 55555,
    },
    {
      activityKey: '5',
      title: 66666,
      content: 66666,
    },
    {
      activityKey: '6',
      title: 777777,
      content: 77777,
    },
    {
      activityKey: '7',
      title: 888888,
      content: 888888,
    },
  ];
  const view = {
    [Widget.Tabs]: {
      width: 500,
      height: 200,
    },
  };
  const onPrevClick = e => {};
  const onNextClick = e => {};
  const onDelClick = e => {};
  return (
    <div>
      <Theme config={view}>
        <Wrapper>
          <p>children tabPosition=top</p>
          <Tabs
            titleType={'line'}
            tabPosition={'top'}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          >
            <Tabpane title={'1111'} content={'11111111111111111111111111'} activityKey={'0'} />
            <Tabpane title={'2222'} content={<div>22222222222222</div>} activityKey={'1'} />
            <Tabpane
              title={'3333'}
              content={
                <div>
                  <div>
                    <div>33333333</div>
                  </div>
                </div>
              }
              activityKey={'2'}
            />
            <Tabpane
              title={'4444'}
              content={
                <div>
                  <div>
                    <div>44444</div>
                  </div>
                </div>
              }
              activityKey={'3'}
            />
            <Tabpane
              title={'555555'}
              content={
                <div>
                  <div>
                    <div>55555</div>
                  </div>
                </div>
              }
              activityKey={'4'}
            />
          </Tabs>
        </Wrapper>

        <Wrapper>
          <p>children tabPosition=left</p>
          <Tabs
            tabType={'line'}
            tabPosition={'left'}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          >
            <Tabpane title={'11111'} content={'11111111111111111111111111'} activityKey={'0'} />
            <Tabpane title={'2222'} content={<div>22222222222222</div>} activityKey={'1'} />
            <Tabpane
              title={'3333'}
              content={
                <div>
                  <div>
                    <div>33333333</div>
                  </div>
                </div>
              }
              activityKey={'2'}
            />
            <Tabpane
              title={'44444'}
              content={
                <div>
                  <div>
                    <div>444444444</div>
                  </div>
                </div>
              }
              activityKey={'3'}
            />
            <Tabpane
              title={'555555'}
              content={
                <div>
                  <div>
                    <div>55555555555</div>
                  </div>
                </div>
              }
              activityKey={'4'}
            />
            <Tabpane
              title={'666666'}
              content={
                <div>
                  <div>
                    <div>66666666666</div>
                  </div>
                </div>
              }
              activityKey={'5'}
            />
            <Tabpane
              title={'7777777'}
              content={
                <div>
                  <div>
                    <div>77777777777</div>
                  </div>
                </div>
              }
              activityKey={'6'}
            />
            <Tabpane
              title={'8888888'}
              content={
                <div>
                  <div>
                    <div>88888888888</div>
                  </div>
                </div>
              }
              activityKey={'7'}
            />
            <Tabpane
              title={'999999'}
              content={
                <div>
                  <div>
                    <div>9999999999</div>
                  </div>
                </div>
              }
              activityKey={'8'}
            />
            <Tabpane
              title={'10101010'}
              content={
                <div>
                  <div>
                    <div>10101101010</div>
                  </div>
                </div>
              }
              activityKey={'9'}
            />
            <Tabpane
              title={'1111111'}
              content={
                <div>
                  <div>
                    <div>111111111111</div>
                  </div>
                </div>
              }
              activityKey={'10'}
            />
            <Tabpane
              title={'12121212'}
              content={
                <div>
                  <div>
                    <div>121212</div>
                  </div>
                </div>
              }
              activityKey={'11'}
            />
            <Tabpane
              title={'131313'}
              content={
                <div>
                  <div>
                    <div>131313131313</div>
                  </div>
                </div>
              }
              activityKey={'12'}
            />
          </Tabs>
        </Wrapper>
        <p>children tabPosition=right</p>
        <RightWrapper>
          <Tabs
            tabType={'line'}
            tabPosition={'right'}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          >
            <Tabpane
              title={'11111'}
              content={'11111111111111111111111111'}
              activityKey={'0'}
              icon={'lugia-icon-financial_archive'}
            />
            <Tabpane title={'2222'} content={<div>22222222222222</div>} activityKey={'1'} />
            <Tabpane
              title={'3333'}
              content={
                <div>
                  <div>
                    <div>33333333</div>
                  </div>
                </div>
              }
              activityKey={'2'}
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
            <Tabpane title={'11111'} content={'11111111111111111111111111'} activityKey={'0'} />
            <Tabpane title={'2222'} content={<div>22222222222222</div>} activityKey={'1'} />
            <Tabpane
              title={'3333'}
              content={
                <div>
                  <div>
                    <div>33333333</div>
                  </div>
                </div>
              }
              activityKey={'2'}
            />
            <Tabpane
              title={'4444'}
              content={
                <div>
                  <div>
                    <div>44444</div>
                  </div>
                </div>
              }
              activityKey={'3'}
            />
            <Tabpane
              title={'555555'}
              content={
                <div>
                  <div>
                    <div>55555</div>
                  </div>
                </div>
              }
              activityKey={'4'}
            />
            <Tabpane
              title={'666666'}
              content={
                <div>
                  <div>
                    <div>66666</div>
                  </div>
                </div>
              }
              activityKey={'5'}
            />
          </Tabs>
          <p>children tabPosition=bottom</p>
        </Wrapper>
        <Wrapper>
          <p>data tabPosition=top</p>
          <Tabs tabType={'line'} data={data} onPrevClick={onPrevClick} onNextClick={onNextClick} />
        </Wrapper>
        <br />
        <Wrapper>
          <p>data tabPosition=left</p>
          <Tabs
            tabType={'line'}
            tabPosition={'left'}
            data={data1}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        </Wrapper>
        <br />
        <p>data tabPosition=right</p>
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
          <p>data tabPosition=bottom</p>
        </Wrapper>
        <br />
        <Wrapper>
          <p>tabType=card </p>
          <Tabs
            tabType={'card'}
            data={data1}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
            onDelClick={onDelClick}
          />
        </Wrapper>
        <br />
        <br />
        <Wrapper>
          <p>tabType=card </p>
          <Tabs
            tabType={'window'}
            data={data1}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
            onDelClick={onDelClick}
          />
        </Wrapper>
        <br />
      </Theme>
    </div>
  );
};
