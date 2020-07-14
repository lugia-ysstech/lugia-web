import React, { Component } from 'react';
import Widget from '../../consts/index';
import ThemeProvider from '../../theme-provider';
import DateInput from '../triggerPanel/singlePanelTrigger';
export default ThemeProvider(
  class TimePicker extends Component {
    render() {
      return <DateInput placeholder={'请选择时间'} {...this.props} mode={'time'} />;
    }
  },
  Widget.TimePicker,
  { hover: true, active: true }
);
