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
import NumberInput from '../number-input';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import Input from '../input';
import TimePicker from '../time-picker/TimePicker';
const { MonthPicker, YearPicker, WeekPicker, WeeksPicker, RangePicker } = DatePicker;

//如需指定周开始是星期几，请配置momentConfig，此函数接受一个number类型参数，表示周开始是星期几
const firstWeekDay = 0;
momentConfig(firstWeekDay);
export default class Sl extends Component<any> {
  constructor() {
    super();
    this.state = {
      value: '2019-07-12',
      rangeValue: ['', ''],
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
  chengedate = obj => {
    const { newValue } = obj;
    console.log(obj);
    this.setState({ value: newValue });
  };
  onChangeRange = obj => {
    const { newValue } = obj;
    console.log(obj);
    this.setState({ rangeValue: newValue });
  };

  render() {
    const dateFormate = 'YYYY年MM月DD日';
    const config = {
      FacePanelContain: {
        normal: {
          boxShadow: {
            x: 0,
            y: 0,
            color: 'red',
            type: 'outset',
            blur: 1,
            spread: 1,
          },
          // background: {
          //   color: 'green',
          // },
          width: 300,
          height: 200,
        },
      },
      InMonthDate: {
        normal: {
          color: 'green',
        },
        hover: {
          color: 'red',
          background: { color: 'yellow' },
          //borderRadius: getBorderRadius({ radius: 5 }),
        },
        active: {
          color: 'blue',
          background: { color: 'red' },
        },
      },
      RangeDate: {
        normal: {
          background: { color: 'pink' },
          color: 'red',
          //borderRadius: getBorderRadius({ radius: 10 }),
        },
      },
      SecondWeekDate: {
        normal: {
          color: 'red',
        },
        hover: {
          color: 'blue',
        },
      },
      OutMonthDate: {
        normal: {
          color: 'red',
        },
      },
      Container: {
        normal: {
          width: 500,
          height: 100,
          border: getBorder({ style: 'solid', width: 2, color: 'red' }),
          background: {
            color: 'yellow',
          },
          boxShadow: {
            x: 2,
            y: 2,
            blur: 3,
            spread: 3,
            color: 'green',
            type: 'outset',
          },
          fontSize: 16,
          color: 'red',
        },
        hover: {
          border: getBorder({ style: 'solid', width: 5, color: 'pink' }),
          background: {
            color: 'green',
          },
        },
        disabled: {
          border: getBorder({ style: 'solid', width: 5, color: 'pink' }),
          background: {
            color: 'blue',
          },
        },
      },
      InputPrefix: { normal: { color: 'pink', fontSize: 16 } },
      InputSuffix: { normal: { color: 'red', fontSize: 16 } },
      ClearButton: { normal: { color: 'red', fontSize: 14 } },
      HeadSingleArrow: {
        normal: {
          color: 'red',
          fontSize: 16,
        },
        hover: {
          color: 'yellow',
          fontSize: 18,
        },
        active: {
          color: '#333',
          fontSize: 14,
        },
        disabled: {
          color: '#ccc',
          fontSize: 14,
        },
      },
      HeadDoubleArrow: {
        normal: {
          color: 'yellow',
          fontSize: 16,
        },
        hover: {
          color: 'red',
          fontSize: 18,
        },
        active: {
          color: '#ccc',
          fontSize: 14,
        },
        disabled: {
          color: 'blue',
          fontSize: 14,
        },
      },
      HeadYearText: {
        normal: {
          color: 'yellow',
          fontSize: 16,
        },
        hover: {
          color: 'red',
          fontSize: 18,
        },
        active: {
          color: '#ccc',
          fontSize: 14,
        },
        disabled: {
          color: 'blue',
          fontSize: 14,
        },
      },
      HeadMonthText: {
        normal: {
          color: 'red',
          fontSize: 16,
        },
        hover: {
          color: 'pink',
          fontSize: 18,
        },
        active: {
          color: '#ccc',
          fontSize: 14,
        },
        disabled: {
          color: 'blue',
          fontSize: 14,
        },
      },
      HeadWeekText: {
        normal: {
          color: 'red',
          fontSize: 16,
        },
        hover: {
          color: 'pink',
          fontSize: 18,
        },
        active: {
          color: '#ccc',
          fontSize: 14,
        },
        disabled: {
          color: 'blue',
          fontSize: 14,
        },
      },
      WeekText: {
        normal: {
          color: 'red',
          fontSize: 16,
        },
        hover: {
          color: 'pink',
          fontSize: 18,
        },
        active: {
          color: '#ccc',
          fontSize: 14,
        },
        disabled: {
          color: 'blue',
          fontSize: 14,
        },
      },
    };
    return (
      <div>
        <RangePicker
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          showTime
          format={'YYYY-MM-DD HH:mm:ss'}
          buttonOptions={{
            options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
          }}
          extraFooter={{ message: 'extraFooter' }}
          onOk={this.onOk}
          //disabled
          suffix={'lugia-icon-financial_date'}
        />
        <div style={{ margin: '30px', overflow: 'hidden' }}>
          <h2 style={{ margin: '10px' }}>Date</h2>

          <h2>date-normal-selectToday-theme</h2>
          <Theme
            config={{
              [Widget.DatePicker]: {
                ...config,
              },
              [Widget.RangePicker]: {
                ...config,
              },
              [Widget.MonthPicker]: {
                ...config,
              },
              [Widget.YearPicker]: {
                ...config,
              },
              [Widget.WeekPicker]: {
                ...config,
              },
              // [Widget.WeeksPicker]: {
              //   ...config,
              // },
            }}
          >
            <RangePicker
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              showTime
              format={'YYYY-MM-DD HH:mm:ss'}
              buttonOptions={{
                options: { today: '2015-02-03 00:00:00', 此刻: '2015-02-05 00:00:00' },
              }}
              extraFooter={{ message: 'extraFooter' }}
              onOk={this.onOk}
              //disabled
              suffix={'lugia-icon-financial_date'}
            />
            <DatePicker
              value={this.state.value}
              onChange={this.chengedate}
              step={9}
              suffix={'lugia-icon-financial_date'}
              showTime
              // disabled
            />

            <MonthPicker />
            <YearPicker />
            <WeekPicker />
            <TimePicker />
            {/*<WeeksPicker />*/}
          </Theme>

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
              value={this.state.rangeValue}
              placeholder={['开始日期', '结束日期']}
              onChange={this.onChangeRange}
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
                format={'YYYY-MM-DD HH:mm:ss'}
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
                options: { today: '2015-02-03 00:00:00', 此刻: ['2015-02-05 00:00:00'] },
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
