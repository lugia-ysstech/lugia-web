/*
 * by wangcuixia
 * */

import colorsFunc from '../css/stateColor';
import { deepMerge } from '@lugia/object-utils';
import { getBorder } from '../theme/CSSProvider';
import { px2remcss } from '../css/units';
const rem = px2remcss;
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
  const {
    themeProps: switchTheme,
    getTheme,
    mergeThemeStateAndChildThemeProps,
    loading,
    disabled,
  } = props;
  const { open = {}, closed = {} } = getTheme();
  const openBackgroundColor = getBackground(props, true);
  const closedBackgroundColor = getBackground(props, false);

  const defaultOpenThemeProps = {
    normal: {
      width: wrapWidth,
      height: wrapHeight,
      border: getBorder({ borderColor: '', borderStyle: '', borderWidth: 0 }, { radius: 20 }),
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
      border: getBorder({ borderColor: '', borderStyle: '', borderWidth: 0 }, { radius: 20 }),
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
      border: getBorder({ borderColor: '', borderStyle: '', borderWidth: 0 }, { radius: '50%' }),
      boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
    },
    actived: {
      width: circleWidth + 4,
      height: circleHeight,
      background: {
        backgroundColor: '#fff',
      },
      border: getBorder(
        { borderColor: '', borderStyle: '', borderWidth: 0 },
        { radius: circleWidth / 2 }
      ),
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
  switchTheme.themeConfig = switchThemeProps;
  const switchButtonThemeProps = deepMerge(defaultChildrenThemeProps, childrenConfig);
  childrenThemeProps.themeConfig = switchButtonThemeProps;
  const { switchButtonPosition, textPosition, textBox } = getSwitchButtonPosition(
    switchThemeProps,
    switchButtonThemeProps,
    value
  );
  return {
    switchThemeProps: deepMerge(
      { ...switchTheme },
      { themeState: { disabled: disabled || loading } },
      { propsConfig: { textPosition, textBox } }
    ),
    childrenThemeProps: deepMerge(
      childrenThemeProps,
      { themeState: { disabled: disabled || loading } },
      { propsConfig: { switchButtonPosition } }
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
