import { themeColor } from '../styled/utils';
import { deepMerge } from '@lugia/object-utils';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
import { modeStyle } from '../utils/booleanUtils';
const {
  normalColor,
  hoverColor,
  spiritColor,
  borderSize,
  borderColor,
  disableColor,
  borderDisableColor,
  darkGreyColor,
  circleBorderRadius,
} = themeColor;

export default function getThemeProps(props, partName) {
  const { getPartOfThemeProps, mode } = props;
  const themeProps = getPartOfThemeProps(partName);
  themeProps.propsConfig = { mode };
  return themeProps;
}

export function getWrapThemeProps(props, partName) {
  const { getPartOfThemeProps, mode } = props;
  const themeProps = getPartOfThemeProps(partName);
  themeProps.propsConfig = { mode };

  const { themeConfig } = themeProps;
  const defaultNormal = {
    normal: {
      width: '100%',
      height: 32,
      border: getBorder({ width: borderSize, color: borderColor, style: 'solid' }),
      borderRadius: getBorderRadius(3),
    },
  };

  const deeMergeTheme = deepMerge(defaultNormal, themeConfig) || {};
  const { normal = {}, hover = {}, disabled = {} } = deeMergeTheme;
  const {
    border: {
      top: { width: topWidth } = {},
      right: { width: rightWidth } = {},
      bottom: { width: bottomWidth } = {},
      left: { width: leftWidth } = {},
    } = {},
    borderRadius,
  } = normal;
  const {
    border: {
      top: { color: topColor = normalColor } = {},
      right: { color: rightColor = normalColor } = {},
      bottom: { color: bottomColor = normalColor } = {},
      left: { color: LeftColor = normalColor } = {},
    } = {},
  } = hover;
  const deafultHoverBorderColor = {
    border: {
      top: { color: topColor, width: topWidth },
      right: { color: rightColor, width: rightWidth },
      bottom: { color: bottomColor, width: bottomWidth },
      left: { color: LeftColor, width: leftWidth },
    },
  };
  const defaultDisabled = {
    background: {
      color: disableColor,
    },
    color: '#ccc',
    border: getBorder({ color: borderDisableColor }),
    boxShadow: {
      color: borderDisableColor,
    },
    borderRadius,
  };

  // 此段注释代码，用于hover继承normal的border宽度
  //const hoverTheme = deepMerge(hover, deafultHoverBorderColor);

  const hoverTheme = deepMerge(deafultHoverBorderColor, hover);
  const disabledTheme = deepMerge(defaultDisabled, disabled);
  themeConfig.normal = normal;
  themeConfig.hover = hoverTheme;
  themeConfig.disabled = disabledTheme;
  return themeProps;
}
export function getDateTheme(props) {
  const { getPartOfThemeProps } = props;
  const themeProps = getPartOfThemeProps('InMonthDate');
  const outMonthDateThemeProps = getPartOfThemeProps('OutMonthDate');
  const rangeDateDateThemeProps = getPartOfThemeProps('RangeDate');
  const {
    themeConfig: { normal: rangeNormal = {} },
  } = rangeDateDateThemeProps;

  const {
    themeConfig: { normal: outNormal = {} },
  } = outMonthDateThemeProps;
  const defaultOutNormal = {
    color: '#ccc',
  };
  const {
    themeConfig: { hover = {}, normal = {}, active = {} },
  } = themeProps;
  const defaultNormal = {
    color: darkGreyColor,
  };
  const defaultHover = {
    background: { color: hoverColor },
    color: '#fff',
    borderRadius: getBorderRadius(circleBorderRadius),
    border: getBorder({ width: 0, color: '', style: '' }),
  };
  const outMonthNormalTheme = deepMerge(defaultOutNormal, outNormal);

  const hoverTheme = deepMerge(defaultHover, hover);
  const normalTheme = deepMerge(defaultNormal, normal);
  const defaultActive = {
    ...hoverTheme,
    background: { color: normalColor },
    border: getBorder({ width: 0, color: '', style: '' }),
  };

  const activeTheme = deepMerge(defaultActive, active);

  const defaultRangeNormal = {
    background: { color: spiritColor },
    color: normalTheme.color,
    borderRadius:
      !hover.borderRadius && !active.borderRadius ? getBorderRadius(20) : activeTheme.borderRadius,
  };
  const rangeNormalTheme = deepMerge(defaultRangeNormal, rangeNormal);
  return {
    hoverTheme,
    normalTheme,
    activeTheme,
    outMonthNormalTheme,
    rangeNormalTheme,
    dateTheme: themeProps,
  };
}
export function getSecondWeekDateTheme(props) {
  const { getPartOfThemeProps } = props;
  const themeProps = getPartOfThemeProps('SecondWeekDate');
  const {
    themeConfig: { normal = {}, hover = {} },
  } = themeProps;
  const defaultNormal = {
    color: '#333',
    fontSize: 14,
    font: { size: 14 },
  };
  const normalTheme = deepMerge(defaultNormal, normal);
  const defaultHover = {
    ...normalTheme,
  };
  const hoverTheme = deepMerge(defaultHover, hover);
  return {
    normalTheme,
    hoverTheme,
  };
}
export function getFacePanelContain(props) {
  const { mode } = props;
  const { isRange } = modeStyle(mode);
  const themeProps = getThemeProps({ ...props }, 'FacePanelContain');
  const { themeConfig, propsConfig } = themeProps;
  const defaultNormal = {
    width: isRange ? 600 : 420,
  };
  const { normal = {} } = themeConfig;
  const normalTheme = deepMerge(defaultNormal, normal);
  const { width } = normalTheme;
  normal.width = isRange && width > isRange ? 600 : width;
  normalTheme.width = normal.width;
  const normalSize = getFacePanelContainSize(normalTheme);

  propsConfig.normalSize = { ...normalSize };

  const normalTimePikerSingleWidth = getTimeWrapSize(mode, normalSize);
  const timePikerSingleWrapTheme = {
    themeConfig: {
      normal: { width: normalTimePikerSingleWidth },
    },
  };
  const timePikerColSizeTheme = {
    themeConfig: {
      normal: { width: getTimeColSize(normalTimePikerSingleWidth) },
    },
  };
  return { themeProps, timePikerSingleWrapTheme, timePikerColSizeTheme };
}
function getFacePanelContainSize(state = {}) {
  const {
    width = 600,
    height = 500,
    border: {
      top: { width: widthT = 0 } = {},
      right: { width: widthR = 0 } = {},
      bottom: { width: widthB = 0 } = {},
      left: { width: widthL = 0 } = {},
    } = {},
  } = state;
  return {
    width: getSize(width, widthR, widthL),
    height: getSize(height, widthT, widthB),
  };
}
function valueIsNumber(value) {
  return typeof value === 'number' && !isNaN(value) && value > 0;
}
function getSize(size, borderWidthFirst, borderWidthSecond) {
  let newSize = size;
  if (
    valueIsNumber(newSize) &&
    valueIsNumber(borderWidthFirst) &&
    valueIsNumber(borderWidthSecond)
  ) {
    newSize = newSize - borderWidthFirst - borderWidthSecond;
  }
  return newSize;
}
function getTimeWrapSize(mode, state) {
  const { width } = state;
  const { isRange } = modeStyle(mode);
  return isRange ? width / 2 : width;
}
function getTimeColSize(width) {
  return (width - 2) / 3;
}
