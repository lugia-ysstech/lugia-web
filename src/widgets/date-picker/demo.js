/**
 *
 * create by wangcuixia
 *
 * create date: 2018/07/018
 *
 */
import React, { Component } from 'react';
import moment from 'moment';
//import { Date, Years, Months, Week } from './index';
import Head from './Head';
import FacePanel from './FacePanel';
import DatePicker from './index';
import Date from './Date';
import SwitchPanel from './SwitchPanel';
import SingleRange from './SingleRange';
import RangeInput from './RangeInput';
import Theme from '../theme';
import Widget from '../consts/index';
const {
  MonthPicker,
  YearPicker,
  WeekPicker,
  WeeksPicker,
  RangePicker,
  TimePicker,
  Time,
} = DatePicker;

export default class Sl extends Component<any> {
  constructor() {
    super();
    this.state = {
      currentValue: 0,
      btnWidth: 20,
      disabled: false,
      v: moment().year(),
      cv: moment().year(),
    };
  }
  onChange = (obj: Object) => {
    console.log(obj);
  };
  render() {
    const dateFormate = 'YYYY年MM月DD日';
    const monthFormate = 'YYYY年MM月';
    return (
      <div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Date</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-normal</h2>
            <DatePicker />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-defaultValue</h2>
            <DatePicker
              defaultValue={'2015年02月03日'}
              format={dateFormate}
              onChange={this.onChange}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-value</h2>
            <DatePicker value={'2015年02月03日'} onChange={this.onChange} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-readOnly</h2>
            <DatePicker defaultValue={'2015年02月03日'} readOnly />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-disabled</h2>
            <DatePicker defaultValue={'2015年02月03日'} disabled />
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Year</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>Year-normal</h2>
            <YearPicker />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>Year-defaultValue</h2>
            <YearPicker defaultValue={'2015-02-03'} format={'YYYY年'} onChange={this.onChange} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>Year-value</h2>
            <YearPicker value={'2015-02-03'} onChange={this.onChange} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>Year-value-default</h2>
            <YearPicker value={'2015-02-03'} defaultValue={'2015-06-06'} format={'YYYY年'} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>Year-readOnly</h2>
            <YearPicker defaultValue={'2015-06-06'} readOnly />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>Year-disabled</h2>
            <YearPicker defaultValue={'2015-06-06'} disabled />
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Month</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>month-normal</h2>
            <MonthPicker />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>month-defaultValue</h2>
            <MonthPicker defaultValue={'2015-02-03'} onChange={this.onChange} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>month-value</h2>
            <MonthPicker
              value={'2015-02-03'}
              defaultValue={'2015-06-03'}
              onChange={this.onChange}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>month-readOnly</h2>
            <MonthPicker defaultValue={'2015-02-03'} readOnly />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>month-disabled</h2>
            <MonthPicker defaultValue={'2015-02-03'} disabled />
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Weeks</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>weeks-defaultValue</h2>
            <WeeksPicker
              defaultValue={'2014-10'}
              format={'YYYY年第WW周'}
              firstWeekDay={6}
              showToday={true}
              onChange={this.onChange}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>weeks-value</h2>
            <WeeksPicker
              value={'2014-10'}
              format={'YYYY年第WW周'}
              firstWeekDay={6}
              showToday={true}
              onChange={this.onChange}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>weeks-disabled</h2>
            <WeeksPicker defaultValue={'2014-10'} format={'YYYY年第WW周'} disabled />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>weeks-readOnly</h2>
            <WeeksPicker defaultValue={'2014-10'} format={'YYYY年第WW周'} readOnly />
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Week</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>week</h2>
            <WeekPicker />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>week-defaultValue</h2>
            <WeekPicker defaultValue={'2015-01周'} onChange={this.onChange} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>week-value</h2>
            <WeekPicker value={'2015-01周'} onChange={this.onChange} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>week-readOnly</h2>
            <WeekPicker defaultValue={'2015-01周'} readOnly />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>week-disabled</h2>
            <WeekPicker defaultValue={'2015-01周'} disabled />
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Range</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>RangePicker-normal</h2>
            <RangePicker />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>RangePicker-defaultValue </h2>
            <RangePicker
              defaultValue={['2015年02月03日', '2015年03月03日']}
              placeholder={['开始日期', '结束日期']}
              format={'YYYY-MM-DD'}
              onChange={this.onChange}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>RangePicker-value </h2>
            <RangePicker
              value={['2015年02月03日', '2015年03月03日']}
              placeholder={['开始日期', '结束日期']}
              onChange={this.onChange}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>RangePicker-readOnly </h2>
            <RangePicker
              value={['2015年02月03日', '2015年03月03日']}
              placeholder={['开始日期', '结束日期']}
              readOnly
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>RangePicker-disabled </h2>
            <RangePicker
              defaultValue={['2015年02月03日', '2015年03月03日']}
              placeholder={['开始日期', '结束日期']}
              disabled
            />
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Times</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>TimePicker-normal</h2>
            <Theme config={{ [Widget.TimePicker]: { width: 300 } }}>
              <TimePicker />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>TimePicker-defaultValue</h2>
            <Theme config={{ [Widget.TimePicker]: { width: 300 } }}>
              <TimePicker defaultValue={'0时03分04秒'} onChange={this.onChange} />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>TimePicker-value</h2>
            <Theme config={{ [Widget.TimePicker]: { width: 300 } }}>
              <TimePicker value={'0时03分04秒'} format={'HH时mm分ss秒'} onChange={this.onChange} />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>TimePicker-readOnly</h2>
            <Theme config={{ [Widget.TimePicker]: { width: 300 } }}>
              <TimePicker defaultValue={'0时03分04秒'} readOnly />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>TimePicker-disabled</h2>
            <Theme config={{ [Widget.TimePicker]: { width: 300 } }}>
              <TimePicker defaultValue={'0时03分04秒'} disabled />
            </Theme>
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>TimePanel</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>Time</h2>
            <Theme config={{ [Widget.Time]: { width: 200 } }}>
              <Time />
            </Theme>
          </div>
        </div>
      </div>
    );
  }
}
