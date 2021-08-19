import React from 'react';
import styled from 'styled-components';
import Avatar from '../index';
import Theme from '../../theme';
import Widget from '../../consts/index';

export default class SizeAvatar extends React.Component<any, any> {
  render() {
    const view = {
      [Widget.Avatar]: {
        Container: { normal: { background: { color: '#e2e2e2' }, margin: 10 } },
      },
    };
    return (
      <Theme config={view}>
        <div>
          <Avatar shape={'circle'} size={'small'} name={'L'} />
          <Avatar shape={'circle'} size={'default'} name={'lug'} />
          <Avatar shape={'circle'} size={'large'} name={'lugia'} />
          <br />
          <Avatar shape={'square'} size={'small'} name={'L'} />
          <Avatar shape={'square'} size={'default'} name={'lug'} />
          <Avatar shape={'square'} size={'large'} name={'lugia'} />
        </div>
      </Theme>
    );
  }
}
