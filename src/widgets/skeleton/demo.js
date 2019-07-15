/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Skeleton from './index';
import styled from 'styled-components';
import Theme from '../theme';
import Widget from '../consts/index';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

const Button = styled.button`
  width: 200px;
  height: 50px;
  background: cornflowerblue;
  margin: 20px;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  color: #fff;
`;

const Box = styled.div`
  height: 136px;
  width: 732px;
  background: pink;
  display: inline-block;
  font-size: 18px;
  font-weight: 900;
`;

const config = {
  [Widget.Skeleton]: {
    Wrap: { normal: { width: 1000, height: 600 } },
    Title: {
      normal: { width: 200, borderRadius: getBorderRadius(10) },
      hover: {
        background: { color: '#000' },
      },
    },
    Paragraph: {
      normal: {
        width: 300,
        height: 30,
        border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
        boxShadow: getBoxShadow('2px 2px 2px 2px #4d63ff'),
        borderRadius: getBorderRadius(10),
        opacity: 0.6,
        background: {
          color: 'pink',
        },
        first: {
          width: 100,
          background: {
            color: 'orange',
          },
        },
        last: {
          width: 150,
        },
        nth3: {
          width: 400,
          height: 20,
          background: {
            color: '#4d63ff',
          },
          margin: {
            top: 20,
          },
        },
      },
      hover: {
        background: {
          color: '#4d63ff',
        },
        border: getBorder({ color: '#000', width: 1, style: 'solid' }),
        boxShadow: getBoxShadow('2px 2px 2px 2px red'),
        borderRadius: getBorderRadius(10),
        opacity: 1,
        first: {
          background: {
            color: '#ccc',
          },
        },
        nth3: {
          background: {
            color: 'orange',
          },
        },
      },
    },
    Avatar: {
      normal: {
        width: 100,
        background: { color: 'pink' },
        border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
        boxShadow: getBoxShadow('2px 2px 2px 2px #4d63ff'),
        borderRadius: getBorderRadius(10),
        opacity: 0.6,
        margin: {
          right: 20,
          top: 20,
        },
      },

      hover: {
        background: { color: 'orange' },
        border: getBorder({ color: 'pink', width: 1, style: 'solid' }),
        boxShadow: getBoxShadow('2px 2px 2px 2px #000'),
        borderRadius: getBorderRadius(100),
        opacity: 1,
      },
    },
    Picture: {
      normal: {
        width: 300,
        height: 400,
        background: { color: 'pink' },
        border: getBorder({ color: '#4d63ff', width: 1, style: 'solid' }),
        boxShadow: getBoxShadow('2px 2px 2px 2px #4d63ff'),
        borderRadius: getBorderRadius(10),
        opacity: 0.6,
        margin: {
          left: 50,
          top: 20,
        },
      },

      hover: {
        background: { color: 'orange' },
        border: getBorder({ color: 'pink', width: 1, style: 'solid' }),
        boxShadow: getBoxShadow('2px 2px 2px 2px #000'),
        borderRadius: getBorderRadius(100),
        opacity: 1,
      },
    },
  },
};

export default class SkeletonDemo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { loading: true };
  }
  render() {
    return (
      <div>
        <div>
          <Button onClick={this.handleClickButton}>点击切换</Button>
        </div>
        <Skeleton
          theme={config}
          // avatar={false}
          picture={true}
          // title={false}
          // pictureWidth={400}
          // pictureHeight={600}
          paragraph={{ rows: 8 }}
          animation={true}
          loading={this.state.loading}
        >
          <Box>我是被Skeleton组件包裹的项</Box>
        </Skeleton>
      </div>
    );
  }

  handleClickButton = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  };
}
