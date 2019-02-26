/**
 *  create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { cloneElement } from 'react';
import BreadcrumbItem from './breadcrumbItem';
import { getHrefs, replaceStr } from '../common/StringUtils';
import { BreadcrumbContainer } from '../css/breadcrumb';

export type Route = {
  path: string,
  title: string,
};

export type RenderFunc = (
  route: Object[],
  separator: string | React.Element<any>,
  lastSeparator: string | React.Element<any>
) => React.Element<any>;

export type BreadcrumbProps = {
  routes?: Array<Route>,
  params?: Object,
  separator: string | React.Element<any>,
  renderItem?: RenderFunc,
  lastSeparator: string | React.Element<any>,
  children: React.ChildrenArray<React.Element<any>>,
};

export type breadCrumbItemConfig = Array<Object>;

function isNotHref(target: Object) {
  return 'href' in target || 'path' in target;
}

function defaultRenderItem(
  breadCrumbItemConfig: breadCrumbItemConfig,
  separator: string | React.Element<any>,
  lastSeparator: string | React.Element<any>
): Object {
  return breadCrumbItemConfig.map(item => {
    const { href, title, isLast } = item;

    return (
      <BreadcrumbItem
        separator={isLast ? lastSeparator : separator}
        href={href}
        isLastItem={isLast}
      >
        {title}
      </BreadcrumbItem>
    );
  });
}

export default class Breadcrumb extends React.Component<BreadcrumbProps, any> {
  static defaultProps = {
    separator: '/',
    lastSeparator: '',
  };
  static Item = BreadcrumbItem;

  getRealityHrefs(href: string, param: Object, item: Object): string | void {
    if (!isNotHref(item)) {
      return undefined;
    }

    let newHref = href[0] === '/' ? href : '/' + href;
    newHref = replaceStr(newHref, param);
    return newHref;
  }

  getBreadCrumbItemConfig(routerConfig: Object[], param?: Object = {}): Object[] {
    const paths = routerConfig.map(({ path }) => path);
    const hrefs = getHrefs(paths);

    return routerConfig.map(
      (item: Object, i: number, data: Object[]): Object => {
        const { title, href = hrefs[i] } = item;

        return {
          href: this.getRealityHrefs(href, param, item),
          title: replaceStr(title, param),
          isLast: i === data.length - 1,
        };
      }
    );
  }

  getChildConfig(children: React.ChildrenArray<React.Element<any>>) {
    const result = [];
    children &&
      React.Children.forEach(children, item => {
        const props = item ? item.props : {};
        result.push(props ? props : {});
      });
    return result;
  }

  render() {
    let crumbs;
    const {
      separator,
      lastSeparator,
      routes,
      params = {},
      renderItem = defaultRenderItem,
      children,
    } = this.props;

    if (!routes && !children) {
      crumbs = [
        <BreadcrumbItem separator={separator}>首页</BreadcrumbItem>,
        <BreadcrumbItem separator={separator}>一级面包屑</BreadcrumbItem>,
        <BreadcrumbItem separator={separator}>二级面包屑</BreadcrumbItem>,
        <BreadcrumbItem separator={''} isLastItem>
          三级面包屑
        </BreadcrumbItem>,
      ];
    }

    if (routes && routes.length > 0) {
      const breadCrumbItemConfig = this.getBreadCrumbItemConfig(routes, params);

      return renderItem(breadCrumbItemConfig, separator, lastSeparator);
    }

    if (Array.isArray(children)) {
      const childConfig = this.getChildConfig(children);
      const childrenPro = this.getBreadCrumbItemConfig(childConfig, params);

      crumbs = React.Children.map(children, (element: any, index) => {
        if (!element) {
          return null;
        }
        const { isLast, href } = childrenPro[index];

        return cloneElement(element, {
          separator: isLast ? lastSeparator : separator,
          isLastItem: isLast,
          href,
          key: index,
        });
      });
    } else {
      children &&
        (crumbs = cloneElement(children, {
          separator: lastSeparator,
          isLastItem: true,
          key: 'one',
        }));
    }
    return <BreadcrumbContainer>{crumbs}</BreadcrumbContainer>;
  }
}
