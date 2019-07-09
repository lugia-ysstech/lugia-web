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
import type { ThemeType } from '@lugia/lugia-web';

const FontSize = 1.4;
const defaultColor = '#fff';
const { themeColor } = colorsFunc();
const hoverColor = changeColor(themeColor, 0, 0, 10).rgba;

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
};
export type PanelProps = {
  title?: string | any,
  value?: string,
  children?: any,
  getTheme: Function,
  count: number,
  onClick?: Function,
  dispatchEvent: Function,
} & BasicPropsType;
export type PanelState = BasicStateType;
type CSSProps = {
  theme: ThemeType,
  hasChildren?: boolean,
} & BasicPropsType &
  BasicStateType;

const { darkGreyColor, blackColor, lightGreyColor } = colorsFunc();

export const PanelWrap = styled.div`
  box-sizing: border-box;
  background: ${defaultColor};
  border-color: #e8e8e8;
  border-style: solid;
  border-width: 0 0 1px;
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
    defaultTheme: {
      background: { color: hoverColor },
    },
    getCSS(themeMeta, themeProps) {
      const { propsConfig = {}, themeConfig = {} } = themeProps;
      const { hover } = propsConfig;
      const { width } = themeMeta;
      const { normal = {} } = themeConfig;
      const theWidth = width || normal.width;
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

        return `width: ${widthStyle} !important;transform: translateX(-14px);`;
      }
    },
  },
  disabled: {
    selectNames: [['borderRadius'], ['background'], ['opacity'], ['border'], ['boxShadow']],
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
  const { open, opening, closing } = props;
  const { height: propsHeight } = props;
  const theHeight = propsHeight;
  const openHeight = '100%';
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

export const PanelContentWrap = CSSComponent({
  tag: 'div',
  className: 'PanelContentWrap',
  css: css`
    box-sizing: border-box;
    overflow: hidden;
    ${getPanelContent};
  `,
});

export const PanelContent = CSSComponent({
  tag: 'div',
  className: 'PanelContent',
  css: css`
    box-sizing: border-box;
    line-height: 1.5;
  `,
  normal: {
    defaultTheme: {
      font: { size: 14, weight: 300 },
      color: darkGreyColor,
      background: { color: defaultColor },
    },
    selectNames: [['width'], ['height'], ['background'], ['padding'], ['font'], ['color']],
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig = {} } = themeProps;
      const { showArrow, hasChildren } = propsConfig;
      if (!hasChildren) {
        return {};
      }

      return {
        padding: {
          top: 6,
          right: 30,
          bottom: 22,
          left: showArrow ? 34 : 24,
        },
      };
    },
  },
  hover: {
    defaultTheme: {
      color: blackColor,
      background: { color: defaultColor },
    },
    selectNames: [['color']],
  },
  disabled: {
    defaultTheme: {
      color: lightGreyColor,
      background: { color: defaultColor },
    },
    selectNames: [['color']],
  },
});

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

export const Wrap = StaticComponent({
  tag: 'div',
  className: 'PanelWrap',
  css: css`
    transition: all 0.2s;
    font-size: ${FontSize}rem;
  `,
});
