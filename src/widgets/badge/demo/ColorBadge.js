import React from 'react';
import styled from 'styled-components';
import Badge from '../index';
import Theme from '../../theme';

const Box = styled.div`
  width: 40px;
  height: 40px;
  background: #ccc;
  margin-left: 10px;
`;
export default class ColorBadge extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Theme
          config={{
            green: {
              Badge: {
                normal: {
                  position: { top: -5, right: -5 },
                  background: { color: 'green' },
                },
              },
            },
          }}
        >
          <Badge viewClass="green">
            <Box />
          </Badge>
        </Theme>
        <Theme
          config={{
            purple: {
              Badge: {
                normal: {
                  position: { top: -5, right: -5 },
                  background: { color: 'purple' },
                },
              },
            },
          }}
        >
          <Badge viewClass="purple">
            <Box />
          </Badge>
        </Theme>
        <Theme
          config={{
            yellow: {
              Badge: {
                normal: {
                  position: { top: -5, right: -5 },
                  background: { color: 'yellow' },
                },
              },
            },
          }}
        >
          <Badge viewClass="yellow">
            <Box />
          </Badge>
        </Theme>
        <Theme
          config={{
            blue: {
              Badge: {
                normal: {
                  position: { top: -5, right: -5 },
                  background: { color: 'blue' },
                },
              },
            },
          }}
        >
          <Badge viewClass="blue">
            <Box />
          </Badge>
        </Theme>
      </div>
    );
  }
}
