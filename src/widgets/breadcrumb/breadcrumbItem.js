/**
 * create by szfeng
 *
 * @flow
 */

import * as React from 'react';
import ThemeHoc from '@lugia/theme-hoc';
import { ALink, CommonSpan, SeparatorSpan, ItemWrap } from '../css/breadcrumb';

export type BreadcrumbItemProps = {
  separator?: string | React.Element<any>,
  href?: string,
  isLastItem?: boolean,
  children: React.Node,
  lastSeparator?: string | React.Element<any>,
  textThemeHoc: Object,
  separatorThemeProps: Object,
  getPartOfThemeProps: Function,
};

class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static defaultProps = {
    separator: '/',
  };

  render() {
    const {
      separator,
      children,
      getPartOfThemeProps,
      // isLastItem,
      href,
    } = this.props;
    let Link = CommonSpan;
    if ('href' in this.props) {
      Link = ALink;
    }

    return (
      <ItemWrap themeProps={getPartOfThemeProps('ItemWrap')}>
        <Link href={href} themeProps={getPartOfThemeProps('Text')}>
          {children}
        </Link>
        <SeparatorSpan themeProps={getPartOfThemeProps('Separator')}>{separator}</SeparatorSpan>
      </ItemWrap>
    );
  }
}
export default ThemeHoc(BreadcrumbItem, 'BreadcrumbItem', { hover: true });
