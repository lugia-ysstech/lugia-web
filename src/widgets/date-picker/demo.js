/**
 *
 * create by wangcuixia
 *
 * create date: 2018/07/018
 *
 */
import React, { Component } from 'react';
import DatePicker from './DateInput';
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

  handleclick = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  render() {
    const dateFormate = 'YYYY年MM月DD日';
    return (
      <div style={{ margin: '30px' }}>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>normal</h2>
          <DatePicker />
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
          <DatePicker readOnly defaultValue={'2015.02.03'} format={dateFormate} lang={'en'} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>defaultValue</h2>
          <DatePicker defaultValue={'2015.02.01'} format={dateFormate} lang={'en'} />
        </div>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>value</h2>
          <DatePicker value={'2015.02.03'} format={dateFormate} lang={'en'} />
        </div>
      </div>
    );
  }
}
