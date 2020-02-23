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
import { addMouseEvent } from '@lugia/theme-hoc';

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

  getPrefixIcon() {
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
        {...this.props.dispatchEvent([['hover'], ['active']], 'f2c')}
        singleTheme
        viewClass={viewClass}
        theme={theme}
      />
    );
  }

  getSuffixIcon() {
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
        {...this.props.dispatchEvent([['hover'], ['active']], 'f2c')}
        singleTheme
        viewClass={viewClass}
        theme={theme}
      />
    );
  }

  getIconTheme = (iconType: string) => {
    const { index, count } = this.props;
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(iconType);

    theme[viewClass] = this.props.getPartOfThemeProps(iconType, {
      selector: { index, count },
    }).themeConfig;
    const marginLeft = iconType === 'SuffixIcon' ? 3 : 0;
    const marginRight = iconType === 'PrefixIcon' ? 3 : 0;
    const defaultTheme = {
      normal: {
        margin: {
          left: marginLeft,
          right: marginRight,
        },
        getCSS: () => {
          return `
          transition: all 0.3s
          `;
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

    return (
      <ItemWrap
        themeProps={getPartOfThemeProps('ItemWrap', { selector: { index, count } })}
        {...addMouseEvent(this)}
      >
        <FlexBox themeProps={getPartOfThemeProps('ItemWrap', { selector: { index, count } })}>
          <Link
            href={href}
            themeProps={getPartOfThemeProps('Text', {
              selector: { index, count },
              props: { isLastItem },
            })}
          >
            {this.getPrefixIcon()}
            {children}
            {this.getSuffixIcon()}
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
