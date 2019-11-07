export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}
export function isMinValue(value, min) {
  return isNumber(value) && value < min;
}
export function isMaxValue(value, max) {
  return isNumber(value) && value > max;
}
