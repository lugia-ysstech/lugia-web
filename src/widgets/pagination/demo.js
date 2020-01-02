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
  onShowSizeChange = (current: number, pageSize: number) => {
    console.log(current, pageSize);
  };
  onChange(pageNumber: number, pageSize: number) {
    console.log('Page: ', pageNumber);
  }

  render() {
    const themeConfig = {
      [Widget.Pagination]: {
        PaginationContainer: {
          normal: { width: 1000, height: 50 },
        },
        PaginationListItem: {
          hover: {
            color: 'red',
            border: getBorder({ color: 'red', width: 1, style: 'solid' }),
          },
          focus: {
            fontSize: 20,
            color: 'yellow',
            border: getBorder({ color: 'yellow', width: 1, style: 'solid' }),
          },
        },
        PaginationQuickJumpContainer: {
          normal: {
            margin: {
              left: 30,
              right: 30,
            },
          },
        },
        PaginationTotalContainer: {
          normal: {
            margin: {
              left: 20,
              right: 20,
            },
          },
        },
      },
    };

    return (
      <div>
        <Theme config={themeConfig}>
          <Title> 配置 外观样式 基础分页。</Title>
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
          <Pagination
            isShowTotalData
            showQuickJumper
            defaultCurrent={2}
            total={400}
            onChange={this.onChange}
            showSizeChanger={true}
            onShowSizeChange={this.onShowSizeChange}
          />
          <Title>简单的翻页。</Title>
          <Pagination simple defaultCurrent={2} total={500} />
          <Title>单页 不显示翻页箭头。</Title>
          <Pagination hideOnSinglePage defaultCurrent={2} total={200} />
        </Theme>
      </div>
    );
  }
}
