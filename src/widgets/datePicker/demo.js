/**
 *
 * create by wangcuixia
 *
 * create date: 2018/07/018
 *
 */
import React, { Component } from 'react';
import DatePicker from './datePicker';
import moment from 'moment';
// import Widgets from '../consts/index';
// import Theme from '../theme/index';

export default class Sl extends Component<any> {
  constructor() {
    super();
    this.state = {
      currentValue: 0,
      btnWidth: 20,
      disabled: false,
    };
  }

  // onchange = v => {
  //   console.log(v);
  // };
  handleclick = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  render() {
    const dateFormate = 'YYYY/MM/DD';
    return (
      <div style={{ margin: '30px' }}>
        <DatePicker firstWeekday={1} defaultValue={'2015/5/1'} format={dateFormate} />
      </div>
    );
  }
}
