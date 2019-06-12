/**
 * create by szfeng
 *
 * @flow
 */

import * as React from 'react';
import ThemeHoc from '@lugia/theme-hoc';
import { ALink, CommonSpan, SeparatorSpan } from '../css/breadcrumb';

export type BreadcrumbItemProps = {
  separator?: string | React.Element<any>,
  href?: string,
  isLastItem?: boolean,
  children: React.Node,
  lastSeparator?: string | React.Element<any>,
  textThemeHoc: Object,
  separatorThemeProps: Object,
};

class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static defaultProps = {
    separator: '/',
  };

  render() {
    const { separator, children, isLastItem, href, textThemeHoc, separatorThemeProps } = this.props;

    let Link = CommonSpan;
    if ('href' in this.props) {
      Link = ALink;
    }

    const { theme, viewClass } = textThemeHoc;

    return [
      <Link href={href} theme={theme} viewClass={viewClass}>
        {children}
      </Link>,
      <SeparatorSpan themeProps={separatorThemeProps}>{separator}</SeparatorSpan>,
    ];
  }
}

export default BreadcrumbItem;
