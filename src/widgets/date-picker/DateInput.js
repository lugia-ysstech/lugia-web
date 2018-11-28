/*
* by wangcuixia
* @flow
* */
import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import moment from 'moment';
import Icon from '../icon/index';
import Trigger from '../trigger/index';
import Input from '../input';
import PageFooter from './PageFooter';
import { getDerivedForInput } from './getDerived';
import SwitchPanel from './SwitchPanel';
import { getValueIndex, getValueIsValid } from './utils';
import { getTheme } from './utils';
import Theme from '../theme';
import Widget from '../consts/index';
type TypeProps = {
  disabled?: boolean,
  readOnly?: boolean,
  theme?: Object,
};
type TypeState = {
  value: string,
  format: string,
  isValid: boolean,
};
class DateInput extends Component<TypeProps, TypeState> {
  normalStyleValueObj: Object;
  trigger: any;
  picker: any;
  constructor(props) {
    super(props);
    this.trigger = React.createRef();
    this.picker = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value, format, hasValueProps } = getDerivedForInput(nextProps, preState);
    if (!preState) {
      return {
        value,
        format,
      };
    }
    if (hasValueProps) {
      return {
        value,
      };
    }
  }
  componentDidMount() {
    const { format } = this.state;
    const value = moment().format(format);
    this.normalStyleValueObj = getValueIndex(value);
  }
  render() {
    const { disabled, readOnly, theme } = this.props;
    const { value } = this.state;
    const hasStateValue = value ? true : false;
    return (
      <Theme config={{ [Widget.Input]: { ...theme } }}>
        <Trigger
          popup={
            <div>
              <SwitchPanel
                {...this.props}
                hasStateValue={hasStateValue}
                ref={this.picker}
                onChange={this.onChange}
              />
              <PageFooter />
            </div>
          }
          align="bottomLeft"
          key="trigger"
          ref={this.trigger}
          action={disabled || readOnly ? [] : ['click']}
          hideAction={['click']}
        >
          <Input
            prefix={<Icon className="lugia-icon-financial_date" />}
            value={value}
            onChange={this.onChange}
            placeholder={'请选择日期'}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            disabled={disabled}
            readOnly={readOnly}
          />
        </Trigger>
      </Theme>
    );
  }

  onChange = (param: ChangeEventParam) => {
    const { newValue, action } = param;
    const { normalStyleValueObj } = this;
    const isValid = action === 'click' ? true : getValueIsValid(normalStyleValueObj, newValue);
    this.setState({ value: newValue, isValid });
    if (isValid) {
      const { onChange } = this.props;
      onChange && onChange({ newValue, oldValue: this.oldValue });
      this.picker.current.getChangeValue(newValue);
      this.picker.current.getFreshPicker({ moments: moment(newValue) });
      this.setTreePopupVisible(false);
      this.oldValue = newValue;
    }
  };
  onFocus = () => {
    const { value } = this.state;
    this.oldValue = value;
    this.picker.current.onFocus();
  };
  onBlur = () => {
    const { isValid } = this.state;
    if (!isValid) {
      this.setState({ value: this.oldValue });
    }
  };

  setTreePopupVisible(visible: boolean) {
    if (this.trigger.current && this.trigger.current.getThemeTarget()) {
      this.trigger.current.getThemeTarget().setPopupVisible(visible);
    }
  }
}

export default DateInput;
