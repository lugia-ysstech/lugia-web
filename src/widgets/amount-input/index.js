// @flow
import '../common/shirm';
import React, { Component } from 'react';
import styled from 'styled-components';
import Theme from '../theme';
import BaseInput from '../input/index';
import Widget from '../consts/index';
import type { InputSize } from '../css/input';
import { getMargin } from '../common/ThemeUtils';
import {
  DefaultAmountPrefix,
  getBackground,
  getPlaceholderFontColor,
  getWidth,
} from '../css/input';

import InputTip from '../tooltip';
import { fixControlledValue } from '../utils';
import {
  amountFormatter,
  converAmount,
  convertCurrency,
  getInputSelection,
  getNowPos,
  isAmount,
  moveInputCursorPos,
  parser,
  tipTool,
} from './amountUtils';
import KeyBoardEventAdaptor from '../common/KeyBoardEventAdaptor';
import ThemeProvider from '../theme-provider';
import { px2emcss } from '../css/units';
import { FontSize } from '../css';
import { checkNumber } from '../common/Math';

const em = px2emcss(1.2);

const InputContainer = styled.span`
  ${getBackground};
  ${getMargin};
  ${getWidth};
  position: relative;
  display: inline-block;
`;

const InputPlaceholder = styled.span`
  background: transparent;
  left: ${em(30)};
  color: ${getPlaceholderFontColor};
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  z-index: 2;
  font-size: ${FontSize};
`;
const Title = styled.span`
  font-size: ${FontSize};
`;
Title.displayName = 'toolTip_title';

type AmountInputState = {|
  value: string,
  rmb: boolean,
|};

type AmountInputProps = {|
  size?: InputSize,
  viewClass: string,
  disabled: boolean,
  placeholder?: string,
  getTheme: Function,
  onChange?: ({ newValue: any, oldValue: any, event: Event }) => void,
  onKeyUp?: (event: KeyboardEvent) => void,
  onKeyDown?: (event: KeyboardEvent) => void,
  onKeyPress?: (event: KeyboardEvent) => void,
  onFocus?: (event: UIEvent) => void,
  onBlur?: (event: UIEvent) => void,
  onEnter?: (event: UIEvent) => void,
  defaultValue?: string,
  value?: string,
  amountPrefix: string,
  transform?: boolean,
|};

class AmountTextBox extends Component<AmountInputProps, AmountInputState> {
  static defaultProps = {
    disabled: false,
    viewClass: Widget.AmountInput,
    size: 'default',
    defaultValue: '',
    amountPrefix: DefaultAmountPrefix,
    getTheme: () => {
      return {};
    },
    transform: true,
  };
  el: any;
  static displayName = Widget.AmountInput;
  cursorPos: number;
  preDisplayValue: string;

  constructor(props: AmountInputProps) {
    super(props);
    this.preDisplayValue = '';
    this.cursorPos = 1;
    this.el = React.createRef();
  }

  static getDerivedStateFromProps(nextProps: AmountInputProps, state: AmountInputState) {
    let { value, defaultValue } = nextProps;
    const hasValueInprops = 'value' in nextProps;
    value = fixControlledValue(value);

    function getValue(theValue: string): string {
      const rmb = !isAmount(theValue);
      return (rmb ? converAmount(theValue) : theValue) + '';
    }

    if (!state) {
      const theValue = hasValueInprops ? value : defaultValue ? defaultValue : '';
      const rmb = !isAmount(theValue);

      return {
        value: getValue(theValue),
        rmb,
      };
    }
    if (hasValueInprops) {
      return { value: getValue(value), rmb: !isAmount(value) };
    }
  }

  componentDidUpdate() {
    const inputDom = this.getInputDom();
    const { amountPrefix } = this.props;
    if (this.preDisplayValue !== undefined && isAmount(this.preDisplayValue)) {
      this.preDisplayValue = this.preDisplayValue.startsWith(amountPrefix)
        ? this.preDisplayValue
        : amountPrefix + this.preDisplayValue;
      const cursorPos =
        getNowPos(this.preDisplayValue.substr(1), this.state.value, this.cursorPos - 1) + 1;
      this.cursorPos = cursorPos <= 1 || this.preDisplayValue.length === 2 ? 2 : cursorPos;
      moveInputCursorPos(inputDom, this.cursorPos);
    }
  }

  getInputDom() {
    return this.el.current.getThemeTarget().input;
  }

  handleChange = (event: Object) => {
    this.setValue(
      checkNumber(event.newValue + '').replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'),
      event.event
    );
  };

  setValue(value: string, event: any): void {
    this.updatePos();

    const oldValue = this.state.value;
    const { disabled, onChange } = this.props;
    this.preDisplayValue = isAmount(value) ? event.target.value : value;
    const param = { newValue: Number(value), oldValue: Number(oldValue), event };
    if ('value' in this.props === false) {
      if (disabled) {
        return;
      }
      this.setState({ value }, () => {
        onChange && onChange(param);
      });
    } else {
      onChange && onChange(param);
    }
    if (!value || value.length === 0) {
      this.setState({ rmb: false });
    }
  }

  onFocus = (event: UIEvent) => {
    const { onFocus } = this.props;
    onFocus && onFocus(event);
  };

  updatePos() {
    const newPos = getInputSelection(this.getInputDom()).start;
    this.cursorPos = newPos;
  }

  onBlur = (event: UIEvent) => {
    const { onBlur } = this.props;
    onBlur && onBlur(event);
  };

  onTransform = (e: Object) => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const { value } = this.state;
    if (onChange) {
      const rmb = tipTool(parser(value), convertCurrency);
      onChange({
        event: e,
        newValue: this.state.rmb ? value : rmb,
        oldValue: this.state.rmb ? rmb : value,
      });
    }
    this.setState({ rmb: !this.state.rmb });
  };
  getFocusByPlaceholder = (e: Object) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    setTimeout(() => {
      this.getInputDom().focus();
    }, 0);
  };
  render() {
    const { value } = this.state;
    const opacity = value && value.length ? 1 : 0;
    const view = {
      [Widget.Tooltip]: {
        opacity,
      },
    };
    return (
      <Theme config={view}>
        <InputTip title={this.getTitle()} action={'focus'} theme={opacity}>
          {this.getInputContainer()}
        </InputTip>
      </Theme>
    );
  }

  getInputContainer() {
    const { getTheme } = this.props;
    return (
      <InputContainer theme={getTheme()}>
        {this.generateInput()}
        {this.getPlaceholder()}
      </InputContainer>
    );
  }

  getPlaceholder() {
    const { placeholder } = this.props;
    if (!this.state.value) {
      return (
        <InputPlaceholder onClick={this.getFocusByPlaceholder}>{placeholder} </InputPlaceholder>
      );
    }
    return null;
  }

  getTitle() {
    const { value, rmb } = this.state;
    const { amountPrefix, transform } = this.props;
    const isDefaultAmountPrefix = amountPrefix === DefaultAmountPrefix;
    let titleValue = '';
    if (isDefaultAmountPrefix) {
      titleValue = rmb
        ? amountPrefix + amountFormatter(value)
        : tipTool(parser(value), convertCurrency);
    } else {
      titleValue = amountPrefix + amountFormatter(value);
    }
    if (transform) {
      return <Title onClick={this.onTransform}>{titleValue}</Title>;
    }
    return <Title>{titleValue}</Title>;
  }

  onKeyDown = (event: KeyboardEvent) => {
    const { onKeyDown, onEnter } = this.props;
    onKeyDown && onKeyDown(event);
    const { keyCode } = event;
    onEnter && keyCode === 13 && onEnter(event);
  };

  generateInput(): React$Element<any> {
    const { props } = this;
    const { value, rmb } = this.state;
    const { onKeyUp, onKeyPress, size, disabled, amountPrefix, getTheme } = props;
    const actualValue = rmb
      ? tipTool(parser(value), convertCurrency)
      : amountPrefix + amountFormatter(value);
    const { width, margin } = getTheme();
    const view = {
      [Widget.Input]: {
        width,
        margin,
      },
    };

    return (
      <Theme config={view}>
        <BaseInput
          ref={this.el}
          theme={getTheme()}
          value={actualValue}
          size={size}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          onKeyDown={this.onKeyDown}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.handleChange}
          disabled={disabled}
          formatter={amountFormatter}
          readOnly={rmb}
        />
      </Theme>
    );
  }
}

const TargetAmountTextBox = ThemeProvider(KeyBoardEventAdaptor(AmountTextBox), Widget.AmountInput);
export default TargetAmountTextBox;
