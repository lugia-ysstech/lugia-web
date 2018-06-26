/**
 * by wangcuixia
 * @flow
 * **/

import changeColor from './utilsColor';

export default function colors(themeColor: string) {
  if (!themeColor) {
    themeColor = '#684fff';
  }
  return {
    normalColor: changeColor(themeColor).color,
    hoverColor: changeColor(themeColor, 20).color,
    mouseDownColor: changeColor(themeColor, 0, 20).color,
    disabledColor: changeColor(themeColor, 45).color,
    spiritColor: changeColor(themeColor, 0, 0, 5).rgba,
    disabledSpiritBackgroundColor: changeColor(themeColor, 0, 0, 1.5).rgba,
    disabledSpiritFontAndBorderColor: changeColor(themeColor, 0, 0, 30).rgba,
  };
}
