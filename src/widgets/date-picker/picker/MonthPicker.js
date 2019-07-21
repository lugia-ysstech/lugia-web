import React, { Component } from 'react';
import Widget from '../../consts/index';
import ThemeProvider from '../../theme-provider';
import DateInput from '../triggerPanel/singlePanelTrigger';
export default ThemeProvider(
  class MonthPicker extends Component {
    render() {
      return <DateInput {...this.props} mode={'month'} />;
    }
  },
  Widget.MonthPicker,
  { hover: true, active: true }
);
