/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import Affix from '../affix/index';
import type { AnchorProps, AnchorState } from '../css/anchor';
import { Anchor, Circle } from '../css/anchor';

export const AnchorContext: Object = React.createContext({
  links: [],
  getLinks: undefined,
  activeLink: undefined,
  onClick: undefined,
});

export default ThemeProvider(
  class extends React.Component<AnchorProps, AnchorState> {
    static displayName = 'Anchor';
    links: string[];
    isClick: boolean;

    constructor(props) {
      super(props);
      this.state = {
        activeLink: '',
      };
      this.isClick = false;
      this.links = [];
    }

    componentDidMount() {
      this.initScroll();
      setTimeout(() => {
        window.addEventListener('scroll', this.addWindowScrollListener);
      }, 100);
    }
    initScroll = () => {
      const href = window && window.location.href;
      if (href) {
        const id = href.split('#')[1];
        const dom = document.getElementById(id);
        if (dom) {
          this.handleLinkClick(undefined, `#${id}`);
          dom.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    };

    addWindowScrollListener = () => {
      if (this.isClick) {
        return;
      }

      const { offsetTop = 0 } = this.props;
      const linkInfo = this.getAcrossLinks(this.links, offsetTop);
      this.setScrollActiveLink(linkInfo);
    };

    getAcrossLinks = (links: string[], offsetTop: number): Object[] => {
      const linkInfo = [];
      links.forEach(item => {
        const linkId = this.getId(item);
        if (linkId) {
          const dom = document.getElementById(linkId);
          if (dom) {
            const top = dom.getBoundingClientRect().top;
            if (top <= offsetTop) {
              linkInfo.push({ link: item, top });
            }
          }
        }
      });
      return linkInfo;
    };

    setScrollActiveLink = (linkInfo: Object[]) => {
      this.setState({
        activeLink: this.getMaxTopLink(linkInfo),
      });
    };

    getMaxTopLink(linkInfo: Object[]): string {
      if (!Array.isArray(linkInfo) || linkInfo.length === 0) {
        return '';
      }
      return linkInfo.reduce((prev, curr) => (curr.top > prev.top ? curr : prev)).link;
    }

    render() {
      const {
        affix = true,
        offsetTop = 0,
        children,
        slideType = 'circle',
        slideLine = true,
        useHref = true,
      } = this.props;
      const { activeLink } = this.state;
      let index;
      if (activeLink) {
        index = this.links ? this.links.indexOf(activeLink) : 0;
      }
      const element = (
        <Anchor slideType={slideType} slideLine={slideLine}>
          {children}
          <Circle slideType={slideType} index={index} />
        </Anchor>
      );
      return (
        <AnchorContext.Provider
          value={{
            links: [],
            getLinks: this.updateLinks,
            activeLink,
            onClick: this.handleLinkClick,
            useHref,
          }}
        >
          {affix ? <Affix offsetTop={offsetTop}>{element}</Affix> : element}
        </AnchorContext.Provider>
      );
    }

    handleLinkClick = (e: ?Event, href: string) => {
      const { onClick } = this.props;
      this.isClick = true;

      this.setState({ activeLink: href });
      onClick && onClick(e, href);
      setTimeout(() => {
        this.isClick = false;
      }, 500);
    };

    getId(href: string): ?string {
      const result = /#([^#]+)$/.exec(href);
      if (result) {
        return result[1];
      }
    }

    updateLinks = (links: string[]) => {
      this.links = [...links];
    };
  },
  Widget.Anchor
);
