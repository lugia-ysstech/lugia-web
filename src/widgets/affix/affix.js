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

const OffsetBottom = 'offsetBottom';
const OffsetTop = 'offsetTop';
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
        target().addEventListener('scroll', () => this.addTargetListener());
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
    const affixOffsetTop = this.affix.offsetTop;
    const defaultOffsetTop = this.defaultOffsetTop;

    if (this.hasTop(props)) {
      this.setState(
        this.getPositionFixed({
          needFixed: affixOffsetTop - scrollTop < offsetTop,
          offset: offsetTop,
        })
      );
    }
    if (this.hasBottom(props)) {
      const currentPos = this.affix.getBoundingClientRect();
      this.setState(
        this.getPositionFixed({
          needFixed:
            !(defaultOffsetTop <= scrollTop + affixOffsetTop - offsetBottom) &&
            windowHeight - currentPos.bottom,
          offset: offsetBottom,
        })
      );
    }
  };

  addTargetListener = () => {
    const { props, defaultPos } = this;
    const {
      target = (): Object => {
        return {};
      },
    } = props;
    const fahterRect = target().getBoundingClientRect();

    const affixRect = this.affix.getBoundingClientRect();

    this.changeFixed(props, {
      defaultWinAffixTop: defaultPos.top,
      fatherWinTop: fahterRect.top,
      affixOffsetTop: this.affix.offsetTop,
      affixWinBottom: affixRect.bottom,
      fatherWinBottom: fahterRect.bottom,
      scrollTop: target().scrollTop,
      winHeight: window.innerHeight,
    });
  };

  changeFixed(props: Object, param: Object) {
    const { offsetTop, offsetBottom } = props;
    const type = this.getOffsetType(props);
    const {
      defaultWinAffixTop,
      fatherWinTop,
      affixOffsetTop,
      affixWinBottom,
      fatherWinBottom,
      scrollTop,
      winHeight,
    } = param;
    switch (type) {
      case OffsetTop:
        this.setState(
          this.getPositionFixed({
            needFixed: defaultWinAffixTop - fatherWinTop - scrollTop <= offsetTop,
            offset: offsetTop + fatherWinTop,
          })
        );
        break;

      case OffsetBottom:
        this.setState(
          this.getPositionFixed({
            needFixed:
              !(defaultWinAffixTop <= scrollTop + affixOffsetTop - offsetBottom) &&
              fatherWinBottom - affixWinBottom <= offsetBottom,
            offset: winHeight - fatherWinBottom + offsetBottom,
          })
        );
        break;
      default:
    }
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

  getOffsetValue(props: Object, state: Object) {
    const { offset } = state;
    return {
      [this.getOffsetType(props)]: offset,
    };
  }

  getOffsetType(props: Object): 'offsetBottom' | 'offsetTop' {
    let res = OffsetTop;
    if (this.hasTop(props)) {
      return res;
    }
    if (this.hasBottom(props)) {
      res = OffsetBottom;
    }
    return res;
  }

  hasTop = (props: Object) => OffsetTop in props;
  hasBottom = (props: Object) => OffsetBottom in props;
}
