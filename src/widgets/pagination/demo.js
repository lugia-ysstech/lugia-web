/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import Pagination from './index';

const Title = styled.p`
  margin: 0;
  padding: 20px;
`;

export default class PaginationDemo extends React.Component<any, any> {
  constructor() {
    super();
  }
  onShowSizeChange = (current: number, pageSize: number) => {
    console.log(current, pageSize);
  };
  onChange(pageNumber: number, pageSize: number) {
    console.log('Page: ', pageNumber);
  }
  render() {
    return (
      <div>
        <Title>基础分页。</Title>
        <Pagination defaultCurrent={2} total={500} />
        <Title>基础分页。受限</Title>
        <Pagination current={3} total={500} />
        <Title>更多分页。</Title>
        <Pagination defaultCurrent={6} total={500} />
        <Title>改变每页显示条目数。</Title>
        <Pagination
          showSizeChanger={true}
          onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={3}
          total={500}
        />
        <Title>快速跳转到某一页。</Title>
        <Pagination showQuickJumper defaultCurrent={2} total={400} onChange={this.onChange} />
        <Title>简单的翻页。</Title>
        <Pagination simple defaultCurrent={2} total={500} />
        <Title>单页 不显示翻页箭头。</Title>
        <Pagination hideOnSinglePage defaultCurrent={2} total={200} />
      </div>
    );
  }
}
