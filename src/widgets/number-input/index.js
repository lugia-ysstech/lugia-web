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
import type { InputValidateType, ValidateStatus } from '../css/input';
import { units } from '@lugia/css';
import { findDOMNode } from 'react-dom';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import { deepMerge } from '@lugia/object-utils';

const { px2remcss } = units;

const ArrowIconContainer = CSSComponent({
  tag: 'div',
  className: 'ArrowIconContainer',
  normal: {
    selectNames: [['width'], ['fontSize'], ['opacity']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig } = themeProps;
      const { width } = themeMeta;
      const { show, disabled } = propsConfig;
      const theOpacity = !disabled && show ? 1 : 0.001;
      const theCursor = !disabled && show ? 'pointer' : 'not-allowed';
      const theWidth = width ? width : 22;
      return {
        opacity: theOpacity,
        cursor: theCursor,
        width: theWidth,
      };
    },
  },
  disabled: {
    selectNames: [['opacity']],
    defaultTheme: {
      opacity: 0,
    },
  },
  css: css`
    border-left: ${px2remcss(1)} solid #d9d9d9;
    position: absolute;
    height: 96%;
    bottom: ${px2remcss(1)};
    right: ${px2remcss(1)};
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
    border-top: ${px2remcss(1)} solid #d9d9d9;
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
const InputContainer = StaticComponent({
  tag: 'div',
  className: 'NumberInputContainer',
  normal: {
    selectNames: [],
  },
  css: css`
    position: relative;
    display: inline-block;
  `,
});
type NumberInputState = {|
  value: string,
  buttonShow: boolean,
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
  help: string,
  placeholder?: string,
  getTheme: Function,
  onChange?: ({ newValue: string | number, oldValue: string | number, event: Event }) => void,
  onKeyUp?: (event: KeyboardEvent) => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  onKeyPress?: (event: KeyboardEvent) => void,
  onFocus?: (event: UIEvent) => void,
  onBlur?: (event: UIEvent) => void,
  onEnter?: (event: UIEvent) => void,
  defaultValue?: string,
  value?: string,
  step: number,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  formatter?: (value: string) => string,
  parser?: (displayValue: string) => string,
  precision: number,
  validateStatus: ValidateStatus,
  validateType: InputValidateType,
  help: string,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  createEventChannel: Function,
};

function hasValueProps(props: Object) {
  return 'value' in props;
}

class NumberTextBox extends Component<NumberInputProps, NumberInputState> {
  static defaultProps = {
    disabled: false,
    max: Infinity,
    min: -Infinity,
    viewClass: Widget.NumberInput,
    validateStatus: 'success',
    validateType: 'default',
    size: 'default',
    precision: 0,
    defaultValue: '10',
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
        ? limit(Number(defaultValue), [min, max])
        : '';
      const theDisabled = hasDisabledInprops ? disabled : false;
      return {
        value: theValue,
        disabled: theDisabled,
        buttonShow: false,
        stepHover: 'no',
      };
    }
    if (hasValueInprops) {
      return { value };
    }
  }

  onMouseLeave = () => {
    this.setState({ buttonShow: false });
  };

  onMouseEnter = () => {
    this.setState({ buttonShow: true });
  };

  getButtonMousePos = (type: ClickType) => () => {
    this.setState({ stepHover: type });
  };

  getStepArrowIconContainer(channel): React$Element<any> {
    const { buttonShow, value, stepHover } = this.state;
    const { max, min, size, disabled } = this.props;
    const overMax = Number(value) >= max;
    const belowMin = Number(value) <= min;

    const { theme: IconThemeProps, viewClass: IconViewClass } = this.props.getPartOfThemeHocProps(
      'ArrowIcon'
    );

    const iconTheme = deepMerge(
      {
        [IconViewClass]: {
          normal: {
            cursor: 'pointer',
            fontSize: 20,
            getCSS() {
              return ` position: absolute;
                       top: 50%;
                       left: 50%;
                       transform: translate(-50%, -50%);
                       transition: all 0.3s;`;
            },
            getThemeMeta(themeMeta, themeProps) {
              const { propsConfig } = themeProps;
              const { outRange } = propsConfig;
              const theCursor = outRange ? 'not-allowed' : 'pointer';
              return {
                cursor: theCursor,
              };
            },
          },
          hover: {
            getThemeMeta(themeMeta, themeProps) {
              const { propsConfig } = themeProps;
              const { outRange } = propsConfig;
              const theCursor = outRange ? 'not-allowed' : 'pointer';
              return {
                cursor: theCursor,
              };
            },
          },
          active: {
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

    const theThemeProps = this.props.getPartOfThemeProps('ArrowIconContainer', {
      props: { show: buttonShow, size, hover: stepHover, disabled },
    });
    const arrowIconPlusButtonThemeProps = this.props.getPartOfThemeProps('ArrowIconContainer', {
      props: { show: buttonShow, size, hover: stepHover, outRange: overMax },
    });
    const arrowIconMinusButtonThemeProps = this.props.getPartOfThemeProps('ArrowIconContainer', {
      props: { show: buttonShow, size, hover: stepHover, outRange: belowMin },
    });
    return (
      <ArrowIconContainer disabled={disabled} {...channel.provider} themeProps={theThemeProps}>
        <PlusButton
          disabled={disabled}
          themeProps={arrowIconPlusButtonThemeProps}
          onClick={this.handleClick('plus')}
          {...addMouseEvent(this, {
            enter: this.getButtonMousePos('plus'),
            leave: this.getButtonMousePos('no'),
          })}
        >
          <Icon
            onClick={this.handleClick('plus')}
            theme={iconTheme}
            viewClass={IconViewClass}
            disabled={disabled}
            propsConfig={{ outRange: overMax }}
            iconClass={PlusClass}
          />
        </PlusButton>
        <MinusButton
          disabled={disabled}
          themeProps={arrowIconMinusButtonThemeProps}
          onClick={this.handleClick('minus')}
          {...addMouseEvent(this, {
            enter: this.getButtonMousePos('minus'),
            leave: this.getButtonMousePos('no'),
          })}
        >
          <Icon
            onClick={this.handleClick('minus')}
            theme={iconTheme}
            viewClass={IconViewClass}
            disabled={disabled}
            propsConfig={{ outRange: belowMin }}
            iconClass={MinusClass}
          />
        </MinusButton>
      </ArrowIconContainer>
    );
  }

  generateInput(channel): React$Element<any> {
    const { value } = this.state;
    return (
      <Input
        lugiaConsumers={channel.consumer}
        innerRef={this.el}
        {...this.props.getPartOfThemeHocProps('Input')}
        {...this.props}
        value={value}
        suffix={<div />}
        onBlur={this.onBlur}
        onChange={this.handleChange}
      />
    );
  }

  render() {
    const channel = this.props.createEventChannel(['active', 'hover']);
    return (
      <InputContainer onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {this.generateInput(channel)}
        {this.getStepArrowIconContainer(channel)}
      </InputContainer>
    );
  }

  onBlur = (event: UIEvent) => {
    const { onBlur, min, max } = this.props;
    const { value } = this.state;
    const finalValue = limit(Number(value), [min, max]);
    this.setValue(finalValue + '', event);
    onBlur && onBlur(event);
  };

  getInputDom() {
    return findDOMNode(this.el.current.getThemeTarget()).querySelector('input');
  }

  handleClick = (click: ClickType) => (event: Event) => {
    setTimeout(() => {
      this.getInputDom().focus();
    }, 0);
    this.calculateValue(click, event);
  };

  handleChange = (event: Object) => {
    const value = event.newValue === '' ? '' : event.newValue;
    this.setValue(checkNumber(value), event);
  };

  setValue(value: string, event: any): void {
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
    this.setValue(limit(finalValue, [min, max]) + '', event);
  }
}

const TargetNumberInput = ThemeHoc(KeyBoardEventAdaptor(NumberTextBox), Widget.NumberInput, {
  hover: true,
  active: true,
});
export default TargetNumberInput;
