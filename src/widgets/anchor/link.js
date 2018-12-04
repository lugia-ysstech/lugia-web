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
    const { href, title, children } = this.props;
    return (
      <AnchorContext.Consumer>
        {context => {
          if (!this.isLoad) {
            const { href } = this.props;
            const { getLinks } = context;
            this.isLoad = true;
            context && context.links.push(href);
            getLinks && getLinks(context.links);
          }
          return (
            <LinkWrap>
              <Link
                onClick={e => context.onClick && context.onClick(e, href)}
                href={href}
                active={context.activeLink === href}
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
