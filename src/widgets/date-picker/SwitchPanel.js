/*
* by wangcuixia
* @flow
* */
import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Date from './Date';
import Month from './Month';
import Year from './Year';
import Weeks from './Weeks';
import { modeStyle, getDerivedForInput } from './getDerived';
const moment = require('moment');
type TypeProps = {
  defaultValue?: string,
  format?: string,
  value?: string,
  onChange?: Function,
  mode: string,
  setTriggerVisible?: boolean,
};
type TypeState = {
  value: string,
  format: string,
  mode: string,
  from: string,
  changeYear: boolean,
  choseValue: string,
  isChose: boolean,
  month: number,
  year: number,
  weeks: number,
  date: string,
  newDate: string,
  moments: Object,
  weeksYear: number,
};
class SwitchPanel extends Component<TypeProps, TypeState> {
  trigger: any;
  picker: any;
  constructor(props: TypeProps) {
    super(props);
    this.trigger = React.createRef();
    this.picker = React.createRef();
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { mode } = nextProps;
    const { format, value, hasValueProps } = getDerivedForInput(nextProps, preState);
    const mod = 'mode' in nextProps ? mode || (preState && preState.mode) : 'date';
    if (!preState) {
      return {
        value,
        format,
        mode: mod,
        from: 'date',
        changeYear: false,
        choseValue: '',
        isChose: false,
      };
    }
    if (hasValueProps) {
      return {
        value,
        choseValue: (preState && preState.choseValue) || '',
        isChose: (preState && preState.isChose) || false,
      };
    }
  }
  getMode = (obj: Object) => {
    const { mode, from, year, month, weeks, date, moments } = obj;
    const { format } = this.state;
    const newDate = moment(date, format)
      .set({ year, month, weeks })
      .format('YYYY-MM-DD');
    this.setState({ mode, from, year, month, newDate, weeks, date }, () => {
      this.picker.current.getFreshPicker({ moments });
    });
    const { isRange } = modeStyle(this.props.mode);
    if (isRange) {
      this.setTriggerVisible(true);
    }
  };
  setTriggerVisible = (open: boolean) => {
    const { setTriggerVisible } = this.props;
    setTriggerVisible && setTriggerVisible(open);
  };
  render() {
    const { value, mode, from } = this.state;
    const { isWeek, isMonth, isYear, isRange } = modeStyle(mode);
    const config = {
      ...this.props,
      ref: this.picker,
      newValue: value,
      from,
    };
    const { hasNormalvalue } = this.props;
    let isHasNormalValue;
    if (isRange) {
      isHasNormalValue = hasNormalvalue;
    } else {
      isHasNormalValue = value ? true : false;
    }
    return isYear ? (
      <Year {...config} onChange={this.changeYear} />
    ) : isMonth ? (
      <Month {...config} onChange={this.changeMonth} onChangeYear={this.monthChangeYear} />
    ) : isWeek ? (
      <Weeks {...config} onChange={this.changeWeek} onChangeYear={this.weekChangeYear} />
    ) : (
      <Date
        {...config}
        isHasNormalValue={isHasNormalValue}
        onChange={this.onChange}
        getMode={this.getMode}
        setTriggerVisible={this.setTriggerVisible}
      />
    );
  }
  changeYear = (obj: Object) => {
    const { newValue, mode, from } = obj;
    const { weeks, date } = this.state;
    let { value, month } = this.state;
    if (!value) {
      value = moment().format('YYYY-MM-DD');
    }
    const { isYear } = modeStyle(this.props.mode);
    const newDate = moment(date).date();
    const moments = moment().set({ year: newValue, month, weeks, date: newDate });
    this.setState({ year: newValue, mode, moments, weeksYear: '' }, () => {
      this.getFreshPicker({ moments, mode, from, come: 'year' });
    });
    if (isYear) {
      this.setState({ value: newValue });
      this.publicOnchange({ newValue, openTriger: false, action: 'click' });
    }
  };
  changeMonth = (obj: Object) => {
    const { newValue, mode } = obj;
    let { format } = this.state;
    let { value } = this.state;
    if (!value) {
      value = moment().format('YYYY-MM-DD');
    }
    const { isMonth, isWeeks } = modeStyle(this.props.mode);
    if (mode === 'week' || isWeeks) {
      format = 'YYYY-MM-DD';
    }
    const newDate = moment(value).date();
    const year = moment(newValue, format).year();
    const month = moment(newValue, format).month();
    const maxDate = moment()
      .set({ month })
      .daysInMonth();
    const currentDate = newDate > maxDate ? maxDate : newDate;
    const moments = moment().set({ date: currentDate, year, month });
    const choseValue = moments.format(format);
    this.setState({ month, year, mode: 'date', moments, choseValue }, () => {
      this.getFreshPicker({ moments });
    });
    if (isMonth) {
      this.setState({ value: moment(newValue, format).format(format) });
      const newVal = moment(newValue, format).format(format);
      this.publicOnchange({ newValue: newVal, openTriger: false });
    }
  };
  monthChangeYear = (obj: Object) => {
    const { newValue, mode, from } = obj;
    const moments = moment(newValue, 'YYYY-MM');
    const year = moments.year();
    const month = moments.month();
    this.setState({ year, month, mode, from, moments }, () => {
      this.getFreshPicker({ moments });
    });
  };
  changeWeek = (obj: Object) => {
    const { newValue, year, weeks } = obj;
    const { isWeek } = modeStyle(this.props.mode);
    const moments = moment().set({ year, weeks });
    this.setState({ year, mode: 'date', moments, choseValue: '', from: 'week' }, () => {
      if (!isWeek) {
        this.getChangeValue(newValue);
        this.getFreshPicker({ moments });
      }
      if (isWeek) {
        this.setState({ value: newValue });
        this.publicOnchange({ newValue, openTriger: false, action: 'click' });
      }
    });
  };
  weekChangeYear = (obj: Object) => {
    const { mode, from, weeks, year } = obj;
    const moments = moment().set({ year, weeks });
    this.setState({ year, weeks, mode, from, moments }, () => {
      this.getFreshPicker({ moments, mode, from });
    });
  };
  onChange = (param: ChangeEventParam) => {
    const { newValue, choseValue, weeks } = param;
    const moments = moment(moment(choseValue || newValue));
    const year = moments.year();
    const month = moments.month();
    const { isRange, isWeeks } = modeStyle(this.props.mode);
    this.setState(
      {
        value: newValue,
        year,
        weeks,
        month,
        changeYear: false,
        moments,
        isChose: true,
        weeksYear: isWeeks ? param.year : '',
      },
      () => {
        const { inRange } = param;
        if (isRange && !inRange) {
          return;
        }
        this.getChangeValue(newValue);
        this.getFreshPicker({ moments });
      }
    );
    this.publicOnchange({ ...param, openTriger: false });
  };
  publicOnchange = (obj: Object) => {
    const { onChange } = this.props;
    onChange && onChange(obj);
  };
  onFocus = () => {
    const { value, choseValue, format, weeksYear } = this.state;
    const { mode } = this.props;
    const { isWeeks } = modeStyle(mode);
    if (isWeeks) {
      const newYear = !weeksYear ? moment(value, format).year() : weeksYear;
      this.setState({ weeksYear: newYear }, () => {
        this.getChangeValue(value || choseValue);
      });
    } else {
      this.getChangeValue(value || choseValue);
    }
  };
  getChangeValue = (value: string) => {
    console.log(value);
    let { format, from } = this.state;
    const { mode } = this.props;
    const { isDate } = modeStyle(mode);
    if (isDate && from === 'week') {
      format = 'YYYY-WW';
    }
    const moments = value ? moment(value, format) : moment();
    console.log(moments.format(format));
    this.setState({ mode, from: mode }, () => {
      this.getFreshPicker({ moments, mode, from: mode });
    });
  };
  getFreshPicker = (obj: Object) => {
    const { moments } = obj;
    const { value, year, weeksYear } = this.state;
    const isValid = moments.isValid();
    isValid && this.picker.current.getFreshPicker({ moments, value, year: weeksYear || year });
  };
}
export default SwitchPanel;
