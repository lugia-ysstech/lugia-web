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
  isChange: boolean;

  constructor() {
    super();
    this.state = {
      fixed: false,
    };
    this.isChange = true;
  }

  componentDidMount() {
    this.defaultOffsetTop = this.affix && this.affix.offsetTop;
    this.defaultPos = this.affix && this.affix.getBoundingClientRect();
    const { target } = this.props;
    setTimeout(() => {
      if (target && typeof target === 'function') {
        target().addEventListener('scroll', () => this.addTargetListener(this.defaultPos));
        window.addEventListener('scroll', () => {
          if (this.state.fixed) {
            // this.setState({ fixed: false }, () => {
            // });
          }
        });

        return;
      }
      window.addEventListener('scroll', this.addWindowListener);
    }, 100);
  }

  addWindowListener = () => {
    const { offsetTop = 0, offsetBottom = 0 } = this.props;
    const windowHeight = window.innerHeight;
    const hasTop = this.isInProps('offsetTop');
    const hasBottom = this.isInProps('offsetBottom');
    const scrollTop = getScrollTop() || 0;

    if (hasTop) {
      if (this.affix.offsetTop - scrollTop <= offsetTop) {
        this.setState({
          fixed: true,
          offsetTop,
        });
      }
      if (this.defaultOffsetTop >= scrollTop + offsetTop) {
        this.setState({
          fixed: false,
        });
      }
    }
    if (hasBottom) {
      const currentPos = this.affix.getBoundingClientRect();
      if (windowHeight - currentPos.bottom <= offsetBottom) {
        this.setState({
          fixed: true,
          offsetBottom,
        });
      }
      if (this.defaultOffsetTop <= scrollTop + this.affix.offsetTop - offsetBottom) {
        this.setState({
          fixed: false,
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
      } else {
        this.setState({
          fixed: false,
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
        });
      }
    }
  };

  handleChange = (val: boolean) => {
    const { onChange } = this.props;
    if (this.isChange == val) {
      onChange && onChange(val);
      this.isChange = !val;
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
