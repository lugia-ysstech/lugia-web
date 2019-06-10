import { px2emcss } from './units';
import { FontSizeNumber } from '../css';
import colorsFunc from './stateColor';
import { css, keyframes } from 'styled-components';
// import { css, keyframes } from '../theme/CSSProvider';
const em = px2emcss(FontSizeNumber);

const { warningColor, dangerColor } = colorsFunc();

export const getFontSize = (props: Object) => {
  const {
    theme: { fontSize },
  } = props;
  return fontSize ? em(fontSize) : em(18);
};

export const getCharacter = (props: Object) => {
  const { character } = props;
  return `'${character}'`;
};

const defaultColor = {
  primary: `${warningColor}`,
  default: '#e8e8e8',
  danger: `${dangerColor}`,
  amazed: '#f88e30',
  half: `${warningColor}`,
};
export const getColor = (props: Object) => {
  const { type } = props;
  return props.theme[type] || defaultColor[type];
};
