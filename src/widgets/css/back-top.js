/**
 * Layout
 * create by guorg
 * @flow
 */
import styled from 'styled-components';
import colorsFunc from '../css/stateColor';
import { getThemeColor } from '../common/ThemeUtils';
import { px2emcss } from './units';
import Icon from '../icon';

const { defaultColor } = colorsFunc();
const FontSize = 1.2;
const em = px2emcss(FontSize);

export type BackTopProps = {
  visibilityHeight?: number,
  children?: any,
  getTheme: Function,
};
export type BackTopState = {
  fixed: boolean,
};
type CSSProps = {
  fixed: boolean,
  theme: Object,
};

const getFixedCSS = (props: CSSProps) => {
  const { fixed } = props;
  if (fixed) {
    return 'position: fixed;';
  }
};
export const BackTop = styled.div`
  ${getFixedCSS}
  bottom: ${em(50)};
  right: ${em(30)};
  cursor: pointer;
`;

const getBackgroundCSS = (props: CSSProps) => {
  const { backgroundColor = defaultColor } = props.theme;

  return `background-color: ${backgroundColor}`;
};
export const BackTopContent = styled.div`
  width: ${em(40)};
  height: ${em(40)};
  line-height: ${em(40)};
  border-radius: ${em(40)};
  border: 1px solid #e8e8e8;
  color: ${props => getThemeColor(props.theme)};
  text-align: center;
  overflow: hidden;
  box-shadow: 0 0 ${em(4)} #e8e8e8;
  ${getBackgroundCSS};
`;
export const IconWrap = styled(Icon)`
  vertical-align: bottom !important;
`;
