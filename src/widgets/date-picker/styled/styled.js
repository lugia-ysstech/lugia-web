import { modeStyle } from '../utils/booleanUtils';
import { distance, em, fontSize, getDateWrrap, getThemeProperty } from './utils';
import CSSComponent, { StaticComponent, css } from '@lugia/theme-css-hoc';
export const Box = CSSComponent({
  tag: 'div',
  className: 'Box',
  normal: {
    selectNames: [['width']],
    defaultTheme: {
      width: '100%',
    },
  },
  hover: {
    selectNames: [],
  },
  focus: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    vertical-align: text-top;
    font-size: 0;
    height: 100%;
  `,
});
export const Icons = CSSComponent({
  tag: 'span',
  css: css`
    position: absolute;
    left: ${em(distance.iconLeft)};
    top: 50%;
    transform: translateY(-50%);
  `,
});
export const PanelWrap = CSSComponent({
  tag: 'div',
  className: 'FacePanelContain',
  normal: {
    selectNames: [['boxShadow'], ['borderRadius'], ['border'], ['background', 'color'], ['width']],
  },
  hover: {
    selectNames: [],
  },
  focus: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    font-size: ${fontSize}rem;
    overflow: hidden;
    ${props => getDisabledMask(props)}
  `,
});
function getDisabledMask(props) {
  const { disabled } = props;
  if (disabled) {
    return `
    position: relative;

    ::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,0.6);
      z-index: 222;
      cursor: not-allowed;
    }
    `;
  }
  return '';
}
export const DateWrapper = CSSComponent({
  tag: 'div',
  className: 'DateWrapper',
  normal: {
    selectNames: [],
    getCSS(themeMate, themeConfig = {}) {
      const { propsConfig: { mode, normalSize: { width } = {} } = {} } = themeConfig;
      const { isRange } = modeStyle(mode);
      const newWidth = isRange ? (width - 1) / 2 : width;
      return `
        width:${em(newWidth)};

      `;
    },
  },
  hover: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    padding: ${props => getDateWrrap(props).paddingStyle};
    vertical-align: top;
    font-size: ${fontSize}rem;
    overflow: hidden;
  `,
});

export const DateHeader = StaticComponent({
  tag: 'div',
  className: 'DateHeader',
  css: css`
    font-size: ${em(14)};
  `,
});
export const HeaderTop = StaticComponent({
  tag: 'div',
  className: 'HeaderTop',
  css: css`
    text-align: center;
    margin-bottom: ${em(12)};
  `,
});
export const HeaderTopText = CSSComponent({
  tag: 'span',
  className: 'HeaderTopText',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  hover: {
    selectNames: [['color']],
  },
  active: {
    selectNames: [['color']],
  },
  disabled: {
    selectNames: [['color']],
  },
  css: css`
    cursor: pointer;
  `,
  option: {
    hover: true,
  },
});

function getMargin(props: Object) {
  return `margin-${props.position}:${props.margin}px;`;
}

export const HeaderTopArrow = CSSComponent({
  extend: HeaderTopText,
  className: 'HeaderTopArrow',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    float: ${props => props.position};
    ${getMargin}
    vertical-align: middle;
  `,
});

export const HeaderWeekBox = StaticComponent({
  tag: 'ul',
  css: css`
    padding: 0;
    margin: 0;
    margin-bottom: ${em(12)};
  `,
});
export const HeaderWeek = CSSComponent({
  tag: 'li',
  className: 'HeaderWeek',
  normal: {
    selectNames: [],
    getCSS(themeMeta, themeConfig) {
      const { propsConfig } = themeConfig;
      const { normalSize: { width } = {} } = propsConfig;
      const { weekTitleWidth } = getThemeProperty({ ...propsConfig, width });
      return `
        width: ${em(weekTitleWidth)};
        height: ${em(weekTitleWidth)};
        line-height:${em(weekTitleWidth)};
      `;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    font-size: ${em(14)};
    text-align: center;
    cursor: pointer;
    ${props => getHeaderWeekStyle(props)};
  `,
});
function getHeaderWeekStyle(props) {
  const { normalTheme, hoverTheme } = props;
  const { color } = normalTheme;
  const { color: hoverC } = hoverTheme;
  return `
    color:${color};
    &:hover{
      color:${hoverC};
    }
  `;
}
export const DatePanel = CSSComponent({
  tag: 'div',
  className: 'DatePanel',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    font-size: ${em(14)};
  `,
});
const dateSize = {
  DateChildWidth: 26,
};
export const DateChild = CSSComponent({
  tag: 'span',
  className: 'DateChild',
  normal: {
    selectNames: [],
    getCSS(themeMeta, themeConfig) {
      const { propsConfig = {} } = themeConfig;
      const { normalSize: { width } = {} } = propsConfig;
      const { weekTitleWidth } = getThemeProperty({ ...propsConfig, width });
      return `
        width:${em(weekTitleWidth)};
      `;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin: ${em(3)} ${0};
    ${props => getDateChildStyle(props).chooseWeeks};
    ${props => getRangeChoseStyle(props)};
    ${props => getDateChildStyle(props).todayStyle};
    ${props => getDateChildStyle(props).chooseStyle};
    ${props => rangeBorderDireStyle('7n', 'right', props.rangeNormalTheme)};
    ${props => rangeBorderDireStyle('7n+1', 'left', props.rangeNormalTheme)};
    ${props =>
      props &&
      props.rangeStartIndex &&
      rangeBorderDireStyle(props.rangeStartIndex, 'left', props.rangeNormalTheme)};
    ${props =>
      props &&
      props.rangeEndIndex &&
      rangeBorderDireStyle(props.rangeEndIndex, 'right', props.rangeNormalTheme)};
  `,
});
function getRangeChoseStyle(props) {
  const {
    rangeNormalTheme: { color: textColor, background: { color: bgColor } = {} } = {},
    rangeChose,
  } = props;
  let color = '';
  let newTextColor;
  if (rangeChose) {
    color = bgColor;

    if (textColor) {
      newTextColor = `
        & > i{
            color:${textColor}
            }
        `;
    }
  }
  return `
      background:${color};
      ${newTextColor};
    `;
}
export const DateChildInner = CSSComponent({
  tag: 'i',
  className: 'InMonthDate',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    font-style: normal;
    display: inline-block;
    width: ${em(dateSize.DateChildWidth)};
    height: ${em(dateSize.DateChildWidth)};
    text-align: center;
    line-height: ${em(dateSize.DateChildWidth)};
    vertical-align: text-top;
    cursor: pointer;
    font-size: ${em(14)};
    &:hover {
      ${props => getHoverStyle(props)};
    }

    color: ${props => getNormalStyle(props)};
  `,
});
function getHoverStyle(props) {
  const {
    hoverTheme: {
      color,
      background: { color: bgColor } = {},
      borderRadius: { topLeft, topRight, bottomRight, bottomLeft },
      boxShadow = {},
      border,
    } = {},
    noSingleHoverState,
  } = props;
  if (noSingleHoverState) {
    return '';
  }
  const t = getRadiusValue(topLeft);
  const r = getRadiusValue(topRight);
  const b = getRadiusValue(bottomRight);
  const l = getRadiusValue(bottomLeft);
  return `
    color:${color};
    background:${bgColor};
    border-radius:${t} ${r} ${b} ${l};
    ${getBoxShadow(boxShadow)};
    ${getBorderStyle(border)};
  `;
}
function getNormalStyle(props) {
  const { normalTheme = {}, outMonth, outMonthNormalTheme = {} } = props;
  const { color: outColor } = outMonthNormalTheme;
  const { color } = normalTheme;
  return outMonth ? outColor : color;
}
export const OtherChild = CSSComponent({
  tag: 'span',
  className: 'OtherChild',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    display: inline-block;
    width: ${props => 100 / props.column}%;
    line-height: ${em(40)};
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
  `,
});
export const OtherChildText = CSSComponent({
  tag: 'i',
  className: 'OtherChildText',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    padding: ${em(5)} ${em(10)};
    font-style: normal;
    ${props => getOtherChildTextStyle(props)};
  `,
});

export const RangeWrap = CSSComponent({
  tag: 'div',
  className: 'RangeWrap',
  normal: {
    selectNames: [['boxShadow'], ['width'], ['borderRadius'], ['border'], ['background', 'color']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [],
  },
  css: css`
    font-size: ${fontSize}rem;
    ${props => getDisabledMask(props)};
  `,
});
export const RangeWrapInner = StaticComponent({
  tag: 'div',
  css: css`
    display: flex;
    flex-grow: 1;
  `,
});

const getDateChildStyle = props => {
  const {
    choseDayIndex,
    isChooseWeek,
    startInWeeks,
    endInWeeks,
    isHoverWeek,
    weekHoverStart,
    weekHoverEnd,
    todayIndex,
    noToday,
    selectToday,
    activeTheme = {},
    todayTheme = {},
    rangeWeekDate = {},
    mode,
  } = props;
  const { isDate, isRange, isWeeks } = modeStyle(mode);
  let chooseStyle;
  if (isDate || isRange) {
    const arrChoseDayIndex = Array.isArray(choseDayIndex) ? choseDayIndex : [choseDayIndex];
    const {
      background: { color: bgColor },
      color,
      borderRadius: activeBorderRadius,
      boxShadow = {},
      border,
    } = activeTheme;
    const {
      top: radiusTvalue,
      right: radiusRvalue,
      bottom: radiusBvalue,
      left: radiusLvalue,
    } = getBorderRadius(activeBorderRadius);
    const normalBorderRadius = `border-radius:${radiusTvalue} ${radiusRvalue} ${radiusBvalue} ${radiusLvalue};`;

    chooseStyle = arrChoseDayIndex.reduce((p, n) => {
      return `${p}
    &:nth-child(${n})>i{
      background:${bgColor};
      color:${color};
      ${normalBorderRadius};
      ${getBorderStyle(border)};
      ${getBoxShadow(boxShadow)};
    }`;
    }, '');
  }

  const todayInd = noToday ? '' : selectToday ? todayIndex : '';
  const { border: todayBorder, color: todayColor, borderRadius, background } = todayTheme;
  const todayStyle = `
      &:nth-child(${todayInd})>i{
       ${todayBorder};
        color:${todayColor};
        ${background};
        ${borderRadius};
      }
  `;

  let chooseWeeks;
  if (isWeeks && (isChooseWeek || isHoverWeek)) {
    const {
      normal: {
        background: { color: normalBgColor },
        color: normalWeekColor,
        borderRadius: rangeWeekBorderRadius = {},
      } = {},
      hover: { background: { color: hoverBgColor }, color: hoverWeekColor } = {},
    } = rangeWeekDate;
    const backG = isChooseWeek ? `${normalBgColor}` : `${hoverBgColor}`;
    const textColor = isChooseWeek ? `${normalWeekColor}` : `${hoverWeekColor}`;
    const start = isChooseWeek ? startInWeeks : weekHoverStart;
    const end = isChooseWeek ? endInWeeks : weekHoverEnd;
    const { top: t, right: r, bottom: b, left: l } = getBorderRadius(rangeWeekBorderRadius);
    chooseWeeks = `
    background:${backG};

      &>i{
        color:${textColor};
        border-radius:50%;

      }

      &:nth-child(${start}){
        border-top-left-radius:${t};
        border-bottom-left-radius:${b};
      }

      &:nth-child(${end}){
        border-top-right-radius:${r};
        border-bottom-right-radius:${l};
      }
    `;
  }
  return {
    chooseStyle,
    chooseWeeks,
    todayStyle,
  };
};
function rangeBorderDireStyle(index, dire, rangeNormalTheme) {
  let topRadius = '';
  let botRadius = '';
  if (dire === 'left') {
    topRadius = 'topLeft';
    botRadius = 'bottomLeft';
  }
  if (dire === 'right') {
    topRadius = 'topRight';
    botRadius = 'bottomRight';
  }
  const { borderRadius } = rangeNormalTheme;
  const topR = borderRadius[topRadius];
  const botR = borderRadius[botRadius];
  const topRadiusValue = getRadiusValue(topR);
  const botRadiusValue = getRadiusValue(botR);
  return `
  &:nth-child(${index}){
    border-top-${dire}-radius:${topRadiusValue};
    border-bottom-${dire}-radius:${botRadiusValue};
  }`;
}
function getBorderRadius(borderRadius) {
  const { topLeft, topRight, bottomRight, bottomLeft } = borderRadius || {};
  return {
    top: getRadiusValue(topLeft || 0),
    right: getRadiusValue(topRight || 0),
    bottom: getRadiusValue(bottomRight || 0),
    left: getRadiusValue(bottomLeft || 0),
  };
}
function getRadiusValue(radiusValue: string | number) {
  return typeof radiusValue === 'number' ? em(radiusValue) : radiusValue;
}
function getBorderStyle(border) {
  const {
    top: { width: borderWidthT, color: botderColorT, style: borderSolidT } = {},
    right: { width: borderWidthR, color: botderColorR, style: borderSolidR } = {},
    bottom: { width: borderWidthB, color: botderColorB, style: borderSolidB } = {},
    left: { width: borderWidthL, color: botderColorL, style: borderSolidL } = {},
  } = border;
  return `border-top:${em(borderWidthT)} ${botderColorT} ${borderSolidT};
      border-right:${em(borderWidthR)} ${botderColorR} ${borderSolidR};
      border-bottom:${em(borderWidthB)} ${botderColorB} ${borderSolidB};
      border-left:${em(borderWidthL)} ${botderColorL} ${borderSolidL};`;
}
function getBoxShadow(boxShadow) {
  const { x = 0, y = 0, blur = 0, spread = 0, color: boxShadowColor, type } = boxShadow || {};
  return `box-shadow:${x}px ${y}px ${blur}px ${spread}px ${boxShadowColor} ${
    type === 'inset' ? type : ''
  }`;
}
function getOtherChildTextStyle(props) {
  const { themeProps, isChose } = props;
  const {
    themeConfig: {
      active,
      hover: { color: hoverC },
    },
  } = themeProps;
  const {
    color,
    borderRadius: { topLeft, topRight, bottomLeft, bottomRight },
    background: { color: bgC },
    fontSize,
    font: { size } = {},
    border = {},
    boxShadow = {},
  } = active;
  if (!isChose) {
    return `
      &:hover{
        color:${hoverC};
      }
    `;
  }
  return `
    color:${color};
    background:${bgC};
    border-radius:${em(topLeft)} ${em(topRight)} ${em(bottomLeft)} ${em(bottomRight)};
    font-size:${em(fontSize || size)};
    border:${getBorderStyle(border)};
    ${getBoxShadow(boxShadow)};
  `;
}
