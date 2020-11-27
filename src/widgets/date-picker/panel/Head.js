/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import Icon from '../../icon/index';
import { DateHeader, HeaderTop, HeaderTopArrow, HeaderTopText } from '../styled/styled';
import { getHeadArrowTheme, getHeadYearAndMonth } from '../themeConfig/themeConfig';
import { getHeadIconClass } from '../utils/getHeadIcon';
import getYearRange, { getYearsRange } from '../utils/year';
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
  themeProps: Object,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
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
  startYear: number,
};
class Head extends Component<TypeProps, TypeState> {
  static displayName = 'Head';
  static getDerivedStateFromProps(nextProps: TypeProps, preState: TypeState) {
    const { start, title, mode, secondTitle, isWeekInner, step } = nextProps;
    const { startYear, endYear } = getYearRange(start, step);
    const normalTitle = startYear + '-' + endYear;
    const secontTit = isWeekInner && secondTitle ? `${secondTitle}` : '';
    return {
      year: start,
      title: mode !== 'year' ? start : title || normalTitle,
      secondTitle: secontTit,
      startYear,
    };
  }
  changeYear = (number: number) => () => {
    const { onChange, showYears, mode, step } = this.props;
    let { start } = this.props;
    if (mode === 'year' && start !== undefined) {
      const { startYear } = getYearRange(start, step);
      start = startYear;
      number = number === -1 ? -step : step;
    }
    const moments = moment().set({ year: start });
    const newYear = moments.add(number, 'year').year();
    this.setState({ year: newYear });
    const titStart = newYear;
    const titEnd = titStart + step - 1;
    const title = titStart + '-' + titEnd;
    let data = { showYears: false, start: newYear, title };
    if (mode !== 'year') {
      data = { year: newYear };
    }
    onChange && onChange(data);
    if (showYears) {
      const { startY, endY, title } = this.getSandE(start, step, number);
      onChange &&
        onChange({ yearsRange: [startY, endY], start: startY, end: endY, showYears, title });
    }
  };
  getSandE = (start: number, step: number, number: number) => {
    const { startYear, endYear } = getYearsRange(start, step);
    const times = step * step;
    const startY = number > 0 ? endYear + 1 : startYear - times;
    const endY = number > 0 ? startY + (times - 1) : startYear - 1;
    return {
      startY,
      endY,
      title: startY + '-' + endY,
    };
  };
  headClick = () => {
    const { year, startYear } = this.state;
    const { showYears, step } = this.props;
    if (!showYears) {
      const { startYear: s, endYear } = getYearsRange(startYear, step);
      const title = s + '-' + endYear;
      const { headOnChange } = this.props;
      headOnChange &&
        headOnChange({
          yearsRange: [s, endYear],
          year,
          showYears: true,
          title,
        });
    }
  };
  secondHeadClick = () => {
    const { secondTitle, onHeadChange } = this.props;
    onHeadChange && onHeadChange(secondTitle);
  };
  render() {
    const { title, secondTitle } = this.state;
    const { themeProps, getPartOfThemeHocProps, getPartOfThemeProps, mode } = this.props;
    const { headYearTextTheme, headWeekTextTheme } = getHeadYearAndMonth({
      mode,
      getPartOfThemeProps,
    });
    const { single: { singleViewClass, singleTheme } = {} } = getHeadArrowTheme({
      getPartOfThemeHocProps,
    });
    const singleArrowConfig = {
      viewClass: singleViewClass,
      theme: singleTheme,
    };
    const { singleLeftIconClass, singleRightIconClass } = getHeadIconClass(this.props);
    return (
      <DateHeader themeProps={themeProps}>
        <HeaderTop themeProps={themeProps}>
          <HeaderTopArrow themeProps={themeProps} position={'left'} onClick={this.changeYear(-1)}>
            <Icon iconClass={singleLeftIconClass} {...singleArrowConfig} />
          </HeaderTopArrow>
          <HeaderTopText themeProps={headYearTextTheme} onClick={this.headClick}>
            {title}年
          </HeaderTopText>
          <HeaderTopText themeProps={headWeekTextTheme} onClick={this.secondHeadClick}>
            {secondTitle}
          </HeaderTopText>
          <HeaderTopArrow themeProps={themeProps} position={'right'} onClick={this.changeYear(1)}>
            <Icon iconClass={singleRightIconClass} {...singleArrowConfig} />
          </HeaderTopArrow>
        </HeaderTop>
      </DateHeader>
    );
  }
}

export default Head;
