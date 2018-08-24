import styled from 'styled-components';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);
const distance = {
  iconLeft: 10,
};
const { hoverColor } = colorsFunc();
export const Date = styled.span`
  display: inline-block;
  position: relative;
`;
export const DateInput = styled.input`
  padding: 0;
  margin: 0;
  width: 198px;
  height: 28px;
  border: 1px solid #ddd;
  padding-left: ${em(23)};
`;
export const Icons = styled.span`
  position: absolute;
  left: ${em(distance.iconLeft)};
  top: 50%;
  transform: translateY(-50%);
`;
export const DateWrapper = styled.div`
  width: ${props => props.width}px;
  padding: 30px 30px 44px;
  border: 1px solid #ddd;
  position: absolute;
  left: 0;
  top: 32px;
`;
export const DateWInner = styled.div`
  width: ${props => props.width}px;
`;
export const DateHeader = styled.div`
  font-size: 12px;
`;
export const HeaderTop = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;
export const HeaderTopText = styled.span`
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: ${hoverColor};
  }
`;
export const HeaderTopArrow = HeaderTopText.extend`    
    float:${props => props.position};
    margin-${props => props.position}:${props => props.margin}px;
    vertical-align:middle;
`;
export const HeaderWeekBox = styled.ul`
  padding: 0;
  margin: 0;
  margin-bottom: 12px;
`;
export const HeaderWeek = styled.li`
  border: 1px solid transparent;
  display: inline-block;
  width: ${props => (props.width - 14) / 7}px;
  height: ${props => (props.width - 14) / 7}px;
  text-align: center;
  line-height: ${props => (props.width - 14) / 7}px;
`;
export const DatePanel = styled.div`
  font-size: 12px;
`;
const dateSize = {
  DateChildWidth: 26,
};
export const DateChild = styled.span`
  border: 1px solid ${props => (props.isToday ? '#684fff' : 'transparent')};
  ${props => (props.isToday ? 'border-radius:50%;' : '')};
  display: inline-block;
  width: ${em(dateSize.DateChildWidth)};
  height: ${em(dateSize.DateChildWidth)};
  text-align: center;
  line-height: ${em(dateSize.DateChildWidth)};
  vertical-align: middle;
  margin-right: ${props => (props.width - (dateSize.DateChildWidth + 2) * 7) / 14}px;
  margin-left: ${props => (props.width - (dateSize.DateChildWidth + 2) * 7) / 14}px;
  &:nth-child(7n) {
    margin-right: 0;
  }

  cursor: pointer;
  &:hover {
    background: ${hoverColor};
  }

  color: ${props => (props.outMonth ? '#ccc' : '#666')};
  ${props => getDateChildStyle(props).chooseStyle};
`;
const getDateChildStyle = props => {
  const { choseDayIndex } = props;
  const chooseStyle = `  
        &:nth-child(${choseDayIndex}){
            background:#684fff;
            color:#fff;
            border-radius:50%;
        }  
        `;
  return {
    chooseStyle,
  };
};
