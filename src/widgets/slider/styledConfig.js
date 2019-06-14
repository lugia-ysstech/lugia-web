import { deepMerge } from '@lugia/object-utils';
import {
  trackBackground,
  throughRangeBackground,
  trackDisabledBackground,
  btnDisabledBackground,
  tipBackground,
  tipColor,
} from './slider_public_color';
import colorsFunc from '../css/stateColor';
import { getBorder } from '../theme/CSSProvider';
export const { themeColor } = colorsFunc();
export const iconStyles = {
  fontSizeNormal: 40,
  marginNormal: 10,
};
export const btnWidthNormal = 40;
export const rangeHeightNormal = 6;
export const rangeWidthNormal = 300;
export const dotStyles = {
  distanceForSlider: 16,
};

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
  const { getPartOfThemeProps, getTheme, themeProps: sliderTheme, vertical } = props;
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
        backgroundColor: trackBackground,
      },
      border: getBorder({ color: '', style: '', width: 0 }, { radius: 6 }),
    },
  };
  const mergeSliderTrackNormal = deepMerge(sliderNormalTheme, { normal });
  const {
    normal: { width, height },
  } = mergeSliderTrackNormal;
  const { width: sliderWidth, height: sliderHeight } = verticalSize({ vertical, width, height });
  const defaultSliderThemeProps = {
    ...mergeSliderTrackNormal,
    hover: {
      background: {
        backgroundColor: throughRangeBackground,
      },
    },
    active: {
      background: {
        backgroundColor: throughRangeBackground,
      },
    },
    disabled: {
      background: {
        backgroundColor: trackDisabledBackground,
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
        backgroundColor: themeColor,
      },
      height,
    },
  };
  const mergeNormal = deepMerge(defaultThemeProps, { normal: sliderPassedWayNormalTheme });
  const {
    normal: {
      background: { backgroundColor },
      height: sliderPassedWayHeight,
    },
  } = mergeNormal;
  const defaultSliderPassedWayThemeProps = {
    ...mergeNormal,
    hover: {
      background: {
        backgroundColor: colorsFunc(backgroundColor).hoverColor,
      },
      height: sliderPassedWayHeight,
    },
    active: {
      background: {
        backgroundColor: colorsFunc(backgroundColor).hoverColor,
      },
      height: sliderPassedWayHeight,
    },
    disabled: {
      background: {
        backgroundColor: btnDisabledBackground,
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
function getSliderButtonThemeProps(getPartOfThemeProps, vertical) {
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
        backgroundColor: themeColor,
      },
    },
  };
  const sliderButtonNormalThemeProps = deepMerge(defalutSliderButtonNormalThemeProps, {
    normal: buttonNormalTheme,
  });
  const {
    normal: {
      background: { backgroundColor },
      width,
      height,
    },
  } = sliderButtonNormalThemeProps;
  const { width: btnWidth, height: btnHeight } = verticalSize({ vertical, width, height });
  const defaultSliderButtonThemeProps = {
    ...sliderButtonNormalThemeProps,
    hover: {
      width: btnWidth + 4,
      height: btnHeight + 4,
      background: {
        backgroundColor: colorsFunc(backgroundColor).hoverColor,
      },
    },
    active: {
      width: btnWidth + 4,
      height: btnHeight + 4,
      background: {
        backgroundColor: colorsFunc(backgroundColor).hoverColor,
      },
    },
    disabled: {
      width: btnWidth,
      height: btnHeight,
      background: {
        backgroundColor: btnDisabledBackground,
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
function getTipsThemeProps(getPartOfThemeProps, buttonThemeProps) {
  const sliderTipsName = 'SliderTips';
  const sliderTipsThemeProps = getPartOfThemeProps(sliderTipsName);
  const defaultTipThemeProps = {
    normal: {
      background: {
        backgroundColor: tipBackground,
      },
      height: 27,
      color: tipColor,
      border: getBorder({}, { radius: 3 }),
      fontSize: 14,
    },
    disabled: {
      background: {
        backgroundColor: btnDisabledBackground,
      },
      color: '#fff',
    },
  };
  const mergeThemeConfig = deepMerge(defaultTipThemeProps, sliderTipsThemeProps.themeConfig);
  sliderTipsThemeProps.themeConfig = mergeThemeConfig;
  return sliderTipsThemeProps;
}
