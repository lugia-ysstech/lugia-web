/**
 * create by szfeng
 *
 * @flow
 */

import * as React from 'react';

import { ALink, CommonSpan, SeparatorSpan } from '../css/breadcrumb';

export type BreadcrumbItemProps = {
  separator?: string | React.Element<any>,
  href?: string,
  isLastItem?: boolean,
  children: React.Node,
  lastSeparator?: string | React.Element<any>,
};

export default class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static defaultProps = {
    separator: '/',
  };

  render() {
    const { separator, children, isLastItem, href } = this.props;
    let Link = CommonSpan;
    if ('href' in this.props) {
      Link = ALink;
    }
    const config = { isLastItem, href };
    return [
      <Link {...config}>{children}</Link>,
      <SeparatorSpan {...config}>{separator}</SeparatorSpan>,
    ];
  }
}
