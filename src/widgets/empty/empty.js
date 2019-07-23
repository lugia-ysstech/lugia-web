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

const getEmptyContainerWidth = props => {
  const { width } = props;
  return `width: ${width ? px2remcss(width) : px2remcss(200)}`;
};

const EmptyContainer = styled.div`
  ${getEmptyContainerWidth};
  height: ${px2remcss(250)};
  padding-top: ${px2remcss(80)};
  box-sizing: border-box;
  border-radius: 4px;
  background: #fff;
  user-select: none;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
`;

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

  static defaultProps = {
    getTheme: () => {
      return {};
    },
  };

  render() {
    const { width } = this.props;
    return (
      <EmptyContainer width={width}>
        <Img>
          <img src={logo} />
        </Img>
        <TextWrap>暂无数据</TextWrap>
      </EmptyContainer>
    );
  }
}
