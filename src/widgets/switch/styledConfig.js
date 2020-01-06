/*
 * by wangcuixia
 * */

import colorsFunc from '../css/stateColor';
import { deepMerge } from '@lugia/object-utils';
import { getBorder, getBorderRadius } from '@lugia/theme-utils';
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
  const { getPartOfThemeProps, loading, disabled } = props;
  const switchOpenName = 'Switch_SwitchOpen';
  const switchClosedName = 'Switch_SwitchClosed';
  const open = getPartOfThemeProps(switchOpenName);
  const closed = getPartOfThemeProps(switchClosedName);
  const opencolor = getBackground(props, true);
  const closedcolor = getBackground(props, false);
  const { getInternalThemeProps } = props;
  const nessecaryProps = (getInternalThemeProps && getInternalThemeProps()) || {};
  const {
    themeConfig: { normal: { width: closedWidth, height: closedHeight } = {} } = {},
  } = closed;
  const { themeConfig: { normal: { width: openWidth, height: openHeight } = {} } = {} } = open;
  const defaultOpenThemeProps = {
    normal: {
      width: closedWidth || wrapWidth,
      height: closedHeight || wrapHeight,
      border: getBorder({ color: '', style: '', width: 0 }),
      borderRadius: getBorderRadius(20),
      boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.8)',
      font: {
        fontWeight: 'normal',
      },
      background: {
        color: opencolor,
      },
    },
    disabled: {
      background: {
        color: colorsFunc(opencolor).disabledColor,
      },
    },
  };

  const defaultClosedThemeProps = {
    normal: {
      width: openWidth || wrapWidth,
      height: openHeight || wrapHeight,
      border: getBorder({ color: '', style: '', width: 0 }),
      borderRadius: getBorderRadius(20),
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.8)',
      font: {
        fontWeight: 'normal',
      },
      background: {
        color: closedcolor,
      },
    },
    disabled: {
      background: {
        color: closedcolor === '#ccc' ? '#f2f2f2' : colorsFunc(closedcolor).disabledColor,
      },
    },
  };
  const childrenwidgetName = 'SwitchButton';
  const childrenThemeProps = getPartOfThemeProps(childrenwidgetName);
  const { themeConfig: childrenConfig } = childrenThemeProps;
  const { normal } = childrenConfig;

  const defaultChildrenThemeProps = {
    normal: {
      width: circleWidth,
      height: circleHeight,
      background: {
        color: '#fff',
      },
      border: getBorder({ color: '', style: '', width: 0 }),
      borderRadius: getBorderRadius('50%'),
      boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.05)',
    },
    active: {
      width: circleWidth + 4,
      height: circleHeight,
      background: {
        color: '#fff',
      },
      border: getBorder({ color: '', style: '', width: 0 }),
      borderRadius: getBorderRadius(circleWidth / 2),
    },
    disabled: deepMerge(
      {
        width: circleWidth,
        height: circleHeight,
        background: {
          color: '#fff',
        },
      },
      normal
    ),
  };

  const openThemeProps = deepMerge(defaultOpenThemeProps, open.themeConfig);
  const closedThemeProps = deepMerge(openThemeProps, defaultClosedThemeProps, closed.themeConfig);
  const switchThemeProps = value ? openThemeProps : closedThemeProps;

  const switchButtonThemeProps = deepMerge(defaultChildrenThemeProps, childrenConfig);
  childrenThemeProps.themeConfig = switchButtonThemeProps;
  const { switchButtonPosition, textPosition, textBox } = getSwitchButtonPosition(
    switchThemeProps,
    switchButtonThemeProps,
    value
  );

  return {
    switchThemeProps: deepMerge(
      { themeConfig: switchThemeProps },
      { themeState: { disabled: disabled || loading } },
      { propsConfig: { textPosition, textBox } },
      nessecaryProps
    ),
    childrenThemeProps: deepMerge(
      childrenThemeProps,
      { themeState: { disabled: disabled || loading } },
      { propsConfig: { switchButtonPosition } },
      nessecaryProps
    ),
    SwitchContainerThemeProps: deepMerge(getPartOfThemeProps('Container'), {
      themeState: { disabled: disabled || loading },
      nessecaryProps,
    }),
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
