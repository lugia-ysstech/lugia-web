/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import moment from 'moment';
import Icon from '../icon/index';
import DatePicker from './DateInput';
import { getDerived } from './getDerived';
import { DateHeader, HeaderTop, HeaderTopArrow, HeaderTopText } from './styled';
type TypeProps = {
  defaultValue?: string,
  onChange?: Function,
  headOnChange: ?Function,
};
type TypeState = {
  currentYear: number,
  value: string,
  format: string,
  start: number,
  end: number,
  title: string,
  showYears: boolean,
};
class Head extends Component<TypeProps, TypeState> {
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value, format, moments, currentYear } = getDerived(nextProps, preState);
    const { start } = nextProps;
    const star = start - 1;
    const title = star + '-' + (star + 11);
    return {
      value,
      currentYear: moment(value, format).year() || moment().year(),
      title: (preState && preState.title) || title,
    };
  }
  changeYear = (number: number) => () => {
    const { onChange, showYears } = this.props;
    const { currentYear, value, format } = this.state;
    let { start, end } = this.props;
    if (start) {
      start = start - 1;
      end = start + 11;
    }
    if (start !== undefined && end !== undefined) {
      const times = end - start + 1;
      number = number === -1 ? -times : times;
    }
    if (!showYears) {
      const moments = moment(value, format).set({ year: currentYear });
      const newYear = moments.add(number, 'year').year();
      console.log(newYear);
      this.setState({ value: moments.format(format) });
      onChange && onChange({ year: newYear, showYears: false, start: newYear });
    }

    if (showYears) {
      console.log('showYears?');
      const { start } = this.props;
      console.log(start);
      const { startY, endY, title } = this.getSandE(start, end, number);
      this.setState({ title, start: startY, end: endY });
      onChange && onChange({ start: startY, end: endY, showYears });
    }
  };
  getSandE = (start: number, end: number, number: number) => {
    const times = end - start;
    const titleStart = start - times - 1;
    const titleEnd = start + times * (times + 1) - 1;

    const TitleYearRange = titleEnd - titleStart;

    let newTitleStart = titleStart - TitleYearRange - 1;
    let newTitleEnd = titleStart - 1;
    if (number > 0) {
      newTitleStart = titleEnd + 1;
      newTitleEnd = newTitleStart + TitleYearRange;
    }

    const yearStart = newTitleStart + 12;
    const yearEnd = yearStart + 11;
    const title = newTitleStart + '-' + newTitleEnd;
    return {
      startY: yearStart,
      endY: yearEnd,
      title,
    };
  };
  headClick = () => {
    const { currentYear } = this.state;
    let { start } = this.props;
    start = start - 1;
    const end = start + 11;
    const times = end - start;
    const star = start - times - 1;
    const en = start + times * (times + 1) - 1;
    const title = star + '-' + en;
    console.log(start, end);
    this.setState({ showYears: true, title });
    const { headOnChange } = this.props;
    headOnChange && headOnChange({ start, end, year: currentYear, showYears: true });
  };
  render() {
    const { currentYear, showYears, title } = this.state;

    return (
      <DateHeader width={200}>
        <HeaderTop>
          <HeaderTopArrow position={'left'} onClick={this.changeYear(-1)}>
            <Icon iconClass={'lugia-icon-direction_Left'} />
          </HeaderTopArrow>
          <HeaderTopText onClick={this.headClick}>{title}</HeaderTopText>
          {/* <HeaderTopText>{'1-12周'}</HeaderTopText> */}
          <HeaderTopArrow position={'right'} onClick={this.changeYear(1)}>
            <Icon iconClass={'lugia-icon-direction_right'} />
          </HeaderTopArrow>
        </HeaderTop>
      </DateHeader>
    );
  }
}

export default Head;
