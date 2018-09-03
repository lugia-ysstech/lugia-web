/**
 *
 * create by liangguodong on 2018/8/27
 *
 * @flow
 */
import '../../common/shirm';
import React from 'react';
import styled from 'styled-components';
import Widget from '../../consts';

import ThemeProvider from '../../theme-provider';
import KeyBoardEventAdaptor from '../../common/KeyBoardEventAdaptor';
import { px2emcss } from '../../css/units';
import { getMargin } from '../../common/ThemeUtils';

import {
  BaseRedPoint,
  Height,
  numDotHeight,
  numDotRight,
  numDotTop,
  numDotWidht,
  Padding,
} from '../../css/badge';

const em = px2emcss(1);

type NumberTurnProps = {
  className?: string,
  getTheme: Function,
  count?: number,
  overflowCount: number,
};

const OutInner = BaseRedPoint.extend`
  ${numDotRight};
  ${numDotTop};
  white-space: nowrap;
  text-align: center;
  overflow: hidden;
  padding: 0 ${em(2)};
  color: white;
  display: inline-block;
  ${numDotHeight};
  ${numDotWidht};
  border-radius: ${em(8)};
  line-height: ${Height};
  text-align: center;
  padding: 0 ${em(Padding)};
  font-weight: normal;
  white-space: nowrap;
  -webkit-box-shadow: 0 0 0 ${em(1)} #fff;
  box-shadow: 0 0 0 ${em(1)} #fff;
`;
const NumberBoxContainer = styled.div`
  ${getMargin};
`;
const BitOut = styled.span`
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  white-space: nowrap;
  text-align: center;
  transform: translateY(${props => props.y}%);
  ${numDotHeight};
  display: inline-block;
`;
const Bit = styled.p`
  ${numDotHeight};
  text-align: center;
  box-sizing: border-box;
  margin: 0;
`;

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
    const { getTheme } = this.props;
    const { count = 0, overflow } = this.state;

    return (
      <NumberBoxContainer theme={getTheme()}>
        <OutInner theme={getTheme()} bitCnt={this.getBitCnt(count)} overflow={overflow}>
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
    for (let i = 0; i < bitCnt; i++) {
      const bitValue = Number(countStr[i]);
      result.push(<BitOut y={-bitValue * 100}>{this.getBit()}</BitOut>);
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
    return <BitOut y={y}>+</BitOut>;
  }

  getBit() {
    const total = 10;
    const call: any = Function.prototype.call;
    const array: Array<any> = Array(...Array(total))
      .map(call, Number)
      .map(v => <Bit>{v}</Bit>);
    return array;
  }
}

const NumberTurnTarget = ThemeProvider(KeyBoardEventAdaptor(NumberTurn), Widget.NumberTurn);
export default NumberTurnTarget;
