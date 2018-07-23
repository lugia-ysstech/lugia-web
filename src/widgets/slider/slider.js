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
  onChange?: Function,
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
  index?: number,
  btnDisabled?: boolean,
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
    if (!(value instanceof Array)) {
      value = [value];
    }
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
        index: 0,
      };
    }
  }
  mousedown = (e: SyntheticMouseEvent<MouseEvent>) => {
    const index = Number(e.target.getAttribute('data-index'));
    const { value } = this.props;
    if (!value) {
      this.publicmove(e.clientX, index);
      this.mousemove(index);
      this.setState({ changeBackground: true, index });
    }
  };
  mousemove = (index?: number) => {
    let that;
    document.onmousemove = e => {
      e = e || window.event;
      this.publicmove(e.clientX, index);
      this.onchange(this.state.value);
      that = this;
    };
    document.onmouseup = function(e) {
      this.onmousemove = null;
      if (that) {
        let { value } = that.state;
        value.sort(that.sortNumber);
        that.setState({ changeBackground: false });
        if (value.length === 1) {
          value = value[0];
        }
        that.onchange(value);
      }
    };
  };
  publicmove = (clientX: number, index?: number) => {
    //console.log('publicmove',currentValue);
    const { offsetLeft, value } = this.state;

    const { rangeW, maxValue, btnWidth } = this.style;
    const halfBtnWidth = btnWidth / 2;
    const offsetRight = rangeW + offsetLeft; //元素右边距离窗口左边的距离
    const diffX = ((clientX - offsetLeft) / rangeW) * 100; //按钮定位的left值
    const moveX = clientX - offsetLeft; //相对于轨道，按钮水平方向移动的距离
    const moveValue = ((moveX / rangeW) * maxValue).toFixed(2); //数字两位小数
    if (value.length === 1) {
      index = 0;
    }
    if (index !== 2) {
      value[index] = moveValue;
    }
    if (Array.isArray(value) && value.length === 2) {
      const leftDistance = Math.abs(moveValue - value[0]);
      const rightDistance = Math.abs(moveValue - value[1]);
      if (leftDistance <= rightDistance) {
        value[0] = moveValue;
      }
      if (leftDistance > rightDistance) {
        value[1] = moveValue;
      }
    }

    this.setState({
      moveX: diffX,
      value,
    });

    if (clientX <= offsetLeft) {
      console.log('clientX <= offsetLeft');
      if (value.length == 2 && value[1] > value[0]) {
        value[0] = 0;
      } else if (value[1] < value[0]) {
        value[1] = 0;
      }
      if (value.length == 1) {
        value[0] = 0;
      }
      this.setState({
        moveX: 0,
        value,
      });
    }

    if (clientX >= offsetRight) {
      console.log('clientX >= offsetLeft');
      if (value.length == 2 && value[1] > value[0]) {
        value[1] = maxValue;
      } else if (value[1] < value[0]) {
        value[0] = maxValue;
      }
      if (value.length == 1) {
        value[0] = maxValue;
      }
      this.setState({
        moveX: 100,
        value,
      });
    }
  };
  onchange(v?: any) {
    const { onChange } = this.props;
    onChange && onChange(v);
  }
  mouseup = () => {
    let { value } = this.state;
    this.setState({ changeBackground: false });
    value.sort(this.sortNumber);
    if (value.length === 1) {
      value = value[0];
    }
    this.onchange(value);
  };
  sortNumber(a?: number, b?: number) {
    return a - b;
  }
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
    const {
      btnWidth = 20,
      btnHeight = 20,
      rangeH = 6,
      rangeW = 300,
      maxValue = 20,
      tips = false,
    } = this.props;
    const { value, changeBackground, index } = this.state;
    let SliderInnerWidth = ((value[0] - value[1]) / maxValue) * 100;
    let SliderInnerLeft = 0;
    if (Array.isArray(value) && value.length == 2) {
      SliderInnerWidth = (Math.abs(value[0] - value[1]) / maxValue) * 100;
      SliderInnerLeft = (Math.min(value[0], value[1]) / maxValue) * 100;
    }
    this.style = {
      btnWidth: parseInt(btnWidth),
      btnHeight: parseInt(btnHeight),
      rangeW: parseInt(rangeW),
      rangeH: parseInt(rangeH),
      maxValue: parseInt(maxValue),
      SliderInnerWidth,
      SliderInnerLeft,
    };
    const mousedown = this.mousedown;
    const mouseup = this.mouseup;
    const size = {
      ...this.style,
      ...this.state,
    };
    const children = [];
    for (let i = 0; i < value.length; i++) {
      size.moveX = (value[i] / maxValue) * 100;
      let btnDisabled = true;
      if (index === i && index !== 2) {
        btnDisabled = true;
      } else {
        btnDisabled = false;
      }
      size.btnDisabled = btnDisabled;
      children.push(
        <Button
          onMouseDown={btnDisabled && changeBackground ? mousedown : null}
          {...size}
          data-value={value[i]}
          data-index={i}
          key={i}
        >
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
        data-index={2}
        onMouseUp={mouseup}
        {...size}
      >
        <SliderInner {...size} data-index={2} />
        {children}
      </SliderWrapper>
    );
  }
}
export default Slider;
