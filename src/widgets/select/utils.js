import {
  validateValueDefaultTheme,
  validateBorderDefaultTheme,
  isValidateError,
} from '../css/validateHoc';
import { deepMerge } from '@lugia/object-utils';
import Widget from '../consts/index';

function getInputtagWrapThemeConfig(props: Object): Object {
  const { getPartOfThemeConfig, validateStatus } = props;
  const containerThemeConfig = getPartOfThemeConfig('Container');
  if (!isValidateError(validateStatus)) {
    return getPartOfThemeConfig('Container');
  }
  const { themeConfig: colorThemeConfig } = validateValueDefaultTheme;
  const { themeConfig: borderThemeConfig } = validateBorderDefaultTheme;
  const errorVliDataStatus = deepMerge(
    colorThemeConfig,
    borderThemeConfig,
    getPartOfThemeConfig('ValidateErrorInput')
  );
  return deepMerge(errorVliDataStatus, containerThemeConfig);
}

export function getInputtagThemeHoc(props: Object): Object {
  const { getPartOfThemeConfig } = props;
  const inputtagWrapThemeConfig = getInputtagWrapThemeConfig(props);

  const inputtagTheme = {
    [Widget.InputTag]: {
      InputTagWrap: inputtagWrapThemeConfig,
      TagWrap: getPartOfThemeConfig('TagWrap'),
      TagIcon: getPartOfThemeConfig('TagIcon'),
      SwitchIcon: getPartOfThemeConfig('SwitchIcon'),
      ClearIcon: getPartOfThemeConfig('ClearIcon'),
      Placeholder: getPartOfThemeConfig('Placeholder'),
      Menu: getPartOfThemeConfig('InputMenu'),
    },
  };
  return inputtagTheme;
}
