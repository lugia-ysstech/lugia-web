//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import moment from 'moment';
import DateInput from './DateInput';

export default ThemeProvider(
  class RangePicker extends Component {
    render() {
      return <DateInput {...this.props} mode={'range'} />;
    }
  },
  Widget.RangePicker
);
