/**
 * create by liangguodong on 2018/8/24
 *
 * @flow
 */
import colorsFunc from '../css/stateColor';
import { px2emcss } from './units';
const FontSize = 1.2;
const em = px2emcss(FontSize);
const { borderDisableColor } = colorsFunc();

export type DividerType = 'horizontal' | 'vertical';
export type DividerPosition = 'left' | 'right';
export type DividerProps = {
  viewClass: string,
  dashed: boolean,
  position?: DividerPosition,
  type: DividerType,
  content?: string,
  getTheme: Function,
};

export const getPositionCSS = ([left, right]: DividerPosition[]) => (props: DividerProps) => {
  const { position, content } = props;
  if (content !== undefined && content !== null) {
    return `width:${position === left ? '95%' : position === right ? '5%' : '50%'}`;
  }
  return 'width :100%';
};
export const getColor = () => {
  return borderDisableColor;
};
export const getDashed = (props: DividerProps) => {
  const { dashed } = props;
  return `${dashed ? 'dashed' : 'solid'}`;
};
export const getWidth = (props: Object) => {
  const { theme } = props;
  const { width } = theme;
  const theWidth = width ? width : 500;
  return `width:${em(theWidth)}`;
};
