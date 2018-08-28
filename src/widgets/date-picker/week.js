import React, { Component } from 'react';
import moment from 'moment';
import { HeaderWeek, HeaderWeekBox } from './styled';

class WeekDays extends Component {
  render() {
    const { lang } = this.props;
    let weeks = ['日', '一', '二', '三', '四', '五', '六'];
    if (lang === 'en') {
      weeks = moment.weekdaysShort();
    }

    let { firstWeekday = 0 } = this.props;
    firstWeekday = firstWeekday === 0 || firstWeekday >= 7 ? 0 : firstWeekday;

    const moments = moment(moment(firstWeekday, 'day'));
    const newWeeks = [weeks[moments.day()]];

    for (let i = 1; i < 7; i++) {
      const newMoments = moment(moments);
      newWeeks.push(weeks[newMoments.add(i, 'day').day()]);
    }

    return (
      <HeaderWeekBox>
        {newWeeks.map((currentValue, index) => {
          return (
            <HeaderWeek width={300} key={index}>
              {newWeeks[index]}
            </HeaderWeek>
          );
        })}
      </HeaderWeekBox>
    );
  }
}
export default WeekDays;
