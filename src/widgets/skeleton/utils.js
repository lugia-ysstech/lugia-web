export const getNewThemeProps = (themeProps: Object, propsConfig: Object): Object => {
  const newThemeProps = {
    themeConfig: themeProps.themeConfig,
    themeState: themeProps.themeState,
    propsConfig,
  };
  return newThemeProps;
};
