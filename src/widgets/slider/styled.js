/*
* by wangcuixia
* @flow
* */
import styled from 'styled-components';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';
const em = px2emcss(1.2);
const { themeColor, successColor, dangerColor } = colorsFunc();
const { hoverColor } = colorsFunc(themeColor);
type CssTypeProps = {
  background?: string,
  changeBackground?: boolean,
  moveY?: number,
  btnWidth?: number,
  btnHeight?: number,
};
export const SliderWrapper = styled.div`
  width: ${props => props.rangeW}px;
  height: ${props => props.rangeH}px;
  background: ${props => (props.disabled ? '#f2f2f2' : '#e8e8e8')};
  margin-left: 50px;
  border-radius: 6px;
  position: relative;
`;
export const SliderInner = styled.div`
  width: ${props => props.moveX}%;
  height: ${props => props.rangeH}px;
  background: ${props => (props.disabled ? '#f2f2f2' : getStyled(props).background)};
  border-radius: 6px;
  position: absolute;
  left: 0;
  top: 0;
`;
export const Button = styled.span`
  width: ${props => (props.changeBackground ? props.btnWidth + 6 * 1 : props.btnWidth)}px;
  height: ${props => (props.changeBackground ? props.btnHeight + 6 * 1 : props.btnHeight)}px;
  border-radius: 50%;
  background: ${props => (props.disabled ? '#e8e8e8' : getStyled(props).background)};
  position: absolute;
  left: ${props => props.moveX}%;
  top: ${props => (props.changeBackground ? props.moveY - 3 : props.moveY)}px;
  transform: translateX(-50%);
`;
export const Tips = styled.span`
  text-align: center;
  position: absolute;
  left: 50%;
  top: -40px;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
`;
export const Tipinner = styled.span`
  display: block;
  min-width: 21px;
  height: 27px;
  line-height: 27px;
  padding: 0 3px;
  background: #666;
  color: #fff;
  border-radius: 3px;
`;
export const Tiparrow = styled.span`
  display: inline-block;
  vertical-align: top;
  border-top: 6px solid #666;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
`;
const getStyled = (props: CssTypeProps) => {
  const { changeBackground } = props;
  let { background } = props;
  const { hoverColor } = colorsFunc(background);
  background = changeBackground ? hoverColor : background;
  return {
    background,
  };
};
