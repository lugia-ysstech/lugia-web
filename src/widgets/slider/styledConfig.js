import { deepMerge } from '@lugia/object-utils';
import { btnWidthNormal, rangeHeightNormal, rangeWidthNormal } from './slider_public_size';
import {
  trackBackground,
  throughRangeBackground,
  trackDisabledBackground,
  btnDisabledBackground,
  tipBackground,
  tipColor,
  themeColor,
  themeHoverColor,
  borderColor,
} from './slider_public_color';
import { getBorder, getBorderRadius, getBoxShadow } from '@lugia/theme-utils';
import colorsFunc from '../css/stateColor';

const { hShadow, vShadow, shadowSpread } = colorsFunc();

function verticalSize(props) {
  let { width, height, vertical } = props;
  if (!vertical) {
    return {
      width,
      height,
    };
  }
  const rangwWidth = width;
  const rangwHeight = height;
  if (vertical) {
    width = rangwHeight;
    height = rangwWidth;
  }

  return {
    width,
    height,
  };
}

export function getThemeProps(props, normalSliderFatherWidth, iconsDistance) {
  const { getPartOfThemeProps, vertical } = props;
  const buttonThemeProps = getSliderButtonThemeProps(getPartOfThemeProps, vertical);
  const { width } = buttonThemeProps;
  const sliderContainerThemeProps = getPartOfThemeProps('SliderContainer');
  const overSize = getOverSize(width, iconsDistance);
  const sliderTrackThemeProps = getSliderTrackThemeProps(
    getPartOfThemeProps,
    vertical,
    normalSliderFatherWidth,
    overSize
  );
  const { height } = sliderTrackThemeProps;
  const sliderPassedWayThemeProps = getSliderPassedWayThemeProps(getPartOfThemeProps, height);
  const sliderTipsThemeProps = getTipsThemeProps(getPartOfThemeProps, buttonThemeProps);
  return {
    buttonThemeProps,
    sliderPassedWayThemeProps,
    sliderTrackThemeProps,
    sliderContainerThemeProps,
    sliderTipsThemeProps,
  };
}
function getOverSize(btnWidth, iconsDistance) {
  let noTimes = 0;
  let sum = 0;
  iconsDistance.forEach(number => {
    sum += number;
    if (number === 0) {
      noTimes += 1;
    }
  });
  if (noTimes === 2) {
    return btnWidth;
  }
  if (noTimes === 1) {
    return btnWidth / 2 + sum;
  }
  if (noTimes === 0) {
    return sum;
  }
}
function getSliderTrackThemeProps(
  getPartOfThemeProps,
  vertical,
  normalSliderFatherWidth,
  overSize
) {
  const sliderTrackName = 'Container';
  const sliderTrackThemeProps = getPartOfThemeProps(sliderTrackName);
  const {
    themeConfig: { normal = {}, hover = {}, active = {}, disabled = {} },
  } = sliderTrackThemeProps;
  const sliderNormalTheme = {
    normal: {
      width: rangeWidthNormal,
      height: rangeHeightNormal,
      background: {
        color: trackBackground,
      },
      border: getBorder({ color: '', style: '', width: 0 }),
      borderRadius: getBorderRadius(6),
    },
  };
  const mergeSliderTrackNormal = deepMerge(sliderNormalTheme, { normal });
  const { normal: { width: normalW, height: normalHeight } = {} } = mergeSliderTrackNormal;
  const width = getWidth(normalW, normalSliderFatherWidth) - overSize;
  const height = getWidth(normalHeight, rangeHeightNormal);
  mergeSliderTrackNormal.normal.width = width;
  mergeSliderTrackNormal.normal.height = height;
  const { width: sliderWidth, height: sliderHeight } = verticalSize({ vertical, width, height });
  const defaultSliderThemeProps = {
    ...mergeSliderTrackNormal,
    hover: {
      background: {
        color: throughRangeBackground,
      },
    },
    active: {
      background: {
        color: throughRangeBackground,
      },
    },
    disabled: {
      background: {
        color: trackDisabledBackground,
      },
    },
  };
  const sliderTrackTheme = deepMerge(defaultSliderThemeProps, {
    normal: { ...mergeSliderTrackNormal.normal, width: sliderWidth, height: sliderHeight },
    hover,
    active,
    disabled,
  });

  sliderTrackThemeProps.themeConfig = deepMerge(
    sliderTrackThemeProps.themeConfig,
    sliderTrackTheme
  );
  return {
    sliderTrackThemeProps,
    width,
    height,
  };
}
function getSliderPassedWayThemeProps(getPartOfThemeProps, height) {
  const sliderPassedWayName = 'SliderPassedWay';
  const sliderPassedWayThemeProps = getPartOfThemeProps(sliderPassedWayName);
  const {
    themeConfig: {
      normal: sliderPassedWayNormalTheme = {},
      hover = {},
      active = {},
      disabled = {},
    },
  } = sliderPassedWayThemeProps;
  const defaultThemeProps = {
    normal: {
      background: {
        color: themeColor,
      },
      height,
    },
  };
  const mergeNormal = deepMerge(defaultThemeProps, { normal: sliderPassedWayNormalTheme });
  const {
    normal: {
      background: { color },
      height: sliderPassedWayHeight,
    },
  } = mergeNormal;
  const defaultSliderPassedWayThemeProps = {
    ...mergeNormal,
    hover: {
      background: {
        color: themeHoverColor,
      },
      height: sliderPassedWayHeight,
    },
    active: {
      background: {
        color: themeColor,
      },
      height: sliderPassedWayHeight,
    },
    disabled: {
      background: {
        color: btnDisabledBackground,
      },
      height: sliderPassedWayHeight,
    },
  };
  const mergesliderPassedWayTheme = deepMerge(defaultSliderPassedWayThemeProps, {
    hover,
    active,
    disabled,
  });
  sliderPassedWayThemeProps.themeConfig = mergesliderPassedWayTheme;
  return {
    sliderPassedWayThemeProps,
  };
}
export function getSliderButtonThemeProps(getPartOfThemeProps, vertical) {
  const sliderButtonName = 'SliderButton';
  const sliderButtonThemeProps = getPartOfThemeProps(sliderButtonName);
  const {
    themeConfig: { normal: buttonNormalTheme = {} },
  } = sliderButtonThemeProps;
  const defalutSliderButtonNormalThemeProps = {
    normal: {
      width: btnWidthNormal,
      height: btnWidthNormal,
      background: {
        color: themeColor,
      },
    },
  };
  const sliderButtonNormalThemeProps = deepMerge(defalutSliderButtonNormalThemeProps, {
    normal: buttonNormalTheme,
  });
  let {
    normal: {
      background: { color },
      width,
      height,
    },
  } = sliderButtonNormalThemeProps;
  const isNumWidth = valueIsNumber(width);
  const isNumHeight = valueIsNumber(height);
  if (!isNumWidth) {
    width = btnWidthNormal;
  }
  if (!isNumHeight) {
    height = btnWidthNormal;
  }
  const { width: btnWidth, height: btnHeight } = verticalSize({ vertical, width, height });
  const defaultSliderButtonThemeProps = {
    ...sliderButtonNormalThemeProps,
    hover: {
      width: btnWidth + 4,
      height: btnHeight + 4,
      background: {
        color: themeHoverColor,
      },
    },
    active: {
      width: btnWidth + 4,
      height: btnHeight + 4,
      background: {
        color: themeColor,
      },
    },
    disabled: {
      width: btnWidth,
      height: btnHeight,
      background: {
        color: btnDisabledBackground,
      },
    },
  };
  const mergeSliderButtonThemeProps = deepMerge(
    defaultSliderButtonThemeProps,
    sliderButtonThemeProps.themeConfig,
    { normal: { width: btnWidth, height: btnHeight } }
  );
  sliderButtonThemeProps.themeConfig = mergeSliderButtonThemeProps;
  return {
    sliderButtonThemeProps,
    width,
    height,
  };
}
function getTipsThemeProps(getPartOfThemeProps) {
  const sliderTipsName = 'SliderTips';
  const sliderTipsThemeProps = getPartOfThemeProps(sliderTipsName);
  const defaultTipThemeProps = {
    normal: {
      background: {
        color: tipBackground,
      },
      height: 27,
      color: tipColor,
      borderRadius: getBorderRadius(2),
      fontSize: 12,
      boxShadow: getBoxShadow(`${hShadow}px ${vShadow}px ${shadowSpread}px 0 ${borderColor}`),
    },
  };
  const mergeThemeConfig = deepMerge(defaultTipThemeProps, sliderTipsThemeProps.themeConfig);
  sliderTipsThemeProps.themeConfig = mergeThemeConfig;
  return sliderTipsThemeProps;
}
function getWidth(width: string | number, totleWidth) {
  const newWidth = width;
  if (!width) {
    return totleWidth;
  }
  if (valueIsNumber(newWidth)) {
    return newWidth;
  }

  const reg = /^\d+%$/; //正则 百分比
  if (reg.test(newWidth)) {
    const ruler = newWidth.split('%')[0] / 100;
    return totleWidth * ruler;
  }
}
function valueIsNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}
