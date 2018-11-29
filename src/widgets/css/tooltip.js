/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import { px2emcss } from './units';
import type { ThemeType } from '@lugia/lugia-web';
import colorsFunc from '../css/stateColor';

const { defaultColor } = colorsFunc();

const em = px2emcss(1.2);

export const LargeHeight = em(30);
export const SmallHeight = em(24);
export const DefaultHeight = em(26);

export type ToolTipSize = 'small' | 'default' | 'large';
export type ToolTipDirectionType = 'Left' | 'Right' | 'Down' | 'Up';

type ToolTipStyleProps = {
  //TODO:ThemeType 暂无fontColor 等合并master后增加
  theme: Object,
  fx: ToolTipDirectionType,
  size?: ToolTipSize,
};
export const RadiusSize = em(4);
export const Left = 'left';
export const Right = 'right';
export const Down = 'bottom';
export const Up = 'top';

export const DefaultBackgroundColor = 'rgba(0, 0, 0, 0.75)';
export const getFontColor = (props: ToolTipStyleProps) => {
  const { theme } = props;
  //TODO:ThemeType 暂无fontColor 等合并master后增加
  const { fontColor } = theme;
  return fontColor ? fontColor : defaultColor;
};
export const getColor = (props: ToolTipStyleProps) => {
  const { theme } = props;
  const { color } = theme;
  return color ? color : DefaultBackgroundColor;
};
export const getSize = (props: ToolTipStyleProps) => {
  const { size } = props;
  return `height:${
    size === 'large' ? LargeHeight : size === 'small' ? SmallHeight : DefaultHeight
  };`;
};

export const getTriggerByArrow = (props: ToolTipStyleProps) => {
  const { fx } = props;
  switch (fx) {
    case Up:
      return `padding-top: ${em(8)}`;
    case Down:
      return `padding-bottom: ${em(10)}`;
    case Left:
      return `padding-left: ${em(8)}`;
    case Right:
    default:
      return `padding-right: ${em(8)}`;
  }
};
export const getArrow = (props: ToolTipStyleProps) => {
  const { fx } = props;
  switch (fx) {
    case Up:
      return `
        left: ${em(16)};
        top: ${em(3)};
        border-width: 0 ${em(5)} ${em(5)};
        border-bottom-color: ${getColor(props)};
      `;
    case Down:
      return `
        left: ${em(16)};
        bottom: ${em(3)};
        border-width: ${em(5)} ${em(5)} 0;
        border-top-color: ${getColor(props)};
      `;
    case Left:
      return `
        top: ${em(8)};
        left: ${em(3)};
        border-width: ${em(5)} ${em(5)} ${em(5)} 0;
        border-right-color: ${getColor(props)};
      `;
    case Right:
      return `
        top: ${em(8)};
        right: ${em(3)};
        border-width: ${em(5)} 0 ${em(5)} ${em(5)};
        border-left-color: ${getColor(props)};
      `;
    default:
      return '';
  }
};
