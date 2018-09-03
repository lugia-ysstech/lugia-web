/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import { DisplayField, ValueField } from '../consts/props';

export default function translateData(
  props: Object,
  displayValue: Array<string>,
  stateValue?: string[] | string
): Object {
  const { data = [], valueField = ValueField, displayField = DisplayField } = props;
  const value = props.value || props.defaultValue || stateValue || [];
  const values = typeof value === 'string' ? [value] : [...value];
  const dataValue = [];
  const dataItem = {};
  const cancelItem = [];
  const cancelItemData = {};
  if (data.length > 0) {
    data.forEach(item => {
      const value = item[valueField];
      dataValue.push(value);
      dataItem[value] = item;
    });
  }
  if (!displayValue || !displayValue.length || !values.length) {
    return {
      dataItem,
    };
  }
  values.forEach((value, index) => {
    if (!dataItem[value]) {
      const val = displayValue[index];
      const item = {
        [displayField]: val ? val : value,
        [valueField]: value,
      };
      cancelItem.push(item);
      cancelItemData[value] = item;
    }
  });

  return {
    cancelItem,
    cancelItemData,
    dataItem,
  };
}

export function didUpdate(
  nextProps: Object,
  nextState: Object,
  params: Object,
  getDisplayValue: Function,
  updateHanlder: Function
) {
  let displayValueEqual = true;
  let valueEqual = true;
  const displayValue = params.props.displayValue;
  const nextDisplayValue = nextProps.displayValue;

  const value = params.props.value;
  const nextValue = nextProps.value;

  displayValueEqual = getEqualResult(displayValue, nextDisplayValue);
  valueEqual = getEqualResult(value, nextValue);

  if (
    nextState.dataLength !== params.state.dataLength ||
    nextProps.data !== params.props.data ||
    !displayValueEqual ||
    !valueEqual
  ) {
    updateMapData(nextProps, getDisplayValue(nextProps, nextState), updateHanlder);
  }
  return true;
}

function getEqualResult(value, nextValue) {
  if (Array.isArray(value) && Array.isArray(nextValue)) {
    return nextValue.join(',') === value.join(',');
  }
  return nextValue == value;
}

export function getItems(
  value: Array<string>,
  needDisplayValue: boolean = false,
  params: Object,
  handler: { updateHanlder: Function, needUpdate?: Function, getMapData: Function }
): Object {
  const items = [];
  const displayValue = [];
  const { displayField = DisplayField, children } = params.props;
  if (children) {
    return {};
  }

  if (value.length > 0) {
    const { updateHanlder, needUpdate = (val: any) => false, getMapData } = handler;
    value.forEach(val => {
      if (needUpdate(val)) {
        updateMapData(params.props, params.state.displayValue, updateHanlder);
      }
      let dataItem = getMapData().dataItem[val];
      if (!dataItem && getMapData().cancelItemData) {
        dataItem = getMapData().cancelItemData[val];
      }
      items.push(dataItem);
      needDisplayValue && displayValue.push(dataItem[displayField]);
    });
  }
  return { items, displayValue };
}

export function handleCreate(params: Object, type: 'radio' | 'checkbox') {
  const { children, data = [] } = params.props;
  const result = [];

  if (children) {
    return renderChildren(params, type);
  }

  const pushItem = (cancel: boolean) => item => {
    result.push(params.getChildDom(item, cancel));
  };

  const { cancelItem } = params;
  cancelItem && cancelItem.forEach(pushItem(true));

  data && data.forEach(pushItem(false));
  return result;
}

export function updateMapData(
  props: Object,
  displayValue: Array<string>,
  updateHandler: Function,
  stateValue?: string[] | string
) {
  const { cancelItem = [], cancelItemData = {}, dataItem = {} } = translateData(
    props,
    displayValue,
    stateValue
  );
  updateHandler({ cancelItem, cancelItemData, dataItem });
}

function renderChildren(params: Object, type: 'radio' | 'checkbox') {
  let { value } = params.state;
  if (!value) {
    value = type === 'radio' ? '' : [];
  }
  const { children, disabled, styles = 'default' } = params.props;
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onChange: type === 'radio' ? params.handleChange()() : params.handleChange(),
        checked:
          type === 'radio' ? value === child.props.value : value.indexOf(child.props.value) !== -1,
        disabled: disabled || child.props.disabled,
        styles: styles || child.props.styles,
        hasValue: params.hasValueProps(),
      });
    }
  });
}

export const getValueAndDisplayValue = function(props: Object, state: ?Object): Object {
  const isInit = state === null || state === undefined;
  state = state ? state : {};
  const isValue = 'value' in props;
  const isDisplayValue = 'displayValue' in props;
  const { value, defaultValue, displayValue, defaultDisplayValue } = props;
  const { value: sValue } = state;
  const realValue = isValue ? value : isInit ? defaultValue : sValue;
  const { displayValue: sDisplayValue } = state;
  return {
    value: realValue,
    displayValue: isDisplayValue
      ? displayValue
      : isInit
        ? defaultDisplayValue
        : sDisplayValue
          ? sDisplayValue
          : realValue,
  };
};
