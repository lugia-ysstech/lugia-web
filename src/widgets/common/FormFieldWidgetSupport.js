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


function getInitValueArray (props: any): Array<any> {
  if (isNotLimit(props)) {
    const { defaultValue = [], } = props;
    return toArray(defaultValue);
  }

  const { value = [], } = props;
  return toArray(value);
}

function getInitCodeItem (props: any): { value: string, displayValue: string } {
  let resValue = '',
    resDisplayValue = '';
  if (!isNotLimit(props)) {
    const { value = '', } = props;
    resValue = value;
  } else {
    const { defaultValue: value = '', } = props;
    resValue = value;
  }
  if (!isNotLimitByName(props, 'displayValue')) {
    const { displayValue, } = props;
    resDisplayValue = displayValue;
  } else {
    const { defaultDisplayValue: displayValue = '', } = props;
    resDisplayValue = displayValue;
  }
  return { value: resValue, displayValue: resDisplayValue, };
}

function getInitCodeItemArray (props: any): { value: Array<any>, displayValue: Array<any> } {
  let resValue = [];
  let resDisplayValue = [];
  if (!isNotLimit(props)) {
    const { value = [], } = props;
    resValue = value;
  } else {
    const { defaultValue: value = [], } = props;
    resValue = value;
  }

  if (!isNotLimitByName(props, 'displayValue')) {
    const { displayValue = [], } = props;
    resDisplayValue = displayValue;
  } else {
    const { defaultDisplayValue: displayValue = [], } = props;
    resDisplayValue = displayValue;
  }

  return { value: toArray(resValue), displayValue: toArray(resDisplayValue), };
}

function toArray (val: any): Array<string> {
  return isString(val) ? [val,] : val;
}


function isNotLimit (props: any) {
  return isNotLimitByName(props, 'value');
}

function isNotLimitByName (props: any, name: string) {
  return (name in props) === false;
}


function isString (str: any) {
  return typeof str === 'string';
}

export default {
  getValue,
  getNumberValue,
  getObjectValue,
  getInitValue,
  isNotLimit,
  getInitValueArray,
  getCodeItem: getInitCodeItem,
  getCodeItemArray: getInitCodeItemArray,
};
