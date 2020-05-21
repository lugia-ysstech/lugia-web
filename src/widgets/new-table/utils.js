//@flow
import { deepMerge } from '@lugia/object-utils';

export const getEditDivTheme = (
  props: Object,
  isHead: boolean,
  propsConfig: Object,
  defaultTheme: Object
) => {
  let editDivTheme = deepMerge(
    props.getPartOfThemeProps('EditTarget', {
      props: { ...propsConfig },
    }),
    defaultTheme
  );
  if (isHead) {
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
