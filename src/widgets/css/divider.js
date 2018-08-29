/**
 * create by liangguodong on 2018/8/24
 *
 * @flow
 */
import colorsFunc from '../css/stateColor';

const { borderDisableColor } = colorsFunc();

export type DividerType = 'horizontal' | 'vertical';
export type DividerPosition = 'left' | 'right';
export type DividerProps = {
  viewClass: string,
  dashed: boolean,
  position?: DividerPosition,
  type: DividerType,
  content?: string,
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
