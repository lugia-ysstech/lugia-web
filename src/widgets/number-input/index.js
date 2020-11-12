/**
 *
 * create by liangguodong on 2018/8/14
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import ThemeHoc, { addMouseEvent } from '@lugia/theme-hoc';
import type { ClickType, InputSize } from '../css/number-input';
import Input from '../input/index';
import Widget from '../consts';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import Icon from '../icon/index';
import { accAdd, checkNumber, limit } from '../common/Math';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { deepMerge } from '@lugia/object-utils';
import get from '../css/theme-common-dict';
import type { ValidateStatus, ValidateType } from '../css/validateHoc';
import { getInputIconSize } from '../css/input';
import { getBorder } from '@lugia/theme-utils';

const borderColor = '$lugia-dict.@lugia/lugia-web.borderColor';

const ArrowIconContainer = CSSComponent({
  tag: 'div',
  className: 'ArrowIconContainer',
  normal: {
    selectNames: [
      ['width'],
      ['fontSize'],
      ['font'],
      ['color'],
      ['background'],
      ['border', 'left'],
      ['cursor'],
      ['margin'],
      ['padding'],
      ['opacity'],
    ],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { width } = themeMeta;
      const { disabled } = propsConfig;
      const theCursor = !disabled ? 'pointer' : 'not-allowed';
      const theWidth = width ? width : 22;
      return {
        cursor: theCursor,
        width: theWidth,
      };
    },
  },
  hover: {
    selectNames: [
      ['font'],
      ['fontSize'],
      ['color'],
      ['background'],
      ['border', 'left'],
      ['cursor'],
      ['opacity'],
    ],
  },
  active: {
    selectNames: [
      ['font'],
      ['fontSize'],
      ['color'],
      ['background'],
      ['border', 'left'],
      ['cursor'],
      ['opacity'],
    ],
  },
  disabled: {
    selectNames: [
      ['font'],
      ['fontSize'],
      ['color'],
      ['background'],
      ['border', 'left'],
      ['cursor'],
      ['opacity'],
    ],
    defaultTheme: {
      opacity: 0,
    },
  },
  css: css`
    height: 100%;
    -webkit-transition: all 0.3s linear 0.1s;
    transition: all 0.3s linear 0.1s;
    box-sizing: border-box;
  `,
  option: { hover: true, active: true },
});

const StepButton = CSSComponent({
  tag: 'span',
  className: 'NumberInputStepButton',
  normal: {
    selectNames: [['cursor']],
    defaultTheme: {
      cursor: 'pointer',
    },
  },

  css: css`
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
    position: relative;
    transition: all pointer 0.1s linear;
    display: block;
    width: 100%;
    font-weight: bold;
  `,
});
const MinusButton = CSSComponent({
  extend: StepButton,
  className: 'NumberInputMinusButton',
  normal: {
    selectNames: [['border', 'top']],
    defaultTheme: {
      border: getBorder({ color: borderColor, width: 1, style: 'solid' }, { directions: ['t'] }),
    },
  },
  hover: {
    selectNames: [['height'], ['cursor']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { hover, outRange } = propsConfig;
      const theHeight = hover === 'no' ? '50%' : hover === 'minus' ? '60%' : '40%';
      const theCursor = outRange ? 'not-allowed' : 'pointer';
      return {
        height: theHeight,
        cursor: theCursor,
      };
    },
  },
  disabled: {
    selectNames: [['cursor'], ['opacity']],
    defaultTheme: {
      cursor: 'not-allowed',
      opacity: 0,
    },
  },
  css: css`
    height: 50%;
  `,
  option: { hover: true, active: true },
});
const PlusButton = CSSComponent({
  extend: StepButton,
  className: 'NumberInputPlusButton',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [['height'], ['cursor']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { hover, outRange } = propsConfig;
      const theHeight = hover === 'no' ? '50%' : hover === 'plus' ? '60%' : '40%';
      const theCursor = outRange ? 'not-allowed' : 'pointer';
      return {
        height: theHeight,
        cursor: theCursor,
      };
    },
  },
  disabled: {
    selectNames: [['cursor'], ['opacity']],
    defaultTheme: {
      cursor: 'not-allowed',
      opacity: 0,
    },
  },
  css: css`
    height: 50%;
  `,
  option: { hover: true, active: true },
});

const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const themeActiveColor = '$lugia-dict.@lugia/lugia-web.themeActiveColor';
const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
const disableTextColor = '$lugia-dict.@lugia/lugia-web.disableTextColor';

PlusButton.displayName = 'Plus';
MinusButton.displayName = 'Minus';

type NumberInputState = {|
  value: number,
  disabled: boolean,
  stepHover: ClickType,
|};

const PlusClass = 'lugia-icon-direction_up';
const MinusClass = 'lugia-icon-direction_down';
export type NumberInputProps = {
  size?: InputSize,
  viewClass: string,
  max: number,
  min: number,
  disabled: boolean,
  validateStatus: ValidateStatus,
  validateType: ValidateType,
  help: string,
  placeholder?: string,
  getTheme: Function,
  onChange?: ({ newValue: number, oldValue: number, event: Event }) => void,
  onKeyUp?: (event: KeyboardEvent) => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  onKeyPress?: (event: KeyboardEvent) => void,
  onFocus?: (event: UIEvent) => void,
  onBlur?: (event: UIEvent) => void,
  onEnter?: (event: UIEvent) => void,
  defaultValue?: number,
  value?: number,
  step: number,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  formatter?: (value: string) => string,
  parser?: (displayValue: string) => string,
  precision: number,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  createEventChannel: Function,
  addIcon?: string,
  subtractIcon?: string,
  suffix?: React$Node,
  dispatchEvent: Function,
  showArrow: boolean,
};

function hasValueProps(props: Object) {
  return 'value' in props;
}

function getOverMax(value, max) {
  return parseFloat(value) >= max;
}

function getBelowMin(value, min) {
  return parseFloat(value) <= min;
}

function handleFirstPoint(value: string | number) {
  return value === '.' ? '' : value;
}
function handleEmpty(value, handleValue) {
  return value === '' ? '' : handleValue;
}

const iconDefaultTheme = (viewClass: string) => {
  return {
    [viewClass]: {
      normal: {
        cursor: 'pointer',
        color: mediumGreyColor,
        getCSS() {
          return ` position: absolute;
                       top: 50%;
                       left: 50%;
                       transform: translate(-50%, -50%);
                       transition: all 0.3s;`;
        },
        getThemeMeta(themeMeta, themeProps) {
          const { propsConfig } = themeProps;
          const { outRange, disabled, size } = propsConfig;
          const { fontSize, font: { size: innerFontSize } = {} } = themeMeta;
          const theSize = innerFontSize || fontSize || getInputIconSize(size);
          const theCursor = outRange || disabled ? 'not-allowed' : 'pointer';
          return {
            cursor: theCursor,
            fontSize: theSize,
          };
        },
      },
      hover: {
        color: themeColor,
      },
      active: {
        color: themeActiveColor,
      },
      disabled: {
        color: disableTextColor,
        cursor: 'not-allowed',
        opacity: 0,
      },
    },
  };
};
export const maxSafeNumber = Number.MAX_SAFE_INTEGER;
export const minSafeNumber = Number.MIN_SAFE_INTEGER;

class NumberTextBox extends Component<NumberInputProps, NumberInputState> {
  static defaultProps = {
    disabled: false,
    max: maxSafeNumber,
    min: minSafeNumber,
    viewClass: Widget.NumberInput,
    size: 'default',
    precision: 0,
    step: 1,

    formatter: (value: string) => {
      return value;
    },
    parser: (value: string) => {
      return value;
    },
  };
  static displayName = Widget.NumberInput;

  static getDerivedStateFromProps(nextProps: NumberInputProps, state: NumberInputState) {
    const { value, defaultValue, disabled } = nextProps;
    const hasValueInprops = hasValueProps(nextProps);
    const hasDisabledInprops = 'disabled' in nextProps;

    if (!state) {
      const { min, max } = nextProps;

      const theValue = hasValueInprops
        ? value
        : defaultValue
        ? limit(defaultValue, [min, max])
        : '';
      const theDisabled = hasDisabledInprops ? disabled : false;
      return {
        value: theValue,
        disabled: theDisabled,
        stepHover: 'no',
      };
    }
    if (hasValueInprops) {
      return { value };
    }
  }

  getButtonMousePos = (type: ClickType) => () => {
    this.setState({ stepHover: type });
  };
  getThemePropsByType = type => {
    const { stepHover, value } = this.state;
    const { size, getPartOfThemeProps, max, min, disabled } = this.props;
    const propsConfig =
      type === 'container'
        ? { disabled }
        : type === 'plus'
        ? { outRange: getOverMax(value, max) }
        : type === 'minus'
        ? { outRange: getBelowMin(value, min) }
        : {};
    return getPartOfThemeProps('ArrowIconContainer', {
      props: { size, hover: stepHover, ...propsConfig },
    });
  };

  getStepArrowIconContainerOrSuffix = arrowContainerChannel => {
    const { showArrow = true, suffix } = this.props;
    if (!showArrow && suffix) {
      return suffix;
    }
    return showArrow && this.getStepArrowIconContainer(arrowContainerChannel);
  };
  getStepArrowIconContainer(arrowContainerChannel): React$Element<any> {
    const { value } = this.state;
    const {
      disabled,
      addIcon,
      subtractIcon,
      getPartOfThemeHocProps,
      createEventChannel,
      max,
      min,
    } = this.props;

    const { theme: IconThemeProps, viewClass: IconViewClass } = getPartOfThemeHocProps(
      'InputArrowIcon'
    );
    const { theme: InputArrowSubtractIcon, viewClass: subIconViewClass } = getPartOfThemeHocProps(
      'InputArrowSubtractIcon'
    );

    const iconTheme = deepMerge({ ...iconDefaultTheme(IconViewClass) }, IconThemeProps);
    const iconSubtractTheme = deepMerge(
      { ...iconDefaultTheme(subIconViewClass) },
      InputArrowSubtractIcon
    );
    const defaultTheme = () => ({
      themeConfig: {
        normal: {
          border: {
            left: {
              style: 'solid',
              width: 1,
              color: get('borderColor'),
            },
          },
        },
      },
    });
    const theThemeProps = deepMerge(defaultTheme(), this.getThemePropsByType('container'));
    const arrowIconPlusButtonThemeProps = this.getThemePropsByType('plus');
    const arrowIconMinusButtonThemeProps = deepMerge(
      this.getThemePropsByType('minus'),
      this.props.getPartOfThemeProps('ArrowDivider')
    );
    const plusChannel = createEventChannel([['hover'], ['focus']]);
    const minusChannel = createEventChannel(['hover'], ['focus']);
    const { size } = this.props;
    return (
      <ArrowIconContainer
        disabled={disabled}
        themeProps={theThemeProps}
        {...arrowContainerChannel.provider}
        lugiaConsumers={plusChannel.consumer}
      >
        <PlusButton
          {...plusChannel.provider}
          disabled={disabled}
          themeProps={arrowIconPlusButtonThemeProps}
          onClick={this.handleClick('plus')}
          {...addMouseEvent(this, {
            enter: this.getButtonMousePos('plus'),
            leave: this.getButtonMousePos('no'),
          })}
        >
          <Icon
            lugiaConsumers={plusChannel.consumer}
            theme={iconTheme}
            viewClass={IconViewClass}
            disabled={disabled}
            propsConfig={{ outRange: getOverMax(value, max), size }}
            iconClass={addIcon || PlusClass}
            singleTheme
          />
        </PlusButton>
        <MinusButton
          {...minusChannel.provider}
          disabled={disabled}
          themeProps={arrowIconMinusButtonThemeProps}
          onClick={this.handleClick('minus')}
          {...addMouseEvent(this, {
            enter: this.getButtonMousePos('minus'),
            leave: this.getButtonMousePos('no'),
          })}
        >
          <Icon
            lugiaConsumers={minusChannel.consumer}
            singleTheme
            theme={iconSubtractTheme}
            viewClass={subIconViewClass}
            disabled={disabled}
            propsConfig={{ outRange: getBelowMin(value, min), size }}
            iconClass={subtractIcon || MinusClass}
          />
        </MinusButton>
      </ArrowIconContainer>
    );
  }
  focusInput() {
    this.inputRef && this.inputRef.current.focus();
  }

  getInputRef = refs => {
    const { ref } = refs;
    this.inputRef = ref;
  };

  render() {
    const { value, stepHover } = this.state;
    const { createEventChannel, getPartOfThemeHocProps, showArrow = true } = this.props;
    const { theme: inputThemeProps, inputViewClass } = getPartOfThemeHocProps('Input');

    const { theme: containerThemeProps, viewClass } = getPartOfThemeHocProps('Container');
    const theInputTheme = {
      [viewClass]: {
        InputSuffix: {
          normal: {
            getCSS() {
              if (!showArrow) {
                return 'opacity: 1;';
              }
              return 'opacity: 0;transition: all 0.3s;padding-right:0;';
            },
          },
          hover: {
            getCSS() {
              return 'opacity: 1;';
            },
          },
        },
        Container: deepMerge(inputThemeProps[inputViewClass], containerThemeProps[viewClass]),
      },
    };

    const arrowContainerChannel = createEventChannel([['hover'], ['focus']]);
    return (
      <Input
        {...this.props}
        _focus={stepHover === 'plus' || stepHover === 'minus'}
        getInputRef={this.getInputRef}
        lugiaConsumers={arrowContainerChannel.consumer}
        theme={theInputTheme}
        viewClass={viewClass}
        value={value}
        suffix={this.getStepArrowIconContainerOrSuffix(arrowContainerChannel)}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onChange={this.handleChange}
        {...addMouseEvent(this)}
        isShowClearButton={false}
      />
    );
  }

  onBlur = (event: UIEvent) => {
    const { onBlur, min, max } = this.props;
    const { value, stepHover } = this.state;
    const finalValue = handleEmpty(value, limit(value, [min, max]));
    if (stepHover !== 'plus' && stepHover !== 'minus') {
      if (this.state.value !== finalValue) {
        this.setValue(finalValue, event);
      }
      this.setState({ _innerFocus: false });
      onBlur && onBlur(event);
    }
  };

  onFocus = (event: UIEvent) => {
    const { onFocus } = this.props;
    this.setState({ _innerFocus: true });
    onFocus && onFocus(event);
  };

  handleClick = (click: ClickType) => (event: Event) => {
    this.focusInput();
    this.calculateValue(click, event);
    const { stepHover, _innerFocus } = this.state;
    if ((stepHover === 'plus' || stepHover === 'minus') && !_innerFocus) {
      this.onFocus();
    }
  };

  handleChange = (event: Object) => {
    const value = event.newValue;
    const { value: sValue } = this.state;
    const handleNumberValue = checkNumber(value + '');
    const theValue = handleFirstPoint(handleNumberValue);
    if (sValue !== handleNumberValue) {
      this.setValue(theValue, event);
    }
  };

  setValue(value: number, event: any): void {
    const oldValue = this.state.value;
    const { disabled, onChange } = this.props;
    const theNewValue = handleEmpty(value, parseFloat(value));
    const theOldValue = handleEmpty(oldValue, parseFloat(oldValue));
    const param = {
      newValue: theNewValue,
      oldValue: theOldValue,
      event,
    };
    if (hasValueProps(this.props) === false) {
      if (disabled) {
        return;
      }
      this.setState({ value }, () => {
        onChange && onChange(param);
      });
    } else {
      onChange && onChange(param);
    }
  }

  calculateValue(click: ClickType, event: Event) {
    const { precision } = this.props;
    let { value } = this.state;
    let { step, min, max } = this.props;
    if (value !== '') {
      value = parseFloat(value);
      step = click === 'plus' ? parseFloat(step) : step * -1;
      const finalValue = accAdd(value, step, precision);
      this.setValue(limit(finalValue, [min, max]), event);
    }
  }
}

const TargetNumberInput = ThemeHoc(KeyBoardEventAdaptor(NumberTextBox), Widget.NumberInput, {
  hover: true,
  focus: true,
  active: true,
});
export default TargetNumberInput;
