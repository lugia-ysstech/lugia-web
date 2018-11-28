//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import TimeInput from './TimeInput';
import { getTheme } from './utils';
export default ThemeProvider(
  class TimePicker extends Component {
    render() {
      const theme = getTheme(this.props);
      return <TimeInput {...this.props} theme={theme} mode={'times'} />;
    }
  },
  Widget.TimePicker
);
