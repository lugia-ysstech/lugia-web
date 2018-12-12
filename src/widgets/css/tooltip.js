/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';

const { defaultColor, blackColor } = colorsFunc();

const em = px2emcss(1.2);
export type DirectionType =
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'bottom'
  | 'bottomRight'
  | 'bottomLeft';

export type TooltipProps = {
  placement: DirectionType,
  action: Array<string>,
  children: React.Node,
  title: React.Node,
  getTheme: Function,
  isPop?: boolean,
  visible?: boolean,
};
export const RadiusSize = em(4);
export const Left = 'left';
export const Right = 'right';
export const Down = 'bottom';
export const Up = 'top';

export const getFontColor = (props: TooltipProps) => {
  const { theme } = props;
  const { fontColor } = theme;
  return fontColor ? fontColor : blackColor;
};
export const getColor = (props: TooltipProps) => {
  const { theme } = props;
  const { color } = theme;
  return color ? color : defaultColor;
};

export const getTriggerByArrow = (props: TooltipProps) => {
  const { fx } = props;
  switch (fx) {
    case Up:
      return `padding-top: ${em(10)}`;
    case Down:
      return `padding-bottom: ${em(10)}`;
    case Left:
      return `padding-left: ${em(10)}`;
    case Right:
    default:
      return `padding-right: ${em(10)}`;
  }
};
export const getDeg = (props: TooltipProps) => {
  const { fx } = props;
  let angle = '';
  switch (fx) {
    case Up:
      angle = '45deg';
      break;
    case Down:
      angle = '225deg';
      break;
    case Left:
      angle = '315deg';
      break;
    case Right:
      angle = '135deg';
      break;
    default:
      break;
  }
  return angle;
};

export const getArrow = (props: Object) => {
  const { fx } = props;
  switch (fx) {
    case Up:
      return `
        left: ${em(10)};
        top: ${em(-5)};
        border-width: 0 ${em(5)} ${em(5)};
        border-bottom-color: ${getColor(props)};
      `;
    case Down:
      return `
        left: ${em(10)};
        bottom: ${em(-5)};
        border-width: ${em(5)} ${em(5)} 0;
        border-top-color: ${getColor(props)};
      `;
    case Left:
      return `
        top: ${em(10)};
        left: ${em(-5)};
        border-width: ${em(5)} ${em(5)} ${em(5)} 0;
        border-right-color: ${getColor(props)};
      `;
    case Right:
      return `
        top: ${em(10)};
        right: ${em(-5)};
        border-width: ${em(5)} 0 ${em(5)} ${em(5)};
        border-left-color: ${getColor(props)};
      `;
    default:
      return '';
  }
};
export const getNewArrow = (props: TooltipProps) => {
  const { placement } = props;
  const theBottom = `top: ${em(-4)};
        `;
  const theTop = `bottom: ${em(-4)};
        `;
  const theLeft = `right: ${em(-4)};
        `;
  const theRight = `left: ${em(-4)};`;
  switch (placement) {
    case 'bottomLeft':
      return `left: ${em(10)};${theBottom}; `;
    case 'bottom':
      return `left: 46%;${theBottom}; `;
    case 'bottomRight':
      return `right: ${em(10)};${theBottom}; `;
    case 'topLeft':
      return `left: ${em(10)};${theTop}; `;
    case 'top':
      return `left: 46%;${theTop}; `;
    case 'topRight':
      return `right: ${em(10)};${theTop}; `;
    case 'rightTop':
      return `top: ${em(10)};${theRight}; `;
    case 'right':
      return `  top: 46%;${theRight};`;
    case 'rightBottom':
      return `bottom: ${em(10)}; ${theRight};`;
    case 'leftTop':
      return `top: ${em(10)};${theLeft};`;
    case 'left':
      return ` top: 46%;${theLeft};`;
    case 'leftBottom':
      return ` bottom: ${em(10)}; ${theLeft};`;
    default:
      return '';
  }
};
