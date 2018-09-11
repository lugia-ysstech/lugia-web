/**
 *  create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { cloneElement } from 'react';
import BreadcrumbItem from './breadcrumbItem';
import { ALink } from '../css/breadcrumb';

export type Route = {
  path: string,
  breadcrumbName: string,
};

export type RenderFunc = (
  route: any,
  params: any,
  routes: Array<any>,
  paths: Array<string>
) => React.Element<any>;

export type BreadcrumbProps = {
  routes?: Array<Route>,
  params?: any,
  separator?: any,
  renderItem?: RenderFunc,
  lastSeparator?: React.Element<any>,
  children?: React.Element<any>,
};

function getBreadcrumbName(route: Route, params: any) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  //将params中的参数加入到 name中
  const regExp = new RegExp(`:(${paramsKeys})`, 'g');
  const name = route.breadcrumbName.replace(
    regExp,
    (replacement, key) => params[key] || replacement
  );
  return name;
}

function defaultRenderItem(route: Route, params: any, routes: Array<Route>, paths: Array<string>) {
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);
  return isLastItem ? <span>{name}</span> : <ALink href={`#${paths.join('/')}`}>{name}</ALink>;
}

export default class Breadcrumb extends React.Component<BreadcrumbProps, any> {
  static defaultProps = {
    separator: '/',
    lastSeparator: '',
  };

  render() {
    let crumbs;
    const {
      separator,
      lastSeparator,
      routes,
      params = {},
      children,
      renderItem = defaultRenderItem,
    } = this.props;

    if (routes && routes.length > 0) {
      const paths = [];
      const len = routes.length - 1;
      crumbs = routes.map((route, index) => {
        let path = route.path || '';
        if (path) {
          path = path.replace(/^\//, '');
          // 将params中的参数添加到 path中
          Object.keys(params).forEach(key => {
            path = path.replace(`:${key}`, params[key]);
          });
          paths.push(path);
        }

        const isLast = index === len;
        return (
          <BreadcrumbItem
            separator={isLast ? lastSeparator : separator}
            isLastItem={isLast ? true : false}
            key={route.breadcrumbName || path}
          >
            {renderItem(route, params, routes, paths)}
          </BreadcrumbItem>
        );
      });
    } else if (children) {
      const len = children.length - 1;
      crumbs = React.Children.map(children, (element: any, index) => {
        if (!element) {
          return null;
        }

        const isLast = index === len;
        return cloneElement(element, {
          separator: isLast ? lastSeparator : separator,
          isLastItem: isLast ? true : false,
          key: index,
        });
      });
    }

    return <div>{crumbs}</div>;
  }
}
