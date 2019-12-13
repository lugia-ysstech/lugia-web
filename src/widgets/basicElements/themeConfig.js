import colorsFunc from '../css/stateColor';
import { getBorderRadius } from '@lugia/theme-utils';
import { deepMerge } from '@lugia/object-utils';
const { themeColor } = colorsFunc();
export default function getThemeProps(props: TypeProps) {
  const { getPartOfThemeProps, shape } = props;
  let themeProps = getPartOfThemeProps('Container');

  const defaultNormalTheme = {
    normal: {
      width: 32,
      height: 32,
      background: { color: themeColor },
    },
  };
  themeProps = deepMerge({ themeConfig: { ...defaultNormalTheme } }, themeProps);

  if (shape === 'circular') {
    const defaultTheme = {
      normal: { borderRadius: getBorderRadius('50%') },
    };
    themeProps = deepMerge(themeProps, { themeConfig: { ...defaultTheme } });
  }

  if (shape === 'triangle') {
    const { themeConfig } = themeProps;
    const {
      normal: {
        width,
        height,
        background: { color },
      },
    } = themeConfig;

    const border = width / 2;
    const triangleDefaultTheme = {
      normal: {
        border: {
          top: { width: 0, style: 'solid', color: 'transparent' },
          right: { width: border, style: 'solid', color: 'transparent' },
          bottom: { width: height, style: 'solid', color },
          left: { width: border, style: 'solid', color: 'transparent' },
        },
        borderRadius: getBorderRadius(0),
        boxShadow: '',
        background: { color: '#fff' },
        width: 0,
        height: 0,
      },
    };
    themeProps = deepMerge(themeProps, { themeConfig: { ...triangleDefaultTheme } });
  }

  themeProps.propsConfig = { shape };

  return themeProps;
}
