/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import moment from 'moment';
import Input from '../../input';
import Trigger from '../../trigger/OpenTrigger';
import PageFooter from '../panel/PageFooter';
import { getDerivedForInput } from '../utils/getDerived';
import SwitchPanel from '../switchPanel/SwitchPanel';
import { getValueFromWeekToDate } from '../utils/differUtils';
import { getformatSymbol, getNewProps, getNewStepProps } from '../utils/utils';
import { formatValueIsValid, modeStyle, getOpenProps } from '../utils/booleanUtils';
import { PanelWrap, Box } from '../styled/styled';
import Theme from '../../theme';
import Widget from '../../consts/index';
import SwitchPanelMode from '../mode';
import getThemeProps, {
  getFacePanelContain,
  getIconTheme,
  getRangeInputPlaceholderTheme,
} from '../themeConfig/themeConfig';
import { addMouseEvent } from '@lugia/theme-hoc';
import getDateIcon from '../panel/InputIcon';

type TypeProps = {
  getPartOfThemeProps: Function,
  theme: Object,
  mode: string,
  validateType?: string,
  validateStatus?: string,
  help?: string,
  disabled?: boolean,
  readOnly?: boolean,
  createPortal?: boolean,
  open?: boolean,
  onChange?: Function,
  showTime?: Function,
  onOk?: Function,
  onFocus?: Function,
  onBlur?: Function,
  onDocumentClick?: Function,
  size?: string,
  liquidLayout?: boolean,
  alwaysOpen?: boolean,
};
type TypeState = {
  value: string,
  format: string,
  isValid: boolean,
  visible: boolean,
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
    const { hasOpenInProps, alwaysOpen } = getOpenProps(this.props);
    if (hasOpenInProps) {
      this.setState({ visible: alwaysOpen });
    }
  }

  render() {
    const {
      disabled,
      readOnly,
      getPartOfThemeProps,
      validateType,
      validateStatus,
      help,
      createPortal = true,
      size,
      liquidLayout,
      alwaysOpen,
      open,
    } = this.props;
    const {
      value,
      status,
      format,
      panelValue,
      isScroll,
      valueIsValid,
      placeholder,
      isStartOfWeek,
      visible,
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
    const { themeConfig: validateErrorText } = getThemeProps(
      { mode, getPartOfThemeProps },
      'ValidateErrorText'
    );
    const { themeConfig: validateErrorInput } = getThemeProps(
      { mode, getPartOfThemeProps },
      'ValidateErrorInput'
    );
    const { inputPrefixProps, inputSuffixProps, clearButtonProps } = getIconTheme(this.props);
    const { themeConfig } = inputContainProps;
    const { themeConfig: inputPrefixThemeConfig } = inputPrefixProps;
    const { suffixIcon, prefixIcon } = getDateIcon({
      ...this.props,
      value: this.state.value,
      onClear: this.onClear,
      clearButtonTheme: clearButtonProps,
    });
    const { themeConfig: placeholderTheme } = getRangeInputPlaceholderTheme({
      size,
      getPartOfThemeProps,
    });
    const { normal = {} } = themeConfig;
    return (
      <Theme
        config={{
          [Widget.Input]: {
            Container: {
              ...themeConfig,
              normal: {
                ...normal,
                width: '100%',
              },
            },
            InputPrefix: {
              ...inputPrefixThemeConfig,
            },
            InputSuffix: {
              ...inputSuffixProps.themeConfig,
            },
            ValidateErrorText: validateErrorText,
            ValidateErrorInput: validateErrorInput,
            Placeholder: { ...placeholderTheme },
          },
        }}
      >
        <Box themeProps={inputContainProps}>
          <Trigger
            themePass
            createPortal={createPortal}
            onDocumentClick={this.onDocumentClick}
            popupVisible={visible}
            alwaysOpen={alwaysOpen || open}
            liquidLayout={liquidLayout}
            popup={
              <React.Fragment>
                <PanelWrap
                  themeProps={themeProps}
                  {...addMouseEvent(this)}
                  disabled={disabled || readOnly}
                >
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
                    step={getNewStepProps(newProps)}
                    noBorder
                  />

                  {isTime ? (
                    ''
                  ) : (
                    <PageFooter
                      {...this.props}
                      format={format}
                      onChange={this.onChange}
                      footerChange={this.footerChange}
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
              focus={visible}
              disabled={disabled}
              readOnly={readOnly}
              validateType={validateType}
              validateStatus={validateStatus}
              help={help}
              size={size}
            />
          </Trigger>
        </Box>
      </Theme>
    );
  }

  onDocumentClick = () => {
    const { hasOpenInProps, alwaysOpen } = getOpenProps(this.props);
    let visible = false;
    if (hasOpenInProps) {
      visible = alwaysOpen;
    }
    this.setState({ visible });
    const { onDocumentClick } = this.props;
    if (onDocumentClick) {
      onDocumentClick();
    }
    this.onBlur();
  };

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
    const visibleState = isTime ? {} : { visible };
    this.setState({ value: newValue, isValid, ...visibleState });
    if (!visible) {
      this.onBlur();
    }
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
    this.setState({ value, status: 'showDate', visible: true });
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
    this.setState({ ...stateData, visible });
  };
  timeChange = (obj: Object) => {
    const { value } = obj;
    this.setState({ value });
  };
}

export default DateInput;
