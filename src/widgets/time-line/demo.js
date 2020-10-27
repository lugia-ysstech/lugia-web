/**
 *
 * create by liangguodong on 2018/11/19
 *
 * @flow
 */
import * as React from 'react';
import TimeLine from './timeLine';
import TimeLineItem from './timeLineItem';
import Icon from '../icon/';
import Button from '../button/';
import styled from 'styled-components';
import Theme from '../theme';
import Widget from '../consts';
import { getBorder, getBoxShadow } from '@lugia/theme-utils';

class TimeLinePending extends React.Component<Object, Object> {
  state = {
    reverse: false,
  };

  handleClick = () => {
    this.setState({ reverse: !this.state.reverse });
  };

  render() {
    return (
      <div style={{ margin: 30 }}>
        <Button type="primary" onClick={this.handleClick}>
          点击反转
        </Button>
        <TimeLine reverse={this.state.reverse}>
          <TimeLineItem time="2018-01-01" description={'description111'} />
          <TimeLineItem time="2018-01-02" description={'description222'} />
          <TimeLineItem time="2018-01-03" description={'description333'} />
          <TimeLineItem time="2018-01-04" description={'description444'} />
          <TimeLineItem time="2018-01-05" description={'description555'} />
        </TimeLine>
      </div>
    );
  }
}

const Wrapper = styled.div`
  text-align: left;
  margin-top: 50px;
  margin-left: 100px;
  display: inline-block;
`;

const testItemTheme = {
  [Widget.TimeLineItem]: {
    TimeLineDot: {
      normal: {
        background: {
          color: 'yellow',
        },
        border: getBorder({ width: 2, color: 'blue', style: 'solid' }),
        boxShadow: getBoxShadow('1px 2px 2px 2px red'),
      },
    },
  },
};

export const SimpleDemo = () => {
  return (
    <div>
      <Wrapper>
        <p> 显示默认数据的 时间轴</p>
        <br />
        <TimeLine />
      </Wrapper>
      <Wrapper>
        <p> 调节高度的 简洁样式</p>
        <br />
        <TimeLine>
          <TimeLineItem time="2018-01-01" />
          <TimeLineItem time="2018-01-02" />
          <TimeLineItem time="2018-01-03" />
          <TimeLineItem time="2018-01-04" />
          <TimeLineItem time="2018-01-05" />
        </TimeLine>
      </Wrapper>
      <Wrapper>
        <p>有详情描述 简洁样式 </p>
        <br />
        <TimeLine>
          <TimeLineItem time="2018-01-01" description={'description111'} />
          <TimeLineItem time="2018-01-02" description={'description222'} />
          <TimeLineItem time="2018-01-03" description={'description333'} />
          <TimeLineItem time="2018-01-04" description={'description444'} />
          <TimeLineItem time="2018-01-05" description={'description555'} />
        </TimeLine>
      </Wrapper>
      <Wrapper>
        <p>左右分散排列 简洁样式</p>
        <br />
        <TimeLine mode={'alternate'}>
          <TimeLineItem time="2018-01-01" />
          <TimeLineItem time="2018-01-02" />
          <TimeLineItem time="2018-01-03" />
          <TimeLineItem time="2018-01-04" />
          <TimeLineItem time="2018-01-05" />
        </TimeLine>
      </Wrapper>
      <Wrapper>
        <p> 左右分散排列 有详情描述 简洁样式</p>
        <br />
        <TimeLine mode={'alternate'}>
          <TimeLineItem time="2018-01-01" description={'description111'} />
          <TimeLineItem time="2018-01-02" description={'description222'} />
          <TimeLineItem time="2018-01-03" description={'description333'} />
          <TimeLineItem time="2018-01-04" description={'description444'} />
          <TimeLineItem time="2018-01-05" description={'description555'} />
        </TimeLine>
      </Wrapper>
      <Wrapper>
        <p>不同状态 简洁样式 左边展示</p>
        <br />
        <TimeLine mode={'left'}>
          <TimeLineItem time="2018-01-01" status={'success'} />
          <TimeLineItem time="2018-01-02" />
          <TimeLineItem time="2018-01-03" status={'failed'} />
          <TimeLineItem time="2018-01-04" />
          <TimeLineItem time="2018-01-05" />
        </TimeLine>
      </Wrapper>
      <Wrapper>
        <p>自定义元素 图标样式 </p>
        <br />
        <TimeLine>
          <TimeLineItem
            time="2018-01-01"
            description={'description111'}
            type={'icon'}
            icon={'lugia-icon-financial_progress'}
          />
          <TimeLineItem time="2018-01-02" description={'description222'} />
          <TimeLineItem time="2018-01-03" description={'description333'} />
          <TimeLineItem
            time="2018-01-04"
            description={'description444'}
            type={'icon'}
            icon={'lugia-icon-financial_progress'}
          />
          <TimeLineItem time="2018-01-05" description={'description555'} />
        </TimeLine>
      </Wrapper>
      <Wrapper>
        <p> 默认 幽灵节点样式 </p>
        <br />
        <TimeLine pending={true}>
          <TimeLineItem time="2018-01-01" description={'description111'} />
          <TimeLineItem time="2018-01-02" description={'description222'} />
          <TimeLineItem time="2018-01-03" description={'description333'} />
          <TimeLineItem time="2018-01-04" description={'description444'} />
          <TimeLineItem time="2018-01-05" description={'description555'} />
        </TimeLine>
      </Wrapper>
      <Wrapper>
        <p>自定义 幽灵节点内容为 Icon </p>
        <br />
        <TimeLine pending={true} pendingDot={<Icon iconClass={'lugia-icon-financial_abort'} />}>
          <TimeLineItem time="2018-01-01" description={'description111'} />
          <TimeLineItem time="2018-01-02" description={'description222'} />
          <TimeLineItem time="2018-01-03" description={'description333'} />
          <TimeLineItem time="2018-01-04" description={'description444'} />
          <TimeLineItem time="2018-01-05" description={'description555'} />
        </TimeLine>
      </Wrapper>
      <TimeLinePending />
      <Wrapper>
        <p>节点主题修复</p>
        <br />
        <Theme config={testItemTheme}>
          <TimeLine>
            <TimeLineItem time="2018-01-01" />
            <TimeLineItem time="2018-01-02" />
            <TimeLineItem time="2018-01-03" />
            <TimeLineItem time="2018-01-04" />
            <TimeLineItem time="2018-01-05" />
          </TimeLine>
        </Theme>
      </Wrapper>
    </div>
  );
};
export const OtherDemo = () => {
  return (
    <div>
      <Wrapper>
        <p>节点说明样式 </p>
        <br />
        <TimeLine>
          <TimeLineItem time="2018-01-01" />
          <TimeLineItem time="2018-01-02" timeLineType="explain" />
          <TimeLineItem time="2018-01-03" />
          <TimeLineItem time="2018-01-04" timeLineType="explain" />
          <TimeLineItem time="2018-01-05" />
        </TimeLine>
      </Wrapper>
      <Wrapper>
        <p>节点说明样式 </p>
        <br />
        <TimeLine>
          <TimeLineItem time="2018-01-01" description={'description111'} />
          <TimeLineItem time="2018-01-02" description={'description222'} timeLineType="explain" />
          <TimeLineItem
            time="2018-01-03"
            description={'description333'}
            timeLineType="icon"
            icon={'lugia-icon-financial_Hourglass'}
          />
          <TimeLineItem time="2018-01-04" description={'description444'} timeLineType="explain" />
          <TimeLineItem time="2018-01-05" description={'description555'} />
        </TimeLine>
      </Wrapper>
    </div>
  );
};
export default () => {
  return [<SimpleDemo />, <OtherDemo />];
};
