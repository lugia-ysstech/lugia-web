//import type { ChangeEventParam } from '@lugia/lugia-web';
import React, { Component } from 'react';
import moment from 'moment';
import Head from './Head';
import FacePanel from './FacePanel';
import DateInput from './DateInput';
import { DateWrapper, DateWInner } from './styled';
import { getDerived } from './getDerived';

type TypeProps = {
  onChnge?: Function,
};
type TypeState = {
  monthIndex: number,
};
class Month extends Component<TypeProps, TypeState> {
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { weeks, format, moments } = getDerived(nextProps, preState);

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
    const { year, format, moments } = this.state;
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
    console.log(moments);
    let { format } = this.state;
    //console.log(value,format);
    if (this.props.mode === 'weeks') {
      format = 'YYYY-MM-DD';
    }
    // const moments=moment(value,format);
    //const moments=moment(value,format);
    const year = moments.year();
    const month = moments.month();
    console.log(year, month);
    this.setState({ year, monthIndex: month });
  };
  headOnChange = () => {
    const { year, format, moments, monthIndex } = this.state;
    const { onChangeYear } = this.props;

    const newValue = moments.set({ year, month: monthIndex }).format('YYYY-MM');
    onChangeYear && onChangeYear({ newValue, mode: 'year', from: 'month' });
    //this.getOnChange({newValue,mode:'year',from:'month'});
  };
  render() {
    const { monthIndex, year } = this.state;
    // console.log(monthIndex,year);
    return (
      <DateWrapper width={300}>
        <DateWInner width={300}>
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
            mode="month"
            monthIndex={monthIndex}
          />
        </DateWInner>
      </DateWrapper>
    );
  }
}

export default Month;
