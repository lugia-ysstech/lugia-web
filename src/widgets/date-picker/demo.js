/**
 *
 * create by wangcuixia
 *
 * create date: 2018/07/018
 *
 */
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker, { momentConfig } from './index';
import Theme from '../theme';
import Widget from '../consts/index';
const { MonthPicker, YearPicker, WeekPicker, WeeksPicker, RangePicker, TimePicker } = DatePicker;

//如需指定周开始是星期几，请配置momentConfig，此函数接受一个number类型参数，表示周开始是星期几
const firstWeekDay = 1;
momentConfig(firstWeekDay);
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
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Date</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>date-normal-selectToday-theme</h2>
            <Theme config={{ [Widget.DatePicker]: { width: 200, color: '#e05959' } }}>
              <DatePicker
                selectToday
                showToday
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
            <h2>Year-normal-theme</h2>
            <Theme config={{ [Widget.YearPicker]: { width: 400 } }}>
              <YearPicker
                onChange={this.onChange}
                step={10}
                extraFooter={{ message: 'extraFooter' }}
                buttonOptions={{
                  options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
                }}
              />
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
              <WeeksPicker defaultValue={'2022-01'} step={10} onChange={this.onChange} />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>weeks-defaultValue</h2>
            <WeeksPicker
              defaultValue={'2021-05'}
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
              selectToday={true}
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
            <h2>week-normal</h2>
            <Theme config={{ [Widget.WeekPicker]: { width: 400 } }}>
              <WeekPicker
                onChange={this.onChange}
                showToday
                step={10}
                buttonOptions={{
                  options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
                }}
              />
            </Theme>
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
            <Theme>
              <RangePicker onChange={this.onChange} />
            </Theme>
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
          <h2 style={{ margin: '10px' }}>event</h2>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>DatePicker</h2>
            <Theme config={{ [Widget.WeeksPicker]: { width: 400 } }}>
              <DatePicker
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                showToday
                showTime
                onOk={this.onOk}
              />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>YearPicker</h2>
            <Theme config={{ [Widget.WeeksPicker]: { width: 400 } }}>
              <YearPicker
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                showToday
                showTime
                buttonOptions={{
                  options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
                }}
                extraFooter={{ message: 'extraFooter' }}
                onOk={this.onOk}
              />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>MonthPicker</h2>
            <Theme config={{ [Widget.WeeksPicker]: { width: 400 } }}>
              <MonthPicker
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                showToday
                showTime
                buttonOptions={{
                  options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
                }}
                extraFooter={{ message: 'extraFooter' }}
                onOk={this.onOk}
              />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>WeeksPicker</h2>
            <Theme config={{ [Widget.WeeksPicker]: { width: 400 } }}>
              <WeeksPicker
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                showToday
                showTime
                buttonOptions={{
                  options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
                }}
                extraFooter={{ message: 'extraFooter' }}
                onOk={this.onOk}
              />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2>WeekPicker</h2>
            <Theme config={{ [Widget.WeeksPicker]: { width: 400 } }}>
              <WeekPicker
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                showToday
                showTime
                buttonOptions={{
                  options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
                }}
                extraFooter={{ message: 'extraFooter' }}
                onOk={this.onOk}
              />
            </Theme>
          </div>
          <div style={{ float: 'left', marginRight: '30px' }}>
            <h2> RangePicker</h2>
            <Theme config={{ [Widget.WeeksPicker]: { width: 400 } }}>
              <RangePicker
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                showTime
                buttonOptions={{
                  options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
                }}
                extraFooter={{ message: 'extraFooter' }}
                onOk={this.onOk}
              />
            </Theme>
          </div>
        </div>

        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>date-normal-theme5656</h2>
          <Theme config={{ [Widget.DatePicker]: { width: 200, color: '#e05959' } }}>
            <DatePicker
              showToday
              showTime={function s() {}}
              buttonOptions={{
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
              onOk={{ message: 'onOk', Function: this.onOk }}
              showTime
              buttonOptions={{
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
            <DatePicker showToday showTime />
          </Theme>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>date-normal-theme</h2>
          <Theme>
            <DatePicker showToday showTime />
          </Theme>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>date-normal-theme</h2>
          <Theme>
            <DatePicker showToday showTime />
          </Theme>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>weeks-normal-Theme</h2>
          <Theme config={{ [Widget.WeeksPicker]: { width: 400 } }}>
            <WeeksPicker defaultValue={'2018-90'} />
          </Theme>
        </div>
      </div>
    );
  }
}
