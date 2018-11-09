//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import Range from './Range';
import { getTheme } from './utils';
export default ThemeProvider(
  class RangePicker extends Component {
    render() {
      const theme = getTheme(this.props);
      return <Range {...this.props} theme={theme} mode={'range'} />;
    }
  },
  Widget.RangePicker
);
