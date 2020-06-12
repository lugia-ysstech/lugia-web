/**
 *
 * create by guorg
 *
 * @flow
 */
import React from 'react';
import styled from 'styled-components';
import Pagination from './index';
import Widget from '../consts';
import Theme from '../theme';
import { getBorder } from '@lugia/theme-utils';
const Title = styled.p`
  margin: 0;
  padding: 20px;
`;

export default class PaginationDemo extends React.Component<any, any> {
  constructor() {
    super();
  }
  onShowSizeChange = obj => {
    const { current, pageSize } = obj;
    console.log(current, pageSize);
  };
  onChange(obj) {
    console.log(obj);
  }

  render() {
    return (
      <div>
        <Title> 配置 外观样式 基础分页。</Title>
        <Pagination defaultCurrent={2} total={500} />
        <Title> size="small"配置 外观样式 基础分页。</Title>
        <Pagination
          size="small"
          defaultCurrent={2}
          total={500}
          blockList={['Total', 'Page', 'PageInput', 'PageSize']}
        />
        <Title>size="default" 配置 外观样式 基础分页。</Title>
        <Pagination
          size="default"
          defaultCurrent={2}
          total={500}
          blockList={['Total', 'Page', 'PageInput', 'PageSize']}
        />
        <Title> size="large"配置 外观样式 基础分页。</Title>
        <Pagination
          size="large"
          defaultCurrent={2}
          total={500}
          blockList={['Total', 'Page', 'PageInput', 'PageSize']}
        />
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
        <Pagination
          showQuickJumper
          defaultCurrent={2}
          total={400}
          onChange={this.onChange}
          showSizeChanger={true}
          onShowSizeChange={this.onShowSizeChange}
        />
        <Title>总计数据在右边</Title>
        <Pagination
          isShowTotalData
          showQuickJumper
          defaultCurrent={2}
          total={400}
          onChange={this.onChange}
          showSizeChanger={true}
          onShowSizeChange={this.onShowSizeChange}
        />
        <Title>总计数据在左边</Title>
        <Pagination
          align={'Left'}
          blockList={['Total', 'Page', 'PageInput']}
          isShowTotalData
          showQuickJumper
          showSizeChanger
          defaultCurrent={2}
          total={400}
          onChange={this.onChange}
          onShowSizeChange={this.onShowSizeChange}
        />
        <Title>分页 设置为右对齐方式</Title>
        <Pagination
          align={'Right'}
          blockList={['Total', 'Page', 'PageInput']}
          isShowTotalData
          showQuickJumper
          showSizeChanger
          defaultCurrent={2}
          total={400}
          onChange={this.onChange}
          onShowSizeChange={this.onShowSizeChange}
        />
        <Title>简单的翻页。</Title>
        <Pagination simple defaultCurrent={2} total={500} />
        <Title>单页 不显示翻页箭头。</Title>
        <Pagination hideOnSinglePage defaultCurrent={2} total={200} />
      </div>
    );
  }
}
