/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import moment from 'moment';
import Theme from '../theme';
import Widget from '../consts/index';
import Trigger from '../trigger/index';
import Input from '../input';
import Icon from '../icon/index';
import Time from './Time';
import { getDerivedForInput } from './getDerived';
import { getTheme, getValueIndex, getValueIsValid } from './utils';

type TypeProps = {
  disabled?: boolean,
  readOnly?: boolean,
  onFocus?: Function,
};
type TypeState = {
  value: string,
  format: string,
  panelValue: string,
  isValid: boolean,
  isFocus: boolean,
};
class TimeInput extends Component<TypeProps, TypeState> {
  normalStyleValueObj: Object;
  constructor() {
    super();
    this.normalStyleValueObj = {};
    this.trigger = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value, format } = getDerivedForInput(nextProps, preState);
    return {
      value,
      format,
      panelValue: preState ? preState.panelValue : value,
    };
  }
  onPanelChange = (param: Object) => {
    const { value } = param;
    const { normalStyleValueObj } = this;
    const isValid = getValueIsValid(normalStyleValueObj, value);
    const { onChange } = this.props;
    isValid && onChange && onChange({ newValue: value, oldValue: this.oldValue });
    this.setState({ value, panelValue: value });
  };
  onChange = (param: Object) => {
    const { newValue } = param;
    const { normalStyleValueObj } = this;
    const isValid = getValueIsValid(normalStyleValueObj, newValue);
    let { panelValue } = this.state;
    if (isValid) {
      panelValue = newValue;
      this.setTreePopupVisible(false);
      const { onChange } = this.props;
      onChange && onChange({ newValue, oldValue: this.oldValue });
    }
    this.setState({ value: newValue, isValid, panelValue });
  };
  onFocus = () => {
    const { value } = this.state;
    this.oldValue = value;
    this.setState({ value, panelValue: value, isFocus: true });
    const { onFocus } = this.props;
    onFocus && onFocus();
  };
  onBlur = () => {
    const { value, isValid, panelValue } = this.state;
    let newValue = value;
    if (!isValid) {
      newValue = panelValue;
    }
    this.setState({ value: newValue, panelValue });
  };
  onScroller = () => {
    this.setState({ isFocus: false });
  };
  componentDidMount() {
    const { format } = this.state;
    const value = moment().format(format);
    this.normalStyleValueObj = getValueIndex(value);
  }

  render() {
    const { value, panelValue, isFocus } = this.state;
    const { disabled, readOnly, theme } = this.props;
    return (
      <Theme config={{ [Widget.Input]: { ...theme } }}>
        <Trigger
          popup={
            <Time
              {...this.props}
              value={panelValue}
              isFocus={isFocus}
              onScroller={this.onScroller}
              onChange={this.onPanelChange}
            />
          }
          align="bottomLeft"
          key="trigger"
          ref={this.trigger}
          action={disabled || readOnly ? [] : ['click']}
          hideAction={['click']}
        >
          <Input
            prefix={<Icon className="lugia-icon-reminder_clock_circle_o" />}
            value={value}
            onChange={this.onChange}
            placeholder={'请选择时间'}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            disabled={disabled}
            readOnly={readOnly}
          />
        </Trigger>
      </Theme>
    );
  }
  setTreePopupVisible(visible: boolean) {
    if (this.trigger.current && this.trigger.current.getThemeTarget()) {
      this.trigger.current.getThemeTarget().setPopupVisible(visible);
    }
  }
}
export default TimeInput;
