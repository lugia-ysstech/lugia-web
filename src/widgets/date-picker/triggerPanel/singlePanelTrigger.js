/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import moment from 'moment';
import Trigger from '../../trigger/index';
import Input from '../../input';
import PageFooter from '../panel/PageFooter';
import { getDerivedForInput } from '../utils/getDerived';
import SwitchPanel from '../switchPanel/SwitchPanel';
import { getValueFromWeekToDate } from '../utils/differUtils';
import { getformatSymbol, getNewProps } from '../utils/utils';
import { formatValueIsValid, modeStyle } from '../utils/booleanUtils';
import { PanelWrap } from '../styled/styled';
import Theme from '../../theme';
import Widget from '../../consts/index';
import SwitchPanelMode from '../mode';
import getThemeProps, { getFacePanelContain, getIconTheme } from '../themeConfig/themeConfig';
import { addMouseEvent } from '@lugia/theme-hoc';
import getDateIcon from '../panel/InputIcon';
type TypeProps = {
  defaultValue?: string,
  value?: string,
  placeholder?: string,
  format?: string,
  disabled?: boolean,
  createPortal?: boolean,
  readOnly?: boolean,
  onChange?: Function,
  onFocus?: Function,
  onBlur?: Function,
  getPartOfThemeProps: Function,
  showTime?: any,
  onOk?: Object,
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
  panelValue: string,
  valueIsValid: boolean,
  normalValue: string,
  placeholder: string,
  isStartOfWeek: boolean,
};
class DateInput extends Component<TypeProps, TypeState> {
  static displayName = 'DateInput';
  normalStyleValueObj: Object;
  trigger: any;
  oldValue: string;
  targetMode: SwitchPanelMode;
  pageFooterChange: SwitchPanelMode;
  isClear: boolean;
  constructor() {
    super();
    this.trigger = React.createRef();
    this.targetMode = new SwitchPanelMode();
    this.pageFooterChange = new SwitchPanelMode();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const {
      value,
      format,
      panelValue,
      normalValue,
      valueIsValid,
      placeholder,
    } = getDerivedForInput(nextProps, preState);
    return {
      value: value && value[0],
      panelValue: panelValue && panelValue[0],
      normalValue: normalValue && normalValue[0],
      format,
      valueIsValid,
      placeholder: placeholder && placeholder[0],
      status: preState ? preState.status : 'showDate',
      isStartOfWeek: preState ? preState.isStartOfWeek : true,
    };
  }
  componentDidMount() {
    const { format } = this.state;
    const value = moment().format(format);
    this.normalStyleValueObj = getformatSymbol(value);
  }
  render() {
    const { disabled, readOnly, getPartOfThemeProps } = this.props;
    const {
      value,
      status,
      format,
      panelValue,
      isScroll,
      valueIsValid,
      placeholder,
      isStartOfWeek,
    } = this.state;
    const hasStateValue = value ? true : false;
    const showTimeBtnIsDisabled = valueIsValid ? true : false;
    const { oldValue } = this;
    const hasOldValue = oldValue ? true : false;
    const newProps = getNewProps(this.props);
    const { mode } = this.props;
    const { isTime } = modeStyle(mode);
    const { themeProps } = getFacePanelContain({ mode, getPartOfThemeProps }, 'FacePanelContain');
    const inputContainProps = getThemeProps({ mode, getPartOfThemeProps }, 'Container');
    const { inputPrefixProps, inputSuffixProps, clearButtonProps } = getIconTheme(this.props);
    const { themeConfig } = inputContainProps;
    const { themeConfig: inputPrefixThemeConfig } = inputPrefixProps;
    const { suffixIcon, prefixIcon } = getDateIcon({
      ...this.props,
      value: this.state.value,
      onClear: this.onClear,
      clearButtonTheme: clearButtonProps,
    });
    return (
      <Theme
        config={{
          [Widget.Input]: {
            Container: {
              ...themeConfig,
            },
            Input: {
              ...themeConfig,
            },
            InputPrefix: {
              ...inputPrefixThemeConfig,
            },
            InputSuffix: {
              ...inputSuffixProps.themeConfig,
            },
          },
        }}
      >
        <Trigger
          themePass
          createPortal={this.props.createPortal}
          popup={
            <React.Fragment>
              <PanelWrap themeProps={themeProps} {...addMouseEvent(this)}>
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
                  valueIsValid={valueIsValid}
                  index={0}
                  hasOldValue={hasOldValue}
                  isStartOfWeek={isStartOfWeek}
                  themeProps={themeProps}
                />

                {isTime ? (
                  ''
                ) : (
                  <PageFooter
                    {...this.props}
                    format={format}
                    onChange={this.onChange}
                    footerChange={this.footerChange}
                    setPopupVisible={this.setPopupVisible}
                    showTimeBtnIsDisabled={showTimeBtnIsDisabled}
                    model={this.pageFooterChange}
                  />
                )}
              </PanelWrap>
            </React.Fragment>
          }
          align="bottomLeft"
          key="trigger"
          ref={this.trigger}
          action={disabled || readOnly || this.isClear ? [] : ['click']}
          hideAction={['click']}
        >
          <Input
            {...prefixIcon}
            {...suffixIcon}
            value={value}
            onChange={this.onChange}
            placeholder={placeholder}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            //onClear={this.onClear}
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
    const { isWeeks, isWeek, isYear, isMonth, isTime } = modeStyle(mode);
    const isValid =
      action === 'click' ? true : formatValueIsValid(normalStyleValueObj, newValue, format);
    const { onChange } = this.props;
    if (isValid) {
      visible = false;
      const { showTime, onOk } = this.props;
      if ((showTime || onOk) && !(isWeek || isYear || isMonth)) {
        visible = true;
      }
      this.setModeState(newValue, format, isWeeks || isWeek);
    }

    onChange && onChange({ event, newValue, oldValue: this.oldValue });
    this.setState({ value: newValue, isValid });
    !isTime && this.setPopupVisible(visible);
  };
  setModeState = (value: string, format: string, isWeeks: boolean) => {
    const newFormat = isWeeks ? 'YYYY-MM-DD' : format;
    const { newVal, isStartOfWeek } = this.getWeekStart(value, format, isWeeks);
    const moments = moment(newVal, newFormat);
    const { years, months } = moments.toObject();
    const modeParams = {
      year: years,
      month: months,
      weeks: moments.weeks(),
      value: newVal,
      isScroll: false,
    };
    this.setState({ isStartOfWeek });
    this.targetMode.onChange(modeParams);
    this.getWeekStart(value, format, isWeeks);
  };
  getWeekStart = (value: string, format: string, isWeeks: boolean) => {
    const newFormat = isWeeks ? 'YYYY-MM-DD' : format;
    let newVal = value;
    let isStartOfWeek = true;
    if (isWeeks) {
      newVal = getValueFromWeekToDate(value, format);
      const year = moment(value).year();
      const years = moment(newVal, newFormat).year();
      if (year > years) {
        isStartOfWeek = false;
        newVal = getValueFromWeekToDate(value, format, 'endOf');
      }
    }
    return { newVal, isStartOfWeek };
  };
  onFocus = () => {
    this.isClear = false;
    const { value, valueIsValid, normalValue, format, status } = this.state;
    this.oldValue = value;
    const { mode } = this.props;
    const { isWeeks, isWeek } = modeStyle(mode);
    this.setState({ value, status: 'showDate' });
    const newValue = valueIsValid ? value : normalValue;
    this.setModeState(newValue, format, isWeeks || isWeek);
    if (status === 'showTime') {
      this.pageFooterChange.onFocus({ status: 'showTime' });
    }
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
  onClear = (event: any) => {
    this.isClear = true;
    const { value } = this.state;
    this.onChange({ newValue: '', oldValue: value, event });
  };
  footerChange = (status: string) => {
    let visible = true;
    let stateData: Object;
    if (status === 'onOk') {
      visible = false;
      const { onOk } = this.props;
      const onOkChange =
        typeof onOk === 'function' ? onOk : onOk && onOk.Function ? onOk.Function : '';
      onOkChange && onOkChange();
      stateData = { status: 'showDate', visible: false };
    }
    if (status !== 'onOk') {
      visible = true;
      const { value, panelValue } = this.state;
      status === 'showTime' && this.targetMode.onChange({ value });
      status === 'showDate' && this.targetMode.onChange({ value: panelValue });
      stateData = { status };
    }
    this.setPopupVisible(visible);
    this.setState(stateData);
  };
  timeChange = (obj: Object) => {
    const { value } = obj;
    this.setState({ value });
  };
  setPopupVisible(...rest: any[]) {
    this.trigger.current && this.trigger.current.setPopupVisible(...rest);
  }
}

export default DateInput;
