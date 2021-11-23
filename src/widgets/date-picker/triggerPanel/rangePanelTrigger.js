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
import {
  differMonthAndYear,
  getIndexInRange,
  getCurrentPageDates,
  getSortValue,
} from '../utils/differUtils';
import {
  formatValueIsValid,
  rangeValueMonthIsSame,
  getValueIsInLimit,
  isAfterTime,
  isBeforeTime,
} from '../utils/booleanUtils';
import { getNewStepProps } from '../utils/utils';
import { getFacePanelContain, getWrapThemeProps } from '../themeConfig/themeConfig';

import { getArrayLen } from '@lugia/array-utils';

type TypeProps = {
  defaultValue?: Array<string>,
  value?: Array<string>,
  format?: string,
  disabled?: boolean,
  disabledEndTime?: boolean,
  disabledStartTime?: boolean,
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
  limitMinValue?: string,
  limitMaxValue?: string,
  canClear?: boolean,
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
  disabledStartValue: boolean,
  disabledEndValue: boolean,
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
  panelChoseTimes: number;
  inputRefs: { [key: string]: any };
  constructor(props: TypeProps) {
    super(props);
    this.trigger = React.createRef();
    this.monthAndYear = [];
    this.isClear = true;
    this.oldValue = ['', ''];
    this.targetModeFirst = new SwitchPanelMode();
    this.targetModeSecond = new SwitchPanelMode();
    this.pageFooterChange = new SwitchPanelMode();
    this.panelChoseTimes = 0;
    this.inputRefs = undefined;
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
      disabledStartValue: preState ? preState.disabledStartValue : false,
      disabledEndValue: preState ? preState.disabledEndValue : false,
    };
  }
  getDatePanelValue = (value: Array<string>) => {
    const { format } = this.state;
    const { monthAndYear } = this;
    const currentValue = [];
    monthAndYear.forEach(item => {
      currentValue.push(moment(item).format(format));
    });
    const hasValue = value[0] !== '' || value[1] !== '';
    const newVal = hasValue ? [...value] : currentValue;
    const monthIsSame = rangeValueMonthIsSame(newVal, format);
    const date = moment().date();
    const { isValid } = this.getIsValid(newVal);
    if (monthIsSame) {
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
    const { format } = this.state;
    const { limitMinValue, limitMaxValue } = this.props;
    const formatIsValids = [];
    let isValid = true;
    Array.isArray(newValue) &&
      newValue.forEach((dateValue, index) => {
        if (dateValue !== '') {
          const isValids = formatValueIsValid(dateValue, format);
          const isInLimit = getValueIsInLimit({
            dateValue,
            limitMinValue,
            limitMaxValue,
            format,
          });
          formatIsValids.push(isValids && isInLimit);
          if (!isValids || !isInLimit) {
            isValid = false;
          }
        } else {
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

  currentValueIsOutRange = (values: string[], currentValue: string, currentInputIndex: number) => {
    const hasValue = this.hasDoubleValue(values);
    const { format } = this.state;
    if (hasValue) {
      const outMaxValue = isAfterTime({ everyTime: currentValue, compareTime: values[1], format });
      const outMinValue = isBeforeTime({ everyTime: currentValue, compareTime: values[0], format });
      return (currentInputIndex === 0 && outMaxValue) || (currentInputIndex === 1 && outMinValue);
    }
    return false;
  };

  panelChange = (param: Object) => {
    this.isClear = false;

    const { disabledStartTime, disabledEndTime } = this.props;
    const { newValue, event } = param;
    const { format, rangeValue: rangeV, value, currentInputIndex } = this.state;
    const hasValue = this.hasDoubleValue(value);

    const { panelChoseTimes } = this;

    const isDisabledOneSide = disabledStartTime || disabledEndTime;

    this.panelChoseTimes = isDisabledOneSide ? 2 : panelChoseTimes + 1;

    let newRangeValue = [];
    let rangeValue = [...rangeV];

    const isOutRange = this.currentValueIsOutRange(value, newValue, currentInputIndex);

    if (isDisabledOneSide || (hasValue && !isOutRange)) {
      newRangeValue = rangeValue.length === 0 ? [...value] : [...rangeValue];

      let newCurrentInputIndex = currentInputIndex;
      if (disabledStartTime) {
        newCurrentInputIndex = 1;
      } else if (disabledEndTime) {
        newCurrentInputIndex = 0;
      }
      newRangeValue[newCurrentInputIndex] = newValue;
    } else {
      if (hasValue && isOutRange) {
        rangeValue = [];
      }
      newRangeValue = rangeValue.length > 0 ? [rangeValue[0]] : [];
      newRangeValue.push(newValue);
    }

    const { length } = newRangeValue;
    let renderValue = [];
    let setStateData;
    if (length === 1) {
      const [startValue] = newRangeValue;
      renderValue = [startValue, startValue];
      const newVal = ['', ''];
      newVal[currentInputIndex] = startValue;
      setStateData = {
        value: newVal,
        hasNormalvalue: true,
        rangeValue: newRangeValue,
      };
    }

    if (length === 2) {
      renderValue = [...newRangeValue];
      const sortValue = this.exportOnChange(renderValue, this.changeOldValue, event);
      setStateData = {
        value: sortValue,
        rangeValue: [],
        isHover: false,
      };
    }
    this.drawPageAgain(renderValue, format);
    const { panelChoseTimes: newPanelChoseTimes } = this;
    let visible = newPanelChoseTimes !== 2;
    const { onOk, showTime } = this.props;
    if (onOk || showTime) {
      visible = true;
    }

    const autoDisabledValueState = isDisabledOneSide
      ? { disabledStartValue: false, disabledEndValue: false }
      : {
          disabledStartValue: currentInputIndex === 0,
          disabledEndValue: currentInputIndex === 1,
          currentInputIndex: this.getNewInputIndex(currentInputIndex),
        };

    if (!isDisabledOneSide && newPanelChoseTimes === 1) {
      const { currentInputIndex } = autoDisabledValueState;
      this.autoFocus = true;
      this.inputRefs[currentInputIndex].current.focus();
      this.autoFocus = false;
    }

    if (newPanelChoseTimes === 2) {
      this.panelChoseTimes = 0;
    }
    this.setState({
      ...setStateData,
      visible,
      ...autoDisabledValueState,
    });
  };

  getNewInputIndex = (currentInputIndex: number) => {
    return currentInputIndex === 0 ? 1 : 0;
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
    const range = [];
    rangeValue.forEach(value => {
      if (value) {
        const isValid = moment(value, format, true).isValid();
        if (isValid) {
          range.push(value);
        }
      }
    });

    const { min, max } = getSortValue(range, format);
    return [min, max];
  };
  setTargetMode = (panelValue: Array<string>) => {
    const { status } = this.state;
    this.targetModeFirst.onChange({ value: panelValue[0], isScroll: false, status });
    this.targetModeSecond.onChange({ value: panelValue[1], isScroll: false, status });
  };
  rangeHoverChange = (obj: Object) => {
    const { format, rangeValue } = this.state;
    const { choseValue } = obj;
    const hoverRangeValue = [rangeValue[0], choseValue];
    this.setState({ rangeValue: hoverRangeValue, isHover: true });
    this.drawPageAgain(hoverRangeValue, format);
  };
  againRangeHoverChange = (obj: { hoverValue: string }) => {
    if (this.panelChoseTimes !== 1) {
      return;
    }
    const { format, value, currentInputIndex } = this.state;
    const { hoverValue } = obj;
    const hasValue = this.hasDoubleValue(value);
    if (!hasValue) {
      return;
    }
    const index = this.getNewInputIndex(currentInputIndex);
    const hoverRangeValue = [value[index], hoverValue];

    const { rangeIndex, choseDayIndex } = this.getRangeRenderIndex(hoverRangeValue, format);

    this.setState({ againRangeIndex: rangeIndex, againChoseDayIndex: choseDayIndex });
  };

  getCurrentYandM = (obj: Object) => {
    const { month, year, index } = obj;
    const { format, rangeValue, value } = this.state;

    const date = moment()
      .set({ month, year })
      .format(format);
    const { monthAndYear } = this;
    monthAndYear[index] = date;
    this.panelDatesArray = getCurrentPageDates(monthAndYear, format);
    const renderValue = rangeValue.length > 0 ? rangeValue : value;
    rangeValue && this.drawPageAgain(renderValue, format);
  };
  setTriggerVisible = (open: boolean) => {
    this.setState({ visible: open });
  };

  valueIsEmpty = (value: string[]) => {
    return value[0] === '' && value[1] === '';
  };

  hasDoubleValue = (value: string[]): boolean => {
    return !!(value[0] && value[1]);
  };

  hasSingleValue = (value: string[]): boolean => {
    return value[0] || value[1];
  };

  onFocus = (e: any, index: number, inputRefs: { [key: string]: any }) => {
    if (this.autoFocus) {
      return;
    }
    const { value, panelValue, status, format } = this.state;
    const { isValid } = this.getIsValid(value);
    this.isClear = false;
    this.panelChoseTimes = 0;
    this.inputRefs = inputRefs;
    if (isValid) {
      this.oldValue = [...value];
      this.changeOldValue = [...value];
      this.oldMonthandYear = [...this.monthAndYear];
      this.monthAndYear = [...panelValue];
      this.panelDatesArray = getCurrentPageDates(panelValue, format);
      this.setState({ rangeValue: [] });
    }
    if (this.valueIsEmpty(value)) {
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
    this.setState({
      disabledStartValue: false,
      disabledEndValue: false,
      currentInputIndex: index,
      againRangeIndex: [],
      againChoseDayIndex: [],
    });
  };
  onBlur = event => {
    const { value } = this.state;
    const { isValid } = this.getIsValid(value);
    const noValue = this.valueIsEmpty(value);
    if (noValue) {
      this.oldValue = ['', ''];
    }
    if (!isValid) {
      const newValue =
        this.oldValue[0] && this.oldValue[1]
          ? this.oldValue
          : this.changeOldValue
          ? this.changeOldValue
          : ['', ''];
      const { onChange } = this.props;
      if (onChange) {
        onChange({ newValue, oldValue: [...newValue], event });
      }
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
    const { rangeIndex, choseDayIndex } = this.getRangeRenderIndex(rangeValue, format);
    this.setState({ rangeIndex, choseDayIndex });
  };

  getRangeRenderIndex = (
    rangeValue: Array<string>,
    format: string
  ): { rangeIndex: number[][], choseDayIndex: number[][] } => {
    const { monthAndYear, panelDatesArray } = this;
    const { rangeIndex, choseDayIndex } = getIndexInRange(
      rangeValue,
      monthAndYear,
      panelDatesArray,
      format
    );
    return { rangeIndex, choseDayIndex };
  };

  componentDidMount() {
    const { format, panelValue } = this.state;
    this.monthAndYear = [...panelValue];
    this.panelDatesArray = getCurrentPageDates(panelValue, format);
  }
  onDocumentClick = () => {
    this.panelChoseTimes = 0;
    this.setState({ visible: false, againRangeIndex: [], againChoseDayIndex: [] });
    const { onDocumentClick } = this.props;
    if (onDocumentClick) {
      onDocumentClick();
    }
    this.onBlur();
  };

  onMouseLeave = () => {
    this.onDatePanelLeave();
  };

  onDatePanelLeave = () => {
    const { value, againRangeIndex = [] } = this.state;
    if (this.panelChoseTimes === 1 && !this.hasDoubleValue(value)) {
      const { rangeValue, format } = this.state;
      const { choseDayIndex } = this.getRangeRenderIndex([rangeValue[0]], format);
      this.setState({
        rangeIndex: [],
        choseDayIndex,
      });
    }
    const [startPanelIndex, endPanelIndex] = againRangeIndex;
    if (getArrayLen(startPanelIndex) > 0 || getArrayLen(endPanelIndex) > 0) {
      this.setState({
        againRangeIndex: [],
        againChoseDayIndex: [],
      });
    }
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
      panelValue,
      disabledStartValue,
      disabledEndValue,
      againRangeIndex,
      againChoseDayIndex,
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
      disabledEndTime,
      disabledStartTime,
      canClear = true,
    } = this.props;
    const { monthAndYear } = this;
    const newMonthAndYear = monthAndYear.length > 0 ? monthAndYear : panelValue;
    const { differAmonth, differAyear } = differMonthAndYear(newMonthAndYear, format);
    const config = {
      panelChoseDate: rangeValue && rangeValue[0],
      timeValue,
      rangeHoverChange: this.rangeHoverChange,
      againRangeHoverChange: this.againRangeHoverChange,
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
      { mode, size, getPartOfThemeProps, validateStatus, visible, liquidLayout },
      'Container'
    );
    const newDisabled = disabled || (disabledEndTime && disabledStartTime);

    const disabledStartValue_panel = disabledStartTime || disabledStartValue;
    const disabledEndValue_panel = disabledEndTime || disabledEndValue;
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
              disabled={newDisabled}
              readOnly={readOnly}
            >
              <RangeWrapInner onMouseLeave={this.onMouseLeave}>
                <SwitchPanel
                  {...this.props}
                  value={newMonthAndYear[0]}
                  onChange={this.onChangeFirst}
                  index={0}
                  timeIndex={0}
                  hasTimeWrapBorder
                  {...config}
                  rangeRenderIndex={rangeIndex && rangeIndex[0]}
                  choseDayIndex={choseDayIndex && choseDayIndex[0]}
                  againRangeRenderIndex={againRangeIndex && againRangeIndex[0]}
                  againChoseDayIndex={againChoseDayIndex && againChoseDayIndex[0]}
                  model={this.targetModeFirst}
                  timeValue={value[0]}
                  rangeValue={value}
                  themeProps={themeProps}
                  step={getNewStepProps(this.props)}
                  startDisabled={disabledStartValue_panel}
                  endDisabled={disabledEndValue_panel}
                  onDatePanelLeave={this.onDatePanelLeave}
                />
                <SwitchPanel
                  {...this.props}
                  value={newMonthAndYear[1]}
                  onChange={this.onChangeSecond}
                  index={1}
                  timeIndex={1}
                  {...config}
                  rangeRenderIndex={rangeIndex && rangeIndex[1]}
                  choseDayIndex={choseDayIndex && choseDayIndex[1]}
                  againRangeRenderIndex={againRangeIndex && againRangeIndex[1]}
                  againChoseDayIndex={againChoseDayIndex && againChoseDayIndex[2]}
                  model={this.targetModeSecond}
                  timeValue={value[1]}
                  rangeValue={value}
                  themeProps={themeProps}
                  noBorder
                  startDisabled={disabledStartValue_panel}
                  endDisabled={disabledEndValue_panel}
                  onDatePanelLeave={this.onDatePanelLeave}
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
            readOnly={readOnly}
            theme={theme}
            visible={visible}
            isClear={isClear}
            themeProps={inputContainProps}
            startDisabled={disabledStartTime}
            endDisabled={disabledEndTime}
            disabled={newDisabled}
            canClear={canClear}
          />
        </Trigger>
      </Box>
    );
  }
}
export default Range;
