import moment from 'moment';
export const getDerived = (nextProps, preState) => {
  const { defaultValue, mode, placeholder } = nextProps;
  const { isWeeks, isWeek, isMonth, isYear, isRange, isTime, isTimes } = modeStyle(mode);
  const normalFormat = isMonth
    ? 'YYYY-MM'
    : isYear
      ? 'YYYY'
      : isWeek || isWeeks
        ? 'YYYY-WW'
        : isTime || isTimes
          ? 'HH:mm:ss'
          : 'YYYY-MM-DD';
  let { value, format = normalFormat } = nextProps;
  let { firstWeekDay = 0 } = nextProps;
  if (firstWeekDay >= 7 || firstWeekDay <= 0) {
    firstWeekDay = 0;
  }
  const hasDefaultProps = 'defaultValue' in nextProps && moment(defaultValue, format)._isValid;
  const hasValueProps = 'value' in nextProps && moment(value, format)._isValid;
  const hasPlaceholder = 'placeholder' in nextProps;

  const newPlaceholder = hasPlaceholder
    ? placeholder
    : isRange
      ? ['开始日期', '结束日期']
      : isTime || isTimes
        ? '请选择时间'
        : '请选择日期';

  value = hasValueProps
    ? value
    : preState
      ? preState.value
      : hasDefaultProps
        ? defaultValue
        : isRange
          ? [
              moment().format(format),
              moment()
                .add('1', 'month')
                .format(format),
            ]
          : isTime || isTimes
            ? moment().format(format)
            : moment().format(format);

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
    hasDefaultProps,
    hasValueProps,
    placeholder: newPlaceholder,
  };
};
export const getDerivedForInput = (nextProps, preState) => {
  const { defaultValue, mode } = nextProps;
  const { hasDefaultProps, hasValueProps, format } = getDerived(nextProps, preState);
  const { isRange } = modeStyle(mode);
  const value = hasValueProps
    ? nextProps.value
    : preState
      ? preState.value
      : hasDefaultProps
        ? defaultValue
        : isRange
          ? ['', '']
          : '';
  // if(Array.isArray(value) && value[0]!=='' && value[1] !==''&&!preState){
  //    value=[moment(value[0],format).format(format),moment(value[1],format).format(format)];
  // }

  // if(typeof value === 'string' && value!==''&& !preState){
  //   value=moment(value,format).format(format);
  // }
  return {
    value,
    format,
    hasValueProps,
  };
};
export const modeStyle = mode => {
  const isWeek = mode === 'week';
  const isWeeks = mode === 'weeks';
  const isMonth = mode === 'month';
  const isYear = mode === 'year';
  const isDate = mode === 'date';
  const isRange = mode === 'range';
  const isTime = mode === 'time';
  const isTimes = mode === 'times';
  return {
    isWeek,
    isMonth,
    isYear,
    isDate,
    isWeeks,
    isRange,
    isTime,
    isTimes,
  };
};
