//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import moment from 'moment';
import Range from './Range';
export default ThemeProvider(
  class RangePicker extends Component {
    render() {
      return <Range {...this.props} mode={'range'} />;
    }
  },
  Widget.RangePicker
);
