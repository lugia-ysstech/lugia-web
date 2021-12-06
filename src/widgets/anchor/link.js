/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { AnchorContext } from './anchor';
import type { AnchorLinkProps, AnchorLinkState } from '../css/anchor-link';
import { LinkWrap, LinkTitle } from '../css/anchor-link';
import ThemeProvider from '../theme-provider';
import Widget from '../consts';

class AnchorLink extends React.Component<AnchorLinkProps, AnchorLinkState> {
  static displayName = 'Link';
  isLoad: boolean;
  constructor() {
    super();
    this.isLoad = false;
  }

  render() {
    return (
      <AnchorContext.Consumer>
        {context => {
          const { title, href, children, getPartOfThemeProps } = this.props;
          const { onClick, activeLink, useHref = true } = context;
          const themeProps = getPartOfThemeProps('Container');
          const { themeState } = themeProps;
          themeState.active = activeLink === href;
          if (!this.isLoad) {
            const { getLinks } = context;
            this.isLoad = true;
            context && context.links.push(href);
            getLinks && getLinks(context.links);
          }
          const linkHref = useHref ? { href } : {};
          return (
            <LinkWrap themeProps={themeProps}>
              <LinkTitle
                themeProps={themeProps}
                onClick={e => onClick && onClick(e, href)}
                {...linkHref}
              >
                {title}
              </LinkTitle>
              {children}
            </LinkWrap>
          );
        }}
      </AnchorContext.Consumer>
    );
  }
}
export default ThemeProvider(AnchorLink, Widget.Link);
