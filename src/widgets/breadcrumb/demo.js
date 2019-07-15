import * as React from 'react';
import Breadcrumb from './index';
import styled from 'styled-components';
import Widget from '../consts/index';
import Icon from '../icon';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';

const Hr = styled.div`
  height: 2px;
  background: orange;
`;

const CommonIcon: Object = styled(Icon)`
  border-radius: 50%;
`;

const routes = [
  {
    path: 'index',
    title: '首页',
  },
  {
    path: 'first',
    title: '一级面包屑',
  },
  {
    path: 'second:id',
    title: '二级面包屑:id',
  },
  {
    path: 'third',
    title: '当前页面',
  },
];

export default class Demo extends React.Component<any, any> {
  render() {
    const config = {
      [Widget.Breadcrumb]: {
        BreadcrumbWrap: {
          normal: {
            width: 800,
            // height: 200,
            padding: {
              left: 10,
            },
            margin: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            },
            background: {
              color: '#000',
            },
            boxShadow: getBoxShadow('2px 2px 5px 5px #9C2D6E'),
            border: getBorder({ color: '#9C2D6E', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(20),
          },
          hover: {
            background: {
              color: '#9C2D6E',
            },
            boxShadow: getBoxShadow('2px 2px 5px 5px #9C2D6E'),
            border: getBorder({ color: '#9C2D6E', width: 1, style: 'solid' }),
            borderRadius: getBorderRadius(10),
          },
        },
        BreadcrumbItem: {
          ItemWrap: {
            normal: {
              color: '#4d63ff',
              width: 150,
              padding: {
                left: 10,
              },
            },
          },

          Text: {
            normal: {
              color: '#ccc',
              // fontSize: 20,
            },
            hover: {
              color: '#fff',
              fontSize: 20,
            },
          },

          Separator: {
            normal: {
              color: '#666',
              fontSize: 20,
            },
          },
        },
      },
    };

    return (
      <div>
        <Hr />
        {/*Breadcrumb 和 Breadcrumb.Item配合使用，使用href属性时，可跳转 */}
        <Breadcrumb separator={'>'} theme={config}>
          <Breadcrumb.Item href="a">主页</Breadcrumb.Item>
          <Breadcrumb.Item href="b">一级菜单</Breadcrumb.Item>
          <Breadcrumb.Item href="c">二级菜单</Breadcrumb.Item>
        </Breadcrumb>
        <Hr />
        <Breadcrumb separator={'>'} theme={config}>
          <Breadcrumb.Item path="/index">主页</Breadcrumb.Item>
          <Breadcrumb.Item path="two">一级菜单</Breadcrumb.Item>
          <Breadcrumb.Item path="/index">二级菜单</Breadcrumb.Item>
          <Breadcrumb.Item href="d">三级菜单</Breadcrumb.Item>
        </Breadcrumb>
        <Hr />
        {/* 传入routes路由属性，使用默认的 renderItem函数,生成面包屑组件 */}
        <Breadcrumb theme={config} separator={'>'} params={{ id: 1 }} routes={routes} />
        <Hr />
        {/* 传入Icon图标 */}
        <Breadcrumb theme={config}>
          <Breadcrumb.Item href="">
            <CommonIcon iconClass="lugia-icon-logo_chrome" type="home" />
            <span>一级面包屑菜单 </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>二级面包屑菜单</span>
            <CommonIcon iconClass="lugia-icon-financial_smile" type="user" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>二级面包屑菜单</span>
            <CommonIcon iconClass="lugia-icon-logo_apple" type="user" />
          </Breadcrumb.Item>
        </Breadcrumb>
        <Hr />
        <Breadcrumb theme={config} separator={undefined} params={{ id: 1 }} routes={routes} />
      </div>
    );
  }
}
