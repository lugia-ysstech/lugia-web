import { deepMerge } from '@lugia/object-utils';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
import { modeStyle } from '../utils/booleanUtils';
import {
  validateValueDefaultTheme,
  validateBorderDefaultTheme,
  isValidateError,
} from '../../css/validateHoc';
import changeColor from '../../css/utilsColor';
import { getThemeUpdate } from '../styled/utils';

export default function getThemeProps(props, partName) {
  const { getPartOfThemeProps, mode } = props;
  const themeProps = getPartOfThemeProps(partName);
  themeProps.propsConfig = { mode };
  return themeProps;
}
function getSizeHeight(size: string) {
  const { smallSize, normalSize, largeSize } = getThemeUpdate();
  let height = normalSize;
  switch (size) {
    case 'small':
      height = smallSize;
      break;
    case 'large':
      height = largeSize;
      break;
    default:
      break;
  }
  return height;
}
function getDefaultStyleFromSize(size: string) {
  const { borderRadiusValue } = getThemeUpdate();
  return {
    defaultBorderRadius: borderRadiusValue,
    defaultFontSize: size === 'small' ? 12 : 14,
  };
}
export function getWrapThemeProps(props, partName) {
  const { getPartOfThemeProps, mode, validateStatus, size, visible } = props;
  const themeProps = deepMerge(getPartOfThemeProps(partName), {});
  themeProps.propsConfig = { mode };
  themeProps.themeState.focus = visible;
  const { themeConfig = {} } = themeProps;
  const { defaultBorderRadius, defaultFontSize } = getDefaultStyleFromSize(size);
  const {
    normalBorder,
    hoverBorder,
    activeBorder,
    focusBorder,
    disabledBorder,
    disabledBoxShadow,
    blackColor,
    disableColor,
    disableTextColor,
    normalColor,
  } = getThemeUpdate();
  const defaultNormal = {
    normal: {
      width: '100%',
      height: getSizeHeight(size),
      border: getBorder(normalBorder),
      borderRadius: getBorderRadius(defaultBorderRadius),
      color: blackColor,
      fontSize: defaultFontSize,
    },
  };

  const deeMergeTheme = deepMerge(defaultNormal, themeConfig) || {};
  const { normal = {}, hover = {}, active = {}, focus = {}, disabled = {} } = deeMergeTheme;
  const { borderRadius } = normal;
  const deafultHoverBorderColor = {
    border: getBorder(hoverBorder),
  };
  const deafultActiveBorderColor = {
    border: getBorder(activeBorder),
  };
  const deafultFocusBorderColor = {
    border: getBorder(focusBorder),
    boxShadow: deepMerge(disabledBoxShadow, { color: changeColor(normalColor, 0, 0, 40).rgba }),
  };
  const defaultDisabled = {
    background: {
      color: disableColor,
    },
    color: disableTextColor,
    border: getBorder(disabledBorder),
    borderRadius,
  };

  // 此段注释代码，用于hover继承normal的border宽度
  //const hoverTheme = deepMerge(hover, deafultHoverBorderColor);

  const hoverTheme = deepMerge(deafultHoverBorderColor, hover);
  const activeTheme = deepMerge(deafultActiveBorderColor, active);
  const focusTheme = deepMerge(deafultFocusBorderColor, focus);
  const disabledTheme = deepMerge(defaultDisabled, disabled);
  const {
    normal: validateNormalTheme,
    active: validateActiveTheme,
    hover: validateHoverTheme,
    focus: validateFocusTheme,
    disabled: validateDisabledTheme,
  } = getValidateErrorInput(props);
  const errorNormal = deepMerge(normal, validateNormalTheme);
  const errorHover = deepMerge(hoverTheme, validateHoverTheme);
  const errorActive = deepMerge(activeTheme, validateActiveTheme);
  const errorFocus = deepMerge(focusTheme, validateFocusTheme);
  const errorDisabled = deepMerge(disabledTheme, validateDisabledTheme);
  const isError = isValidateError(validateStatus);

  themeConfig.normal = isError ? errorNormal : normal;
  themeConfig.hover = isError ? errorHover : hoverTheme;
  themeConfig.active = isError ? errorActive : hoverTheme;
  themeConfig.focus = isError ? errorFocus : focusTheme;
  themeConfig.disabled = isError ? errorDisabled : disabledTheme;
  return themeProps;
}
export function getRangeInputMiddleSymbolTheme(props) {
  const { getPartOfThemeProps, size } = props;

  const themeProps = getPartOfThemeProps('RangeInputMiddleSymbol');
  const { defaultFontSize } = getDefaultStyleFromSize(size);
  const { darkGreyColor, disableTextColor } = getThemeUpdate();
  const font = {
    fontSize: defaultFontSize,
  };
  const defaultTheme = {
    normal: {
      color: darkGreyColor,
      ...font,
    },
    disabled: {
      color: disableTextColor,
      ...font,
    },
  };
  return deepMerge({ themeConfig: defaultTheme }, themeProps);
}
export function getRangeInputPlaceholderTheme(props) {
  const { getPartOfThemeProps, size } = props;
  const { defaultFontSize } = getDefaultStyleFromSize(size);
  const themeProps = getPartOfThemeProps('Placeholder');
  const { lightGreyColor } = getThemeUpdate();

  const defaultTheme = {
    normal: {
      color: lightGreyColor,
      fontSize: defaultFontSize,
    },
  };
  return deepMerge({ themeConfig: defaultTheme }, themeProps);
}
export function getDateTheme(props) {
  const { getPartOfThemeProps } = props;

  const themeProps = getPartOfThemeProps('InMonthDate');
  const outMonthDateThemeProps = getPartOfThemeProps('OutMonthDate');
  const rangeDateDateThemeProps = getPartOfThemeProps('RangeDate');

  const {
    themeConfig: { normal: rangeNormal = {}, hover: rangeHover = {} } = {},
  } = rangeDateDateThemeProps;

  const { themeConfig: { normal: outNormal = {} } = {} } = outMonthDateThemeProps;
  const { lightGreyColor, blackColor, normalColor, hoverColor, defaultColor } = getThemeUpdate();

  const defaultOutNormal = {
    color: lightGreyColor,
  };
  const { themeConfig: { hover = {}, normal = {}, active = {} } = {} } = themeProps;
  const defaultNormal = {
    color: blackColor,
    fontSize: 14,
  };
  const defaultHover = {
    background: { color: hoverColor },
    color: defaultColor,
    borderRadius: getBorderRadius('50%'),
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
    background: { color: changeColor(normalColor, 0, 0, 10).rgba },
    color: normalTheme.color,
    borderRadius:
      !hover.borderRadius && !active.borderRadius ? getBorderRadius(20) : activeTheme.borderRadius,
  };
  const defaultRangeWeekDateHover = {
    background: { color: hoverColor },
    color: '#fff',
  };
  const rangeNormalTheme = deepMerge(defaultRangeNormal, rangeNormal);
  const rangeWeekHoverTheme = deepMerge(defaultRangeWeekDateHover, rangeHover);
  const rangeWeekDate = {
    normal: rangeNormalTheme,
    hover: rangeWeekHoverTheme,
  };
  return {
    hoverTheme,
    normalTheme,
    activeTheme,
    outMonthNormalTheme,
    rangeNormalTheme,
    rangeWeekDate,
    todayTheme: getTodayTheme(props, normal),
    dateTheme: themeProps,
  };
}
export function getTodayTheme(props, dateNormalTheme) {
  const { getPartOfThemeProps } = props;

  const themeProps = getPartOfThemeProps('SelectToday');
  const { normalColor } = getThemeUpdate();
  const {
    themeConfig: { normal },
  } = themeProps;
  const { color } = dateNormalTheme || {};
  const defaultNormal = {
    border: getBorder({ width: 1, color: normalColor, style: 'solid' }),
    background: { color: 'transparent' },
    color,
    borderRadius: {
      topLeft: 13,
      topRight: 13,
      bottomRight: 13,
      bottomLeft: 13,
    },
  };
  const normalTheme = deepMerge(defaultNormal, { ...normal });

  const {
    border: {
      top: { style: todayBorderTS, color: todayBorderTC } = {},
      right: { style: todayBorderRs, color: todayBorderRC } = {},
      bottom: { style: todayBorderBS, color: todayBorderBC } = {},
      left: { style: todayBorderLS, color: todayBorderLC } = {},
    } = {},
    borderRadius: { topLeft, topRight, bottomRight, bottomLeft } = {},
    background: { color: bgColor } = {},
    color: todayColor,
  } = normalTheme;
  const border = `
      border-top:1px ${todayBorderTS} ${todayBorderTC};
      border-right:1px ${todayBorderRs} ${todayBorderRC};
      border-bottom:1px ${todayBorderBS} ${todayBorderBC};
      border-left:1px ${todayBorderLS} ${todayBorderLC};
    `;
  const borderRadius = `
    border-radius:${topLeft || 0}px ${topRight || 0}px ${bottomRight || 0}px ${bottomLeft || 0}px;
  `;
  const background = `background:${bgColor};`;

  return { border, color: todayColor, borderRadius, background };
}
export function getSecondWeekDateTheme(props) {
  const { getPartOfThemeProps } = props;
  const themeProps = getPartOfThemeProps('SecondWeekDate');
  const { themeConfig: { normal = {}, hover = {} } = {} } = themeProps;
  const { blackColor, normalColor } = getThemeUpdate();
  const defaultNormal = {
    color: blackColor,
  };
  const normalTheme = deepMerge(defaultNormal, normal);
  const defaultHover = {
    ...normalTheme,
    color: normalColor,
  };
  const hoverTheme = deepMerge(defaultHover, hover);
  return {
    normalTheme,
    hoverTheme,
    themeProps,
  };
}
export function getFacePanelContain(props) {
  const { mode } = props;
  const { isRange } = modeStyle(mode);
  const themeProps = getThemeProps({ ...props }, 'FacePanelContain');
  const { themeConfig = {}, propsConfig } = themeProps;
  const { normal = {} } = themeConfig;
  const { normalBoxShadow, defaultColor, borderRadiusValue } = getThemeUpdate();
  const defaultNormal = {
    background: { color: defaultColor },
    borderRadius: getBorderRadius(borderRadiusValue),
    boxShadow: normalBoxShadow,
    width: isRange ? 600 : 300,
    border: getBorder({ width: 0, color: 'transparent' }),
  };
  const normalTheme = deepMerge(defaultNormal, normal);
  const { width } = normalTheme;
  normal.width = isRange && width > isRange ? 600 : width;
  normalTheme.width = normal.width;
  themeConfig.normal = { ...normalTheme };
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

export function getIconTheme(props) {
  const { mode, getPartOfThemeProps, size } = props;
  const {
    mediumGreyColor,
    darkGreyColor,
    disableTextColor,
    blackColor,
    xxsFontSize,
    xsFontSize,
    sFontSize,
  } = getThemeUpdate();
  const clearIconNormal = {
    color: mediumGreyColor,
    fontSize: size === 'small' ? xxsFontSize : xsFontSize,
  };
  const defaultClearIconTheme = {
    normal: clearIconNormal,
    hover: {
      color: darkGreyColor,
    },
    disabled: deepMerge(clearIconNormal, { color: disableTextColor }),
  };

  const otherIconNormal = {
    color: blackColor,
    fontSize: size === 'small' ? xsFontSize : sFontSize,
  };
  const defaultOtherIconTheme = {
    normal: otherIconNormal,
    disabled: deepMerge(otherIconNormal, { color: disableTextColor }),
  };
  const inputPrefixProps = getThemeProps({ mode, getPartOfThemeProps }, 'InputPrefix');
  const inputSuffixProps = getThemeProps({ mode, getPartOfThemeProps }, 'InputSuffix');
  const clearButtonProps = getThemeProps({ mode, getPartOfThemeProps }, 'ClearButton');
  return {
    inputPrefixProps: deepMerge({ themeConfig: defaultOtherIconTheme }, inputPrefixProps),
    inputSuffixProps: deepMerge({ themeConfig: defaultOtherIconTheme }, inputSuffixProps),
    clearButtonProps: deepMerge({ themeConfig: defaultClearIconTheme }, clearButtonProps),
  };
}

export function getValidateErrorInput(props) {
  const { getPartOfThemeProps } = props;
  const themeProps = getPartOfThemeProps('ValidateErrorInput');
  const { themeConfig = {} } = themeProps;
  const { themeConfig: { normal: defaultNormalFont = {} } = {} } = validateValueDefaultTheme;
  const newThemeConfig = deepMerge(
    validateBorderDefaultTheme().themeConfig,
    {
      normal: defaultNormalFont,
      hover: defaultNormalFont,
      active: defaultNormalFont,
    },
    themeConfig
  );
  return newThemeConfig;
}
export function getHeadArrowTheme(props) {
  const { getPartOfThemeHocProps } = props;
  const { viewClass: singleViewClass, theme: singleTheme } = getPartOfThemeHocProps(
    'HeadSingleArrow'
  );
  const { viewClass: doubleViewClass, theme: doubleTheme } = getPartOfThemeHocProps(
    'HeadDoubleArrow'
  );
  const { sFontSize, mediumGreyColor, normalColor, disableTextColor } = getThemeUpdate();
  const defaultFontSize = {
    fontSize: sFontSize,
  };
  const defaultTheme = {
    Icon: {
      normal: {
        color: mediumGreyColor,
        ...defaultFontSize,
      },
      hover: {
        color: normalColor,
        ...defaultFontSize,
      },
      disabled: {
        color: disableTextColor,
        ...defaultFontSize,
      },
    },
  };

  function getMergeTheme(viewClass, theme, mergeDefaultTheme) {
    return { [viewClass]: deepMerge(mergeDefaultTheme, { Icon: theme[viewClass] }) };
  }

  return {
    single: {
      singleViewClass,
      singleTheme: getMergeTheme(singleViewClass, singleTheme, defaultTheme),
    },
    double: {
      doubleViewClass,
      doubleTheme: getMergeTheme(doubleViewClass, doubleTheme, defaultTheme),
    },
  };
}

export function getHeadYearAndMonth(props) {
  const { mode, getPartOfThemeProps } = props;
  const headYearTextTheme = getThemeProps({ mode, getPartOfThemeProps }, 'HeadYearText');
  const headMonthTextTheme = getThemeProps({ mode, getPartOfThemeProps }, 'HeadMonthText');
  const headWeekTextTheme = getThemeProps({ mode, getPartOfThemeProps }, 'HeadWeekText');
  const { blackColor, normalColor } = getThemeUpdate();
  const defaultFont = {
    fontSize: 14,
  };
  const defaultTheme = {
    normal: {
      color: blackColor,
      ...defaultFont,
    },
    hover: {
      color: normalColor,
      ...defaultFont,
    },
  };
  return {
    headYearTextTheme: deepMerge({ themeConfig: { ...defaultTheme } }, headYearTextTheme),
    headMonthTextTheme: deepMerge({ themeConfig: { ...defaultTheme } }, headMonthTextTheme),
    headWeekTextTheme: deepMerge({ themeConfig: { ...defaultTheme } }, headWeekTextTheme),
  };
}
export function getFooterButtonsTheme(props) {
  const { getPartOfThemeProps } = props;
  const themeProps = getPartOfThemeProps('FooterButtonOptions');
  const themePropsFooterToday = getPartOfThemeProps('FooterToday');
  const themePropsFooterTime = getPartOfThemeProps('FooterTimeButton');
  const themePropsFooterOk = JSON.parse(JSON.stringify(getPartOfThemeProps('FooterOkButton')));
  const {
    defaultColor,
    disableColor,
    normalColor,
    hoverColor,
    sFontSize,
    publicPadding,
    disableTextColor,
    normalSize,
    borderRadiusValue,
    marginToSameElement,
    paddingToText,
  } = getThemeUpdate();
  const defaultTheme = {
    normal: {
      color: normalColor,
      fontSize: sFontSize,
      height: 26,
      margin: { right: publicPadding },
    },
    hover: {
      color: hoverColor,
      fontSize: sFontSize,
    },
  };
  const { themeConfig: { normal } = {} } = themeProps;
  const { normal: { height } = {} } = deepMerge(defaultTheme, normal);
  const todayDefaultTheme = {
    normal: {
      color: normalColor,
      fontSize: sFontSize,
      height,
    },
    hover: {
      color: hoverColor,
      fontSize: sFontSize,
    },
  };
  const timeDefaultTheme = {
    normal: {
      color: normalColor,
      fontSize: sFontSize,
    },
    hover: {
      color: hoverColor,
      fontSize: sFontSize,
    },
    disabled: {
      color: disableTextColor,
    },
  };
  const okDefaultTheme = {
    normal: {
      color: defaultColor,
      fontSize: sFontSize,
      height: normalSize,
      background: { color: normalColor },
      borderRadius: getBorderRadius(borderRadiusValue),
      margin: { left: marginToSameElement },
      padding: { left: paddingToText, right: paddingToText },
    },
    hover: {
      color: defaultColor,
      background: { color: hoverColor },
      fontSize: sFontSize,
    },
    active: {
      color: defaultColor,
      background: { color: hoverColor },
      fontSize: sFontSize,
    },
    disabled: {
      color: defaultColor,
      background: { color: disableColor },
      fontSize: sFontSize,
    },
  };
  return {
    buttonOptionsTheme: deepMerge({ themeConfig: defaultTheme }, themeProps),
    todayTheme: deepMerge({ themeConfig: todayDefaultTheme }, themePropsFooterToday),
    timeButtonTheme: deepMerge({ themeConfig: timeDefaultTheme }, themePropsFooterTime),
    okButtonTheme: deepMerge({ themeConfig: okDefaultTheme }, themePropsFooterOk),
  };
}
export function getExtraFooterTheme(props) {
  const { getPartOfThemeProps } = props;
  const themeProps = getPartOfThemeProps('ExtraFooter');
  const { lightGreyColor, sFontSize } = getThemeUpdate();
  const defaultTheme = {
    normal: {
      color: lightGreyColor,
      fontSize: sFontSize,
    },
  };
  return deepMerge({ themeConfig: defaultTheme }, themeProps);
}
export function getBigDate(props) {
  const { getPartOfThemeProps } = props;
  const themeProps = getPartOfThemeProps('GroupDate');
  const { darkGreyColor, sFontSize, hoverColor, normalColor, borderRadiusValue } = getThemeUpdate();
  const defaultTheme = {
    normal: {
      color: darkGreyColor,
      fontSize: sFontSize,
    },
    hover: {
      color: hoverColor,
      fontSize: sFontSize,
    },
    active: {
      color: '#fff',
      fontSize: sFontSize,
      background: { color: normalColor },
      borderRadius: getBorderRadius(borderRadiusValue),
    },
  };
  return deepMerge({ themeConfig: defaultTheme }, themeProps);
}

export function getTimeTheme(props) {
  const { getPartOfThemeProps } = props;
  const timePanelTheme = getPartOfThemeProps('TimePanel');
  const timePanelListTheme = getPartOfThemeProps('TimePanelList');
  const selectTimeOptionTheme = getPartOfThemeProps('SelectTimeOption');
  const timePanelHeadTheme = getPartOfThemeProps('TimePanelHead');
  const { superLightColor, blackColor, normalColor } = getThemeUpdate();
  const defaultTimePanelTheme = {
    normal: {
      borderRadius: getBorderRadius(0),
    },
  };
  const defaultTimePanelListTheme = {
    normal: {
      border: getBorder({ width: 1, style: 'solid', color: superLightColor }),
    },
  };
  const defaultTimePanelHeadTheme = {
    normal: {
      color: blackColor,
    },
  };
  const defaultselectTimeOptionTheme = {
    normal: {
      color: normalColor,
      background: { color: changeColor(normalColor, 0, 0, 10).rgba },
    },
  };
  const timePanelContainerTheme = deepMerge({ themeConfig: defaultTimePanelTheme }, timePanelTheme);
  const {
    themeConfig: { normal: { color } = {}, hover: { color: hoverColor } = {} } = {},
  } = timePanelContainerTheme;
  const timePanelInnerTheme = {
    normal: { color },
    hover: { color: hoverColor },
  };
  return {
    timePanelTheme: timePanelContainerTheme,
    timePanelInnerTheme,
    timePanelListTheme: deepMerge({ themeConfig: defaultTimePanelListTheme }, timePanelListTheme),
    timePanelHeadTheme: deepMerge({ themeConfig: defaultTimePanelHeadTheme }, timePanelHeadTheme),
    selectTimeOptionTheme: deepMerge(
      { themeConfig: defaultselectTimeOptionTheme },
      selectTimeOptionTheme
    ),
  };
}
export function getPageFooterLineTheme(props) {
  const { getPartOfThemeProps } = props;
  const timePanelTheme = getPartOfThemeProps('FooterLine');
  const { borderColor } = getThemeUpdate();
  const {
    themeConfig: { normal: { background: { color = borderColor } = {} } = {} } = {},
  } = timePanelTheme;
  return `border-top: 1px solid ${color} ;`;
}
