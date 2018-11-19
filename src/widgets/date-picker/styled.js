import styled from 'styled-components';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';
import { valueInRange } from '../common/Math';
import { modeStyle } from './getDerived';
import { getIsSame } from './utils';

const fontSize = 1.4;
const em = px2emcss(fontSize);
const distance = {
  iconLeft: 10,
};
const DateWrapperPadding = {
  top: 30,
  left: 20,
  bottom: 44,
};
const borderRadius = 3;
const { hoverColor, normalColor, disableColor, spiritColor } = colorsFunc();
const getThemeProperty = props => {
  const { isRange } = modeStyle(props.mode);
  const { width, color, backgroundColor } = props;
  let newWidth = isRange ? width / 2 + 100 : width * 1 + 100;
  if (!newWidth) {
    newWidth = 300;
  }
  const weekTitleWIdth = em((newWidth - DateWrapperPadding.left * 2 - 2) / 7);
  return {
    width: newWidth,
    color,
    backgroundColor,
    weekTitleWIdth,
  };
};
export const Icons = styled.span`
  position: absolute;
  left: ${em(distance.iconLeft)};
  top: 50%;
  transform: translateY(-50%);
`;
export const DateWrapper = styled.div`
  display: inline-block;
  width: ${props => em(getThemeProperty(props).width)};
  padding: ${props => getDateWrrap(props).paddingStyle};
  vertical-align: top;
  font-size: ${fontSize}rem;
`;

export const DateHeader = styled.div`
  font-size: ${em(14)};
`;
export const RangeInput = styled.div`
  display: inline-block;
  border: 1px solid #e8e8e8;
  border-radius: ${em(borderRadius)};

  & input {
    border: none;
    text-align: center;
  }
  & input:focus {
    border: none;
    box-shadow: none;
  }
`;
export const RangeSpan = styled.span`
  font-size: ${em(14)};
`;
export const HeaderTop = styled.div`
  text-align: center;
  margin-bottom: ${em(12)};
`;
export const HeaderTopText = styled.span`
  color: #333;
  font-size: ${em(14)};
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
  margin-bottom: ${em(12)};
`;
export const HeaderWeek = styled.li`
  display: inline-block;
  font-size: ${em(14)};
  width: ${props => getThemeProperty(props).weekTitleWIdth};
  height: ${props => getThemeProperty(props).weekTitleWIdth};
  text-align: center;
  line-height: ${props => getThemeProperty(props).weekTitleWIdth};
  cursor: pointer;
`;
export const DatePanel = styled.div`
  font-size: ${em(14)};
`;
const dateSize = {
  DateChildWidth: 26,
};
export const DateChild = styled.span`
  display: inline-block;
  width: ${props => getThemeProperty(props).weekTitleWIdth};
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
  font-size: ${em(14)};
  &:hover {
    background: ${hoverColor};
    color: #fff;
    border-radius: 50%;
  }

  color: ${props => (props.outMonth ? '#ccc' : '#666')};
`;
export const OtherChild = styled.span`
  display: inline-block;
  width: ${props => 100 / props.column}%;
  line-height: ${em(40)};
  font-size: ${em(14)};
  text-align: center;
  white-space: nowrap;

  &:hover {
    color: ${hoverColor};
  }

  cursor: pointer;
`;
export const OtherChildText = styled.i`
  padding: ${em(5)} ${em(10)};
  font-style: normal;
  border-radius: ${em(borderRadius)};
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
  border-radius: ${em(borderRadius)};
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

  display: inline-block;
  background: ${props => (props.disabled ? disableColor : '')};
`;
export const RangeMiddleSpan = styled.span`
  display: inline-block;
  width: ${props => em(props.width)};
  text-align: center;
`;
export const Footer = styled.div`
  border-top: 1px solid #ddd;
  padding: ${em(10)} 0;
  color: red;
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
    panelIndex,
    todayIndex,
    noToday,
    rangeStartIndex,
    rangeEndIndex,
    panelFistEndIndex,
    panelSecondStartIndex,
    isHasNormalValue,
    showToday,
    todayDate,
    value,
  } = props;
  const arrChoseDayIndex = Array.isArray(choseDayIndex) ? choseDayIndex : [choseDayIndex];
  const chooseStyle =
    isHasNormalValue &&
    arrChoseDayIndex.reduce((p, n) => {
      return `${p}
    &:nth-child(${n})>i{
      background:${normalColor};
      color:#fff;
      border-radius:50%;
    }`;
    }, '');
  const todayInd = noToday ? '' : value === todayDate && showToday ? todayIndex : '';
  let todayStyle = `
      &:nth-child(${todayInd})>i{
        border:1px solid ${normalColor};        
        color:#666;
        background:#fff;      
        border-radius:50%;
      }
  `;
  let chooseWeeks;
  let chooseWeekRadius;
  if (isChooseWeek || isHoverWeek) {
    const backG = isChooseWeek ? `${normalColor}` : `${hoverColor}`;
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

    const rangeStartIsSmall = rangeStartIndex && rangeEndIndex && rangeStartIndex < rangeEndIndex;
    const rangeStartDir = rangeStartIsSmall ? 'left' : 'right';
    const rangeEndDir = rangeStartIsSmall ? 'right' : 'left';
    rangeStyle = `    
      background:${spiritColor};
      
      &:nth-child(${borderIndex}){
        border-top-${startDir}-radius:20px;
        border-bottom-${startDir}-radius:20px;
      }  
     
      &:nth-child(${rangeStartIndex}){       
        ${borderStyle(rangeStartDir)}
      } 
      &:nth-child(${rangeEndIndex}){        
        ${borderStyle(rangeEndDir)}
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
