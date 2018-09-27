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
    const { props } = this;
    const { offsetTop = 0, offsetBottom = 0 } = props;
    const windowHeight = window.innerHeight;
    const scrollTop = getScrollTop() || 0;

    if (this.hasTop(props)) {
      this.setState(
        this.getPositionFixed({
          needFixed: this.affix.offsetTop - scrollTop < offsetTop,
          offset: offsetTop,
        })
      );
    }
    if (this.hasBottom(props)) {
      const currentPos = this.affix.getBoundingClientRect();

      this.setState(
        this.getPositionFixed({
          needFixed:
            !(this.defaultOffsetTop <= scrollTop + this.affix.offsetTop - offsetBottom) &&
            windowHeight - currentPos.bottom,
          offset: offsetBottom,
        })
      );
    }
  };
  addTargetListener = (defaultPos: Object) => {
    const { props } = this;
    const {
      offsetTop = 0,
      offsetBottom = 0,
      target = (): Object => {
        return {};
      },
    } = props;
    const windowHeight = window.innerHeight;
    const targetPos = target().getBoundingClientRect();
    const targetScroll = target().scrollTop;
    if (this.hasTop(props)) {
      this.setState(
        this.getPositionFixed({
          needFixed: defaultPos.top - targetPos.top - targetScroll <= offsetTop,
          offset: offsetTop + targetPos.top,
        })
      );
    }
    if (this.hasBottom(props)) {
      const elementPos = this.affix.getBoundingClientRect();
      this.setState(
        this.getPositionFixed({
          needFixed:
            !(defaultPos.top <= targetScroll + this.affix.offsetTop - offsetBottom) &&
            targetPos.bottom - elementPos.bottom <= offsetBottom,
          offset: windowHeight - targetPos.bottom + offsetBottom,
        })
      );
    }
  };

  getPositionFixed(param: Object) {
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
    const { props, state } = this;
    const { children } = props;
    const { fixed } = state;
    return (
      <Affix
        innerRef={node => (this.affix = node)}
        fixed={fixed}
        {...this.getOffsetValue(props, state)}
      >
        {children}
      </Affix>
    );
  }

  getOffsetValue(props: Object, state: Object) {
    const { offset } = state;
    let res = {
      offsetTop: offset,
    };
    if (this.hasTop(props)) {
      return res;
    }
    if (this.hasBottom(props)) {
      res = {
        offsetBottom: offset,
      };
    }
    return res;
  }

  hasTop = (props: Object) => 'offsetTop' in props;
  hasBottom = (props: Object) => 'offsetBottom' in props;
}
