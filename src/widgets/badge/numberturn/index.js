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

import { css } from '../../theme/CSSProvider';
import colorsFunc from '../../css/stateColor';
import { units } from '@lugia/css';

const { px2remcss } = units;
const { dangerColor, defaultColor } = colorsFunc();

type NumberTurnProps = {
  className?: string,
  getTheme: Function,
  count?: number,
  overflowCount: number,
  themeProps: Object,
};

const OutInner = CSSComponent({
  tag: 'div',
  className: 'numberBadgeOutInner',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['fontSize'],
      ['margin'],
      ['background'],
      ['boxShadow'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
    ],
    defaultTheme: {
      background: { color: dangerColor },
      height: 14,
      padding: {
        left: 4,
        right: 4,
      },
    },
    getThemeMeta(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { width } = themeMeta;
      const { bitCnt, overflow } = propsConfig;
      const overWidth = overflow ? 6 : 0;
      const theWidth = width ? width : (bitCnt === 1 ? 14 : bitCnt * 6 + 2 * 4) + overWidth;
      return {
        width: theWidth,
      };
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      const { propsConfig } = themeProps;
      const { bitCnt } = propsConfig;
      const borderRadius = bitCnt === 1 ? '50%' : px2remcss(8);
      return `border-radius: ${borderRadius};
    `;
    },
  },
  css: css`
    overflow: hidden;
    text-align: center;
    font-weight: normal;
    white-space: nowrap;
  `,
});
const NumberBoxContainer = CSSComponent({
  tag: 'div',
  className: 'badgeNumberBoxContainer',
  normal: { selectNames: [['position']] },
});
const BitOut = CSSComponent({
  tag: 'span',
  className: 'badgeNumberBitOut',
  normal: {
    selectNames: [['height'], ['lineHeight'], ['color']],
    defaultTheme: { height: 14, color: defaultColor },
    getThemeMeta: (themeMeta: Object, themeProps: Object) => {
      const { height } = themeMeta;
      return {
        lineHeight: height,
      };
    },
  },
  css: css`
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    white-space: nowrap;
    text-align: center;
    transform: translateY(${props => props.y}%);
    display: inline-block;
  `,
});
const Bit = CSSComponent({
  tag: 'p',
  className: 'badgeNumberBit',
  normal: {
    selectNames: [['color'], ['fontSize'], ['font'], ['height'], ['lineHeight']],
    defaultTheme: {
      height: 14,
      color: defaultColor,
      lineHeight: 14,
    },
    getThemeMeta: (themeMeta: Object, themeProps: Object) => {
      const { height } = themeMeta;
      return {
        lineHeight: height,
      };
    },
  },
  css: css`
    text-align: center;
    box-sizing: border-box;
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
    const { count = 0, overflow } = this.state;
    const { singleTheme = false, themeProps, getPartOfThemeProps } = this.props;
    const bitCnt = this.getBitCnt(count);
    const theThemeProps = singleTheme
      ? themeProps
      : getPartOfThemeProps('BadgeNumber', {
          props: {
            overflow,
            bitCnt,
          },
        });

    return (
      <NumberBoxContainer themeProps={theThemeProps}>
        <OutInner themeProps={theThemeProps} overflow={overflow}>
          {this.getBitOut(count)}
        </OutInner>
      </NumberBoxContainer>
    );
  }

  getBitOut(count: number) {
    const { overflow, beforeOverflow } = this.state;
    const bitCnt = this.getBitCnt(count);
    const countStr = (count + '').split('');
    const result = [];
    const { singleTheme = false, themeProps, getPartOfThemeProps } = this.props;
    const theThemeProps = singleTheme ? themeProps : getPartOfThemeProps('BadgeNumber');
    for (let i = 0; i < bitCnt; i++) {
      const bitValue = Number(countStr[i]);
      result.push(
        <BitOut themeProps={theThemeProps} y={-bitValue * 100}>
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
    let y = -808;
    if (overflow) {
      y = -908;
    }
    const { singleTheme = false, themeProps, getPartOfThemeProps } = this.props;
    const theThemeProps = singleTheme ? themeProps : getPartOfThemeProps('BadgeNumber');
    return (
      <BitOut themeProps={theThemeProps} y={y}>
        +
      </BitOut>
    );
  }

  getBit() {
    const total = 10;
    const call: any = Function.prototype.call;
    const { singleTheme = false, themeProps, getPartOfThemeProps } = this.props;
    const theThemeProps = singleTheme ? themeProps : getPartOfThemeProps('BadgeNumber');
    const array: Array<any> = Array(...Array(total))
      .map(call, Number)
      .map(v => <Bit themeProps={theThemeProps}>{v}</Bit>);
    return array;
  }
}

const NumberTurnTarget = ThemeHoc(KeyBoardEventAdaptor(NumberTurn), Widget.NumberTurn);
export default NumberTurnTarget;
