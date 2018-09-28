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
  targetDefaultOffsetTop: number;
  constructor() {
    super();
    this.state = {
      fixed: false,
    };
    this.isChange = true;
  }
  componentDidMount() {
    const { target } = this.props;
    this.defaultOffsetTop = this.affix && this.affix.offsetTop;

    setTimeout(() => {
      if (target && typeof target === 'function') {
        this.targetDefaultOffsetTop = target().offsetTop;
        target().addEventListener('scroll', this.addTargetListener);
        return;
      }
      window.addEventListener('scroll', this.addWindowListener);
    }, 100);
  }
  addWindowListener = () => {
    const { offsetTop = 0, offsetBottom = 0 } = this.props;
    const winHeight = window.innerHeight;
    const hasTop = this.isInProps('offsetTop');
    const hasBottom = this.isInProps('offsetBottom');
    const scrollTop = getScrollTop() || 0;
    const affixOffsetTop = this.affix.offsetTop;
    const defaultOffsetTop = this.defaultOffsetTop;

    // if (this.props.target) {
    //   this.setState({
    //     fixed: false,
    //     offsetTop: undefined,
    //     offsetBottom: undefined,
    //   });
    // }
    if (hasTop) {
      let needFixed;
      if (affixOffsetTop - scrollTop <= offsetTop) {
        needFixed = true;
      }
      if (defaultOffsetTop >= scrollTop + offsetTop) {
        needFixed = false;
      }

      this.setState({
        fixed: needFixed,
      });
    }
    if (hasBottom) {
      const currentPos = this.affix.getBoundingClientRect();
      let needFixed;
      if (winHeight - currentPos.bottom <= offsetBottom) {
        needFixed = true;
      }
      if (defaultOffsetTop <= scrollTop + currentPos.top - offsetBottom) {
        needFixed = false;
      }
      this.setState({
        fixed: needFixed,
      });
    }
  };
  addTargetListener = () => {
    const {
      offsetTop = 0,
      offsetBottom = 0,
      target = (): Object => {
        return {};
      },
    } = this.props;
    const affixRect = this.affix.getBoundingClientRect();
    const winHeight = window.innerHeight;
    const hasTop = this.isInProps('offsetTop');
    const hasBottom = this.isInProps('offsetBottom');
    const targetRect = target().getBoundingClientRect();
    const targetScroll = target().scrollTop;
    if (hasTop) {
      if (
        affixRect.top - targetRect.top - targetScroll <= offsetTop ||
        affixRect.bottom >= targetRect.bottom
      ) {
        this.setState({
          fixed: true,
          offsetTop: offsetTop + targetRect.top,
        });
      }

      if (
        this.defaultOffsetTop - this.targetDefaultOffsetTop >=
        this.affix.offsetTop - targetRect.top + targetScroll
      ) {
        this.setState({
          fixed: false,
          offsetTop: undefined,
        });
      }
    }
    if (hasBottom) {
      if (
        targetRect.bottom - affixRect.bottom - targetScroll <= offsetBottom ||
        affixRect.top <= targetRect.top
      ) {
        this.setState({
          fixed: true,
          offsetBottom: winHeight - targetRect.bottom + offsetBottom,
        });
      }
      if (
        this.defaultOffsetTop - this.targetDefaultOffsetTop <=
        targetScroll + this.affix.offsetTop - targetRect.top
      ) {
        this.setState({
          fixed: false,
          offsetBottom: undefined,
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

  getPositionFixed(param: Object): Object {
    const { needFixed, offset } = param;
    if (needFixed) {
      return {
        fixed: true,
        offset,
      };
    }
    return {
      fixed: false,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { onChange } = this.props;
    // console.info('nextState.fixed',nextState.fixed);
    // console.info('this.state.fixed',this.state.fixed);
    if (nextState.fixed !== this.state.fixed) {
      onChange && onChange(nextState.fixed);
    }
  }

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
