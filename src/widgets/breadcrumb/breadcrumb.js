/**
 *  create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import { cloneElement } from 'react';
import BreadcrumbItem from './breadcrumbItem';
import { getHrefs, replaceStr } from '../common/StringUtils';
import { BreadcrumbContainer, FlexContainer } from '../css/breadcrumb';
import Widget from '../consts/index';

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
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeConfig: Function,
  children: React.ChildrenArray<React.Element<any>>,
};

export type breadCrumbItemConfig = Array<Object>;

function isNotHref(target: Object) {
  return 'href' in target || 'path' in target;
}

function defaultRenderItem(
  breadCrumbItemConfig: breadCrumbItemConfig,
  separator: string | React.Element<any>,
  lastSeparator: string | React.Element<any>,
  itemTheme: Object
): Object {
  return breadCrumbItemConfig.map((item, index) => {
    const { href, title, isLast } = item;

    return (
      <BreadcrumbItem
        index={index}
        separator={isLast ? lastSeparator : separator}
        href={href}
        isLastItem={isLast}
        theme={itemTheme}
        count={breadCrumbItemConfig.length}
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
  static displayName = Widget.Breadcrumb;

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

    return routerConfig.map((item: Object, i: number, data: Object[]): Object => {
      const { title, href = hrefs[i] } = item;

      return {
        href: this.getRealityHrefs(href, param, item),
        title: replaceStr(title, param),
        isLast: i === data.length - 1,
      };
    });
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

  getItemTheme = () => {
    const { getPartOfThemeConfig } = this.props;
    const config = {
      BreadcrumbItem: getPartOfThemeConfig('BreadcrumbItem'),
    };
    return config;
  };

  render() {
    let crumbs;
    const {
      separator,
      lastSeparator,
      routes,
      params = {},
      renderItem = defaultRenderItem,
      children,
      getPartOfThemeProps,
    } = this.props;

    const wrapThemeProps = getPartOfThemeProps('Container');
    const itemTheme = this.getItemTheme();
    if (!routes && !children) {
      crumbs = [
        <BreadcrumbItem theme={itemTheme} index={0} count={4} separator={separator}>
          首页
        </BreadcrumbItem>,
        <BreadcrumbItem theme={itemTheme} index={1} count={4} separator={separator}>
          一级面包屑
        </BreadcrumbItem>,
        <BreadcrumbItem theme={itemTheme} index={2} count={4} separator={separator}>
          二级面包屑
        </BreadcrumbItem>,
        <BreadcrumbItem theme={itemTheme} index={3} count={4} separator={''} isLastItem>
          三级面包屑
        </BreadcrumbItem>,
      ];
    }

    if (routes && routes.length > 0) {
      const breadCrumbItemConfig = this.getBreadCrumbItemConfig(routes, params);
      return (
        <BreadcrumbContainer themeProps={wrapThemeProps}>
          <FlexContainer>
            {renderItem(breadCrumbItemConfig, separator, lastSeparator, itemTheme)}
          </FlexContainer>
        </BreadcrumbContainer>
      );
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
          index,
          separator: isLast ? lastSeparator : separator,
          isLastItem: isLast,
          href,
          key: index,
          theme: itemTheme,
          count: children.length,
        });
      });
    } else {
      children &&
        (crumbs = cloneElement(children, {
          separator: lastSeparator,
          isLastItem: true,
          index: 0,
          count: 1,
          key: 'one',
          theme: itemTheme,
        }));
    }
    return (
      <BreadcrumbContainer themeProps={wrapThemeProps}>
        <FlexContainer>{crumbs}</FlexContainer>
      </BreadcrumbContainer>
    );
  }
}
