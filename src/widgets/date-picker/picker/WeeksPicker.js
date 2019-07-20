import React, { Component } from 'react';
import Widget from '../../consts/index';
import ThemeProvider from '../../theme-provider';
import DateInput from '../triggerPanel/singlePanelTrigger';
export default ThemeProvider(
  class WeeksPicker extends Component {
    render() {
      return <DateInput {...this.props} mode={'week'} />;
    }
  },
  Widget.WeeksPicker,
  { hover: true, active: true }
);
