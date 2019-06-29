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
};

export type TooltipState = {
  visible: boolean,
};
export const Left = 'left';
export const Right = 'right';
export const Down = 'bottom';
export const Up = 'top';
