import React, { Component } from 'react';
import Widget from '../../consts/index';
import ThemeProvider from '../../theme-provider';
import DateInput from '../triggerPanel/singlePanelTrigger';
export default ThemeProvider(
  class YearPicker extends Component {
    render() {
      return <DateInput placeholder={'请选择年'} {...this.props} mode={'year'} />;
    }
  },
  Widget.YearPicker,
  { hover: true, active: true }
);
