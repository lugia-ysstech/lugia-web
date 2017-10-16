//@flow
import type { GetValueArgType, } from 'sv-widget';

function getValue (arg: GetValueArgType): string {
  const { value = '', defaultValue = '', } = arg;
  if ('value' in arg) {
    return value;
  } else if ('defaultValue' in arg) {
    return defaultValue;
  }
  return '';
}

function getObjectValue (arg: GetValueArgType): Object {
  const { value = {}, defaultValue = {}, } = arg;
  if ('value' in arg) {
    return value;
  } else if ('defaultValue' in arg) {
    return defaultValue;
  }
  return {};
}

function getNumberValue (arg: GetValueArgType): number {
  const { value = 0, defaultValue = 0, } = arg;
  if ('value' in arg) {
    return value;
  } else if ('defaultValue' in arg) {
    return defaultValue;
  }
  return 0;
}

export default {
  getValue,
  getNumberValue,
  getObjectValue,
};
