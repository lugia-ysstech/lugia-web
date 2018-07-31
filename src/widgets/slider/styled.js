/*
* by wangcuixia
* @flow
* */
import styled from 'styled-components';
import { px2emcss } from '../css/units';
import {
  trackBackground,
  doneBackground,
  doingBackground,
  throughRangeBackground,
  trackDisabledBackground,
  btnDisabledBackground,
  tipBackground,
  tipColor,
} from './slider_public_color';

const em = px2emcss(1.2);
type CssTypeProps = {
  background?: string,
  changeBackground?: boolean,
  moveY?: number,
  btnWidth?: number,
  btnHeight?: number,
  SliderInnerWidth?: number,
  rangeW?: number,
  moveX?: number,
  value?: any,
  SliderInnerLeft?: number,
  btnDisabled?: boolean,
  disabled?: boolean,
  marksData?: Object,
  iconStyle?: Object,
  middleVal?: number,
  vertical?: boolean
};
export const SliderWrapper = styled.div`
  width: ${props => getStyled(props).rangeW}px;
  height: ${props => getStyled(props).rangeH}px;
  background: ${props => getStyled(props).wrapperBackground};
  border-radius: ${em(6)};
  position: relative;
  display:inline-block;
`;
export const SliderInner = styled.div`
  width: ${props => getStyled(props).InnerWidth};
  height: ${props => getStyled(props).InnerHeight};
  background: ${props => getStyled(props).innerBackground};
  border-radius: ${em(6)};
  position: absolute;
  // left: ${props => getStyled(props).SliderInnerLeft}%;
  // top: 0;
  ${props => getStyled(props).sliderInnerPosition};
`;
export const Button = styled.span`
  width: ${props => getStyled(props).btnWidth}px;
  height: ${props => getStyled(props).btnHeight}px;
  border-radius: 50%;
  background: ${props => getStyled(props).btnBackground};
  position: absolute;
  ${props => getStyled(props).btnPosition}  
  
  z-index: 2;
`;
export const Tips = styled.span`
  font-size: ${em(14)};
  text-align: center;
  position: absolute;
  left: 50%;
  top: -${em(40)};
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
`;
export const Tipinner = styled.span`
  display: block;
  min-width: ${em(21)};
  height: ${em(27)};
  line-height: ${em(27)};
  padding: 0 ${em(3)};
  background: ${tipBackground};
  color: ${tipColor};
  border-radius: ${em(3)};
`;
export const Tiparrow = styled.span`
  display: inline-block;
  vertical-align: top;
  border-top: ${em(6)} solid ${tipBackground};
  border-left: ${em(5)} solid transparent;
  border-right: ${em(5)} solid transparent;
  border-bottom: ${em(5)} solid transparent;
`;
export const Dot = styled.span`
  width: 6px;
  height: 6px;  
  border-radius: 50%;
  position: absolute;
  // left: ${props => props.marksData.dotMoveX}%;
  // top: 50%;
  ${props => getStyled(props).dotPosition};
  
  z-index: 1;  
  ${props => getStyled(props).dotStyle};
  ${props => getStyled(props).dotBackground}
  
  &:before {
    content: '${props => getStyled(props).marskText}';
    display: block;
    position: absolute;
    // left: 50%;
    // transform: translateX(-50%);
    // -webkit-transform: translateX(-50%);
    // top: 10px;
    ${props => getStyled(props).dotTextPosition}
  }
`;
export const Icons=styled.span`
    position: absolute;
    top: 50%;
    line-height: 0;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    color:#ccc;
    ${props => getStyled(props).iconPosition}
    ${props => getStyled(props).changeColor}
    //${props => props.iconStyle.style};
    font-size:${props => em(parseInt(props.iconStyle.style.fontSize))};  
  
`;

const getStyled = (props: CssTypeProps) => {
  const {
    changeBackground,
    SliderInnerWidth,
    moveX,
    moveY,
    value,
    SliderInnerLeft,
    btnDisabled,
    disabled,
    background,
    marksData,
    iconStyle,
    middleVal,
    vertical
  } = props;
  let { btnWidth, btnHeight,rangeW,rangeH} = props;
  let InnerWidth = SliderInnerWidth+'%';
  let InnerHeight = rangeH+'px';
  let sliderInnerPosition=`
      left:${SliderInnerLeft}%;
      top:0;
  `;
  if (Array.isArray(value) && value.length === 2) {
    InnerWidth = SliderInnerWidth+'%';
    if(vertical) {
      InnerWidth = rangeH + 'px';
      InnerHeight =SliderInnerWidth+'%';
      sliderInnerPosition =`
      left:0;
      bottom:${SliderInnerLeft}%;
    `;
    }
  }
  const innerBackground = disabled
    ? trackDisabledBackground
    : changeBackground
      ? doingBackground
      : background;
  const wrapperBackground = changeBackground || disabled ? throughRangeBackground : trackBackground;
  const isChangeBg = changeBackground && btnDisabled;
  const btnBackground = disabled
    ? btnDisabledBackground
    : isChangeBg
      ? innerBackground
      : background;
  btnWidth = isChangeBg ? btnWidth + 4 * 1 : btnWidth;
  btnHeight = isChangeBg ? btnHeight + 4 * 1 : btnHeight;
  let isShowDot, dotStyle, marskText, isChangDotBg, dotBackground,dotPosition,dotTextPosition;
  if (marksData) {
    const {dotIndex,maxValue,minValue,moveValue,marks} =marksData;
    isShowDot = dotIndex === maxValue || dotIndex === minValue;
    dotStyle = marks.style;
    marskText = marks.text || marks;
    isChangDotBg = moveValue >= dotIndex && !isShowDot;
    if (isShowDot) {
      dotBackground = `
        border: none;
        background: none;
      `;
    } else {
      dotBackground = `
        border: 1px solid #cccccc;
        background: #fff;
      `;
    }
    if (isChangDotBg) {
      dotBackground = `
        border: none;
        background: #fff;
      `;
    }
    const {dotMoveX,vertical} =marksData;
    dotPosition=`
      left: ${dotMoveX}%;
      top: 50%;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
    `;
    dotTextPosition=`
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      top: 12px;
    `;
    if(vertical){
      dotPosition=`
        left: 50%;
        bottom: ${dotMoveX}%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
    `;
      dotTextPosition=`
        left: 15px;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        top: 50%;
      `;
    }

  }
  let iconPosition;
  let changeColor;
  if(iconStyle){
    const emTimes=parseInt(iconStyle.style.fontSize)/12;
    const positionValue =em((parseInt(iconStyle.style.fontSize) + 22)/emTimes);
    if(iconStyle.position === 'left'){
      iconPosition=`
        left:-${positionValue};
      `;
      if(value <= middleVal ){
        changeColor ='color:#999;';
      }
    }else{
      iconPosition=`
        right:-${positionValue};
      `;
      if(value>middleVal ){
        changeColor ='color:#999;';
      }
    }
  }

  const rangwWidth=rangeW;
  const rangwHeight=rangeH;
  let btnPosition =`
    left: ${moveX}%;
    top: 50%;
    transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  `;
  if(vertical){
    rangeW=rangwHeight;
    rangeH =rangwWidth;
    if(value.length===1){
      InnerWidth=rangwHeight+'px';
      InnerHeight = SliderInnerWidth+'%' ;
      sliderInnerPosition=`
        left:${SliderInnerLeft}%;
        bottom:0;
    `;
    }
    btnPosition=`
      left: 50%;
      bottom: ${moveY}% ;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      
    `;

  }


  return {
    InnerWidth,
    InnerHeight,
    SliderInnerLeft,
    sliderInnerPosition,
    innerBackground,
    wrapperBackground,
    btnWidth,
    btnHeight,
    btnBackground,
    isShowDot,
    dotStyle,
    marskText,
    isChangDotBg,
    dotBackground,
    iconPosition,
    changeColor,
    rangeW,
    rangeH,
    btnPosition,
    dotPosition,
    dotTextPosition
  };
};
