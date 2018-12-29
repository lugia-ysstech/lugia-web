import React, { Component } from 'react';
import Widget from '../../consts/index';
import ThemeProvider from '../../theme-provider';
import DateInput from '../triggerPanel/singlePanelTrigger';
import { getTheme } from '../utils/utils';
export default ThemeProvider(
  class YearPicker extends Component {
    render() {
      const theme = getTheme(this.props);
      return <DateInput {...this.props} theme={theme} mode={'year'} />;
    }
  },
  Widget.YearPicker
);
