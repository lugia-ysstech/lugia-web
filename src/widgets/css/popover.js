/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';
import { DirectionType } from '../css/tooltip';
const { mediumGreyColor } = colorsFunc();

const em = px2emcss(1.2);

export type PopoverProps = {
  description: React.Node,
  title: React.Node,
  content?: React.Node,
  operation: React.Node,
  getTheme?: Function,
  arrowPosition: DirectionType,
  action: 'hover' | 'click' | 'focus',
  children: React.Node,
  visible?: boolean,
  defaultVisible: boolean,
  clear?: React.Node,
  onClearClick?: Function,
};
export type PopoverState = {
  visible: boolean,
};

export const getIconColor = (props: TooltipProps) => {
  const { theme } = props;
  const { fontColor } = theme;
  return fontColor ? fontColor : mediumGreyColor;
};
