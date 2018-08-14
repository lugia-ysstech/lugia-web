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
  getTheme: Function,
};
type TypeState = {
  changeBackground?: boolean,
  moveX?: number, //随着鼠标的位置变动的值，水平方向的值
  moveY?: number, //随着鼠标的位置变动的值，垂直方向的值
  offsetLeft: number, //值在挂载完就固定了，元素距离窗口左边的距离
  offsetTop: number, //值在挂载完就固定了，元素距离窗口顶部的距离
  value: Array<number>,
  disabled?: boolean,
  index?: number,
  moveValue?: number,
  marksKeys: Array<number>,
  minValue: number,
  maxValue: number,
  marks: { [key: number]: string | Object },
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
    // maxValue: number,
    // minValue: number,
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
      value = value === undefined || value === null ? [minValue] : [value];
    }
    if (Array.isArray(value)) {
      const { length } = value;
      value[0] = limit(value[0], [minValue, maxValue]);
      length === 2 && (value[1] = limit(value[1], [minValue, maxValue]));
    }
    const newValue: Array<number> = value.slice(0, 2);
    if (!preState) {
      return {
        changeBackground: false,
        moveX: 0, //随着鼠标的位置变动的值，水平方向的值
        moveY: 0, //随着鼠标的位置变动的值，垂直方向的值
        offsetLeft: 0, //值在挂载完就固定了，元素距离窗口左边的距离
        offsetTop: 0, //值在挂载完就固定了，元素距离窗口顶部的距离
        value: newValue,
        disabled,
        index: 0,
        moveValue: 0,
        marksKeys,
        minValue: parseFloat(minValue),
        maxValue: parseFloat(maxValue),
        marks: newMarks,
        isMouseEnter: false,
      };
    }
  }

  mousedown = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e = e || window.event;
    const { pageX, pageY } = e;
    console.log(pageX, pageY);
    const { index } = this.getNewIndex(pageX, pageY);
    const { value, isMouseEnter } = this.state;
    this.oldValue = [...value];
    const { disabled } = this.props;

    if (!this.props.value && !disabled) {
      if (!isMouseEnter) {
        this.publicmove(pageX, pageY, index);
      }
      this.mousemove(index);
      this.setState({ changeBackground: true });
    }
  };
  mousemove = (index: number) => {
    const onMouseMove = (e: Object) => {
      console.log('addEventListener>>>mousemove');
      e = e || window.event;
      this.publicmove(e.pageX, e.pageY, index);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', (e: Object) => {
      document.removeEventListener('mousemove', onMouseMove);
      if (this.state.changeBackground) {
        this.setState({ changeBackground: false });
        this.onchange(e);
      }
    });
  };
  publicmove = (pageX: number, pageY: number, index: number) => {
    const { marksKeys, value } = this.state;
    const { moveValue } = this.getMoveState(pageX, pageY);
    if (value && value.length === 1) {
      index = 0;
    }
    const { markValue } = this.getMarkValue(marksKeys, moveValue);
    value[index] = marksKeys.length > 0 ? markValue : moveValue;
    this.setState({
      value,
      moveValue, //用于marks 时dot节点css样式的判断
      index,
      changeBackground: true,
    });
  };

  onchange(event: SyntheticMouseEvent<HTMLButtonElement>) {
    const { onChange } = this.props;
    const { marks, marksKeys, value } = this.state;
    let { oldValue } = this;
    let newValue = value.sort(sortable);
    const oldVal = oldValue && oldValue.sort(sortable);
    const { length } = newValue;
    function getItem(val) {
      const item = length === 2 ? [marks[val[0]], marks[val[1]]] : marks[val[0]];
      return item;
    }
    if (length === 1) {
      newValue = value[0];
      oldValue = oldValue && oldValue[0];
    }
    const data: Object = {
      oldValue,
      newValue,
      event,
    };
    const changeNewVal = length === 1 ? newValue : newValue.join(',');
    const changeOldVal = length === 1 ? oldValue : oldValue.join(',');
    if (changeNewVal === changeOldVal) {
      return;
    }

    if (marksKeys.length > 0) {
      data.newItem = getItem(value);
      data.oldItem = getItem(oldVal);
    }
    onChange && onChange(data);
  }

  mouseup = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    const { disabled } = this.props;
    if (!disabled) {
      this.setState({ changeBackground: false });
      this.onchange(event);
    }
  };
  mouseenter = (index: number) => {
    const { disabled, value } = this.props;
    let changeBackground = true;
    if (disabled || value) {
      changeBackground = false;
    }
    this.setState({ index, changeBackground, isMouseEnter: true });
  };
  mouseleave = () => {
    this.setState({ changeBackground: false, isMouseEnter: false });
  };
  getMoveState = (pageX: number, pageY: number) => {
    const { offsetLeft, offsetTop, maxValue, minValue } = this.state;
    const { rangeW } = this.style;
    const { vertical } = this.props;
    let move = pageX - offsetLeft;
    if (vertical) {
      move = rangeW - (pageY - offsetTop);
    }
    let moveValue = (move / rangeW) * (maxValue - minValue);
    moveValue = Number((moveValue + minValue).toFixed(2));
    return {
      moveValue,
    };
  };
  getNewIndex = (pageX: number, pageY: number) => {
    const { value } = this.state;
    const { moveValue } = this.getMoveState(pageX, pageY);
    let index = 0;
    if (Array.isArray(value) && value.length === 2) {
      const middleVal = (value[0] + value[1]) / 2;
      if (moveValue > middleVal) {
        index = 1;
      }
    }
    return { index };
  };
  getMarkValue = (marksKeys: Array<number>, moveValue: number): { markValue: number } => {
    let nextV = [];
    for (let i = 0; i < marksKeys.length - 1; i++) {
      const nextIndex = i + 1;
      const nextValue = marksKeys[nextIndex] - 0;
      const currentValue = marksKeys[i] - 0;
      const MiddleValue = (currentValue + nextValue) * 0.5;
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
    const { maxValue, minValue } = this.state;
    const { rangeW } = this.style;
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
      minValue,
      maxValue,
      marksKeys,
      marks,
      isMouseEnter,
    } = this.state;
    this.style = {
      background,
      btnWidth: parseInt(btnWidth),
      btnHeight: parseInt(btnHeight),
      rangeW: parseInt(rangeW),
      rangeH: parseInt(rangeH),
      SliderInnerWidth: 0,
      SliderInnerLeft: 0,
    };
    function getSliderInnerSIze(name) {
      const { length } = value;
      let difVal = length === 2 ? Math.abs(value[0] - value[1]) : value[0] - minValue;
      if (name === 'left') {
        difVal = length === 2 ? Math.min(...value) - minValue : 0;
      }
      const differenceValue = maxValue - minValue;
      return (difVal / differenceValue) * 100;
    }

    this.style.SliderInnerWidth = getSliderInnerSIze('width');
    this.style.SliderInnerLeft = getSliderInnerSIze('left');
    const Dots = [];
    if (marksKeys.length > 0) {
      for (let i: number = 0; i < marksKeys.length; i++) {
        const dotIndex = marksKeys[i];
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

    const mousedown = this.mousedown;
    const mouseup = this.mouseup;
    const mouseenter = this.mouseenter;
    const mouseleave = this.mouseleave;
    const showTip = tips && (changeBackground || isMouseEnter);
    const size = {
      ...this.style,
      ...this.state,
      disabled,
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
          onMouseUp={mouseup}
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
