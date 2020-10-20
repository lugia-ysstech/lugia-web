/**
 * Image
 * create by zhanglunyu
 * @flow
 */
import CSSComponent from '@lugia/theme-css-hoc';
import { css } from 'styled-components';

export type ImageTypeProps = {
  src?: string,
  alt?: string,
  title?: string,
  isBackground?: boolean,
};

export const BackgroundImgContainer = CSSComponent({
  tag: 'div',
  className: 'BackgroundContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['borderRadius'],
      ['border'],
      ['boxShadow'],
      ['padding'],
      ['margin'],
      ['color'],
      ['fontSize'],
      ['font'],
    ],
    defaultTheme: {
      width: 200,
      height: 100,
    },
    getThemeMeta(themeMeta, themeProps) {
      const {
        themeConfig: { normal: { background: { clip: bgImgClip } = {} } = {} } = {},
      } = themeProps;
      const clipTextColor = bgImgClip === 'text' ? 'transparent' : '';
      return {
        color: clipTextColor,
      };
    },
    getCSS: (themeMeta, themeProps) => {
      const {
        themeConfig: { normal: { background: { clip: bgImgClip } = {} } = {} } = {},
        propsConfig: { isBackground: isBackgroundImg, src: bgImgUrl },
      } = themeProps;
      const backgroundImg = isBackgroundImg ? bgImgUrl : '';
      return css`
        background-image: url(${backgroundImg});
        -webkit-background-clip: ${bgImgClip};
      `;
    },
  },
  hover: {
    selectNames: [],
  },
  css: `
    box-sizing:content-box;
  `,
});
export const ImageContainer = CSSComponent({
  tag: 'img',
  className: 'ImageContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['borderRadius'],
      ['border'],
      ['boxShadow'],
      ['padding'],
      ['margin'],
      ['color'],
      ['fontSize'],
      ['font'],
    ],
    defaultTheme: {
      width: 200,
    },
  },
});
