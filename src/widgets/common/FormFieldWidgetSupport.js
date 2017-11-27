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

function getNumberValue (props: any, state: any): number {
  let value;
  if ('value' in props) {
    value = props.value;
  } else {
    value = state.value;
  }
  return value;
}


function getInitValue (props: any) {
  if (isNotLimit(props)) {
    const { defaultValue = '', } = props;
    return defaultValue;
  }

  const { value = '', } = props;
  return value;
}

function getInitCodeItem (props: any): { value: string, displayValue: string } {
  if (!isNotLimit(props)) {
    const { value = '', displayValue = '', } = props;
    return { value, displayValue, };
  }
  const { defaultValue: value = '', defaultDisplayValue: displayValue = '', } = props;
  return { value, displayValue, };
}


function isNotLimit (props: any) {
  return ('value' in props) === false;
}

export default {
  getValue,
  getNumberValue,
  getObjectValue,
  getInitValue,
  isNotLimit,
  getCodeItem: getInitCodeItem,
};
