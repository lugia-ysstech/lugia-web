/**
 *
 * create by liangguodong on 2018/8/27
 *
 * @flow
 */
import '../../common/shirm';
import React from 'react';
import Widget from '../../consts';

import ThemeHoc from '@lugia/theme-hoc';
import KeyBoardEventAdaptor from '../../common/KeyBoardEventAdaptor';
import { px2emcss } from '../../css/units';
import CSSComponent from '../../theme/CSSProvider';
import StaticComponent from '../../theme/CSSProvider';

import { Height, Padding } from '../../css/badge';
import { BaseRedPoint } from '../index';
import { css } from '../../theme/CSSProvider';
import colorsFunc from '../../css/stateColor';

const em = px2emcss(1);
const { dangerColor } = colorsFunc();

type NumberTurnProps = {
  className?: string,
  getTheme: Function,
  count?: number,
  overflowCount: number,
  themeProps: Object,
};

const OutInner = CSSComponent({
  extend: BaseRedPoint,
  className: 'numberBadgeOutInner',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['fontSize'],
      ['background'],
      ['boxShadow'],
      ['borderRadius'],
      ['border'],
      ['margin'],
      ['padding'],
      ['boxShadow'],
    ],
    defaultTheme: {},
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { bitCnt, overflow } = propsConfig;
      const overWidth = overflow ? 6 : 0;
      const width = (bitCnt === 1 ? 14 : bitCnt * 6 + 2 * Padding) + overWidth;
      return `width: ${em(width)};`;
    },
  },
  css: css`
    overflow: hidden;
    color: white;
    display: inline-block;
    background: ${dangerColor};
    height: ${em(14)};
    border-radius: ${em(8)};
    line-height: ${Height};
    text-align: center;
    padding: 0 ${em(Padding)};
    font-weight: normal;
    white-space: nowrap;
    box-shadow: 0 0 0 ${em(1)} #fff;
    z-index: 999999;
  `,
});
const NumberBoxContainer = CSSComponent({
  tag: 'div',
  className: 'badgeNumberBoxContainer',
  normal: {
    selectNames: [['color'], ['width'], ['height'], ['margin']],
  },
  css: css`
    z-index: 999999;
  `,
});
const BitOut = CSSComponent({
  tag: 'span',
  className: 'badgeNumberBitOut',
  css: css`
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    white-space: nowrap;
    text-align: center;
    transform: translateY(${props => props.y}%);
    height: ${em(14)};
    display: inline-block;
    z-index: 999999;
  `,
});
const Bit = StaticComponent({
  tag: 'p',
  className: 'badgeNumberBit',
  css: css`
    height: ${em(14)};
    text-align: center;
    box-sizing: border-box;
    margin: 0;
    z-index: 999999;
  `,
});

type NumberTurnState = {
  count: number,
  overflow: boolean,
  beforeOverflow: boolean,
};

class NumberTurn extends React.Component<NumberTurnProps, NumberTurnState> {
  static defaultProps = {
    viewClass: Widget.NumberTurn,
    overflowCount: 99,
  };

  static getDerivedStateFromProps(props: NumberTurnProps, preState: Object) {
    const { count = 0, overflowCount = 99 } = props;
    return {
      count: Math.min(count < 0 ? 0 : count, overflowCount),
      overflow: count > overflowCount,
      beforeOverflow: count > overflowCount - 1,
    };
  }

  render() {
    const { themeProps } = this.props;
    const { count = 0, overflow } = this.state;
    const bitCnt = this.getBitCnt(count);
    themeProps.propsConfig = { bitCnt, overflow };
    return (
      <NumberBoxContainer themeProps={themeProps}>
        <OutInner themeProps={themeProps} overflow={overflow}>
          {this.getBitOut(count)}
        </OutInner>
      </NumberBoxContainer>
    );
  }

  getBitOut(count: number) {
    const { overflow, beforeOverflow } = this.state;
    const { themeProps } = this.props;
    const bitCnt = this.getBitCnt(count);
    const countStr = (count + '').split('');
    const result = [];
    for (let i = 0; i < bitCnt; i++) {
      const bitValue = Number(countStr[i]);
      result.push(
        <BitOut themeProps={themeProps} y={-bitValue * 100}>
          {this.getBit()}
        </BitOut>
      );
    }
    if (overflow || beforeOverflow) {
      result.push(this.getPlus());
    }
    return result;
  }

  getBitCnt(count: number) {
    return (count + '').split('').length;
  }

  getPlus() {
    const { overflow } = this.state;
    const { themeProps } = this.props;
    let y = -808;
    if (overflow) {
      y = -908;
    }
    return (
      <BitOut themeProps={themeProps} y={y}>
        +
      </BitOut>
    );
  }

  getBit() {
    const { themeProps } = this.props;
    const total = 10;
    const call: any = Function.prototype.call;
    const array: Array<any> = Array(...Array(total))
      .map(call, Number)
      .map(v => <Bit themeProps={themeProps}>{v}</Bit>);
    return array;
  }
}

const NumberTurnTarget = ThemeHoc(KeyBoardEventAdaptor(NumberTurn), Widget.NumberTurn);
export default NumberTurnTarget;
