/*
 * by wangcuixia
 * */

import { deepMerge } from '@lugia/object-utils';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
import { px2remcss } from '../css/units';
const rem = px2remcss;
const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
const successColor = '$lugia-dict.@lugia/lugia-web.successColor';
const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const lightGreyColor = '$lugia-dict.@lugia/lugia-web.lightGreyColor';
const themeDisabledColor = '$lugia-dict.@lugia/lugia-web.themeDisabledColor';
const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const successDisabledColor = '$lugia-dict.@lugia/lugia-web.successDisabledColor';
const dangerDisabledColor = '$lugia-dict.@lugia/lugia-web.dangerDisabledColor';
const defaultColor = '$lugia-dict.@lugia/lugia-web.defaultColor';

const normalSize = {
  width: 38,
  height: 20,
};

const smallSize = {
  width: 30,
  height: 16,
};

const normallCircleSize = {
  width: 14,
  height: 14,
};

const smallCircleSize = {
  width: 12,
  height: 12,
};
const getStyled = (props: CssProps) => {
  const { size } = props;
  let switchWrapperSize = normalSize;
  let circleSize = normallCircleSize;
  if (size === 'small') {
    switchWrapperSize = smallSize;
    circleSize = smallCircleSize;
  }
  return {
    switchWrapperSize,
    circleSize,
  };
};

const getBackground = (props: Object, value) => {
  const { isInverse } = props;
  let color;
  if (value) {
    color = themeColor;
    if (isInverse) {
      color = successColor;
    }
  } else {
    color = lightGreyColor;
    if (isInverse) {
      color = dangerColor;
    }
  }
  return color;
};
const getDisableBackground = (props: Object, value) => {
  const { isInverse } = props;
  let color;
  if (value) {
    color = themeDisabledColor;
    if (isInverse) {
      color = successDisabledColor;
    }
  } else {
    color = disableColor;
    if (isInverse) {
      color = dangerDisabledColor;
    }
  }
  return color;
};
export function getThemeProps(props, value) {
  const {
    switchWrapperSize: { width: wrapWidth, height: wrapHeight },
    circleSize: { width: circleWidth, height: circleHeight },
  } = getStyled(props);
  const { getPartOfThemeProps, loading, disabled } = props;
  const containerWidHig = getPartOfThemeProps('Container');
  const switchOpenTheme = getPartOfThemeProps('Switch_SwitchOpen');
  const switchClosedTheme = getPartOfThemeProps('Switch_SwitchClosed');
  const openColor = getBackground(props, true);
  const closedColor = getBackground(props, false);
  const disabledOpenColor = getDisableBackground(props, true);
  const disabledCloseColor = getDisableBackground(props, false);
  const { getInternalThemeProps } = props;
  const nessecaryProps = (getInternalThemeProps && getInternalThemeProps()) || {};
  const {
    themeConfig: { normal: { width: containerWidth, height: containerHeight } = {} } = {},
  } = containerWidHig;

  const defaultOpenThemeProps = {
    normal: {
      width: containerWidth || wrapWidth,
      height: containerHeight || wrapHeight,
      border: getBorder({ color: '', style: '', width: 0 }),
      borderRadius: getBorderRadius(20),
      boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.8)',
      font: {
        fontWeight: 'normal',
      },
      background: {
        color: openColor,
      },
    },
    disabled: {
      background: {
        color: disabledOpenColor,
      },
    },
  };

  const defaultClosedThemeProps = {
    normal: {
      width: containerWidth || wrapWidth,
      height: containerHeight || wrapHeight,
      border: getBorder({ color: '', style: '', width: 0 }),
      borderRadius: getBorderRadius(20),
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.8)',
      font: {
        fontWeight: 'normal',
      },
      background: {
        color: closedColor,
      },
    },
    disabled: {
      background: {
        color: disabledCloseColor,
      },
    },
  };
  const childrenWidgetName = 'SwitchButton';
  const childrenThemeProps = getPartOfThemeProps(childrenWidgetName);
  const { themeConfig: childrenConfig } = childrenThemeProps;
  const { normal } = childrenConfig;

  const defaultChildrenThemeProps = {
    normal: {
      width: circleWidth,
      height: circleHeight,
      background: {
        color: defaultColor,
      },
      border: getBorder({ color: '', style: '', width: 0 }),
      borderRadius: getBorderRadius('50%'),
      boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
    },
    active: {
      width: circleWidth + 4,
      height: circleHeight,
      background: {
        color: defaultColor,
      },
      border: getBorder({ color: '', style: '', width: 0 }),
      borderRadius: getBorderRadius(circleWidth / 2),
    },
    disabled: deepMerge(
      {
        width: circleWidth,
        height: circleHeight,
        background: {
          color: defaultColor,
        },
      },
      normal
    ),
  };

  const openThemeProps = deepMerge(defaultOpenThemeProps, switchOpenTheme.themeConfig);
  const closedThemeProps = deepMerge(
    openThemeProps,
    defaultClosedThemeProps,
    switchClosedTheme.themeConfig
  );
  const switchThemeProps = value ? openThemeProps : closedThemeProps;
  const switchButtonThemeProps = deepMerge(defaultChildrenThemeProps, childrenConfig);
  childrenThemeProps.themeConfig = switchButtonThemeProps;
  const { switchButtonPosition, textPosition, textBox } = getSwitchButtonPosition(
    switchThemeProps,
    switchButtonThemeProps,
    value
  );
  const themeState = { disabled: disabled || loading };
  return {
    switchThemeProps: deepMerge(
      { themeConfig: switchThemeProps },
      { themeState },
      { propsConfig: { textPosition, textBox } },
      nessecaryProps
    ),
    childrenThemeProps: deepMerge(
      childrenThemeProps,
      { themeState },
      { propsConfig: { switchButtonPosition } },
      nessecaryProps
    ),
    SwitchContainerThemeProps: deepMerge(
      getPartOfThemeProps('Container'),
      { themeState },
      nessecaryProps
    ),
  };
}

function getSwitchButtonPosition(switchThemeProps, switchButtonThemeProps, value) {
  const {
    normal: {
      height: switchHeight,
      width: switchWidth,
      border: {
        left: { borderWidth: switchborderLeft = 0 } = {},
        right: { borderWidth: switchborderRight = 0 },
      } = {},
    },
  } = switchThemeProps;
  const {
    normal: {
      width: circleWidth,
      height: circleHeight,
      border: {
        left: { borderWidth: circleborderLeft = 0 } = {},
        right: { borderWidth: circleborderRight = 0 } = {},
      } = {},
      top: { borderWidth: circleborderTop = 0 } = {},
      bottom: { borderWidth: circleborderBottom = 0 } = {},
    },
  } = switchButtonThemeProps;
  const distance = (switchHeight - circleHeight - circleborderTop - circleborderBottom) / 2;
  const switchButtonPosition = value ? `right:${distance}px` : `left:${distance}px`;
  const textPosition = value ? 'left:0;' : 'right:0;';
  const textBox = `
     width:${rem(
       switchWidth -
         circleWidth -
         distance -
         switchborderLeft -
         switchborderRight -
         circleborderLeft -
         circleborderRight
     )};
  `;
  return {
    switchButtonPosition,
    textPosition,
    textBox,
  };
}
