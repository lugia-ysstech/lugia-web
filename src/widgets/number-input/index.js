/**
 *
 * create by liangguodong on 2018/8/14
 *
 * @flow
 */
import '../common/shirm';
import React, { Component } from 'react';
import styled from 'styled-components';
import Theme from '../theme';
import type { ClickType, InputSize } from '../css/number-input';
import {
  getBackground,
  getBorderHoverColor,
  getButtonSize,
  getCursor,
  getFocusBorderColor,
  getFocusShadow,
  getIconHoverColor,
  getMinusHoverHeight,
  getPlusHoverHeight,
  getShow,
  getWidth,
} from '../css/number-input';
import BaseInput from '../input/index';
import Widget from '../consts';
import ThemeProvider from '../theme-provider';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import Icon from '../icon';
import { px2emcss } from '../css/units';
import { accAdd, checkNumber, limit } from '../common/Math';
import type { InputValidateType, ValidateStatus } from '../css/input';

const em = px2emcss(1.2);
const ArrowIcon: Object = styled(Icon)`
  ${getCursor};
  z-index: 3;
  font-size: ${em(8)};
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const ButtonContainer = styled.div`
  ${getShow};
  ${getButtonSize};
  border-left: ${em(1)} solid #d9d9d9;
  width: ${em(22)};
  position: absolute;
  bottom: ${em(1)};
  right: ${em(1)};
  -webkit-transition: all 0.3s linear 0.1s;
  transition: all 0.3s linear 0.1s;
  z-index: 2;
`;

const PlusClass = 'lugia-icon-direction_up';
const MinusClass = 'lugia-icon-direction_down';
const StepButton = styled.span`
  ${getCursor};
  &:hover {
    color: ${getIconHoverColor};
  }

  text-align: center;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.45);
  position: relative;
  -webkit-transition: all 0.1s linear;
  transition: all 0.1s linear;
  display: block;
  width: 100%;
  font-weight: bold;
`;
const MinusButton = StepButton.extend`
  border-top: ${em(1)} solid #d9d9d9;
  ${getMinusHoverHeight};
`;
const PlusButton = StepButton.extend`
  ${getPlusHoverHeight};
`;

PlusButton.displayName = 'Plus';
MinusButton.displayName = 'Minus';
const InputContainer = styled.span`
  ${getBackground};
  ${getWidth};
  &:focus {
    ${getFocusBorderColor};
    ${getFocusShadow};
  }

  border-radius: ${em(2)};
  &:hover {
    & > span > span > input {
      ${getBorderHoverColor};
    }
  }

  position: relative;
  display: inline-block;
  z-index: 1;
`;
type NumberInputState = {|
  value: string,
  buttonShow: boolean,
  disabled: boolean,
  stepHover: ClickType,
|};

export type NumberInputProps = {|
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
|};

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
    getTheme: () => {
      return {};
    },
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

  getStepButtonContainer(): React$Element<any> {
    const { buttonShow, value, stepHover } = this.state;
    const { max, min, size, disabled } = this.props;
    const maxDisabled = Number(value) >= max;
    const minDisabled = Number(value) <= min;
    return (
      <ButtonContainer size={size} disabled={disabled} show={buttonShow}>
        <PlusButton
          hover={stepHover}
          onClick={this.handleClick('plus')}
          onMouseEnter={this.getButtonMousePos('plus')}
          onMouseLeave={this.getButtonMousePos('no')}
        >
          <ArrowIcon disabled={maxDisabled} iconClass={PlusClass} />
        </PlusButton>
        <MinusButton
          hover={stepHover}
          onClick={this.handleClick('minus')}
          onMouseEnter={this.getButtonMousePos('minus')}
          onMouseLeave={this.getButtonMousePos('no')}
        >
          <ArrowIcon disabled={minDisabled} iconClass={MinusClass} />
        </MinusButton>
      </ButtonContainer>
    );
  }

  generateInput(): React$Element<any> {
    const { value } = this.state;
    const { getTheme } = this.props;
    const { width } = getTheme();
    const view = {
      [Widget.Input]: {
        width,
      },
    };

    return (
      <Theme config={view}>
        <BaseInput
          ref={this.el}
          {...this.props}
          value={value}
          suffix={<div />}
          onBlur={this.onBlur}
          onChange={this.handleChange}
        />
      </Theme>
    );
  }

  render() {
    const { getTheme, disabled } = this.props;
    return (
      <InputContainer
        disabled={disabled}
        theme={getTheme()}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.generateInput()}
        {this.getStepButtonContainer()}
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
    return this.el.current.getThemeTarget().input;
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

const TargetNumberInput = ThemeProvider(KeyBoardEventAdaptor(NumberTextBox), Widget.NumberInput);
export default TargetNumberInput;
