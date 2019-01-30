/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Logo from './empty.png';
import { px2emcss } from '../css/units';
import { FontSizeNumber } from '../css';
import Widget from '../consts/index';
import styled from 'styled-components';
const em = px2emcss(FontSizeNumber);

const getEmptyContainerWidth = props => {
  const { width } = props;
  return `width: ${width ? em(width) : em(180)}`;
};

const EmptyContainer = styled.div`
  ${getEmptyContainerWidth};
  margin: 10px;
  padding: ${em(32)} 0;
  box-sizing: border-box;
`;

const EmptyWrap = styled.div`
  height: ${em(70)};
  background-image: url(${Logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto ${em(70)};
  width: 100%;
`;

const TextWrap = styled.div`
  text-align: center;
  font-size: ${em(12)};
  color: #ccc;
  margin-top: ${em(8)};
`;
export default class Empty extends React.Component<any, any> {
  static displayName = Widget.Empty;

  static defaultProps = {
    getTheme: () => {
      return {};
    },
  };

  render() {
    const { getTheme } = this.props;
    const { width } = getTheme();
    return (
      <EmptyContainer width={width}>
        <EmptyWrap />
        <TextWrap>暂无数据</TextWrap>
      </EmptyContainer>
    );
  }
}
