//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';

import Head from './Head';
import FacePanel from './FacePanel';
import { DateWrapper } from '../styled/styled';
import moment from 'moment';
type TypeProps = {
  onChange?: Function,
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
  static displayName = 'Month';
  constructor(props: TypeProps) {
    super(props);
    const { model } = props;
    model &&
      model.on('inputOnChange', (data: Object) => {
        const { month, year } = data;
        this.setState({ month, year });
      });
  }
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { year, month, format } = nextProps;
    const newYear = preState ? preState.year : year;
    const newMonth = preState ? preState.month : month;
    return {
      year: newYear,
      month: newMonth,
      format,
    };
  }
  arrorChange = (param: number) => {
    const { year } = param;
    this.setState({ year });
  };
  panelChange = (param: Object) => {
    const { month, event } = param;
    const { year } = this.state;
    this.setState({ month });
    this.getOnChange({ event, year, month });
  };
  getOnChange = (data: Object) => {
    const { onChange } = this.props;
    const { from } = this;
    onChange && onChange({ from, mode: from, ...data });
  };
  headOnChange = () => {
    const { year, month } = this.state;
    const { onChangeYear } = this.props;
    const newValue = moment()
      .set({ year, month })
      .format('YYYY-MM');
    onChangeYear && onChangeYear({ newValue, mode: 'year', from: 'month' });
  };
  componentDidMount() {
    const { mode } = this.props;
    this.from = mode;
  }
  render() {
    const { month, year } = this.state;
    const { theme } = this.props;
    const { themeProps } = this.props;
    console.log('Month.js', themeProps);
    return (
      <DateWrapper {...theme} themeProps={themeProps}>
        <div>
          <Head
            {...this.props}
            onChange={this.arrorChange}
            headOnChange={this.headOnChange}
            start={year}
            mode={'month'}
            themeProps={themeProps}
          />
          <FacePanel
            {...this.props}
            onChange={this.panelChange}
            mode={'month'}
            month={month}
            themeProps={themeProps}
          />
        </div>
      </DateWrapper>
    );
  }
}

export default Month;
