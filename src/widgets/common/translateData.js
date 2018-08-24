/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
import { DisplayField, ValueField } from '../consts/props';

export default function translateData(props: Object, displayValue: Array<string>): Object {
  const { data = [], valueField = ValueField, displayField = DisplayField } = props;
  const value = props.value || props.defaultValue || [];
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
  owner: Object,
  getDisplayValue: Function,
  updateHanlder: Function
) {
  let displayValueEqual = true;
  let valueEqual = true;
  const displayValue = owner.props.displayValue;
  const nextDisplayValue = nextProps.displayValue;

  const value = owner.props.value;
  const nextValue = nextProps.value;

  displayValueEqual = getEqualResult(displayValue, nextDisplayValue);
  valueEqual = getEqualResult(value, nextValue);

  if (
    nextState.dataLength !== owner.state.dataLength ||
    nextProps.data !== owner.props.data ||
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
  owner: Object,
  handler: { updateHanlder: Function, needUpdate?: Function }
): Object {
  const items = [];
  const displayValue = [];
  const { displayField = DisplayField } = owner.props;
  const { children } = owner.props;
  if (children) {
    return {};
  }

  if (value.length > 0) {
    const { updateHanlder, needUpdate = (val: any) => false } = handler;
    value.forEach(val => {
      if (needUpdate(val)) {
        updateMapData(owner.props, owner.state.displayValue, updateHanlder);
      }
      let dataItem = owner.dataItem[val];
      if (!dataItem && owner.cancelItemData) {
        dataItem = owner.cancelItemData[val];
      }
      items.push(dataItem);
      needDisplayValue && displayValue.push(dataItem[displayField]);
    });
  }
  return { items, displayValue };
}

export function handleCreate(owner: Object, type: 'radio' | 'checkbox') {
  const { children, data = [] } = owner.props;
  const result = [];

  if (children) {
    return renderChildren(owner, type);
  }

  const pushItem = (cancel: boolean) => item => {
    result.push(owner.getChildDom(item, cancel));
  };

  const { cancelItem } = owner;
  cancelItem && cancelItem.forEach(pushItem(true));

  data && data.forEach(pushItem(false));
  return result;
}

export function updateMapData(props: Object, displayValue: Array<string>, updateHandler: Function) {
  const { cancelItem = [], cancelItemData = {}, dataItem = {} } = translateData(
    props,
    displayValue
  );
  updateHandler({ cancelItem, cancelItemData, dataItem });
}

function renderChildren(owner: Object, type: 'radio' | 'checkbox') {
  let { value } = owner.state;
  if (!value) {
    value = type === 'radio' ? '' : [];
  }
  const { children, disabled, styles = 'default' } = owner.props;
  return React.Children.map(children, child => {
    return React.cloneElement(child, {
      onChange: type === 'radio' ? owner.handleChange() : owner.handleChange,
      checked:
        type === 'radio' ? value === child.props.value : value.indexOf(child.props.value) !== -1,
      disabled: disabled || child.props.disabled,
      styles: styles || child.props.styles,
      hasValue: owner.hasValueProps(),
    });
  });
}

export const getValueAndDisplayValue = function(props: Object, state: ?Object): Object {
  const isValue = 'value' in props;
  const isDisplayValue = 'displayValue' in props;
  const { value, defaultValue, displayValue, defaultDisplayValue } = props;
  const realValue = isValue ? value : state ? state.value : defaultValue;
  return {
    value: realValue,
    displayValue: isDisplayValue ? displayValue : state ? realValue : defaultDisplayValue,
  };
};
