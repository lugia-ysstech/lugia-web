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
        LabelConfig: {
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
          },
          hover: {
            color: 'pink',
            cursor: 'pointer',
          },
        },
      },
    };

    return (
      <div>
        <Theme config={config}>
          <LabelBox>主题配置 text:</LabelBox>
          <Label text={'是立刻搭街坊螺丝扣'} />
          <LabelBox>主题配置 children:</LabelBox>
          <Label>深刻的很健康</Label>
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
}

export default LabelDemo;
