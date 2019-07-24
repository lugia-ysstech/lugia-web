/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';
import styled from 'styled-components';
import logo from './empty.png';
import { px2remcss } from '../css/units';
import CSSComponent, { css } from '@lugia/theme-css-hoc';

export const EmptyContainer = CSSComponent({
  tag: 'div',
  className: 'EmptyContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['opacity'],
      ['border'],
      ['boxShadow'],
      ['borderRadius'],
    ],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: ${px2remcss(250)};
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  `,
});

const Img = styled.div`
  width: 100%;
  height: ${px2remcss(80)};
  text-align: center;
  & > img {
    height: 100%;
  }
`;

const TextWrap = styled.div`
  text-align: center;
  font-size: ${px2remcss(12)};
  color: #ccc;
  margin-top: ${px2remcss(8)};
`;
export default class Empty extends React.Component<any, any> {
  static displayName = Widget.Empty;

  render() {
    const { themeProps } = this.props;
    return (
      <EmptyContainer themeProps={themeProps}>
        <Img>
          <img src={logo} />
        </Img>
        <TextWrap>暂无数据</TextWrap>
      </EmptyContainer>
    );
  }
}
