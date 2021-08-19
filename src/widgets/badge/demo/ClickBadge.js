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
export default class ClickBadge extends React.Component<any, any> {
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
        <a href="/component/badge">
          <Theme config={dot}>
            <Badge>
              <Box />
            </Badge>
          </Theme>
        </a>
      </div>
    );
  }
}
