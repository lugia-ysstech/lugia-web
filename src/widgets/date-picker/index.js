/**
 *
 * create by wangcuixia
 *
 * create date: 2018/04/09
 *
 */
import DatePicker from './picker/DatePicker';
import YearPicker from './picker/YearPicker';
import MonthPicker from './picker/MonthPicker';
import WeekPicker from './picker/WeekPicker';
import WeeksPicker from './picker/WeeksPicker';
import RangePicker from './picker/RangePicker';
import TimePicker from '../time-picker/TimePicker';
import { setMomentLocal } from './momentConfig';
DatePicker.MonthPicker = MonthPicker;
DatePicker.YearPicker = YearPicker;
DatePicker.WeekPicker = WeekPicker;
DatePicker.WeeksPicker = WeeksPicker;
DatePicker.RangePicker = RangePicker;
DatePicker.TimePicker = TimePicker;

export default DatePicker;
export function momentConfig(number: number) {
  setMomentLocal(number);
}
