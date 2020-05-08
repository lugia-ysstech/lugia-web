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
  console.log('isHead', isHead, 'propsConfig', propsConfig);
  if (isHead) {
    const tableTheme = props.getPartOfThemeProps('Table');
    const { themeConfig: { Th_Td } = {} } = tableTheme;
    const editingTheme = { themeConfig: { ...Th_Td } };
    editDivTheme = deepMerge(editDivTheme, editingTheme);
    console.log('tableTheme', tableTheme, 'editingTheme', editingTheme);
  }
  console.log('editDivTheme', editDivTheme);
  return editDivTheme;
};

export const isValued = (value: any) => {
  return value || value === 0;
};
