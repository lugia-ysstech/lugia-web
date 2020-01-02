/**
 * create by szfeng
 *
 * @flow
 */

import * as React from 'react';
import ThemeHoc from '@lugia/theme-hoc';
import { ALink, CommonSpan, SeparatorSpan, ItemWrap, FlexBox } from '../css/breadcrumb';
import Icon from '../icon';
import { deepMerge } from '@lugia/object-utils';
export type BreadcrumbItemProps = {
  separator?: string | React.Element<any>,
  href?: string,
  isLastItem?: boolean,
  children: React.Node,
  lastSeparator?: string | React.Element<any>,
  textThemeHoc: Object,
  separatorThemeProps: Object,
  getPartOfThemeProps: Function,
  index: number,
  count: number,
  icons: Object,
};

class BreadcrumbItem extends React.Component<BreadcrumbItemProps, any> {
  static defaultProps = {
    separator: '/',
  };

  getPrefixIcon(channel: Object) {
    const { icons = {} } = this.props;
    if (!icons) {
      return null;
    }
    const { prefixIconClass } = icons;
    if (!prefixIconClass) {
      return null;
    }
    const { viewClass, theme } = this.getIconTheme('PrefixIcon');

    return (
      <Icon
        iconClass={prefixIconClass}
        lugiaConsumers={channel.consumer}
        singleTheme
        viewClass={viewClass}
        theme={theme}
      />
    );
  }

  getSuffixIcon(channel: Object) {
    const { icons = {} } = this.props;
    if (!icons) {
      return null;
    }
    const { suffixIconClass } = icons;

    if (!suffixIconClass) {
      return null;
    }

    const { viewClass, theme } = this.getIconTheme('SuffixIcon');

    return (
      <Icon
        iconClass={suffixIconClass}
        lugiaConsumers={channel.consumer}
        singleTheme
        viewClass={viewClass}
        theme={theme}
      />
    );
  }

  getIconTheme = (iconType: string) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(iconType);
    const marginLeft = iconType === 'SuffixIcon' ? 3 : 0;
    const marginRight = iconType === 'PrefixIcon' ? 3 : 0;
    const defaultTheme = {
      normal: {
        margin: {
          left: marginLeft,
          right: marginRight,
        },
      },
    };

    return {
      viewClass,
      theme: deepMerge(
        {
          [viewClass]: { ...defaultTheme },
        },
        theme
      ),
    };
  };

  render() {
    const { separator, children, getPartOfThemeProps, isLastItem, href, index, count } = this.props;
    let Link = CommonSpan;
    if ('href' in this.props) {
      Link = ALink;
    }
    const channel = this.props.createEventChannel(['active', 'hover']);

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
            {this.getPrefixIcon(channel)}
            {children}
            {this.getSuffixIcon(channel)}
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
