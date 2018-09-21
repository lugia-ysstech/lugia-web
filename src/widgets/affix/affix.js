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
      fixed: false,
    };
  }
  componentDidMount() {
    const defaultOffsetTop = this.affix.offsetTop;
    this.defaultPos = this.affix.getBoundingClientRect();
    const { target } = this.props;
    setTimeout(() => {
      if (target && typeof target === 'function') {
        target().addEventListener('scroll', () => this.addTargetListener(this.defaultPos));
      }
      window.addEventListener('scroll', () => this.addWindowListener(defaultOffsetTop));
    }, 100);
  }
  addWindowListener = defaultOffsetTop => {
    this.defaultPos = this.affix.getBoundingClientRect();
    const { offsetTop = 0, offsetBottom = 0 } = this.props;
    const windowHeight = window.innerHeight;
    const hasTop = this.isInProps('offsetTop');
    const hasBottom = this.isInProps('offsetBottom');

    if (this.props.target) {
      this.setState({
        fixed: false,
      });
    }
    if (hasTop) {
      if (this.affix.offsetTop - getScrollTop() <= offsetTop) {
        this.setState({
          fixed: true,
          offsetTop: undefined,
        });
      }
      if (defaultOffsetTop >= getScrollTop() + offsetTop) {
        this.setState({
          fixed: false,
          offsetTop: undefined,
        });
      }
    }
    if (hasBottom) {
      const elementPos = this.affix.getBoundingClientRect();
      if (windowHeight - elementPos.bottom <= offsetBottom) {
        this.setState({
          fixed: true,
          offsetBottom: undefined,
        });
      }
      if (defaultOffsetTop <= getScrollTop() + this.affix.offsetTop - offsetBottom) {
        this.setState({
          fixed: false,
          offsetBottom: undefined,
        });
      }
    }
  };
  addTargetListener = defaultPos => {
    const { offsetTop = 0, offsetBottom = 0 } = this.props;
    const windowHeight = window.innerHeight;
    const hasTop = this.isInProps('offsetTop');
    const hasBottom = this.isInProps('offsetBottom');
    const targetPos = this.props.target().getBoundingClientRect();
    const targetScroll = this.props.target().scrollTop;
    if (hasTop) {
      if (defaultPos.top - targetPos.top - targetScroll <= offsetTop) {
        this.setState({
          fixed: true,
          offsetTop: offsetTop + targetPos.top,
        });
      }
      if (defaultPos.top >= targetScroll + targetPos.top + offsetTop) {
        this.setState({
          fixed: false,
          offsetTop: undefined,
        });
      }
    }
    if (hasBottom) {
      const elementPos = this.affix.getBoundingClientRect();
      if (targetPos.bottom - elementPos.bottom <= offsetBottom) {
        this.setState({
          fixed: true,
          offsetBottom: windowHeight - targetPos.bottom + offsetBottom,
        });
      }
      if (defaultPos.top <= targetScroll + this.affix.offsetTop - offsetBottom) {
        this.setState({
          fixed: false,
          offsetBottom: undefined,
        });
      }
    }
  };

  componentWillUnmount() {
    const { target } = this.props;
    window.removeEventListener('scroll', this.addWindowListener);
    if (target && typeof target === 'function') {
      target().removeEventListener('scroll', this.addTargetListener);
    }
  }
  render() {
    const { children } = this.props;
    const { fixed, offsetTop, offsetBottom } = this.state;
    return (
      <Affix
        innerRef={node => (this.affix = node)}
        fixed={fixed}
        offsetTop={offsetTop ? offsetTop : this.props.offsetTop}
        offsetBottom={offsetBottom ? offsetBottom : this.props.offsetBottom}
      >
        {children}
      </Affix>
    );
  }

  isInProps(value: 'offsetTop' | 'offsetBottom') {
    return value in this.props;
  }
}
