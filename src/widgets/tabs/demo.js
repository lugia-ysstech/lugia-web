/**
 *
 * create by liangguodong
 *
 * @flow
 */
import * as React from 'react';
import Tabs from './tabs';
import Button from '../button';
import Tabpane from './tabpane';
import Widget from '../consts/index';
import Icon from '../icon';
import Theme from '../theme/';
import styled from 'styled-components';

const onPreClick = e => {};
const onNextClick = e => {};
export class Tabsdemo extends React.Component<any, any> {
  state = {
    data: hasActivityKeyData,
    activeKey: '0',
  };
  onAddClick = () => {
    const activityKey = `newTab${this.state.data.length++}`;
    const item = {
      title: 'New Tab',
      content: 'Content of new Tab',
      activityKey,
    };
    return item;
  };
  onDeleteClick = (activityKey: string) => {};
  render() {
    return (
      <div>
        <Tabs
          tabType={'card'}
          pagedType={'single'}
          onPreClick={onPreClick}
          onNextClick={onNextClick}
          onAddClick={this.onAddClick}
          onDeleteClick={this.onDeleteClick}
        />
      </div>
    );
  }
}

export class TabsLimitdemo extends React.Component<any, any> {
  state = {
    data: hasActivityKeyData,
    activeKey: '0',
  };
  change = (e: Object) => {
    hasActivityKeyData[0] = {
      title: ' changed Tab1',
      content: 'Content of changed Tab1',
      activityKey: '-1',
    };
    this.setState({ data: hasActivityKeyData });
  };
  onAddClick = () => {
    const data = this.state.data;
    const activityKey = `newTab${this.state.data.length++}`;
    data.push({
      title: 'New Tab',
      content: 'Content of new Tab',
      activityKey,
    });
    this.setState({ data });
  };

  onDeleteClick = (activityKey: string) => {
    const { data } = this.state;
    let newdata = [];
    if (data.length > 1) {
      newdata = data.filter(child => {
        return child.activityKey !== activityKey;
      });
    }
    this.setState({ data: newdata });
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <Button style={{ width: 200 }} onClick={this.change} type="primary">
          {'点击修改data内容'}
        </Button>
        <Tabs
          tabType={'card'}
          pagedType={'single'}
          data={data}
          onPreClick={onPreClick}
          onNextClick={onNextClick}
          onAddClick={this.onAddClick}
          onDeleteClick={this.onDeleteClick}
        />
      </div>
    );
  }
}
const Wrapper = styled.div`
  text-align: left;
  margin: 50px;
`;
const RightWrapper = styled.div`
  margin: 50px;
  text-align: right;
`;
export const defaultData = [
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
export const suffixData = [
  {
    title: 'Tab1',
    content: 'content of Tab1',
    suffixIcon: <Icon iconClass={'lugia-icon-financial_archive'} />,
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
export const disabledData = [
  {
    title: 'Tab1',
    content: 'content of Tab1',
  },
  {
    title: 'Tab2',
    content: 'content of Tab2',
    disabled: true,
  },
  {
    title: 'Tab3',
    content: 'content of Tab3',
  },
];
export const hasActivityKeyData = [
  {
    title: 'Tab1',
    content: <div>1111111111</div>,
    activityKey: '0',
  },
  {
    title: 'Tab2',
    content: (
      <div>
        <div>222222</div>
      </div>
    ),
    activityKey: '1',
  },
  {
    activityKey: '2',
    title: 'Tab3',
    content: (
      <div>
        <div>
          <div>33333</div>
        </div>
      </div>
    ),
  },
  {
    activityKey: '3',
    title: 'Tab4',
    content: (
      <div>
        <div>
          <div>44444</div>
          <div>44444</div>
        </div>
      </div>
    ),
  },
  {
    activityKey: '4',
    title: 'Tab5',
    content: 55555,
  },
  {
    activityKey: '5',
    title: 'Tab6',
    content: 66666,
  },
  {
    activityKey: '6',
    title: 'Tab7',
    content: 77777,
  },
  {
    activityKey: '7',
    title: 'Tab8',
    content: 888888,
  },
];
export const children = [
  <Tabpane title={'1111'} content={'11111'} activityKey={'0'} />,
  <Tabpane title={'2222'} content={<div>2222</div>} activityKey={'1'} />,
  <Tabpane
    title={'3333'}
    content={
      <div>
        <div>
          <div>3333</div>
        </div>
      </div>
    }
    activityKey={'2'}
  />,
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
  />,
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
  />,
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
  />,
];
export const longChildren = [
  <Tabpane title={'11111'} content={'11111111111111111111111111'} />,
  <Tabpane title={'2222'} content={<div>22222222222222</div>} />,
  <Tabpane
    title={'3333'}
    content={
      <div>
        <div>
          <div>33333333</div>
        </div>
      </div>
    }
  />,
  <Tabpane
    title={'4444'}
    content={
      <div>
        <div>
          <div>44444</div>
        </div>
      </div>
    }
  />,
  <Tabpane
    title={'555555'}
    content={
      <div>
        <div>
          <div>55555</div>
        </div>
      </div>
    }
  />,
  <Tabpane
    title={'666666'}
    content={
      <div>
        <div>
          <div>66666</div>
        </div>
      </div>
    }
  />,
];
export const shortChildren = [
  <Tabpane
    title={'11111'}
    content={'11111111111111111111111111'}
    icon={'lugia-icon-financial_archive'}
  />,
  <Tabpane title={'2222'} content={<div>22222222222222</div>} activityKey={'1'} />,
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
  />,
];
const hasActivityKeyChildren = [
  <Tabpane title={'11111'} content={'1111'} activityKey={'0'} />,
  <Tabpane title={'2222'} content={<div>2222</div>} activityKey={'1'} />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
];
export default () => {
  const view = {
    [Widget.Tabs]: {
      width: 500,
    },
  };
  const height = {
    [Widget.Tabs]: {
      height: 60,
    },
    [Widget.Tabpane]: {
      height: 60,
    },
  };
  return (
    <div>
      <Theme config={view}>
        <Wrapper>
          <p>defaultData </p>
          <Tabs
            tabType={'line'}
            tabPosition={'top'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            defaultData={defaultData}
          />
        </Wrapper>
        <Theme config={height}>
          <Wrapper>
            <p>height 60 </p>
            <Tabs
              tabType={'line'}
              tabPosition={'top'}
              onPreClick={onPreClick}
              onNextClick={onNextClick}
              defaultData={defaultData}
            />
          </Wrapper>
        </Theme>
        <Wrapper>
          <p>suffixIcon </p>
          <Tabs tabType={'line'} tabPosition={'top'} data={suffixData} />
        </Wrapper>
        <Wrapper>
          <p>disabled </p>
          <Tabs tabType={'line'} tabPosition={'top'} data={disabledData} />
        </Wrapper>
        <Wrapper>
          <p>data tabPosition=top</p>
          <Tabs
            tabType={'line'}
            tabPosition={'top'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            children={children}
            data={defaultData}
          />
        </Wrapper>

        <Wrapper>
          <p>children tabPosition=left</p>
          <Tabs
            tabType={'line'}
            tabPosition={'left'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            children={hasActivityKeyChildren}
          />
        </Wrapper>
        <p>children tabPosition=right</p>
        <RightWrapper>
          <Tabs
            tabType={'line'}
            tabPosition={'right'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            children={shortChildren}
          />
        </RightWrapper>
        <Wrapper>
          <Tabs
            tabType={'line'}
            tabPosition={'bottom'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            children={longChildren}
          />
        </Wrapper>
        <Wrapper>
          <p>data tabPosition=top</p>
          <Tabs
            tabType={'line'}
            data={defaultData}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </Wrapper>
        <br />
        <Wrapper>
          <p>data tabPosition=left </p>
          <Tabs
            tabType={'line'}
            tabPosition={'left'}
            data={hasActivityKeyData}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </Wrapper>
        <br />
        <p>data tabPosition=right && pagedType=single</p>
        <RightWrapper>
          <Tabs
            tabType={'line'}
            tabPosition={'right'}
            data={hasActivityKeyData}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
            defaultActivityKey={'2'}
          />
        </RightWrapper>
        <br />
        <p>children tabPosition=bottom</p>
        <Wrapper>
          <Tabs
            tabType={'line'}
            data={defaultData}
            tabPosition={'bottom'}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </Wrapper>
        <br />
        <Wrapper>
          <p>tabType=card pagedType=single</p>
          <Tabs
            tabType={'card'}
            pagedType={'single'}
            data={hasActivityKeyData}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </Wrapper>
        <br />
        <br />
        <Wrapper>
          <p>tabType=window pagedType=page</p>
          <Tabs
            tabType={'window'}
            pagedType={'page'}
            data={hasActivityKeyData}
            onPreClick={onPreClick}
            onNextClick={onNextClick}
          />
        </Wrapper>
        <p>非受限 不传data 展示数据由state 控制</p>
        <Tabsdemo />
        <p>受限 展示数据 由props控制</p>
        <TabsLimitdemo />
        <br />
      </Theme>
    </div>
  );
};
