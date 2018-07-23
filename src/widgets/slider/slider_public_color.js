import colorsFunc from '../css/stateColor';
const { themeColor } = colorsFunc();
const { hoverColor } = colorsFunc(themeColor);
export const trackBackground = '#e8e8e8'; //默认底层轨道的颜色
export const doneBackground = themeColor; //轨道划过完成的颜色
export const doingBackground = hoverColor; //轨道划过过程的颜色
export const throughRangeBackground = '#f2f2f2'; //底层轨道划过过程的颜色
export const trackDisabledBackground = '#f2f2f2'; //轨道禁用的颜色
export const btnDisabledBackground = '#e8e8e8'; ////按钮禁用的颜色
export const tipBackground = '#333333'; ////提示框背景色
export const tipColor = '#ffffff'; ////提示框字体颜色
