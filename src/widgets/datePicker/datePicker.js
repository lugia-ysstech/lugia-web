/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import Icon from '../icon/index';
import moment from 'moment';
// import { getElementPosition } from '../utils';
import { getMinAndMax, limit, limitToSet, sortable } from '../common/Math';
import {
  Date,
  DateInput,
  Icons,
  DateWrapper,
  DateWInner,
  DateHeader,
  HeaderTop,
  HeaderTopText,
  HeaderTopArrow,
  HeaderWeekBox,
  HeaderWeek,
  DatePanel,
  DateChild,
} from './styled';
type TypeProps = {
  defaultValue?: Object,
  value?: Object,
  firstWeekday?: number,
};
type TypeState = {
  days: Array<Object>,
  weekDay: number,
  today: number,
  monthTimes: number,
  yearTime: number,
  currentYear: number,
  currentMonth: number,
  chooseDay: number,
  isHover: boolean,
  showDatePicker: boolean,
  lastDayIndexInMonth: number,
  value: Object,
  weekIndex: number,
  showDate: boolean,
  inDate: boolean,
};
class DatePicker extends Component<TypeProps, TypeState> {
  datePanel: any;
  dateChildren: any;
  dateWeeks: any;
  chooseDay: number;
  constructor(props: TypeProps) {
    super(props);
    this.datePanel = React.createRef();
    this.dateWeeks = [];
    const weeks = ['日', '一', '二', '三', '四', '五', '六'];
    const { firstWeekday } = props;
    const aheadWeek = weeks.slice(firstWeekday);
    const backWeek = weeks.slice(0, firstWeekday);
    const newWeeks = [...aheadWeek, ...backWeek];
    for (let i = 0; i < 7; i++) {
      this.dateWeeks.push(
        <HeaderWeek width={300} key={i}>
          {newWeeks[i]}
        </HeaderWeek>
      );
    }
  }

  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { defaultValue = moment().format('YYYY-MM-DD') } = nextProps;
    let { value, format } = nextProps;
    const hasValueProps = 'value' in nextProps;
    value = hasValueProps ? value : preState ? preState.value : defaultValue;
    const moments = moment(value);
    if (!preState) {
      return {
        value,
        days: [],
        weekDay: 0,
        today: moment().date(),
        choseDate: moments.date() || moment().date(),
        currentYear: moments.year() || moment().year(),
        currentMonth: moments.month() || moment().month(),
        //showDatePicker: false,
        weekIndex: 0,
        format: format || 'YYYY-MM-DD',
        showDate: false,
        inDate: false,
      };
    }
  }
  getDaysInMonth = (type: string, funName: string) => () => {
    const { currentYear, currentMonth, value, choseDate, format } = this.state;
    let year = moment(value).set('year', currentYear);
    if (type === 'year') {
      year = year[funName](1, 'year');
    }
    let moments = year.set('month', currentMonth);
    if (type === 'month') {
      moments = moments[funName](1, 'month');
    }
    this.value = moments.format(format);

    const newYear = year.year();

    const { newMonth, days, weekDay, weekIndex, lastDayIndexInMonth } = this.getDates(moments);
    const dateIndex = choseDate + weekIndex;
    const { choseDayIndex } = this.getChoseDayIndex(choseDate, weekIndex, dateIndex, value);
    console.log('choseValue', value);
    this.setState({
      days,
      weekDay,
      currentYear: newYear,
      currentMonth: newMonth,
      weekIndex,
      lastDayIndexInMonth,
      value,
      choseDayIndex,
    });
  };
  getDates = (moments: Object) => {
    const newMonth = moments.month();
    const weekDay = moments.date(1).weekday();
    const { firstWeekday = 0 } = this.props;
    let weekIndex = weekDay - firstWeekday;
    if (weekIndex < 0) {
      weekIndex = weekIndex + 7;
    }
    const days = [];
    const newMoments = moment(moments);
    const newMoment = newMoments.subtract(weekIndex, 'day');

    days.push(newMoment.date());
    for (let i = 1; i < 42; i++) {
      const nowMoment = moment(newMoment);
      days.push(nowMoment.add(i, 'day').date());
    }

    this.firstDayIndex = [];
    days.forEach((currentVal, index) => {
      currentVal === 1 && this.firstDayIndex.push(index);
    });
    this.maxDay = moments.daysInMonth();

    const lastDayIndexInMonth = weekIndex + moments.daysInMonth() - 1;
    return {
      newMonth,
      days,
      weekDay,
      weekIndex,
      lastDayIndexInMonth,
    };
  };
  onDateChange = (index: number, child: Object) => () => {
    this.setState({ inDate: false });
    const choseDate = child;
    const { weekIndex } = this.state;
    const { value } = this;
    const { choseDayIndex, choseValue } = this.getChoseDayIndex(choseDate, weekIndex, index, value);
    const currentYear = moment(choseValue).year();
    const currentMonth = moment(choseValue).month();
    this.setState(
      { value: choseValue, currentYear, currentMonth, choseDate, choseDayIndex },
      function() {
        const { showDate, inDate } = this.state;
        if (!showDate && !inDate) {
          this.getDaysInMonth()();
        }
      }
    );
  };
  getChoseDayIndex = (choseDate: number, weekIndex: number, index, value) => {
    const { format } = this.state;
    const { firstDayIndex, maxDay } = this;
    const first = firstDayIndex[0];
    const second = firstDayIndex[1];

    const moments = moment(value);

    if (choseDate > maxDay) {
      choseDate = maxDay;
    }
    let choseDayIndex = choseDate + weekIndex;
    let choseValue = getdate('add', 0);

    if (index < first) {
      choseDayIndex = index + 1;
      choseValue = getdate('subtract', 1);
    }

    if (index >= second) {
      choseDayIndex = weekIndex + choseDate;
      choseValue = getdate('add', 1);
    }

    function getdate(funName, number) {
      const newMoments = moment(moments);
      newMoments[funName](number, 'month').set('date', choseDate);
      return newMoments.format(format);
    }
    return {
      choseDayIndex,
      choseValue,
    };
  };
  onFocus = () => {
    this.setState({ showDate: true });
  };
  onBlur = () => {
    this.setState({ showDate: false });
  };
  onmouseenter = () => {
    this.setState({ inDate: true });
  };
  componentDidMount() {
    this.getDaysInMonth()();
  }

  render() {
    const {
      showDate,
      inDate,
      days,
      currentYear,
      currentMonth,
      today,
      weekIndex,
      lastDayIndexInMonth,
      value,
      choseDayIndex,
    } = this.state;

    const showDatePicker = !showDate && !inDate;
    const todayIndex = today + weekIndex;
    const dateChildren = days.map((currentValue, index) => {
      return (
        <DateChild
          width={300}
          key={index}
          onClick={this.onDateChange(index, currentValue)}
          onMouseEnter={this.onmouseenter}
          isToday={todayIndex === index + 1 ? true : false}
          outMonth={index < weekIndex || index > lastDayIndexInMonth ? true : false}
          choseDayIndex={choseDayIndex}
        >
          {currentValue}
        </DateChild>
      );
    });
    return (
      <Date>
        <Icons>
          <Icon className="lugia-icon-financial_date" />
        </Icons>
        <DateInput
          readOnly
          value={value}
          placeholder={'请选择日期'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <DateWrapper width={300} showDate={showDate} showDatePicker={showDatePicker}>
          <DateWInner width={300}>
            <DateHeader>
              <HeaderTop>
                <HeaderTopArrow position={'left'} onClick={this.getDaysInMonth('year', 'subtract')}>
                  <Icon iconClass={'lugia-icon-direction_double_right'} />{' '}
                </HeaderTopArrow>
                <HeaderTopArrow
                  position={'left'}
                  margin={20}
                  onClick={this.getDaysInMonth('month', 'subtract')}
                >
                  <Icon iconClass={'lugia-icon-direction_Left'} />
                </HeaderTopArrow>
                <HeaderTopText>{currentYear}年</HeaderTopText>
                <HeaderTopText>{currentMonth + 1}月</HeaderTopText>
                <HeaderTopArrow position={'right'} onClick={this.getDaysInMonth('year', 'add')}>
                  <Icon iconClass={'lugia-icon-direction_double_left'} />{' '}
                </HeaderTopArrow>
                <HeaderTopArrow
                  position={'right'}
                  margin={20}
                  onClick={this.getDaysInMonth('month', 'add')}
                >
                  <Icon iconClass={'lugia-icon-direction_right'} />{' '}
                </HeaderTopArrow>
              </HeaderTop>
              <HeaderWeekBox>{this.dateWeeks}</HeaderWeekBox>
            </DateHeader>
            <DatePanel innerRef={this.datePanel}>{dateChildren}</DatePanel>
          </DateWInner>
        </DateWrapper>
      </Date>
    );
  }
}
export default DatePicker;
