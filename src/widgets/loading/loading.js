/*
 *by wangcuixia
 *@flow
 * */
import React from 'react';
import {
  LodingWrapper,
  LodingInner,
  LodingInnerCircle,
  IconLoading,
  LoadingTip,
  LodingBox,
  LoadingFatherBox,
} from './styled';
import Icon from '../icon/index';
import colorsFunc from '../css/stateColor';
import Widgets from '../consts/index';
import Theme from '../theme/index';
export const { themeColor } = colorsFunc();
type PropsCheck = {
  width?: number,
  color?: string,
  scale?: boolean,
  getTheme: Function,
  size?: string,
  tip?: string,
  delay?: number,
  icon?: string,
  iconClass?: string,
  time?: number,
};
type StateCheck = {
  width?: number,
  color?: string,
  scale?: boolean,
  isLoading: boolean,
};
LodingWrapper.displayName = 'divs';
class Loading extends React.Component<PropsCheck, StateCheck> {
  constructor() {
    super();
    this.state = {
      width: 100,
      children: [],
      isLoading: false,
    };
  }
  static getDerivedStateFromProps(props: PropsCheck, state: StateCheck) {
    let { scale, getTheme, size } = props;
    const theme = getTheme && getTheme();
    let { color, width } = theme;
    width = width ? width : size === 'large' ? 100 : size === 'small' ? 36 : 64;
    if (!color) {
      color = themeColor;
    }
    scale = scale === true;
    return {
      width,
      color,
      scale,
      isLoading: state && state.isLoading,
    };
  }
  componentDidMount() {
    const delayFun = (props: Object, callback) => {
      const { delay } = props;
      const newDelay = delay * 1000;
      let isLoading = false;
      setTimeout(function() {
        isLoading = true;
        callback(isLoading);
      }, newDelay);
    };
    this.props.delay &&
      delayFun(this.props, (isLoading: boolean) => {
        this.setState({ isLoading });
      });
  }
  render() {
    const { scale, color, width = 0, isLoading } = this.state;
    const { iconClass, time = 3, tip } = this.props;
    //loading的直径和圆点直径比例为8：1；后改为6:1
    let circleDiameter = Math.round(width / 6);
    const children = [];
    let delay = 0.6;
    for (let i = 0; i < 5; i++) {
      delay += 0.1;
      circleDiameter = circleDiameter * 0.9;
      children.push(
        <LodingInner
          time={time}
          delay={delay}
          width={width}
          circleDiameter={circleDiameter}
          key={i}
        >
          <LodingInnerCircle
            scale={i === 0 ? scale : ''}
            circleDiameter={circleDiameter}
            color={color}
          />
        </LodingInner>
      );
    }
    const iconBox = (
      <IconLoading time={time} size={width} color={color}>
        <Icon iconClass={iconClass} />
      </IconLoading>
    );
    const Children = this.props.children;
    const hasChildren = !!Children;
    return (
      <LoadingFatherBox hasChildren={hasChildren}>
        {Children}
        <LodingBox hasChildren={hasChildren}>
          <LodingWrapper width={width} tip={tip}>
            {iconClass ? iconBox : this.props.delay && !isLoading ? '' : children}
          </LodingWrapper>
          {tip ? <LoadingTip color={color}>{tip}</LoadingTip> : ''}
        </LodingBox>
      </LoadingFatherBox>
    );
  }
}
export default Loading;
