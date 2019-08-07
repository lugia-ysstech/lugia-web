import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import DateInput from '../date-picker/triggerPanel/singlePanelTrigger';
export default ThemeProvider(
  class TimePicker extends Component {
    render() {
      return <DateInput {...this.props} mode={'time'} />;
    }
  },
  Widget.TimePicker
);
