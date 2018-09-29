import styled from 'styled-components';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';
import { valueInRange } from '../common/Math';
const em = px2emcss(1.2);
const distance = {
  iconLeft: 10,
};
const DateWrapperPadding = {
  top: 30,
  left: 20,
  bottom: 44,
};
const { hoverColor, normalColor } = colorsFunc();

export const Icons = styled.span`
  position: absolute;
  left: ${em(distance.iconLeft)};
  top: 50%;
  transform: translateY(-50%);
`;
export const DateWrapper = styled.div`
  display: inline-block;
  width: ${props => props.width}px;
  padding: ${props => getDateWrrap(props).paddingStyle};
  border: 1px solid #ddd;
`;

export const DateHeader = styled.div`
  font-size: 12px;
`;
export const RangeInput = styled.div`
  display: inline-block;
  border: 1px solid #e8e8e8;
  border-radius: 3px;

  & input {
    width: 200px;
    border: none;
    text-align: center;
  }
  & input:focus {
    border: none;
    box-shadow: none;
  }
`;
export const RangeSpan = styled.span`
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
  display: inline-block;
  width: ${props => em((props.width - DateWrapperPadding.left * 2 - 2) / 7)};
  height: ${props => em((props.width - DateWrapperPadding.left * 2 - 2) / 7)};
  text-align: center;
  line-height: ${props => em((props.width - DateWrapperPadding.left * 2 - 2) / 7)};
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
  width: ${props => em((props.width - DateWrapperPadding.left * 2 - 2) / 7)};
  text-align: center;
  vertical-align: middle;
  margin: ${em(3)} ${0};
  ${props => getDateChildStyle(props).chooseStyle};
  ${props => getDateChildStyle(props).chooseWeeks};
  ${props => getDateChildStyle(props).rangeStyle};
  ${props => getDateChildStyle(props).todayStyle};
`;
export const DateChildInner = styled.i`
  font-style: normal;
  display: inline-block;
  width: ${em(dateSize.DateChildWidth)};
  height: ${em(dateSize.DateChildWidth)};
  text-align: center;
  line-height: ${em(dateSize.DateChildWidth)};
  vertical-align: text-top;
  cursor: pointer;

  &:hover {
    background: ${hoverColor};
  }

  color: ${props => (props.outMonth ? '#ccc' : '#666')};
`;
export const OtherChild = styled.span`
  display: inline-block;
  width: ${props => 100 / props.column}%;
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
  ${props => (props.isChose ? `background:${normalColor};color:#fff;` : '')};
`;
export const RangeWrap = styled.div`
  display: inline-block;
`;
export const RangeInnerTop = styled.span`
  display: block;
`;
export const RangeInputWrap = styled.span`
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: 3px;
`;
export const RangeInputInner = styled.span`
  & input {
    border: none;
    text-align: center;
  }
  & input:focus {
    border: none;
    box-shadow: none;
  }
`;
const getDateWrrap = props => {
  const { top, left, bottom } = DateWrapperPadding;
  const paddingStyle = ` ${em(top)}  ${em(left)} ${em(bottom)}`;
  return {
    paddingStyle,
  };
};
const getDateChildStyle = props => {
  const {
    choseDayIndex,
    isChooseWeek,
    startInWeeks,
    endInWeeks,
    isHoverWeek,
    weekHoverStart,
    weekHoverEnd,
    rangeChose,
    rangeIndex,
    index,
    todayIndex,
    noToday,
    rangeStartIndex,
    rangeEndIndex,
    panelFistEndIndex,
    panelSecondStartIndex,
  } = props;

  const arrChoseDayIndex = Array.isArray(choseDayIndex) ? choseDayIndex : [choseDayIndex];

  const chooseStyle = arrChoseDayIndex.reduce((p, n) => {
    return `${p}
    &:nth-child(${n})>i{
      background:${normalColor};
      color:#fff;
      border-radius:50%;
    }`;
  }, '');
  const todayInd = noToday ? '' : todayIndex;
  let todayStyle = `
      &:nth-child(${todayInd})>i{
        border:1px solid ${normalColor};
        border-radius:50%;
      }
  `;
  let chooseWeeks;
  let chooseWeekRadius;
  if (isChooseWeek || isHoverWeek) {
    const backG = isChooseWeek ? `${normalColor}` : '#8f83ff';
    const start = isChooseWeek ? startInWeeks + 1 : weekHoverStart + 1;
    const end = isChooseWeek ? endInWeeks : weekHoverEnd;
    const todayIn = valueInRange(todayIndex, [start, end]);
    if (todayIn) {
      todayStyle = `
      &:nth-child(${todayInd})>i{
        border:1px solid transparent;
        border-radius:50%;       
      }
  `;
    }
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
  let rangeStyle;
  if (rangeChose) {
    let isEnd = false;
    const startOrEnd = index % 7;
    let borderIndex;
    if (startOrEnd === 0) {
      isEnd = true;
      borderIndex = index;
    }
    if (startOrEnd === 1) {
      isEnd = false;
      borderIndex = index;
    }

    const direction = rangeIndex === 0 ? 'left' : 'right';
    const startDir = isEnd ? 'right' : 'left';
    const borderStyle = (dire: string) => {
      return `
        border-top-${dire}-radius:20px;
        border-bottom-${dire}-radius:20px;
      `;
    };
    rangeStyle = `    
      background:#684fff1f;
      &:nth-child(${arrChoseDayIndex}){
        border-top-${direction}-radius:20px; 
        border-bottom-${direction}-radius:20px;
      }    
      &:nth-child(${borderIndex}){
        border-top-${startDir}-radius:20px;
        border-bottom-${startDir}-radius:20px;
      }  
     
      &:nth-child(${rangeStartIndex}){       
        ${borderStyle('left')}
      } 
      &:nth-child(${rangeEndIndex}){        
        ${borderStyle('right')}
      }
      &:nth-child(${panelFistEndIndex}){        
        ${borderStyle('right')}
      }
      &:nth-child(${panelSecondStartIndex}){        
        ${borderStyle('left')}
      }
    `;
  }
  return {
    chooseStyle,
    chooseWeeks,
    chooseWeekRadius,
    rangeStyle,
    todayStyle,
  };
};
