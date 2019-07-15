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

import { getElementPosition } from '../utils';
import { ObjectUtils } from '@lugia/type-utils';
import { toNumber } from '../common/NumberUtils';

import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';
import { deepMerge } from '@lugia/object-utils';

import colorsFunc from '../css/stateColor';
const { warningColor, dangerColor } = colorsFunc();

const showUp = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Container = CSSComponent({
  tag: 'div',
  className: 'characterContainer',
  normal: {
    selectNames: [],
    defaultTheme: {
      fontSize: '18px',
    },
  },
  css: css`
    position: relative;
    min-height: 20px;
    white-space: nowrap;
    display: inline-block;
  `,
});

const RateBox = CSSComponent({
  tag: 'div',
  className: 'RateBox',
  normal: {
    selectNames: [['width'], ['margin'], ['height'], ['padding'], ['fontSize']],
  },
  css: css`
    position: relative;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
  `,
});

const StarIconClass = 'lugia-icon-financial_star';
const StarIconClassOpen = 'lugia-icon-finacial_half_star';

const Ratespan = CSSComponent({
  tag: 'span',
  className: 'starBox',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
    defaultTheme: {
      margin: {
        right: 6,
      },
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      return '&:last-child { margin: 0 !important;}';
    },
  },
  css: css`
    margin-right: 6px;
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

const RateTextContainer = CSSComponent({
  tag: 'span',
  className: 'RateTextContainer',
  normal: {
    selectNames: [['margin']],
  },
  css: css`
    position: relative;
  `,
});

const RateText = CSSComponent({
  tag: 'span',
  className: 'ActiveTextIcon',
  normal: {
    selectNames: [['color'], ['fontSize']],
    defaultTheme: {
      color: '#e8e8e8',
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: '#ccc',
    },
  },
  css: css`
    vertical-align: text-bottom !important;
    cursor: pointer;
    position: absolute;
    left: 0;
    bottom: 0;
    &.half {
      width: 50%;
      overflow: hidden;
    }
  `,
});

const RateTextBottom = CSSComponent({
  tag: 'span',
  className: 'DefaultTextIcon',
  normal: {
    selectNames: [['color'], ['fontSize']],
    defaultTheme: {
      color: '#e8e8e8',
    },
  },
  disabled: {
    selectNames: [['color']],
    defaultTheme: {
      color: '#f2f2f2',
    },
  },
  css: css`
    vertical-align: text-bottom !important;
    cursor: pointer;
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
  count?: number,
  max?: number,
  value?: number,
  disabled?: boolean,
  allowHalf: boolean,
  iconClass?: Object,
  className: any,
  classify?: boolean,
  onClick: Function,
  onChange: Function,
  character?: any,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};

export function getDefaultClassNames(count: number): Array<string> {
  return [...Array(count)].map(() => 'default');
}

export function getFontSize(count: number, width: number, height: number): number {
  if (!width || !count) {
    return 18;
  }
  const verticalHeight = height / 2 || 18;
  const fontRes = (width - 6 * count) / count - 10;
  return fontRes > verticalHeight ? verticalHeight : fontRes;
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

export const getMultiple = (props: Object): number => {
  if (!props) {
    return 0;
  }
  const { max, count } = props;
  return max && count ? max / count : 1;
};

export const multipleValue = (props: Object, val?: number): number => {
  if (!props || val === 0) {
    return 0;
  }
  const multiple = getMultiple(props);
  if (val) {
    return val * multiple;
  }
  const { value = 0 } = props;
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

const getOffsetInfo = (rateRangeNode: ?Object) => {
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
  };

  constructor(props: Object) {
    super(props);
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
    const { value, count = 5, disabled } = defProps;
    const classNames = createCalssArray(count, condition);
    if (!currentState) {
      const theValue = calcValue(value, allowHalf);
      return {
        count: classNames,
        value: theValue,
        starNum,
        current: value === 0 ? null : starNum,
        hasClick: false,
      };
    }
    if (disabled) {
      return;
    }
    return {
      count: 'count' in defProps ? classNames : currentState.count,
      value: 'value' in defProps ? value : currentState.value,
      starNum: 'starNum' in defProps ? starNum : currentState.starNum,
      current: 'current' in currentState ? currentState.current : -1,
      hasClick: 'hasClick' in currentState ? currentState.hasClick : false,
    };
  }

  render() {
    const { themeProps, count: propsCount } = this.props;
    const { count } = this.state;
    this.ratespan = [...Array(count.length)].map(() => React.createRef());
    return (
      <Container themeProps={themeProps} onMouseLeave={this.mouseLeave}>
        <RateBox themeProps={themeProps}>
          {count.map((x, i) => (
            <Ratespan
              themeProps={themeProps}
              ref={this.ratespan[i]}
              onMouseMove={e => {
                this.onMouseMoveOrClick(e, i);
              }}
              onClick={e => {
                this.onMouseMoveOrClick(e, i, true);
              }}
            >
              {this.getElement(x, i)}
            </Ratespan>
          ))}
        </RateBox>
      </Container>
    );
  }

  onMouseMoveOrClick = (e: Object, i: number, hasClick?: boolean = false) => {
    const { disabled } = this.props;
    if (disabled) return;
    const { offsetLeft, offsetWidth } = this.getOffset(i);
    const starCount = this.getStarCount(i, offsetLeft, offsetWidth, e.pageX);
    const { classify } = this.props;
    const { count, current } = this.state;
    const classNames = getClassNames(count, starCount, !!classify);

    if (hasClick) {
      this.handleClick(e, starCount, classNames, current);
    } else {
      const { hasClick } = this.state;
      const multiple = getMultiple(this.props);
      this.setValue(starCount * multiple, starCount, classNames, current, hasClick);
    }
    this.doExportChange(getReturnObj(this.state, multipleValue(this.props, starCount)));
  };

  mouseLeave = (e: Object) => {
    const { props } = this;

    const { disabled } = props;
    if (disabled) {
      return;
    }
    const { current } = this.state;

    const temporary = this.getTemporary();
    if (temporary) {
      const { value, count, starNum } = temporary;
      this.setValue(value, starNum, count, current, false);
      this.doExportChange(getReturnObj(this.state, multipleValue(props, current)));
      return;
    }

    const { hasClick } = this.state;
    const { count = 5 } = props;
    const classNames = createCalssArray(count);
    this.setValue(0, 0, classNames, current, hasClick);
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
    let reactNode = null;
    if (this.ratespan[index]) {
      reactNode = this.ratespan[index].current.querySelector('.iconCharacter');
    }
    return getOffsetInfo(reactNode);
  }

  getElement = (x: string, index: number) => {
    const { className, iconClass, disabled, character } = this.props;
    const IconClass = getIconClass(iconClass);
    const theClassName = `${defautClass[x]} ${className} iconCharacter ${disabled ? '' : 'hoverd'}`;
    const { starNum } = this.state;
    if (ObjectUtils.isString(character)) {
      const activeTextIconThemeProps = this.props.getPartOfThemeProps('ActiveTextIcon');
      const defaultTextIconThemeProps = this.props.getPartOfThemeProps('DefaultTextIcon');
      const themeProps = index < starNum ? activeTextIconThemeProps : defaultTextIconThemeProps;
      return (
        <React.Fragment>
          <RateTextContainer themeProps={themeProps}>
            <RateText
              themeProps={themeProps}
              type={x}
              disabled={disabled}
              character={character}
              className={theClassName}
            >
              {character}
            </RateText>
            <RateTextBottom
              themeProps={defaultTextIconThemeProps}
              type={x}
              disabled={disabled}
              character={character}
              className={theClassName}
            >
              {character}
            </RateTextBottom>
          </RateTextContainer>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {this.getRateIcon(x, IconClass)}
        {this.getRateIcon('bottom', IconClass)}
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
    const multiple = getMultiple(props);
    this.setValue(val * multiple, val, classNames, index, hasClicked);

    const { onClick } = props;
    const { newValue, oldValue } = getReturnObj(state, multipleValue(props, val));
    onClick(newValue, oldValue);
  };

  setValue = (
    val: number,
    starNum: number,
    count: Array<string>,
    index: number,
    hasClick: boolean
  ) => {
    this.setState(
      {
        value: val,
        starNum,
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
    const { onChange, disabled } = this.props;
    if (disabled) {
      return;
    }
    onChange && onChange(newValue, oldValue);
  };

  getRateIcon = (type: string, IconClass: Object) => {
    const { disabled, className } = this.props;

    const theClassName = `${defautClass[type]} ${className} ${disabled ? '' : 'hoverd'}`;

    const { theme, viewClass, markClassName } = this.getIconThemeProps(type);

    if (type === 'bottom') {
      return (
        <Icon
          singleTheme
          theme={theme}
          viewClass={viewClass}
          type={'default'}
          disabled={disabled}
          iconClass={`${IconClass.default} ${markClassName}  default iconCharacter `}
          singleTheme
        />
      );
    }

    return (
      <Icon
        singleTheme
        theme={theme}
        viewClass={viewClass}
        type={type}
        disabled={disabled}
        iconClass={`${IconClass[type]} ${theClassName} ${markClassName} iconCharacter `}
      />
    );
  };

  getIconThemeProps = (type: string) => {
    let resultTheme;
    let resultViewClass;
    let markClassName;

    switch (type) {
      case 'amazed':
        const {
          viewClass: amazedIconViewClass,
          theme: amazedIconTheme,
        } = this.props.getPartOfThemeHocProps('AmazedIcon');
        resultTheme = amazedIconTheme;
        resultViewClass = amazedIconViewClass;
        markClassName = 'AmazedIcon';
        break;
      case 'danger':
        const {
          viewClass: dangerIconViewClass,
          theme: dangerIconTheme,
        } = this.props.getPartOfThemeHocProps('DangerIcon');
        resultTheme = deepMerge(
          { [dangerIconViewClass]: { normal: { color: dangerColor } } },
          dangerIconTheme
        );
        resultViewClass = dangerIconViewClass;
        markClassName = 'DangerIcon';
        break;
      case 'half':
      case 'primary':
        const { viewClass, theme } = this.props.getPartOfThemeHocProps('ActiveIcon');

        resultTheme = deepMerge({ [viewClass]: { normal: { color: warningColor } } }, theme);
        resultViewClass = viewClass;
        markClassName = 'ActiveIcon';
        break;
      case 'bottom':
      default:
        const {
          viewClass: RateIconBottomViewClass,
          theme: RateIconBottomTheme,
        } = this.props.getPartOfThemeHocProps('DefaultRateIcon');
        resultViewClass = RateIconBottomViewClass;
        const obj = {
          [RateIconBottomViewClass]: {
            normal: {
              color: '#e8e8e8',
            },
          },
        };
        resultTheme = deepMerge(obj, RateIconBottomTheme);
        markClassName = 'DefaultRateIcon';
        break;
    }

    if (type === 'bottom') {
      const obj = {
        [resultViewClass]: {
          normal: {
            getCSS: () => {
              return `              
              vertical-align: text-bottom !important;
              color: #e8e8e8;
              position: absolute;
              left: 0;
              bottom: 0;
              z-index: -1;`;
            },
          },
        },
      };
      resultTheme = deepMerge(obj, resultTheme);
    } else {
      const obj = {
        [resultViewClass]: {
          hover: {
            getCSS(themeMeta: Object, themeProps: Object) {
              return css`
                animation: ${showUp} 0.3s linear forwards;
                transform: scale(1.2);
              `;
            },
          },
          disabled: {
            color: '#cccccc',
          },
        },
      };
      resultTheme = deepMerge(obj, resultTheme);
    }

    return { theme: resultTheme, viewClass: resultViewClass, markClassName };
  };
}

export default Rate;
