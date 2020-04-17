import { getBorder, getBoxShadow } from '@lugia/theme-utils';

import colorsFunc from '../css/stateColor';
import get from '../css/theme-common-dict';
const { shadowSpread, hShadow, vShadow, borderSize } = colorsFunc();
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const dangerHoverColor = '$lugia-dict.@lugia/lugia-web.dangerHoverColor';
const dangerActiveColor = '$lugia-dict.@lugia/lugia-web.dangerActiveColor';
const borderDisableColor = '$lugia-dict.@lugia/lugia-web.borderDisableColor';

export const DefaultHelp = '验证出错';

export type ValidateStatus = 'default' | 'error';
export type ValidateType = 'top' | 'bottom' | 'inner';

export function isValidateError(validateStatus: ValidateStatus): boolean {
  return validateStatus === 'error';
}

export const validateBorderDefaultTheme = {
  themeConfig: {
    normal: {
      border: getBorder({ color: dangerColor, width: borderSize, style: 'solid' }),
      boxShadow: getBoxShadow(
        `${hShadow}px ${vShadow}px ${shadowSpread}px ${get('inputDangerColor')}`
      ),
    },
    hover: {
      border: getBorder({ color: dangerHoverColor, width: borderSize, style: 'solid' }),
    },
    active: {
      border: getBorder({ color: dangerActiveColor, width: borderSize, style: 'solid' }),
      boxShadow: getBoxShadow(`${hShadow}px ${vShadow}px ${shadowSpread}px ${dangerActiveColor}`),
    },
    disabled: {
      border: getBorder({ color: borderDisableColor, width: borderSize, style: 'solid' }),
    },
  },
};
export const validateValueDefaultTheme = {
  themeConfig: {
    normal: {
      color: dangerColor,
    },
  },
};
export const validateWidthTheme = { themeConfig: { normal: { width: '100%' } } };
