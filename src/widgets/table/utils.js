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

export const getValidSelectRowKeys = (
  data: Object[],
  selectRowKeys,
  validSelectRowKeys,
  rowKey,
  cb
) => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const { hasChildren = false, children = [] } = item;
    const itemKey = item[rowKey];
    const checkboxProps = cb(item) || {};
    if (!checkboxProps.disabled) {
      const selectc = selectRowKeys.includes(itemKey);
      if (selectc) {
        validSelectRowKeys.push(itemKey);
      }
      if (hasChildren && children.length > 0) {
        getValidSelectRowKeys(children, selectRowKeys, validSelectRowKeys, rowKey, cb);
      }
    }
  }
  return validSelectRowKeys;
};

export const getValidNotCheckedKeys = (
  data: Object[],
  selectRowKeys: string[],
  rowKey,
  setCheckboxProps
) => {
  if (data.length <= 0) {
    return [];
  }
  const { childrenKeys = [] } = getChildrenKeys(data, [], [], rowKey, setCheckboxProps);
  return childrenKeys.filter(item => !selectRowKeys.includes(item));
};

export const getAllParentData = (data: Object[], key, rowKey) => {
  let parentDataArr = [];
  if (data.length == 0) {
    if (key) {
      parentDataArr.unshift(data);
    }
    return parentDataArr;
  }
  const getParentData = (childrenData, nodeId) => {
    for (let i = 0, length = childrenData.length; i < length; i++) {
      const node = childrenData[i];
      if (node[rowKey] === nodeId) {
        parentDataArr.unshift(node);
        getParentData(data, node.parentId);
        break;
      } else {
        if (node.children) {
          getParentData(node.children, nodeId);
        }
      }
    }
    return parentDataArr;
  };
  parentDataArr = getParentData(data, key);
  return parentDataArr;
};

export const getChildrenKeys = (data, childrenKeys, childrenRecords, rowKey, setCheckboxProps?) => {
  if (data.length <= 0) {
    return { childrenKeys: [], childrenRecords: [] };
  }
  data.map(item => {
    const { children = [] } = item;
    const checkboxProps = (setCheckboxProps && setCheckboxProps(item)) || {};
    if (!checkboxProps.disabled) {
      childrenKeys.push(item[rowKey]);
      childrenRecords.push(item);
      if (children.length > 0) {
        const { childrenKeys: keys, childrenRecords: records } = getChildrenKeys(
          children,
          childrenKeys,
          childrenRecords,
          rowKey,
          setCheckboxProps
        );
        return {
          childrenKeys: keys,
          childrenRecords: records,
        };
      }
    }
  });
  return { childrenKeys, childrenRecords };
};

export function isEqualObject(newData, data) {
  return _.eq(newData, data);
}

export function circularReferenceStringify(data) {
  let cache = [];
  const str = JSON.stringify(data, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        return;
      }
      cache.push(value);
    }
    return value;
  });

  cache = null;

  return str;
}
