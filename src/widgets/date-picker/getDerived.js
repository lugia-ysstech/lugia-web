import moment from 'moment';
export const getDerived = (nextProps, preState) => {
  const { defaultValue, mode, showToday } = nextProps;
  const normalFormat = mode === 'month' ? 'YYYY-DD' : mode === 'year' ? 'YYYY' : 'YYYY-MM-DD';
  let { value, format = normalFormat, weeks = 1 } = nextProps;

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
  };
};
