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

export default {
  getValue,
};
