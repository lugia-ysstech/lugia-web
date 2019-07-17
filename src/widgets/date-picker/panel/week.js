/*
 * by wangcuixia
 * @flow
 * */
import React, { Component } from 'react';
import { HeaderWeek, HeaderWeekBox } from '../styled/styled';
import moment from 'moment';
type TypeProps = {
  onChangeWeek?: Function,
  lang?: Function,
  firstWeekDay?: number,
};

class WeekDays extends Component<TypeProps, null> {
  static displayName = 'WeekDays';
  handleClick = () => {
    const { onChangeWeek } = this.props;
    onChangeWeek && onChangeWeek('week');
  };
  getnewWeeks = (props: Object, firstDayOfWeek: number) => {
    const { lang } = props;
    let weeks = ['日', '一', '二', '三', '四', '五', '六'];
    if (lang === 'en') {
      weeks = moment.weekdaysShort();
    }
    const moments = moment(moment().day(firstDayOfWeek));
    const newWeeks = [weeks[moments.day()]];
    for (let i = 1; i < 7; i++) {
      const newMoments = moment(moments);
      newWeeks.push(weeks[newMoments.add(i, 'day').day()]);
    }
    return { newWeeks };
  };
  render() {
    const localeData = moment.localeData();
    const firstDayOfWeek = localeData.firstDayOfWeek();
    const { newWeeks } = this.getnewWeeks(this.props, firstDayOfWeek);
    const { themeProps } = this.props;
    console.log('week.js', themeProps);
    return (
      <HeaderWeekBox themeProps={themeProps}>
        {newWeeks.map((currentValue, index) => {
          return (
            <HeaderWeek
              themeProps={themeProps}
              {...this.props}
              key={index}
              onClick={this.handleClick}
            >
              {newWeeks[index]}
            </HeaderWeek>
          );
        })}
      </HeaderWeekBox>
    );
  }
}
export default WeekDays;
