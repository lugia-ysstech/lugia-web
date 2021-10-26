import React from 'react';
import Pagination from '../index';
import styled from 'styled-components';
const Wrapper = styled.div`
  height: 30px;
`;
export default class PaginationDemo extends React.Component {
  render() {
    return (
      <div>
        <Wrapper>快速跳转 大数据分页</Wrapper>
        <Pagination defaultCurrent={99999} total={10000000} simple />
        <br />
        <Wrapper>大数据分页</Wrapper>
        <Pagination defaultCurrent={99999} total={10000000} />
      </div>
    );
  }
}
