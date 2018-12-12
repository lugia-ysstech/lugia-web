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
};

export function isHasValue(props: CascaderProps) {
  return 'value' in props;
}

export function isHasDefaultValue(props: CascaderProps) {
  return 'defaultValue' in props;
}

export function getInitExpandedPath(props: CascaderProps) {
  const { value = [] } = props;
  if (isHasValue(props)) {
    return value;
  }
  return [];
}

export function getValue(props: CascaderProps, state: CascaderState | null): string[] {
  const { value = [], defaultValue = [] } = props;
  if (isHasValue(props)) {
    return value;
  }
  if (!state) {
    return isHasDefaultValue(props) ? defaultValue : [];
  }

  return state.value;
}

export function getValueData(value: string[] = [], separator: string): string[] {
  const len = value.length;
  return len === 0 ? [] : value[0].split(separator);
}

export function getLastLevelValue(valueData: string[]): string[] {
  if (!valueData || valueData.length === 0) {
    return [];
  }
  const len = valueData.length;
  return [valueData[len - 1]];
}

export function mapTreeDataToGetLeaf(props: CascaderProps, state: CascaderState) {
  const { treeData } = state;
  const valueData = filterValueData(props, state);
  const len = valueData.length;
  const key = valueData[len - 1];
  const lastItem = treeData.filter(item => {
    return item.key === key;
  });
  return lastItem[0].isLeaf;
}

export function getInitInputValue(props: CascaderProps) {
  const { displayValue } = props;
  return displayValue ? displayValue : [];
}

export function getInputValue(props: CascaderProps, state: CascaderState) {
  const { showAllLevels, separator } = props;
  const displayValueData = mapTreeDataToGetDisplayValue(props, state);

  if (showAllLevels) {
    return [displayValueData.join(separator)];
  }
  const isLeaf = mapTreeDataToGetLeaf(props, state);
  const newInputValue = isLeaf ? getLastLevelValue(displayValueData) : state.inputValue;

  return newInputValue;
}

export function mapTreeDataToGetDisplayValue(props: CascaderProps, state: CascaderState) {
  const { treeData } = state;
  const valueData = filterValueData(props, state);
  const displayValueData = [];
  treeData &&
    treeData.forEach(item => {
      if (valueData.includes(item.key)) {
        displayValueData.push(item.title);
      }
    });
  return displayValueData;
}

export function filterValueData(props: CascaderProps, state: CascaderState) {
  const { separator = '|', data = [] } = props;
  const value = isHasValue(props) ? props.value : state.value;
  const valueData = getValueData(value, separator);
  const filterData = [];
  mapDataAndGetSelectedKeys(data, valueData, filterData);
  return filterData;
}
