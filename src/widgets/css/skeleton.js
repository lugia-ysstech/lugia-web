/**
 * create by szfeng
 *
 * @flow
 */
import CSSComponent, { css, keyframes } from '@lugia/theme-css-hoc';
import { px2remcss } from '../css/units';
import { toNumber } from '../common/NumberUtils';
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
    selectNames: [['width'], ['height']],
  },
  css: `
    display: inline-block;
    width: ${px2remcss(800)};
  `,
});

export const SkeletonContainer = CSSComponent({
  tag: 'div',
  className: 'skeletonContainer',
  normal: {
    selectNames: [['width'], ['height'], ['margin'], ['padding']],
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
  className: 'animationItem',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { width } = propsConfig;
      const animationCSS = getCommonAnimation(width);
      return css`
        animation: ${animationCSS} 1s linear infinite;
      `;
    },
    getStyle: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { width, height } = propsConfig;
      return {
        width: px2remcss(width),
        height: px2remcss(height),
        boxShadow: `0 0 ${px2remcss(width)} ${px2remcss(width)} ${disableColor}`,
      };
    },
  },
  css: `
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: ${disableColor};
    width: ${px2remcss(200)};
    height: ${px2remcss(200)};
  `,
});

/**
 * avatar
 */

export const AvatarContainer = CSSComponent({
  tag: 'div',
  className: 'avatarContainer',
  normal: {
    selectNames: [],
  },
  css: `
    display: inline-block;
    vertical-align: top;
    padding: ${px2remcss(10)};
  `,
});

export const CommonAvatar = CSSComponent({
  tag: 'div',
  className: 'avatar',
  normal: {
    selectNames: [['width']],
    getStyle: themeMeta => {
      const { width } = themeMeta;
      return {
        height: width,
      };
    },
  },
  css: `
    display: inline-block;
    width: ${px2remcss(32)};
    height: ${px2remcss(32)};
    background: ${superLightColor};
    position: relative;
    border-radius: 50%;
    overflow: hidden
  `,
});

/**
 * paragraph
 */

export const ParagraphWrap = CSSComponent({
  tag: 'div',
  className: 'paragraphWrap',
  normal: {
    selectNames: [],
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

const getParagraphWidth = (type: 'title' | 'paragraph', width: any, lastItem: boolean) => {
  if (!width && !lastItem) {
    return;
  }
  const defaultWidth = type === 'title' ? 400 : lastItem ? 400 : 600;
  return toNumber(width, defaultWidth);
};

export const CommonParagraph = CSSComponent({
  tag: 'div',
  className: 'commonParagraph',
  normal: {
    selectNames: [],

    getStyle: (themeMate, themeProps) => {
      const { propsConfig } = themeProps;
      const { type, width, lastItem } = propsConfig;
      const activeWidth = getParagraphWidth(type, width, lastItem);

      return {
        width: activeWidth,
      };
    },
  },
  css: `
    height: ${px2remcss(16)};
    background: ${superLightColor};
    position: relative;
    overflow: hidden
  `,
});

/**
 * picture
 */

export const PictrueContainer = CSSComponent({
  tag: 'div',
  className: 'pictrueContainer',
  normal: {
    selectNames: [],
  },
  css: `
    display: inline-block;
    vertical-align: top
  `,
});

export const CommonPicture = CSSComponent({
  tag: 'div',
  className: 'picture',
  normal: {
    selectNames: [['width'], ['height']],
  },
  css: `
    width: ${px2remcss(defaultPictureWidth)};
    height: ${px2remcss(defaultPictureHeight)};
    background: ${superLightColor};
    position: relative;
    overflow: hidden
  `,
});
