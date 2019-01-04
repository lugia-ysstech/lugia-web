/*
 * by wangcuixia
 * */
import styled from 'styled-components';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';
import Icon from '../icon';
const em = px2emcss(1.2);
const { themeColor, successColor, dangerColor } = colorsFunc();
const { disabledColor } = colorsFunc(themeColor);
type CssProps = {
  size?: string,
  isMouseDown?: boolean,
  value?: boolean,
};

const normalSize = {
  width: 38,
  height: 20,
};

const smallSize = {
  width: 30,
  height: 16,
};

const normallCircleSize = {
  width: 14,
  height: 14,
};

const smallCircleSize = {
  width: 12,
  height: 12,
};

const togglesize = {
  width: 18,
};
const getSwitchWrapper = (props, size) => {
  const { height, width } = getStyled(props)[size];
  const heightEm = em(height);
  return `
    width: ${em(width)};
    height: ${heightEm};
    line-height: ${heightEm};
`;
};

export const SwitchWrapper = styled.span`
  font-size: ${em(12)};
  box-sizing: border-box;
  display: inline-block;
  ${props => getSwitchWrapper(props, 'switchWrapperSize')}  
  border-radius: ${em(20)};
  background: ${props =>
    (props.loading
      ? `${disabledColor}`
      : props.disabled
      ? `${disabledColor}`
      : props.value
      ? props.isInverse
        ? `${successColor}`
        : `${themeColor}`
      : props.isInverse
      ? `${dangerColor}`
      : props.isInverse !== undefined
      ? `${themeColor}`
      : '#ccc')};
  position: relative;
  text-align: ${props => (props.value ? 'left' : 'right')};
  padding: 0 ${em(4)};  
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  vertical-align: middle;
  &:focus {
    outline: none;
  }
`;

export const SwitchCircle = styled.span`
  ${props => getSwitchWrapper(props, 'circleSize')}  
  border-radius: ${props => (props.isMouseDown ? `${em(7)}` : '50%')};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
  background: #fff;
  position: absolute;
  ${props => getStyled(props).position};
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transition: 1s;
  -webkit-transition: all 0.2s;
`;

const getStyled = (props: CssProps) => {
  const { size, isMouseDown, value } = props;
  const normallPosition = (normalSize.height - normallCircleSize.height) / 2;
  const smallPosition = (smallSize.height - smallCircleSize.height) / 2;
  let distance = normallPosition;
  let switchWrapperSize = normalSize;
  let circleSize = normallCircleSize;
  if (size == 'small') {
    switchWrapperSize = smallSize;
    circleSize = smallCircleSize;
    distance = smallPosition;
  }
  distance = em(distance);
  const position = `
    ${value ? `right: ${distance};` : `left:${distance};`}
  `;
  if (isMouseDown) {
    circleSize = Object.assign({}, circleSize, togglesize);
  }
  return {
    position,
    switchWrapperSize,
    circleSize,
  };
};

const getKeyframes = () => {
  return `animation: rotate 1s linear infinite;
@keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}`;
};

export const LoadingIcon: Object = styled(Icon)`
  position: absolute;
  user-select: none;
  text-align: center;
  font-size: 1.2rem;
  color: ${disabledColor};
  border-radius: 50%;
  left: ${em(1)};
  top: ${em(1)};
  ${getKeyframes};
`;
