/**
 * Created by liguoxin on 16/2/5.
 */

const Keys = {
  BACKSPACE: 8,

  TAB: 9,

  NUM_CENTER: 12,

  ENTER: 13,

  RETURN: 13,

  SHIFT: 16,

  CTRL: 17,
  CONTROL: 17,

  ALT: 18,

  PAUSE: 19,

  CAPS_LOCK: 20,

  ESC: 27,

  SPACE: 32,

  PAGEUP: 33,

  PAGEDOWN: 34,

  END: 35,

  HOME: 36,

  LEFT: 37,

  UP: 38,

  RIGHT: 39,

  DOWN: 40,

  PRINT_SCREEN: 44,

  INSERT: 45,

  DELETE: 46,

  ZERO: 48,

  ONE: 49,

  TWO: 50,

  THREE: 51,

  FOUR: 52,

  FIVE: 53,

  SIX: 54,

  SEVEN: 55,

  EIGHT: 56,

  NINE: 57,

  A: 65,

  B: 66,

  C: 67,

  D: 68,

  E: 69,

  F: 70,

  G: 71,

  H: 72,

  I: 73,

  J: 74,

  K: 75,

  L: 76,

  M: 77,

  N: 78,

  O: 79,

  P: 80,

  Q: 81,

  R: 82,

  S: 83,

  T: 84,

  U: 85,

  V: 86,

  W: 87,

  X: 88,

  Y: 89,

  Z: 90,

  CONTEXT_MENU: 93,

  NUM_ZERO: 96,

  NUM_ONE: 97,

  NUM_TWO: 98,

  NUM_THREE: 99,

  NUM_FOUR: 100,

  NUM_FIVE: 101,

  NUM_SIX: 102,

  NUM_SEVEN: 103,

  NUM_EIGHT: 104,

  NUM_NINE: 105,

  NUM_MULTIPLY: 106,

  NUM_PLUS: 107,

  NUM_MINUS: 109,

  NUM_PERIOD: 110,

  NUM_DIVISION: 111,

  F1: 112,

  F2: 113,

  F3: 114,

  F4: 115,

  F5: 116,

  F6: 117,

  F7: 118,

  F8: 119,

  F9: 120,

  F10: 121,

  F11: 122,

  F12: 123,
  FengHao: 186,
  JiaHao: 187,
  DouHao: 188,
  JianHao: 189,
  JuHao: 190,
  XieGang: 191,
  BLH: 192,
  ZKH: 219,
  SX: 220,
  YKH: 221,
  DYH: 222,
};

const safariKeys = {
  3: 13,
  63234: 37,
  63235: 39,
  63232: 38,
  63233: 40,
  63276: 33,
  63277: 34,
  63272: 46,
  63273: 36,
  63275: 35,
};

export function isNavKeyPress(e) {
  const k = normalizeKey(e.keyCode);
  return (k >= 33 && k <= 40) || k == Keys.RETURN || k == Keys.TAB || k == Keys.ESC;
}

export function isSpecialKey(e) {
  const k = normalizeKey(e.keyCode);
  return (
    (e.type == 'keypress' && e.ctrlKey) ||
    isNavKeyPress(e) ||
    k == Keys.BACKSPACE ||
    (k >= 16 && k <= 20) ||
    (k >= 44 && k <= 46)
  );
}

function normalizeKey() {
  return true;
}

export function keyCode2String(keyCode, shift, spaceStatus) {
  if (keyCode > 0 && keyCode < 128) {
    return String.fromCharCode(keyCode);
  }

  switch (keyCode) {
    case Keys.FengHao:
      return shift ? ':' : ';';
    default:
      return '';
  }
}

export default Keys;
