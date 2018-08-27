/**
 * create by liangguodong on 2018/8/24
 *
 * @flow
 */
import colorsFunc from '../css/stateColor';

const { borderDisableColor } = colorsFunc();

export type DividerType = 'horizontal' | 'vertical';
export type DividerPosition = 'left' | 'right';

export const getBeforePositionCSS = (props: DividerProps) => {
  const { position, content } = props;
  console.log(content);
  if (content !== undefined) {
    return `width:${position === 'left' ? '5%' : position === 'right' ? '95%' : '50%'}`;
  }
  return 'width :100%';
};
export const getAfterPositionCSS = (props: DividerProps) => {
  const { position, content } = props;
  if (content !== undefined) {
    return `width:${position === 'left' ? '95%' : position === 'right' ? '5%' : '50%'}`;
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
