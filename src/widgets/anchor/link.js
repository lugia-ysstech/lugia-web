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
import { LinkWrap, Link } from '../css/anchor-link';

export default class extends React.Component<AnchorLinkProps, AnchorLinkState> {
  static displayName = 'AnchorLink';
  isLoad: boolean;
  constructor() {
    super();
    this.isLoad = false;
  }

  render() {
    return (
      <AnchorContext.Consumer>
        {context => {
          const { title, href, children } = this.props;
          if (!this.isLoad) {
            const { getLinks } = context;
            this.isLoad = true;
            context && context.links.push(href);
            getLinks && getLinks(context.links);
          }
          const { onClick, activeLink, useHref = true } = context;
          const linkHref = useHref ? { href } : {};
          return (
            <LinkWrap>
              <Link
                onClick={e => onClick && onClick(e, href)}
                active={activeLink === href}
                {...linkHref}
              >
                {title}
              </Link>
              {children}
            </LinkWrap>
          );
        }}
      </AnchorContext.Consumer>
    );
  }
}
