/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import Icon from '../icon/index';
import getPosition from './utils';
import { getMinAndMax, limit, limitToSet, sortable } from '../common/Math';
import { Button, Dot, Icons, SliderInner, SliderWrapper, Tiparrow, Tipinner, Tips } from './styled';

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
  marks?: { [key: number]: string | Object },
  icons?: Array<Object>,
  vertical?: boolean,
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
  marks?: { [key: number]: string | Object },
  isMouseEnter?: boolean,
};
Button.displayName = 'Button';
class Slider extends Component<TypeProps, TypeState> {
  sliderRange: any;
  style: {
    background?: string,
    btnWidth: number,
    btnHeight: number,
    rangeW: number,
    rangeH: number,
    maxValue: number,
    minValue: number,
    SliderInnerWidth: number,
    SliderInnerLeft: number,
  };
  oldValue: Array<number>;

  constructor() {
    super();
    this.sliderRange = React.createRef();
  }

  static getDerivedStateFromProps(nexProps: TypeProps, preState: TypeState) {
    let { minValue = 0, maxValue = 30, marks = {} } = nexProps;
    const { defaultValue = 0, disabled = false } = nexProps;
    let { value } = nexProps;
    const hasValueProps = 'value' in nexProps;
    const hasMarksProps = 'marks' in nexProps;
    const hasMinValueProps = 'minValue' in nexProps;
    const hasMaxValueProps = 'maxValue' in nexProps;
    value = hasValueProps ? value : preState ? preState.value : defaultValue;
    if (maxValue < minValue) {
      maxValue = minValue;
    }
    let marksKeys = [];
    const newMarks = { ...marks };
    if (hasMarksProps) {
      for (const key in marks) {
        marksKeys.push(Number(key));
      }
      const { max, min } = getMinAndMax(marksKeys);
      if (!hasMinValueProps) {
        minValue = min;
      }
      if (!hasMaxValueProps) {
        maxValue = max;
      }
      marksKeys.unshift(minValue);
      marksKeys.push(maxValue);
      // 删除不在范围内的元素
      marksKeys = limitToSet(marksKeys, [minValue, maxValue]);
      marksKeys.forEach(item => {
        const mark = marks[item];
        newMarks[item] = mark ? mark : item.toString();
      });
    }
    if (!Array.isArray(value)) {
      value = [value];
    }
    if (Array.isArray(value)) {
      const { length } = value;
      value[0] = limit(value[0], [minValue, maxValue]);
      length === 2 && (value[1] = limit(value[1], [minValue, maxValue]));
    }
    value = value.slice(0, 2);
    value = value.sort(sortable);
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
        marks: newMarks,
        isMouseEnter: false,
      };
    }
  }

  mousedown = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    const { index } = this.getNewIndex(e.pageX, e.pageY);
    const { value } = this.state;
    this.oldValue = [...value];
    this.mousedownFun(e.pageX, e.pageY, index);
  };
  mousedownFun = (pageX: number, pageY: number, index: number) => {
    const { disabled } = this.props;
    if (!this.props.value && !disabled) {
      this.publicmove(pageX, pageY, index);
      this.mousemove(index);
      this.setState({ changeBackground: true });
    }
  };
  mousemove = (index: number) => {
    let that;
    const onMouseMove = (e: Object) => {
      e = e || window.event;
      this.publicmove(e.pageX, e.pageY, index);
      that = this;
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', (e: Object) => {
      document.removeEventListener('mousemove', onMouseMove);
      if (that && this.state.changeBackground) {
        const { value } = that.state;
        that.setState({ changeBackground: false });
        that.onchange(e, value);
      }
    });
  };
  publicmove = (pageX: number, pageY: number, index: number) => {
    console.log(index);
    this.setState({ index, changeBackground: true });
    const { marksKeys, value } = this.state;
    const { marks } = this.props;
    const { moveValue } = this.getMoveState(pageX, pageY);
    if (value && value.length === 1) {
      index = 0;
    }
    const val = [...value];
    if (index !== undefined) {
      val[index] = moveValue;
      if (marks && marksKeys) {
        const { markValue } = this.getMarkValue(marksKeys, moveValue);
        val[index] = markValue;
      }
    }
    this.setState({
      value: val,
    });
  };

  onchange(event: SyntheticMouseEvent<HTMLButtonElement>, value: Array<number>): Object {
    const { onChange } = this.props;
    const { marks, marksKeys } = this.state;
    let oldValue = this.oldValue;
    let newValue = [...value];
    let newItem, oldItem;
    const { length } = newValue;
    if (length === 1) {
      newValue = value[0];
      oldValue = oldValue[0];
    }
    if (marksKeys.length > 0 && length === 2) {
      newItem = [marks[newValue[0]], marks[newValue[1]]];
      oldItem = [marks[oldValue[0]], marks[oldValue[1]]];
    } else {
      newItem = marks[newValue];
      oldItem = marks[oldValue];
    }
    const data: Object = {
      oldValue,
      newValue,
      event,
    };
    if (marksKeys.length > 0) {
      data.newItem = newItem;
      data.oldItem = oldItem;
    }
    onChange && onChange(data);
  }

  mouseup = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    const { disabled } = this.props;
    const { value } = this.state;
    if (!disabled) {
      this.setState({ changeBackground: false });
      this.onchange(event, value);
    }
  };
  mouseenter = (index: number) => {
    if (this.state.changeBackground || this.state.isMouseEnter) {
      const { disabled, value } = this.props;
      let changeBackground = true;
      if (disabled || value) {
        changeBackground = false;
      }
      this.setState({ index, changeBackground, isMouseEnter: true });
    }

    console.log(index);
  };
  mouseleave = () => {
    this.setState({ changeBackground: false, isMouseEnter: false });
  };
  getMoveState = (pageX: number, pageY: number) => {
    const { offsetLeft, offsetTop } = this.state;
    const { rangeW, maxValue, minValue } = this.style;
    const { vertical } = this.props;
    const moveX = pageX - offsetLeft; //相对于轨道，按钮水平方向移动的距离
    const moveY = rangeW - (pageY - offsetTop); //相对于轨道，按钮垂直方向移动的距离
    let moveValue = (moveX / rangeW) * (maxValue - minValue); //当前移动值
    if (vertical) {
      moveValue = (moveY / rangeW) * (maxValue - minValue);
    }
    moveValue = (moveValue + minValue).toFixed(2);
    moveValue = Number(moveValue);
    return {
      moveValue,
    };
  };
  getNewIndex = (pageX: number, pageY: number) => {
    const { value } = this.state;
    const { moveValue } = this.getMoveState(pageX, pageY);
    let index = 0;
    if (Array.isArray(value) && value.length === 2) {
      const leftDistance = Math.abs(moveValue - value[0]);
      const rightDistance = Math.abs(moveValue - value[1]);
      if (leftDistance <= rightDistance) {
        index = 0;
      } else {
        index = 1;
      }
    }
    return { index };
  };
  getMarkValue = (marksKeys: Array<number>, moveValue: number): { markValue: number } => {
    let nextV = [];
    for (let i = 0; i < marksKeys.length; i++) {
      const nextIndex = i + 1;
      if (i === marksKeys.length - 1) {
        break;
      }
      const nextValue = marksKeys[nextIndex] * 1;
      const currentValue = marksKeys[i] * 1;
      const MiddleValue = (currentValue * 1 + nextValue * 1) * 0.5;
      if (moveValue >= MiddleValue) {
        nextV = [];
        nextV.push(nextValue);
      } else {
        nextV.push(currentValue);
      }
    }
    const markValue = nextV[0];
    return { markValue };
  };

  componentDidMount() {
    const { disabled } = this.state;
    const { offsetLeft, offsetTop } = this.getOffset();
    this.setState({
      offsetLeft,
      offsetTop,
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

  getMoveValue = (val: number, circleWidth: number) => {
    const { maxValue, minValue, rangeW } = this.style;
    const proportion = val / (maxValue - minValue); //比例
    const btnMove = ((proportion * rangeW - circleWidth / 2) / rangeW) * 100; //比例转化成px计算按钮中心点的位置；
    return { btnMove };
  };

  render() {
    const {
      background,
      btnWidth = 20,
      btnHeight = 20,
      rangeH = 6,
      rangeW = 300,
      tips = false,
      icons,
      vertical,
      disabled,
      getTheme,
    } = this.props;
    const {
      value,
      changeBackground,
      index,
      moveValue,
      marksKeys,
      marks,
      isMouseEnter,
    } = this.state;
    let { minValue, maxValue } = this.state;

    this.style = {
      background,
      btnWidth: parseInt(btnWidth),
      btnHeight: parseInt(btnHeight),
      rangeW: parseInt(rangeW),
      rangeH: parseInt(rangeH),
      maxValue: Number(maxValue),
      minValue: Number(minValue),
      SliderInnerWidth: 0,
      SliderInnerLeft: 0,
    };
    minValue = this.style.minValue;
    maxValue = this.style.maxValue;
    const differenceValue = maxValue - minValue;
    const firstMinV = value[0] - minValue;
    this.style.SliderInnerWidth = (firstMinV / differenceValue) * 100;
    if (Array.isArray(value) && value.length == 2) {
      this.style.SliderInnerWidth = (Math.abs(value[0] - value[1]) / differenceValue) * 100;
      this.style.SliderInnerLeft =
        (Math.min(firstMinV, value[1] - minValue) / differenceValue) * 100;
    }

    const Dots = [];
    if (marksKeys.length > 0) {
      for (let i: number = 0; i < marksKeys.length; i++) {
        const dotIndex = parseInt(marksKeys[i]);
        const dotVal = dotIndex - minValue;
        const dotMoveX = this.getMoveValue(dotVal, this.style.rangeH).btnMove;
        const data = {
          marks: marks[dotIndex],
          dotMoveX,
          dotIndex,
          minValue,
          maxValue,
          moveValue,
          vertical,
          rangeW: this.style.rangeW,
          rangeH: this.style.rangeH,
        };
        Dots.push(<Dot marksData={data} key={dotIndex} getTheme={getTheme} />);
      }
    }

    const mousedown = !disabled ? this.mousedown : null;
    const mouseup = !disabled ? this.mouseup : null;
    const mouseenter = this.mouseenter;
    const mouseleave = this.mouseleave;
    const showTip = tips && (changeBackground || isMouseEnter);
    console.log('showTip', showTip);
    console.log('changeBackground', changeBackground);
    console.log('isMouseEnter', isMouseEnter);
    const size = {
      ...this.style,
      ...this.state,
      vertical,
      btnDisabled: true,
      middleVal: 0,
    };
    const children = [];
    for (let i = 0; i < value.length; i++) {
      const val = value[i] - minValue;
      size.moveX = this.getMoveValue(val, size.btnWidth).btnMove;
      if (vertical) {
        size.moveY = this.getMoveValue(val, size.btnHeight).btnMove;
      }
      let btnDisabled = true;
      if (index === i) {
        btnDisabled = true;
      } else {
        btnDisabled = false;
      }
      size.btnDisabled = btnDisabled;
      children.push(
        <Button
          onMouseDown={mousedown}
          onMouseEnter={() => mouseenter(i)}
          onMouseLeave={mouseleave}
          {...size}
          key={i}
          getTheme={getTheme}
        >
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
    const iconsChildren = [];
    if (hasIconsProps && value.length === 1 && Array.isArray(icons) && icons.length > 0) {
      const middleVal = (maxValue + minValue) / 2;
      size.middleVal = middleVal;
      icons.forEach(function(currentValue, index) {
        const iconChild = (
          <Icons iconStyle={currentValue} {...size} getTheme={getTheme}>
            <Icon iconClass={currentValue.name} />
          </Icons>
        );
        iconsChildren.push(iconChild);
      });
    }
    return (
      <SliderWrapper
        innerRef={this.sliderRange}
        onMouseDown={mousedown}
        onMouseUp={mouseup}
        {...size}
        getTheme={getTheme}
      >
        {iconsChildren}
        {Dots}
        <SliderInner {...size} getTheme={getTheme} />
        {children}
      </SliderWrapper>
    );
  }
}

export default Slider;
