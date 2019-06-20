/**
 *
 * create by ligx
 *
 * @flow
 */
export function toNumber(value: any, defaultValue?: number = 0): number {
  const newValue = parseInt(value);
  if (isNaN(newValue)) {
    return defaultValue;
  }
  return newValue;
}

export function isNumber(value: any): boolean {
  return typeof value === 'number';
}
