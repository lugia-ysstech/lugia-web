/*
* by wangcuixia
* @flow
* */
import styled from 'styled-components';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);
const colors = {
  TimeColBorder: '#e8e8e8',
};
export const TimeWrap = styled.ul`
  display: inline-block;
  &::after {
    content: '';
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }

  zoom: 1;
`;
export const TimeCol = styled.li`
  float: left;
  border-right: ${props => (props.noBorder ? 'none' : `1px solid ${colors.TimeColBorder}`)};
`;
