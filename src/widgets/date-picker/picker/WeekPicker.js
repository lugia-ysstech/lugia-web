import React, { Component } from 'react';
import Widget from '../../consts/index';
import ThemeProvider from '../../theme-provider';
import DateInput from '../triggerPanel/singlePanelTrigger';
export default ThemeProvider(
  class WeekPicker extends Component {
    render() {
      return <DateInput {...this.props} mode={'weeks'} />;
    }
  },
  Widget.WeekPicker,
  { hover: true, active: true }
);
