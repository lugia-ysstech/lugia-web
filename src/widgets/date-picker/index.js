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
import DatePicker from './picker/DatePicker';
import YearPicker from './picker/YearPicker';
import MonthPicker from './picker/MonthPicker';
import WeekPicker from './picker/WeekPicker';
import WeeksPicker from './picker/WeeksPicker';
import RangePicker from './picker/RangePicker';
import TimePicker from './picker/TimePicker';
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
//export default ThemeProvider(DatePicker, Widget.DatePicker);
export default DatePicker;

// export const Date=DatePicker;
// export const Years=YearPicker;
// export const Months=MonthPicker;
// export const Week=WeekPicker;
