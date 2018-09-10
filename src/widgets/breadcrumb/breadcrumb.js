import * as React from 'react';
import { cloneElement } from 'react';
import BreadcrumbItem from './breadcrumbItem';
import { DefaultColor, HoverDefaultColor } from '../css/breadcrumb';
import styled from 'styled-components';

export const A = styled.a`
  color: ${DefaultColor};
  text-decoration: none;
  &:hover {
    color: ${HoverDefaultColor};
  }
`;

export type Route = {
  path: string,
  breadcrumbName: string,
};

export type BreadcrumbProps = {
  routes?: Array<Route>,
  params?: any,
  separator?: React.ReactNode,
  renderItem?: (
    route: any,
    params: any,
    routes: Array<any>,
    paths: Array<string>
  ) => React.ReactNode,
  className?: string,
  lastSeparator?: any,
};

function getBreadcrumbName(route: Route, params: any) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => params[key] || replacement
  );
  return name;
}

function defaultRenderItem(route: Route, params: any, routes: Array<Route>, paths: Array<string>) {
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);
  return isLastItem ? <span>{name}</span> : <A href={`#/${paths.join('/')}`}>{name}</A>;
}

export default class Breadcrumb extends React.Component<BreadcrumbProps, any> {
  static defaultProps = {
    separator: '/',
    lastSeparator: '',
    lastItem: true,
  };

  render() {
    let crumbs;
    const {
      separator,
      lastSeparator,
      lastItem,
      routes,
      params = {},
      children,
      renderItem = defaultRenderItem,
    } = this.props;

    if (routes && routes.length > 0) {
      const paths = [];
      const len = routes.length - 1;
      crumbs = routes.map((route, index) => {
        route.path = route.path || '';
        let path = route.path.replace(/^\//, '');
        Object.keys(params).forEach(key => {
          path = path.replace(`:${key}`, params[key]);
        });
        if (path) {
          paths.push(path);
        }

        return (
          <BreadcrumbItem
            separator={index === len ? lastSeparator : separator}
            lastItem={index === len ? lastItem : false}
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
          return element;
        }

        return cloneElement(element, {
          separator: index === len ? lastSeparator : separator,
          lastItem: index === len ? true : false,
          key: index,
        });
      });
    }

    return <div>{crumbs}</div>;
  }
}
