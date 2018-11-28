/**
 *
 * create by liangguodong on 2018/11/19
 *
 * @flow
 */
import * as React from 'react';
import TimeLine from './timeLine';
import TimeLineItem from './timeLineItem';
import Theme from '../theme/';
import Loading from '../loading/';
import styled from 'styled-components';

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
        <button type="primary" onClick={this.handleClick}>
          点击反转
        </button>
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
  margin: 100px;
  display: inline-block;
`;
const view = {
  long: {
    height: 100,
  },
  short: {
    height: 20,
  },
};
export const SimpleDemo = () => {
  return (
    <Theme config={view}>
      <div>
        <Wrapper>
          <p>simple</p>
          <br />
          <TimeLine>
            <TimeLineItem viewClass={'long'} time="2018-01-01" />
            <TimeLineItem time="2018-01-02" />
            <TimeLineItem time="2018-01-03" />
            <TimeLineItem viewClass={'short'} time="2018-01-04" />
            <TimeLineItem time="2018-01-05" />
          </TimeLine>
        </Wrapper>
        <Wrapper>
          <p>mode alternate</p>
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
          <p>正常</p>
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
          <p>mode:alternate </p>
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
          <p>不同状态</p>
          <br />
          <TimeLine direction={'left'}>
            <TimeLineItem time="2018-01-01" status={'success'} />
            <TimeLineItem time="2018-01-02" />
            <TimeLineItem time="2018-01-03" status={'failed'} />
            <TimeLineItem time="2018-01-04" />
            <TimeLineItem time="2018-01-05" />
          </TimeLine>
        </Wrapper>
        <Wrapper>
          <p>type icon </p>
          <br />
          <TimeLine>
            <TimeLineItem
              time="2018-01-01"
              description={'description111'}
              type={'icon'}
              icon={'lugia-icon-financial_archive'}
            />
            <TimeLineItem time="2018-01-02" description={'description222'} />
            <TimeLineItem time="2018-01-03" description={'description333'} />
            <TimeLineItem
              time="2018-01-04"
              description={'description444'}
              type={'icon'}
              icon={'lugia-icon-financial_archive'}
            />
            <TimeLineItem time="2018-01-05" description={'description555'} />
          </TimeLine>
        </Wrapper>
        <Wrapper>
          <p>pending </p>
          <br />
          <TimeLine pending={true}>
            <TimeLineItem time="2018-01-01" description={'description111'} />
            <TimeLineItem time="2018-01-02" description={'description222'} />
            <TimeLineItem time="2018-01-03" description={'description333'} />
            <TimeLineItem time="2018-01-04" description={'description444'} />
            <TimeLineItem time="2018-01-05" description={'description555'} />
          </TimeLine>
        </Wrapper>
        <TimeLinePending />,
      </div>
    </Theme>
  );
};
export const OtherDemo = () => {
  return (
    <div>
      <Wrapper>
        <p>pending </p>
        <br />
        <TimeLine>
          <TimeLineItem time="2018-01-01" description={'description111'} />
          <TimeLineItem time="2018-01-02" description={'description222'} type="explain" />
          <TimeLineItem time="2018-01-03" description={'description333'} />
          <TimeLineItem time="2018-01-04" description={'description444'} type="explain" />
          <TimeLineItem time="2018-01-05" description={'description555'} />
        </TimeLine>
      </Wrapper>
      <Wrapper>
        <p>pending </p>
        <br />
        <TimeLine>
          <TimeLineItem time="2018-01-01" />
          <TimeLineItem time="2018-01-02" type="explain" />
          <TimeLineItem time="2018-01-03" type="explain" />
          <TimeLineItem time="2018-01-04" type="explain" />
          <TimeLineItem time="2018-01-05" />
        </TimeLine>
      </Wrapper>
    </div>
  );
};
export default () => {
  return [<SimpleDemo />, <OtherDemo />];
};
