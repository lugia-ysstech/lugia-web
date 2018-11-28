/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import Icon from '../icon/index';
import { getDerived } from './getDerived';
import { DateHeader, HeaderTop, HeaderTopArrow, HeaderTopText } from './styled';
const moment = require('moment');
type TypeProps = {
  defaultValue?: string,
  onChange?: Function,
  headOnChange: ?Function,
  start: number,
  mode: string,
  step: number,
  showYears?: boolean,
  title?: string,
  secondTitle?: string,
  isWeekInner?: boolean,
  onHeadChange?: Function,
};
type TypeState = {
  currentYear: number,
  value: string,
  format: string,
  start: number,
  end: number,
  title: string,
  showYears: boolean,
  secondTitle: string,
  isWeekInner: boolean,
};
class Head extends Component<TypeProps, TypeState> {
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { value, format, moments } = getDerived(nextProps, preState);
    const { start = moments.year(), title, mode, secondTitle, isWeekInner } = nextProps;
    const star = start - 1;
    const normalTitle = star + '-' + (star + 11);
    const secontTit = isWeekInner && secondTitle ? `-${secondTitle}` : '';
    return {
      value,
      currentYear: moment(value, format).year() || moment().year(),
      title: mode !== 'year' ? start : title || normalTitle,
      secondTitle: secontTit,
      format,
    };
  }
  changeYear = (number: number) => () => {
    const { onChange, showYears, mode } = this.props;
    const { value, format } = this.state;
    const { start, step } = this.props;
    if (mode === 'year' && start !== undefined) {
      number = number === -1 ? -step : step;
    }
    const moments = moment(value, format).set({ year: start });
    const newYear = moments.add(number, 'year').year();
    this.setState({ value: moments.format(format) });
    const titStart = newYear - 1;
    const titEnd = titStart + step - 1;
    const title = titStart + '-' + titEnd;
    let data = { showYears: false, start: newYear, title };
    if (mode !== 'year') {
      data = { year: newYear };
    }
    onChange && onChange(data);
    if (showYears) {
      const { start, step } = this.props;
      const { startY, endY, title } = this.getSandE(start, step, number);
      onChange && onChange({ start: startY, end: endY, showYears, title });
    }
  };
  getSandE = (start: number, step: number, number: number) => {
    const times = step - 1;
    const titleStart = start - times - 1;
    const titleEnd = start + times * (times + 1) - 1;

    const TitleYearRange = titleEnd - titleStart;

    let newTitleStart = titleStart - TitleYearRange - 1;
    let newTitleEnd = titleStart - 1;
    if (number > 0) {
      newTitleStart = titleEnd + 1;
      newTitleEnd = newTitleStart + TitleYearRange;
    }
    const yearStart = newTitleStart + step;
    const yearEnd = yearStart + step - 1;
    const title = newTitleStart + '-' + newTitleEnd;
    return {
      startY: yearStart,
      endY: yearEnd,
      title,
    };
  };
  headClick = () => {
    const { currentYear } = this.state;
    let { start, showYears, step } = this.props;
    if (!showYears) {
      start = start - 1;
      const end = start + step - 1;
      const times = end - start;
      const star = start - times - 1;
      const en = start + times * (times + 1) - 1;
      const title = star + '-' + en;
      const { headOnChange } = this.props;
      headOnChange &&
        headOnChange({ start: star + step, end, year: currentYear, showYears: true, title });
    }
  };
  secondHeadClick = () => {
    const { secondTitle, onHeadChange } = this.props;
    onHeadChange && onHeadChange(secondTitle);
  };
  render() {
    const { title, secondTitle } = this.state;
    return (
      <DateHeader width={200}>
        <HeaderTop>
          <HeaderTopArrow position={'left'} onClick={this.changeYear(-1)}>
            <Icon iconClass={'lugia-icon-direction_Left'} />
          </HeaderTopArrow>
          <HeaderTopText onClick={this.headClick}>{title}</HeaderTopText>
          <HeaderTopText onClick={this.secondHeadClick}>{secondTitle}</HeaderTopText>
          <HeaderTopArrow position={'right'} onClick={this.changeYear(1)}>
            <Icon iconClass={'lugia-icon-direction_right'} />
          </HeaderTopArrow>
        </HeaderTop>
      </DateHeader>
    );
  }
}

export default Head;
