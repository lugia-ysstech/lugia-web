/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import moment from 'moment';
import Icon from '../icon/index';
import Head from './Head';
import FacePanel from './FacePanel';
import { getDerived } from './getDerived';
import { DateWInner, DateHeader, HeaderTop, HeaderTopArrow, HeaderTopText } from './styled';
type TypeProps = {
  defaultValue?: string,
};
type TypeState = {
  format: string,
  value: string,
  currentYear: number,
  showYears: boolean,
  value: string,
  start: number,
  end: number,
};
class Year extends Component<TypeProps, TypeState> {
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value, format } = getDerived(nextProps, preState);
    const start = (preState && preState.start) || moment(value, format).year() || moment().year();
    //start=start-1;
    return {
      value,
      currentYear: moment(value, format).year() || moment().year(),
      start,
    };
  }
  arrorChange = (obj: Object) => {
    const { year, start, end, showYears } = obj;
    const { format, value } = this.state;
    this.setState({
      value: moment(value, format)
        .set({ year })
        .format(format),
      showYears,
      start,
    });
    // if(showYears){
    //   this.setState({start,end,showYears});
    // }
  };
  headOnChange = (obj: Object) => {
    const { year, start, end, showYears } = obj;
    this.setState({ start, end, showYears });
  };
  panelChange = (obj: Object) => {
    const { format, value } = this.state;
    const { showYears, start } = obj;
    console.log(start);
    this.setState({ showYears, start: start + 1 });
  };
  render() {
    const { currentYear, value, showYears, start, end } = this.state;
    console.log(start);
    return (
      <DateWInner width={400}>
        <Head
          onChange={this.arrorChange}
          headOnChange={this.headOnChange}
          {...this.props}
          start={start}
          showYears={showYears}
        />
        <FacePanel
          onChange={this.panelChange}
          {...this.props}
          value={value}
          start={start}
          end={end}
          showYears={showYears}
        />
      </DateWInner>
    );
  }
}

export default Year;
