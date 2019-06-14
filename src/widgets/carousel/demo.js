/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Carousel from './index';
import { getBorder } from '@lugia/theme-css-hoc';
import styled from 'styled-components';
import Widget from '../consts/index';

const data = [
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543751358232&di=f7fd14870cb6028086f7bb55d479df53&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F4%2F586b090b7f42b.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543751053813&di=7374346483180a4f42ea53227f866fcb&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-19%2F59e8072871e49.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543751112606&di=d22242ff68a6a20996cc4ac375d04776&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-07-20%2F5b517965781e5.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543751600594&di=be6d42fffdc5d235f4d2c83455885936&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201601%2F24%2F175433rossj7cn74vksn4p.jpg',
];

const DemoWrap = styled.div`
  margin: 20px;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: inline-block;
  vertical-align: top;
`;

const getBackground = (props: Object) => {
  const { i } = props;
  const isEven = i % 2 === 0;
  return `background: ${isEven ? '#000033' : '#161651'}`;
};

const ItemWrap = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  line-height: 350px;
  text-align: center;
  ${getBackground};
  color: #ccc;
  font-size: 14px;
`;

const H2 = styled.h2`
  padding: 10px 40px;
`;

const getImgWrap = () => {
  const len = data.length;
  const items = [];
  for (let i = 0; i < len; i++) {
    items.push(
      <ItemWrap i={i}>
        <Img src={data[i]} />
      </ItemWrap>
    );
  }
  return items;
};

class CarouselLimtDemo extends React.Component<any, any> {
  constructor() {
    super();
    this.state = { start: 0 };
  }

  onChange = (param: Object) => {
    const { newValue } = param;
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
    this.state = {};
  }

  render() {
    const config = {
      [Widget.Carousel]: {
        CarouselWrap: { normal: { width: 700, height: 350 } },
        PreButton: {
          normal: {
            color: 'blue',
            fontSize: 60,
            opacity: 0.2,
            boxShadow: '0px 0px 5px 5px yellow',
          },
          hover: { opacity: 1 },
        },
        NextButton: {
          normal: {
            color: 'yellow',
            fontSize: 60,
            opacity: 0.2,
            boxShadow: '2px 2px 5px 5px blue',
          },
          hover: { opacity: 1 },
        },
        Indicator: {
          normal: {
            height: 20,
            width: 20,
            opacity: 0.5,
            background: { color: 'pink' },
            boxShadow: '2px 2px 5px 5px yellow',
            border: getBorder({ color: '#9482ff', width: 0, style: 'solid' }, { radius: 20 }),
            margin: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            },
          },
          hover: {
            background: { color: 'orange' },
          },
        },
      },
    };

    return (
      <div>
        <H2>3s自动切换</H2>
        <DemoWrap>
          <Carousel theme={config} defaultStart={2} autoPlay={false} delay={3000}>
            {this.getItemWrap()}
          </Carousel>
        </DemoWrap>

        <H2>水平切换 指示器在外部 indicatorType=outside</H2>
        <DemoWrap>
          <Carousel theme={config} autoPlay={true} delay={3000} indicatorType={'outside'}>
            {this.getItemWrap()}
          </Carousel>
        </DemoWrap>

        <H2>垂直切换 switchType === vertical indicatorType=vertical</H2>
        <DemoWrap>
          <Carousel
            theme={config}
            autoPlay={true}
            delay={3000}
            switchType={'vertical'}
            indicatorType={'vertical'}
          >
            {this.getItemWrap()}
          </Carousel>
        </DemoWrap>

        <H2>透明度切换 switchType === fade indicatorType=vertical</H2>
        <DemoWrap>
          <Carousel
            theme={config}
            animationTime={1000}
            autoPlay={false}
            deafultStart={3}
            delay={3000}
            switchType={'fade'}
          >
            {this.getItemWrap()}
          </Carousel>
        </DemoWrap>

        <h2>图片轮播图 deafultStart=2 从索引值为2的图开始</h2>
        <DemoWrap>
          <Carousel theme={config} autoPlay={true} delay={3000} defaultStart={2}>
            {getImgWrap()}
          </Carousel>
        </DemoWrap>

        <h2>受限</h2>
        <CarouselLimtDemo />

        <h2>图片轮播图 switchType === fade 透明度切换</h2>
        <DemoWrap>
          <Carousel
            theme={config}
            autoPlay={true}
            switchType={'fade'}
            delay={3000}
            deafultStart={2}
          >
            {getImgWrap()}
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
      items.push(<ItemWrap i={i}>{'Banner0' + index}</ItemWrap>);
    }
    return items;
  };
}
