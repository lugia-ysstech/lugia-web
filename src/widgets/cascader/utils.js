/**
 * create by szfeng
 *
 * @flow
 */
import { recurDataAndGetSelectedKeys } from '../menu/utils';

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
  disabled: boolean,
  displayField: string,
  valueField: string,
  showAllLevels?: boolean,
  allowClear?: boolean,
  menuWidth: number,
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

export function getInitExpandedPath(props: Object) {
  return getValue(props, null);
}

export function letStringToArray(value: string[]) {
  return Array.isArray(value) ? value : [value];
}

export function getValue(props: Object, state: Object | null): string[] {
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

export function isLeafPath(
  treeData: Array<Object>,
  pathArray: string[],
  valueField: string
): boolean {
  if (!treeData) {
    return false;
  }
  const key = getLastLevelValue(pathArray);
  if (!key) {
    return false;
  }
  const item = treeData && treeData.find(item => item[valueField] === key);
  if (!item) {
    return false;
  }
  return !!item.isLeaf;
}

export function mapTreeDataToGetDisplayValue(
  treeData: Array<Object>,
  filterKeys: string[],
  valueField: string,
  displayField: string
) {
  const displayValueData = [];
  if (!filterKeys || filterKeys.length === 0 || !treeData) {
    return displayValueData;
  }
  const exisitMap = filterKeys.reduce((exist: Object, key: string) => {
    exist[key] = true;
    return exist;
  }, {});

  treeData &&
    treeData.forEach(item => {
      const key = item[valueField];
      if (exisitMap[key]) {
        displayValueData.push(item[displayField]);
      }
    });

  return displayValueData;
}

export function getInitInputValue(props: CascaderProps) {
  const { displayValue } = props;
  return displayValue ? displayValue : [];
}

export function getInputValue(props: CascaderProps, state: CascaderState) {
  const {
    showAllLevels,
    separator = '|',
    data = [],
    valueField,
    displayField,
    treeData = [],
    displayValue = '',
  } = props;

  if (displayValue) {
    return displayValue;
  }

  const value = getValue(props, state);
  const filterValueData = getFilterValueData(data, value, separator);
  const displayValueData = mapTreeDataToGetDisplayValue(
    treeData,
    filterValueData,
    valueField,
    displayField
  );

  if (showAllLevels) {
    return isArrayLengthIsZero(displayValueData)
      ? displayValueData
      : [displayValueData.join(separator)];
  }

  const isLeaf = isLeafPath(treeData, filterValueData, valueField);
  return isLeaf ? [getLastLevelValue(displayValueData)] : state ? state.inputValue : '';
}

export function getFilterValueData(
  data: Array<Object>,
  value: string[],
  separator: string
): string[] {
  const valueData = letValueSplitToArray(value, separator);
  const filterData = [];
  recurDataAndGetSelectedKeys(data, valueData, filterData);
  return filterData;
}
