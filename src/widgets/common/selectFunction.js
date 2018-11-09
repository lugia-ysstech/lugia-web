/**
 * create by szfeng
 *
 * @flow
 */

import Widget from '../consts/index';
import { DefaultHeight, MenuItemHeight, DefaultWidth } from '../css/select';

import { adjustValue } from '../utils';

export const SelectedIcon = 'SelectedIcon';
export const DefaultLimitCount = 99999;

/**
 * 获取主题
 */
export function getTheme(props: Object, triggerChild: string): Object {
  const { getTheme = () => ({}), label } = props;
  const theme = getTheme();
  const { width } = theme;
  theme.width = width ? width : DefaultWidth;
  let queryInputConfig = {};
  const inputTag = { ...theme };
  queryInputConfig = Object.assign({}, theme, queryInputConfig);
  delete queryInputConfig.height;
  const targetConfig: Object = { ...theme };
  const { height = DefaultHeight } = targetConfig;
  targetConfig.height = adjustValue(height, MenuItemHeight);
  return {
    [triggerChild]: targetConfig,
    [Widget.Trigger]: label ? Object.assign({}, theme, { float: 'left' }) : theme,
    [Widget.InputTag]: inputTag,
    [Widget.Input]: queryInputConfig,
    [SelectedIcon]: { color: '#d9d9d9', hoverColor: '#108ee9' },
  };
}

/**
 * 是否多选
 */
export function isMutliple(props: Object) {
  const { mutliple } = props;
  return mutliple;
}

/**
 * 是否支持检索功能 canSearch
 */
export function isCanSearch(props: Object) {
  const { canSearch } = props;
  return canSearch;
}

/**
 * 是否可添加自定义值 canInput
 */
export function isCanInput(props: Object) {
  const { canInput } = props;
  return canInput;
}

/**
 *  是否达到最大临界值
 */
export function isLimit(props: Object, value: string[]): boolean {
  const { limitCount = DefaultLimitCount } = props;
  return value.length >= limitCount;
}

/**
 * 自定义添加值
 */
export function appendCustomValue(
  props: Object,
  query: string,
  value: string[] | [],
  displayValue: string[] | []
) {
  const inputValue = query;
  let newValue, newDisplayValue;
  if (isMutliple(props)) {
    newValue = [...value];
    newDisplayValue = [...displayValue];
    newValue.push(inputValue);
    newDisplayValue.push(inputValue);
  } else {
    newValue = [inputValue];
    newDisplayValue = [inputValue];
  }
  return {
    newValue,
    newDisplayValue,
  };
}

/**
 * 设置value
 */

/**
 * 重新计算value值
 */

export function setNewValue(value: Array<string>, displayValue: Array<string>) {
  const realyVal = [];
  const realDisp = [];
  if (value && value.length > 0) {
    const len = value.length;
    const isHas = {};
    for (let i = 0; i < len; i++) {
      const key = value[i];
      const DisplayField = displayValue[i];
      if (isHas[key]) {
        continue;
      }
      isHas[key] = true;
      realyVal.push(key);
      realDisp.push(DisplayField);
    }
  }
  return {
    realyVal,
    realDisp,
  };
}
