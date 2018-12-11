/**
 * create by szfeng
 *
 * @flow
 */
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
  } else if (isHasDefaultValue(props)) {
    return defaultValue;
  }

  return state ? state.value : [];
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
  const { value, treeData } = state;
  const { separator = '|' } = props;
  const valueData = getValueData(value, separator);
  const len = valueData.length;
  const key = valueData[len - 1];
  let isLeaf;
  treeData &&
    treeData.forEach(item => {
      if (item.key === key) {
        isLeaf = item.isLeaf ? true : false;
      }
    });
  return isLeaf;
}

export function getInitInputValue(props: CascaderProps) {
  const { displayValue } = props;
  return displayValue ? displayValue : [];
}

export function getInputValue(props: CascaderProps, state: CascaderState) {
  const { showAllLevels, separator } = props;
  const { treeData } = state;
  const value = isHasValue(props) ? props.value : state.value;
  const displayValueData = mapTreeDataToGetDisplayValue(treeData, value, separator);

  if (showAllLevels) {
    return [displayValueData.join(separator)];
  }
  const isLeaf = mapTreeDataToGetLeaf(props, state);
  const newInputValue = isLeaf ? getLastLevelValue(displayValueData) : state.inputValue;

  return newInputValue;
}

export function mapTreeDataToGetDisplayValue(
  treeData: Object[],
  value: string[] = [],
  separator: string = '|'
) {
  const valueData = getValueData(value, separator);

  const displayValueData = [];
  for (let i = 0; i < valueData.length; i++) {
    treeData &&
      treeData.forEach(item => {
        if (item.key === valueData[i]) {
          displayValueData.push(item.title);
        }
      });
  }
  return displayValueData;
}
