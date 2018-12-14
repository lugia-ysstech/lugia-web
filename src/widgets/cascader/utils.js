/**
 * create by szfeng
 *
 * @flow
 */
import { mapDataAndGetSelectedKeys } from '../menu/utils';
type CascaderProps = {
  getTheme: Function,
  offsetY: number,
  offsetX: number,
  action?: string,
  placeholder?: string,
  data?: Object[],
  onClick?: Function,
  onClear?: Function,
  onChange?: Function,
  separator?: string,
  value: string[],
  displayValue?: string[],
  defaultValue?: string[],
  selectedKeys: string[],
  disabled: boolean,
  displayField: string,
  valueField: string,
  popupVisible?: boolean,
  showAllLevels?: boolean,
  placeholder?: string,
  allowClear?: boolean,
};
type CascaderState = {
  popupVisible: boolean,
  value: string[],
  expandedPath: string[],
  inputValue: string[],
  treeData: Array<Object>,
  selectedKeys: string[],
};

export function isHasValue(props: CascaderProps) {
  return 'value' in props;
}

export function isHasDefaultValue(props: CascaderProps) {
  return 'defaultValue' in props;
}

export function getLastIndex(array: Array<any>): number {
  return array.length - 1;
}

export function getInitExpandedPath(props: CascaderProps) {
  const initExpanded = getValue(props, null);

  return initExpanded;
}

export function letStringToArray(value: string[]) {
  return Array.isArray(value) ? value : [value];
}

export function getValue(props: CascaderProps, state: CascaderState | null): string[] {
  const { value = [], defaultValue = [] } = props;

  if (isHasValue(props)) {
    return value ? letStringToArray(value) : [];
  }
  if (!state) {
    return isHasDefaultValue(props) && defaultValue ? letStringToArray(defaultValue) : [];
  }

  return state.value;
}

export function isArrayLengthIsZero(value: string[]): boolean {
  return value.length === 0;
}

// 如果value是数字呢？
// split不Number的方法，如果传数字会报错
// 考虑容错
export function letValueSplitToArray(value: string[] = [], separator: string): string[] {
  if (Array.isArray(value)) {
    return isArrayLengthIsZero(value) ? [] : value[0].split(separator);
  }
  return value.split(separator);
}

export function getLastLevelValue(valueData: string[]): any {
  if (!valueData || isArrayLengthIsZero(valueData)) {
    return undefined;
  }
  const lastIndex = getLastIndex(valueData);
  return valueData[lastIndex];
}

export function mapTreeDataToGetLeaf(treeData: Array<Object>, filterValueData: string[]): boolean {
  const key = getLastLevelValue(filterValueData);
  if (!key) {
    return false;
  }
  let isLeaf;
  treeData &&
    treeData.forEach(item => {
      if (item.value === key) {
        isLeaf = item.isLeaf;
      }
    });
  return !!isLeaf;
}

export function mapTreeDataToGetDisplayValue(treeData: Array<Object>, filterValueData: string[]) {
  const displayValueData = [];
  treeData &&
    treeData.forEach(item => {
      if (filterValueData.includes(item.value)) {
        displayValueData.push(item.text);
      }
    });
  return displayValueData;
}

export function getInitInputValue(props: CascaderProps) {
  const { displayValue } = props;
  return displayValue ? displayValue : [];
}

export function getInputValue(props: CascaderProps, state: CascaderState) {
  const { showAllLevels, separator = '|', data = [] } = props;
  const { treeData } = state;
  const value = getValue(props, state);
  const filterValueData = getFilterValueData(data, value, separator);

  const displayValueData = mapTreeDataToGetDisplayValue(treeData, filterValueData);
  if (showAllLevels) {
    return isArrayLengthIsZero(displayValueData)
      ? displayValueData
      : [displayValueData.join(separator)];
  }

  const isLeaf = mapTreeDataToGetLeaf(treeData, filterValueData);
  const newInputValue = isLeaf ? [getLastLevelValue(displayValueData)] : state.inputValue;

  return newInputValue;
}

export function getFilterValueData(data: Array<Object>, value: string[], separator: string) {
  const valueData = letValueSplitToArray(value, separator);
  const filterData = [];
  mapDataAndGetSelectedKeys(data, valueData, filterData);
  return filterData;
}
