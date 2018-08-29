//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from './DateInput';
class Year extends Component {
  render() {
    return <DatePicker mode={'year'} {...this.props} />;
  }
}

export default Year;
