/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import moment from 'moment';
import Icon from '../../icon/index';
import Trigger from '../../trigger/index';
import Input from '../../input';
import PageFooter from '../panel/PageFooter';
import { getDerivedForInput } from '../utils/getDerived';
import SwitchPanel from '../switchPanel/SwitchPanel';
import { getValueFromWeekToDate } from '../utils/differUtils';
import { getformatSymbol } from '../utils/utils';
import { formatValueIsValid, modeStyle } from '../utils/booleanUtils';

import Theme from '../../theme';
import Widget from '../../consts/index';
import SwitchPanelMode from '../mode';
//import type { DateInputProps } from '../typeFlow/typeFlow';
type TypeProps = {
  defaultValue?: Array<string> | string,
  value?: Array<string> | string,
  format?: string,
  disabled?: boolean,
  readOnly?: boolean,
  onChange?: Function,
  onFocus?: Function,
  onBlur?: Function,
  showTime?: any,
  onOk?: any,
  firstWeekDay?: number,
  theme: Object,
  mode: string,
};
type TypeState = {
  value: string,
  format: string,
  isValid: boolean,
  timeValue: string,
  status: string,
  isScroll: boolean,
  firstWeekDay: number,
  panelValue: string,
  valueIsValid: boolean,
  normalValue: string,
};
class DateInput extends Component<TypeProps, TypeState> {
  static displayName = 'DateInput';
  normalStyleValueObj: Object;
  trigger: any;
  oldValue: string;
  targetMode: SwitchPanelMode;
  isClear: boolean;
  constructor() {
    super();
    this.trigger = React.createRef();
    this.targetMode = new SwitchPanelMode();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const {
      value,
      format,
      panelValue,
      normalValue,
      firstWeekDay,
      valueIsValid,
    } = getDerivedForInput(nextProps, { value: [preState && preState.value] });

    return {
      value: value && value[0],
      panelValue: panelValue && panelValue[0],
      normalValue: normalValue && normalValue[0],
      format,
      firstWeekDay,
      valueIsValid,
    };
  }
  componentDidMount() {
    const { format } = this.state;
    const value = moment().format(format);
    this.normalStyleValueObj = getformatSymbol(value);
  }
  render() {
    const { disabled, readOnly, theme } = this.props;
    const { value, status, format, panelValue, isScroll, firstWeekDay, valueIsValid } = this.state;
    const hasStateValue = value ? true : false;
    const showTimeBtnIsDisabled = valueIsValid ? true : false;
    const { oldValue } = this;
    const hasOldValue = oldValue ? true : false;
    const newProps = { ...this.props };
    delete newProps.defaultValue;
    delete newProps.value;

    return (
      <Theme config={{ [Widget.Input]: { ...theme } }}>
        <Trigger
          popup={
            <div>
              <SwitchPanel
                {...newProps}
                hasStateValue={hasStateValue}
                onChange={this.onChange}
                status={status}
                value={panelValue}
                timeValue={value}
                format={format}
                timeChange={this.timeChange}
                model={this.targetMode}
                isScroll={isScroll}
                firstWeekDay={firstWeekDay}
                valueIsValid={valueIsValid}
                index={0}
                hasOldValue={hasOldValue}
              />
              <PageFooter
                {...this.props}
                format={format}
                onChange={this.onChange}
                footerChange={this.footerChange}
                setTreePopupVisible={this.setTreePopupVisible}
                showTimeBtnIsDisabled={showTimeBtnIsDisabled}
              />
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
            onClear={this.onClear}
            disabled={disabled}
            readOnly={readOnly}
          />
        </Trigger>
      </Theme>
    );
  }
  onChange = (param: Object) => {
    let visible = true;
    const { isClear } = this;
    if (isClear) {
      visible = false;
    }
    const { newValue, action, event } = param;
    const { normalStyleValueObj } = this;
    const { format } = this.state;
    const { mode } = this.props;
    const { isWeeks, isWeek } = modeStyle(mode);
    const isValid =
      action === 'click' ? true : formatValueIsValid(normalStyleValueObj, newValue, format);

    if (isValid) {
      this.oldValue = newValue;
      visible = false;
      const { onChange, showTime, onOk } = this.props;
      if (showTime || onOk) {
        visible = true;
      }
      onChange && onChange({ event, newValue, oldValue: this.oldValue });
      this.setModeState(newValue, format, isWeeks || isWeek);
    }
    this.setState({ value: newValue, isValid });
    this.setTreePopupVisible(visible);
  };
  setModeState = (value: string, format: string, isWeeks: boolean) => {
    const newFormat = isWeeks ? 'YYYY-MM-DD' : format;
    let newVal = value;
    if (isWeeks) {
      newVal = getValueFromWeekToDate(value, format);
    }
    const moments = moment(newVal, newFormat);
    const { years, months } = moments.toObject();
    const modeParams = {
      year: years,
      month: months,
      weeks: moments.weeks(),
      value: newVal,
    };
    this.targetMode.onChange(modeParams);
  };
  onFocus = () => {
    this.isClear = false;
    const { value, valueIsValid, normalValue, format } = this.state;
    if (valueIsValid) {
      this.oldValue = value;
    }
    const { mode } = this.props;
    const { isTime, isTimes, isWeeks, isWeek } = modeStyle(mode);
    // let isScroll;
    // if (isTime || isTimes) {
    //   isScroll = false;
    //   //this.targetMode.onFocus(isScroll);
    // }

    this.setState({ value });
    const newValue = valueIsValid ? value : normalValue;
    this.setModeState(newValue, format, isWeeks || isWeek);

    const { onFocus } = this.props;
    onFocus && onFocus();
  };
  onBlur = () => {
    const { isValid, value } = this.state;
    if (value && !isValid) {
      this.setState({ value: this.oldValue });
    }
    if (!value) {
      this.oldValue = '';
    }
    const { onBlur } = this.props;
    onBlur && onBlur();
  };
  onClear = () => {
    this.isClear = true;
  };
  footerChange = (status: string) => {
    let visible = true;
    let stateData: Object;
    if (status === 'onOk') {
      visible = false;
      stateData = { status: 'showDate', visible: false };
    }
    if (status !== 'onOk') {
      visible = true;
      const { value, panelValue } = this.state;
      status === 'showTime' && this.targetMode.onChange({ value });
      status === 'showDate' && this.targetMode.onChange({ value: panelValue });
      stateData = { status };
    }
    this.setTreePopupVisible(visible);
    this.setState(stateData);
  };
  timeChange = (obj: Object) => {
    const { value } = obj;
    this.setState({ value });
  };
  setTreePopupVisible(visible: boolean) {
    if (this.trigger.current && this.trigger.current.getThemeTarget()) {
      this.trigger.current.getThemeTarget().setPopupVisible(visible);
    }
  }
}

export default DateInput;
