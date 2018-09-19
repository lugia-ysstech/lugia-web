/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import type { AffixProps, AffixState } from '../css/affix';
import { Affix } from '../css/affix';

function getScrollTop() {
  let scrollPos;
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset;
  } else if (document.compatMode && document.compatMode != 'BackCompat') {
    scrollPos = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollPos = document.body.scrollTop;
  }
  return scrollPos;
}
export default class extends React.Component<AffixProps, AffixState> {
  constructor() {
    super();
    this.state = {
      start: false,
    };
  }
  componentDidMount() {
    const { offsetTop = 0, offsetBottom = 0 } = this.props;
    const defaultOffsetTop = this.affix.offsetTop;
    const windowHeight = window.innerHeight;
    const hasTop = this.isInProps('offsetTop');
    const hasBottom = this.isInProps('offsetBottom');
    document.addEventListener('scroll', () => {
      // console.info(this.affix.getBoundingClientRect());
      const elementPos = this.affix.getBoundingClientRect();
      if (hasTop) {
        if (this.affix.offsetTop - getScrollTop() <= offsetTop) {
          this.setState({
            start: true,
          });
        }
        if (defaultOffsetTop >= window.pageYOffset + offsetTop) {
          this.setState({
            start: false,
          });
        }
      } else {
        console.info('1');
        if (windowHeight - elementPos.bottom <= offsetBottom) {
          console.info('2');
          this.setState({
            start: true,
          });
        }
        console.info(defaultOffsetTop, window.pageYOffset + offsetBottom);
        // if (defaultOffsetTop <= window.pageYOffset + windowHeight + offsetBottom) {
        //   console.info('3');
        //   this.setState({
        //     start: false,
        //   });
        // }
      }
    });
  }
  render() {
    const { children, offsetTop, offsetBottom } = this.props;
    const { start } = this.state;
    return (
      <Affix
        innerRef={node => (this.affix = node)}
        start={start}
        offsetTop={offsetTop}
        offsetBottom={offsetBottom}
      >
        {children}
      </Affix>
    );
  }

  isInProps(value: 'offsetTop' | 'offsetBottom') {
    return value in this.props;
  }
}
