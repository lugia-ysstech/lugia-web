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
import CSSComponent from '../../theme/CSSProvider';
import StaticComponent from '../../theme/CSSProvider';

import { Height, Padding } from '../../css/badge';
import { css } from '../../theme/CSSProvider';
import colorsFunc from '../../css/stateColor';
import { units } from '@lugia/css';

const { px2remcss } = units;
const { dangerColor } = colorsFunc();

type NumberTurnProps = {
  className?: string,
  getTheme: Function,
  count?: number,
  overflowCount: number,
  themeProps: Object,
};

const OutInner = CSSComponent({
  tag: 'span',
  className: 'numberBadgeOutInner',
  normal: {
    selectNames: [['width'], ['height'], ['fontSize'], ['margin'], ['background'], ['padding']],
    defaultTheme: {},
  },
  getStyle(themeMeta: Object, themeProps: ThemeProps) {
    const { propsConfig } = themeProps;
    const { bitCnt, overflow } = propsConfig;
    const overWidth = overflow ? 6 : 0;
    const width = (bitCnt === 1 ? 14 : bitCnt * 6 + 2 * Padding) + overWidth;
    const style = {};
    style.width = px2remcss(width);
    return style;
  },
  css: css`
    overflow: hidden;
    color: white;
    display: inline-block;
    background: ${dangerColor};
    height: ${px2remcss(14)};
    border-radius: ${px2remcss(8)};
    line-height: ${Height};
    text-align: center;
    padding: 0 ${px2remcss(Padding)};
    font-weight: normal;
    white-space: nowrap;
    box-shadow: 0 0 0 ${px2remcss(1)} #fff;
  `,
});
const NumberBoxContainer = CSSComponent({
  tag: 'div',
  className: 'badgeNumberBoxContainer',
  selectNames: [['position']],
});
const BitOut = StaticComponent({
  tag: 'span',
  className: 'badgeNumberBitOut',
  normal: { selectNames: [['background']] },
  css: css`
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    white-space: nowrap;
    text-align: center;
    transform: translateY(${props => props.y}%);
    height: ${px2remcss(14)};
    display: inline-block;
  `,
});
const Bit = CSSComponent({
  tag: 'p',
  className: 'badgeNumberBit',
  normal: {
    selectNames: [['color'], ['fontSize']],
    defaultTheme: { height: px2remcss(14) },
  },
  css: css`
    height: ${px2remcss(14)};
    text-align: center;
    box-sizing: border-box;
    margin: 0;
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
