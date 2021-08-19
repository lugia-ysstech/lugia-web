import React from 'react';
import styled from 'styled-components';
import Badge from '../index';
import Theme from '../../theme';
import Widget from '../../consts/index';

const Box = styled.div`
  width: 40px;
  height: 40px;
  background: #ccc;
  margin-left: 10px;
`;
export default class BaseBadge extends React.Component<any, any> {
  render() {
    const dot = {
      [Widget.Badge]: {
        Badge: {
          normal: {
            position: { top: -5, right: -5 },
          },
        },
      },
    };
    return (
      <div>
        <Theme config={dot}>
          <Badge count={0}>
            <Box />
          </Badge>
          <Badge showZero count={0}>
            <Box />
          </Badge>
        </Theme>
      </div>
    );
  }
}
