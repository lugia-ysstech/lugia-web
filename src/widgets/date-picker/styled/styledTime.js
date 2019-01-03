import styled from 'styled-components';
import { getThemeProperty, getDateWrrap, fontSize, em } from './utils';
const TimeColBorderColor = '#e8e8e8';
export const TimeWrap = styled.ul`
  display: inline-block;
  font-size: ${fontSize}rem;
  width: ${props => em(getThemeProperty(props).width)};
  border-right: ${props => (props.hasTimeWrapBorder ? '1px solid #ddd' : '')};
  zoom: 1;

  &::after {
    content: '';
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }
`;
export const TimeCol = styled.li`
  float: left;
  border-right: ${props => (props.noBorder ? 'none' : `1px solid ${TimeColBorderColor}`)};
  width: ${props => em(getThemeProperty(props).TimeColWidth)};
  overflow: hidden;
`;
export const TimeTitle = styled.div`
  font-size: ${fontSize}rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding: ${getDateWrrap().top} 0 ${em(12)};
`;
