import React from 'react';
import styled from 'styled-components';
import Avatar from '../index';
import Theme from '../../theme';
import Widget from '../../consts/index';

export default class ShapeAvatar extends React.Component<any, any> {
  render() {
    const view = {
      [Widget.Avatar]: {
        Container: {
          normal: {
            background: { color: '#e2e2e2' },
            margin: 10,
            width: 50,
            height: 50,
          },
        },
      },
    };
    return (
      <Theme config={view}>
        <div>
          <Avatar viewClass="register" shape={'circle'} name={'lug'} />
          <Avatar viewClass="register" shape={'circle'} name={'lugia'} />
          <br />
          <Avatar viewClass="register" shape={'square'} name={'lug'} />
          <Avatar viewClass="register" shape={'square'} name={'lugia'} />
        </div>
      </Theme>
    );
  }
}
