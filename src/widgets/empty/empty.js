/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';
import styled from 'styled-components';
import { px2remcss } from '../css/units';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import empty from './empty.png';

export const EmptyContainer = CSSComponent({
  tag: 'div',
  className: 'EmptyContainer',
  normal: {
    selectNames: [['width'], ['height'], ['background'], ['opacity'], ['borderRadius']],
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
    align-items: center;
    height: 100%;
    width: 100%;
    transition: all 0.3s;
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
    const { getPartOfThemeProps } = this.props;
    return (
      <EmptyContainer themeProps={getPartOfThemeProps('Container')}>
        <Img>
          <img src={empty} />
        </Img>
        <TextWrap>暂无数据</TextWrap>
      </EmptyContainer>
    );
  }
}
