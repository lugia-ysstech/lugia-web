/**
 * Progress
 * create by guorg
 * @flow
 */
import styled, { css } from 'styled-components';
import { px2remcss } from './units';
import { getTextColor, getWrapFontSize } from './progress-line';
import CSSComponent from '@lugia/theme-css-hoc';
import colorsFunc from '../css/stateColor';

const { mediumGreyColor } = colorsFunc();
export const SvgInner = styled.div`
  width: ${props => {
    return props.size === 'default' ? px2remcss(120) : px2remcss(80);
  }};
  height: ${props => {
    return props.size === 'default' ? px2remcss(120) : px2remcss(80);
  }};
  position: relative;
  font-size: ${getWrapFontSize}rem;
`;

export const SvgText = CSSComponent({
  tag: 'span',
  className: 'ProgressSvgText',
  css: css`
    display: block;
    position: absolute;
    font-size: ${px2remcss(24)};
    width: 100%;
    text-align: center;
    line-height: 1;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    margin: 0;
    color: ${getTextColor};
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: normal;
    white-space: nowrap;
  `,
  normal: {
    selectNames: [['font'], ['color']],
    defaultTheme: {
      font: { size: 24 },
      color: mediumGreyColor,
    },
    getThemeMeta(themeMeta, themeProps): Object {
      const { propsConfig = {} } = themeProps;
      const { status } = propsConfig;
      const color = getTextColor(status);

      return {
        color,
      };
    },
  },
});
