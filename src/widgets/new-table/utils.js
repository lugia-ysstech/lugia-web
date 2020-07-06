//@flow
import { deepMerge } from '@lugia/object-utils';

export const getEditDivTheme = (
  props: Object,
  isLugiaHead: boolean,
  propsConfig: Object,
  defaultTheme: Object
) => {
  let editDivTheme = deepMerge(
    props.getPartOfThemeProps('EditTarget', {
      props: { ...propsConfig },
    }),
    defaultTheme
  );
  if (isLugiaHead) {
    const tableTheme = props.getPartOfThemeProps('Table');
    const { themeConfig: { Th_Td } = {} } = tableTheme;
    const editingTheme = { themeConfig: { ...Th_Td } };
    editDivTheme = deepMerge(editDivTheme, editingTheme);
  }
  return editDivTheme;
};

export const isValued = (value: any) => {
  return value || value === 0;
};

export const getRandom = (limit: number) => {
  return Math.floor(Math.random() * limit);
};

export const isEqualArray = (oldValue: ?Array<Object>, newValue: ?Array<Object>): boolean => {
  return JSON.stringify(oldValue) === JSON.stringify(newValue);
};

export const isObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const isEqualObject = (oldValue: ?Object, newValue: ?Object): boolean => {
  if (!oldValue || !newValue || !isObject(oldValue) || !isObject(newValue)) {
    return false;
  }
  const oldObjKeys = Object.keys(oldValue);
  const newObjKeys = Object.keys(newValue);
  if (oldObjKeys.length !== newObjKeys.length) {
    return false;
  }
  return oldObjKeys.every(item => {
    return oldValue[item] === newValue[item];
  });
};

export const isInArray = (arrayData: ?Array<Object>, target: Object): boolean => {
  return (
    arrayData &&
    target &&
    !!arrayData.find(item => {
      return isEqualObject(item, target);
    })
  );
};
