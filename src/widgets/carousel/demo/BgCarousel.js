import React from 'react';
import styled from 'styled-components';
import Carousel from '../index';
import Widget from '../../consts';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

const getBackground = (props: Object) => {
  const { i } = props;
  const isEven = i % 2 === 0;
  return `background: ${isEven ? '#000033' : '#161651'}`;
};

const ItemWrap = styled.div`
  width: 100%;
  height: 100%;
  line-height: 200px;
  text-align: center;
  ${getBackground};
  color: #ccc;
`;
const config = {
  [Widget.Carousel]: {
    Container: {
      normal: {
        width: '100%',
        height: '100%',
        background: {
          color: 'orange',
        },
      },
    },
    PreButton: {
      normal: {
        color: '#fff',
        font: {
          size: 0,
        },
        opacity: 0,
        background: {
          color: '#556374',
        },
      },
    },
    NextButton: {
      normal: {
        color: 'yellow',
        font: {
          size: 0,
        },
        margin: {
          right: 30,
        },
      },
    },
    IndicatorWrap: {
      normal: {
        height: 40,
        background: {
          color: '#000',
        },
        borderRadius: getBorderRadius(20),
        margin: {
          bottom: 10,
        },
      },
    },
    Indicator: {
      normal: {
        height: 20,
        width: 20,
        opacity: 0.5,
        background: { color: 'pink' },
        boxShadow: getBoxShadow('0px 0px 5px 5px blue'),
        border: getBorder({ color: '#9482ff', width: 1, style: 'solid' }),
        borderRadius: getBorderRadius(20),
        margin: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
      hover: {
        background: { color: 'orange' },
        opacity: 1,
        borderRadius: getBorderRadius(3),
        border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
        boxShadow: getBoxShadow('0px 0px 5px 5px orange'),
      },
    },
  },
};

export default class DefaultCarousel extends React.Component<any, any> {
  render() {
    return <Carousel theme={config}>{this.getItemWrap()}</Carousel>;
  }

  getItemWrap = () => {
    const len = 4;
    const items = [];
    for (let i = 0; i < len; i++) {
      const index = i + 1;
      items.push(<ItemWrap i={i}>{'Banner0' + index}</ItemWrap>);
    }
    return items;
  };
}
