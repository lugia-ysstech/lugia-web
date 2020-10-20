import _ from 'lodash';

export const deepCopy = (arr: Object[]) => {
  return _.cloneDeep(arr);
};

export const isEqualArray = (arr: any[], newArr: any[], opt: { isStrengthen: false }) => {
  if (arr.length !== newArr.length) {
    return false;
  }
  const { isStrengthen } = opt || {};
  let flag = true;
  newArr.forEach((item, index) => {
    const currentArrIndex = arr.findIndex(list => _.isEqual(list, item));
    if (isStrengthen) {
      if (currentArrIndex !== index) {
        flag = false;
      }
    } else {
      if (currentArrIndex <= -1) {
        flag = false;
      }
    }
  });
  return flag;
};
