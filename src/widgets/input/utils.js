import { ObjectUtils } from '@lugia/type-utils';
import { units } from '@lugia/css';
const { px2remcss } = units;

export const checkIsPercent = width => {
  return width && typeof width === 'string' && width.indexOf('%') !== -1;
};
export const getWidthCSS = width => {
  const theWidth = ObjectUtils.isNumber(width)
    ? px2remcss(width)
    : checkIsPercent(width)
    ? width
    : '100%';
  return `width: ${theWidth};`;
};
