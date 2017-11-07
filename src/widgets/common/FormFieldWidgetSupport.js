//@flow
import type { GetValueArgType, } from 'sv-widget';

function getValue (props: any, state: any): string {
  let value;
  if ('value' in props) {
    value = props.value;
  } else {
    value = state.value;
  }
  return value;
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
