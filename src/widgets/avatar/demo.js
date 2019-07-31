/**
 *
 * create by liangguodong on 2018/8/27
 *
 * @flow
 */
import * as React from 'react';
import styled from 'styled-components';
import Avatar from './';
import Widget from '../consts';
import Theme from '../theme';
import Badge from '../badge/index';

const Wrapper = styled.div`
  float: left;
  margin-left: 50px;
  text-align: center;
  padding: 20px;
`;
export default () => {
  const badgeConfig = {
    [Widget.Badge]: {
      BadgeDot: {
        normal: {
          position: { right: 0, top: -3 },
        },
      },
    },
    [Widget.NumberTurn]: {
      normal: {
        position: { right: 0, top: -3 },
      },
    },
  };
  const config = {
    [Widget.Avatar]: {
      Container: { normal: { background: { color: '#e2e2e2' } } },
      IconAvatar: { normal: { color: 'orange' } },
      SrcAvatar: { normal: { width: 40, height: 40 } },
      FontAvatar: { normal: { color: 'red' } },
    },
  };
  const iconConfig = {
    [Widget.Avatar]: {
      IconAvatar: { normal: { color: 'purple', fontSize: 16 } },
    },
  };
  return (
    <div>
      <Theme config={config}>
        <Wrapper>
          <Avatar shape={'square'} name={'l'} />
          <Avatar shape={'square'} name={'lu'} />
          <Avatar viewClass="config" shape={'square'} name={'lug'} />
          <Avatar viewClass="config" shape={'square'} name={'lugia'} />
          <br />
          <Avatar shape={'circle'} name={'l'} />
          <Avatar shape={'circle'} name={'lu'} />
          <Avatar viewClass="config" shape={'circle'} name={'lug'} />
          <Avatar viewClass="config" shape={'circle'} name={'lugia'} />
        </Wrapper>
        <Wrapper>
          <Theme config={iconConfig}>
            <Avatar
              shape={'square'}
              type="icon"
              icon={'lugia-icon-financial_user'}
              size={'small'}
            />
            <Avatar
              shape={'square'}
              type="icon"
              icon={'lugia-icon-financial_user'}
              size={'default'}
            />
            <Avatar
              shape={'square'}
              type="icon"
              icon={'lugia-icon-financial_user'}
              size={'large'}
            />
          </Theme>
          <br />
          <Avatar shape={'circle'} type="icon" icon={'lugia-icon-financial_user'} size={'small'} />
          <Avatar
            shape={'circle'}
            type="icon"
            icon={'lugia-icon-financial_user'}
            size={'default'}
          />
          <Avatar shape={'circle'} type="icon" icon={'lugia-icon-financial_user'} size={'large'} />
        </Wrapper>
        <Wrapper>
          <Theme
            config={{
              register: {
                FontAvatar: { normal: { color: 'blue' } },
              },
            }}
          >
            <Avatar viewClass="register" shape={'square'} size={'small'} name={'lugia'} />
            <Avatar viewClass="register" shape={'square'} size={'default'} name={'lugia'} />
            <Avatar viewClass="register" shape={'square'} size={'large'} name={'lugia'} />
          </Theme>
          <br />
          <Avatar shape={'circle'} size={'small'} name={'lugia'} />
          <Avatar shape={'circle'} size={'default'} name={'lugia'} />
          <Avatar shape={'circle'} size={'large'} name={'lugia'} />
        </Wrapper>
        <Wrapper>
          <Avatar shape={'square'} name={'lugia'} msgNum={1} />
          <Avatar shape={'square'} type="icon" icon={'lugia-icon-financial_user'} msgNum={2} />
          <Avatar
            shape={'square'}
            type="img"
            src="http://192.168.102.73:8081/BigFrontend/Work/ued/lugia/raw/master/lugiaweb%E7%BB%84%E4%BB%B6/%E5%A4%B4%E5%83%8F/32.jpg"
            msgNum={99}
          />
          <br />
          <Avatar shape={'circle'} name={'lugia'} />
          <Avatar shape={'circle'} type="icon" icon={'lugia-icon-financial_user'} />
          <Avatar
            shape={'circle'}
            type="img"
            src="http://192.168.102.73:8081/BigFrontend/Work/ued/lugia/raw/master/lugiaweb%E7%BB%84%E4%BB%B6/%E5%A4%B4%E5%83%8F/32.jpg"
            msgNum={99}
          />
        </Wrapper>
      </Theme>

      <Wrapper>
        <Theme config={badgeConfig}>
          <Badge count={10}>
            <Avatar shape={'square'} size={'large'} name={'lugia'} />
          </Badge>
          <br />
          <br />
          <Badge dot={true}>
            <Avatar shape={'square'} size={'large'} name={'lugia'} />
          </Badge>
        </Theme>
        <br />
        <br />
      </Wrapper>
      <Wrapper>
        <Theme config={badgeConfig}>
          <Badge viewClass="badgeConfig" count={10}>
            <Avatar icon={'lugia-icon-financial_user'} size={'large'} type="icon" />
          </Badge>
          <br />
          <br />
          <Badge viewClass="badgeConfig" dot={true}>
            <Avatar icon={'lugia-icon-financial_user'} size={'large'} type="icon" />
          </Badge>
        </Theme>
      </Wrapper>
    </div>
  );
};
