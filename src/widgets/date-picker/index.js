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
import DatePicker from './DateInput';
import Month from './MonthPicker';
import Year from './YearPicker';
import Week from './WeekPicker';
console.log(Month);
DatePicker.MonthPicker = Month;
DatePicker.YearPicker = Year;
DatePicker.WeekPicker = Week;
//export default ThemeProvider(DatePicker, Widget.DatePicker);
export default DatePicker;
