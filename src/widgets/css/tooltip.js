import get from './theme-common-dict';
import { units } from '@lugia/css';
const { px2remcss } = units;

export type ToolTipSize = 'small' | 'default' | 'large';
export type PopArrowType = 'sharp' | 'round';
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
  content: React.Node,
  description: React.Node,
  getTheme: Function,
  onVisibleChange: Function,
  size: ToolTipSize,
  popArrowType?: PopArrowType,
  visible: boolean,
  defaultVisible?: boolean,
  defaultChildren: React.Node,
  themeProps: Object,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
  createPortal: boolean,
  popupPosition: string,
};

export type TooltipState = {
  visible: boolean,
};
export const Left = 'left';
export const Right = 'right';
export const Down = 'bottom';
export const Up = 'top';

const defaultPosition = `${px2remcss(-3)};`;
const leftOrRight = `${px2remcss(10)};`;
const topOrBottom = `${px2remcss(5)};`;
const centerPosition = 'calc(50% - 5px)';

const theTopPositionCSS = `top: ${defaultPosition};`;
const theBottomPositionCSS = `bottom:${defaultPosition};`;
const theLeftPositionCSS = `left: ${defaultPosition};`;
const theRightPositionCSS = `right: ${defaultPosition};`;
const theCenterLeftPositionCSS = `left: ${centerPosition};`;
const theCenterTopPositionCSS = `top: ${centerPosition};`;

const theLeftCSS = `left: ${leftOrRight};`;
const theRightCSS = `right: ${leftOrRight};`;
const theTopCSS = `top: ${topOrBottom};`;
const theBottomCSS = `bottom: ${topOrBottom};`;

export function getRoundArrowCSS(themeMeta, themeProps) {
  const { background = {} } = themeMeta;
  const { propsConfig } = themeProps;
  const bgColor = background && background.color ? background.color : get('blackColor');

  const { direction = Up, placement } = propsConfig;

  let angle = '';
  switch (direction) {
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

  let arrowDirectionCSS = '';
  switch (placement) {
    case 'bottomLeft':
      arrowDirectionCSS = `${theLeftCSS};${theTopPositionCSS};`;
      break;
    case 'bottom':
      arrowDirectionCSS = `${theCenterLeftPositionCSS};${theTopPositionCSS}; `;
      break;
    case 'bottomRight':
      arrowDirectionCSS = `${theRightCSS};${theTopPositionCSS};`;
      break;
    case 'topLeft':
      arrowDirectionCSS = `${theLeftCSS};${theBottomPositionCSS};`;
      break;
    case 'top':
      arrowDirectionCSS = `${theCenterLeftPositionCSS};${theBottomPositionCSS};`;
      break;
    case 'topRight':
      arrowDirectionCSS = `${theRightCSS};${theBottomPositionCSS};`;
      break;
    case 'rightTop':
      arrowDirectionCSS = `${theTopCSS};${theLeftPositionCSS};`;
      break;
    case 'right':
      arrowDirectionCSS = `${theCenterTopPositionCSS};${theLeftPositionCSS};`;
      break;
    case 'rightBottom':
      arrowDirectionCSS = `${theBottomCSS}; ${theLeftPositionCSS};`;
      break;
    case 'leftTop':
      arrowDirectionCSS = `${theTopCSS};${theRightPositionCSS};`;
      break;
    case 'left':
      arrowDirectionCSS = `${theCenterTopPositionCSS};${theRightPositionCSS};`;
      break;
    case 'leftBottom':
      arrowDirectionCSS = `${theBottomCSS}; ${theRightPositionCSS};`;
      break;
    default:
      arrowDirectionCSS = '';
      break;
  }
  return `border-color: ${bgColor} transparent transparent ${bgColor};transform: rotateZ(${angle}); ${arrowDirectionCSS};`;
}
export function getArrowCSS(themeMeta, themeProps) {
  const { propsConfig: { placement } = {} } = themeProps;
  const { background = {} } = themeMeta;

  const bgColor = background && background.color ? background.color : get('blackColor');
  let arrowDirectionCSS = '';

  const borderTopCSS = `border-top-color: ${bgColor};
   border-width: ${px2remcss(5)} ${px2remcss(5)} 0;`;
  const borderBottomCSS = `border-bottom-color: ${bgColor};
  border-width: 0 ${px2remcss(5)} ${px2remcss(5)};`;
  const borderRightCSS = `border-left-color: ${bgColor};
  border-width: ${px2remcss(5)} 0 ${px2remcss(5)} ${px2remcss(5)} `;
  const borderLeftCSS = `border-right-color: ${bgColor};
  border-width: ${px2remcss(5)} ${px2remcss(5)} ${px2remcss(5)} 0 `;
  switch (placement) {
    case 'bottomLeft':
      arrowDirectionCSS = `${theLeftCSS};${theTopPositionCSS}; ${borderBottomCSS}`;
      break;
    case 'bottom':
      arrowDirectionCSS = `${theCenterLeftPositionCSS};${theTopPositionCSS};${borderBottomCSS} `;
      break;
    case 'bottomRight':
      arrowDirectionCSS = `${theRightCSS};${theTopPositionCSS};${borderBottomCSS}`;
      break;
    case 'topLeft':
      arrowDirectionCSS = `${theLeftCSS};${theBottomPositionCSS}; ${borderTopCSS};`;
      break;
    case 'top':
      arrowDirectionCSS = `${theCenterLeftPositionCSS};${theBottomPositionCSS};${borderTopCSS};`;
      break;
    case 'topRight':
      arrowDirectionCSS = `${theRightCSS};${theBottomPositionCSS};${borderTopCSS};`;
      break;
    case 'rightTop':
      arrowDirectionCSS = `${theTopCSS};${theLeftPositionCSS};${borderLeftCSS};`;
      break;
    case 'right':
      arrowDirectionCSS = `${theCenterTopPositionCSS};${theLeftPositionCSS};${borderLeftCSS};`;
      break;
    case 'rightBottom':
      arrowDirectionCSS = `${theBottomCSS}; ${theLeftPositionCSS};${borderLeftCSS};`;
      break;
    case 'leftTop':
      arrowDirectionCSS = `${theTopCSS};${theRightPositionCSS};${borderRightCSS};`;
      break;
    case 'left':
      arrowDirectionCSS = `${theCenterTopPositionCSS};${theRightPositionCSS};${borderRightCSS};`;
      break;
    case 'leftBottom':
      arrowDirectionCSS = `${theBottomCSS}; ${theRightPositionCSS};${borderRightCSS};`;
      break;
    default:
      arrowDirectionCSS = 'background:transparent';
      break;
  }
  return `${arrowDirectionCSS}`;
}
