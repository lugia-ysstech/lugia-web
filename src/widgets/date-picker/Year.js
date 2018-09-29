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
import {
  DateWrapper,
  DateWInner,
  DateHeader,
  HeaderTop,
  HeaderTopArrow,
  HeaderTopText,
} from './styled';
type TypeProps = {
  step?: number,
  onChange: Function,
  from: string,
};
type TypeState = {
  showYears: boolean,
  start: number,
  end: number,
  title: string,
};
class Year extends Component<TypeProps, TypeState> {
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value, format } = getDerived(nextProps, preState);
    const start = (preState && preState.start) || moment(value, format).year() || moment().year();
    return {
      start,
    };
  }
  arrorChange = (obj: Object) => {
    const { start, end, showYears, title } = obj;
    this.setState({
      showYears,
      start,
      end,
      title,
    });
  };
  headOnChange = (obj: Object) => {
    const { start, end, showYears, title } = obj;
    this.setState({ start, end, showYears, title });
  };
  panelChange = (obj: Object) => {
    const { showYears, start, text } = obj;
    const star = showYears === false ? start + 1 : start;
    let data = { showYears, start: star, title: text };
    this.oldValue = this.state.start;
    if (showYears) {
      data = { start: star, title: text };
    }
    this.setState(data);
    const { month } = this.state;
    const newValue = star;
    if (showYears) {
      this.getOnChange({ newValue, oldValue: this.oldValue });
    }
  };
  getOnChange = (data: Object) => {
    const { onChange, from } = this.props;
    onChange && onChange({ ...data, from, mode: from });
  };
  getFreshPicker = (obj: Object) => {
    const { moments } = obj;
    const year = moments.year();
    const month = moments.month();
    this.setState({ start: year, month });
  };
  render() {
    const { showYears, start, end, title } = this.state;
    const { step = 12 } = this.props;
    return (
      <DateWrapper width={300}>
        <DateWInner width={300}>
          <Head
            {...this.props}
            onChange={this.arrorChange}
            headOnChange={this.headOnChange}
            start={start}
            showYears={showYears}
            title={title}
            step={step}
            mode={'year'}
          />
          <FacePanel
            {...this.props}
            onChange={this.panelChange}
            start={start}
            end={end}
            showYears={showYears}
            step={step}
            title={title}
            mode={'year'}
          />
        </DateWInner>
      </DateWrapper>
    );
  }
}

export default Year;
