/**
 * 标签CSS
 * create by szfeng
 *
 * @flow
 */
import styled from 'styled-components';
import '../css/sv.css';
import CommonIcon from '../icon';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';
import { FontSize, FontSizeNumber } from '../css';

const em = px2emcss(FontSizeNumber);

export const {
  themeColor,
  mediumGreyColor,
  dangerColor,
  darkGreyColor,
  borderRadius,
  defaultColor,
  borderDisableColor,
} = colorsFunc();

const judgeColors = (
  type: string,
  primaryColor: string,
  basicColor: string,
  presetsColor: string,
  defaultColor: string
) => {
  const isPrimary = type === 'primary';
  const isBasic = type === 'basic';
  const isPresets = type === 'presets';

  return isPrimary ? primaryColor : isBasic ? basicColor : isPresets ? presetsColor : defaultColor;
};

const getColor = (color: boolean, hasColorTarget: string, noColorTarget: string): string => {
  return color ? hasColorTarget : noColorTarget;
};

const getColors = (color, type) => {
  const styles = {};
  const { spiritColor, hoverColor } = colorsFunc(color);
  styles.textColor = getColor(
    color,
    judgeColors(type, darkGreyColor, color, color, defaultColor),
    judgeColors(type, darkGreyColor, darkGreyColor, dangerColor, defaultColor)
  );

  styles.backgroundColor = getColor(
    color,
    judgeColors(type, color, defaultColor, spiritColor, color),
    judgeColors(
      type,
      borderDisableColor,
      defaultColor,
      colorsFunc(dangerColor).spiritColor,
      themeColor
    )
  );

  styles.borderColor = getColor(
    color,
    judgeColors(type, color, color, color, color),
    judgeColors(type, borderDisableColor, mediumGreyColor, dangerColor, themeColor)
  );

  styles.bgHoverColor = getColor(
    color,
    judgeColors(type, color, defaultColor, spiritColor, hoverColor),
    judgeColors(
      type,
      borderDisableColor,
      defaultColor,
      colorsFunc(dangerColor).spiritColor,
      colorsFunc(themeColor).hoverColor
    )
  );

  styles.borderHoverColer = getColor(
    color,
    judgeColors(type, color, hoverColor, hoverColor, hoverColor),
    judgeColors(
      type,
      borderDisableColor,
      mediumGreyColor,
      colorsFunc(dangerColor).hoverColor,
      colorsFunc(themeColor).hoverColor
    )
  );

  styles.textHoverColor = getColor(
    color,
    judgeColors(type, hoverColor, hoverColor, hoverColor, defaultColor),
    judgeColors(
      type,
      mediumGreyColor,
      mediumGreyColor,
      colorsFunc(dangerColor).hoverColor,
      defaultColor
    )
  );

  return styles;
};

const getTypeCSS = props => {
  const { type, Theme } = props;
  const { color } = Theme;
  const {
    textColor,
    backgroundColor,
    borderColor,
    bgHoverColor,
    textHoverColor,
    borderHoverColer,
  } = getColors(color, type);

  return `background: ${backgroundColor};
            color: ${textColor};
            border: 1px solid ${borderColor}; 

            :hover {
                background: ${bgHoverColor};
                color: ${textHoverColor};
                border-color: ${borderHoverColer};
    } `;
};

const getRadius = props => {
  const { shape } = props;
  return shape === 'round' ? `${em(20)}` : `${em(borderRadius)}`;
};

const getAnimationCSS = props => {
  const { isClose } = props;
  return isClose === true
    ? 'opacity: 0; transform: scale(0,1)'
    : 'opacity: 1; transform: scale(1,1)';
};

const getPadding = props => {
  const { closeable } = props;
  return closeable ? `0 ${em(5)} 0 ${em(8)}` : ` 0 ${em(8)}`;
};

export const TagContainer = styled.div`
  display: inline-block;
  height: ${em(20)};
  border-radius: ${getRadius};
  font-size: ${FontSize};
  cursor: pointer;
  overflow: hidden;
  transition: all 0.15s ease-in;
  padding: ${getPadding};
  ${getAnimationCSS};
  ${getTypeCSS};
`;

export const ItemText = styled.span`
  display: inline-block;
  height: ${em(18)};
  line-height: ${em(20)};
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
  float: left;
`;
export const CloseButtonWrap = styled.span`
  display: inline-block;
  padding: ${em(2)} 0 0 ${em(3)};
`;

export const CloseButton = styled(CommonIcon)`
  font-size: ${em(16)};
`;

CloseButton.displayName = 'tagCloseButton';
