import moment from 'moment';
function MomentConfig(firstWeekDay) {
  // // 过满一周才算一周
  // // 每年的一月一号到每年的第一周，不满一周时算上一年的周数
  moment.locale('en', {
    week: {
      dow: firstWeekDay, // 每周的第一天
      doy: 4, // 每年的第一周是一月几号
    },
  });
}
MomentConfig(0);
export function setMomentLocal(firstWeekDay: number) {
  MomentConfig(firstWeekDay);
}
