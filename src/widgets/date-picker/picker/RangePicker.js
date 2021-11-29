import React, { Component } from 'react';
import Widget from '../../consts/index';
import ThemeProvider from '../../theme-provider';
import Range from '../triggerPanel/rangePanelTrigger';
import RangePickerDoubleInput from '../triggerPanel/RangePickerDoubleInput';
import { isDoubleDate } from '../utils/booleanUtils';
export default ThemeProvider(
  class RangePicker extends Component {
    render() {
      const { type } = this.props;
      const isDouble = isDoubleDate(type);
      return isDouble ? (
        <RangePickerDoubleInput {...this.props} mode={'range'} />
      ) : (
        <Range {...this.props} mode={'range'} />
      );
    }
  },
  Widget.RangePicker,
  { hover: true, active: true }
);
