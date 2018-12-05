/*
 *create by LYQ
 *
 *2018-11-21
 *
 *@flow
 *
 */
import React from 'react';
import Icon from '../icon';
import styled, { keyframes } from 'styled-components';
import colorsFunc from '../css/stateColor';
import { getElementPosition } from '../utils';
import { ObjectUtils } from '@lugia/type-utils';

const { warningColor } = colorsFunc();
const Container = styled.div`
  position: relative;
  padding: 10px;
  display: inline-block;
  font-size: ${props => (props.theme.fontSize ? props.theme.fontSize : '18px')};
`;

const showUp = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Ratespan = styled.span.attrs({
  primary: props => props.theme.primary || `${warningColor}`,
  default: props => props.theme.default || '#e8e8e8',
  danger: props => props.theme.danger || '#999999',
  amazed: props => props.theme.amazed || '#f88e30',
  half: props => props.theme.half || props.theme.primary || `${warningColor}`,
})`
  margin: 6px;
  & > i.hoverd:hover {
    transform: scale(1.2);
  }
  & > i {
    vertical-align: middle !important;
  }
  & > i.primary {
    color: ${props => props.primary};
    animation: ${showUp} 0.3s linear forwards;
  }
  & > i.danger {
    color: ${props => props.danger};
    animation: ${showUp} 0.3s linear forwards;
  }
  & > i.default {
    color: ${props => props.default};
  }
  & > i.amazed {
    color: ${props => props.amazed};
    animation: ${showUp} 0.3s linear forwards;
  }
  & > i.half {
    color: ${props => props.half};
    animation: ${showUp} 0.3s linear forwards;
    position: relative;
  }
`;

Ratespan.displayName = 'Ratespan';
const RateIcon: Object = styled(Icon)`
  vertical-align: middle !important;
`;
RateIcon.displayName = 'rate';

const RateText: Object = styled.span.attrs({
  primary: props => props.theme.primary || `${warningColor}`,
  default: props => props.theme.default || '#e8e8e8',
  danger: props => props.theme.danger || props.theme.primary || `${warningColor}`,
  amazed: props => props.theme.amazed || props.theme.primary || `${warningColor}`,
  half: props => props.theme.half || props.theme.primary || `${warningColor}`,
  character: props => props.character,
})`
  cursor:pointer;
  color:${props => props.primary};
  &.hoverd:hover{
    transform : scale(1.2);
  }
  &.primary{
    color:${props => props.primary};
    animation: ${showUp} 0.3s linear forwards;
  }
  &.danger{
    color:${props => props.danger};
    animation: ${showUp} 0.3s linear forwards;
  }
  &.default{
    color:${props => props.default};
  }
  &.amazed{
    color:${props => props.amazed};
    animation: ${showUp} 0.3s linear forwards;
  }
  &.half{
    color:${props => props.half};
    animation: ${showUp} 0.3s linear forwards;
    position:relative;
  }
  &.half:before{
    content: '${props => props.character}';
    position: absolute;
    z-index: 10;
    color:#e8e8e8;
    -webkit-mask: linear-gradient(to left,#e8e8e8 30%, ${props => props.half} 40%, transparent );
  }
`;
RateText.displayName = 'RateText';
const defautClass = {
  default: 'default',
  primary: 'primary',
  danger: 'danger',
  amazed: 'amazed',
  half: 'half',
};

type rateProps = {
  count: number,
  max?: number,
  value?: number,
  disabled?: boolean,
  allowHalf: boolean,
  iconClass?: Object,
  className: any,
  classify?: boolean,
  getTheme: Function,
  onClick: Function,
  onChange: Function,
  character?: any,
};

export const createCalssArr = (num: number | string, condition?: Object): Array<string> => {
  console.info('ObjectUtils', num, ObjectUtils.isString(num));
  if (!ObjectUtils.isString(num) && num) {
    num = Number(num);
  }
  let arr = [...Array(num)].map(() => 'default');
  if (!condition) return arr;
  const { starNum, allowHalf, classify } = condition;
  if (allowHalf) {
    arr = setHalf(arr, starNum, classify);
    return arr;
  }
  const mid = Math.ceil(arr.length / 2);
  const classname = setClass(classify, mid, starNum);
  arr.forEach((v, i) => {
    arr[i] = i > starNum - 1 || !starNum ? 'default' : classname;
  });
  return arr;
};

export const calcValue = (val: number = 0, allowHalf: boolean): number => {
  if (allowHalf) {
    return Math.floor(val * 2) / 2; //星星  整理得分  3.2=>3  3.7=>3.5
  }
  return Math.floor(val);
};

export const multipleValue = (props: Object, val?: number): number => {
  const { max, count, value = 0 } = props;
  const multiple = max && count ? max / count : 1;
  if (val || val === 0) return val * multiple;
  return value / multiple;
};

export const setClass = (classify?: boolean, mid: number, starNum: number): string => {
  let classname = 'primary';
  if (!classify || starNum === mid) return classname;
  if (starNum < mid) {
    classname = 'danger';
  }
  if (starNum > mid) {
    classname = 'amazed';
  }
  return classname;
};

export const setHalf = (arr: Array<string>, starNum: number, Classify?: boolean): Array<string> => {
  if (!arr) {
    return [];
  }
  const mid = Math.ceil(arr.length / 2);
  const classname = setClass(Classify, mid, starNum);
  arr.forEach((v, i) => {
    arr[i] =
      i > Math.ceil(starNum - 1)
        ? 'default'
        : i === Math.ceil(starNum - 1) && starNum % 1 !== 0
        ? 'half'
        : classname;
  });

  return arr;
};

export const getIconClass = (iconClass: Object = {}): Object => {
  return {
    default: iconClass.default || 'lugia-icon-financial_star',
    primary: iconClass.primary || iconClass.default || 'lugia-icon-financial_star',
    danger: iconClass.danger || iconClass.default || 'lugia-icon-financial_star',
    amazed: iconClass.amazed || iconClass.default || 'lugia-icon-financial_star',
    half: iconClass.half || iconClass.default || 'lugia-icon-financial_star_o',
  };
};

const getOffset = (RateRangeNode: Object) => {
  if (!RateRangeNode) {
    return { offsetLeft: 0, offsetWidth: 18 };
  }
  const { x } = getElementPosition(RateRangeNode);
  const w = RateRangeNode.offsetWidth;
  return { offsetLeft: x, offsetWidth: w };
};

const calcPosition = (offsetLeft: number, offsetWidth: number, pageX: number): boolean => {
  const p = offsetLeft + offsetWidth / 2;
  return pageX < p;
};

const getReturnObj = (state: Object, multiple: number) => {
  const returnObj = {
    defaultValue: state.value,
    currentValue: multiple >= 0 ? multiple : 0,
  };
  return returnObj;
};

class Rate extends React.Component<rateProps, any> {
  Ratespan: any;
  Temporary: string;
  static defaultProps = {
    count: 5,
    max: 5,
    disabled: false,
    allowHalf: false,
    classify: false,
    className: '',
    onClick: (e: Object, x: any) => {},
    onChange: (e: Object, x: any) => {
      return {};
    },
    iconClass: {
      default: 'lugia-icon-financial_star',
      primary: 'lugia-icon-financial_star',
      danger: 'lugia-icon-financial_star',
      amazed: 'lugia-icon-financial_star',
      half: 'lugia-icon-financial_star_o',
    },
    getTheme: () => {
      return {};
    },
  };

  constructor(props: Object) {
    super(props);
    const num = props ? props.count : 5;
    this.Ratespan = [];
    createCalssArr(num).map((x, i) => {
      this.Ratespan[i] = React.createRef();
    });
  }

  componentDidMount() {
    this.Temporary = JSON.stringify(this.state);
    const { onChange, value = 0 } = this.props;
    onChange({}, getReturnObj(this.state, value));
  }

  static getDerivedStateFromProps(defProps: rateProps, current: Object) {
    const condition = {
      starNum: multipleValue(defProps),
      allowHalf: defProps.allowHalf,
      classify: defProps.classify,
    };
    if (!current) {
      return {
        count: createCalssArr(defProps.count, condition),
        value: calcValue(defProps.value, defProps.allowHalf) || 0,
        starNum: calcValue(defProps.value, defProps.allowHalf) || 0,
        current: defProps.value === 0 ? null : multipleValue(defProps),
        hasClick: false,
      };
    }
    return {
      count: 'count' in current ? current.count : createCalssArr(defProps.count, condition),
      value: 'value' in defProps ? defProps.value : current.value,
      starNum: 'starNum' in current ? current.starNum : 0,
      current: 'current' in current ? current.current : -1,
      hasClick: 'hasClick' in current ? current.hasClick : false,
    };
  }

  render() {
    const { getTheme } = this.props;
    const { count } = this.state;
    return (
      <Container
        theme={getTheme()}
        onMouseLeave={e => {
          this.mouseLeave(e);
        }}
      >
        {count.map((x, i) => (
          <Ratespan
            innerRef={this.Ratespan[i]}
            theme={getTheme()}
            onMouseMove={e => {
              this.mouseMove(e, i);
            }}
            onClick={e => {
              this.mouseMove(e, i, true);
            }}
          >
            {this.getElement(x)}
          </Ratespan>
        ))}
      </Container>
    );
  }

  mouseMove = (e: Object, i: number, hasClick?: boolean) => {
    let { count, current } = this.state;
    const { disabled, onChange, classify } = this.props;
    if (disabled) return;
    const { offsetLeft, offsetWidth } = this.getOffset(i);
    const stars = this.moveType(i, offsetLeft, offsetWidth, e.pageX); //移动后value.star
    count = setHalf(count, stars, classify);
    this.handleClick(e, stars, count, current, hasClick);
    onChange(e, getReturnObj(this.state, multipleValue(this.props, stars)));
  };

  mouseLeave = (e: Object) => {
    const { hasClick, current } = this.state;
    const { onChange } = this.props;
    if (hasClick || (this.Temporary && this.Temporary !== 'null')) {
      const { value, count } = JSON.parse(this.Temporary);
      this.setValue(value, count, current, false);
      onChange(e, getReturnObj(this.state, multipleValue(this.props, current)));
      return;
    }
    const count = createCalssArr(this.props.count);
    this.setValue(0, count, current, hasClick);
    onChange(e, getReturnObj(this.state, multipleValue(this.props, 0)));
  };

  moveType = (index: number, offsetLeft: number, offsetWidth: number, pageX: number) => {
    const { allowHalf } = this.props;
    const isLeft = calcPosition(offsetLeft, offsetWidth, pageX);
    if (allowHalf && isLeft) {
      return calcValue(index + 0.5, allowHalf);
    }
    return calcValue(index + 1, allowHalf);
  };

  getOffset(index: number) {
    return getOffset(this.Ratespan[index].current);
  }

  getElement = (x: number) => {
    const { className, iconClass, disabled, character } = this.props;
    const IconClass = getIconClass(iconClass);
    if (ObjectUtils.isString(character)) {
      return (
        <RateText
          character={character}
          className={`${defautClass[x]} ${className} ${disabled ? '' : 'hoverd'}`}
        >
          {character}
        </RateText>
      );
    }
    return (
      <RateIcon
        iconClass={`${IconClass[x]} ${defautClass[x]} ${className} ${disabled ? '' : 'hoverd'}`}
      />
    );
  };

  handleClick = (
    e: Object,
    val: number,
    cou: Array<string>,
    index: number,
    hasClicked?: boolean
  ) => {
    const { onClick, allowHalf } = this.props;
    const { current, hasClick } = this.state;
    if (hasClicked) {
      index = val;
      if (index === current) {
        cou.forEach((v, i) => {
          cou[i] = 'default';
        });
        val = calcValue(0, allowHalf);
        index = -1;
        hasClicked = false;
        this.Temporary = JSON.stringify(null);
      }
      this.setValue(val, cou, index, hasClicked);
      onClick(e, getReturnObj(this.state, multipleValue(this.props, val)));
      return;
    }
    this.setValue(val, cou, index, hasClick);
  };
  setValue = (val: number, cou: Array<string>, index: number, hasClicked: boolean) => {
    this.setState(
      {
        value: val,
        starNum: val,
        count: cou,
        current: index,
        hasClick: hasClicked,
      },
      () => {
        if (hasClicked) {
          this.Temporary = JSON.stringify(this.state);
          this.setState({
            hasClick: false,
          });
        }
      }
    );
  };
}

export default Rate;
