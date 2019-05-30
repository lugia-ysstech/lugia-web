/*
 * by wangcuixia
 * */
import { css } from 'styled-components';
import colorsFunc from '../css/stateColor';
import CSSProvider from '../theme/CSSProvider';
import { px2emcss } from '../css/units';
import ThemeProvider from '../theme-provider';
const em = px2emcss(1.2);

const { themeColor, successColor, dangerColor } = colorsFunc();
const { disabledColor } = colorsFunc(themeColor);
type CssProps = {
  size?: string,
  isMouseDown?: boolean,
  value?: boolean,
};

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

const togglesize = {
  width: 18,
};
const getSwitchWrapper = (props, size) => {
  console.log(size);
  const { height, width } = getStyled(props)[size];
  const heightEm = em(height);
  const wrapperCss = `
    width: ${em(width)};
    height: ${heightEm};
    line-height: ${heightEm};
`;
  return { wrapperCss, heightEm };
};
const getBackground = (props: Object) => {
  const { loading, disabled, value, isInverse } = props;
  const color = loading
    ? disabledColor
    : disabled
    ? disabledColor
    : value
    ? isInverse
      ? successColor
      : themeColor
    : isInverse
    ? dangerColor
    : isInverse !== undefined
    ? themeColor
    : '#ccc';
  return color;
};
export const SwitchWrapper = CSSProvider({
  tag: 'span',
  normal: {
    selectNames: [['width'], ['height']],
  },

  css: css`
    font-size: ${em(12)};
    box-sizing: border-box;
    display: inline-block;
    ${props => getSwitchWrapper(props, 'switchWrapperSize').wrapperCss};
    border-radius: ${em(20)};
    background: ${props => getBackground(props)};
    position: relative;
    text-align: ${props => (props.value ? 'left' : 'right')};
    padding: 0 ${em(4)};
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    vertical-align: middle;

    &:focus {
      outline: none;
    }
  `,
});
export const SwitchText = CSSProvider({
  tag: 'span',
  css: css`
    & > *:first-child {
      display: inline-block;
      line-height: ${props => getSwitchWrapper(props, 'switchWrapperSize').heightEm};

      &::before {
        line-height: ${props => getSwitchWrapper(props, 'switchWrapperSize').heightEm};
      }
    }
  `,
});
export const SwitchCircle = ThemeProvider(
  CSSProvider({
    tag: 'span',
    normal: {
      selectNames: [['width'], ['height'], ['backgroundColor']],
    },
    active: {
      selectNames: [['width'], ['height']],
    },
    css: css`
      ${props => getSwitchWrapper(props, 'circleSize').wrapperCss};
      border-radius: ${props => (props.isMouseDown ? `${em(7)}` : '50%')};
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
      background: #fff;
      position: absolute;
      ${props => getStyled(props).position};
      ${props => getSwitchButtonSize(props)};
      top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      transition: 1s;
      -webkit-transition: all 0.2s;

      & > *:first-child {
        display: block;
        color: ${props => getBackground(props)};
        line-height: ${props => getSwitchWrapper(props, 'circleSize').heightEm};
        animation: rotate 1.5s linear infinite;

        &::before {
          transform: scale(0.65);
          line-height: ${props => getSwitchWrapper(props, 'circleSize').heightEm};
        }
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  }),
  'SwitchButton'
);
function getSwitchButtonSize(props) {
  const { height: normalHeight, width: NormalWidth } = getStyled(props).circleSize;
  const { viewClass, theme } = props;
  console.log(props);
  if (theme[viewClass]) {
    const { width = NormalWidth, height = normalHeight } = theme[viewClass];
    console.log(width, height);
  }
}
const getStyled = (props: CssProps) => {
  const { size, isMouseDown, value } = props;
  const normallPosition = (normalSize.height - normallCircleSize.height) / 2;
  const smallPosition = (smallSize.height - smallCircleSize.height) / 2;
  let distance = normallPosition;
  let switchWrapperSize = normalSize;
  let circleSize = normallCircleSize;
  if (size == 'small') {
    switchWrapperSize = smallSize;
    circleSize = smallCircleSize;
    distance = smallPosition;
  }
  distance = em(distance);
  const position = `
    ${value ? `right: ${distance};` : `left:${distance};`}
  `;
  if (isMouseDown) {
    circleSize = Object.assign({}, circleSize, togglesize);
  }
  return {
    position,
    switchWrapperSize,
    circleSize,
  };
};
