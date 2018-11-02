import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import DateInput from './DateInput';
export default ThemeProvider(
  class WeeksPicker extends Component {
    render() {
      return <DateInput mode={'weeks'} {...this.props} />;
    }
  },
  Widget.WeeksPicker
);
