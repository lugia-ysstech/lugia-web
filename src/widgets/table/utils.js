import isEqual from 'lodash/isEqual';
export const deepCopy = (arr: Object[]) => {
  if (typeof arr !== 'object') return;

  const newArr = arr instanceof Array ? [] : {};
  for (const key in arr) {
    if (arr.hasOwnProperty(key)) {
      newArr[key] = typeof arr[key] === 'object' ? deepCopy(arr[key]) : arr[key];
    }
  }
  return newArr;
};
export const isEqualArray = (arr: any[], newArr: any[]) => {
  if (arr.length !== newArr.length) {
    return false;
  }
  arr = arr.map(item => JSON.stringify(item));
  newArr = newArr.map(item => JSON.stringify(item));
  let flag = true;
  newArr.forEach(item => {
    if (arr.indexOf(item) <= -1) {
      flag = false;
    }
  });
  return flag;
};
