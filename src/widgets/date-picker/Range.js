//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import moment from 'moment';
import SwitchPanel from './SwitchPanel';
import Trigger from '../trigger/index';
import RangeInput from './RangeInput';
import { sortable } from '../common/Math';
import { getDerived, getDerivedForInput } from './getDerived';
import { getTheme } from './utils';
import {
  getMaxAndMinInMonth,
  getCompareRange,
  getValueInRange,
  getIsSame,
  getValueTrim,
  getValueIndex,
  getValueIsValid,
  formatValueIsValid,
} from './utils';
class Range extends Component {
  constructor(props) {
    super(props);
    this.pickerFirst = React.createRef();
    this.pickerSecond = React.createRef();
    this.trigger = React.createRef();
    this.valueArr = [];
    this.monthAndYear = [];
    this.month = '';
    this.year = '';
  }

  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { placeholder } = getDerived(nextProps, preState);
    let { value, format, hasValueProps } = getDerivedForInput(nextProps, preState);
    if (hasValueProps) {
      value = [moment(value[0], format).format(format), moment(value[1], format).format(format)];
    }
    return {
      placeholder,
      value,
      panelValue: (preState && preState.panelValue) || value,
      format,
    };
  }
  onClickTrigger = (visible: boolean, action: string, number) => {
    this.isHover = false;
    this.setTreePopupVisible(visible);
    const { value, format } = this.state;
    this.rangeValue = [...value];
    let Valid;
    if (value[0] === '' && value[1] === '') {
      const { monthAndYear } = this;
      const newVal = [...monthAndYear];
      const { isSameYandM } = getIsSame(newVal, format);
      const date = moment().date();
      const moments = moment(newVal[0], format).set({ date });
      newVal[0] = moments.format(format);
      newVal[1] = moment(newVal[1], format)
        .set({ date })
        .format(format);
      const second = moment(newVal[0], format)
        .set({ date })
        .add({ month: 1 })
        .format(format);
      if (isSameYandM) {
        newVal[1] = second;
      }
      this.pickerFirst.current.getChangeValue(newVal[0]);
      this.pickerSecond.current.getChangeValue(newVal[1]);
    } else {
      const firstValue = moment(value[0], format).format(format);
      const seconValue = moment(value[1], format).format(format);

      const { monthAndYear } = this;
      const { formatIsValids, isValid } = this.getIsValid(value);
      Valid = isValid;
      if (isValid) {
        this.pickerFirst.current.getChangeValue(firstValue || monthAndYear[0]);
        this.pickerSecond.current.getChangeValue(seconValue || monthAndYear[1]);
        const { isSameYandM, year, month } = getIsSame(value, format);
        if (isSameYandM) {
          const seconValue = moment()
            .set({ month, year })
            .add({ month: 1 })
            .format(format);
          this.pickerSecond.current.getChangeValue(seconValue);
        }
        this.valueArr = [];
        this.choseDate = '';
        this.setState({ panelValue: value });
      }
      if (value[1] === '' && formatIsValids[0] && action === 'onChange') {
        this.pickerFirst.current.getChangeValue(value[0]);
        const anotherValue = moment(value[0], format)
          .add({ month: 1 })
          .format(format);
        // this.pickerSecond.current.getChangeValue(anotherValue);
        this.valueArr[0] = this.getValueUnix([value[0]], format);
      }
      if (value[0] === '' && formatIsValids[1] && action === 'onChange') {
        this.pickerSecond.current.getChangeValue(value[1]);
        const anotherValue = moment(value[1], format)
          .subtract({ month: 1 })
          .format(format);

        //this.pickerFirst.current.getChangeValue('2018-11-08');

        this.valueArr[0] = this.getValueUnix([value[1]], format);
      }
    }
    this.setState({ visible, panelIndex: 0, isValid: Valid });
  };
  getValueUnix = (arr: [], format: string) => {
    const unixArr = [];
    arr.forEach((item, index) => {
      const unix = moment(item, format).valueOf();
      unixArr.push(unix);
    });
    const { length } = unixArr;
    return length === 1 ? unixArr[0] : unixArr;
  };
  onChange = (parmas: Object) => {
    this.setTreePopupVisible(true);
    const { newValue, oldValue, number } = parmas;
    const { normalStyleValueObj } = this;
    const { format, panelIndex, RangeValue } = this.state;
    const { formatIsValids, isValid } = this.getIsValid(newValue);
    if (isValid) {
      this.oldValue = [...newValue];
    }
    console.log(newValue);
    let hasNormalvalue;
    if (
      (newValue[0] !== '' && newValue[1] !== '') ||
      (this.oldValue[0] !== '' && this.oldValue !== '')
    ) {
      isValid && this.onClickTrigger(true, 'onChange');
      hasNormalvalue = true;
    } else {
      if (formatIsValids[number]) {
        this.onClickTrigger(true, 'onChange', number);
        this.choseDate = newValue[number];
      }
      if (this.choseDate) {
        hasNormalvalue = true;
      }
    }
    this.setState({
      value: newValue,
      panelValue: [this.choseDate],
      panelIndex: number,
      isValid,
      hasNormalvalue,
    });
    const { onChange } = this.props;
    isValid && onChange && onChange({ newValue, oldValue });
  };
  getMomentIsValid = (value: []) => {
    let isValid = true;
    const { format } = this.state;
    value.forEach((item, index) => {
      const moments = moment(item, format);
      if (!moments.isValid()) {
        isValid = false;
      }
    });
    return isValid;
  };
  getIsValid = (newValue: []) => {
    const { normalStyleValueObj } = this;
    const { format } = this.state;
    const formatIsValids = [];
    let isValid = true;
    let panelIndex;
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
    this.setTreePopupVisible(true);
    const { newValue, index, inRange } = parmas;
    const { format } = this.state;
    this.freshPanel = false;
    const unix = moment(newValue, format).valueOf();
    this.valueArr.push(unix);
    const { length } = this.valueArr;
    if (length === 1) {
      this.choseDate = moment(this.valueArr[0]).format(format);
      this.isHover = true;
      this.setState({ RangeValue: [], panelValue: [newValue], panelIndex: index }, () => {
        const { value } = this.state;
        const { monthAndYear } = this;
        if (value[0] !== '' && value[1] !== '') {
          if (index === 1) {
            this.pickerFirst.current.getChangeValue(monthAndYear[0]);
          } else {
            const { isSameYandM } = getIsSame(value, format);
            !isSameYandM && this.pickerSecond.current.getChangeValue(monthAndYear[1]);
          }
        }
      });
    }
    if (length === 2) {
      this.dirtyDate = '';
      this.choseDate = '';
      const newVal = this.valueArr.sort(sortable);
      newVal.forEach((item, index) => {
        newVal[index] = moment(newVal[index]).format(format);
      });
      this.setState({ value: newVal, panelValue: newVal }, () => {
        this.setTreePopupVisible(false);
        this.valueArr = [];
      });
      const { isValid } = this.getIsValid(newVal);
      const { onChange } = this.props;
      const { oldValue } = this;
      isValid && onChange && onChange({ newValue: newVal, oldValue });
    }
    const { differFirst } = this.getPanelDateDiffer();
    if (!inRange && differFirst) {
      const { monthAndYear } = this;
      let isLar = false,
        isSma = false;
      monthAndYear.forEach((item, index) => {
        const month = moment(item).month();
        const year = moment(item).year();
        const { isLarge, isSmall } = this.getOutsideRange(month, year, this.choseDate, format);
        if (isLarge) isLar = true;
        if (isSmall) isSma = true;
      });
      if (isLar && index === 0) {
        this.pickerSecond.current.getChangeValue(this.choseDate);
        this.setState({ RangeValue: [this.choseDate, ''], panelIndex: 1 });
      }
      if (isSma && index === 1) {
        this.pickerFirst.current.getChangeValue(this.choseDate);
        this.setState({ RangeValue: [this.choseDate, ''], panelIndex: 0 });
      }
    }

    this.setState({ hasNormalvalue: true });
  };
  rangeHoverChange = (obj: Object) => {
    console.time();
    const { value } = this.state;
    const { formatIsValids } = this.getIsValid(value);
    if (value[0] !== '' && !formatIsValids[0] && this.choseDate) {
      value[0] = this.choseDate;
      this.setState({ value });
    }
    if (value[1] !== '' && !formatIsValids[1] && this.choseDate) {
      value[1] = this.choseDate;
      this.setState({ value });
    }

    this.isHover = true;
    const { rangeIndex, choseValue, currentMonth, currentYear } = obj;
    const { panelIndex, panelValue, format } = this.state;

    if (rangeIndex !== panelIndex) {
      this.dirtyDate = moment()
        .set({ month: currentMonth, year: currentYear })
        .format(format);
    }
    if (rangeIndex === panelIndex) {
      this.freshPanel = false;
      if (this.dirtyDate) {
        if (panelIndex === 0) {
          this.pickerSecond.current.getChangeValue(this.dirtyDate);
        } else {
          this.pickerFirst.current.getChangeValue(this.dirtyDate);
        }
        this.setState({ RangeValue: [] });
        this.dirtyDate = '';
      } else {
        this.nowdate = moment()
          .set({ month: currentMonth, year: currentYear })
          .format(format);
        const { differFirst, differSecond } = this.getPanelDateDiffer();
        if (differFirst === 1 || differSecond === 1) {
          const { isLarge, isSmall } = this.getOutsideRange(
            currentMonth,
            currentYear,
            choseValue,
            format
          );
          if (panelIndex === 0) {
            if (isLarge) {
              this.pickerSecond.current.getChangeValue(choseValue);
              this.setState({ RangeValue: [panelValue[0], choseValue] });
              this.val = choseValue;
            } else {
              if (this.val) {
                this.pickerSecond.current.getChangeValue(this.val);
                this.setState({ RangeValue: [panelValue[0], choseValue] });
                this.val = '';
              }
            }
          }
          if (panelIndex === 1) {
            if (isSmall) {
              this.pickerFirst.current.getChangeValue(choseValue);
              this.setState({ RangeValue: [panelValue[0], choseValue] });
              this.val = choseValue;
            } else {
              if (this.val) {
                this.pickerFirst.current.getChangeValue(this.val);
                this.setState({ RangeValue: [panelValue[0], choseValue] });
                this.val = '';
              }
            }
          }
        } else {
          const { monthAndYear } = this;
          const inFirstPanel = getValueInRange(panelValue, choseValue, monthAndYear[0]);
          const inSecondPanel = getValueInRange(panelValue, choseValue, monthAndYear[1]);
          if (panelIndex === 0) {
            const freshValue = moment(monthAndYear[1], format).format(format);
            this.pickerSecond.current.getChangeValue(freshValue);

            if (inSecondPanel) {
              this.setState({ RangeValue: [panelValue[0], choseValue] });
            } else {
              this.setState({ RangeValue: [] });
            }
          }
          if (panelIndex === 1) {
            // const freshValue = moment(monthAndYear[0], format).format(format);
            // this.pickerFirst.current.getChangeValue(freshValue);
            if (inFirstPanel) {
              this.setState({ RangeValue: [panelValue[0], choseValue] });
            } else {
              this.setState({ RangeValue: [] });
            }
          }
        }
      }
    } else {
      const month = moment(choseValue, format).month();
      const year = moment(choseValue, format).year();
      const isSame = month === currentMonth && year === currentYear;
      if (this.freshPanel && !isSame) {
        this.freshPanel = false;
      }
      if (panelIndex === 0) {
        const { monthAndYear } = this;
        const firstValue = moment(monthAndYear[0], format).format(format);
        if (!this.freshPanel) {
          this.pickerFirst.current.getChangeValue(firstValue);
          this.setState({ RangeValue: [panelValue[0], choseValue] });
          if (isSame) {
            this.freshPanel = true;
          } else {
            this.freshPanel = false;
          }
        }
      } else {
        const { monthAndYear } = this;
        const secondValue = moment(monthAndYear[1], format).format(format);
        if (!this.freshPanel) {
          this.pickerSecond.current.getChangeValue(secondValue);
          this.setState({ RangeValue: [panelValue[0], choseValue] });
          if (isSame) {
            this.freshPanel = true;
          } else {
            this.freshPanel = false;
          }
        }
      }
    }
    console.timeEnd();
  };
  getCurrentYandM = (obj: Object) => {
    const { currentMonth, currentYear, index } = obj;
    const date = moment()
      .set({ month: currentMonth, year: currentYear })
      .format('YYYY-MM');
    const { monthAndYear } = this;
    monthAndYear[index] = date;
    const first = moment(monthAndYear[0]);
    const second = moment(monthAndYear[1]);
    const differ = second.diff(first, 'month');
    const differAmonth = differ === 1 || differ === 0 || first.diff(second, 'month') >= 1;
    const differAyear = differ <= 12;
    this.setState({ differAmonth, differAyear });
  };
  getPanelDateDiffer = () => {
    const { monthAndYear } = this;
    const first = moment(monthAndYear[0]);
    const second = moment(monthAndYear[1]);
    const differFirst = second.diff(first, 'month');
    const differSecond = first.diff(second, 'month');
    return {
      differFirst,
      differSecond,
    };
  };
  getOutsideRange = (currentMonth, currentYear, choseValue, format) => {
    const { maxValue, minValue } = getMaxAndMinInMonth(currentMonth, currentYear, format);
    const isLarge = getCompareRange([choseValue, maxValue], 'max', format);
    const isSmall = getCompareRange([choseValue, minValue], 'min', format);
    return { isLarge, isSmall };
  };
  removeRepeat = (arr: []) => {
    const arrobj = {};
    const newArr = arr.filter(i => {
      if (!(i in arrobj)) {
        arrobj[i] = i;
        return i;
      }
    });
    return newArr;
  };
  setTriggerVisible = (open: boolean) => {
    this.setTreePopupVisible(open);
  };
  onFocus = () => {
    const { value } = this.state;
    this.oldValue = [...value];
    this.onClickTrigger(true, 'onFocus');
    const hasNormalvalue = value[0] !== '' || value[1] !== '';
    this.setState({ hasNormalvalue });
  };
  onBlur = () => {
    const { value } = this.state;
    const { isValid } = this.getIsValid(value);
    const hasValue = value[0] !== '' || value[1] !== '';
    if (!isValid && hasValue) {
      const { rangeValue } = this;
      const hasRange = rangeValue[0] !== '' && rangeValue[1] !== '';
      const newValue = hasRange ? rangeValue : value;
      this.setState({ value: newValue });
    }
  };
  componentDidMount() {
    const { format } = this.state;
    const value = moment().format(format);
    this.normalStyleValueObj = getValueIndex(value);
  }
  render() {
    const {
      value,
      panelValue,
      panelIndex = 0,
      RangeValue,
      differAmonth,
      differAyear,
      hasNormalvalue,
    } = this.state;
    const hasValue = value[0] !== '' && value[1] !== '' && panelValue.length === 2;
    const { isHover } = this;
    const rangeValue = isHover ? RangeValue : value;
    const config = {
      prePanelIndex: this.preIndex,
      panelChoseDate: this.choseDate,
      hasValue,
      panelIndex,
      rangeValue,
      rangeHoverChange: this.rangeHoverChange,
      getCurrentYandM: this.getCurrentYandM,
      differAmonth,
      differAyear,
      setTriggerVisible: this.setTriggerVisible,
    };
    const { disabled, readOnly, theme } = this.props;
    return (
      <Trigger
        popup={
          <div>
            <SwitchPanel
              {...this.props}
              hasNormalvalue={hasNormalvalue}
              ref={this.pickerFirst}
              value={rangeValue[0]}
              onChange={this.onChangeFirst}
              index={0}
              {...config}
            />
            <SwitchPanel
              {...this.props}
              hasNormalvalue={hasNormalvalue}
              ref={this.pickerSecond}
              value={rangeValue[1]}
              onChange={this.onChangeSecond}
              index={1}
              {...config}
            />
          </div>
        }
        align="bottomLeft"
        key="trigger"
        ref={this.trigger}
        action={disabled ? [] : ['focus']}
        hideAction={['focus']}
      >
        <RangeInput
          placeholder={this.state.placeholder}
          value={value}
          onClick={this.onClickTrigger}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          disabled={disabled}
          readOnly={readOnly}
          theme={theme}
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
