import { deepMerge } from '@lugia/object-utils';
import {
  trackBackground,
  throughRangeBackground,
  trackDisabledBackground,
  btnDisabledBackground,
} from './slider_public_color';
import colorsFunc from '../css/stateColor';
import { getBorderRadius, getBorder } from '../theme/CSSProvider';
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
  console.log(width, height);
  return {
    width,
    height,
  };
}

export function getThemeProps(props) {
  const { mergeThemeStateAndChildThemeProps, getTheme, themeProps: sliderTheme, vertical } = props;
  // const sliderNormalTheme = {
  //   normal: {
  //     width: rangeWidthNormal,
  //     height: rangeHeightNormal,
  //     background: {
  //       backgroundColor: trackBackground,
  //     },
  //     border: getBorder({ color: '', style: '', width: 0 }, { radius: 6 }),
  //   },
  // };
  // const { normal = {}, hover = {}, active = {}, disabled = {} } = getTheme();
  // const mergeSliderNormal = deepMerge(sliderNormalTheme, { normal });
  // const {
  //   normal: {
  //     width,
  //     height,
  //     border: {
  //       top: { borderWidth:topBorderWidth = 0 } = {},
  //       right: {borderWidth:rightBorderWidth = 0 } = {},
  //       bottom: { borderWidth:bottomBorderWidth = 0 } = {},
  //       left: { borderWidth:leftBorderWidth = 0 } = {},
  //     } = {},
  //   },
  // } = mergeSliderNormal;
  // console.log(topBorderWidth,rightBorderWidth,bottomBorderWidth,leftBorderWidth);
  // const { width: sliderWidth, height: sliderHeight } = verticalSize({ vertical, width, height });
  // console.log(mergeSliderNormal);
  // const defaultSliderThemeProps = {
  //   ...mergeSliderNormal,
  //   hover: {
  //     background: {
  //       backgroundColor: throughRangeBackground,
  //     },
  //   },
  //   active: {
  //     background: {
  //       backgroundColor: throughRangeBackground,
  //     },
  //   },
  //   disabled: {
  //     background: {
  //       backgroundColor: trackDisabledBackground,
  //     },
  //   },
  // };
  //
  // const sliderThemeProps = deepMerge(defaultSliderThemeProps, {
  //   normal: { width: sliderWidth, height: sliderHeight },
  //   hover,
  //   active,
  //   disabled,
  // });
  //
  // sliderTheme.themeConfig = sliderThemeProps;
  // console.log(width, height);
  const buttonThemeProps = getSliderButtonThemeProps(
    mergeThemeStateAndChildThemeProps,
    getTheme,
    vertical
  );

  const sliderTrackThemeProps = getSliderTrackThemeProps(
    mergeThemeStateAndChildThemeProps,
    getTheme,
    vertical
  );
  const { height } = sliderTrackThemeProps;
  const sliderPassedWayThemeProps = getSliderPassedWayThemeProps(
    mergeThemeStateAndChildThemeProps,
    getTheme,
    height
  );

  return {
    buttonThemeProps,
    sliderPassedWayThemeProps,
    sliderTrackThemeProps,
  };
}
function getSliderTrackThemeProps(mergeThemeStateAndChildThemeProps, getTheme, vertical) {
  const sliderTrackName = 'SliderTrack';
  const sliderTrackThemeProps = mergeThemeStateAndChildThemeProps(sliderTrackName);
  const {
    themeConfig: { normal = {}, hover = {}, actived = {}, disabled = {} },
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
  // const {
  //   normal: themeNormal = {},
  //   hover: themeHover = {},
  //   actived: themeActived = {},
  //   disabled: themeDisabled = {},
  // } = getTheme();
  const mergeSliderTrackNormal = deepMerge(
    sliderNormalTheme,
    //{normal:themeNormal},
    { normal }
  );
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
    actived: {
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

  const sliderTrackTheme = deepMerge(
    defaultSliderThemeProps,
    //{ hover: themeHover, actived: themeActived, disabled: themeDisabled },
    {
      normal: { ...mergeSliderTrackNormal, width: sliderWidth, height: sliderHeight },
      hover,
      actived,
      disabled,
    }
  );

  sliderTrackThemeProps.themeConfig = sliderTrackTheme;
  return {
    sliderTrackThemeProps,
    width,
    height,
  };
}
function getSliderPassedWayThemeProps(mergeThemeStateAndChildThemeProps, getTheme, height) {
  const sliderPassedWayName = 'SliderPassedWay';
  const sliderPassedWayThemeProps = mergeThemeStateAndChildThemeProps(sliderPassedWayName);
  const {
    themeConfig: {
      normal: sliderPassedWayNormalTheme = {},
      hover = {},
      actived = {},
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
  // const {
  //   normal: themeNormal = {},
  //   hover: themeHover = {},
  //   actived: themeActived = {},
  //   disabled: themeDisabled = {},
  // } = getTheme();
  const mergeNormal = deepMerge(
    defaultThemeProps,
    //  {normal:themeNormal},
    { normal: sliderPassedWayNormalTheme }
  );
  console.log(mergeNormal);
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
    actived: {
      background: {
        backgroundColor: colorsFunc(backgroundColor).hoverColor,
      },
      height: sliderPassedWayHeight,
    },
    disabled: {
      hover: {
        background: {
          backgroundColor: btnDisabledBackground,
        },
        height: sliderPassedWayHeight,
      },
    },
  };
  const mergesliderPassedWayTheme = deepMerge(
    defaultSliderPassedWayThemeProps,
    //{ hover: themeHover, actived: themeActived, disabled: themeDisabled },
    {
      hover,
      actived,
      disabled,
    }
  );
  sliderPassedWayThemeProps.themeConfig = mergesliderPassedWayTheme;
  console.log(mergesliderPassedWayTheme);
  return {
    sliderPassedWayThemeProps,
  };
}
function getSliderButtonThemeProps(mergeThemeStateAndChildThemeProps, vertical) {
  const sliderButtonName = 'SliderButton';
  const sliderButtonThemeProps = mergeThemeStateAndChildThemeProps(sliderButtonName);
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
    actived: {
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
  console.log(sliderButtonThemeProps);
  return {
    sliderButtonThemeProps,
    width,
    height,
  };
}
