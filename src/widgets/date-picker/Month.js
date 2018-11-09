//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';

import Head from './Head';
import FacePanel from './FacePanel';
import { DateWrapper } from './styled';
import { getDerived } from './getDerived';
const moment = require('moment');
type TypeProps = {
  onChnge?: Function,
  onChangeYear?: Function,
  from?: 'string',
  theme?: Object,
};
type TypeState = {
  monthIndex: number,
  year: number,
  format: string,
  moments: Object,
};
class Month extends Component<TypeProps, TypeState> {
  oldValue: number;
  oldY: number;
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { format, moments } = getDerived(nextProps, preState);
    if (!preState) {
      return {
        year: moments.year(),
        monthIndex: moments.month(),
        format,
        moments,
      };
    }
  }
  arrorChange = (param: number) => {
    const { year } = param;
    this.setState({ year });
  };
  panelChange = (param: Object) => {
    const { monthIndex } = param;
    const { year, moments } = this.state;
    this.oldValue = this.state.monthIndex;
    this.oldY = year;
    this.setState({ monthIndex });
    const newValue = moments.set({ year, month: monthIndex }).format('YYYY-MM-DD');
    const oldValue = moments.set({ year, month: this.oldValue }).format('YYYY-MM-DD');
    this.getOnChange({ newValue, oldValue });
  };
  getOnChange = (data: Object) => {
    const { onChange, from } = this.props;
    onChange && onChange({ from, mode: from, ...data });
  };
  getFreshPicker = (obj: string) => {
    const { moments } = obj;
    const year = moments.year();
    const month = moments.month();
    this.setState({ year, monthIndex: month });
  };
  headOnChange = () => {
    const { year, moments, monthIndex } = this.state;
    const { onChangeYear } = this.props;
    const newValue = moments.set({ year, month: monthIndex }).format('YYYY-MM');
    onChangeYear && onChangeYear({ newValue, mode: 'year', from: 'month' });
  };
  render() {
    const { monthIndex, year } = this.state;
    const { theme } = this.props;
    return (
      <DateWrapper {...theme}>
        <div>
          <Head
            {...this.props}
            onChange={this.arrorChange}
            headOnChange={this.headOnChange}
            start={year}
            mode={'month'}
          />
          <FacePanel
            {...this.props}
            onChange={this.panelChange}
            mode={'month'}
            monthIndex={monthIndex}
          />
        </div>
      </DateWrapper>
    );
  }
}

export default Month;
