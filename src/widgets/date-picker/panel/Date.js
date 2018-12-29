/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import Icon from '../../icon/index';
import WeekDays from './week';
import { modeStyle } from '../utils/booleanUtils';
import { getFirstDayIndex, getYandM, getDatesfromWeeks } from '../utils/differUtils';
import Dates from './DatePanel';
import {
  DateHeader,
  DateWrapper,
  HeaderTop,
  HeaderTopArrow,
  HeaderTopText,
} from '../styled/styled';
import moment from 'moment';
type TypeProps = {
  value?: string,
  firstWeekDay?: number,
  format?: string,
  lang?: string,
  onChange: Function,
  setTriggerVisible?: Function,
  getCurrentYandM?: Function,
  changeHead?: Function,
  mode: string,
  showToday?: boolean,
  showTime?: any,
  selectToday?: boolean,
  weeks?: number,
  getMode: Function,
  index?: number,
  panelChoseDate?: string,
  rangeValue?: Array<string>,
  isFollow?: boolean,
  differAmonth?: boolean,
  differAyear?: boolean,
  theme?: Object,
  panelStates: Object,
  choseDayIndex: Array<number> | number | string,
};
type TypeState = {
  days: Array<number>,
  dates: Array<string>,
  weekDay: number,
  firstWeekDay: number,
  today: number,
  noToday: boolean,
  year: number,
  month: number,
  lastDayIndexInMonth: number,
  value: string,
  weekIndex: number,
  choseDate: number,
  format: string,
  choseDayIndex: number,
  mode: string,
  startInWeeks: number,
  endInWeeks: number,
  weekHoverStart?: number | string,
  weekHoverEnd?: number | string,
  maxDay: number,
  choseDayIndex: number | Array<number>,
};

class Date extends Component<TypeProps, TypeState> {
  static displayName = 'Date';
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { panelStates } = nextProps;
    const weekHoverStart = preState ? preState.weekHoverStart : '';
    const weekHoverEnd = preState ? preState.weekHoverEnd : '';
    return {
      ...panelStates,
      weekHoverStart,
      weekHoverEnd,
    };
  }
  getDaysInMonth = (type: string, funName: string) => () => {
    const { value } = this.state;
    const { format } = this.state;
    const { mode } = this.props;
    const { isWeeks } = modeStyle(mode);
    const newFormat = isWeeks ? 'YYYY-MM-DD' : format;
    const moments: Object = moment(value, newFormat);
    if (type === 'year') {
      moments[funName]({ year: 1 });
    }
    if (type === 'month') {
      moments[funName]({ month: 1 });
    }
    const { changeHead } = this.props;
    const newValue = moments.format(newFormat);
    changeHead && changeHead(newValue);
  };
  onDateChange = (obj: Object) => {
    const { choseValue, event } = obj;
    const { onChange } = this.props;
    onChange && onChange({ event, newValue: choseValue, action: 'click' });
  };
  onChangeYear = () => {
    this.getMode('year', 'date');
  };
  onChangeMonth = () => {
    this.getMode('month', 'date');
  };
  onChangeWeek = () => {
    this.getMode('week', 'date');
  };
  getMode = (mode: string, from: string) => {
    const { getMode } = this.props;
    getMode && getMode({ mode, from });
  };
  onMouseOver = (index: number, child: number) => {
    const { days, value } = this.state;
    const { firstDayIndex } = getFirstDayIndex(days);
    const getYandMParams = {
      index,
      child,
      val: value,
      mode: this.props.mode,
      firstDayIndex,
      props: this.state,
    };
    const { choseValue } = getYandM(getYandMParams);
    const { weekIndex } = this.state;
    const moments = moment(choseValue, 'YYYY-MM-DD');
    const { endInWeeks, startInWeeks } = getDatesfromWeeks(moments, weekIndex, index);
    this.setState({
      weekHoverStart: startInWeeks,
      weekHoverEnd: endInWeeks,
    });
  };
  onMouseOut = () => {
    this.setState({
      weekHoverStart: '',
      weekHoverEnd: '',
    });
  };

  render() {
    const { year, month } = this.state;
    const { firstWeekDay, maxDay, value } = this.state;
    const { lang, mode } = this.props;
    const { index, differAmonth, differAyear, theme, choseDayIndex } = this.props;
    const { days } = this.state;
    const { firstDayIndex } = getFirstDayIndex(days);
    console.log(days);
    return (
      <DateWrapper {...theme} mode={mode}>
        <div>
          <DateHeader>
            <HeaderTop {...theme}>
              {differAyear && index === 1 ? (
                ''
              ) : (
                <HeaderTopArrow
                  position={'left'}
                  {...theme}
                  onClick={this.getDaysInMonth('year', 'subtract')}
                >
                  <Icon iconClass={'lugia-icon-direction_double_right'} />
                </HeaderTopArrow>
              )}
              {differAmonth && index === 1 ? (
                ''
              ) : (
                <HeaderTopArrow
                  position={'left'}
                  {...theme}
                  margin={20}
                  onClick={this.getDaysInMonth('month', 'subtract')}
                >
                  <Icon iconClass={'lugia-icon-direction_Left'} />
                </HeaderTopArrow>
              )}

              <HeaderTopText {...theme} onClick={this.onChangeYear}>
                {year}年
              </HeaderTopText>
              <HeaderTopText {...theme} onClick={this.onChangeMonth}>
                {month + 1}月
              </HeaderTopText>
              {differAyear && index === 0 ? (
                ''
              ) : (
                <HeaderTopArrow
                  position={'right'}
                  {...theme}
                  onClick={this.getDaysInMonth('year', 'add')}
                >
                  <Icon iconClass={'lugia-icon-direction_double_left'} />
                </HeaderTopArrow>
              )}
              {differAmonth && index === 0 ? (
                ''
              ) : (
                <HeaderTopArrow
                  position={'right'}
                  {...theme}
                  margin={20}
                  onClick={this.getDaysInMonth('month', 'add')}
                >
                  <Icon iconClass={'lugia-icon-direction_right'} />
                </HeaderTopArrow>
              )}
            </HeaderTop>
            <WeekDays
              firstWeekDay={firstWeekDay}
              lang={lang}
              onChangeWeek={this.onChangeWeek}
              {...theme}
              mode={this.props.mode}
            />
          </DateHeader>
          <Dates
            {...this.props}
            {...this.state}
            mode={this.props.mode}
            {...theme}
            firstDayIndex={firstDayIndex}
            choseDayIndex={choseDayIndex}
            maxDay={maxDay}
            value={value}
            onDateChange={this.onDateChange}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
          />
        </div>
      </DateWrapper>
    );
  }
}
export default Date;
