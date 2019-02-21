/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';
import type { DirectionType } from '../css/tooltip';
const { mediumGreyColor } = colorsFunc();

export type PopoverProps = {
  description: React.Node,
  title: React.Node,
  content?: React.Node,
  getTheme: Function,
  placement: DirectionType,
  action: Array<string>,
  children: React.Node,
  visible: boolean,
  defaultVisible: boolean,
  onVisibleChange: Function,
  clear?: React.Node,
  onClearClick?: Function,
};
export type PopoverState = {
  visible: boolean,
};

export const getIconColor = (props: Object) => {
  const { theme } = props;
  const { fontColor } = theme;
  return fontColor ? fontColor : mediumGreyColor;
};
