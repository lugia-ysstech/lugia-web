/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Carousel from './index';
import { getBorder, getBoxShadow, getBorderRadius } from '@lugia/theme-utils';
import styled from 'styled-components';
import Widget from '../consts/index';
import Image from './carousel.png';

const data = [
  'https://wallpaperm.cmcm.com/live/preview_img_raw/a03f8b79f5b344c92855592f5b016cb0_preview_raw.jpg',
  'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/live/dd59b2e2ab68b1c003ba0dafab20eca0.mp4.jpg',
  'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview_jpg/19367cbcf3b03cc253455b4208074d76.jpg',
  'https://wallpaperm.cmcm.com/scene/preview_img_raw/97ba6b60662ab4f31ef06cdf5a5f8e94_preview_raw.jpg',
];

const DemoWrap = styled.div`
  margin: 20px;
  width: 500px;
  height: 300px;
  background: #f2f2f2;
  padding: 10px;
`;

const Img = styled.img`
  width: auto;
  height: 100%;
  display: inline-block;
  vertical-align: top;
`;

const getBackground = (props: Object) => {
  const { i } = props;
  const isEven = i % 2 === 0;
  return `background: ${isEven ? '#000033' : '#161651'}`;
};

const ItemWrap = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${getBackground};
  color: #ccc;
  border-radius: 20px;
  font-size: 14px;
  overflow: hidden;
`;

const H2 = styled.h2`
  padding: 10px 40px;
`;

const getImgWrap = () => {
  const len = data.length;
  const items = [];
  for (let i = 0; i < len; i++) {
    items.push(
      <ItemWrap
        key={i}
        i={i}
        onClick={() => {
          console.log('click', i);
        }}
      >
        <Img src={data[i]} />
      </ItemWrap>
    );
  }
  return items;
};

class CarouselLimitDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = { start: 0 };
  }

  onChange = (param: Object) => {
    const { newValue } = param;
    console.log('newValue', newValue);
    this.setState({ start: newValue });
  };

  render() {
    return (
      <DemoWrap>
        <h2>图片轮播图 start=2 从索引值为2的图开始</h2>
        <Carousel
          animationTime={500}
          autoPlay={true}
          delay={3000}
          start={this.state.start}
          onChange={this.onChange}
        >
          {getImgWrap()}
        </Carousel>
      </DemoWrap>
    );
  }
}

export default class SkeletonDemo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { start: 0 };
  }

  handleChange = (target: object) => {
    const { newValue } = target;
    this.setState({ start: newValue });
  };

  render() {
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

    return (
      <div>
        <H2>3s自动切换</H2>
        <Carousel defaultStart={4} delay={3000}>
          {this.getItemWrap()}
        </Carousel>

        <H2>水平切换 指示器在外部 indicatorType=outside</H2>
        <Carousel autoPlay={true} delay={3000} indicatorType={'outside'}>
          {this.getItemWrap()}
        </Carousel>

        <H2>垂直切换 switchType === vertical indicatorType=vertical</H2>
        <Carousel autoPlay={true} delay={3000} switchType={'vertical'} indicatorType={'vertical'}>
          {this.getItemWrap()}
        </Carousel>

        <H2>透明度切换 switchType === fade</H2>
        <DemoWrap>
          <Carousel
            theme={config}
            animationTime={1000}
            autoPlay={true}
            defaultStart={2}
            delay={3000}
            switchType={'fade'}
          >
            {this.getItemWrap()}
          </Carousel>
        </DemoWrap>

        <h2>图片轮播图 defaultStart=2 从索引值为2的图开始</h2>
        <DemoWrap>
          <Carousel theme={config} autoPlay={true} delay={3000} defaultStart={2}>
            {getImgWrap()}
          </Carousel>
        </DemoWrap>

        <h2>受限</h2>
        <CarouselLimitDemo />

        <h2>受限：图片轮播图 switchType === fade 透明度切换</h2>
        <DemoWrap>
          <Carousel
            theme={config}
            autoPlay={true}
            switchType={'fade'}
            delay={3000}
            indicator={true}
            start={this.state.start}
            onChange={this.handleChange}
          >
            {getImgWrap()}
          </Carousel>
        </DemoWrap>

        <h2>双击输入文本后页面报错demo</h2>
        <DemoWrap>
          <Carousel
            theme={config}
            autoPlay={true}
            switchType={'fade'}
            delay={3000}
            deafultStart={2}
          >
            66666
          </Carousel>
        </DemoWrap>
      </div>
    );
  }

  getItemWrap = () => {
    const len = 4;
    const items = [];
    for (let i = 0; i < len; i++) {
      const index = i + 1;
      items.push(
        <ItemWrap key={i} i={i}>
          {'Banner0' + index}
        </ItemWrap>
      );
    }
    return items;
  };
}
