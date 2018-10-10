/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import BackTop from './back-top';
import Widget from '../consts/index';
import Theme from '../theme';

const Demo = styled.div`
  & > div > div {
    bottom: ${props => 50 + props.cur * 50}px;
  }
`;
const DemoBack = styled.div`
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
`;
export default class AffixDemo extends React.Component<any, any> {
  render() {
    const view = {
      [Widget.BackTop]: {
        color: 'red',
        backgroundColor: 'orange',
      },
    };
    return (
      <div style={{ height: '1600px' }}>
        <BackTop />
        <Demo cur={1}>
          <BackTop>
            <DemoBack>UP</DemoBack>
          </BackTop>
        </Demo>
        <Demo cur={2}>
          <Theme config={view}>
            <BackTop />
          </Theme>
        </Demo>
      </div>
    );
  }
}
