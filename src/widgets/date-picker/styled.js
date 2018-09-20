import styled from 'styled-components';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);
const distance = {
  iconLeft: 10,
};
const { hoverColor } = colorsFunc();
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
  cursor: pointer;
`;
export const DatePanel = styled.div`
  font-size: 12px;
`;
const dateSize = {
  DateChildWidth: 26,
};
export const DateChild = styled.span`
  display: inline-block;
  width: ${props => em(props.width / 7)};
  text-align: center;
  vertical-align: middle;
  ${props => getDateChildStyle(props).chooseStyle};
  ${props => getDateChildStyle(props).chooseWeeks};
`;
export const DateChildInner = styled.i`
  font-style: normal;
  border: 1px solid ${props => (props.isToday ? '#684fff' : 'transparent')};
  border-style: ${props => (props.noToday ? 'dashed' : '')};
  ${props => (props.isToday ? 'border-radius:50%;' : '')};
  display: inline-block;
  width: ${em(dateSize.DateChildWidth)};
  height: ${em(dateSize.DateChildWidth)};
  text-align: center;
  line-height: ${em(dateSize.DateChildWidth)};
  vertical-align: middle;
  cursor: pointer;

  &:hover {
    background: ${hoverColor};
  }

  color: ${props => (props.outMonth ? '#ccc' : '#666')};
`;
export const OtherChild = styled.span`
  display: inline-block;
  width: 25%;
  line-height: ${em(40)};
  font-size: 14px;
  text-align: center;
  white-space: nowrap;

  &:hover {
    color: ${hoverColor};
  }

  cursor: pointer;
`;
export const OtherChildText = styled.i`
  padding: 5px 10px;
  font-style: normal;
  border-radius: 3px;
  ${props => (props.isChose ? 'background:#684fff;color:#fff;' : '')};
`;
const getDateChildStyle = props => {
  const {
    choseDayIndex,
    isChooseWeek,
    startInWeeks,
    endInWeeks,
    isHoverWeek,
    weekHoverStart,
    weekHoverEnd,
  } = props;
  const chooseStyle = `  
        &:nth-child(${choseDayIndex})>i{
          background:#684fff;
          color:#fff;
          border-radius:50%;
        } 
        `;
  let chooseWeeks;
  let chooseWeekRadius;
  if (isChooseWeek || isHoverWeek) {
    const backG = isChooseWeek ? '#684fff' : '#8f83ff';
    const start = isChooseWeek ? startInWeeks + 1 : weekHoverStart + 1;
    const end = isChooseWeek ? endInWeeks : weekHoverEnd;
    chooseWeeks = `
    background:${backG};
    
      &>i{
        color:#fff;
        border-radius:50%;
      }  

      &:nth-child(${start}){
        border-top-left-radius:20px;
        border-bottom-left-radius:20px;
      }
  
      &:nth-child(${end}){
        border-top-right-radius:20px;
        border-bottom-right-radius:20px;
      } 
    `;
  }
  return {
    chooseStyle,
    chooseWeeks,
    chooseWeekRadius,
  };
};
