/**
 *@flow
 * create by shine
 *
 */

import React from 'react';
import RichText from './';
import { css, StaticComponent } from '@lugia/theme-css-hoc';
import message from '../message';
import Theme from '../theme';
import Widget from '../consts';
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

class RichTextDemo extends React.Component<PropsType, StateType> {
  onClick = () => {
    message.info('do Click', 1);
  };

  render() {
    const configBorder = {
      [Widget.RichText]: {
        Container: {
          normal: {
            width: 300,
            height: 120,
            padding: 20,
            boxShadow: getBoxShadow('3px 3px 5px #87A0FF'),
            border: getBorder({ color: '#ffb282', width: 2, style: 'solid' }),
            borderRadius: getBorderRadius(20),
          },
        },
      },
    };
    return (
      <div>
        <br />
        <br />
        <br />
        <LabelBox>富文本:</LabelBox>
        <Theme config={configBorder}>
          <RichText text={testHtml} onClick={this.onClick} title={'this is rich text'} />
        </Theme>
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

export default RichTextDemo;
