// @flow
import React, { Component } from 'react';
import moment from 'moment';
import SwitchPanel from '../switchPanel/SwitchPanel';
import RangeInput from '../panel/RangeInput';
import PageFooter from '../panel/PageFooter';
import Trigger from '../../trigger/OpenTrigger';
import { getDerivedForInput } from '../utils/getDerived';
import { RangeWrap, RangeWrapInner, Box } from '../styled/styled';
import SwitchPanelMode from '../mode';
import { differMonthAndYear, getIndexInRange, getCurrentPageDates } from '../utils/differUtils';
import { formatValueIsValid, getIsSame } from '../utils/booleanUtils';
import { getformatSymbol, getNewStepProps } from '../utils/utils';
import { getFacePanelContain, getWrapThemeProps } from '../themeConfig/themeConfig';
type TypeProps = {
  defaultValue?: Array<string>,
  value?: Array<string>,
  format?: string,
  disabled?: boolean,
  readOnly?: boolean,
  onChange?: Function,
  onFocus?: Function,
  onBlur?: Function,
  createPortal?: boolean,
  open?: boolean,
  liquidLayout?: boolean,
  size?: boolean,
  showTime?: any,
  onOk?: any,
  theme: Object,
  mode: string,
  getPartOfThemeProps: Function,
  validateType?: string,
  validateStatus?: string,
  help?: string,
  middleSymbol?: string,
  alwaysOpen?: boolean,
  onDocumentClick?: Function,
  popupContainerId?: string,
};
type TypeState = {
  value: Array<string>,
  placeholder: Array<string>,
  format: string,
  isValid: boolean,
  timeValue: string,
  status: string,
  isScroll: boolean,
  panelValue: Array<string>,
  rangeValue: Array<string>,
  valueIsValid: boolean,
  isHover: boolean,
  isClear: boolean,
  visible: boolean,
  hasNormalvalue: boolean,
  rangeIndex: Array<number>,
  choseDayIndex: Array<number>,
};
class Range extends Component<TypeProps, TypeState> {
  static displayName = 'Range';
  trigger: Object;
  monthAndYear: Array<string>;
  oldValue: Array<string>;
  changeOldValue: Array<string>;
  oldMonthandYear: Array<string>;
  panelDatesArray: Array<string>;
  isClear: boolean;
  targetModeFirst: Object;
  targetModeSecond: Object;
  pageFooterChange: Object;
  normalStyleValueObj: Object;
  choseDate: string;
  validValue: string;
  times: Array<number>;
  constructor(props: TypeProps) {
    super(props);
    this.trigger = React.createRef();
    this.monthAndYear = [];
    this.isClear = true;
    this.oldValue = ['', ''];
    this.targetModeFirst = new SwitchPanelMode();
    this.targetModeSecond = new SwitchPanelMode();
    this.pageFooterChange = new SwitchPanelMode();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value, format, placeholder, panelValue, valueIsValid } = getDerivedForInput(
      nextProps,
      preState
    );
    const isHover = preState ? preState.isHover : false;
    return {
      placeholder,
      value,
      panelValue,
      format,
      valueIsValid,
      visible: preState ? preState.visible : false,
      isClear: preState ? preState.isClear : false,
      rangeValue: preState ? preState.rangeValue : [],
      status: preState && preState.status,
      isHover,
    };
  }
  getDatePanelValue = (value: Array<string>) => {
    const { format } = this.state;
    const { monthAndYear } = this;
    const currentValue = [];
    monthAndYear.forEach((item, index) => {
      currentValue.push(moment(item).format(format));
    });
    const hasValue = value[0] !== '' || value[1] !== '';
    const newVal = hasValue ? [...value] : currentValue;
    const { isSameYandM } = getIsSame(newVal, format);
    const date = moment().date();
    const { isValid } = this.getIsValid(newVal);
    if (isSameYandM) {
      const second = moment(newVal[0], format)
        .set({ date })
        .add({ month: 1 })
        .format(format);
      newVal[1] = second;
    }
    return {
      panelfreshValue: newVal,
      isValid,
    };
  };
  onClickTrigger = (e: any, visible: boolean) => {
    const { isClear } = this;
    if (isClear && visible) {
      return;
    }
    const { status } = this.state;
    if (status === 'showTime') {
      return;
    }
    const { value, format } = this.state;
    const { isValid } = this.getIsValid(value);
    isValid && this.drawPageAgain(value, format);
    const { monthAndYear } = this;
    this.setTargetMode(monthAndYear);
    this.setState({ visible: true });
  };
  onChange = (parmas: Object) => {
    const { isClear } = this;
    if (isClear) {
      return;
    }
    const { newValue, oldValue, number, event } = parmas;
    const { formatIsValids, isValid } = this.getIsValid(newValue);
    if (isValid) {
      this.oldValue = [...newValue];
      this.oldMonthandYear = [...this.monthAndYear];
    }
    const hasOldValue = this.oldValue && this.oldValue[0] !== '' && this.oldValue !== '';
    const rangeValue = isValid
      ? newValue
      : hasOldValue
      ? this.oldMonthandYear
      : formatIsValids[number]
      ? [newValue[number], newValue[number]]
      : [];
    const { format } = this.state;
    if (formatIsValids[number]) {
      this.choseDate = rangeValue[0];
    }
    const noValue = newValue[0] === '' && newValue[1] === '';
    this.setState(
      {
        value: newValue,
        rangeValue: isValid || hasOldValue || noValue ? [] : rangeValue,
        visible: true,
      },
      () => {
        const { panelValue, isHover } = this.state;
        if (!formatIsValids[number] && isHover) {
          return;
        }
        this.monthAndYear = !isValid && hasOldValue ? [...rangeValue] : [...panelValue];
        this.panelDatesArray = getCurrentPageDates(this.monthAndYear, format);
        formatIsValids[number] && this.setTargetMode(this.monthAndYear);
        formatIsValids[number] && this.drawPageAgain(rangeValue, format);
      }
    );
    const { onChange } = this.props;
    onChange && onChange({ newValue, oldValue, event });
    if (noValue) {
      this.drawPageAgain(['', ''], this.state.format);
    }
  };
  getIsValid = (newValue: Array<string> = []) => {
    const { normalStyleValueObj } = this;
    const { format } = this.state;
    const formatIsValids = [];
    let isValid = true;
    Array.isArray(newValue) &&
      newValue.forEach((item, index) => {
        const isValids = formatValueIsValid(normalStyleValueObj, item, format);
        formatIsValids.push(isValids);
        if (!isValids) {
          isValid = false;
        }
      });
    return {
      formatIsValids,
      isValid,
    };
  };
  onChangeFirst = (parmas: Object) => {
    this.panelChange({ ...parmas, index: 0 });
  };
  onChangeSecond = (parmas: Object) => {
    this.panelChange({ ...parmas, index: 1 });
  };
  panelChange = (parmas: Object) => {
    this.isClear = false;
    let visible = true;
    const { newValue, event } = parmas;
    const { format } = this.state;
    const { rangeValue } = this.state;
    const newRangeValue = rangeValue.length > 0 ? [rangeValue[0]] : [];
    newRangeValue.push(newValue);
    const { length } = newRangeValue;
    let renderValue = [];
    let setStateData;
    if (length === 1) {
      renderValue = [newRangeValue[0], newRangeValue[0]];
      setStateData = {
        hasNormalvalue: true,
        rangeValue: newRangeValue,
      };
    }
    if (length === 2) {
      renderValue = [...newRangeValue];
      const { onOk, showTime } = this.props;
      visible = false;
      if (onOk || showTime) {
        visible = true;
      }
      const sortValue = this.exportOnChange(renderValue, this.changeOldValue, event);
      setStateData = { value: sortValue, rangeValue: [], isHover: false };
    }
    this.drawPageAgain(renderValue, format);
    this.setState({ ...setStateData, visible });
  };
  exportOnChange = (renderValue: string[], oldValue: string[], event: Object) => {
    const { format } = this.state;
    const { isValid } = this.getIsValid(renderValue);
    const { onChange } = this.props;
    const newValue = this.getSortValue(renderValue, format);
    if (isValid) {
      onChange && onChange({ newValue, oldValue, event });
      this.onBlur();
    }
    return newValue;
  };
  getSortValue = (rangeValue: Array<string>, format: string) => {
    const momentsA = moment(rangeValue[0], format);
    const momentsB = moment(rangeValue[1], format);
    const min = moment.min(momentsA, momentsB).format(format);
    const max = moment.max(momentsA, momentsB).format(format);
    return [min, max];
  };
  setTargetMode = (panelValue: Array<string>) => {
    const { status } = this.state;
    this.targetModeFirst.onChange({ value: panelValue[0], isScroll: false, status });
    this.targetModeSecond.onChange({ value: panelValue[1], isScroll: false, status });
  };
  rangeHoverChange = (obj: Object) => {
    const { value, format, rangeValue } = this.state;
    const { formatIsValids } = this.getIsValid(value);
    if ((value[0] || value[1]) && !(value[0] !== '' && value[1] !== '')) {
      value.forEach((item, index) => {
        if (formatIsValids[index]) {
          this.validValue = item;
        }
        if (item && !formatIsValids[index]) {
          value[index] = this.validValue;
          rangeValue[0] = this.validValue;
        }
      });
    }
    const { choseValue } = obj;
    const hoverRangeValue = [rangeValue[0], choseValue];
    this.setState({ rangeValue: hoverRangeValue, isHover: true });
    this.drawPageAgain(hoverRangeValue, format);
  };
  getCurrentYandM = (obj: Object) => {
    const { month, year, index } = obj;
    const date = moment()
      .set({ month, year })
      .format('YYYY-MM');
    const { monthAndYear } = this;
    monthAndYear[index] = date;
    const { format } = this.state;
    this.panelDatesArray = getCurrentPageDates(monthAndYear, format);
    const { rangeValue, value } = this.state;
    const renderValue = rangeValue.length > 0 ? rangeValue : value;
    rangeValue && this.drawPageAgain(renderValue, format);
  };
  setTriggerVisible = (open: boolean) => {
    this.setState({ visible: open });
  };
  onFocus = (e: any) => {
    const { value, panelValue, status } = this.state;
    const { isValid } = this.getIsValid(value);
    this.isClear = false;

    const { format } = this.state;
    if (isValid) {
      this.oldValue = [...value];
      this.changeOldValue = [...value];
      this.oldMonthandYear = [...this.monthAndYear];
      this.monthAndYear = [...panelValue];
      this.panelDatesArray = getCurrentPageDates(panelValue, format);
      this.setState({ rangeValue: [] });
    }
    const noValue = value[0] === '' && value[1] === '';
    if (noValue) {
      this.setState({ rangeValue: [] });
      this.drawPageAgain(['', ''], this.state.format);
    }
    if (status === 'showTime') {
      this.pageFooterChange.onFocus({ status: 'showTime' });
      this.setState({ status: 'showDate' });
    }
    this.onClickTrigger(e, true);
    const { onFocus } = this.props;
    onFocus && onFocus();
  };
  onBlur = () => {
    const { value } = this.state;
    const { isValid } = this.getIsValid(value);
    const hasValue = value[0] !== '' || value[1] !== '';
    const noValue = value[0] === '' && value[1] === '';
    if (noValue) {
      this.oldValue = ['', ''];
    }
    if (hasValue && !isValid) {
      const newValue =
        this.oldValue[0] && this.oldValue[1]
          ? this.oldValue
          : this.changeOldValue
          ? this.changeOldValue
          : ['', ''];
      this.setState({ value: newValue });
    }
    const { onBlur } = this.props;
    onBlur && onBlur();
  };
  onClear = (event: any) => {
    const newValue = ['', ''];
    this.oldValue = ['', ''];
    this.isClear = true;

    this.setState({ value: newValue, hasNormalvalue: false, visible: false });

    const { onChange } = this.props;
    const { value } = this.state;
    if (onChange) {
      onChange({ newValue, oldValue: [...value], event });
    }
  };
  footerChange = (status: string) => {
    let visible = true;
    let stateData;
    if (status === 'onOk') {
      visible = false;
      stateData = { status: 'showDate' };
      const { onOk } = this.props;
      const onOkChange =
        typeof onOk === 'function' ? onOk : onOk && onOk.Function ? onOk.Function : '';
      onOkChange && onOkChange();
    }
    if (status !== 'onOk') {
      visible = true;
      const { value, panelValue } = this.state;
      status === 'showTime' && this.setTargetMode(value);
      status === 'showDate' && this.setTargetMode(panelValue);
      status === 'showDate' && this.drawPageAgain(value, this.state.format);
      stateData = { status };
    }
    this.setState({ ...stateData, visible, rangeValue: [] });
  };
  timeChange = (obj: Object) => {
    const { keys, timeIndex, event } = obj;
    const timeValue = obj.value;
    this.times = keys;
    const { value } = this.state;
    this.oldValue = value;
    const newValue = [...value];
    newValue[timeIndex] = timeValue;
    this.exportOnChange(newValue, this.oldValue, event);
    this.setState({ value: newValue });
  };
  drawPageAgain = (rangeValue: Array<string>, format: string) => {
    const { monthAndYear, panelDatesArray } = this;
    const { rangeIndex, choseDayIndex } = getIndexInRange(
      rangeValue,
      monthAndYear,
      panelDatesArray,
      format
    );
    this.setState({ rangeIndex, choseDayIndex });
  };
  componentDidMount() {
    const { format, panelValue } = this.state;
    const value = moment().format(format);
    this.normalStyleValueObj = getformatSymbol(value);
    this.monthAndYear = [...panelValue];
    this.panelDatesArray = getCurrentPageDates(panelValue, format);
  }
  onDocumentClick = () => {
    this.setState({ visible: false });
    const { onDocumentClick } = this.props;
    if (onDocumentClick) {
      onDocumentClick();
    }
    this.onBlur();
  };
  render() {
    const {
      value,
      format,
      status,
      timeValue,
      rangeIndex,
      choseDayIndex,
      rangeValue,
      valueIsValid,
      visible,
      isClear,
      placeholder,
    } = this.state;
    const {
      disabled,
      readOnly,
      theme,
      mode,
      getPartOfThemeProps,
      createPortal = true,
      size,
      validateStatus,
      liquidLayout,
      alwaysOpen,
      open,
      popupContainerId,
    } = this.props;
    const { monthAndYear } = this;
    const { differAmonth, differAyear } = differMonthAndYear(monthAndYear);
    const config = {
      panelChoseDate: rangeValue && rangeValue[0],
      timeValue,
      rangeHoverChange: this.rangeHoverChange,
      getCurrentYandM: this.getCurrentYandM,
      differAmonth,
      differAyear,
      setTriggerVisible: this.setTriggerVisible,
      status,
      timeChange: this.timeChange,
      format,
    };
    const { themeProps } = getFacePanelContain({ mode, getPartOfThemeProps });
    const inputContainProps = getWrapThemeProps(
      { mode, size, getPartOfThemeProps, validateStatus, visible },
      'Container'
    );
    return (
      <Box themeProps={inputContainProps}>
        <Trigger
          popupContainerId={popupContainerId}
          themePass
          createPortal={createPortal}
          onDocumentClick={this.onDocumentClick}
          popupVisible={visible}
          alwaysOpen={alwaysOpen || open}
          liquidLayout={liquidLayout}
          popup={
            <RangeWrap
              {...theme}
              isTime={status === 'showTime'}
              mode={mode}
              themeProps={themeProps}
              disabled={disabled || readOnly}
            >
              <RangeWrapInner>
                <SwitchPanel
                  {...this.props}
                  value={monthAndYear[0]}
                  onChange={this.onChangeFirst}
                  index={0}
                  timeIndex={0}
                  hasTimeWrapBorder
                  {...config}
                  rangeRenderIndex={rangeIndex && rangeIndex[0]}
                  choseDayIndex={choseDayIndex && choseDayIndex[0]}
                  model={this.targetModeFirst}
                  timeValue={value[0]}
                  themeProps={themeProps}
                  step={getNewStepProps(this.props)}
                />
                <SwitchPanel
                  {...this.props}
                  value={monthAndYear[1]}
                  onChange={this.onChangeSecond}
                  index={1}
                  timeIndex={1}
                  {...config}
                  rangeRenderIndex={rangeIndex && rangeIndex[1]}
                  choseDayIndex={choseDayIndex && choseDayIndex[1]}
                  model={this.targetModeSecond}
                  timeValue={value[1]}
                  themeProps={themeProps}
                  noBorder
                />
              </RangeWrapInner>
              <PageFooter
                {...this.props}
                format={format}
                onChange={this.onChange}
                footerChange={this.footerChange}
                model={this.pageFooterChange}
                showTimeBtnIsDisabled={valueIsValid}
              />
            </RangeWrap>
          }
          align="bottomLeft"
          key="trigger"
          ref={this.trigger}
          action={disabled || readOnly ? [] : ['click']}
          hideAction={['click']}
        >
          <RangeInput
            {...this.props}
            placeholder={placeholder}
            value={value}
            onClick={this.onClickTrigger}
            onChange={this.onChange}
            onBlur={() => {}}
            onFocus={this.onFocus}
            onClear={this.onClear}
            disabled={disabled}
            readOnly={readOnly}
            theme={theme}
            visible={visible}
            isClear={isClear}
            themeProps={inputContainProps}
          />
        </Trigger>
      </Box>
    );
  }
}
export default Range;
