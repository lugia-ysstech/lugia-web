import moment from 'moment';

export function setMomentLocal(firstWeekDay: number) {
  // const newFirstWeekDay = getFirstWeekDay(firstWeekDay);
  // // 过满一周才算一周
  // // 每年的一月一号到每年的第一周，不满一周时算上一年的周数
  // console.log(newFirstWeekDay);
  moment.locale('en', {
    week: {
      dow: firstWeekDay, // 每周的第一天
      doy: 4, // 每年的第一周是一月几号
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
// moment.locale('en', {
//   week: {
//     dow: 0, // 每周的第一天
//     doy: 4, // 每年的第一周是一月几号
//   },
// });
