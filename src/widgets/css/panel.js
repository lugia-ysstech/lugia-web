/**
 * Panel 颜色公共值
 * create by guorg
 * @flow
 */
import colorsFunc from '../css/stateColor';
import styled, { css, keyframes } from 'styled-components';
import CSSComponent, { StaticComponent } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import changeColor from '../css/utilsColor';
import { getMargin } from './collapse';
import Icon from '../icon';
import type { ThemeType } from '@lugia/lugia-web';

const FontSize = 1.4;
const defaultColor = '#fff';

type BasicPropsType = {
  disabled?: boolean,
  open: boolean,
  showArrow?: boolean,
};
type BasicStateType = {
  open: boolean,
  opening: boolean,
  closing: boolean,
  height: number,
  hover: boolean,
  headerHeight: number,
};
export type PanelProps = {
  title?: string | any,
  value?: string,
  children?: any,
  getTheme: Function,
  onClick?: Function,
} & BasicPropsType;
export type PanelState = BasicStateType;
type CSSProps = {
  theme: ThemeType,
  hasChildren?: boolean,
} & BasicPropsType &
  BasicStateType;

const { darkGreyColor, blackColor, lightGreyColor } = colorsFunc();

export const getThemeWidthCSS = (props: CSSProps) => {
  const { width } = props.theme;
  if (width) {
    return `
      width: ${px2remcss(width)};
    `;
  }
};
const getThemeBackgroundColorCSS = (props: CSSProps): string => {
  const { backgroundColor } = props.theme;
  if (backgroundColor) {
    return `
      background: ${backgroundColor};
    `;
  }

  return `
      background: ${defaultColor};
    `;
};
const getThemeBorderWidthCSS = (props: CSSProps): string => {
  const { borderSize, borderColor } = props.theme;
  const bdColor = borderColor || '#e8e8e8';

  if (typeof borderSize === 'number') {
    return `
      border-width: ${px2remcss(borderSize)};
      border-color: ${bdColor};
      border-style: solid;
    `;
  }
  if (typeof borderSize === 'object') {
    const { top = 0, right = 0, bottom = 0, left = 0 } = borderSize;

    return `
      border-width: ${px2remcss(top)} ${px2remcss(right)} ${px2remcss(bottom)} ${px2remcss(left)};
      border-color: ${bdColor};
      border-style: solid;
    `;
  }
  return `
    border-color: ${bdColor};
    border-style: solid;
    border-width: 0 0 1px 0;
  `;
};
const getBoxShadow = (props: CSSProps) => {
  const { hover, opening } = props;
  if (opening) {
    return '';
  }
  const { backgroundColor, borderSize } = props.theme;
  const color = backgroundColor || defaultColor;
  const shadowColor = changeColor(color, 0, 30, 20).rgba;
  if (hover && borderSize) {
    if ((typeof borderSize === 'number' && borderSize === 0) || !borderSize.bottom) {
      return `
      box-shadow: 0px 0px 6px ${shadowColor};
    `;
    }
  }
};
export const PanelWrap = styled.div`
  box-sizing: border-box;
  ${getThemeBorderWidthCSS} ${getThemeBackgroundColorCSS};
`;

export const PanelHeader = CSSComponent({
  tag: 'div',
  className: 'PanelHeader',
  css: css`
    box-sizing: border-box;
    position: relative;
    font-size: ${FontSize}rem;
    cursor: ${(props: CSSProps) => (props.disabled ? 'not-allowed' : 'pointer')};
    line-height: 1;
    user-select: none;
    transition: all 0.3s;
  `,
  normal: {
    defaultTheme: {
      opacity: 1,
      color: blackColor,
    },
    selectNames: [
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['padding'],
      ['width'],
      ['height'],
      ['background'],
    ],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig = {} } = themeProps;
      const { showArrow } = propsConfig;
      const padding = { top: 16, right: 0, bottom: 16, left: showArrow ? 30 : 20 };

      return { padding };
    },
  },
  hover: {
    selectNames: [['borderRadius'], ['background'], ['opacity'], ['border'], ['boxShadow']],
    getCSS(themeMeta, themeProps) {
      const { propsConfig = {}, themeConfig = {} } = themeProps;
      const { hover } = propsConfig;
      const { width } = themeMeta;
      const theWidth = width || themeConfig.normal.width;
      let widthStyle;
      if (hover) {
        if (theWidth) {
          if (typeof theWidth === 'number') {
            widthStyle = px2remcss(theWidth + 14);
          } else {
            widthStyle = `calc(${theWidth} + 14px)`;
          }
        } else {
          widthStyle = 'calc(100% + 14px)';
        }
        console.log('widthStyle', widthStyle);
        return `width: ${widthStyle} !important;transform: translateX(-14px);`;
      }
    },
  },
});
export const PanelHeaderText = CSSComponent({
  tag: 'span',
  className: 'PanelHeaderText',
  normal: {
    defaultTheme: {
      font: { size: 14 },
      color: blackColor,
    },
    selectNames: [['font'], ['color']],
  },
  hover: {
    defaultTheme: {
      color: blackColor,
    },
    selectNames: [['color']],
  },
  disabled: {
    defaultTheme: {
      color: lightGreyColor,
    },
    selectNames: [['color']],
  },
});
const getPanelContent = (props: CSSProps): string => {
  const { open, opening, closing, headerHeight = 0, theme } = props;
  const { height: themeHeight } = theme;
  const { height: propsHeight } = props;
  const theHeight = themeHeight ? themeHeight - headerHeight : propsHeight;
  const openHeight = themeHeight ? px2remcss(themeHeight - headerHeight) : '100%';
  const OpenKeyframe = keyframes`
    from {
      height: ${px2remcss(0)};
    }
    to {
      height: ${theHeight}px;
    }
  `;
  const CloseKeyframe = keyframes`
    from {
      height: ${theHeight}px;
    }
    to {
      height: ${px2remcss(0)};
    }
  `;
  if (opening) {
    return css`
      height: ${theHeight}px;
      animation: ${OpenKeyframe} 0.5s;
    `;
  }
  if (closing) {
    return css`
      height: ${theHeight}px;
      animation: ${CloseKeyframe} 0.5s;
    `;
  }
  if (open) {
    return `
     height: ${openHeight};`;
  }
  return `
    height: ${px2remcss(0)};
  `;
};
const getContenColor = (props: CSSProps): string => {
  const { disabled, theme } = props;
  const backgroundColor = theme.backgroundColor || defaultColor;
  if (disabled) {
    return `
      color: ${lightGreyColor};
      background: ${backgroundColor};
    `;
  }

  return `
      color: ${darkGreyColor};
      background: ${backgroundColor};
    `;
};
const getContentPadding = (props: CSSProps): string => {
  const { showArrow, hasChildren } = props;
  if (!hasChildren) {
    return '';
  }
  if (showArrow) {
    return `
     padding: ${px2remcss(6)} ${px2remcss(30)} ${px2remcss(22)} ${px2remcss(34)};
    `;
  }

  return `
    padding: ${px2remcss(6)} ${px2remcss(30)} ${px2remcss(22)} ${px2remcss(24)};
  `;
};
export const PanelContentWrap = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  ${getPanelContent};
  ${getContenColor};
`;

export const PanelContent = styled.div`
  box-sizing: border-box;
  font-weight: 300;
  line-height: 1.5;
  ${getContentPadding};
`;

export const getIconTransform = (props: Object) => {
  const { opening, open, closing } = props;
  if (opening) {
    return `
      transition: transform 0.3s;
      transform: translateY(-50%) rotate(90deg);
    `;
  }
  if (closing) {
    return `
      transition: transform 0.3s;
      transform: translateY(-50%) rotate(0deg);
    `;
  }
  if (open) {
    return `
      transform: translateY(-50%) rotate(90deg)
    `;
  }

  return 'transform: translateY(-50%);';
};

// export const IconWrap: Object = styled(Icon)`
//   position: absolute;
//   top: 50%;
//   left: ${px2remcss(10)};
//   ${getIconTransform};
// `;

export const HoverIconWrap = styled.div`
  box-sizing: border-box;
  transition: left 0.3s;
  opacity: ${(props: CSSProps) => (props.hover ? '1' : '0')};
  width: ${px2remcss(14)};
  ${getPanelContent};
  position: absolute;
  top: 0;
  left: ${(props: CSSProps) => (props.hover ? px2remcss(-10.5) : 0)};
  ${getThemeBackgroundColorCSS};
`;
export const Wrap = styled.div`
  transition: all 0.2s;
  font-size: ${FontSize}rem;
  ${getMargin}
  ${getThemeWidthCSS}
  ${getBoxShadow}
`;
