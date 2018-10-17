/**
 * Progress
 * create by guorg
 * @flow
 */
import styled from 'styled-components';
import { px2emcss } from './units';
import { CirleSvgTextFontSize, getEM, getTextColor, getWrapFontSize } from './progress-line';

const FontSize = 1.2;
const em = px2emcss(FontSize);

export const SvgInner = styled.div`
  width: ${props => {
    const em = getEM(props);
    return props.size === 'default' ? em(120) : em(80);
  }};
  height: ${props => {
    const em = getEM(props);
    return props.size === 'default' ? em(120) : em(80);
  }};
  position: relative;
  font-size: ${getWrapFontSize}rem;
`;
const px = CirleSvgTextFontSize * 10;
export const SvgText = styled.span`
  display: block;
  position: absolute;
  font-size: ${props => getEM(props)(px)};
  width: 100%;
  text-align: center;
  line-height: 1;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  margin: 0;
  ${getTextColor};
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: normal;
  white-space: nowrap;
`;
