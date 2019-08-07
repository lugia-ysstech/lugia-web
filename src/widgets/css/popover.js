/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import type { DirectionType } from '../css/tooltip';

export type PopoverProps = {
  description: React.Node,
  title: React.Node,
  content?: React.Node,
  getTheme: Function,
  placement: DirectionType,
  action: Array<string>,
  children: React.Node,
  visible: boolean,
  defaultVisible?: boolean,
  onVisibleChange: Function,
  clearIcon?: React.Node,
  onClearClick?: Function,
  showClearButton?: boolean,
  defaultChildren: React.Node,
  getPartOfThemeProps: Function,
  getPartOfThemeHocProps: Function,
};
export type PopoverState = {
  visible: boolean,
};
