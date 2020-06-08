import {
  validateValueDefaultTheme,
  validateBorderDefaultTheme,
  isValidateError,
} from '../css/validateHoc';
import { deepMerge } from '@lugia/object-utils';
import Widget from '../consts/index';
import { inputTagThemeDefaultConfig } from '../css/select';

function getInputtagWrapThemeConfig(props: Object): Object {
  const { getPartOfThemeConfig, validateStatus } = props;
  const containerThemeConfig = getPartOfThemeConfig('Container');
  if (!isValidateError(validateStatus)) {
    return containerThemeConfig;
  }
  const { themeConfig: colorThemeConfig } = validateValueDefaultTheme();
  const { themeConfig: borderThemeConfig } = validateBorderDefaultTheme();
  const errorVliDataStatus = deepMerge(
    colorThemeConfig,
    borderThemeConfig,
    getPartOfThemeConfig('ValidateErrorInput')
  );
  return deepMerge(containerThemeConfig, errorVliDataStatus);
}

export function getInputtagThemeHoc(props: Object): Object {
  const { getPartOfThemeConfig, size = 'default' } = props;
  const defaultInputTagThemeConfig = inputTagThemeDefaultConfig[size];
  const inputtagWrapThemeConfig = getInputtagWrapThemeConfig(props);
  const customInputTagThemeConfig = {
    InputTagWrap: inputtagWrapThemeConfig,
    TextContent: getPartOfThemeConfig('TextContent'),
    TagWrap: getPartOfThemeConfig('TagWrap'),
    TagIcon: getPartOfThemeConfig('TagIcon'),
    SwitchIcon: getPartOfThemeConfig('SwitchIcon'),
    ClearIcon: getPartOfThemeConfig('ClearIcon'),
    Placeholder: getPartOfThemeConfig('Placeholder'),
    Menu: getPartOfThemeConfig('InputMenu'),
  };
  const deepMergeThemeConfig = deepMerge(defaultInputTagThemeConfig, customInputTagThemeConfig);
  const inputTagTheme = {
    [Widget.InputTag]: deepMergeThemeConfig,
  };
  return inputTagTheme;
}
