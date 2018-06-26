/**
 * by wangcuixia
 * @flow
 * **/

import changeColor from './utilsColor';

type StateColor = {
  normalColor: string,
  hoverColor: string,
  mouseDownColor: string,
  disabledColor: string,
  spiritColor: string,
  disabledSpiritBackgroundColor: string,
  disabledSpiritFontAndBorderColor: string,
};

export function colorsFactory(changeColor: Function) {
  const func = (themeColor: string): StateColor => {
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
  };
  func.__changeColor__ = changeColor;
  return func;
}

const colorsFunc = colorsFactory(changeColor);
export default colorsFunc;
