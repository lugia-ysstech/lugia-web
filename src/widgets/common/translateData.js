/**
 *
 * create by guorg
 *
 * @flow
 */
import * as React from 'react';
export default function translateData(props: Object, displayValue: Array<string>): Object {
  const { data = [], valueField = 'value', displayField = 'text' } = props;
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
  getDisplayValue: Function
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
    getMapData(nextProps, getDisplayValue(nextProps, nextState), owner);
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
  owner: Object
): Object {
  const items = [];
  const displayValue = [];
  const { displayField = 'text' } = owner.props;
  const { children } = owner.props;
  if (children) {
    return {};
  }
  if (value.length > 0) {
    value.forEach(val => {
      const dataHasItem = val in owner.dataItem;
      const cancelHasItem = val in owner.cancelItemData;
      if (!dataHasItem && !cancelHasItem) {
        getMapData(owner.props, owner.state.displayValue, owner);
      }
      let dataItem = owner.dataItem[val];
      if (!dataItem) {
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

export function getMapData(props: Object, displayValue: Array<string>, owner: Object) {
  const { cancelItem = [], cancelItemData = {}, dataItem = {} } = translateData(
    props,
    displayValue
  );
  owner.cancelItem = cancelItem;
  owner.cancelItemData = cancelItemData;
  owner.dataItem = dataItem;
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
