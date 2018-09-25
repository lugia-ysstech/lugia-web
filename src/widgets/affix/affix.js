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

function getScrollTop(): ?number {
  let scrollPos;
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset;
  } else if (document.compatMode && document.compatMode != 'BackCompat') {
    scrollPos = document.documentElement && document.documentElement.scrollTop;
  } else if (document.body) {
    scrollPos = document.body.scrollTop;
  }
  return scrollPos;
}
export default class extends React.Component<AffixProps, AffixState> {
  affix: any;
  defaultPos: Object;
  defaultOffsetTop: number;
  constructor() {
    super();
    this.state = {
      fixed: false,
    };
  }
  componentDidMount() {
    this.defaultOffsetTop = this.affix && this.affix.offsetTop;
    this.defaultPos = this.affix && this.affix.getBoundingClientRect();
    const { target } = this.props;
    setTimeout(() => {
      if (target && typeof target === 'function') {
        target().addEventListener('scroll', () => this.addTargetListener(this.defaultPos));
      }
      window.addEventListener('scroll', this.addWindowListener);
    }, 100);
  }
  addWindowListener = () => {
    this.defaultPos = this.affix.getBoundingClientRect();
    const { offsetTop = 0, offsetBottom = 0 } = this.props;
    const windowHeight = window.innerHeight;
    const hasTop = this.isInProps('offsetTop');
    const hasBottom = this.isInProps('offsetBottom');
    const scrollTop = getScrollTop() || 0;

    if (this.props.target) {
      this.setState({
        fixed: false,
      });
    }
    if (hasTop) {
      if (this.affix.offsetTop - scrollTop <= offsetTop) {
        this.setState({
          fixed: true,
          offsetTop: undefined,
        });
      }
      if (this.defaultOffsetTop >= scrollTop + offsetTop) {
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
      if (this.defaultOffsetTop <= scrollTop + this.affix.offsetTop - offsetBottom) {
        this.setState({
          fixed: false,
          offsetBottom: undefined,
        });
      }
    }
  };
  addTargetListener = (defaultPos: Object) => {
    const {
      offsetTop = 0,
      offsetBottom = 0,
      target = (): Object => {
        return {};
      },
    } = this.props;
    const windowHeight = window.innerHeight;
    const hasTop = this.isInProps('offsetTop');
    const hasBottom = this.isInProps('offsetBottom');
    const targetPos = target().getBoundingClientRect();
    const targetScroll = target().scrollTop;
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
    window.removeEventListener('scroll', this.addWindowListener);
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
