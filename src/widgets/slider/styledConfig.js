import { deepMerge } from '@lugia/object-utils';
import {
  trackBackground,
  throughRangeBackground,
  trackDisabledBackground,
  btnDisabledBackground,
  tipBackground,
  tipColor,
} from './slider_public_color';
import { btnWidthNormal, rangeHeightNormal, rangeWidthNormal } from './slider_public_size';
import colorsFunc from '../css/stateColor';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
//import {rangeWidthNormal,rangeHeightNormal,btnWidthNormal} from './slider_public_size';
export const { themeColor } = colorsFunc();

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

export function getThemeProps(props) {
  const { getPartOfThemeProps, vertical } = props;
  const buttonThemeProps = getSliderButtonThemeProps(getPartOfThemeProps, vertical);

  const sliderTrackThemeProps = getSliderTrackThemeProps(getPartOfThemeProps, vertical);
  const { height } = sliderTrackThemeProps;
  const sliderPassedWayThemeProps = getSliderPassedWayThemeProps(getPartOfThemeProps, height);
  const sliderTipsThemeProps = getTipsThemeProps(getPartOfThemeProps, buttonThemeProps);
  return {
    buttonThemeProps,
    sliderPassedWayThemeProps,
    sliderTrackThemeProps,
    sliderContainerThemeProps: deepMerge(getPartOfThemeProps('SliderContainer'), {
      propsConfig: { vertical },
    }),
    sliderTipsThemeProps,
  };
}
function getSliderTrackThemeProps(getPartOfThemeProps, vertical) {
  const sliderTrackName = 'SliderTrack';
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
  let {
    normal: { width, height },
  } = mergeSliderTrackNormal;
  const isNumWidth = typeof width === 'number' && !isNaN(width);
  const isNumHeight = typeof height === 'number' && !isNaN(height);
  if (!isNumWidth) {
    width = rangeWidthNormal;
  }
  if (!isNumHeight) {
    height = rangeHeightNormal;
  }
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
    normal: { ...mergeSliderTrackNormal, width: sliderWidth, height: sliderHeight },
    hover,
    active,
    disabled,
  });

  sliderTrackThemeProps.themeConfig = sliderTrackTheme;
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
        color: colorsFunc(color).hoverColor,
      },
      height: sliderPassedWayHeight,
    },
    active: {
      background: {
        color: colorsFunc(color).hoverColor,
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
  const isNumWidth = typeof width === 'number' && !isNaN(width);
  const isNumHeight = typeof height === 'number' && !isNaN(height);
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
        color: colorsFunc(color).hoverColor,
      },
    },
    active: {
      width: btnWidth + 4,
      height: btnHeight + 4,
      background: {
        color: colorsFunc(color).hoverColor,
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
      borderRadius: getBorderRadius(3),
      fontSize: 14,
    },
    disabled: {
      background: {
        color: btnDisabledBackground,
      },
      color: '#fff',
    },
  };
  const mergeThemeConfig = deepMerge(defaultTipThemeProps, sliderTipsThemeProps.themeConfig);
  sliderTipsThemeProps.themeConfig = mergeThemeConfig;
  return sliderTipsThemeProps;
}
