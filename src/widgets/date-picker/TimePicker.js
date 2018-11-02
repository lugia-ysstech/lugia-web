//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import TimeInput from './TimeInput';

export default ThemeProvider(
  class TimePicker extends Component {
    render() {
      return <TimeInput {...this.props} mode={'times'} />;
    }
  },
  Widget.TimePicker
);
