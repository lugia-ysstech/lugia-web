/*
 *by wangcuixia
 *@flow
 * */
import React from 'react';
import { LodingWrapper, LodingInner, LodingInnerCircle } from './styled';
import colorsFunc from '../css/stateColor';
export const { themeColor } = colorsFunc();
type PropsCheck = {
  width?: number,
  color?: string,
  scale?: boolean,
  getTheme: Function,
};
type StateCheck = {
  width?: number,
  color?: string,
  scale?: boolean,
};
LodingWrapper.displayName = 'divs';
class Loading extends React.Component<PropsCheck, StateCheck> {
  constructor() {
    super();
    this.state = {
      width: 100,
      children: [],
    };
  }
  static getDerivedStateFromProps(props: PropsCheck, state: StateCheck) {
    let { scale, getTheme } = props;
    const theme = getTheme && getTheme();
    let { width, color } = theme;
    if (!width) {
      width = 100;
    }
    if (!color) {
      color = themeColor;
    }
    scale = scale === true;
    return {
      width,
      color,
      scale,
    };
  }
  render() {
    const { scale, color, width = 0 } = this.state;
    //loading的直径和圆点直径比例为8：1；后改为6:1
    let circleDiameter = Math.round(width / 6);
    const children = [];
    let delay = 0.6;
    for (let i = 0; i < 5; i++) {
      delay += 0.1;
      circleDiameter = circleDiameter * 0.9;
      children.push(
        <LodingInner delay={delay} width={width} circleDiameter={circleDiameter} key={i}>
          <LodingInnerCircle
            scale={i == 0 ? scale : ''}
            circleDiameter={circleDiameter}
            color={color}
          />
        </LodingInner>
      );
    }
    return <LodingWrapper width={width}>{children}</LodingWrapper>;
  }
}
export default Loading;
