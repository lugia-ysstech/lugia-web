/**
 *
 * create by liangguodong on 2018/8/24
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Divider from './';
import Widget from '../consts/index';
import Theme from '../theme';
const Wrapper = styled.div`
  float: left;
  margin-left: 50px;
`;
export default () => {
  const view = {
    [Widget.Divider]: {
      HorizontalDivider: {
        normal: {
          width: 400,
          height: 1,
          background: {
            color: 'red',
          },
        },
      },
    },
  };
  const vertical = {
    [Widget.Divider]: {
      VerticalDivider: {
        normal: {
          width: 2,
          height: 10,
          background: {
            color: 'blue',
          },
        },
      },
    },
  };
  return (
    <div>
      <Theme config={view}>
        <Wrapper>
          <Divider />
          <p>solid </p>
          <Divider content={'solid'} type="horizontal" />
          <p>dashed</p>
          <Divider dashed={true} content={'dashed'} />
        </Wrapper>
        <Wrapper>
          <p>position left</p>
          <Divider content="position left" position="left" />
          <p>position right</p>
          <Divider content="position right" position="right" />
          <Divider />
          <p>"不用思考.因为我帮你想好了",这是lugia设计的重要原则之一.</p>
          <Divider />
        </Wrapper>
        <Wrapper>
          <p>type vertical</p>
          <Theme config={vertical}>
            <div style={{ height: 20 }}>
              text
              <Divider type="vertical" />
              text
              <Divider type="vertical" />
              text
              <Divider type="vertical" />
              text
              <Divider type="vertical" />
              text
            </div>
          </Theme>
        </Wrapper>
      </Theme>
    </div>
  );
};
