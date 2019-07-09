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
import { getBorder } from '@lugia/theme-utils';
import { getBorderRadius } from '../theme/CSSProvider';

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
  EleRef: any;
  render() {
    const view = {
      [Widget.BackTop]: {
        BackTopContent: {
          normal: {
            color: 'red',
            background: { color: 'orange' },
            width: 100,
            height: 100,
            opacity: 0.7,
            border: getBorder({ color: 'red', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(100),
          },
        },
        BackTopIcon: {
          normal: {
            color: 'green',
            fontSize: 16,
            padding: {
              right: 10,
              left: 10,
              top: 10,
              bottom: 10,
            },
            margin: {
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
            },
          },
        },
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
        <div
          style={{ width: '200px', height: '200px', overflowY: 'scroll', marginTop: '400px' }}
          ref={node => (this.EleRef = node)}
        >
          <Demo cur={3}>
            <div style={{ width: '20px', height: '300px' }} />
            <BackTop visibilityHeight={80} target={() => this.EleRef} />
          </Demo>
        </div>
      </div>
    );
  }
}
