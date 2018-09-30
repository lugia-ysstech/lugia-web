import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import DateInput from './DateInput';
export default ThemeProvider(
  class WeekPicker extends Component {
    render() {
      return <DateInput {...this.props} mode={'week'} />;
    }
  },
  Widget.WeekPicker
);
