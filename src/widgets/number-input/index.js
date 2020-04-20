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
import { units } from '@lugia/css';
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import { deepMerge } from '@lugia/object-utils';
import get from '../css/theme-common-dict';
import ValidateHoc from '../input/validateHoc';
import {
  validateValueDefaultTheme,
  validateBorderDefaultTheme,
  isValidateError,
  validateWidthTheme,
} from '../css/validateHoc';
import type { ValidateStatus, ValidateType } from '../css/validateHoc';

const { px2remcss } = units;

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
    selectNames: [['font'], ['fontSize'], ['color'], ['background'], ['cursor'], ['opacity']],
  },
  active: {
    selectNames: [['font'], ['fontSize'], ['color'], ['background'], ['cursor'], ['opacity']],
  },
  disabled: {
    selectNames: [['font'], ['fontSize'], ['color'], ['background'], ['cursor'], ['opacity']],
    defaultTheme: {
      opacity: 0,
    },
  },
  css: css`
    height: 100%;
    border-left: ${px2remcss(1)} solid ${get('borderColor')};
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
    selectNames: [],
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
    border-top: ${px2remcss(1)} solid ${get('borderColor')};
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
  validateStatus: ValidateStatus,
  validateType: ValidateType,
  help: string,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  createEventChannel: Function,
  addIcon?: string,
  subtractIcon?: string,
  dispatchEvent: Function,
};

function hasValueProps(props: Object) {
  return 'value' in props;
}

function getOverMax(value, max) {
  return Number(value) >= max;
}

function getBelowMin(value, min) {
  return Number(value) <= min;
}

class NumberTextBox extends Component<NumberInputProps, NumberInputState> {
  static defaultProps = {
    disabled: false,
    max: Infinity,
    min: -Infinity,
    viewClass: Widget.NumberInput,
    validateStatus: 'default',
    validateType: 'top',
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
  el: any;
  static displayName = Widget.NumberInput;

  constructor(props: NumberInputProps) {
    super(props);
    this.el = React.createRef();
  }

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

    const iconTheme = deepMerge(
      {
        [IconViewClass]: {
          normal: {
            cursor: 'pointer',
            fontSize: 10,
            getCSS() {
              return ` position: absolute;
                       top: 50%;
                       left: 50%;
                       transform: translate(-50%, -50%);
                       transition: all 0.3s;`;
            },
            getThemeMeta(themeMeta, themeProps) {
              const { propsConfig } = themeProps;
              const { outRange, disabled } = propsConfig;
              const theCursor = outRange || disabled ? 'not-allowed' : 'pointer';
              return {
                cursor: theCursor,
              };
            },
          },
          disabled: {
            cursor: 'not-allowed',
            fontSize: 10,
            opacity: 0,
          },
        },
      },
      IconThemeProps
    );

    const theThemeProps = this.getThemePropsByType('container');
    const arrowIconPlusButtonThemeProps = this.getThemePropsByType('plus');
    const arrowIconMinusButtonThemeProps = this.getThemePropsByType('minus');

    const plusChannel = createEventChannel([['hover'], ['focus']]);
    const minusChannel = createEventChannel(['hover'], ['focus']);

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
            onClick={this.handleClick('plus')}
            theme={iconTheme}
            viewClass={IconViewClass}
            disabled={disabled}
            propsConfig={{ outRange: getOverMax(value, max) }}
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
            onClick={this.handleClick('minus')}
            theme={iconTheme}
            viewClass={IconViewClass}
            disabled={disabled}
            propsConfig={{ outRange: getBelowMin(value, min) }}
            iconClass={subtractIcon || MinusClass}
          />
        </MinusButton>
      </ArrowIconContainer>
    );
  }
  render() {
    const { value } = this.state;
    const {
      createEventChannel,
      getPartOfThemeHocProps,
      getPartOfThemeProps,
      validateStatus,
      validateType,
    } = this.props;
    const { theme: inputThemeProps } = getPartOfThemeHocProps('Input');

    const validateErrorInputThemeProps = getPartOfThemeProps('ValidateErrorText');

    const theValidateThemeProps = isValidateError(validateStatus)
      ? deepMerge(
          validateValueDefaultTheme,
          validateBorderDefaultTheme,
          validateErrorInputThemeProps
        )
      : {};

    const containerThemeProps = getPartOfThemeProps('Container');
    const theValidateWidthThemeProps = validateType ? validateWidthTheme : {};
    const theInputTheme = deepMerge(
      {
        [Widget.Input]: {
          InputSuffix: {
            normal: {
              getCSS() {
                return 'height:100%;opacity: 0;transition: all 0.3s;right:0;';
              },
            },
            hover: {
              getCSS() {
                return 'opacity: 1;';
              },
            },
          },
        },
      },
      inputThemeProps,
      containerThemeProps,
      theValidateWidthThemeProps,
      theValidateThemeProps
    );

    const arrowContainerChannel = createEventChannel([['hover'], ['focus']]);
    return (
      <Input
        lugiaConsumers={arrowContainerChannel.consumer}
        theme={theInputTheme}
        ref={this.el}
        {...this.props}
        value={value}
        suffix={this.getStepArrowIconContainer(arrowContainerChannel)}
        onBlur={this.onBlur}
        onChange={this.handleChange}
        validateType={''}
        {...addMouseEvent(this)}
      />
    );
  }

  onBlur = (event: UIEvent) => {
    const { onBlur, min, max } = this.props;
    const { value } = this.state;
    const finalValue = limit(value, [min, max]);
    this.setValue(finalValue, event);
    onBlur && onBlur(event);
  };
  onFocus = (event: UIEvent) => {
    const { onFocus } = this.props;
    onFocus && onFocus(event);
  };

  handleClick = (click: ClickType) => (event: Event) => {
    this.calculateValue(click, event);
  };

  handleChange = (event: Object) => {
    const value = event.newValue;
    this.setValue(Number(checkNumber(value + '')), event);
  };

  setValue(value: number, event: any): void {
    const oldValue = this.state.value;
    const { disabled, onChange } = this.props;

    const param = { newValue: value, oldValue, event };
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
    value = Number(value);
    step = click === 'plus' ? Number(step) : step * -1;
    const finalValue = accAdd(value, step, precision);
    this.setValue(limit(finalValue, [min, max]), event);
  }
}

const TargetNumberInput = ThemeHoc(
  ValidateHoc(KeyBoardEventAdaptor(NumberTextBox)),
  Widget.NumberInput,
  {
    hover: true,
    focus: true,
    active: true,
  }
);
export default TargetNumberInput;
