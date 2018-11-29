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

const { warningColor } = colorsFunc();

const Container = styled.div`
  position: relative;
  padding: 10px;
  display: inline-block;
  font-size: ${props => props.theme.fontSize};
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

const RateIcon = styled(Icon)`
  vertical-align: middle !important;
`;

RateIcon.displayName = 'rate';
const RateText = styled.span.attrs({
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
  disabled: boolean,
  allowHalf: boolean,
  iconClass?: Object,
  className: any,
  classify?: boolean,
  getTheme: Function,
  onClick: Function,
  onChange: Function,
  character: any,
};

export const createArr = (
  num: number,
  value?: number = 0,
  allowHalf?: boolean,
  Classify?: boolean = false
) => {
  let arr = [...Array(num)].map(() => 'default');
  if (!value) return arr;
  if (allowHalf) {
    arr = setHalf(arr, value, Classify);
    return arr;
  }
  const mid = Math.ceil(arr.length / 2);
  const classname = setClass(Classify, mid, value);
  arr.map((v, i) => {
    arr[i] = i > value - 1 || !value ? 'default' : classname;
  });
  return arr;
};
export const calcValue = (val: number = 0, allowHalf: boolean) => {
  if (allowHalf) {
    const score = Math.floor(val * 2) / 2; //星星  整理得分  3.2=>3  3.7=>3.5
    return score;
  }
  const score = Math.floor(val);
  return score;
};
export const InitValue = (props: Object) => {
  const { max, count, value = 0 } = props;
  const multiple = max && count ? max / count : 1;
  return value / multiple;
};
export const multipleValue = (val: number, props: Object) => {
  const { max, count } = props;
  const multiple = max && count ? max / count : 1;
  return val * multiple;
};
export const setClass = (Classify?: boolean, mid: number, value: number) => {
  let classname = 'primary';
  switch (true) {
    case !Classify:
      break;
    case value < mid:
      classname = 'danger';
      break;
    case value > mid:
      classname = 'amazed';
      break;
    default:
      classname = 'primary';
  }
  return classname;
};
export const setHalf = (arr: Array<string>, value: number, Classify?: boolean) => {
  const mid = Math.ceil(arr.length / 2);
  const classname = setClass(Classify, mid, value);
  arr.map((v, i) => {
    arr[i] =
      i > Math.ceil(value - 1)
        ? 'default'
        : i === Math.ceil(value - 1) && value % 1 !== 0
        ? 'half'
        : classname;
  });

  return arr;
};
export const setIconClass = (iconClass: Object = {}) => {
  return {
    default: iconClass.default || 'lugia-icon-financial_star',
    primary: iconClass.primary || iconClass.default || 'lugia-icon-financial_star',
    danger: iconClass.danger || iconClass.default || 'lugia-icon-financial_star',
    amazed: iconClass.amazed || iconClass.default || 'lugia-icon-financial_star',
    half: iconClass.half || iconClass.default || 'lugia-icon-financial_star_o',
  };
};
const getOffset = RateRangeNode => {
  if (!RateRangeNode) {
    return { offsetLeft: 0, offsetTop: 0 };
  }
  const { x, y, w, h } = getElementPosition(RateRangeNode);
  return { offsetLeft: x, offsetTop: y, offsetWidth: w, offsetHeight: h };
};
const calcPosition = (index: number, offsetLeft: number, offsetWidth: number, pageX: number) => {
  const p = offsetLeft + offsetWidth / 2;
  return pageX < p;
};
const getElementPosition = (e: Object) => {
  let x = 0,
    y = 0,
    w = 0,
    h = 0;
  if (e) {
    x += e.offsetLeft;
    y += e.offsetTop;
    w = e.clientWidth;
    h = e.offsetHeight;
  }
  return { x, y, w, h };
};
const checkCharacter = (target: any) => {
  if (typeof target === 'string') {
    return false;
  }
  return true;
};
class Rate extends React.Component<rateProps, any> {
  RateRange: any;
  Ratespan: any;
  Temporary: string;
  fontsize: number;
  static defaultProps = {
    count: 5,
    max: 5,
    disabled: false,
    allowHalf: false,
    classify: false,
    onClick: (x: any) => {},
    onChange: (x: any) => {
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
    this.RateRange = React.createRef();
    const num = this.props.count;
    this.Ratespan = [];
    createArr(num).map((x, i) => {
      this.Ratespan[i] = React.createRef();
    });
  }
  componentDidMount() {
    this.Temporary = JSON.stringify(this.state);
    const { onChange, value = 0, allowHalf } = this.props;
    onChange(calcValue(value, allowHalf));
  }
  static getDerivedStateFromProps(defProps: rateProps, current: Object) {
    if (!current) {
      return {
        count: createArr(
          defProps.count,
          InitValue(defProps),
          defProps.allowHalf,
          defProps.classify
        ),
        value: calcValue(defProps.value, defProps.allowHalf) || 0,
        current: defProps.value === 0 ? null : InitValue(defProps),
        hasClick: false,
      };
    }
    return {
      count:
        'count' in current
          ? current.count
          : createArr(defProps.count, defProps.value, defProps.allowHalf, defProps.classify),
      value: 'value' in defProps ? defProps.value : current.value,
      current: 'current' in current ? current.current : -1,
      hasClick: 'hasClick' in current ? current.hasClick : false,
    };
  }
  render() {
    const { getTheme, className, iconClass, disabled, character } = this.props;
    const { count } = this.state;
    this.fontsize = getTheme().fontSize || 18;
    const IconClass = setIconClass(iconClass);
    return checkCharacter(character) ? (
      <Container
        theme={getTheme()}
        innerRef={this.RateRange}
        onMouseLeave={e => {
          this.mouseLeave();
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
            <RateIcon
              iconClass={`${IconClass[x]} ${defautClass[x]} ${className} ${
                disabled ? '' : 'hoverd'
              }`}
            />
          </Ratespan>
        ))}
      </Container>
    ) : (
      <Container
        theme={getTheme()}
        innerRef={this.RateRange}
        onMouseLeave={e => {
          this.mouseLeave();
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
            <RateText
              character={character}
              className={`${defautClass[x]} ${className} ${disabled ? '' : 'hoverd'}`}
            >
              {character}
            </RateText>
          </Ratespan>
        ))}
      </Container>
    );
  }

  mouseMove = (e: Object, i: number, hasClick?: boolean) => {
    let { count, current } = this.state;
    const { disabled, onChange, classify } = this.props;
    if (disabled) return;
    this.fontsize = parseInt(this.fontsize, 0);
    const { offsetLeft } = getOffset(this.Ratespan[i].current);
    const values = this.moveType(i, offsetLeft, this.fontsize, e.pageX);
    count = setHalf(count, values, classify);
    this.handleClick(values, count, current, hasClick);
    onChange(multipleValue(values, this.props));
  };
  mouseLeave = () => {
    const { hasClick, current } = this.state;
    const { onChange } = this.props;
    if (hasClick || this.Temporary) {
      const { value, count } = JSON.parse(this.Temporary);
      this.setValue(value, count, current, false);
      onChange(multipleValue(current, this.props));
      return;
    }
    const value = 0,
      count = createArr(this.props.count);
    this.setValue(value, count, current, hasClick);
    onChange(multipleValue(value, this.props));
  };
  moveType = (index: number, offsetLeft: number, offsetWidth: number, pageX: number) => {
    const { allowHalf } = this.props;
    const isLeft = calcPosition(index, offsetLeft, offsetWidth, pageX);
    if (allowHalf && isLeft) {
      const value = calcValue(index + 0.5, allowHalf);

      return value;
    }
    const value = calcValue(index + 1, allowHalf);
    return value;
  };

  handleClick = (val: number, cou: Array<string>, index: number, hasClicked?: boolean) => {
    const { onClick, max, count: pcount, allowHalf } = this.props;
    const { current, hasClick } = this.state;
    if (hasClicked) {
      index = val;
      if (index === current) {
        cou.map((v, i) => {
          cou[i] = 'default';
        });
        val = calcValue(0, allowHalf);
        index = null;
        hasClicked = !hasClicked;
        this.Temporary = JSON.stringify(null);
      }
      this.setValue(val, cou, index, hasClicked);
      this.Temporary = JSON.stringify(this.state);
      const multiple = max && pcount ? (max / pcount) * val : val;
      onClick(multiple);
      return;
    }
    this.setValue(val, cou, index, hasClick);
  };

  setValue = (val: number, cou: Array<string>, index: number, hasClicked: boolean) => {
    this.setState({
      value: val,
      count: cou,
      current: index,
      hasClick: hasClicked,
    });
  };
}
export default Rate;
