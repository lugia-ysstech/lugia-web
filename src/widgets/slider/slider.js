/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import Icon from '../icon/index';
import Widget from '../consts/index';
import { getElementPosition } from '../utils';
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
  isInBall: boolean,
};
Button.displayName = 'Button';
Button.displayName = 'SliderWrapper';

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
    const range = [minValue, maxValue];

    if (!Array.isArray(value)) {
      value = value === undefined || value === null ? [minValue] : [value];
    }
    if (Array.isArray(value)) {
      const { length } = value;
      value[0] = limit(value[0], range);
      length === 2 && (value[1] = limit(value[1], range));
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
        isInBall: false,
      };
    }
  }

  ballIndex: number;
  pageX: number;
  pageY: number;
  draging: boolean;
  mousedown = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e = e || window.event;
    const { pageX, pageY } = e;
    const { index } = this.getNewIndex(pageX, pageY);
    const { value, isInBall } = this.state;
    this.oldValue = [...value];
    const { disabled } = this.props;
    this.pageX = pageX;
    this.pageY = pageY;
    if (!this.props.value && !disabled) {
      setTimeout(() => (this.draging = isInBall), 0);
      if (!isInBall) {
        this.publicmove(pageX, pageY, index);
      }
      this.ballIndex = index;
      this.setState({ changeBackground: true });
    }
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
    const { oldValue } = this;
    const newValue = value.sort(sortable);
    const oldVal = oldValue && oldValue.sort(sortable);
    const { length } = newValue;

    function getItem(val) {
      const first = marks[val[0]];
      const second = marks[val[1]];
      return length === 2 ? [first, second] : first;
    }

    const data: Object = {
      oldValue: length === 1 ? oldValue && oldValue[0] : oldValue,
      newValue: length === 1 ? value[0] : value,
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
    const { disabled, value } = this.props;
    if (!disabled && !value) {
      this.setState({ changeBackground: false });
      this.onchange(event);
    }
  };
  mouseenter = (index: number) => () => {
    const { disabled, value } = this.props;
    let changeBackground = true;
    if (disabled || value) {
      changeBackground = false;
    }
    this.setState({ index, changeBackground, isInBall: true });
  };
  mouseleave = () => {
    this.setState({ changeBackground: false, isInBall: false });
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
    let markValue = 0;
    if (marksKeys.length > 0) {
      const first = marksKeys[0];
      let minDistance = Math.abs(first - moveValue);
      markValue = first;
      for (let i = 1; i < marksKeys.length; i++) {
        const mark = marksKeys[i];
        const newDistance = Math.abs(mark - moveValue);
        if (newDistance < minDistance) {
          minDistance = newDistance;
          markValue = mark;
        }
      }
    }
    return { markValue };
  };

  componentDidMount() {
    this.addDocListener();
    const { disabled, value } = this.props;
    const { offsetLeft, offsetTop } = this.getOffset();
    this.setState({
      offsetLeft,
      offsetTop,
    });
    if (disabled && value) {
      this.mousedown = null;
    }
  }

  addDocListener = () => {
    document.addEventListener('mousemove', this.onDocMouseMove);
    document.addEventListener('mouseup', this.onDocMouseUp);
  };

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onDocMouseMove);
    document.removeEventListener('mouseup', this.onDocMouseUp);
  }

  onDocMouseMove = (e: Object) => {
    if (this.draging) {
      e = e || window.event;
      const { pageX, pageY } = e;
      const samePoint = this.pageX === pageX && this.pageY === pageY;
      if (samePoint) {
        return;
      }
      this.publicmove(pageX, pageY, this.ballIndex);
    }
  };

  onDocMouseUp = (e: Object) => {
    if (this.draging) {
      this.onchange(e);
      this.draging = false;
    }
    if (this.state.changeBackground) {
      this.setState({ changeBackground: false });
    }
  };

  getOffset() {
    const sliderRangeNode = this.sliderRange.current; //slider react 元素
    if (!sliderRangeNode) {
      return { offsetLeft: 0, offsetTop: 0 };
    }
    const { x, y } = getElementPosition(sliderRangeNode);
    return { offsetLeft: x, offsetTop: y };
  }

  getMoveValue = (val: number, circleWidth: number) => {
    const { maxValue, minValue } = this.state;
    const { rangeW } = this.style;
    const proportion = val / (maxValue - minValue); //比例
    const btnMove = ((proportion * rangeW - circleWidth / 2) / rangeW) * 100; //比例转化成px计算按钮中心点的位置；
    return { btnMove };
  };

  render() {
    const { background, tips = false, icons, vertical, disabled, getTheme } = this.props;
    const styleSlider = getTheme();
    const styleSliderButton = styleSlider.svThemeConfigTree[Widget.SliderButton];
    const {
      rangeW = styleSlider.width || 300,
      rangeH = styleSlider.height || 6,
      btnWidth = (styleSliderButton && styleSliderButton.width) || 20,
      btnHeight = (styleSliderButton && styleSliderButton.height) || 20,
    } = this.props;

    const { value, index, moveValue, minValue, maxValue, marksKeys, marks, isInBall } = this.state;

    this.style = {
      background,
      btnWidth: parseInt(btnWidth),
      btnHeight: parseInt(btnHeight),
      rangeW: parseInt(rangeW),
      rangeH: parseInt(rangeH),
      SliderInnerWidth: 0,
      SliderInnerLeft: 0,
    };

    function getSliderInnerSIze(name: 'left' | 'width') {
      const { length } = value;
      let difVal = length === 2 ? Math.abs(value[0] - value[1]) : value[0] - minValue;
      if (name === 'left') {
        difVal = length === 2 ? Math.min(...value) - minValue : 0;
      }
      const rangDistance = maxValue - minValue;
      return (difVal / rangDistance) * 100;
    }

    this.style.SliderInnerWidth = getSliderInnerSIze('width');
    this.style.SliderInnerLeft = getSliderInnerSIze('left');

    const dots = [];
    if (marksKeys.length > 0) {
      for (let i = 0; i < marksKeys.length; i++) {
        const dotIndex = marksKeys[i];
        const dotVal = dotIndex - minValue;
        const dotMoveX = this.getMoveValue(dotVal, this.style.rangeH).btnMove;
        const data = {
          marks: marks[dotIndex],
          dotMoveX,
          dotIndex,
          minValue,
          maxValue,
          value,
          moveValue,
          vertical,
          rangeW: this.style.rangeW,
          rangeH: this.style.rangeH,
        };
        dots.push(<Dot marksData={data} key={dotIndex} getTheme={getTheme} />);
      }
    }

    const { mousedown, mouseup, mouseenter, mouseleave } = this;
    const showTip = tips && (this.draging || isInBall);
    const size = {
      ...this.style,
      ...this.state,
      disabled,
      vertical,
      btnDisabled: true,
      middleVal: 0,
    };

    const children = value.map((val, i) => {
      const realyVal = val - minValue;
      size.moveX = this.getMoveValue(realyVal, size.btnWidth).btnMove;
      if (vertical) {
        size.moveY = this.getMoveValue(realyVal, size.btnHeight).btnMove;
      }
      const btnDisabled = index === i;
      size.btnDisabled = btnDisabled;
      return (
        <Button
          onMouseDown={mousedown}
          onMouseUp={mouseup}
          onMouseEnter={mouseenter(i)}
          onMouseLeave={mouseleave}
          {...size}
          key={i}
          getTheme={getTheme}
        >
          {showTip && btnDisabled ? (
            <Tips>
              <Tipinner>{val}</Tipinner>
              <Tiparrow />
            </Tips>
          ) : (
            ''
          )}
        </Button>
      );
    });

    const hasIconsProps = 'icons' in this.props;
    let iconsChildren = null;
    if (hasIconsProps && value.length === 1 && Array.isArray(icons) && icons.length > 0) {
      iconsChildren = icons.map((icon, index) => {
        const iconStyle = {
          ...icon,
          index,
        };
        return (
          <Icons iconStyle={iconStyle} {...size} getTheme={getTheme}>
            <Icon iconClass={icon.name} />
          </Icons>
        );
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
        {dots}
        <SliderInner {...size} getTheme={getTheme} />
        {children}
      </SliderWrapper>
    );
  }
}

export default Slider;
