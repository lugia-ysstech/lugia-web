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
import DatePicker from './index';
import Theme from '../theme';
import Widget from '../consts/index';
import SwitchPanel from './switchPanel/SwitchPanel';
import { setMomentLocal } from './momentConfig';
const { MonthPicker, YearPicker, WeekPicker, WeeksPicker, RangePicker, TimePicker } = DatePicker;

//组件的部分local是从组件的属性中读取的，所以请先正确设置moment的local
const firstWeekDay = 1;
setMomentLocal(firstWeekDay);
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
    console.log('onChange', obj);
  };
  onFocus = () => {
    console.log('onFocus');
  };
  onBlur = () => {
    console.log('onBlur');
  };
  onOk = () => {
    console.log('onOk');
  };
  render() {
    const dateFormate = 'YYYY年MM月DD日';
    return (
      <div>
        {/* <SwitchPanel defaultValue={'2015-02-03'} />
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>date-normal-theme</h2>
          <Theme config={{ [Widget.DatePicker]: { width: 200, color: '#e05959' } }}>
            <DatePicker
              showToday
              onOk={{ message: 'onOk', Function: this.onOk }}
              showTime={{message:{showTime:'选择时间',showDate:'选择日期'}}}
              ButtonOptions={{
                options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
              }}
              extraFooter={{ message: 'extraFooter' }}
              format={'YYYY-MM-DD HH:mm:ss'}
            />
          </Theme>
          </div> */}
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Date</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-normal-selectToday-theme</h2>
            <Theme config={{ [Widget.DatePicker]: { width: 200, color: '#e05959' } }}>
              <DatePicker
                selectToday
                showToday
                firstWeekDay={firstWeekDay}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                defaultValue={'2018-02-03'}
              />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-defaultValue</h2>
            <DatePicker
              defaultValue={'2015年02月03日'}
              format={dateFormate}
              onChange={this.onChange}
              firstWeekDay={firstWeekDay}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-value</h2>
            <DatePicker
              value={'2015年02月03日'}
              firstWeekDay={firstWeekDay}
              onChange={this.onChange}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-readOnly</h2>
            <DatePicker defaultValue={'2015年02月03日'} firstWeekDay={firstWeekDay} readOnly />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-disabled</h2>
            <DatePicker defaultValue={'2015年02月03日'} firstWeekDay={firstWeekDay} disabled />
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Year</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>Year-normal-theme</h2>
            <Theme config={{ [Widget.YearPicker]: { width: 400 } }}>
              <YearPicker onChange={this.onChange} step={10} />
            </Theme>
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
            <h2>month-normal-theme</h2>
            <Theme config={{ [Widget.MonthPicker]: { width: 400 } }}>
              <MonthPicker onChange={this.onChange} />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>month-defaultValue</h2>
            <MonthPicker defaultValue={'2015-02-03'} onChange={this.onChange} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>month-value</h2>
            <MonthPicker
              value={'2015-05'}
              onChange={this.onChange}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
              lang={'en'}
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
            <h2>weeks-normal-Theme</h2>
            <Theme config={{ [Widget.WeeksPicker]: { width: 400 } }}>
              <WeeksPicker
                firstWeekDay={firstWeekDay}
                defaultValue={'2022-01'}
                onChange={this.onChange}
              />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>weeks-defaultValue</h2>
            <WeeksPicker
              defaultValue={'2021-05'}
              firstWeekDay={firstWeekDay}
              format={'YYYY-WW'}
              selectToday={true}
              onChange={this.onChange}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>weeks-value</h2>
            <WeeksPicker
              value={'2014-10'}
              format={'YYYY年第WW周'}
              firstWeekDay={firstWeekDay}
              selectToday={true}
              onChange={this.onChange}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>weeks-disabled</h2>
            <WeeksPicker
              defaultValue={'2014-10'}
              format={'YYYY年第WW周'}
              firstWeekDay={firstWeekDay}
              disabled
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>weeks-readOnly</h2>
            <WeeksPicker
              defaultValue={'2014-10'}
              format={'YYYY年第WW周'}
              firstWeekDay={firstWeekDay}
              readOnly
            />
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Week</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>week-normal</h2>
            <Theme config={{ [Widget.WeekPicker]: { width: 400 } }}>
              <WeekPicker firstWeekDay={firstWeekDay} onChange={this.onChange} />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>week-defaultValue</h2>
            <WeekPicker
              defaultValue={'2015-01周'}
              firstWeekDay={firstWeekDay}
              onChange={this.onChange}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>week-value</h2>
            <WeekPicker value={'2015-01周'} firstWeekDay={firstWeekDay} onChange={this.onChange} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>week-readOnly</h2>
            <WeekPicker defaultValue={'2015-01周'} firstWeekDay={firstWeekDay} readOnly />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>week-disabled</h2>
            <WeekPicker defaultValue={'2015-01周'} firstWeekDay={firstWeekDay} disabled />
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Range</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>RangePicker-normal</h2>
            <Theme>
              <RangePicker firstWeekDay={firstWeekDay} onChange={this.onChange} />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>RangePicker-defaultValue </h2>
            <RangePicker
              defaultValue={['2015年02月03日', '2015年03月03日']}
              placeholder={['开始日期', '结束日期']}
              format={'YYYY-MM-DD'}
              onChange={this.onChange}
              firstWeekDay={firstWeekDay}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>RangePicker-value </h2>
            <RangePicker
              value={['2015年02月03日', '2015年03月03日']}
              placeholder={['开始日期', '结束日期']}
              onChange={this.onChange}
              firstWeekDay={firstWeekDay}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>RangePicker-readOnly </h2>
            <RangePicker
              value={['2015年02月03日', '2015年03月03日']}
              placeholder={['开始日期', '结束日期']}
              readOnly
              firstWeekDay={firstWeekDay}
            />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>RangePicker-disabled </h2>
            <RangePicker
              defaultValue={['2015年02月03日', '2015年03月03日']}
              placeholder={['开始日期', '结束日期']}
              disabled
              firstWeekDay={firstWeekDay}
            />
          </div>
        </div>
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Times</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>TimePicker-normal</h2>
            <Theme config={{ [Widget.TimePicker]: { width: 500 } }}>
              <TimePicker onChange={this.onChange} />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>TimePicker-defaultValue</h2>
            <TimePicker defaultValue={'0时03分04秒'} onChange={this.onChange} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>TimePicker-value</h2>
            <TimePicker value={'0时03分04秒'} format={'HH时mm分ss秒'} onChange={this.onChange} />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>TimePicker-readOnly</h2>
            <TimePicker defaultValue={'0时03分04秒'} readOnly />
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>TimePicker-disabled</h2>
            <TimePicker defaultValue={'0时03分04秒'} disabled />
          </div>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>RangePicker-normal</h2>
          <Theme>
            <RangePicker
              defaultValue={['2015-02-03 12:02:00', '2015-02-04 00:08:01']}
              firstWeekDay={firstWeekDay}
              showToday
              showTime={{}}
              ButtonOptions={{
                options: {
                  today: ['2015-02-03 00:00:00', '2015-03-03 00:00:00'],
                  此刻: ['2015-02-05 00:00:00', '2015-04-06 00:00:00'],
                },
              }}
              extraFooter={{ message: 'extraFooter' }}
              format={'YYYY-MM-DD HH:mm:ss'}
            />
          </Theme>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>date-normal-theme5656</h2>
          <Theme config={{ [Widget.DatePicker]: { width: 200, color: '#e05959' } }}>
            <DatePicker
              showToday
              firstWeekDay={firstWeekDay}
              showTime={function s() {}}
              ButtonOptions={{
                options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
              }}
              extraFooter={{ message: 'extraFooter' }}
              format={'YYYY-MM-DD HH:mm:ss'}
            />
          </Theme>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>date-normal-theme</h2>
          <Theme config={{ [Widget.DatePicker]: { width: 200, color: '#e05959' } }}>
            <DatePicker
              showToday
              firstWeekDay={firstWeekDay}
              onOk={{ message: 'onOk', Function: this.onOk }}
              showTime
              ButtonOptions={{
                options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
              }}
              extraFooter={{ message: 'extraFooter' }}
              format={'YYYY-MM-DD HH:mm:ss'}
            />
          </Theme>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>date-normal-theme344</h2>
          <Theme>
            <DatePicker firstWeekDay={firstWeekDay} showToday showTime />
          </Theme>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>date-normal-theme</h2>
          <Theme>
            <DatePicker firstWeekDay={firstWeekDay} showToday showTime />
          </Theme>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>date-normal-theme</h2>
          <Theme>
            <DatePicker firstWeekDay={firstWeekDay} showToday showTime />
          </Theme>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>weeks-normal-Theme</h2>
          <Theme config={{ [Widget.WeeksPicker]: { width: 400 } }}>
            <WeeksPicker defaultValue={'2018-90'} firstWeekDay={firstWeekDay} />
          </Theme>
        </div>
      </div>
    );
  }
}
