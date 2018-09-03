/**
 *
 * create by wangcuixia
 *
 * create date: 2018/07/018
 *
 */
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from './index';
import Head from './Head';
import FacePanel from './FacePanel';
import Year from './Year';
const { MonthPicker, YearPicker, WeekPicker } = DatePicker;
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
  render() {
    //console.log(this.state.v);
    const dateFormate = 'YYYY年MM月DD日';
    const monthFormate = 'YYYY年MM月';
    return (
      <div style={{ margin: '30px' }}>
        {/* <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>normal</h2>
          <DatePicker />
        </div>
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
          <Head onChange={this.onChangeYear} />
        </div>
        <div style={{ float: 'left', marginRight: '30px',width:'300px' }}>
          <h2>FacePanel</h2>
          <FacePanel onChange={this.choseYear} />
        </div> */}
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>Year</h2>
          <Year defaultValue={'2015-02-03'} />
        </div>
      </div>
    );
  }
}
