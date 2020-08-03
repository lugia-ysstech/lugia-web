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

export const ImageContainer = CSSComponent({
  tag: 'div',
  className: 'ImageContainer',
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
    ],
    getThemeMeta(themeMeta, themeProps) {
      const {
        themeConfig: { normal: { background: { clip: bgImgClip } = {} } = {} } = {},
        propsConfig: { height: bgImgHeight, width: bgImgWidth },
      } = themeProps;
      const clipTextColor = bgImgClip === 'text' ? 'transparent' : '';
      return {
        color: clipTextColor,
        height: bgImgHeight,
        width: bgImgWidth,
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
    display: flex;
  `,
});
