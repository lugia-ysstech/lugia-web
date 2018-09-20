import moment from 'moment';
export const getDerived = (nextProps, preState) => {
  const { defaultValue, mode, showToday } = nextProps;
  const normalFormat =
    mode === 'month'
      ? 'YYYY-MM'
      : mode === 'year'
        ? 'YYYY'
        : mode === 'week' || mode === 'weeks'
          ? 'YYYY-WW'
          : 'YYYY-MM-DD';
  let { value, format = normalFormat } = nextProps;
  let { firstWeekDay = 0 } = nextProps;
  if (firstWeekDay >= 7 || firstWeekDay <= 0) {
    firstWeekDay = 0;
  }
  const hasDefaultProps = 'defaultValue' in nextProps && moment(defaultValue, format)._isValid;
  const hasValueProps = 'value' in nextProps && moment(value, format)._isValid;
  value = hasValueProps
    ? value
    : preState
      ? preState.value
      : hasDefaultProps
        ? defaultValue
        : moment().format('YYYY-MM-DD');

  const moments = moment(value, format);
  const { weeks = moments.weeks() } = nextProps;
  let today = moment().date();
  const max = moments.daysInMonth();

  let noToday = false;
  if (today > max) {
    today = max;
    noToday = true;
  }

  return {
    value,
    noToday,
    today,
    moments,
    format,
    mode,
    weeks,
    firstWeekDay,
  };
};
export const modeStyle = mode => {
  const isWeek = mode === 'week';
  const isWeeks = mode === 'weeks';
  const isMonth = mode === 'month';
  const isYear = mode === 'year';
  const isDate = mode === 'date';
  return {
    isWeek,
    isMonth,
    isYear,
    isDate,
    isWeeks,
  };
};
