/**
 *
 * create by wangcuixia
 *
 * create date: 2018/07/018
 *
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Date, Years, Months, Week } from './index';
import Head from './Head';
import FacePanel from './FacePanel';
import DatePicker from './index';
const { MonthPicker, YearPicker, WeekPicker, WeeksPicker, RangePicker } = DatePicker;
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

  handleclick = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };
  onChangeYear = v => {
    console.log(v);
  };
  choseYear = cv => {
    console.log(cv);
  };
  weekschange = v => {
    console.log(555);
    console.log(v);
  };
  render() {
    //console.log(this.state.v);
    const dateFormate = 'YYYY年MM月DD日';
    const monthFormate = 'YYYY年MM月';
    return (
      <div style={{ margin: '30px' }}>
        {/*
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>showToday</h2>
          <DatePicker defaultValue={'2015.03.03'} showToday />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>showToday&noToday</h2>
          <DatePicker defaultValue={'2015.02.03'} showToday />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>disabled</h2>
          <DatePicker
            disabled
            readOnly
            defaultValue={'2015.02.03'}
            value={'2015.03.03'}
            format={dateFormate}
            lang={'en'}
          />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>readOnly</h2>
          <DatePicker readOnly defaultValue={'2015.03.03'} format={dateFormate} lang={'en'} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>defaultValue</h2>
          <DatePicker defaultValue={'2015.02.01'} format={dateFormate} lang={'en'} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>value</h2>
          <DatePicker value={'2015.02.03'} format={dateFormate} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>月</h2>
          <MonthPicker defaultValue={'2016-03'} format={monthFormate} lang={'en'} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>年</h2>
          <YearPicker defaultValue={'2016'} format={'YYYY年'} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>周</h2>
          <WeekPicker defaultValue={'2015-03-02'} weeks={20} />
        </div> */}
        {/* <div style={{ float: 'left', marginRight: '30px',width:'300px' }}>
          <h2>Head</h2>
          <Head defaultValue={'2015-02-03'} onChange={this.onChangeYear} />
        </div>
        <div style={{ float: 'left', marginRight: '30px',width:'300px' }}>
          <h2>FacePanel</h2>
          <FacePanel defaultValue={'2015-02-03'} onChange={this.choseYear} />
        </div> */}
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>date</h2>
          <DatePicker defaultValue={'2015年2月3日'} format={'YYYY年MM月DD日'} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>Year</h2>
          <YearPicker defaultValue={'2015-02-03'} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>month</h2>
          <MonthPicker defaultValue={'2015-02-03'} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>week</h2>
          <WeekPicker defaultValue={'2015-01周'} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>weeks</h2>
          <WeeksPicker defaultValue={'2015-01周'} firstWeekDay={6} />
          {/* isFollow 默认为true */}
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>RangePicker</h2>
          <RangePicker />
          {/* firstWeekday={2} isFollow */}
        </div>

        {/* <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>Month</h2>
          <Month defaultValue={'2015-07-03'} onChange={this.weekschange}/>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>Weeks</h2>
          <Weeks defaultValue={'2015-02-03'} onChange={this.weekschange}/>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>Date</h2>
          <Date/>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>Years</h2>
          <Years />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>Months</h2>
          <Months defaultValue={'2015-02-03'}/>
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>Week</h2>
          <Week defaultValue={'2015-07'} mode="week" />
        </div> */}
      </div>
    );
  }
}
