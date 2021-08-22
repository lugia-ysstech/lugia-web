import React from 'react';
import styled from 'styled-components';
import avatarSrc from '../avatar.png';
import Avatar from '../index';
import Theme from '../../theme';
import Widget from '../../consts/index';

const Wrapper = styled.div`
  padding: 2px;
`;
export default class TypeAvatar extends React.Component<any, any> {
  render() {
    const view = {
      [Widget.Avatar]: {
        Container: { normal: { background: { color: '#e2e2e2' }, margin: 10 } },
      },
    };
    return (
      <Theme config={view}>
        <Wrapper>
          <Avatar shape={'circle'} type="img" src={avatarSrc} />
          <Avatar shape={'circle'} type="text" name={'lugia'} />
          <Avatar shape={'circle'} type="icon" icon={'lugia-icon-financial_user'} />
          <br />
          <Avatar shape={'square'} type="img" src={avatarSrc} />
          <Avatar shape={'square'} type="text" name={'lugia'} />
          <Avatar shape={'square'} type={'icon'} icon={'lugia-icon-financial_user'} />
        </Wrapper>
      </Theme>
    );
  }
}
