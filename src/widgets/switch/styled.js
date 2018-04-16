/**
 *
 * create by ZhangBoPing
 *
 * create date: 2018/04/09
 *
 * @flow
 */
import '../css/sv.css';
import styled ,{keyframes,} from 'styled-components';

type SwitchSize = 'small' | 'default';

type CSSProps = {
  size: SwitchSize,
  isChecked: boolean,
  isDisabled: boolean,
  loading: boolean,
};

/* normal vars */
const _normalVars = {
  height: 22,
  minWidth: 44,
  fontSize: 12,
  activeBeforeWidth: 24,
  activeBeforeMarginLeft: -25,
  bgDisabledColor: 'rgba(0,0,0,.25)',
  switchDuration: '.36s',
  easeInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  textColor: 'rgba(0,0,0,.64)',
  switchColor: 'rgb(24, 144, 255)',
  checkedColor: 'rgb(24, 144, 255)',
  boxShadowColor: 'rgba(24, 144, 255, .2)',
  disabledOpacity: .4,
};

const _normalInnerVars = {
  marginLeft: 24,
  marginRight: 6,
  fontSize: 12,
};
/* small size vars */
const _smallVars = {
  height: 16,
  minWidth: 28,
  activeBeforeWidth: 16,
  activeBeforeMarginLeft: -16.5,
};

const _smallInnerVars = {
  marginLeft: 18,
  marginRight: 3,
  fontSize: 12,
};

/* animation */
const LoadingCircle = keyframes`
  0% {
    transform-origin: 50% 50%;
    transform: rotate(0deg);
  }
  100% {
    transform-origin: 50% 50%;
    transform: rotate(360deg);
  }
`;

const LoadingCircleSmall = keyframes`
  0% {
    transform-origin: 50% 50%;
    transform: rotate(0deg) scale(0.66667);
  }
  100% {
    transform-origin: 50% 50%;
    transform: rotate(360deg) scale(0.66667);
  }
`;

/* getStyled */
const getStyled = (props: CSSProps) => {
  const { size, isChecked, isDisabled,loading,} = props;
  let vars = _normalVars;
  let innerVars = _normalInnerVars;

  if(size === 'small'){
    vars = Object.assign({} , _normalVars, _smallVars);
    innerVars = Object.assign({} , _normalInnerVars, _smallInnerVars);
  }

  const style = `
    height: ${vars.height}px;
    min-width: ${vars.minWidth}px;
    line-height: ${vars.height - 2}px;
    &:after {
      width: ${vars.height - 4}px;
      height: ${vars.height - 4}px;
    }

    &:active:before,
    &:active:after {
      width: ${vars.activeBeforeWidth}px;
  }
  `;
  const innerStyle = `
    margin-left: ${isChecked? innerVars.marginRight: innerVars.marginLeft}px;
    margin-right: ${isChecked? innerVars.marginLeft: innerVars.marginRight}px;
  `;

  const checkedStyle = `
    background-color: ${isChecked? vars.checkedColor: vars.bgDisabledColor};
    &:before,
    &:after{
      left: ${isChecked? '100%': '1px'};
      margin-left: ${isChecked ? 
        size === 'small'? -(vars.height - 3) : -19 :
        ''}px;
    }

    &:active:before,
    &:active:after {
      margin-left: ${isChecked? vars.activeBeforeMarginLeft: ''}px;
    }
  `;

  const disabledStyle = `
    opacity: ${isDisabled? vars.disabledOpacity : ''};
    pointer-events: ${isDisabled? 'none' : ''};
  `;

  const loadingStyle = `
    opacity: ${loading? vars.disabledOpacity : ''};
    pointer-events: ${loading? 'none' : ''};
    &:before{
      animation: ${size === 'small'? LoadingCircleSmall: LoadingCircle} 1s infinite linear;
      display: ${loading? 'inline-block': 'none'};
      color: ${isChecked? vars.checkedColor: vars.textColor};
    }
  `;

  return {
    style,
    innerStyle,
    checkedStyle,
    disabledStyle,
    loadingStyle,
  };
};

/* style - wrapper */
export const SwitchWrapper = styled.span`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
  border-radius: 100px;
  border: 1px solid transparent;
  cursor: 'pointer';
  transition: all ${_normalVars.switchDuration};
  user-select: none;
  &:before,
  &:after {
    position: absolute;

    top: 1px;
    border-radius: 18px;
    background-color: #fff;
    content: " ";
    cursor: pointer;
    transition: all ${_normalVars.switchDuration} ${_normalVars.easeInOutCirc};
  }

  &:after {
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, .2);
  }

  &:before {
    content: "\\e818";
    font-family: "sviconfont" !important;
    text-align: center;
    background: transparent;
    z-index: 1;
    display: none;
    font-size: 12px;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${_normalVars.boxShadowColor};
    outline: 0;
  }

  &:focus:hover {
    box-shadow: none;
  }

  ${props => getStyled(props).style}
  ${props => getStyled(props).checkedStyle}
  ${props => getStyled(props).disabledStyle}
  ${props => getStyled(props).loadingStyle}
`;

/* style - inner */
export const SwitchInner = styled.span`
  color: #fff;
  font-size: ${_normalVars.fontSize}px;
  display: block;

  ${props => getStyled(props).innerStyle}
`;
