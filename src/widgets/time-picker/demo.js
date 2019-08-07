/**
 *
 * create by wangcuixia
 *
 * create date: 2018/07/018
 *
 */
import React, { Component } from 'react';
import moment from 'moment';
import TimePicker from './index';
import Theme from '../theme';
import Widget from '../consts/index';
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
    return (
      <div style={{ margin: '30px', overflow: 'hidden' }}>
        <h2 style={{ margin: '10px' }}>Times</h2>
        <div style={{ float: 'left', marginRight: '30px' }}>
          <h2>TimePicker-normal</h2>
          <Theme config={{ [Widget.TimePicker]: { width: 500 } }}>
            <TimePicker onChange={this.onChange} format={'HH:mm'} />
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
    );
  }
}
