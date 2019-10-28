/**
 *@flow
 * create by lyq
 *
 */

import React from 'react';
import Label from './';
import Theme from '../theme';
import { css, StaticComponent } from '@lugia/theme-css-hoc';
import Widget from '../consts/index';
import message from '../message';

type PropsType = {};
type StateType = {};

const LabelBox = StaticComponent({
  tag: 'div',
  className: 'Container',
  css: css`
    box-sizing: border-box;
    white-space: nowrap;
    margin: 10px;
  `,
});

class LabelDemo extends React.Component<PropsType, StateType> {
  render() {
    const config = {
      [Widget.Label]: {
        Container: {
          normal: {
            color: 'orange',
            font: {
              weight: 'bold',
              size: 30,
            },
            lineHeight: 70,
            margin: {
              left: 30,
              top: 60,
            },
            padding: {
              right: 30,
              bottom: 60,
            },
            background: {
              color: '#C6E0B4',
            },
          },
          hover: {
            color: 'pink',
            cursor: 'pointer',
          },
        },
        LabelPrefix: {
          normal: {
            color: 'red',
            lineHeight: 70,
            margin: {
              right: 10,
            },
          },
        },
      },
    };

    const configWidth = {
      [Widget.Label]: {
        Container: {
          normal: {
            color: 'orange',
            font: {
              weight: 'bold',
              size: 30,
            },
            width: '100%',
            height: 200,
            background: {
              color: 'pink',
            },
            textAlign: 'center',
            lineHeight: 70,
            margin: {
              top: 60,
            },
            padding: {
              right: 30,
              bottom: 60,
            },
            cursor: 'pointer',
          },
          hover: {
            color: 'yellow',
          },
        },
      },
    };
    return (
      <div>
        <Theme config={config}>
          <LabelBox>主题配置 text: showPrefix : *</LabelBox>
          <Label text={'是立刻搭街坊螺丝扣'} showPrefix prefix={'*'} />

          <LabelBox>主题配置 text:</LabelBox>
          <Label text={'是立刻搭街坊螺丝扣'} />
          <LabelBox>主题配置 children:</LabelBox>
          <Label>深刻的很健康</Label>
        </Theme>
        <Theme config={configWidth}>
          <LabelBox>主题配置 click事件:</LabelBox>
          <Label text={'是立刻搭街坊螺丝扣'} onClick={this.onClick} />
        </Theme>

        <LabelBox>默认文本 text:</LabelBox>
        <Label text={'的身份回到'} />
        <LabelBox>默认文本 children:</LabelBox>
        <Label>科幻电视剧</Label>
        <LabelBox>默认文本 无参数:</LabelBox>
        <Label />
      </div>
    );
  }
  onClick = () => {
    message.info('do Click', 1);
  };
}

export default LabelDemo;
