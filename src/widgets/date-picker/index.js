/**
 *
 * create by wangcuixia
 *
 * create date: 2018/04/09
 *
 * @flow
 */
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import DatePicker from './DatePicker';
import YearPicker from './YearPicker';
import MonthPicker from './MonthPicker';
import WeekPicker from './WeekPicker';
import WeeksPicker from './WeeksPicker';
import RangePicker from './RangePicker';
import Time from './TimeSiglePicker';
import TimePicker from './TimePicker';
//import Month from './MonthPicker';
// import Year from './YearPicker';
// import Week from './WeekPicker';
//console.log(Month);
DatePicker.MonthPicker = MonthPicker;
DatePicker.YearPicker = YearPicker;
DatePicker.WeekPicker = WeekPicker;
DatePicker.WeeksPicker = WeeksPicker;
DatePicker.RangePicker = RangePicker;
DatePicker.TimePicker = TimePicker;
DatePicker.Time = Time;
//export default ThemeProvider(DatePicker, Widget.DatePicker);
export default DatePicker;

// export const Date=DatePicker;
// export const Years=YearPicker;
// export const Months=MonthPicker;
// export const Week=WeekPicker;
