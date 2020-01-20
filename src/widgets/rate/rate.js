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

import CSSComponent, { css, keyframes, StaticComponent } from '@lugia/theme-css-hoc';
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

const Container = StaticComponent({
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

const RateBox = StaticComponent({
  tag: 'div',
  className: 'RateBox',
  normal: {
    selectNames: [['width'], ['margin'], ['height'], ['padding'], ['fontSize']],
    getThemeMeta(themeMeta, themeProps) {
      const {
        normal: { fontSize },
      } = themeMeta;
      return {
        fontSize: fontSize || 20,
      };
    },
  },
  css: css`
    position: relative;
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
    selectNames: [['color'], ['font'], ['fontSize'], ['margin']],
    defaultTheme: {
      margin: {
        right: 6,
      },
    },
    getCSS(themeMeta: Object, themeProps: Object) {
      return '&:last-child { margin: 0 !important;}';
    },
  },
  hover: {
    selectNames: [],
    getCSS(themeMeta: Object, themeProps: Object) {
      return css`
        i {
          animation: ${showUp} 0.3s linear forwards;
          transform: scale(1.2);
        }
      `;
    },
  },
  css: css`
    margin-right: 6px;
    position: relative;
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
  option: { hover: true },
});

Ratespan.displayName = 'sv_rate_Ratespan';

const RateTextContainer = CSSComponent({
  tag: 'span',
  className: 'RateTextContainer',
  normal: {
    selectNames: [],
  },
  css: css`
    position: relative;
  `,
});

const RateText = CSSComponent({
  tag: 'span',
  className: 'ActiveTextIcon',
  normal: {
    selectNames: [['color']],
    defaultTheme: {
      color: '#e8e8e8',
      fontSize: 20,
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
      fontSize: 20,
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
  defaultValue?: number,
  value?: number,
  disabled?: boolean,
  allowHalf?: boolean,
  iconClass?: Object,
  classify?: boolean,
  onClick?: Function,
  onChange?: Function,
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

export const createIconTypeArray = (num: number | string, condition?: Object): Array<string> => {
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

export const calcValue = (val: number = 0, allowHalf?: boolean): number => {
  return allowHalf ? Math.floor(val * 2) / 2 : Math.floor(val);
};

export const getMultiple = (props: Object): number => {
  if (!props) {
    return 0;
  }
  const { max, count = 5 } = props;
  return max ? max / count : 1;
};

export const multipleValue = (props: Object, val?: number): number => {
  if (!props || val === 0) {
    return 0;
  }
  const multiple = getMultiple(props);
  if (val) {
    return val * multiple;
  }
  const { value, defaultValue } = props;
  const resValue = value || defaultValue || 0;
  return resValue / multiple;
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

const getDefaultTheme = (viewClass: string, theme: Object, defaultViewClass: string) => {
  if (!viewClass) {
    return {};
  }
  if (!theme || !defaultViewClass) {
    return { [viewClass]: {} };
  }
  return { [viewClass]: theme[defaultViewClass] };
};

class Rate extends React.Component<RateProps, any> {
  ratespan: any;
  temporary: string;
  static defaultProps = {
    disabled: false,
    allowHalf: false,
    classify: false,
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
    const { value, count = 5, disabled, defaultValue } = defProps;
    const iconTypeArray = createIconTypeArray(count, condition);
    if (!currentState) {
      const val = value || defaultValue;
      const theValue = calcValue(val, allowHalf);
      return {
        count,
        iconTypeArray,
        value: theValue,
        starNum,
        current: value === 0 ? null : starNum,
        hasClick: false,
      };
    }
    if (disabled) {
      return;
    }
    const isClick = currentState.hasClick;
    let newTconTypeArray = currentState.iconTypeArray;
    if (isClick) {
      newTconTypeArray = iconTypeArray;
    }
    return {
      count: 'value' in defProps ? count : currentState.count,
      iconTypeArray: newTconTypeArray,
      value: 'value' in defProps ? value : currentState.value,
      starNum: 'value' in defProps ? starNum : currentState.starNum,
      current: 'current' in currentState ? currentState.current : -1,
      hasClick: 'hasClick' in currentState ? currentState.hasClick : false,
    };
  }

  render() {
    const { iconTypeArray, count } = this.state;
    const { character } = this.props;
    this.ratespan = [...Array(count)].map(() => React.createRef());
    const defaultTextIconThemeProps = ObjectUtils.isString(character)
      ? this.props.getPartOfThemeProps('DefaultTextIcon')
      : this.props.getPartOfThemeProps('DefaultRateIcon');
    return (
      <Container onMouseLeave={this.mouseLeave}>
        <RateBox>
          {iconTypeArray.map((x, i) => (
            <Ratespan
              themeProps={defaultTextIconThemeProps}
              ref={node => (this.ratespan[i] = node)}
              onMouseMove={e => {
                this.onMouseMove(e, i);
              }}
              onClick={e => {
                this.onClick(e, i);
              }}
            >
              {this.getElement(x, i)}
            </Ratespan>
          ))}
        </RateBox>
      </Container>
    );
  }

  getElement = (x: string, index: number) => {
    const { iconClass, disabled, character } = this.props;
    const IconClass = getIconClass(iconClass);
    const theClassName = `${defautClass[x]}  iconCharacter ${disabled ? '' : 'hoverd'}`;
    if (ObjectUtils.isString(character)) {
      const defaultTextIconThemeProps = this.props.getPartOfThemeProps('DefaultTextIcon');
      const activeTextIconThemeProps = deepMerge(
        { themeConfig: { normal: { color: warningColor } } },
        defaultTextIconThemeProps,
        this.props.getPartOfThemeProps('ActiveTextIcon')
      );
      const themeProps =
        x !== 'default'
          ? activeTextIconThemeProps
          : deepMerge(defaultTextIconThemeProps, {
              themeConfig: { disabled: { color: '#e8e8e8' } },
            });
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

  onClick = (e: Object, i: number) => {
    const { disabled } = this.props;
    if (disabled) return;
    const { offsetLeft, offsetWidth } = this.getOffset(i);
    const starCount = this.getStarCount(i, offsetLeft, offsetWidth, e.pageX);
    const { iconTypeArray, current } = this.state;
    const { classify } = this.props;
    const newIconTypeArray = getClassNames(iconTypeArray, starCount, !!classify);
    this.handleClick(e, starCount, newIconTypeArray, current);
  };

  handleClick = (e: Object, val: number, classNames: Array<string>, current: number) => {
    let hasClicked = true;
    let newIconTypeArray = classNames;
    let index = val;
    const { props } = this;

    if (index === current) {
      const { allowHalf } = props;
      val = calcValue(0, allowHalf);
      index = -1;
      hasClicked = false;
      newIconTypeArray = getDefaultClassNames(classNames.length);
      this.updateTemporary(null);
    }
    const multiple = getMultiple(props);

    const setValObj = {
      value: val * multiple,
      starNum: val,
      iconTypeArray: newIconTypeArray,
      current: index,
      hasClick: false,
    };
    if ('value' in props) {
      setValObj.hasClick = hasClicked;
    }
    this.setValue(setValObj, true);
    const { onClick } = props;
    onClick && onClick(getReturnObj(this.state, multipleValue(props, val)));
  };

  onMouseMove = (e: Object, i: number) => {
    const { disabled } = this.props;
    if (disabled) return;
    const { offsetLeft, offsetWidth } = this.getOffset(i);
    const starCount = this.getStarCount(i, offsetLeft, offsetWidth, e.pageX);
    const { classify } = this.props;
    const { iconTypeArray, current } = this.state;
    const newIconTypeArray = getClassNames(iconTypeArray, starCount, !!classify);

    const { hasClick } = this.state;
    const multiple = getMultiple(this.props);
    const setValObj = {
      value: starCount * multiple,
      starNum: starCount,
      iconTypeArray: newIconTypeArray,
      current,
      hasClick,
    };
    this.setValue(setValObj);

    this.doExportChange(getReturnObj(this.state, multipleValue(this.props, starCount)));
  };

  getOffset(index: number) {
    let reactNode = null;
    if (this.ratespan[index]) {
      reactNode = this.ratespan[index];
    }
    return getOffsetInfo(reactNode);
  }

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

  mouseLeave = (e: Object) => {
    const { props } = this;

    const { disabled } = props;
    if (disabled) {
      return;
    }
    const { current } = this.state;

    const temporary = this.getTemporary();
    if (temporary) {
      const { value, iconTypeArray, starNum, current } = temporary;
      const setValObj = {
        value,
        starNum,
        iconTypeArray,
        current,
      };
      this.setValue(setValObj);
      this.doExportChange(getReturnObj(this.state, multipleValue(props, current)));
      return;
    }

    const { count = 5 } = props;
    const setValObj = {
      value: 0,
      starNum: 0,
      iconTypeArray: createIconTypeArray(count),
      current,
    };
    this.setValue(setValObj);
    this.doExportChange(getReturnObj(this.state, multipleValue(props, 0)));
  };

  getTemporary = () => {
    if (!this.temporary) {
      return null;
    }
    return JSON.parse(this.temporary);
  };

  doExportChange = (resValue: Object) => {
    const { onChange, disabled } = this.props;
    if (disabled) {
      return;
    }
    onChange && onChange(resValue);
  };

  setValue = (obj: Object, hasClick?: boolean = false) => {
    this.setState({ ...obj }, () => {
      if (hasClick) {
        this.saveState();
        this.setState({
          hasClick: false,
        });
      }
    });
  };

  getRateIcon = (type: string, IconClass: Object) => {
    const { disabled } = this.props;

    const theClassName = `${defautClass[type]}  ${disabled ? '' : 'hoverd'}`;

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
    const {
      viewClass: RateIconBottomViewClass,
      theme: RateIconBottomTheme,
    } = this.props.getPartOfThemeHocProps('DefaultRateIcon');

    switch (type) {
      case 'amazed':
        const {
          viewClass: amazedIconViewClass,
          theme: amazedIconTheme,
        } = this.props.getPartOfThemeHocProps('AmazedIcon');
        resultTheme = deepMerge(
          getDefaultTheme(amazedIconViewClass, RateIconBottomTheme, RateIconBottomViewClass),
          { [amazedIconViewClass]: { normal: { color: dangerColor } } },
          amazedIconTheme
        );
        resultViewClass = amazedIconViewClass;
        markClassName = 'AmazedIcon';
        break;
      case 'danger':
        const {
          viewClass: dangerIconViewClass,
          theme: dangerIconTheme,
        } = this.props.getPartOfThemeHocProps('DangerIcon');
        resultTheme = deepMerge(
          getDefaultTheme(dangerIconViewClass, RateIconBottomTheme, RateIconBottomViewClass),
          { [dangerIconViewClass]: { normal: { color: dangerColor } } },
          dangerIconTheme
        );
        resultViewClass = dangerIconViewClass;
        markClassName = 'DangerIcon';
        break;
      case 'half':
      case 'primary':
        const { viewClass, theme } = this.props.getPartOfThemeHocProps('ActiveIcon');
        resultTheme = deepMerge(
          getDefaultTheme(viewClass, RateIconBottomTheme, RateIconBottomViewClass),
          { [viewClass]: { normal: { color: warningColor } } },
          theme
        );
        resultViewClass = viewClass;
        markClassName = 'ActiveIcon';
        break;
      case 'bottom':
      default:
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
    resultTheme = this.IconThemePropsFilter(resultTheme, resultViewClass);
    return { theme: resultTheme, viewClass: resultViewClass, markClassName };
  };

  IconThemePropsFilter = (resultTheme: Object, viewClass: string) => {
    return deepMerge(resultTheme, { [viewClass]: { normal: { margin: 0 } } });
  };
}

export default Rate;
