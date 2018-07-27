/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import getPosition from './utils';
import { SliderWrapper, SliderInner, Button, Tips, Tipinner, Tiparrow, Dot } from './styled';
import colorsFunc from '../css/stateColor';
const { themeColor } = colorsFunc();
type TypeProps = {
  btnWidth?: number | string,
  btnHeight?: number | string,
  rangeW?: number | string,
  rangeH?: number | string,
  maxValue?: number,
  minValue?: number,
  background?: string,
  defaultValue?: number | Array<number>,
  disabled?: boolean,
  value?: number | Array<number>,
  onChange?: Function,
  tips?: boolean,
  marks?: Object,
};
type TypeState = {
  changeBackground?: boolean,
  moveX?: number, //随着鼠标的位置变动的值，水平方向的值
  moveY?: number, //随着鼠标的位置变动的值，垂直方向的值
  offsetLeft: number, //值在挂载完就固定了，元素距离窗口左边的距离
  offsetTop: number, //值在挂载完就固定了，元素距离窗口顶部的距离
  value: Array<number>,
  defaultValue: Array<number>,
  disabled?: boolean,
  index?: number,
  btnDisabled?: boolean,
  moveValue?: number,
  marksKeys?: Array<number>,
  minValue?: number,
  maxValue?: number,
  marks?: Object,
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
    let { minValue = 0, maxValue = 30, marks } = nexProps;
    const { defaultValue = 0, disabled = false } = nexProps;
    let { value } = nexProps;
    const hasValueProps = 'value' in nexProps;
    const hasMarksProps = 'marks' in nexProps;
    value = hasValueProps ? value : preState ? preState.value : defaultValue;


    const marksKeys = [];
    if (hasMarksProps) {
      for (const key in marks) {
        marksKeys.push(key);
      }
      const min = Math.min(...marksKeys);
      const max = Math.max(...marksKeys);
      if (minValue <= min) {
        marksKeys.unshift(minValue);
        marks[minValue] = minValue;
      } else {
        minValue = min;
      }
      if (maxValue > max) {
        marksKeys.push(maxValue);
        marks[maxValue] = maxValue;
      } else {
        maxValue = max;
      }
    }
    if (value < minValue) {
      value = minValue;
    }
    if (value !== undefined && !(value instanceof Array)) {
      value = [value];
    }
    if (value && value.length > 2) {
      value = value.slice(0, 2);
    }

    if(preState){
      console.log('preState',preState.index);
    }
    if (!preState) {
      return {
        changeBackground: false,
        moveX: 0, //随着鼠标的位置变动的值，水平方向的值
        moveY: 0, //随着鼠标的位置变动的值，垂直方向的值
        offsetLeft: 0, //值在挂载完就固定了，元素距离窗口左边的距离
        offsetTop: 0, //值在挂载完就固定了，元素距离窗口顶部的距离
        value,
        defaultValue: parseInt(defaultValue),
        disabled,
        index: 0,
        btnDisabled:true,
        moveValue: 0,
        marksKeys,
        minValue,
        maxValue,
        marks,
      };
    }
  }
  mousedown = (e: SyntheticMouseEvent<MouseEvent>) => {
    const { value, marks } = this.props;

    if (!value) {
      this.publicmove(e.clientX);
      this.mousemove();
      this.setState({ changeBackground: true });
    }
  };
  mousemove = (index?: number) => {
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
        let { value } = that.state;

        if (value) {
          const { length } = value;
          if (length === 2) {
            value.sort(that.sortNumber);
          }
          if (length === 1) {
            value = value[0];
          }
        }

        that.setState({ changeBackground: false });
        that.onchange(value);
      }
    };
  };
  publicmove = (clientX: number) => {
    const { offsetLeft, value, marksKeys } = this.state;
    let {index} =this.state;
    const { rangeW, maxValue, btnWidth, minValue } = this.style;
    const { marks } = this.props;
    const halfBtnWidth = btnWidth / 2;
    const offsetRight = rangeW + offsetLeft; //元素右边距离窗口左边的距离
    let diffX = ((clientX - offsetLeft) / rangeW) * 100; //按钮定位的left值
    const moveX = clientX - offsetLeft; //相对于轨道，按钮水平方向移动的距离
    let moveValue = (moveX / rangeW) * (maxValue - minValue); //数字两位小数
    moveValue = (moveValue + minValue).toFixed(2);
    moveValue = parseInt(moveValue);

    if (value && value.length === 1) {
      index = 0;
    }


    function getMarkValue(){
      let nextV=[];
      for (let i=0;i<marksKeys.length;i++){
        const nextIndex=i+1;
        if(i === marksKeys.length-1){
          break;
        }
        const nextValue=marksKeys[nextIndex]*1;
        const currentValue=marksKeys[i]*1;
        const MiddleValue=(currentValue*1 +  nextValue*1)*0.5;
        if(moveValue >= MiddleValue){
          nextV=[];
          nextV.push(nextValue);
        }else{
          nextV.push(currentValue);
        }
      }
      const markValue =nextV[0];
      return {markValue};
    }
    const {markValue}=getMarkValue();
    if(marks && marksKeys){
      diffX= ((markValue - minValue) / (maxValue - minValue)) * 100;
    }
    if (Array.isArray(value) && value.length === 2 ) {
      const leftDistance = Math.abs(moveValue - value[0]);
      const rightDistance = Math.abs(moveValue - value[1]);
      if (leftDistance <= rightDistance) {
        value[0] = moveValue;
        index=0;
        if(marks && marksKeys){
          value[0] = markValue;
        }
      }
      if (leftDistance > rightDistance) {
        value[1] = moveValue;
        index=1;
        if(marks && marksKeys){
          value[1] = markValue;
        }
      }
    }
    if ( index !== undefined) {
      value[index] = moveValue;
      if(markValue && marks && marksKeys){
        value[index] = markValue;
      }
    }
    if (clientX <= offsetLeft) {
      if (value) {
        if (value.length == 2 && value[1] > value[0]) {
          value[0] = minValue;
        } else if (value[1] < value[0]) {
          value[1] = minValue;
        }
        if (value.length == 1) {
          value[0] = minValue;
        }
      }
      this.setState({
        moveX: 0,
      });
    }

    if (clientX >= offsetRight) {
      if (value) {
        if (value.length == 2 && value[1] > value[0]) {
          value[1] = maxValue;
        } else if (value && value[1] < value[0]) {
          value[0] = maxValue;
        }
        if (value.length == 1) {
          value[0] = maxValue;
        }
      }

      this.setState({
        moveX: 100,
      });
    }

    this.setState({
      moveX: diffX,
      value,
      moveValue,
      index
    });



  };
  onchange(v?: any) {
    const { onChange } = this.props;
    onChange && onChange(v);
  }
  mouseup = () => {
    let { value } = this.state;
    this.setState({ changeBackground: false });
    if (value) {
      const { length } = value;
      if (length === 2) {
        value.sort(this.sortNumber);
      }
      if (length === 1) {
        value = value[0];
      }
    }
    this.onchange(value);
  };
  sortNumber(a: number, b: number) {
    return a - b;
  }
  componentDidMount() {
    const { defaultValue, disabled, value } = this.state;
    const { maxValue, minValue, rangeH, btnHeight } = this.style;
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
      background = themeColor,
      btnWidth = 20,
      btnHeight = 20,
      rangeH = 6,
      rangeW = 300,
      tips = false,
    } = this.props;
    const {
      value,
      changeBackground,
      index,
      moveValue,
      marksKeys,
      minValue,
      maxValue,
      marks,
    } = this.state;
    const { moveX } = this.state;
    let {btnDisabled} =this.state;
    let SliderInnerWidth = ((value[0] - value[1]) / maxValue) * 100;
    let SliderInnerLeft = 0;
    if (Array.isArray(value) && value.length == 2) {
      SliderInnerWidth = (Math.abs(value[0] - value[1]) / (maxValue - minValue)) * 100;
      SliderInnerLeft = (Math.min(value[0] - minValue, value[1] - minValue) / (maxValue - minValue)) * 100;
    }
    const hasMarksProps = 'marks' in this.props;
    const Dots = [];
    if (hasMarksProps) {
      for (let i: number = 0; i < marksKeys.length; i++) {
        const dotIndex = parseInt(marksKeys[i]);
        const dotMoveX = ((dotIndex - minValue) / (maxValue - minValue)) * 100;
        const data = {
          marks: marks[dotIndex],
          dotMoveX,
          dotIndex,
          minValue,
          maxValue,
          moveValue,
        };
        Dots.push(<Dot marksData={data} key={dotIndex} />);
      }
    }
    this.style = {
      background,
      btnWidth: parseInt(btnWidth),
      btnHeight: parseInt(btnHeight),
      rangeW: parseInt(rangeW),
      rangeH: parseInt(rangeH),
      maxValue: parseInt(maxValue),
      minValue: parseInt(minValue),
      SliderInnerWidth,
      SliderInnerLeft,
    };
    const mousedown = this.mousedown;
    const mouseup = this.mouseup;
    const showTip = tips && changeBackground;
    const size = {
      ...this.style,
      ...this.state,
    };
    const children = [];
    for (let i = 0; i < value.length; i++) {
      size.moveX = ((value[i] - minValue) / (maxValue - minValue)) * 100;
      if (index === i) {
        btnDisabled = true;
      } else {
        btnDisabled = false;
      }
      size.btnDisabled = btnDisabled;
      children.push(
        <Button onMouseDown={mousedown} {...size}  key={i}>
          {showTip && btnDisabled ? (
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
        {Dots}
        <SliderInner {...size}/>
        {children}
      </SliderWrapper>
    );
  }
}
export default Slider;
