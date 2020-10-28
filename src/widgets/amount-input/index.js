// @flow
import '../common/shirm';
import React, { Component } from 'react';
import Input from '../input/index';
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
import CSSComponent from '@lugia/theme-css-hoc';
import ThemeHoc from '@lugia/theme-hoc';
import { deepMerge } from '@lugia/object-utils';
import type { ValidateStatus, ValidateType } from '../css/validateHoc';
import get from '../css/theme-common-dict';
import { getBorderRadius } from '@lugia/theme-utils';

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
    selectNames: [['fontSize'], ['font'], ['color'], ['padding']],
  },
});
Title.displayName = 'toolTip_title';

type AmountInputState = {
  value: string,
  rmb: boolean,
};

type AmountInputProps = {
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
  validateStatus: ValidateStatus,
  validateType: ValidateType,
  help: string,
};

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
    return findDOMNode(this.el.current.getThemeTarget()).querySelector('input');
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
    const { theme: toolTipThemeProps, viewClass } = this.props.getPartOfThemeHocProps('AmountTip');
    const newTheme = deepMerge(
      {
        [viewClass]: {
          Container: {
            normal: {
              borderRadius: getBorderRadius(2),
              background: {
                color: get('blackColor'),
              },
              boxShadow: get('normalShadow'),
              getThemeMeta(themeMeta: Object, themeProps: Object) {
                const { propsConfig } = themeProps;
                const { value } = propsConfig;
                const opacity = value && value.length ? 1 : 0;
                return {
                  opacity,
                };
              },
            },
            hover: {
              background: {
                color: get('darkGreyColor'),
              },
              boxShadow: get('hoverShadow'),
            },
          },
          TooltipTitle: deepMerge(
            { normal: { color: get('defaultColor') } },
            toolTipThemeProps[viewClass]
          ),
          ChildrenContainer: {
            normal: {
              getCSS(themeMeta, themeProps) {
                return 'display: block;';
              },
            },
          },
        },
      },
      toolTipThemeProps
    );
    const { createPortal = false, popupContainerId } = this.props;
    return (
      <ToolTip
        createPortal={createPortal}
        popupContainerId={popupContainerId}
        propsConfig={{ value }}
        title={this.getTitle()}
        action={'focus'}
        placement={'topLeft'}
        theme={newTheme}
        viewClass={viewClass}
      >
        {this.generateInput()}
      </ToolTip>
    );
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
    const theThemeProps = this.props.getPartOfThemeProps('TooltipTitle');

    if (transform) {
      return (
        <Title onClick={this.onTransform} themeProps={theThemeProps}>
          {titleValue}
        </Title>
      );
    }
    return <Title themeProps={themeProps}>{titleValue}</Title>;
  }

  generateInput(): React$Element<any> {
    const { value, rmb } = this.state;
    const { size, disabled, placeholder, getPartOfThemeProps, getPartOfThemeHocProps } = this.props;
    const prefix = this.getPrefix();
    const thePlaceholder = disabled ? '' : placeholder;
    const actualValue = rmb ? tipTool(parser(value), convertCurrency) : amountFormatter(value);

    const { theme: inputTheme } = getPartOfThemeHocProps('InnerInput');

    const containerThemeProps = getPartOfThemeProps('Container');
    const theInputTheme = deepMerge(inputTheme, containerThemeProps);
    return (
      <Input
        _maxLength="16"
        theme={theInputTheme}
        {...this.props}
        ref={this.el}
        value={actualValue}
        size={size}
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
    const { amountPrefix, size } = this.props;
    const theThemeProps = this.props.getPartOfThemeProps('AmountInputPrefix', { props: { size } });
    return <AmountInputPrefix themeProps={theThemeProps}>{amountPrefix}</AmountInputPrefix>;
  }
}

const TargetAmountTextBox = ThemeHoc(KeyBoardEventAdaptor(AmountTextBox), Widget.AmountInput, {
  hover: true,
  active: true,
});
export default TargetAmountTextBox;
