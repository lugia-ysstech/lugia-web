/**
 * create by szfeng
 *
 * @flow
 */

import * as React from 'react';
import ThemeHoc from '@lugia/theme-hoc';
import { ALink, CommonSpan, SeparatorSpan, ItemWrap, FlexBox } from '../css/breadcrumb';

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
    const { separator, children, getPartOfThemeProps, isLastItem, href, index, count } = this.props;
    let Link = CommonSpan;
    if ('href' in this.props) {
      Link = ALink;
    }
    return (
      <ItemWrap themeProps={getPartOfThemeProps('ItemWrap', { selector: { index, count } })}>
        <FlexBox themeProps={getPartOfThemeProps('ItemWrap', { selector: { index, count } })}>
          <Link
            href={href}
            themeProps={getPartOfThemeProps('Text', {
              selector: { index, count },
              props: { isLastItem },
            })}
          >
            {children}
          </Link>
          <SeparatorSpan
            themeProps={getPartOfThemeProps('Separator', {
              selector: { index, count },
              props: { isLastItem },
            })}
          >
            {separator}
          </SeparatorSpan>
        </FlexBox>
      </ItemWrap>
    );
  }
}
export default ThemeHoc(BreadcrumbItem, 'BreadcrumbItem', { hover: true });
