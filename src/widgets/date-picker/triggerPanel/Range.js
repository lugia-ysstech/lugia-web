//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import moment from 'moment';
import SwitchPanel from '../switchPanel/SwitchPanel';
import Trigger from '../../trigger/index';
import RangeInput from './RangeInput';
import PageFooter from '../panel/PageFooter';
import { getDerivedForInput } from '../utils/getDerived';
import { RangeWrap } from '../styled';
import SwitchPanelMode from '../mode';
import { differMonthAndYear, getIndexInRange, getCurrentPageDates } from '../utils/differUtils';
import { formatValueIsValid, getIsSame } from '../utils/booleanUtils';
import { getformatSymbol } from '../utils/utils';
type TypeProps = {
  defaultValue?: Array<string>,
  value?: Array<string>,
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
  value: Array<string>,
  placeholder: Array<string>,
  format: string,
  isValid: boolean,
  timeValue: string,
  status: string,
  isScroll: boolean,
  firstWeekDay: number,
  panelValue: Array<string>,
  valueIsValid: boolean,
};
class Range extends Component {
  static displayName = 'Range';
  constructor(props) {
    super(props);
    this.trigger = React.createRef();
    this.monthAndYear = [];
    this.isClear = true;
    this.oldValue = ['', ''];
    this.targetModeFirst = new SwitchPanelMode();
    this.targetModeSecond = new SwitchPanelMode();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const {
      value,
      format,
      placeholder,
      panelValue,
      firstWeekDay,
      valueIsValid,
    } = getDerivedForInput(nextProps, preState);
    const isHover = preState ? preState.isHover : false;
    return {
      placeholder,
      value,
      panelValue,
      format,
      firstWeekDay,
      valueIsValid,
      visible: preState ? preState.visible : false,
      isClear: preState ? preState.isClear : false,
      rangeValue: preState ? preState.rangeValue : [],
      RangeValue: preState ? preState.RangeValue : [],
      isHover,
    };
  }
  getDatePanelValue = (value: []) => {
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
  onClickTrigger = (e, visible: boolean, number) => {
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
    this.setTreePopupVisible(visible);
    this.setState({ visible });
  };
  onChange = (parmas: Object) => {
    const { isClear } = this;
    if (isClear) {
      return;
    }
    const { newValue, oldValue, number, event } = parmas;
    const { formatIsValids, isValid } = this.getIsValid(newValue);
    let visible = true;
    if (isValid) {
      this.oldValue = [...newValue];
      this.oldMonthandYear = [...this.monthAndYear];
      visible = false;
    }
    this.setTreePopupVisible(visible);
    const hasOldValue = this.oldValue && this.oldValue[0] !== '' && this.oldValue !== '';
    const rangeValue = isValid
      ? newValue
      : hasOldValue
      ? this.oldMonthandYear
      : formatIsValids[number]
      ? [newValue[number], newValue[number]]
      : newValue;
    const { format } = this.state;
    if (formatIsValids[number]) {
      this.choseDate = rangeValue[0];
    }
    this.setState(
      {
        value: newValue,
        rangeValue: isValid || hasOldValue ? [] : rangeValue,
        visible,
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
    isValid && onChange && onChange({ newValue, oldValue, event });
  };
  getIsValid = (newValue: []) => {
    const { normalStyleValueObj } = this;
    const { format } = this.state;
    const formatIsValids = [];
    let isValid = true;
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
    const { newValue } = parmas;
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
        RangeValue: [this.choseDate, ''],
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
      const { isValid } = this.getIsValid(renderValue);
      const { onChange } = this.props;
      const { oldValue } = this;
      const sortValue = this.getSortValue(renderValue, format);
      isValid && onChange && onChange({ newValue: sortValue, oldValue });
      setStateData = { value: sortValue, rangeValue: [], isHover: false };
    }
    this.setTreePopupVisible(visible);
    this.drawPageAgain(renderValue, format);
    this.setState(setStateData);
  };
  getSortValue = (rangeValue: Array<string>, format: string) => {
    const momentsA = moment(rangeValue[0], format);
    const momentsB = moment(rangeValue[1], format);
    const min = moment.min(momentsA, momentsB).format(format);
    const max = moment.max(momentsA, momentsB).format(format);
    return [min, max];
  };
  setTargetMode = (panelValue: Array<string>) => {
    this.targetModeFirst.onChange({ value: panelValue[0] });
    this.targetModeSecond.onChange({ value: panelValue[1] });
  };
  rangeHoverChange = (obj: Object) => {
    const { value, format, rangeValue } = this.state;
    const { formatIsValids } = this.getIsValid(value);
    if (value[0] || value[1]) {
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
    this.setState({ RangeValue: hoverRangeValue, rangeValue: hoverRangeValue, isHover: true });
    this.drawPageAgain(hoverRangeValue, format);
  };
  getCurrentYandM = (obj: Object) => {
    const { currentMonth, currentYear, index } = obj;
    const date = moment()
      .set({ month: currentMonth, year: currentYear })
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
    this.setTreePopupVisible(open);
  };
  onFocus = () => {
    const { value, panelValue } = this.state;
    const { isValid } = this.getIsValid(value);
    this.isClear = false;
    if (isValid) {
      this.oldValue = [...value];
      this.oldMonthandYear = [...this.monthAndYear];
      this.monthAndYear = [...panelValue];
      const { format } = this.state;
      this.panelDatesArray = getCurrentPageDates(panelValue, format);
      this.setState({ rangeValue: [] });
    }
    this.onClickTrigger(true);
  };
  onBlur = () => {
    const { value } = this.state;
    const { isValid } = this.getIsValid(value);
    if (value[0] === '' && value[1] === '') {
      this.oldValue = ['', ''];
    }
    if (!isValid) {
      const newValue = this.oldValue[0] && this.oldValue[1] ? this.oldValue : ['', ''];
      this.setState({ value: newValue });
    }
  };
  onClear = () => {
    const { value } = this.state;
    value[0] = '';
    value[1] = '';
    this.oldValue[0] = '';
    this.oldValue[1] = '';
    this.isClear = true;
    this.setState({ value, hasNormalvalue: false }, () => {
      this.setTreePopupVisible(false);
    });
  };
  footerChange = (status: string) => {
    let visible = true;
    let stateData;
    if (status === 'onOk') {
      visible = false;
      stateData = { status: 'showDate' };
    }
    if (status !== 'onOk') {
      visible = true;
      const { value, panelValue } = this.state;
      status === 'showTime' && this.setTargetMode(value);
      status === 'showDate' && this.setTargetMode(panelValue);
      stateData = { status };
    }
    this.setTreePopupVisible(visible);
    this.setState({ ...stateData, visible });
  };
  timeChange = (obj: Object) => {
    const { keys, timeIndex } = obj;
    const timeValue = obj.value;
    this.times = keys;
    const { value } = this.state;
    const newValue = [...value];
    newValue[timeIndex] = timeValue;
    this.setState({ value: newValue, RangeValue: newValue });
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
  render() {
    const {
      value,
      format,
      status,
      timeValue,
      visible,
      isClear,
      rangeIndex,
      choseDayIndex,
      rangeValue,
      firstWeekDay,
      valueIsValid,
    } = this.state;
    const { disabled, readOnly, theme } = this.props;
    const { monthAndYear } = this;
    const showTimeBtnIsDisabled = valueIsValid ? true : false;
    const renderValue = valueIsValid ? value : monthAndYear;
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
      firstWeekDay,
    };
    return (
      <Trigger
        popup={
          <RangeWrap {...theme} isTime={status === 'showTime'}>
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
            />
            <PageFooter
              {...this.props}
              format={format}
              onChange={this.onChange}
              footerChange={this.footerChange}
              showTimeBtnIsDisabled={showTimeBtnIsDisabled}
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
          placeholder={this.state.placeholder}
          value={value}
          onClick={this.onClickTrigger}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onClear={this.onClear}
          disabled={disabled}
          readOnly={readOnly}
          theme={theme}
          visible={visible}
          isClear={isClear}
        />
      </Trigger>
    );
  }
  setTreePopupVisible(visible: boolean) {
    if (this.trigger.current && this.trigger.current.getThemeTarget()) {
      this.trigger.current.getThemeTarget().setPopupVisible(visible);
    }
  }
}
export default Range;
