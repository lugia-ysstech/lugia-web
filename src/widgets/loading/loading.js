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
  loading?: boolean,
  children?: any,
};
type StateCheck = {
  width?: number,
  color?: string,
  scale?: boolean,
  isLoading: boolean,
  loading: boolean,
};
LodingWrapper.displayName = 'divs';
class Loading extends React.Component<PropsCheck, StateCheck> {
  static getDerivedStateFromProps(props: PropsCheck, state: StateCheck) {
    let { scale, getTheme, size, loading = true } = props;
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
      isLoading: state && loading ? state.isLoading : false,
      loading,
    };
  }
  delayFun = (delay: Object, callback: Function) => {
    const newDelay = delay * 1000;
    setTimeout(function() {
      callback(true);
    }, newDelay);
  };
  delayCallback = (props: Object) => {
    const { loading, delay } = props;
    loading &&
      delay &&
      this.delayFun(delay, (isLoading: boolean) => {
        this.setState({ isLoading });
      });
  };
  componentDidUpdate(nextProps: PropsCheck, nextState: StateCheck) {
    if (nextProps.loading !== this.props.loading) {
      this.delayCallback(this.props);
    }
  }
  componentDidMount() {
    const newProps = {
      loading: this.state.loading,
      delay: this.props.delay,
    };
    this.delayCallback(newProps);
  }
  render() {
    const { scale, color, width = 0, isLoading, loading } = this.state;
    const { iconClass, time = 3, tip, delay } = this.props;
    //loading的直径和圆点直径比例为8：1；后改为6:1
    let circleDiameter = Math.round(width / 6);
    const children = [];
    let delayTime = 0.6;
    for (let i = 0; i < 5; i++) {
      delayTime += 0.1;
      circleDiameter = circleDiameter * 0.9;
      children.push(
        <LodingInner
          time={time}
          delay={delayTime}
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
    const hasChildren = delay ? !!Children && loading && isLoading : !!Children && loading;
    const showTips = delay ? isLoading && tip : tip;
    const isShowLoading = delay ? loading && isLoading : loading;
    return (
      <LoadingFatherBox hasChildren={hasChildren}>
        {Children}
        {!isShowLoading ? (
          ''
        ) : (
          <LodingBox hasChildren={hasChildren}>
            <LodingWrapper width={width} tip={tip}>
              {iconClass ? iconBox : delay && !isLoading ? '' : children}
            </LodingWrapper>
            {showTips ? <LoadingTip color={color}>{tip}</LoadingTip> : ''}
          </LodingBox>
        )}
      </LoadingFatherBox>
    );
  }
}
export default Loading;
