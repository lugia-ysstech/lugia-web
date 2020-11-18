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
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

type PropsType = {};
type StateType = {};

const LabelBox = StaticComponent({
  tag: 'div',
  className: 'Container',
  css: css`
    box-sizing: border-box;
    margin: 10px;
  `,
});

const testHtml =
  '<p><strong>this</strong> <em>is</em> <u>a </u><span style="color: red;">long </span><span style="background-color: lightblue;">text</span>, <span style="font-size: 20px;">long</span>, <span style="font-family: serif;">long</span><strong>...</strong></p><p>A new paragraph</p>';

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
    const configBorder = {
      [Widget.Label]: {
        Container: {
          normal: {
            width: 220,
            padding: 20,
            boxShadow: getBoxShadow('3px 3px 5px #87A0FF'),
            border: getBorder({ color: '#ffb282', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(20),
          },
          hover: {
            boxShadow: getBoxShadow('3px 3px 5px #F3B8FF'),
            border: getBorder({ color: '#8592ff', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(10),
          },
        },
      },
    };
    const wordBreak = {
      [Widget.Label]: {
        Container: {
          normal: {
            width: 50,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          },
        },
      },
    };
    const wordBreakClip = {
      [Widget.Label]: {
        Container: {
          normal: {
            width: 50,
            textOverflow: 'clip',
            overflow: 'hidden',
          },
        },
      },
    };
    return (
      <div>
        <Theme config={wordBreak}>
          <LabelBox>主题配置 textOverflow: 'ellipsis', overflow:'hidden',</LabelBox>
          <Label>这是一段很长很长的文本</Label>
        </Theme>
        <Theme config={wordBreakClip}>
          <LabelBox>主题配置 textOverflow: 'clip', overflow:'hidden',</LabelBox>
          <Label>这是一段很长很长的文本</Label>
        </Theme>
        <Theme config={configBorder}>
          <LabelBox>主题配置 text: showPrefix : *</LabelBox>
          <Label>这是一段很长很长的文本</Label>
        </Theme>

        <br />
        <br />
        <LabelBox>无主题配置的 text: showPrefix : *</LabelBox>
        <Label text={'这是一段文本'} showPrefix prefix={'*'} />
        <br />
        <br />

        <Theme config={config}>
          <LabelBox>主题配置 text: showPrefix : *</LabelBox>
          <Label text={'这是一段文本'} showPrefix prefix={'*'} />

          <LabelBox>主题配置 text:</LabelBox>
          <Label text={'这是一段很长很长的文本'} />
          <LabelBox>主题配置 children:</LabelBox>
          <Label>这是一段很长很长的文本</Label>
        </Theme>
        <Theme config={configWidth}>
          <LabelBox>主题配置 click事件:</LabelBox>
          <Label text={'这是一段文本'} onClick={this.onClick} />
        </Theme>

        <LabelBox>默认文本 text:</LabelBox>
        <Label text={'这是一段文本'} />
        <LabelBox>默认文本 children:</LabelBox>
        <Label>这是一段文本</Label>
        <LabelBox>默认文本 无参数:</LabelBox>
        <Label />

        <LabelBox>text props中放多个空格</LabelBox>
        <Label text={'很多空格                       的文本'} />
        <br />
        <br />
        <br />
        <LabelBox>富文本:</LabelBox>
        <Label text={testHtml}></Label>
        <br />
        <br />
        <br />
      </div>
    );
  }
  onClick = () => {
    message.info('do Click', 1);
  };
}

export default LabelDemo;
