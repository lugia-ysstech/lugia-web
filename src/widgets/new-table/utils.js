//@flow
import { deepMerge } from '@lugia/object-utils';

export const getEditDivTheme = (props, isHead, propsConfig, defaultTheme) => {
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
