/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import styled from 'styled-components';
import Icon from '../icon';

export type Type = 'info' | 'success' | 'error' | 'warning' | 'loading';
export type IconConProps = {
  iconType: Type,
  content: string,
};
export type IconConState = {};

const FontSize = 1.4;
const IconFontSize = 1.6;
const em = px2emcss(FontSize);
const iconEM = px2emcss(IconFontSize);
const { themeColor, successColor, warningColor, dangerColor } = colorsFunc();

export const IconInfo = {
  info: { class: 'lugia-icon-reminder_info_circle', color: themeColor },
  success: { class: 'lugia-icon-reminder_check_circle', color: successColor },
  error: { class: 'lugia-icon-reminder_close_circle', color: dangerColor },
  warning: { class: 'lugia-icon-reminder_exclamation_circle', color: warningColor },
  loading: { class: 'lugia-icon-financial_loading_o', color: themeColor },
};

export const Icons = styled(Icon)`
  color: ${props => IconInfo[props.iconType].color};
  position: relative;
  top: ${iconEM(3)};
  margin-right: ${iconEM(10)};
  font-size: ${em(16)};
  cursor: default;
`;
