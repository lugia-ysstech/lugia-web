/*
* by wangcuixia
* @flow
* */
import React, { Component } from 'react';
import { HeaderWeek, HeaderWeekBox } from './styled';
const moment = require('moment');
type TypeProps = {
  onChangeWeek?: Function,
  lang?: Function,
  firstWeekDay?: number,
};

class WeekDays extends Component<TypeProps, null> {
  handleClick = () => {
    const { onChangeWeek } = this.props;
    onChangeWeek && onChangeWeek('week');
  };
  render() {
    const { lang } = this.props;
    let weeks = ['日', '一', '二', '三', '四', '五', '六'];
    if (lang === 'en') {
      weeks = moment.weekdaysShort();
    }

    let { firstWeekDay = 0 } = this.props;
    firstWeekDay = firstWeekDay === 0 || firstWeekDay >= 7 ? 0 : firstWeekDay;

    const moments = moment(moment(firstWeekDay, 'day'));
    const newWeeks = [weeks[moments.day()]];

    for (let i = 1; i < 7; i++) {
      const newMoments = moment(moments);
      newWeeks.push(weeks[newMoments.add(i, 'day').day()]);
    }
    return (
      <HeaderWeekBox>
        {newWeeks.map((currentValue, index) => {
          return (
            <HeaderWeek width={300} key={index} onClick={this.handleClick}>
              {newWeeks[index]}
            </HeaderWeek>
          );
        })}
      </HeaderWeekBox>
    );
  }
}
export default WeekDays;
