import { px2emcss } from './units';
import { FontSizeNumber } from '../css';
import colorsFunc from './stateColor';
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
  return character;
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

export const getAnimation = (props: Object) => {
  const { type } = props;
  return type === 'default' ? '' : 'opacity 0.3s;';
};
