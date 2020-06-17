/**
 * Progress
 * create by guorg
 * @flow
 */
import styled, { css } from 'styled-components';
import { px2remcss } from './units';
import { getTextColor, getWrapFontSize } from './progress-line';
import CSSComponent from '@lugia/theme-css-hoc';
import get from './theme-common-dict';

const blackColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';

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
const getFontSize = (props: CSSProps) => {
  const { size } = props;
  const fontSize = size === 'small' ? 'headLineFontSize' : 'largeTitleFontSize';
  return `font-size: ${px2remcss(get(fontSize))}`;
};

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
    ${getFontSize};
  `,
  normal: {
    selectNames: [['font'], ['color']],
    defaultTheme: {
      color: blackColor,
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
