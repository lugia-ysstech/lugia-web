/**
 * 标签CSS
 * create by szfeng
 *
 * @flow
 */
import styled from 'styled-components';
import '../css/sv.css';
import colorsFunc from '../css/stateColor';
import { FontSizeNumber, FontSize } from '../css';
import { px2emcss } from '../css/units';

const em = px2emcss(FontSizeNumber);

const { themeColor, defaultColor, lightGreyColor, darkGreyColor, disableColor } = colorsFunc();

const getCursor = props => {
  const { disabled } = props;
  return `cursor: ${disabled ? 'not-allowed' : 'pointer'}`;
};

export const CheckInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  outline: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  opacity: 0;
  ${getCursor};
`;

const getWidth = props => {
  const { Theme } = props;
  const { width } = Theme;
  return width ? `${em(width)}` : `${em(92)}`;
};

const getThemeColorState = (color: string, attrValue: string) => {
  return color ? colorsFunc(color)[attrValue] : colorsFunc(themeColor)[attrValue];
};

const getCheckedCSS = (
  checked: boolean,
  attribute: string,
  checkedAttributeValue: string,
  defaultAttributeValue: string
) => {
  return `${attribute} : ${checked ? checkedAttributeValue : defaultAttributeValue}`;
};

const getHoverAndActiveCSS = (attribute: string, hoverColor: string, mouseDownColor: string) => {
  return `
        &:hover {
          ${attribute}: ${hoverColor}
        }
        &:active {
          ${attribute}: ${mouseDownColor}
        }
      `;
};

const getChildSpanHoverCSS = (attribute: string, hoverColor: string, mouseDownColor: string) => {
  return `
  &:hover > span {
    ${attribute}: ${hoverColor};
  }
  &:active > span {
    ${attribute}: ${mouseDownColor};
  }
  `;
};

const getCheckedAndHoverCSS = (
  color: string,
  checked: boolean,
  attribute: string,
  defaultAttrValue: string
) => {
  const targetColor = color || themeColor;
  const { hoverColor, mouseDownColor } = colorsFunc(targetColor);

  return `${getCheckedCSS(checked, attribute, hoverColor, defaultAttrValue)};
          ${getHoverAndActiveCSS(attribute, hoverColor, mouseDownColor)}`;
};

const isPrimaryCSS = (
  type: string,
  attribute: string,
  primaryAttrValue: string,
  defaultAttrValue
) => {
  return `${attribute} : ${type === 'primary' ? primaryAttrValue : defaultAttrValue}`;
};

const isPrimaryOrHoverOrCheckedCSS = (
  type: string,
  primaryValue: string | Function,
  notPrimaryValue: string | Function
) => {
  return type === 'primary' ? primaryValue : notPrimaryValue;
};

const CommonContainer = styled.div`
  width: ${getWidth};
  font-size: ${FontSize};
  display: inline-block;
  overflow: hidden;
  position: relative;
`;

const CommonWrap = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  overflow: hidden;
`;

const getSeparatorBorderHoverCSS = props => {
  const { type, disabled, Theme } = props;
  if (disabled) {
    return;
  }
  const { color } = Theme;
  const targetColor = color || themeColor;
  const { hoverColor, mouseDownColor } = colorsFunc(targetColor);
  const primaryAttrValue = getChildSpanHoverCSS('border-color', hoverColor, mouseDownColor);
  return isPrimaryOrHoverOrCheckedCSS(type, primaryAttrValue, '');
};

const DefaultContainer = styled(CommonContainer)`
  height: ${em(32)};
  line-height: ${em(32)};
  border-radius: ${em(4)};
  transition: all 0.3s;
  ${getSeparatorBorderHoverCSS};
  ${props =>
    (props.disabled
      ? ''
      : `&:hover > span {
    height: ${em(32)};
  }`)};
`;

const getDisabledCSS = props => {
  const { Theme } = props;
  const { color } = Theme;
  const disabledColor = getThemeColorState(color, 'disabledColor');
  return `
  ${isPrimaryCSS(props.type, 'color', lightGreyColor, defaultColor)};
  ${isPrimaryCSS(props.type, 'background', defaultColor, disabledColor)};
  ${isPrimaryCSS(props.type, 'border-color', disableColor, disabledColor)};
  `;
};

const HoverBackgroundAndBorderAndTextColor = props => {
  const { type, checked, disabled, Theme } = props;
  if (disabled) {
    return getDisabledCSS(props);
  }
  const { color } = Theme;
  const targetColor = color || themeColor;
  const { hoverColor, mouseDownColor } = colorsFunc(targetColor);
  const primaryAttrValue = `
    background: ${defaultColor};
    ${getCheckedAndHoverCSS(color, checked, 'border-color', lightGreyColor)};
    ${getChildSpanHoverCSS('border-color', hoverColor, mouseDownColor)};
    ${getCheckedAndHoverCSS(color, checked, 'color', darkGreyColor)};
      `;
  const notPrimaryAttrValue = `
      ${getCheckedAndHoverCSS(color, checked, 'border-color', targetColor)};
      ${getCheckedAndHoverCSS(color, checked, 'background', targetColor)};
      color: ${defaultColor}`;
  return isPrimaryOrHoverOrCheckedCSS(type, primaryAttrValue, notPrimaryAttrValue);
};

export const NoDividedContainer = styled(DefaultContainer)`
  border-width: ${em(1)};
  border-style: solid;
  ${HoverBackgroundAndBorderAndTextColor};
`;
NoDividedContainer.displayName = 'NoDividedContainer';

export const NoDividedWrap = styled(CommonWrap)`
  padding: 0 ${em(4)};
`;

export const NoDividedIconWrap = styled.span`
  display: inline-block;
  padding-left: ${em(6)};
  padding-top: ${em(2)};
  height: ${em(30)};
  vertical-align: top;
`;

const getDefaultBorder = props => {
  return `
  ${isPrimaryCSS(props.type, 'border', `1px solid ${lightGreyColor}`, '0')};

  `;
};

export const TextContainer = styled.span`
  display: inline-block;
  flex: 1;
  font-size: ${em(14)};
  height: 100%;
  border-top-left-radius: ${em(4)};
  border-bottom-left-radius: ${em(4)};
`;

export const DividedContainer = styled(DefaultContainer)`
  color: ${defaultColor};
`;

export const DividedWrap = styled(CommonWrap)`
  display: flex;
  position: relative;
`;

export const DevidedTextContainer = styled(TextContainer)`
  transition: all 0.3s;
  ${getDefaultBorder};
  border-right: 0;
  ${HoverBackgroundAndBorderAndTextColor};
`;
DevidedTextContainer.displayName = 'DevidedTextContainer';

export const BasicContainer = styled(CommonContainer)`
  height: ${em(22)};
  line-height: ${em(22)};
  padding: 0 ${em(4)};
`;

const getBasicTextHoverColor = props => {
  const { Theme, disabled, checked } = props;
  if (disabled) {
    return `color: ${lightGreyColor};`;
  }
  const { color } = Theme;
  const targetColor = color || themeColor;
  const { hoverColor, mouseDownColor } = colorsFunc(targetColor);
  return `${getChildSpanHoverCSS('color', hoverColor, mouseDownColor)};
  ${getCheckedCSS(checked, 'color', hoverColor, darkGreyColor)};
  `;
};
export const BasicWrap = styled(CommonWrap)`
  position: relative;
  ${getBasicTextHoverColor};
`;
BasicWrap.displayName = 'BasicWrap';

export const BasicTextContainer = styled.span`
  width: 100%;
`;

export const BasicText = styled.span`
  height: ${em(22)};
  font-size: ${em(14)};
  transition: all 0.3s;
`;

export const BasicIconWrap = styled(NoDividedIconWrap)`
  transition: all 0.3s;
`;

export const PullContainer = styled.span`
  display: inline-block;
  padding: ${em(2)} ${em(6)} 0;
  width: ${em(24)};
  height: ${em(32)};
  position: relative;
  border-top-right-radius: ${em(4)};
  border-bottom-right-radius: ${em(4)};
  transition: all 0.3s;
  ${getDefaultBorder};
  border-left: 0;
  ${HoverBackgroundAndBorderAndTextColor};
`;
PullContainer.displayName = 'DropMenuPullButton';

const getSeparatorBorderCheckedCSS = props => {
  const { type, iconChecked, buttonChecked, Theme, disabled } = props;
  if (disabled) {
    return `border-color: ${disableColor}`;
  }
  const checked = iconChecked || buttonChecked;

  const { color } = Theme;
  const targetColor = color || themeColor;
  const { hoverColor } = colorsFunc(targetColor);

  const primaryAttrValue = `
    ${getCheckedCSS(checked, 'border-color', hoverColor, lightGreyColor)};
    ${getCheckedCSS(checked, 'height', em(32), em(18))};
      `;
  const notPrimaryAttrValue = 'none';
  // const notPrimaryAttrValue = `${getCheckedCSS(checked, 'height', em(32), em(18))};`;
  return isPrimaryOrHoverOrCheckedCSS(type, primaryAttrValue, notPrimaryAttrValue);
};

const getSeparatorBorderColor = props => {
  return isPrimaryCSS(props.type, 'border-color', lightGreyColor, defaultColor);
};
export const SeparatorBorder = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: ${em(24)};
  height: ${em(18)};
  border-left: 1px solid ${lightGreyColor};
  z-index: 2;
  transition: all 0.3s;
  ${getSeparatorBorderColor};
  ${getSeparatorBorderCheckedCSS};
`;
