import moment from 'moment';
export function setMomentLocal(firstWeekDay: number) {
  const newFirstWeekDay = getFirstWeekDay(firstWeekDay);
  // // 过满一周才算一周
  // // 每年的一月一号到每年的第一周，不满一周时算上一年的周数
  moment.locale('en', {
    week: {
      dow: newFirstWeekDay, // 每周的第一天
      doy: 1, // 每年的第一周是一月几号
    },
  });
}
export const getFirstWeekDay = (firstWeekDay: number = 0): number => {
  let newFirstWeekDay = firstWeekDay;
  if (newFirstWeekDay >= 7 || newFirstWeekDay <= 0) {
    newFirstWeekDay = 0;
  }
  return newFirstWeekDay;
};
