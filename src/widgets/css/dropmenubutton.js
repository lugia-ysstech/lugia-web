/**
 * 标签CSS
 * create by szfeng
 *
 * @flow
 */
import styled from 'styled-components';
import '../css/sv.css';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';

const em = px2emcss(1.2);

const { themeColor, defaultColor, lightGreyColor, darkGreyColor } = colorsFunc();

/**
 * 控制是否选中的开关 Button
 */
export const CheckInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  outline: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

/**
 * type: basic 、primary 、customs
 * 所有的公用方法
 */

const getWidth = props => {
  const { Theme } = props;
  const { width } = Theme;
  return width ? `${em(width)}` : `${em(92)}`;
};

const hoverColor = colorsFunc(themeColor).hoverColor;
const mouseDownColor = colorsFunc(themeColor).mouseDownColor;

const getCheckedCSS = (
  checked: boolean,
  attribute: string,
  checkedAttributeValue: string,
  defaultAttributeValue: string
) => {
  return `${attribute} : ${checked ? checkedAttributeValue : defaultAttributeValue}`;
};

const getHoverAndActiveCSS = (attribute: string) => {
  return `
        &:hover {
          ${attribute}: ${hoverColor}
        }
        &:active {
          ${attribute}: ${mouseDownColor}
        }
      `;
};

const getChildSpanHoverCSS = (attribute: string) => {
  return `
  &:hover > span {
    ${attribute}: ${hoverColor};
  }
  &:active > span {
    ${attribute}: ${mouseDownColor};
  }
  `;
};

const getCheckedAndHoverCSS = (checked: boolean, attribute: string, defaultAttrValue: string) => {
  return `${getCheckedCSS(checked, attribute, hoverColor, defaultAttrValue)};
          ${getHoverAndActiveCSS(attribute)}`;
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

/**
 * type: basic 、primary 、customs
 * 所有的公用Container和Wrap
 */

const CommonContainer = styled.div`
  width: ${getWidth};
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
  position: relative;
`;

const CommonWrap = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  overflow: hidden;
`;

/**
 * type: primary 、customs
 * 公用的container；
 */

const getSeparatorBorderHoverCSS = props => {
  const { type } = props;
  const primaryAttrValue = getChildSpanHoverCSS('border-color');
  return isPrimaryOrHoverOrCheckedCSS(type, primaryAttrValue, '');
};

const DefaultContainer = styled(CommonContainer)`
  height: ${em(32)};
  line-height: ${em(32)};
  border-radius: ${em(4)};
  transition: all 0.3s;
  ${getSeparatorBorderHoverCSS};
  &:hover > span {
    height: ${em(32)};
  }
`;

/**
 * type: primary 、customs
 *  divieded = false 没有分割线时的组件样式
 */

const NoDividedBackgroundAndBorderAndTextColor = props => {
  const { type, checked } = props;
  const primaryAttrValue = `background: ${defaultColor};
    ${getCheckedAndHoverCSS(checked, 'border-color', lightGreyColor)};
    ${getCheckedAndHoverCSS(checked, 'color', darkGreyColor)}
  `;
  const notPrimaryValue = `
  ${getCheckedAndHoverCSS(checked, 'border-color', themeColor)};
  ${getCheckedAndHoverCSS(checked, 'background', themeColor)};
  color: #fff`;
  return isPrimaryOrHoverOrCheckedCSS(type, primaryAttrValue, notPrimaryValue);
};

export const NoDividedContainer = styled(DefaultContainer)`
  border-width: ${em(1)};
  border-style: solid;
  ${NoDividedBackgroundAndBorderAndTextColor};
`;
NoDividedContainer.displayName = 'NoDividedContainer';

export const NoDividedWrap = styled(CommonWrap)`
  padding: 0 ${em(8)};
`;

export const NoDividedIconWrap = styled.span`
  display: inline-block;
  padding-left: ${em(6)};
  padding-top: ${em(2)};
  height: ${em(30)};
  vertical-align: top;
`;

const HoverBackgroundOrBorder = props => {
  const { type, checked } = props;
  const primaryAttrValue = `
    ${getCheckedAndHoverCSS(checked, 'border-color', lightGreyColor)};
    ${getChildSpanHoverCSS('border-color')};
    ${getCheckedAndHoverCSS(checked, 'color', darkGreyColor)};
      `;
  const notPrimaryAttrValue = getCheckedAndHoverCSS(checked, 'background', themeColor);
  return isPrimaryOrHoverOrCheckedCSS(type, primaryAttrValue, notPrimaryAttrValue);
};

const getDefaultBorder = props => {
  return isPrimaryCSS(props.type, 'border', `1px solid ${lightGreyColor}`, '0');
};

export const TextContainer = styled.span`
  display: inline-block;
  flex: 1;
  font-size: ${em(14)};
  height: 100%;
  border-top-left-radius: ${em(4)};
  border-bottom-left-radius: ${em(4)};
  ${getDefaultBorder};
`;

/**
 * type: primary 、customs
 *  divieded = true 有分割线时的组件样式
 */

const DividedContainerBackgroundColor = props => {
  return isPrimaryCSS(props.type, 'background', defaultColor, themeColor);
};

const DividedTextColor = props => {
  return isPrimaryCSS(props.type, 'color', darkGreyColor, defaultColor);
};

export const DividedContainer = styled(DefaultContainer)`
  ${DividedTextColor};
  ${DividedContainerBackgroundColor};
`;

export const DividedWrap = styled(CommonWrap)`
  display: flex;
  position: relative;
`;

export const DevidedTextContainer = styled(TextContainer)`
  transition: all 0.3s;
  border-right: 0;
  ${HoverBackgroundOrBorder};
`;
DevidedTextContainer.displayName = 'DevidedTextContainer';

/**
 * type: Basic
 *  没有任何边框和背景色的样式
 */

export const BasicContainer = styled(CommonContainer)`
  height: ${em(22)};
  line-height: ${em(22)};
  padding: 0 ${em(8)};
`;

export const BasicWrap = styled(CommonWrap)`
  position: relative;
  ${getChildSpanHoverCSS('color')};
`;
BasicWrap.displayName = 'BasicWrap';

const getBasicTextColor = props => {
  const { checked } = props;
  return getCheckedCSS(checked, 'color', hoverColor, darkGreyColor);
};

export const BasicTextContainer = styled.span`
  width: 100%;
  ${getBasicTextColor};
`;

export const BasicText = styled.span`
  height: ${em(22)};
  font-size: ${em(14)};
  transition: all 0.3s;
`;

export const BasicIconWrap = styled(NoDividedIconWrap)`
  transition: all 0.3s;
`;

/**
 * type: primary 、customs
 *  divieded = true 有分割线时
 *  分割线右边的 下拉盒子样式
 */

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
  ${HoverBackgroundOrBorder};
`;
PullContainer.displayName = 'DropMenuPullButton';

const getSeparatorBorderCheckedCSS = props => {
  const { type, iconChecked, buttonChecked } = props;
  const checked = iconChecked || buttonChecked;

  const primaryAttrValue = `
    ${getCheckedCSS(checked, 'border-color', hoverColor, lightGreyColor)};
    ${getCheckedCSS(checked, 'height', em(32), em(18))};
      `;
  const notPrimaryAttrValue = 'none';
  // const notPrimaryAttrValue = `${getCheckedCSS(checked, 'height', em(32), em(18))};`;
  return isPrimaryOrHoverOrCheckedCSS(type, primaryAttrValue, notPrimaryAttrValue);
};

/**
 * type: primary 、customs
 *  divieded = true 分割线的样式
 */

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
