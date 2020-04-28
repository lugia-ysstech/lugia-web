import get from '../css/theme-common-dict';

const disableColor = '$lugia-dict.@lugia/lugia-web.disableColor';
const superLightColor = '$lugia-dict.@lugia/lugia-web.superLightColor';
const blackColor = get('blackColor');

export const trackBackground = superLightColor; //默认底层轨道的颜色
export const throughRangeBackground = disableColor; //底层轨道划过过程的颜色
export const trackDisabledBackground = disableColor; //轨道禁用的颜色
export const btnDisabledBackground = superLightColor; ////按钮禁用的颜色
export const tipBackground = blackColor; ////提示框背景色
export const tipColor = get('defaultColor'); ////提示框字体颜色
export const dotNormalColor = get('mediumGreyColor'); //Slider ,marks属性时节点文本未划过色
export const dotThroughColor = get('darkGreyColor'); //Slider ,marks属性时节点文本划过色
export const iconNormalColor = '#ccc';
export const iconChangeColor = '#999';
export const TipsArrowBorderColor = blackColor;

export const themeColor = '$lugia-dict.@lugia/lugia-web.themeColor';
export const themeHoverColor = '$lugia-dict.@lugia/lugia-web.themeHoverColor';
export const mediumGreyColor = '$lugia-dict.@lugia/lugia-web.mediumGreyColor';
export const disableTextColor = get('disableTextColor');
export const dangerColor = get('dangerColor');
export const lightGreyColor = get('lightGreyColor');
export const borderColor = get('borderColor');
