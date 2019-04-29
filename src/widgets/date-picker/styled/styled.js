import styled from 'styled-components';
import { valueInRange } from '../../common/Math';
import {
  borderRadius,
  distance,
  em,
  fontSize,
  getDateWrrap,
  getThemeProperty,
  themeColor,
} from './utils';

const { hoverColor, normalColor, disableColor, spiritColor } = themeColor;
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

function getMargin(props: Object) {
  return `margin-${props.position}:${props.margin}px;`;
}

export const HeaderTopArrow = styled(HeaderTopText)`
  float: ${props => props.position};
  ${getMargin}
  vertical-align: middle;
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
  ${props => getDateChildStyle(props).chooseWeeks};  
  ${props => (props.rangeChose ? `background:${spiritColor}` : '')};  
  ${props => getDateChildStyle(props).todayStyle};
  ${props => getDateChildStyle(props).chooseStyle};
  ${rangeBorderDireStyle('7n', 'right')}
  ${rangeBorderDireStyle('7n+1', 'left')}
  ${props => props && props.rangeStartIndex && rangeBorderDireStyle(props.rangeStartIndex, 'left')}
  ${props => props && props.rangeEndIndex && rangeBorderDireStyle(props.rangeEndIndex, 'right')}
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
  font-size: ${fontSize}rem;
  width: ${props => em(getThemeProperty(props).rangeWrapWidth)};
`;
export const RangeInnerTop = styled.span`
  display: block;
`;
export const RangeInputWrap = styled.div`
  font-size: ${fontSize}rem;
  display: inline-block;
  border: 1px solid #ddd;
  border-radius: ${em(borderRadius)};
  width: ${props => em(props.width)};
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
const getDateChildStyle = props => {
  const {
    choseDayIndex,
    isChooseWeek,
    startInWeeks,
    endInWeeks,
    isHoverWeek,
    weekHoverStart,
    weekHoverEnd,
    todayIndex,
    noToday,
    selectToday,
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
  const todayInd = noToday ? '' : selectToday ? todayIndex : '';
  let todayStyle = `
      &:nth-child(${todayInd})>i{
        border:1px solid ${normalColor};        
        color:#666;
        background:#fff;      
        border-radius:50%;
        &:hover {
          background: ${hoverColor};
          color: #fff;
          border-radius: 50%;
        }
      }
      
  `;
  let chooseWeeks;
  if (isChooseWeek || isHoverWeek) {
    const backG = isChooseWeek ? `${normalColor}` : `${hoverColor}`;
    const start = isChooseWeek ? startInWeeks : weekHoverStart;
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
  return {
    chooseStyle,
    chooseWeeks,
    todayStyle,
  };
};
function rangeBorderDireStyle(index, dire) {
  return `
  &:nth-child(${index}){
    border-top-${dire}-radius:${em(20)};
    border-bottom-${dire}-radius:${em(20)};
  }`;
}
