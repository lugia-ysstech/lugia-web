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
const { MonthPicker, YearPicker, WeekPicker } = DatePicker;
export default class Sl extends Component<any> {
  constructor() {
    super();
    this.state = {
      currentValue: 0,
      btnWidth: 20,
      disabled: false,
    };
  }

  handleclick = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  render() {
    const dateFormate = 'YYYY年MM月DD日';
    const monthFormate = 'YYYY年MM月';
    return (
      <div style={{ margin: '30px' }}>
        <div style={{ float: 'left', marginRight: '30px' }}>
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
          <WeekPicker defaultValue={'2016'} format={'YYYY年'} />
        </div>
      </div>
    );
  }
}
