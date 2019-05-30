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
import { css } from 'styled-components';
import colorsFunc from '../css/stateColor';
import { getElementPosition } from '../utils';
import { ObjectUtils } from '@lugia/type-utils';
import { toNumber } from '../common/NumberUtils';
import Widget from '../consts';

import CSSProvider from '../theme/CSSProvider';
import { getFontSize, getColor, getAnimation, getCharacter } from '../css/rate';

const { warningColor } = colorsFunc();

const Container = CSSProvider({
  tag: 'div',
  className: 'characterContainer',
  normal: {
    selectNames: [],
  },
  css: css`
    position: relative;
    padding: 10px;
    white-space: nowrap;
    display: inline-block;
    font-size: ${getFontSize};
  `,
});

const StarIconClass = 'lugia-icon-financial_star';
const StarIconClassOpen = 'lugia-icon-finacial_half_star';

const Ratespan = CSSProvider({
  tag: 'span',
  className: 'starBox',
  normal: {
    selectNames: [],
  },
  css: css`
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
      vertical-align: text-bottom !important;
    }
  `,
});

Ratespan.displayName = 'sv_rate_Ratespan';

const RateIcon = CSSProvider({
  extend: Icon,
  className: 'singleCharacter',
  css: css`
    vertical-align: text-bottom !important;
    opacity: 1;
    font-size: ${getFontSize};
  `,
  normal: {
    selectNames: [['color']],
    defaultTheme: {
      color: 'blue',
    },
    // getCSS(themeMeta: Object, themeProps: Object) {
    //   console.log(themeProps, 'themeProps normal',themeMeta);
    // },
  },
  hover: {
    selectNames: [['color']],
    getCSS(themeMeta: Object, themeProps: Object) {
      console.log(themeProps, 'themeProps', themeMeta);
      // return '';
    },
  },
});

const RateIconBottom = CSSProvider({
  extend: Icon,
  className: 'defaultCharacter',
  css: css`
    vertical-align: text-bottom !important;
    opacity: 1;
    color: #e8e8e8;
    font-size: ${getFontSize};
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
  `,
});

RateIcon.displayName = 'sv_rate_icon';

const RateText = CSSProvider({
  tag: 'span',
  className: 'singleTextCharacter',
  css: css`
    vertical-align: text-bottom !important;
    opacity: 1;
    color: ${getColor};
    cursor: pointer;
    &.hoverd:hover {
      transform: scale(1.2);
    }
    &.half::before {
      content: ${getCharacter};
      position: absolute;
      z-index: 10;
      color: #e8e8e8;
      -webkit-mask: linear-gradient(to left, #e8e8e8 30%, ${getColor} 40%, transparent);
    }
  `,
});

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
  themeProps: Object,
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
    oldValue: state.value,
    newValue: multiple >= 0 ? multiple : 0,
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
    const { getTheme, themeProps } = this.props;
    const { count, value } = this.state;
    const themeConfig = getTheme();
    this.props.themeProps.propsConfig = { value };
    return (
      <Container themeProps={themeProps} theme={themeConfig} onMouseLeave={this.mouseLeave}>
        {count.map((x, i) => (
          <Ratespan
            themeProps={themeProps}
            ref={this.ratespan[i]}
            theme={themeConfig}
            onMouseMove={e => {
              this.onMouseMoveOrClick(e, i);
            }}
            onClick={e => {
              this.onMouseMoveOrClick(e, i, true);
            }}
          >
            {this.getElement(x, themeConfig)}
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

    const { classify } = this.props;
    const { count, current } = this.state;
    const classNames = getClassNames(count, starCount, !!classify);

    if (hasClick) {
      this.handleClick(e, starCount, classNames, current);
    } else {
      const { hasClick } = this.state;
      this.setValue(starCount, classNames, current, hasClick);
    }
    this.doExportChange(getReturnObj(this.state, multipleValue(this.props, starCount)));
  };

  mouseLeave = (e: Object) => {
    const { props } = this;

    const { current } = this.state;

    const temporary = this.getTemporary();
    if (temporary) {
      const { value, count } = temporary;
      this.setValue(value, count, current, false);
      this.doExportChange(getReturnObj(this.state, multipleValue(props, current)));
      return;
    }

    const { hasClick } = this.state;
    const { count } = props;
    const classNames = createCalssArray(count);
    this.setValue(0, classNames, current, hasClick);
    this.doExportChange(getReturnObj(this.state, multipleValue(props, 0)));
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

  getElement = (x: string, theme: Object) => {
    console.log('x', x);
    const { className, iconClass, disabled, character, themeProps } = this.props;
    const IconClass = getIconClass(iconClass);
    const theClassName = `${defautClass[x]} ${className} ${disabled ? '' : 'hoverd'}`;
    const { fontSize = 18 } = theme;
    const config = {
      [Widget.Icon]: { fontSize },
    };
    if (ObjectUtils.isString(character)) {
      return (
        <RateText themeProps={themeProps} type={x} character={character} className={theClassName}>
          {character}
        </RateText>
      );
    }
    const { value } = this.state;
    const {
      themeConfig: { children },
    } = themeProps;
    console.log('children', children);
    return (
      <React.Fragment config={config}>
        <RateIcon
          themeProps={children.activeStar}
          type={x}
          disabled={disabled}
          iconClass={`${IconClass[x]} ${theClassName} `}
        />
        <RateIconBottom
          themeProps={themeProps}
          type={'default'}
          iconClass={`${IconClass.default}  default `}
        />
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
    const { newValue, oldValue } = getReturnObj(state, multipleValue(props, val));
    onClick(newValue, oldValue);
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

  doExportChange = (resValue: Object) => {
    const { newValue, oldValue } = resValue;
    const { onChange } = this.props;
    onChange && onChange(newValue, oldValue);
  };
}

export default Rate;
