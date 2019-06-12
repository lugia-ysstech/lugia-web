import React from 'react';

import Breadcrumb from '../';
import InnerBreadcrumb from '../breadcrumb';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import Icon from '../../icon';

Enzyme.configure({ adapter: new Adapter() });

const routes = [
  {
    path: 'index',
    breadcrumbName: '首页',
  },
  {
    path: 'first',
    breadcrumbName: '一级面包屑',
  },
  {
    path: 'second',
    breadcrumbName: '二级面包屑',
  },
  {
    path: 'third',
    breadcrumbName: '当前页面',
  },
];

describe('Breadcrumb', () => {
  it('<Breadcrumb>和<Breadcrumn.Item>配合使用', () => {
    expect(
      renderer
        .create(
          <Breadcrumb>
            <Breadcrumb.Item>主页</Breadcrumb.Item>
            <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
            <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
          </Breadcrumb>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('<Breadcrumb> 中separator分隔符', () => {
    expect(
      renderer
        .create(
          <Breadcrumb separator={'>'}>
            <Breadcrumb.Item>主页</Breadcrumb.Item>
            <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
            <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
          </Breadcrumb>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('<Breadcrumb> 中传入图标', () => {
    expect(
      renderer
        .create(
          <Breadcrumb separator={'>'}>
            <Breadcrumb.Item>
              <Icon iconClass="lugia-icon-reminder_close_circle_o" type="home" />
              <span>主页</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>一级面包屑菜单</span>
              <Icon iconClass="lugia-icon-reminder_close_circle_o" type="home" />
            </Breadcrumb.Item>
          </Breadcrumb>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('<Breadcrumb.Item> 中传入href属性，文字变成超链接', () => {
    expect(
      renderer
        .create(
          <Breadcrumb separator={'>'}>
            <Breadcrumb.Item href="">主页</Breadcrumb.Item>
            <Breadcrumb.Item href="">一级菜单</Breadcrumb.Item>
            <Breadcrumb.Item href="">二级菜单</Breadcrumb.Item>
          </Breadcrumb>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it('<Breadcrumb> 传入routes参数直接生成 面包屑', () => {
    expect(
      renderer.create(<Breadcrumb separator={'>'} routes={routes} />).toJSON()
    ).toMatchSnapshot();
  });

  it('最后一项也显示分隔符, lastSeparator', () => {
    expect(
      renderer.create(<Breadcrumb separator={'>'} lastSeparator={'>'} routes={routes} />).toJSON()
    ).toMatchSnapshot();
  });

  it('Breadcrumb.prototype.getBreadCrumbItemConfig only href', () => {
    expect(
      InnerBreadcrumb.prototype.getBreadCrumbItemConfig([
        {
          href: 'index',
          title: '首页',
        },
        {
          href: 'first',
          title: '一级面包屑',
        },
        {
          href: 'second:id',
          title: '二级面包屑',
        },
        {
          href: 'third',
          title: '当前页面',
        },
      ])
    ).toEqual([
      {
        title: '首页',
        isLast: false,
        href: '/index',
      },
      {
        href: '/first',
        isLast: false,
        title: '一级面包屑',
      },
      {
        isLast: false,
        href: '/second:id',
        title: '二级面包屑',
      },
      {
        href: '/third',
        title: '当前页面',
        isLast: true,
      },
    ]);
  });
  it('Breadcrumb.prototype.getBreadCrumbItemConfig only path', () => {
    expect(
      InnerBreadcrumb.prototype.getBreadCrumbItemConfig([
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
          title: '二级面包屑',
        },
        {
          path: 'third',
          title: '当前页面',
        },
      ])
    ).toEqual([
      {
        title: '首页',
        isLast: false,
        href: '/index',
      },
      {
        href: '/index/first',
        isLast: false,
        title: '一级面包屑',
      },
      {
        isLast: false,
        href: '/index/first/second:id',
        title: '二级面包屑',
      },
      {
        href: '/index/first/second:id/third',
        title: '当前页面',
        isLast: true,
      },
    ]);
  });
  it('Breadcrumb.prototype.getBreadCrumbItemConfig path & href', () => {
    expect(
      InnerBreadcrumb.prototype.getBreadCrumbItemConfig([
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
          title: '二级面包屑',
          href: 'hello',
        },
        {
          path: 'third',
          title: '当前页面',
        },
      ])
    ).toEqual([
      {
        title: '首页',
        href: '/index',
        isLast: false,
      },
      {
        href: '/index/first',
        title: '一级面包屑',
        isLast: false,
      },
      {
        href: '/hello',
        title: '二级面包屑',
        isLast: false,
      },
      {
        href: '/index/first/second:id/third',
        title: '当前页面',
        isLast: true,
      },
    ]);
  });

  it('Breadcrumb.prototype.getBreadCrumbItemConfig only href', () => {
    expect(
      InnerBreadcrumb.prototype.getBreadCrumbItemConfig(
        [
          {
            href: 'index/:name',
            title: '首页:name',
          },
          {
            href: 'first',
            title: '一级面包屑',
          },
          {
            href: 'second/:id',
            title: '二级面包屑',
          },
          {
            href: 'third',
            title: '当前页面',
          },
        ],
        { id: '1', name: 'ligx' }
      )
    ).toEqual([
      {
        title: '首页ligx',
        isLast: false,
        href: '/index/ligx',
      },
      {
        href: '/first',
        isLast: false,
        title: '一级面包屑',
      },
      {
        isLast: false,
        href: '/second/1',
        title: '二级面包屑',
      },
      {
        href: '/third',
        title: '当前页面',
        isLast: true,
      },
    ]);
  });

  it('Breadcrumb.prototype.getBreadCrumbItemConfig no path & no href', () => {
    expect(
      InnerBreadcrumb.prototype.getBreadCrumbItemConfig([
        {
          path: 'index',
          title: '首页',
        },
        {
          title: '一级面包屑',
        },
        {
          path: 'second:id',
          title: '二级面包屑',
          href: 'hello',
        },
        {
          path: 'third',
          title: '当前页面',
        },
      ])
    ).toEqual([
      {
        title: '首页',
        href: '/index',
        isLast: false,
      },
      {
        href: undefined,
        title: '一级面包屑',
        isLast: false,
      },
      {
        href: '/hello',
        title: '二级面包屑',
        isLast: false,
      },
      {
        href: '/index/second:id/third',
        title: '当前页面',
        isLast: true,
      },
    ]);
  });
});
