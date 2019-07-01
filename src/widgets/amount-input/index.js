// @flow
import '../common/shirm';
import React, { Component } from 'react';
import InnerInput from '../input/index';
import Widget from '../consts/index';
import type { InputSize } from '../css/input';
import { DefaultAmountPrefix } from '../css/input';
import { findDOMNode } from 'react-dom';

import ToolTip from '../tooltip';
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
import { checkNumber } from '../common/Math';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import { addPropsConfig } from '../avatar';

const InputContainer = StaticComponent({
  tag: 'span',
  className: 'AmountInputContainer',
  normal: {
    selectNames: [],
  },
  css: css`
    position: relative;
    display: inline-block;
  `,
});

const Title = CSSComponent({
  tag: 'span',
  className: 'AmountInputTitle',
  normal: {
    selectNames: [['fontSize'], ['font'], ['color']],
  },
});
const AmountInputPrefix = CSSComponent({
  tag: 'span',
  className: 'AmountInputPrefix',
  normal: {
    selectNames: [['fontSize'], ['color']],
  },
});
Title.displayName = 'toolTip_title';
const InputTip = CSSComponent({
  extend: ToolTip,
  className: 'AmountInputTip',
  normal: {
    selectNames: [['opacity'], ['background'], ['width'], ['height']],
    getThemeMeta(ThemeMeta: Object, ThemeProps: Object) {
      const { propsConfig } = ThemeProps;
      const { value } = propsConfig;
      const opacity = value && value.length ? 1 : 0;
      return {
        opacity,
      };
    },
  },
});

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
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
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
    return findDOMNode(this.el.current).querySelector('input');
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
    this.cursorPos = getInputSelection(this.getInputDom()).start;
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
  render() {
    const { value } = this.state;
    const theThemeProps = addPropsConfig(this.props.getPartOfThemeProps('TooltipContainer'), {
      value,
    });
    return (
      <InputTip
        title={this.getTitle()}
        action={'focus'}
        placement={'topLeft'}
        themeProps={theThemeProps}
      >
        {this.getInputContainer()}
      </InputTip>
    );
  }

  getInputContainer() {
    const theThemeProps = this.props.getPartOfThemeProps(Widget.Input);
    return <InputContainer themeProps={theThemeProps}>{this.generateInput()}</InputContainer>;
  }

  getTitle() {
    const { value, rmb } = this.state;
    const { amountPrefix, transform, themeProps } = this.props;
    const isDefaultAmountPrefix = amountPrefix === DefaultAmountPrefix;
    let titleValue = '';
    if (isDefaultAmountPrefix) {
      titleValue = rmb
        ? amountPrefix + amountFormatter(value)
        : tipTool(parser(value), convertCurrency);
    } else {
      titleValue = amountPrefix + amountFormatter(value);
    }
    const theThemeProps = this.props.getPartOfThemeProps('TooltipMessage');

    if (transform) {
      return (
        <Title onClick={this.onTransform} themeProps={theThemeProps}>
          {titleValue}
        </Title>
      );
    }
    return <Title themeProps={themeProps}>{titleValue}</Title>;
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
    const { onKeyUp, onKeyPress, size, disabled, placeholder } = props;
    const prefix = this.getPrefix();
    const thePlaceholder = disabled ? '' : placeholder;
    const actualValue = rmb ? tipTool(parser(value), convertCurrency) : amountFormatter(value);
    const { theme: inputTheme, viewClass: inputViewClass } = this.props.getPartOfThemeHocProps(
      Widget.Input
    );
    return (
      <InnerInput
        theme={inputTheme}
        viewClass={inputViewClass}
        ref={this.el}
        value={actualValue}
        size={size}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        placeholder={thePlaceholder}
        onChange={this.handleChange}
        disabled={disabled}
        prefix={prefix}
        formatter={amountFormatter}
        readOnly={rmb}
      />
    );
  }

  getPrefix() {
    const { amountPrefix } = this.props;
    const theThemeProps = this.props.getPartOfThemeProps('AmountInputPrefix');
    return <AmountInputPrefix themeProps={theThemeProps}>{amountPrefix}</AmountInputPrefix>;
  }
}

const TargetAmountTextBox = ThemeHoc(KeyBoardEventAdaptor(AmountTextBox), Widget.AmountInput, {
  hover: true,
  active: true,
});
export default TargetAmountTextBox;
