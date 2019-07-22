import { modeStyle } from '../utils/booleanUtils';
import { DateWrapperPadding, em } from '../styled/utils';
import { deepMerge } from '@lugia/object-utils';

export default function getThemeProps(props, partName) {
  const { getPartOfThemeProps, mode } = props;
  const themeProps = getPartOfThemeProps(partName);
  themeProps.propsConfig = { mode };
  return themeProps;
}
export function inputContainTheme(props) {
  const { getPartOfThemeProps, mode } = props;

  const themeProps = getPartOfThemeProps('InputContain');
  themeProps.propsConfig = { mode };
}
