/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import Icon from '../../icon/index';
import { DateHeader, HeaderTop, HeaderTopArrow, HeaderTopText } from '../styled/styled';
const moment = require('moment');
type TypeProps = {
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
  year: number,
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
  static displayName = 'Head';
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { start, title, mode, secondTitle, isWeekInner } = nextProps;
    const star = start - 1;
    const normalTitle = star + '-' + (star + 11);
    const secontTit = isWeekInner && secondTitle ? `-${secondTitle}` : '';
    return {
      year: start,
      title: mode !== 'year' ? start : title || normalTitle,
      secondTitle: secontTit,
    };
  }
  changeYear = (number: number) => () => {
    const { onChange, showYears, mode } = this.props;
    const { start, step } = this.props;
    if (mode === 'year' && start !== undefined) {
      number = number === -1 ? -step : step;
    }
    const moments = moment().set({ year: start });
    const newYear = moments.add(number, 'year').year();
    this.setState({ year: newYear });
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
    const { year } = this.state;
    let { start, showYears, step } = this.props;
    if (!showYears) {
      start = start - 1;
      const end = start + step - 1;
      const times = end - start;
      const star = start - times - 1;
      const en = start + times * (times + 1) - 1;
      const title = star + '-' + en;
      const { headOnChange } = this.props;
      headOnChange && headOnChange({ start: star + step, end, year, showYears: true, title });
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
