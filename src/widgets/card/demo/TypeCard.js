import React from 'react';
import styled from 'styled-components';
import Card from '../index';
import Theme from '../../theme';
import Widget from '../../consts/index';
import avatarImgSrc from './card-avatar-circle.png';
import cardImgSrc from './card.jpg';

const Wrapper = styled.div`
  display: inline-block;
`;
const CardWrapper = styled.div`
  display: inline-block;
  padding-right: 10px;
  padding-top: 10px;
`;
export default class TypeCard extends React.Component<any, any> {
  render() {
    const imageVCard = {
      [Widget.Card]: {
        Container: {
          normal: {
            width: 160,
            height: 220,
            opacity: 0.8,
          },
        },
        CardImage: {
          normal: {
            width: '100%',
            height: 130,
          },
        },
        CardTitle: {
          normal: {
            width: 100,
            height: 20,
          },
        },
        CardContent: {
          normal: {
            padding: 0,
          },
        },
      },
    };
    const imageHCard = {
      [Widget.Card]: {
        Container: {
          normal: {
            width: 260,
            height: 140,
          },
        },
        CardImage: {
          normal: {
            width: 160,
            height: '100%',
          },
        },
      },
    };
    const avatarVCard = {
      [Widget.Card]: {
        Container: {
          normal: {
            width: 160,
            height: 220,
          },
        },
        CardAvatar: {
          Container: {
            normal: {
              margin: {
                top: 20,
                bottom: 20,
              },
            },
          },
        },
      },
    };
    const avatarHCard = {
      [Widget.Card]: {
        Container: {
          normal: {
            width: 260,
            height: 140,
            padding: {
              top: 20,
            },
          },
        },
        CardAvatar: {
          Container: {
            normal: {
              margin: {
                top: 10,
                left: 20,
              },
            },
          },
        },
      },
    };
    return (
      <Wrapper>
        <div style={{ display: 'inline-flex' }}>
          <CardWrapper>
            <Theme config={avatarVCard}>
              <Wrapper>
                <Card
                  type={'avatar'}
                  title={'This is title'}
                  description={'This is description'}
                  imageOrientation={'vertical'}
                  avatar={avatarImgSrc}
                />
              </Wrapper>
            </Theme>
          </CardWrapper>

          <CardWrapper>
            <Theme config={imageVCard}>
              <Card
                viewClass={'cardImage'}
                type={'image'}
                imageOrientation={'vertical'}
                title={'This is title'}
                description={'This is description'}
                image={cardImgSrc}
              />
            </Theme>
          </CardWrapper>
        </div>
        <br />
        <div style={{ display: 'inline-flex' }}>
          <CardWrapper>
            <Theme config={avatarHCard}>
              <Wrapper>
                <Card
                  type={'avatar'}
                  title={'This is title'}
                  description={'This is description'}
                  avatar={avatarImgSrc}
                />
              </Wrapper>
            </Theme>
          </CardWrapper>
          <CardWrapper>
            <Theme config={imageHCard}>
              <Wrapper>
                <Card
                  type={'image'}
                  title={'This is title'}
                  imageOrientation={'horizontal'}
                  description={'This is description'}
                  image={cardImgSrc}
                />
              </Wrapper>
            </Theme>
          </CardWrapper>
        </div>
      </Wrapper>
    );
  }
}
