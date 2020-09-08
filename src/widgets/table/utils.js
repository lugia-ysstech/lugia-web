import _ from 'lodash';

export const deepCopy = (arr: Object[]) => {
  return _.cloneDeep(arr);
};
export const isEqualArray = (arr: any[], newArr: any[]) => {
  return _.isEqual(arr, newArr);
};
