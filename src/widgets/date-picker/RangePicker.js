//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import Range from './Range';
export default ThemeProvider(
  class RangePicker extends Component {
    render() {
      return <Range {...this.props} mode={'range'} />;
    }
  },
  Widget.RangePicker
);
