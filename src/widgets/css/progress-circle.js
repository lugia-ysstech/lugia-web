/**
 * Progress
 * create by guorg
 * @flow
 */
import styled from 'styled-components';
import { px2remcss } from './units';
import { getEM, getTextColor, getWrapFontSize } from './progress-line';

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
export const SvgText = styled.span`
  display: block;
  position: absolute;
  font-size: ${props => getEM(props)};
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
