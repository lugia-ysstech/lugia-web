import { isBeforeTime, hasLimitValue, isAfterTime } from './booleanUtils';
export const getTheme = (props: Object) => {
  const { getTheme } = props;
  const theme = getTheme();
  return { ...theme };
};

export function tansValueFromStringToArray(props) {
  const filterParmas = { defaultValue: 'defaultValue', value: 'value', placeholder: 'placeholder' };
  const newProps = {};
  for (const i in props) {
    newProps[i] = props[i];
    if (i == filterParmas[i]) {
      newProps[i] = [props[i]];
    }
  }
  return newProps;
}
export function getNewStepProps(props: Object) {
  const { step } = props;
  return typeof step === 'number' && !isNaN(step) && step > 0 ? step : 12;
}

export function getLimitInputValue({
  value,
  oldValue,
  limitValue,
  format,
  type,
}: {
  value: string,
  oldValue: string,
  limitValue: string,
  format: string,
  type: 'start' | 'end',
}) {
  if (!hasLimitValue(limitValue, format)) {
    return value;
  }
  const param = { everyTime: value, compareTime: limitValue, format };
  let isOver = false;

  switch (type) {
    case 'start':
      isOver = isBeforeTime(param);
      break;
    case 'end':
      isOver = isAfterTime(param);
      break;
    default:
      break;
  }
  if (isOver) {
    return oldValue || limitValue;
  }
  return value;
}
