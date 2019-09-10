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
          normal: {
            width: 40,
            height: 40,
            lineHeight: 40,
          },
          hover: {
            width: 40,
            height: 40,
            lineHeight: 40,
            border: getBorder({ color: 'red', width: 1, style: 'solid' }),
          },
        },
        PaginationInnerText: {
          normal: {
            fontSize: 20,
          },
          hover: {
            color: 'red',
          },
        },
        ChangePageIcon: {
          hover: {
            color: 'red',
          },
        },
        QuickJumpInput: {
          Container: {
            normal: {
              width: 100,
              height: 40,
            },
          },
          Input: {
            normal: {
              color: '4d63ff',
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
          <Pagination showQuickJumper defaultCurrent={2} total={400} onChange={this.onChange} />
          <Title>简单的翻页。</Title>
          <Pagination simple defaultCurrent={2} total={500} />
          <Title>单页 不显示翻页箭头。</Title>
          <Pagination hideOnSinglePage defaultCurrent={2} total={200} />
        </Theme>
      </div>
    );
  }
}
