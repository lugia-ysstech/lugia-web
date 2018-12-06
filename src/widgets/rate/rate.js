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
import { toNumber } from '../common/NumberUtils';

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
const StarIconClass = 'lugia-icon-financial_star';
const StarIconClassOpen = 'lugia-icon-finacial1_half_star';

const Ratespan = styled.span.attrs({
  primary: props => props.theme.primary || `${warningColor}`,
  default: props => props.theme.default || '#e8e8e8',
  danger: props => props.theme.danger || '#999999',
  amazed: props => props.theme.amazed || '#f88e30',
  half: props => props.theme.half || props.theme.primary || `${warningColor}`,
})`
  margin: 6px;
  position: relative;
  & > i.hoverd:hover {
    transform: scale(1.2);
  }
  & > i.bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
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

Ratespan.displayName = 'sv_rate_Ratespan';
const RateIcon: Object = styled(Icon)`
  vertical-align: middle !important;
`;

RateIcon.displayName = 'sv_rate_icon';

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

RateText.displayName = 'sv_rate_RateText';

const defautClass = {
  default: 'default',
  primary: 'primary',
  danger: 'danger',
  amazed: 'amazed',
  half: 'half',
};

type RateProps = {
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

export function getDefaultClassNames(count: number): Array<string> {
  return [...Array(count)].map(() => 'default');
}

export const createCalssArray = (num: number | string, condition?: Object): Array<string> => {
  const classNames = getDefaultClassNames(toNumber(num, 0));

  if (!condition) return classNames;

  const { starNum, allowHalf, classify } = condition;

  if (allowHalf) {
    return getClassNames(classNames, starNum, classify);
  }

  const mid = Math.ceil(classNames.length / 2);
  const classname = getClass(starNum, mid, classify);
  return classNames.map((v, i) => {
    return i > starNum - 1 || !starNum ? 'default' : classname;
  });
};

export const calcValue = (val: number = 0, allowHalf: boolean): number => {
  return allowHalf ? Math.floor(val * 2) / 2 : Math.floor(val);
};

export const multipleValue = (props: Object, val?: number): number => {
  if (!props || val === 0) {
    return 0;
  }

  const { max, count, value = 0 } = props;
  const multiple = max && count ? max / count : 1;

  if (val) {
    return val * multiple;
  }

  return value / multiple;
};

export const getClass = (starNum: number, mid: number, classify: boolean): string => {
  if (!classify || starNum === mid) {
    return 'primary';
  }

  return starNum < mid ? 'danger' : 'amazed';
};

export const getClassNames = (
  classNames: Array<string>,
  starNum: number,
  classify: boolean
): Array<string> => {
  if (!classNames) {
    return [];
  }

  const startIndex = Math.ceil(starNum - 1);
  const mid = Math.ceil(classNames.length / 2);
  const classname = getClass(starNum, mid, classify);

  return classNames.map((v, i) => {
    const isFloatNumber = starNum % 1 !== 0;
    return i > startIndex ? 'default' : i === startIndex && isFloatNumber ? 'half' : classname;
  });
};

export const getIconClass = (iconClass: Object = {}): Object => {
  const { primary, danger, amazed, half } = iconClass;
  const iconDefault = iconClass.default;

  return {
    default: iconDefault || StarIconClass,
    primary: primary || iconDefault || StarIconClass,
    danger: danger || iconDefault || StarIconClass,
    amazed: amazed || iconDefault || StarIconClass,
    half: half || iconDefault || StarIconClassOpen,
  };
};

const getOffset = (rateRangeNode: Object) => {
  if (!rateRangeNode) {
    return { offsetLeft: 0, offsetWidth: 18 };
  }
  const { x } = getElementPosition(rateRangeNode);
  return { offsetLeft: x, offsetWidth: rateRangeNode.offsetWidth };
};

const isLeft = (offsetX: number, offsetWidth: number, x: number): boolean => {
  const halfX = offsetX + offsetWidth / 2;
  return x < halfX;
};

const getReturnObj = (state: Object, multiple: number) => {
  return {
    defaultValue: state.value,
    currentValue: multiple >= 0 ? multiple : 0,
  };
};
const loop = () => true;

class Rate extends React.Component<RateProps, any> {
  ratespan: any;
  temporary: string;
  static defaultProps = {
    count: 5,
    max: 5,
    disabled: false,
    allowHalf: false,
    classify: false,
    className: '',
    onClick: loop,
    onChange: loop,
    iconClass: {
      default: StarIconClass,
      primary: StarIconClass,
      danger: StarIconClass,
      amazed: StarIconClass,
      half: StarIconClassOpen,
    },
    getTheme: () => {
      return {};
    },
  };

  constructor(props: Object) {
    super(props);
    const num = props ? props.count : 5;
    this.ratespan = [...Array(num)].map(() => React.createRef());
  }

  componentDidMount() {
    this.saveState();
    const { onChange, value = 0 } = this.props;
    onChange({}, getReturnObj(this.state, value));
  }

  saveState() {
    this.updateTemporary(this.state);
  }

  updateTemporary(data: ?Object) {
    this.temporary = JSON.stringify(data);
  }

  static getDerivedStateFromProps(defProps: RateProps, currentState: Object) {
    const starNum = multipleValue(defProps);
    const { allowHalf } = defProps;
    const condition = {
      starNum,
      allowHalf,
      classify: defProps.classify,
    };
    const { value, count } = defProps;
    const classNames = createCalssArray(count, condition);
    if (!currentState) {
      const theValue = calcValue(value, allowHalf);
      return {
        count: classNames,
        value: theValue,
        starNum: theValue,
        current: value === 0 ? null : starNum,
        hasClick: false,
      };
    }
    return {
      count: 'count' in currentState ? currentState.count : classNames,
      value: 'value' in defProps ? value : currentState.value,
      starNum: 'starNum' in currentState ? currentState.starNum : 0,
      current: 'current' in currentState ? currentState.current : -1,
      hasClick: 'hasClick' in currentState ? currentState.hasClick : false,
    };
  }

  render() {
    const { getTheme } = this.props;
    const { count } = this.state;
    return (
      <Container theme={getTheme()} onMouseLeave={this.mouseLeave}>
        {count.map((x, i) => (
          <Ratespan
            innerRef={this.ratespan[i]}
            theme={getTheme()}
            onMouseMove={e => {
              this.onMouseMoveOrClick(e, i);
            }}
            onClick={e => {
              this.onMouseMoveOrClick(e, i, true);
            }}
          >
            {this.getElement(x)}
          </Ratespan>
        ))}
      </Container>
    );
  }

  onMouseMoveOrClick = (e: Object, i: number, hasClick?: boolean = false) => {
    const { disabled } = this.props;
    if (disabled) return;

    const { offsetLeft, offsetWidth } = this.getOffset(i);
    const starCount = this.getStarCount(i, offsetLeft, offsetWidth, e.pageX); //移动后value.star

    const { onChange, classify } = this.props;
    const { count, current } = this.state;
    const classNames = getClassNames(count, starCount, !!classify);

    if (hasClick) {
      this.handleClick(e, starCount, classNames, current);
    } else {
      const { hasClick } = this.state;
      this.setValue(starCount, classNames, current, hasClick);
    }

    onChange(e, getReturnObj(this.state, multipleValue(this.props, starCount)));
  };

  mouseLeave = (e: Object) => {
    const { props } = this;
    const { onChange } = props;
    const { current } = this.state;

    const temporary = this.getTemporary();
    if (temporary) {
      const { value, count } = temporary;
      this.setValue(value, count, current, false);
      onChange(e, getReturnObj(this.state, multipleValue(props, current)));
      return;
    }

    const { hasClick } = this.state;
    const { count } = props;
    const classNames = createCalssArray(count);
    this.setValue(0, classNames, current, hasClick);
    onChange(e, getReturnObj(this.state, multipleValue(props, 0)));
  };

  getTemporary = () => {
    if (!this.temporary) {
      return null;
    }
    return JSON.parse(this.temporary);
  };

  getStarCount = (
    index: number,
    offsetLeft: number,
    offsetWidth: number,
    pageX: number
  ): number => {
    const { allowHalf } = this.props;
    if (allowHalf && isLeft(offsetLeft, offsetWidth, pageX)) {
      return calcValue(index + 0.5, allowHalf);
    }
    return calcValue(index + 1, allowHalf);
  };

  getOffset(index: number) {
    return getOffset(this.ratespan[index].current);
  }

  getElement = (x: number) => {
    const { className, iconClass, disabled, character } = this.props;
    const IconClass = getIconClass(iconClass);

    const theClassName = `${defautClass[x]} ${className} ${disabled ? '' : 'hoverd'}`;

    if (ObjectUtils.isString(character)) {
      return (
        <RateText character={character} className={theClassName}>
          {character}
        </RateText>
      );
    }
    return (
      <React.Fragment>
        <RateIcon iconClass={`${IconClass[x]} ${theClassName}`} />
        <RateIcon iconClass={`${IconClass.default}  default bottom`} />
      </React.Fragment>
    );
  };

  handleClick = (e: Object, val: number, classNames: Array<string>, index: number) => {
    const { state } = this;
    const { current } = state;
    let hasClicked = true;
    index = val;

    const { props } = this;

    if (index === current) {
      const { allowHalf } = props;
      val = calcValue(0, allowHalf);

      index = -1;
      hasClicked = false;
      classNames = getDefaultClassNames(classNames.length);
      this.updateTemporary(null);
    }

    this.setValue(val, classNames, index, hasClicked);

    const { onClick } = props;
    onClick(e, getReturnObj(state, multipleValue(props, val)));
  };
  setValue = (val: number, count: Array<string>, index: number, hasClick: boolean) => {
    this.setState(
      {
        value: val,
        starNum: val,
        count,
        current: index,
        hasClick,
      },
      () => {
        if (hasClick) {
          this.saveState();
          this.setState({
            hasClick: false,
          });
        }
      }
    );
  };
}

export default Rate;
