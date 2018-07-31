/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import Icon from '../icon/index';
import getPosition from './utils';
import { SliderWrapper, SliderInner, Button, Tips, Tipinner, Tiparrow, Dot,Icons } from './styled';
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
  icons?: Object,
  vertical?: boolean
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
        moveValue: 0,
        marksKeys,
        minValue,
        maxValue,
        marks,
      };
    }
  }
  mousedown = (e: SyntheticMouseEvent<MouseEvent>) => {
    const { value } = this.props;
    const {index}=this.getNewIndex(e.pageX,e.pageY);
    if (!value) {
      this.publicmove(e.pageX,e.pageY,index);
      this.mousemove(index);
      this.setState({ changeBackground: true });
    }

  };
  mousemove = (index:number) => {
    let that;
    document.onmousemove = e => {
      e = e || window.event;
      this.publicmove(e.pageX,e.pageY,index);
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
  publicmove = (clientX: number,clientY: number,index:number) => {
     const { offsetLeft,offsetTop, value, marksKeys } = this.state;
     const { rangeW, maxValue, btnWidth, minValue } = this.style;
     const { marks,vertical } = this.props;
    const {moveValue,offsetRight,offsetBottom}=this.getMoveState(clientX,clientY);

    let {diffX,diffY}=this.getMoveState(clientX,clientY);
    const {markValue}=this.getMarkValue(marksKeys,moveValue);
    if (value && value.length === 1) {
      index = 0;
    }
      if(marks && marksKeys){
        diffX= ((markValue - minValue) / (maxValue - minValue)) * 100;
      }
    if(index !== undefined){
      value[index] = moveValue;
      if(marks && marksKeys){
        value[index] = markValue;
      }
    }

    if ( (!vertical && clientX <= offsetLeft) || (vertical && clientY <= offsetTop)) {
      if (value) {
        if (value.length == 2 && value[1] > value[0]) {
          if( vertical ){
            value[1] = maxValue;
          }else{
            value[0] = minValue;
          }
        } else if (value[1] < value[0]) {
          if( vertical ){
            value[0] = maxValue;
          }else{
            value[1] = minValue;
          }
        }
        if (value.length == 1) {
          value[0] = minValue;
          if( vertical ) {
            value[0] = maxValue;
          }
        }
      }
      if(!vertical && clientX <= offsetLeft){
        this.setState({
          moveX: 0,
        });
      }
      if((vertical && clientY <= offsetTop)){
        this.setState({
          moveY: 100,
        });
      }
    }
    if ( (!vertical && clientX >= offsetRight) || (vertical && clientY >= offsetBottom) ) {
      if (value) {
        if (value.length == 2 && value[1] > value[0]) {
          if(vertical){
            value[0] = minValue;
          }else{
            value[1] = maxValue;
          }
        } else if (value && value[1] < value[0]) {
          if(vertical){
            value[1] = minValue;
          }else{
            value[0] = maxValue;
          }
        }
        if (value.length == 1) {
          value[0] = maxValue;
          if(vertical){
            value[0] = minValue;
          }
        }
      }
      if(!vertical && clientX >= offsetRight){
        this.setState({
          moveX: 100,
        });
      }

      if(vertical && clientY >= offsetBottom){
        this.setState({
          moveY: 0,
        });

      }
    }
    this.setState({
      moveX: diffX,
      moveY:diffY,
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
    const { index } = this.state;
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
  getMoveState = (clientX: number,clientY: number) => {

    const { offsetLeft,offsetTop, value, marksKeys } = this.state;
    const {index} =this.state;
    const { rangeW,rangeH, maxValue, btnWidth, minValue } = this.style;
    const { marks,vertical } = this.props;
    const halfBtnWidth = btnWidth / 2;
    const offsetRight = rangeW + offsetLeft; //元素右边距离窗口左边的距离
    const offsetBottom = rangeW + offsetTop; //元素底部距离窗顶部边的距离
    const diffX = ((clientX - offsetLeft) / rangeW) * 100; //按钮定位的left值
    const moveX = clientX - offsetLeft; //相对于轨道，按钮水平方向移动的距离
    const diffY = ((clientY - offsetTop) / rangeW) * 100; //按钮定位的top值
    const moveY = rangeW - (clientY - offsetTop); //相对于轨道，按钮垂直方向移动的距离
    let moveValue=(moveX / rangeW) * (maxValue - minValue);//当前移动值
    if(vertical){
      moveValue = (moveY / rangeW) * (maxValue - minValue);
    }
    moveValue = (moveValue + minValue).toFixed(2);
    moveValue = parseInt(moveValue);

    return{
      diffX,
      diffY,
      moveX,
      moveValue,
      offsetRight,
      offsetBottom
    };
  };
  getNewIndex = ( clientX:number,clientY:number ) => {
    const {value} =this.state;
    const {moveValue}=this.getMoveState(clientX,clientY);
    let index=0;
    if (Array.isArray(value) && value.length === 2 ) {
      const leftDistance = Math.abs(moveValue - value[0]);
      const rightDistance = Math.abs(moveValue - value[1]);
      if (leftDistance <= rightDistance) {
        index=0;
      }
      if (leftDistance > rightDistance) {
        index=1;
      }
    }
    return {index};
  };
  getMarkValue =(marksKeys:Array<number>,moveValue:number) => {
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
      offsetTop,
      //moveY: currentY,
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
  getMoveValue = (val:number,circleWidth:number) => {
    const {maxValue,minValue} =this.state;
    const {rangeW} =this.style;
    const proportion =val / (maxValue - minValue); //比例
    const btnMove =(proportion * rangeW - (circleWidth/2))/rangeW *100; //比例转化成px计算按钮中心点的位置；
    return {btnMove};
  };
  render() {
    const {
      background = themeColor,
      btnWidth = 20,
      btnHeight = 20,
      rangeH = 6,
      rangeW = 300,
      tips = false,
      icons,
      vertical
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



    this.style = {
      background,
      btnWidth: parseInt(btnWidth),
      btnHeight: parseInt(btnHeight),
      rangeW: parseInt(rangeW),
      rangeH: parseInt(rangeH),
      maxValue: parseInt(maxValue),
      minValue: parseInt(minValue),
    };
    let SliderInnerWidth = ((value[0] - minValue) / (maxValue - minValue)) * 100;
    let SliderInnerLeft = 0;
    if (Array.isArray(value) && value.length == 2) {
      SliderInnerWidth = (Math.abs(value[0] - value[1]) / (maxValue - minValue)) * 100;
      SliderInnerLeft = (Math.min(value[0] - minValue, value[1] - minValue) / (maxValue - minValue)) * 100;
    }
    this.style.SliderInnerWidth=SliderInnerWidth;
    this.style.SliderInnerLeft=SliderInnerLeft;

    const hasMarksProps = 'marks' in this.props;
    const Dots = [];
    if (hasMarksProps && marksKeys) {
      for (let i: number = 0; i < marksKeys.length; i++) {
        const dotIndex = parseInt(marksKeys[i]);
        const dotVal = dotIndex - minValue;
        const dotMoveX=this.getMoveValue(dotVal,this.style.rangeH).btnMove;
        const data = {
          marks: marks[dotIndex],
          dotMoveX,
          dotIndex,
          minValue,
          maxValue,
          moveValue,
          vertical,
        };
        Dots.push(<Dot marksData={data} key={dotIndex}/>);
      }
    }


    const mousedown = this.mousedown;
    const mouseup = this.mouseup;
    const showTip = tips && changeBackground;
    const size = {
      ...this.style,
      ...this.state,
      vertical
    };
    const children = [];
    for (let i = 0; i < value.length; i++) {
      const val=(value[i] - minValue);
      const btnMove = this.getMoveValue(val,size.btnWidth).btnMove;

      size.moveX=btnMove;
      if(vertical){
        size.moveY = btnMove;
      }
      let btnDisabled=true;
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
    const hasIconsProps = 'icons' in this.props;
    const iconsChildren=[];
    if(hasIconsProps && value.length===1){
      let iconIsChange;
      const middleVal= (maxValue + minValue)/2;
      size.middleVal =middleVal;
      icons.forEach(function(currentValue,index){
        const iconChild=<Icons iconStyle={currentValue}  {...size}><Icon iconClass={currentValue.name}/></Icons>;
        iconsChildren.push(iconChild);
      });
    }
    return (
      <SliderWrapper
        innerRef={this.sliderRange}
        onMouseDown={mousedown}
        onMouseUp={mouseup}

        {...size}
      >
        {iconsChildren}
        {Dots}
        <SliderInner {...size}/>
        {children}
      </SliderWrapper>
    );
  }
}
export default Slider;
