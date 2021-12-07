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
import { getNewStepProps } from '../utils/utils';
import {
  formatValueIsValid,
  modeStyle,
  getOpenProps,
  getValueIsInLimit,
} from '../utils/booleanUtils';
import { PanelWrap, Box } from '../styled/styled';
import Theme from '../../theme';
import Widget from '../../consts/index';
import SwitchPanelMode from '../mode';
import getThemeProps, {
  getFacePanelContain,
  getIconTheme,
  getRangeInputPlaceholderTheme,
  getWrapThemeProps,
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
  popupContainerId?: string,
  limitMinValue?: string,
  limitMaxValue?: string,
  canClear?: boolean,
  type?: string,
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
  hiddenHelp?: boolean,
};
class DateInput extends Component<TypeProps, TypeState> {
  static displayName = 'DateInput';
  trigger: any;
  oldValue: string;
  targetMode: SwitchPanelMode;
  pageFooterChange: SwitchPanelMode;
  isClear: boolean;
  inputRef: HTMLElement;

  constructor() {
    super();
    this.trigger = React.createRef();
    this.targetMode = new SwitchPanelMode();
    this.pageFooterChange = new SwitchPanelMode();
    this.oldValue = '';
    this.inputRef = undefined;
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
    const { alwaysOpen } = getOpenProps(this.props);
    if (alwaysOpen) {
      this.setState({ visible: alwaysOpen });
    }
  }
  onClickIcon = () => {
    const { current } = this.inputRef || {};
    if (current) {
      current.focus();
    }
  };

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
      popupContainerId,
      step,
      showTime,
      canClear = true,
      type,
      hiddenHelp,
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
    const { mode } = this.props;
    const { themeProps } = getFacePanelContain({ mode, getPartOfThemeProps }, 'FacePanelContain');
    const inputContainProps = getWrapThemeProps(
      { getPartOfThemeProps, mode, validateStatus, size, visible, liquidLayout, type },
      'Container'
    );
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
      canClear,
      value: this.state.value,
      onClear: this.onClear,
      clearButtonTheme: clearButtonProps,
      onClickIcon: this.onClickIcon,
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
        <Box themeProps={inputContainProps} {...addMouseEvent(this)}>
          <Trigger
            themePass
            createPortal={createPortal}
            popupContainerId={popupContainerId}
            onDocumentClick={this.onDocumentClick}
            popupVisible={visible}
            alwaysOpen={alwaysOpen || open}
            liquidLayout={liquidLayout}
            popup={
              <React.Fragment>
                <PanelWrap themeProps={themeProps} disabled={disabled || readOnly}>
                  <SwitchPanel
                    {...this.props}
                    hasStateValue={value}
                    onChange={this.panelChane}
                    status={status}
                    value={panelValue}
                    timeValue={value}
                    format={format}
                    timeChange={this.timeChange}
                    model={this.targetMode}
                    isScroll={isScroll}
                    valueIsValid={valueIsValid}
                    index={0}
                    hasOldValue={this.oldValue}
                    isStartOfWeek={isStartOfWeek}
                    themeProps={themeProps}
                    step={getNewStepProps({ step })}
                    noBorder
                  />

                  {showTime && (
                    <PageFooter
                      {...this.props}
                      format={format}
                      onChange={this.onChange}
                      footerChange={this.footerChange}
                      showTimeBtnIsDisabled={valueIsValid}
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
              onBlur={this.onBlur}
              disabled={disabled}
              readOnly={readOnly}
              validateType={validateType}
              validateStatus={validateStatus}
              help={help}
              size={size}
              popupContainerId={popupContainerId}
              getInputRef={param => {
                const { ref } = param;
                this.inputRef = ref;
              }}
              hiddenHelp={hiddenHelp}
            />
          </Trigger>
        </Box>
      </Theme>
    );
  }

  onDocumentClick = () => {
    this.setState({ visible: false });
    const { onDocumentClick } = this.props;
    if (onDocumentClick) {
      onDocumentClick();
    }
  };

  getIsValid = (newValue: string) => {
    const { format } = this.state;
    const { limitMinValue = '', limitMaxValue = '' } = this.props;

    return (
      formatValueIsValid(newValue, format) &&
      getValueIsInLimit({
        dateValue: newValue,
        limitMinValue,
        limitMaxValue,
        format,
      })
    );
  };
  onChange = (param: Object) => {
    const { newValue, event } = param;
    const { format } = this.state;
    const { mode } = this.props;
    const { isWeeks, isWeek } = modeStyle(mode);
    const isValid = this.getIsValid(newValue);
    isValid && this.setModeState(newValue, format, isWeeks || isWeek);
    if (isValid) {
      this.oldValue = newValue;
    }
    this.setState({ value: newValue, isValid, visible: this.panelNeedVisible() }, () => {
      this.exportOnChange({ event, newValue, oldValue: this.oldValue });
    });
  };

  panelChane = (param: { newValue: string, event: Object }) => {
    const { newValue, event } = param;
    this.setState({ value: newValue, visible: this.panelNeedVisible(), isValid: true }, () => {
      this.exportOnChange({ event, newValue, oldValue: this.oldValue });
    });
  };

  exportOnChange = (param: { event: Object, newValue: string, oldValue: string }) => {
    const { onChange } = this.props;
    onChange && onChange(param);
  };

  panelNeedVisible = () => {
    const { mode } = this.props;
    const { isWeek, isYear, isMonth, isTime } = modeStyle(mode);
    return (this.needControlClose() && !(isWeek || isYear || isMonth) && !this.isClear) || isTime;
  };

  needControlClose = () => {
    const { showTime, onOk } = this.props;
    return showTime || onOk;
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
  onFocus = e => {
    this.isClear = false;
    const { value, valueIsValid, normalValue, format, status } = this.state;
    const isValid = this.getIsValid(value);
    if (isValid) {
      this.oldValue = value;
    }
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
  onBlur = event => {
    const { value } = this.state;
    const isValid = this.getIsValid(value);

    if (value && !isValid) {
      this.setState({ value: this.oldValue });
      this.exportOnChange({ event, newValue: this.oldValue, oldValue: this.oldValue });
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
