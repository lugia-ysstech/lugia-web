/**
 *
 * create by ligx
 *
 * @flow
 */
const footerFontSize = 10;

export function px2rem(px: number) {
  return px / footerFontSize;
}

export function rem2em(rem: number, emFontSize: number) {
  return rem / emFontSize;
}

export function px2emcss(emFontSize: number) {
  return (px: number) => `${px2rem(px) / emFontSize}em`;
}
