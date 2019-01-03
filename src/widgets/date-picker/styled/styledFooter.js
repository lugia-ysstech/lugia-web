import styled from 'styled-components';
import { px2emcss } from '../../css/units';

import { themeColor, getDateWrrap, fontSize, em } from './utils';
const { normalColor } = themeColor;

export const FooterWrap = styled.div`
  ${props => (props.showFooter ? 'border-top: 1px solid #ddd;' : '')};
  padding: ${em(10)} ${props => getDateWrrap(props).left};
  font-size: ${fontSize}rem;
  color: ${normalColor};

  &::after {
    display: block;
    content: '';
    clear: both;
    height: 0;
  }
`;
export const Footer = styled.div`
  text-align: ${props => (props.showToday ? 'center' : '')};
`;
export const FooterBtn = styled.span`
  ${props => (props.border ? `border-radius:${em(3)};` : '')};
  ${props => (props.background ? `background:${normalColor};` : '')};
  font-size: ${em(14)};
  line-height: ${em(26)};
  color: ${props => (props.showTime && !props.showTimeButton ? '#ddd' : normalColor)};
  ${props => getFooterStyle(props).marginSize};
  cursor: pointer;
  float: ${props => (props.onOk || props.showTime ? 'right' : props.buttonOptions ? 'left' : '')};
  ${props => (props.onOk ? `padding:0 ${em(10)};color:#fff;` : '')};
`;
export const ExtraFooter = styled.div`
  font-size: ${em(14)};
  line-height: ${em(26)};
  text-align: left;
  color: #999;
`;
const getFooterStyle = props => {
  const { buttonOptions, showToday } = props;
  const direction = buttonOptions ? 'right' : 'left';
  const distance = showToday ? '' : footerSize(5);
  const marginSize = `margin-${direction}:${distance}`;
  return {
    marginSize,
  };
};
export const footerSize = value => {
  const ems = px2emcss(1.4);
  const size = ems(value);
  return size;
};
