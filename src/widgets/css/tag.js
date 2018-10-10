/**
 * 标签CSS
 * create by szfeng
 *
 * @flow
 */
import styled from 'styled-components';
import '../css/sv.css';
import Widget from '../consts/index';
import colorsFunc from '../css/stateColor';
import { px2emcss } from '../css/units';
import { FontSize } from '../css';

const em = px2emcss(1.2);

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

const isHasThemeColor = (color: boolean, hasColorTarget: string, noColorTarget: string) => {
  return color ? hasColorTarget : noColorTarget;
};

const getColors = (color, type) => {
  const styles = {};
  const { spiritColor, disabledSpiritFontAndBorderColor, hoverColor } = colorsFunc(color);
  styles.textColor = isHasThemeColor(
    color,
    judgeColors(type, darkGreyColor, color, color, defaultColor),
    judgeColors(type, darkGreyColor, darkGreyColor, dangerColor, defaultColor)
  );

  styles.backgroundColor = isHasThemeColor(
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

  styles.borderColor = isHasThemeColor(
    color,
    judgeColors(type, color, color, color, color),
    judgeColors(type, borderDisableColor, mediumGreyColor, dangerColor, themeColor)
  );

  styles.bgHoverColor = isHasThemeColor(
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

  styles.borderHoverColer = isHasThemeColor(
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

  styles.textHoverColor = isHasThemeColor(
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
  line-height: ${em(18)};
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
  float: left;
`;

export const CloseButton = styled.span`
  padding: ${px2emcss(1.6)(2)} 0 0 ${px2emcss(1.6)(3)};
  font-size: ${em(16)};
  display: inline-block;
`;

CloseButton.displayName = Widget.InputTagCloseButton;
