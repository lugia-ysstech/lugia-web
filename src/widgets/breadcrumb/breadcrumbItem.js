/**
 * create by szfeng
 *
 * @flow
 */

import * as React from 'react';
import styled from 'styled-components';
import {
  DefaultColor,
  HoverDefaultColor,
  FontWeight,
  FontSize,
  separatorMarginLeft,
  separatorMarginRight,
} from '../css/breadcrumb';

export type BreadcrumbItemProps = {
  separator?: any,
  href?: string,
  lastItem?: boolean,
  children: any,
  lastSeparator: any,
};

function getColor(props: BreadcrumbItemProps) {
  const { lastItem } = props;
  return `color: ${lastItem ? HoverDefaultColor : DefaultColor}`;
}

export const Span = styled.span`
  font-weight: ${FontWeight};
  font-size: ${FontSize};
`;

export const ItemSpan = Span.extend`
  ${getColor};
  cursor: pointer;
  &:hover {
    color: ${HoverDefaultColor};
  }
`;
export const SeparatorSpan = Span.extend`
  margin-left: ${separatorMarginLeft};
  margin-right: ${separatorMarginRight};
  color: ${DefaultColor};
`;

export const ALink = styled.a`
  ${getColor};
  font-weight: ${FontWeight};
  font-size: ${FontSize};
  text-decoration: none;
  &:hover {
    color: ${HoverDefaultColor};
  }
`;

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
      link = <Span {...restProps}>{children}</Span>;
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
