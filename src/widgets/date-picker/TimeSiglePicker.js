//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import Time from './Time';

export default ThemeProvider(
  class TimePicker extends Component {
    render() {
      return <Time {...this.props} mode={'time'} />;
    }
  },
  Widget.TimePicker
);
