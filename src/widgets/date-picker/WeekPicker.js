//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from './DateInput';
class Week extends Component {
  render() {
    return <DatePicker mode={'week'} {...this.props} />;
  }
}

export default Week;
