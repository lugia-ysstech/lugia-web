//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import Widget from '../consts/index';
import ThemeProvider from '../theme-provider';
import moment from 'moment';
import DateInput from './DateInput';
import { MonthChild, MonthChildText } from './styled';
export default ThemeProvider(
  class MonthPicker extends Component {
    render() {
      return <DateInput {...this.props} mode={'month'} />;
    }
  },
  Widget.MonthPicker
);
