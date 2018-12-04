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

export const AnchorContext = React.createContext({
  links: [],
  getLinks: undefined,
  activeLink: undefined,
  onClick: undefined,
});
//todo: 滑动圆点的滑出时隐藏；
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
    }

    componentDidMount() {
      setTimeout(() => {
        window.addEventListener('scroll', this.addWindowScrollListener);
      }, 100);
    }
    addWindowScrollListener = () => {
      const { offsetTop = 0 } = this.props;
      const linkInfo = [];
      if (this.isClick) {
        return;
      }

      this.links.forEach(item => {
        const linkId = this.getId(item);
        if (linkId) {
          const dom = document.getElementById(linkId);
          if (dom) {
            const domTop = dom.getBoundingClientRect().top;
            if (domTop < offsetTop) {
              linkInfo.push({ link: item, top: domTop });
            }
          }
        }
      });

      if (linkInfo.length) {
        const currentLink = linkInfo.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
        this.setState({
          activeLink: currentLink.link,
        });
      }
    };

    render() {
      const { affix = true, offsetTop = 0, children, slideType = 'circle' } = this.props;
      const { activeLink } = this.state;
      let index;
      if (activeLink) {
        index = this.links ? this.links.indexOf(activeLink) : 0;
      }
      const element = (
        <Anchor slideType={slideType}>
          {children}
          {slideType === 'none' ? null : <Circle slideType={slideType} index={index} />}
        </Anchor>
      );
      return (
        <AnchorContext.Provider
          value={{ links: [], getLinks: this.getLinks, activeLink, onClick: this.handleLinkClick }}
        >
          {affix ? <Affix offsetTop={offsetTop}>{element}</Affix> : element}
        </AnchorContext.Provider>
      );
    }

    handleLinkClick = (e: Event, href: string) => {
      this.isClick = true;
      this.setState({ activeLink: href });
      setTimeout(() => {
        this.isClick = false;
      }, 50);
    };
    getId(href: string): ?string {
      const result = /#([^#]+)$/.exec(href);
      if (result) {
        return result[1];
      }
    }
    getLinks = (links: string[]) => {
      this.links = [...links];
    };
  },
  Widget.Anchor
);
