import React, { Component } from 'react';
import Widget from '../../consts/index';
import ThemeProvider from '../../theme-provider';
import Range from '../triggerPanel/rangePanelTrigger';
import RangePickerDoubleInput from '../triggerPanel/RangePickerDoubleInput';
import { isDoubleDate } from '../utils/booleanUtils';
import ValidateHoc from '../../input/validateHoc';

const RangeValidPicker = ValidateHoc(Range);

export default ThemeProvider(
  class RangePicker extends Component {
    render() {
      const { type } = this.props;
      const isDouble = isDoubleDate(type);
      return isDouble ? (
        <RangePickerDoubleInput {...this.props} mode={'range'} />
      ) : (
        <RangeValidPicker {...this.props} mode={'range'} />
      );
    }
  },
  Widget.RangePicker,
  { hover: true, active: true }
);
