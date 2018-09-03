/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import { DisplayField, ValueField } from '../consts/props';
import Support from '../common/FormFieldWidgetSupport';

export default function translateData(
  props: Object,
  displayValue: Array<string>,
  stateValue?: string[] | string
): Object {
  const { data = [], valueField = ValueField, displayField = DisplayField } = props;
  const value = props.value || props.defaultValue || stateValue || [];
  const values = toArray(value);
  displayValue = toArray(displayValue);
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
  const displayValue = toArray(params.props.displayValue);
  const nextDisplayValue = toArray(nextProps.displayValue);

  const value = toArray(params.props.value);
  const nextValue = toArray(nextProps.value);

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
  value = toArray(value);
  const items = [];
  const displayValue = [];
  const { displayField = DisplayField, children } = params.props;
  if (children) {
    return {};
  }

  if (value.length > 0) {
    const { updateHanlder, needUpdate = (val: any) => false, getMapData } = handler;
    console.log(value);
    value.forEach(val => {
      if (needUpdate(val)) {
        updateMapData(params.props, params.state.displayValue, updateHanlder);
      }
      let dataItem = getMapData().dataItem[val];
      if (!dataItem && getMapData().cancelItemData) {
        dataItem = getMapData().cancelItemData[val];
      }
      items.push(dataItem);
      let theDisplayVlaue = val;
      if (needDisplayValue) {
        if (dataItem && dataItem[displayField]) {
          theDisplayVlaue = dataItem[displayField];
        }
        displayValue.push(theDisplayVlaue);
      }
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
  displayValue?: Array<string> = [],
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
  const { children, disabled, styles } = params.props;
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

export const getDisplayValue = (
  value: string[],
  cache: { cancelItemData: Object, dataItem: Object, displayField: string }
): string[] => {
  const res = [];
  if (!value) {
    return res;
  }
  value = toArray(value);
  const { cancelItemData = {}, dataItem = {}, displayField } = cache;
  return value.map(
    (v: string): string => {
      const dataDisplayValue = getItem(dataItem, v, displayField);
      if (dataDisplayValue) {
        return dataDisplayValue;
      }
      const cancelDisplayValue = getItem(cancelItemData, v, displayField);
      if (cancelDisplayValue) {
        return cancelDisplayValue;
      }
      const cancelItem = cancelItemData[v];
      if (cancelItem) {
        return cancelItem[displayField];
      }
      return v;
    }
  );
};

function getItem(itemMap: Object, v: string, displayField: string) {
  const item = itemMap[v];
  if (item) {
    return item[displayField];
  }
  return undefined;
}

function toArray(param: any, defaultValue?: any = []): any[] {
  if (!param) {
    return defaultValue;
  }
  return Support.toArray(param);
}
export const getValueAndDisplayValue = function(props: Object, state: ?Object): Object {
  const isInit = state === null || state === undefined;
  state = state ? state : {};
  const isValue = 'value' in props;
  const isDisplayValue = 'displayValue' in props;
  let { value, defaultValue, displayValue, defaultDisplayValue } = props;
  const { value: sValue } = state;
  let realValue = isValue ? value : isInit ? defaultValue : sValue;
  let { displayValue: sDisplayValue } = state;

  realValue = toArray(realValue, null);
  displayValue = toArray(displayValue, null);
  sDisplayValue = toArray(sDisplayValue, null);
  defaultDisplayValue = toArray(defaultDisplayValue, null);

  const result = {
    value: realValue,
    displayValue: isDisplayValue
      ? displayValue
      : isInit
        ? defaultDisplayValue
        : sDisplayValue
          ? sDisplayValue
          : undefined,
  };
  if (result.displayValue && result.displayValue.length === 0) {
    result.displayValue = undefined;
  }
  return result;
};
