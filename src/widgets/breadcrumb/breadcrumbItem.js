/**
 * create by szfeng
 *
 * @flow
 */

import * as React from 'react';

import { CommonSpan, SeparatorSpan, ALink } from '../css/breadcrumb';

export type BreadcrumbItemProps = {
  separator?: any,
  href?: string,
  isLastItem?: boolean,
  children: any,
  lastSeparator: any,
};

export default class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static defaultProps = {
    separator: '/',
  };

  render() {
    const { separator, children, ...restProps } = this.props;
    let link;
    if ('href' in this.props) {
      link = <ALink {...restProps}>{children}</ALink>;
    } else {
      link = <CommonSpan {...restProps}>{children}</CommonSpan>;
    }
    if (children) {
      return (
        <span>
          {link}
          <SeparatorSpan {...restProps}>{separator}</SeparatorSpan>
        </span>
      );
    }
    return null;
  }
}
