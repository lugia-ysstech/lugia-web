/**
 * create by szfeng
 *
 * @flow
 */
import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import colorsFunc from '../css/stateColor';

const { disableColor, superLightColor } = colorsFunc();

const defaultPictureWidth = 180;
const defaultPictureHeight = 128;

/**
 * skeleton
 */

export const SkeletonWrap = CSSComponent({
  tag: 'div',
  className: 'skeletonWrap',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['margin'],
      ['padding'],
      ['background'],
      ['border'],
      ['boxShadow'],
      ['borderRadius'],
    ],
    defaultTheme: {
      width: 800,
    },
  },
  css: css`
    display: inline-block;
    overflow: hidden;
    box-sizing: content-box;
  `,
});

export const SkeletonContainer = CSSComponent({
  tag: 'div',
  className: 'skeletonContainer',
  normal: {
    selectNames: [['width'], ['height']],
  },
  css: `
    display: flex;
  `,
});

export const ParagraphContainer = CSSComponent({
  tag: 'div',
  className: 'paragraphContainer',
  normal: {
    selectNames: [],
  },
  css: `
    display: inline-block;
    vertical-align: top;
    padding: 0 ${px2remcss(10)};
    flex: 1
  `,
});

/**
 * animation
 */

const getCommonAnimation = (width: number) => {
  const animationCSS = keyframes`
    0% {
      transform: translate(${px2remcss(-width * 3)}, -50%);
    }
    100% {
      transform: translate(${px2remcss(width * 3)}, -50%);
    }
  `;
  return animationCSS;
};

export const AnimationItem = CSSComponent({
  tag: 'div',
  className: 'AnimationItem',
  normal: {
    selectNames: [['width'], ['height']],
    getCSS: (themeMeta, themeProps) => {
      const { width = 40 } = themeMeta;
      const animationCSS = getCommonAnimation(width);
      return css`
        animation: ${animationCSS} 1s linear infinite;
      `;
    },
    getStyle: (themeMeta, themeProps) => {
      const { width } = themeMeta;
      return {
        boxShadow: `0 0 ${px2remcss(width)} ${px2remcss(width)} ${disableColor}`,
      };
    },
  },
  css: css`
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: ${disableColor};
    opacity: 0.5;
  `,
});

/**
 * avatar
 */

export const AvatarContainer = CSSComponent({
  tag: 'div',
  className: 'avatarContainer',
  normal: {
    selectNames: [['margin']],
  },
  css: `
    display: inline-block;
    vertical-align: top;
    padding: ${px2remcss(10)};
  `,
});

export const Avatar = CSSComponent({
  tag: 'div',
  className: 'avatar',
  normal: {
    selectNames: [
      ['width'],
      ['border'],
      ['background'],
      ['border'],
      ['opacity'],
      ['cursor'],
      ['boxShadow'],
      ['borderRadius'],
    ],
    getStyle: themeMeta => {
      const { width } = themeMeta;
      return {
        height: width,
      };
    },
    defaultTheme: {
      background: {
        color: superLightColor,
      },
      width: 32,
      height: 32,
    },
  },
  hover: {
    selectNames: [
      ['border'],
      ['opacity'],
      ['background'],
      ['border'],
      ['boxShadow'],
      ['borderRadius'],
    ],
  },
  css: css`
    display: inline-block;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.3s;
  `,
  option: { hover: true },
});

/**
 * paragraph
 */

export const ParagraphWrap = CSSComponent({
  tag: 'div',
  className: 'paragraphWrap',
  normal: {
    selectNames: [['margin']],
    getStyle: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { type } = propsConfig;
      const bottom = type === 'title' ? 16 : 8;
      return {
        padding: {
          bottom,
        },
      };
    },
  },
  css: `
    padding: ${px2remcss(8)} 0;
  `,
});

const getParagraphWidth = (type: 'title' | 'paragraph', lastItem: boolean) => {
  if (type === 'title') {
    return 400;
  }
  return lastItem ? 400 : '';
};

export const CommonParagraph = CSSComponent({
  tag: 'div',
  className: 'commonParagraph',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['border'],
      ['opacity'],
      ['boxShadow'],
      ['borderRadius'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { type, lastItem } = propsConfig;
      const defaultWidth = getParagraphWidth(type, lastItem);
      return defaultWidth ? `width: ${px2remcss(defaultWidth)}` : '';
    },
    defaultTheme: {
      height: 16,
      background: {
        color: superLightColor,
      },
    },
  },
  hover: {
    selectNames: [['background'], ['border'], ['opacity'], ['boxShadow'], ['borderRadius']],
  },
  css: css`
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
  `,
  option: { hover: true },
});

/**
 * picture
 */

export const PictrueContainer = CSSComponent({
  tag: 'div',
  className: 'pictrueContainer',
  normal: {
    selectNames: [['margin']],
  },
  css: css`
    display: inline-block;
    vertical-align: top;
    padding-right: ${px2remcss(10)};
  `,
});

export const Picture = CSSComponent({
  tag: 'div',
  className: 'picture',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['border'],
      ['background'],
      ['border'],
      ['opacity'],
      ['cursor'],
      ['boxShadow'],
      ['borderRadius'],
    ],
    defaultTheme: {
      background: {
        color: superLightColor,
      },
      width: defaultPictureWidth,
      height: defaultPictureHeight,
    },
  },
  hover: {
    selectNames: [
      ['border'],
      ['opacity'],
      ['background'],
      ['border'],
      ['boxShadow'],
      ['borderRadius'],
    ],
  },
  css: css`
    position: relative;
    transition: all 0.3s;
    overflow: hidden;
  `,
  option: { hover: true },
});
