/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import getPosition from './utils';
import { SliderWrapper, SliderInner, Button, Tips, Tipinner, Tiparrow } from './styled';
import colorsFunc from '../css/stateColor';
const { themeColor } = colorsFunc();
type TypeProps = {
  btnWidth?: number | string,
  btnHeight?: number | string,
  rangeW?: number | string,
  rangeH?: number | string,
  maxValue?: number,
  background?: string,
  defaultValue?: number | Array<number>,
  disabled?: boolean,
  value?: number | Array<number>,
  onchange?: Function,
  tips?: boolean,
};
type TypeState = {
  background?: string,
  changeBackground?: boolean,
  moveX?: number, //随着鼠标的位置变动的值，水平方向的值
  moveY?: number, //随着鼠标的位置变动的值，垂直方向的值
  offsetLeft: number, //值在挂载完就固定了，元素距离窗口左边的距离
  offsetTop: number, //值在挂载完就固定了，元素距离窗口顶部的距离
  value?: number | Array<number>,
  defaultValue?: number | Array<number>,
  disabled?: boolean,
};
Button.displayName = 'Button';
class Slider extends Component<TypeProps, TypeState> {
  sliderRange: any;
  style: Object;
  constructor() {
    super();
    this.sliderRange = React.createRef();
  }
  static getDerivedStateFromProps(nexProps: TypeProps, preState: TypeState) {
    const { background = themeColor, defaultValue = 0, disabled = false } = nexProps;
    let { value } = nexProps;
    const hasValueProps = 'value' in nexProps;
    value = hasValueProps ? value : preState ? preState.value : defaultValue;
    if (!preState) {
      return {
        background,
        changeBackground: false,
        moveX: 0, //随着鼠标的位置变动的值，水平方向的值
        moveY: 0, //随着鼠标的位置变动的值，垂直方向的值
        offsetLeft: 0, //值在挂载完就固定了，元素距离窗口左边的距离
        offsetTop: 0, //值在挂载完就固定了，元素距离窗口顶部的距离
        value,
        defaultValue: parseInt(defaultValue),
        disabled,
      };
    }
  }
  mousedown = (e: SyntheticMouseEvent<MouseEvent>) => {
    const currentValue = e.currentTarget.getAttribute('data-values');
    const index = e.currentTarget.getAttribute('data-index');
    const { value } = this.props;
    if (!value) {
      this.publicmove(e.clientX, currentValue, index);
      this.mousemove();
      this.setState({ changeBackground: true });
    }
  };
  mousemove = () => {
    let that;
    document.onmousemove = e => {
      e = e || window.event;
      this.publicmove(e.clientX);
      this.onchange(this.state.value);
      that = this;
    };
    document.onmouseup = function(e) {
      this.onmousemove = null;
      if (that) {
        that.setState({ changeBackground: false });
      }
    };
  };
  publicmove = (clientX: number, currentValue, index) => {
    const { offsetLeft } = this.state;
    const { rangeW, maxValue, btnWidth } = this.style;
    const halfBtnWidth = btnWidth / 2;
    const offsetRight = rangeW + offsetLeft; //元素右边距离窗口左边的距离
    const diffX = ((clientX - offsetLeft) / rangeW) * 100; //按钮定位的left值
    const moveX = clientX - offsetLeft; //相对于轨道，按钮水平方向移动的距离
    const value = ((moveX / rangeW) * maxValue).toFixed(2); //数字两位小数
    const values = this.state.value;
    values[index] = value;

    this.setState({
      moveX: diffX,
      // value,
      value: [10, 25],
    });
    if (clientX <= offsetLeft) {
      this.setState({
        moveX: 0,
        value: 0,
      });
    }
    if (clientX >= offsetRight) {
      this.setState({
        moveX: 100,
        value: maxValue,
      });
    }

    //滑动时，返回当前值,使用组件者，可以通过这个事件，获取当前值
    this.onchange(this.state.value);
  };
  onchange(v?: any) {
    const { onchange } = this.props;
    onchange && onchange(v);
  }
  mouseup = () => {
    this.setState({ changeBackground: false });
  };
  componentDidMount() {
    const { defaultValue, disabled, value } = this.state;
    const { maxValue, rangeH, btnHeight } = this.style;
    //const halfBtnWidth = btnWidth / 2; //按钮的一半宽度
    const halfBtnHeight = btnHeight / 2;
    const { offsetLeft, offsetTop } = this.getOffset();
    // const currentX =(value / maxValue) * 100;
    const currentY = rangeH / 2 - halfBtnHeight;
    this.setState({
      // moveX: currentX,
      offsetLeft,
      moveY: currentY,
    });
    if (disabled) {
      this.mousedown = null;
    }
  }
  getOffset() {
    const sliderRangeNode = this.sliderRange.current; //slider react 元素
    const { left, top } = getPosition(sliderRangeNode);
    if (!sliderRangeNode) {
      return { offsetLeft: 0, offsetTop: 0 };
    }
    return { offsetLeft: left, offsetTop: top };
  }
  render() {
    const { btnWidth, btnHeight, rangeW, rangeH, maxValue, tips } = this.props;
    const { value } = this.state;
    this.style = {
      btnWidth: parseInt(btnWidth) || 20,
      btnHeight: parseInt(btnHeight) || 20,
      rangeW: parseInt(rangeW) || 300,
      rangeH: parseInt(rangeH) || 6,
      maxValue: parseInt(maxValue) || 20,
    };
    const mousedown = this.mousedown;
    const mouseup = this.mouseup;
    const size = {
      ...this.style,
      ...this.state,
    };
    const children = [];
    for (let i = 0; i < 2; i++) {
      size.moveX = (value[i] / maxValue) * 100;
      const index = i;
      children.push(
        <Button onMouseDown={mousedown} {...size} data-values={value[i]} data-index={index} key={i}>
          {tips ? (
            <Tips>
              <Tipinner>{value[i]}</Tipinner>
              <Tiparrow />
            </Tips>
          ) : (
            ''
          )}
        </Button>
      );
    }
    return (
      <SliderWrapper
        innerRef={this.sliderRange}
        onMouseDown={mousedown}
        onMouseUp={mouseup}
        {...size}
      >
        <SliderInner {...size} />
        {children}
      </SliderWrapper>
    );
  }
}
export default Slider;
