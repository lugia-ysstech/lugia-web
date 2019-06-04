/*
 * by wangcuixia
 * */

import colorsFunc from '../css/stateColor';
import { deepMerge } from '@lugia/object-utils';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);
const { themeColor, successColor, dangerColor } = colorsFunc();
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
  if (size == 'small') {
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
    color = '#ccc';
    if (isInverse) {
      color = dangerColor;
    }
  }
  return color;
};

export function getThemeProps(props, value) {
  const {
    switchWrapperSize: { width: wrapWidth, height: wrapHeight },
    circleSize: { width: circleWidth, height: circleHeight },
  } = getStyled(props);
  const { themeProps, mergeThemeStateAndChildThemeProps } = props;
  const {
    themeConfig: { open = {}, closed = {} },
  } = themeProps;
  const openBackgroundColor = getBackground(props, true);
  const closedBackgroundColor = getBackground(props, false);

  const defaultOpenThemeProps = {
    normal: {
      width: wrapWidth,
      height: wrapHeight,
      borderRadius: 20,
      boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
      fontSize: 12,
      color: '#fff',
      font: {
        fontWeight: 'normal',
      },
      background: {
        backgroundColor: openBackgroundColor,
      },
    },
    disabled: {
      background: {
        backgroundColor: colorsFunc(openBackgroundColor).disabledColor,
      },
    },
  };

  const defaultClosedThemeProps = {
    normal: {
      width: wrapWidth,
      height: wrapHeight,
      borderRadius: 20,
      fontSize: 12,
      color: '#fff',
      font: {
        fontWeight: 'normal',
      },
      background: {
        backgroundColor: closedBackgroundColor,
      },
    },
    disabled: {
      background: {
        backgroundColor:
          closedBackgroundColor === '#ccc'
            ? '#f2f2f2'
            : colorsFunc(closedBackgroundColor).disabledColor,
      },
    },
  };
  const childrenwidgetName = 'SwitchButton';
  const childrenThemeProps = mergeThemeStateAndChildThemeProps(childrenwidgetName);
  const { themeConfig: childrenConfig } = childrenThemeProps;
  const { normal } = childrenConfig;
  const defaultChildrenThemeProps = {
    normal: {
      width: circleWidth,
      height: circleHeight,
      background: {
        backgroundColor: '#fff',
      },
      borderRadius: '50%',
      boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
    },
    actived: {
      width: circleWidth + 4,
      height: circleHeight,
      background: {
        backgroundColor: '#fff',
      },
      borderRadius: circleWidth / 2,
    },
    disabled: deepMerge(
      {
        width: circleWidth,
        height: circleHeight,
        background: {
          backgroundColor: '#fff',
        },
      },
      normal
    ),
  };

  const openThemeProps = deepMerge(defaultOpenThemeProps, open);
  const closedThemeProps = deepMerge(openThemeProps, defaultClosedThemeProps, closed);
  const switchThemeProps = value ? openThemeProps : closedThemeProps;
  themeProps.themeConfig = switchThemeProps;
  const switchButtonThemeProps = deepMerge(defaultChildrenThemeProps, childrenConfig);
  childrenThemeProps.themeConfig = switchButtonThemeProps;
  const { switchButtonPosition, textPosition } = getSwitchButtonPosition(
    switchThemeProps,
    switchButtonThemeProps,
    value
  );

  return {
    switchThemeProps: deepMerge(themeProps, { propsConfig: { textPosition } }),
    childrenThemeProps: deepMerge(childrenThemeProps, { propsConfig: { switchButtonPosition } }),
  };
}

function getSwitchButtonPosition(switchThemeProps, switchButtonThemeProps, value) {
  const {
    normal: { height: switchHeight },
  } = switchThemeProps;
  const {
    normal: { width: circleWidth, height: circleHeight },
  } = switchButtonThemeProps;
  const distance = (switchHeight - circleHeight) / 2;
  const switchButtonPosition = value ? `right:${em(distance)}` : `left:${em(distance)}`;
  const textPositionDistance = `calc(50% - ${(circleWidth + distance) / 2}px)`;
  const textPosition = value
    ? `
    left:${textPositionDistance};
    transform:translate(-50%,-50%);
  `
    : `right:${textPositionDistance};
     transform:translate(50%,-50%);
    `;
  return {
    switchButtonPosition,
    textPosition,
  };
}
