import styled from 'styled-components';

/* style vars */
const _stypeVars = {
  height: 22,
  bgDisabledColor: 'rgba(0,0,0,.25)',
  switchDuration: '.36s',
  fontSizeSm: 12,
  easeInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  textColor: 'rgba(0,0,0,.64)',
  switchColor: 'rgb(24, 144, 255)',
  checkedColor: 'rgb(24, 144, 255)',
  boxShadowColor: 'rgba(24, 144, 255, .2)',
  disabledOpacity: .4,
  
};

/* style - wrapper */
export const SwitchWrapper = styled.span`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: ${_stypeVars.height}px;
  min-width: 44px;
  line-height: ${_stypeVars.height - 2}px;
  vertical-align: middle;
  border-radius: 100px;
  border: 1px solid transparent;
  background-color: ${props => {
    return props.isChecked? _stypeVars.checkedColor: _stypeVars.bgDisabledColor;
  }};
  opacity: ${props => {
    return props.isDisabled? _stypeVars.disabledOpacity : '';
  }};
  cursor: 'pointer';
  pointer-events: ${props => {
    return props.isDisabled? 'none' : '';
  }};
  transition: all ${_stypeVars.switchDuration};
  user-select: none;
  &:before,
  &:after {
    position: absolute;
    width: ${_stypeVars.height - 4}px;
    height: ${_stypeVars.height - 4}px;
    left: ${props => {
      return props.isChecked? '100%': '1px';
    }};
    margin-left: ${props => {
      if(props.isChecked) return '-19px';
    }};
    top: 1px;
    border-radius: 18px;
    background-color: #fff;
    content: " ";
    cursor: pointer;
    transition: all ${_stypeVars.switchDuration} ${_stypeVars.easeInOutCirc};
  }

  &:active:before,
  &:active:after {
    width: 24px;
    margin-left: ${props => {
      if(props.isChecked) return '-25px';
    }};
  }

  &:after {
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, .2);
  }

  &:before {
    content: "\e64d";
    font-family: anticon;
    animation: loadingCircle 1s infinite linear;
    text-align: center;
    background: transparent;
    z-index: 1;
    display: none;
    font-size: 12px;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${_stypeVars.boxShadowColor};
    outline: 0;
  }

  &:focus:hover {
    box-shadow: none;
  }
`;

/* stype - inner */
export const SwitchInner = styled.span`
  color: #fff;
  font-size: ${_stypeVars.fontSizeSm}px;
  margin-left: ${props => {
    return props.isChecked? 6: 24;
  }}px;
  margin-right: ${props => {
    return props.isChecked? 24: 6;
  }}px;
  display: block;
`;
