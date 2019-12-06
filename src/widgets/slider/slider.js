/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import { getElementPosition } from '../utils';
import { getMinAndMax, limit, limitToSet, sortable } from '../common/Math';
import {
  Button,
  Dot,
  Icons,
  SliderInner,
  SliderBigBox,
  SliderBox,
  SliderWrapper,
  Tipinner,
  Tips,
  IconsInner,
} from './styled';
import { getChangeValue } from './utils';
import { iconStyles, rangeHeightNormal } from './slider_public_size';
import { getThemeProps } from './styledConfig';
import { findDOMNode } from 'react-dom';
import { deepMerge } from '@lugia/object-utils';
import { addMouseEvent } from '@lugia/theme-hoc';
import Icon from '../icon';
type TypeProps = {
  maxValue?: number,
  minValue?: number,
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
  value: Array<number>,
  changeValue: Array<number>,
  disabled?: boolean,
  index?: number,
  moveValue?: number,
  marksKeys: Array<number>,
  minValue: number,
  maxValue: number,
  marks: { [key: number]: string | Object },
  isInBall: boolean,
  dotWidths: Array<number>,
  dotHeights: Array<number>,
};

class Slider extends Component<TypeProps, TypeState> {
  static displayName = 'SliderComponent';
  sliderRange: any;
  style: {
    background?: string,
    btnWidth: number,
    btnHeight: number,
    rangeW: number,
    rangeH: number,
    SliderInnerWidth: number,
    SliderInnerLeft: number,
  };
  offsetLeft: number; //元素距离窗口左边的距离
  offsetTop: number; //元素距离窗口顶部的距离
  oldValue: Array<number>;
  sliderHeight = rangeHeightNormal;

  constructor() {
    super();
    this.sliderRange = React.createRef();

    this.offsetLeft = 0;
    this.offsetTop = 0;
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
        value: newValue,
        changeValue: value,
        disabled,
        index: 0,
        moveValue: 0,
        marksKeys,
        minValue: parseFloat(minValue),
        maxValue: parseFloat(maxValue),
        marks: newMarks,
        isInBall: false,
        dotWidths: [],
      };
    }
    return {
      value: newValue,
      changeValue: preState && getChangeValue(preState.changeValue, minValue, maxValue),
    };
  }

  ballIndex: number;
  pageX: number;
  pageY: number;
  draging: boolean;
  mousedown = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    e = e || window.event;
    const { pageX, pageY } = e;
    const { vertical } = this.props;
    const { offsetLeft, offsetTop } = this.getOffset(vertical);
    this.offsetLeft = offsetLeft;
    this.offsetTop = offsetTop;
    const { index } = this.getNewIndex(pageX, pageY);
    const { value, isInBall } = this.state;
    this.oldValue = [...value];
    const { disabled } = this.props;
    this.pageX = pageX;
    this.pageY = pageY;
    if (!disabled) {
      setTimeout(() => (this.draging = isInBall), 0);
      if (!isInBall) {
        this.publicmove(pageX, pageY, index, e);
      }
      this.ballIndex = index;
      this.setState({ changeBackground: true });
    }
  };
  publicmove = (
    pageX: number,
    pageY: number,
    index: number,
    e: SyntheticMouseEvent<HTMLButtonElement>
  ) => {
    const { marksKeys, value } = this.state;
    const { moveValue } = this.getMoveState(pageX, pageY);
    if (value && value.length === 1) {
      index = 0;
    }
    const { markValue } = this.getMarkValue(marksKeys, moveValue);
    value[index] = marksKeys.length > 0 ? markValue : moveValue;
    this.setState(
      {
        value,
        changeValue: value,
        moveValue, //用于marks 时dot节点css样式的判断
        index,
        changeBackground: true,
      },
      () => {
        this.onchange(e);
      }
    );
  };
  getItem(length: number, val: Array<number>, marks: Object) {
    const first = val && marks[val[0]];
    const second = val && marks[val[1]];
    return length === 2 ? [first, second] : first;
  }
  getNewValue(lengthISOne: boolean, value: Array<number>, join?: string) {
    let newVal = lengthISOne ? value && value[0] : value;
    if (join) {
      newVal = lengthISOne ? value : value && value.join(',');
    }
    return newVal;
  }
  onchange(event: SyntheticMouseEvent<HTMLButtonElement>) {
    const { onChange } = this.props;
    const { marks, marksKeys, changeValue } = this.state;
    const { oldValue } = this;
    const newValue = changeValue.sort(sortable);
    const oldVal = oldValue && oldValue.sort(sortable);
    const { length } = newValue;
    const lengthISOne = length === 1;
    const data: Object = {
      oldValue: this.getNewValue(lengthISOne, oldValue),
      newValue: this.getNewValue(lengthISOne, changeValue),
      event,
    };
    const changeNewVal = this.getNewValue(lengthISOne, newValue, 'join');
    const changeOldVal = this.getNewValue(lengthISOne, oldValue, 'join');
    if (changeNewVal === changeOldVal) {
      return;
    }
    if (marksKeys.length > 0) {
      data.newItem = this.getItem(length, changeValue, marks);
      data.oldItem = this.getItem(length, oldVal, marks);
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
  mouseenter = (index: number) => () => {
    const { disabled } = this.props;
    let changeBackground = true;
    if (disabled) {
      changeBackground = false;
    }
    this.setState({ index, changeBackground, isInBall: true });
  };
  mouseleave = () => {
    this.setState({ changeBackground: false, isInBall: false });
  };
  getMoveState = (pageX: number, pageY: number) => {
    const { maxValue, minValue } = this.state;
    const { offsetLeft, offsetTop } = this;
    const { rangeW } = this.style;
    const { vertical = false } = this.props;
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
    const { disabled, vertical = false } = this.props;
    const { dotWidths, dotHeights } = this.getOffset(vertical);
    this.setState(
      {
        dotWidths,
        dotHeights,
      },
      () => {
        const { offsetLeft, offsetTop } = this.getOffset(vertical);
        this.offsetLeft = offsetLeft;
        this.offsetTop = offsetTop;
      }
    );
    if (disabled) {
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
      this.publicmove(pageX, pageY, this.ballIndex, e);
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
  getStyleForFalseElement = (node: any, falseElement: string, type: string) => {
    return window.getComputedStyle(node, `:${falseElement}`)[type];
  };
  getDotSize = (vertical: boolean, node: any) => {
    if (!node) {
      return {
        dotWidths: [],
        dotHeights: [],
      };
    }
    const { length } = node;
    const nodeWidths = [];
    const nodeHeights = [];
    const rangeH = this.sliderHeight - 2; //1 是mask的border
    for (let i = 0; i < length; i++) {
      const sign = node[i].getAttribute('data-sign');
      if (sign === 'mask') {
        const nodeWidth = this.getStyleForFalseElement(node[i], 'before', 'width');
        const nodeHeight = this.getStyleForFalseElement(node[i], 'before', 'height');
        const nodeLeft = this.getStyleForFalseElement(node[i], 'before', 'right');
        const nodeTop = this.getStyleForFalseElement(node[i], 'before', 'bottom');
        const levelValue = vertical ? Math.abs(parseFloat(nodeLeft)) : 0;
        const verticalValue = vertical ? 0 : Math.abs(parseFloat(nodeTop));
        const levelNode = vertical ? levelValue : parseFloat(nodeWidth) + levelValue;
        const verticalNode = vertical ? parseFloat(nodeHeight) + verticalValue : verticalValue;
        nodeWidths.push(levelNode);
        nodeHeights.push(verticalNode);
      }
    }

    return {
      dotWidths: nodeWidths,
      dotHeights: nodeHeights,
    };
  };
  getOffset(vertical: boolean) {
    const sliderRangeNode = findDOMNode(this.sliderRange); //slider react 元素
    if (!sliderRangeNode) {
      return { offsetLeft: 0, offsetTop: 0, dotWidths: [], dotHeights: [] };
    }
    const { dotWidths, dotHeights } = this.getDotSize(vertical, sliderRangeNode.children);
    const { x, y } = getElementPosition(sliderRangeNode);
    return { offsetLeft: x, offsetTop: y, dotWidths, dotHeights };
  }

  getMoveValue = (val: number, circleWidth: number) => {
    const { maxValue, minValue } = this.state;
    const { rangeW } = this.style;
    const proportion = val / (maxValue - minValue); //比例
    const btnMove = ((proportion * rangeW - circleWidth / 2) / rangeW) * 100; //比例转化成px计算按钮中心点的位置；

    return { btnMove };
  };
  getSliderVerticalPaddings(
    vertical: boolean,
    rangeH: number,
    verticalBtnSize: number,
    iconSize: Array<number>,
    dotWidths: Array<number>,
    dotHeights: Array<number>
  ): Array<number> {
    const maxSize = Math.max(...iconSize, verticalBtnSize);
    const differValue = maxSize - rangeH;
    const marginTop = differValue > 0 ? differValue / 2 : 0;
    let dotMargin = marginTop;
    if (dotWidths && dotWidths.length > 0 && dotHeights && dotHeights.length > 0) {
      dotMargin = vertical ? Math.max(...dotWidths, marginTop) : Math.max(...dotHeights, marginTop);
    }
    const marginBot = dotMargin;
    return [marginTop, marginBot];
  }
  getLevePadding = (
    vertical: boolean,
    dotWidths: Array<number>,
    dotHeights: Array<number>,
    numbers: number
  ): Array<number> => {
    const hasDot = dotWidths && dotWidths.length > 0 && dotHeights && dotHeights.length > 0;
    const dotWidthsFir = hasDot ? (vertical ? dotHeights[0] : dotWidths[0]) : 0;
    const dotWidthsSec = hasDot
      ? vertical
        ? dotHeights[dotHeights.length - 1]
        : dotWidths[dotWidths.length - 1]
      : 0;
    let levelPaddingFir = numbers;
    let levelPaddingSec = numbers;
    const dotHalfWidthFir = dotWidthsFir / 2;
    const dotHalfWidthSec = dotWidthsSec / 2;
    if (dotHalfWidthFir > numbers) {
      levelPaddingFir = dotHalfWidthFir;
    }
    if (dotHalfWidthSec > numbers) {
      levelPaddingSec = vertical ? dotHalfWidthFir : dotHalfWidthSec;
    }
    return [levelPaddingFir, levelPaddingSec];
  };
  getSliderLevelPaddings(
    vertical: boolean,
    icons?: Array<Object>,
    value: Array<number>,
    size: Object,
    btnSize: number,
    dotWidths: Array<number>,
    dotHeights: Array<number>
  ): Object {
    const hasIconsProps = 'icons' in this.props;
    const iconsChildren = [];
    const { fontSizeNormal, marginNormal } = iconStyles;
    const halfBthSize = btnSize / 2;
    const numbers = hasIconsProps ? marginNormal + fontSizeNormal + halfBthSize : halfBthSize;
    const levelPaddings = this.getLevePadding(vertical, dotWidths, dotHeights, numbers);
    const iconSize = hasIconsProps ? [fontSizeNormal, fontSizeNormal] : [0, 0];
    if (hasIconsProps && value.length === 1 && Array.isArray(icons) && icons.length > 0) {
      icons.forEach((icon, index) => {
        const { style } = icon;
        let iconDistancen = numbers;
        let newFontSize = fontSizeNormal;
        if (style) {
          const { fontSize = fontSizeNormal, margin = marginNormal } = style;
          newFontSize = fontSize > 0 && fontSize < 12 ? 12 : fontSize;
          iconDistancen = parseInt(fontSize) + parseInt(margin) + halfBthSize;
          iconSize[index] = fontSize;
        }
        const sliderIcons = 'Icons';

        const { viewClass, theme } = this.props.getPartOfThemeHocProps(sliderIcons);
        const themeProps = this.props.getPartOfThemeProps(sliderIcons);

        const {
          themeConfig: { normal: { font: { size: fontObjSize } = {}, fontSize } = {} },
        } = themeProps;
        const hasFontSize = fontSize || fontObjSize;
        if (hasFontSize) {
          newFontSize = hasFontSize;
          iconSize[index] = hasFontSize;
          iconDistancen = hasFontSize + 10;

          if (!vertical) {
            levelPaddings[index] =
              levelPaddings[index] > hasFontSize ? levelPaddings[index] : hasFontSize + 10;
          }
          if (vertical) {
            levelPaddings[index] = hasFontSize + 10;
          }
        }

        const iconStyle = {
          ...icon,
          fontSize: newFontSize,
          iconDistancen,
          index,
        };
        const iconTheme = deepMerge(
          {
            [viewClass]: {
              normal: {
                color: '#666',
                fontSize,
              },
            },
          },
          theme
        );

        iconsChildren.push(
          <Icons iconStyle={iconStyle} value={value} {...size} themeProps={themeProps}>
            <Icon iconClass={icon.name} viewClass={viewClass} theme={iconTheme} singleTheme />
          </Icons>
        );
      });
    }
    return { iconsChildren, levelPaddings, iconSize };
  }
  render() {
    const { background, tips = false, icons, vertical = false, disabled, getTheme } = this.props;
    const {
      sliderTipsThemeProps,
      sliderContainerThemeProps,
      sliderPassedWayThemeProps: { sliderPassedWayThemeProps },
      buttonThemeProps: { sliderButtonThemeProps, width: btnWidth, height: btnHeight },
      sliderTrackThemeProps: { sliderTrackThemeProps, width: sliderWidth, height: sliderHeight },
    } = getThemeProps(this.props);
    this.sliderHeight = sliderHeight;
    const {
      value,
      index,
      moveValue,
      minValue,
      maxValue,
      marksKeys,
      marks,
      isInBall,
      dotWidths,
      dotHeights,
    } = this.state;
    const iconPropsSize = {
      minValue,
      maxValue,
      vertical,
    };

    const { iconsChildren, levelPaddings, iconSize } = this.getSliderLevelPaddings(
      vertical,
      icons,
      value,
      iconPropsSize,
      btnWidth - sliderHeight > 0 ? btnWidth : 0,
      dotWidths,
      dotHeights
    );
    const rangeW = sliderWidth;
    const rangeH = sliderHeight;

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
      const { getPartOfThemeProps } = this.props;
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
        const sliderMarksName = 'SliderMarks';
        const sliderMarksThemeProps = getPartOfThemeProps(sliderMarksName, {
          selector: { index: i, count: marksKeys.length },
        });
        dots.push(
          <Dot
            data-sign={'mask'}
            key={dotIndex}
            themeProps={deepMerge(sliderMarksThemeProps, {
              propsConfig: { marksData: data || [] },
            })}
          />
        );
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
        size.moveY = this.getMoveValue(realyVal, btnWidth).btnMove;
      }
      const btnDisabled = index === i;
      size.btnDisabled = btnDisabled;
      const tipsText = tips && (typeof tips === 'string' || typeof tips === 'number') ? tips : val;
      return (
        <Button
          themeProps={deepMerge(sliderButtonThemeProps, {
            propsConfig: {
              vertical,
              moveX: size.moveX,
              moveY: size.moveY,
              btnDisabled: size.btnDisabled,
              changeBackground: this.state.changeBackground,
            },
          })}
          onMouseDown={mousedown}
          onMouseUp={mouseup}
          onMouseEnter={mouseenter(i)}
          onMouseLeave={mouseleave}
          {...size}
          key={i}
        >
          {showTip && btnDisabled && !this.props.disabled ? (
            <Tips themeProps={sliderTipsThemeProps}>
              <Tipinner
                themeProps={deepMerge(sliderTipsThemeProps, { propsConfig: { tipsText } })}
              />
            </Tips>
          ) : (
            ''
          )}
        </Button>
      );
    });
    const sliderVerticalPaddings = this.getSliderVerticalPaddings(
      vertical,
      rangeH,
      btnHeight,
      iconSize,
      dotWidths,
      dotHeights
    );
    return (
      <SliderBigBox
        themeProps={sliderContainerThemeProps}
        onMouseDown={mousedown}
        onMouseUp={mouseup}
      >
        <SliderBox
          {...size}
          iconSize={iconSize}
          levelPaddings={levelPaddings}
          sliderVerticalPaddings={sliderVerticalPaddings}
          onMouseDown={mousedown}
          onMouseUp={mouseup}
          {...addMouseEvent(this)}
        >
          <SliderWrapper
            themeProps={sliderTrackThemeProps}
            ref={node => {
              this.sliderRange = node;
            }}
            {...size}
            getTheme={getTheme}
          >
            {iconsChildren}
            {dots}
            <SliderInner
              themeProps={deepMerge(sliderPassedWayThemeProps, { propsConfig: size })}
              getTheme={getTheme}
            />
            {children}
          </SliderWrapper>
        </SliderBox>
      </SliderBigBox>
    );
  }
}

export default Slider;
