import { css } from 'styled-components';
import { valueInRange } from '../../common/Math';
import { modeStyle } from '../utils/booleanUtils';
import {
  borderRadius,
  distance,
  em,
  fontSize,
  getDateWrrap,
  getThemeProperty,
  themeColor,
} from './utils';
import CSSComponent from '@lugia/theme-css-hoc';
const { hoverColor, normalColor, defaultColor, darkGreyColor } = themeColor;
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
    defaultTheme: {
      boxShadow: {
        color: 'rgba(0, 0, 0, 0.1)',
        x: 2,
        y: 2,
        blur: 3,
        spread: 2,
        type: 'outset',
      },
      background: {
        color: defaultColor,
      },
    },
  },
  hover: {
    selectNames: [],
  },
  css: css`
    font-size: ${fontSize}rem;
  `,
});
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

export const DateHeader = CSSComponent({
  tag: 'div',
  className: 'DateHeader',
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
export const HeaderTop = CSSComponent({
  tag: 'div',
  className: 'HeaderTop',
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
    text-align: center;
    margin-bottom: ${em(12)};
  `,
});
export const HeaderTopText = CSSComponent({
  tag: 'span',
  className: 'HeaderTopText',
  normal: {
    selectNames: [['color'], ['font'], ['fontSize']],
    defaultTheme: {
      font: {
        size: 14,
        weight: 500,
      },
      color: darkGreyColor,
    },
  },
  hover: {
    selectNames: [['color']],
    defaultTheme: {
      color: hoverColor,
    },
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

export const HeaderWeekBox = CSSComponent({
  tag: 'ul',
  className: 'HeaderWeekBox',
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
  const {
    color,
    fontSize,
    font: { size },
  } = normalTheme;
  const {
    color: hoverColor,
    fontSize: hoverFont,
    font: { size: hoverSize },
  } = hoverTheme;
  return `
    color:${color};
    font-size:${em(size || fontSize)};
    &:hover{
      color:${hoverColor};
      font-size:${em(hoverSize || hoverFont)};
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
  const { rangeNormalTheme: { background: { color: bgColor } = {} } = {}, rangeChose } = props;
  let color = '';
  if (rangeChose) {
    color = bgColor;
  }
  return `
      background:${color};
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
      boxShadow: { x, y, blur, spread, color: boxShadowColor, type } = {},
      border,
    } = {},
  } = props;
  const t = getRadiusValue(topLeft);
  const r = getRadiusValue(topRight);
  const b = getRadiusValue(bottomRight);
  const l = getRadiusValue(bottomLeft);
  return `
    color:${color};
    background:${bgColor};
    border-radius:${t} ${r} ${b} ${l};
    box-shadow:${x}px ${y}px ${blur}px ${spread}px ${boxShadowColor} ${
    type === 'inset' ? type : ''
  };
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
    display: inline-block;
    width: ${props => 100 / props.column}%;
    line-height: ${em(40)};
    font-size: ${em(14)};
    text-align: center;
    white-space: nowrap;

    &:hover {
      color: ${hoverColor};
    }

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
    border-radius: ${em(borderRadius)};
    ${props => (props.isChose ? `background:${normalColor};color:#fff;` : '')};
  `,
});
export const RangeWrap = CSSComponent({
  tag: 'div',
  className: 'RangeWrap',
  normal: {
    selectNames: [['boxShadow'], ['width'], ['borderRadius'], ['border'], ['background', 'color']],
    defaultTheme: {
      boxShadow: {
        color: 'rgba(0, 0, 0, 0.1)',
        x: 2,
        y: 2,
        blur: 3,
        spread: 2,
        type: 'outset',
      },
      background: {
        color: defaultColor,
      },
      width: 600,
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
    font-size: ${fontSize}rem;
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
    hoverTheme = {},
  } = props;
  const arrChoseDayIndex = Array.isArray(choseDayIndex) ? choseDayIndex : [choseDayIndex];
  const {
    background: { color: bgColor },
    color,
    borderRadius: {
      topLeft: radiusT,
      topRight: radiusR,
      bottomRight: radiusB,
      bottomLeft: radiusL,
    },
    boxShadow: { x, y, blur, spread, color: boxShadowColor, type } = {},
    border,
  } = activeTheme;
  const {
    borderRadius: {
      topLeft: hoverRadiusT,
      topRight: hoverRadiusR,
      bottomRight: hoverRadiusB,
      bottomLeft: hoverRadiusL,
    },
  } = hoverTheme;
  const radiusTvalue = getRadiusValue(radiusT);
  const radiusRvalue = getRadiusValue(radiusR);
  const radiusBvalue = getRadiusValue(radiusB);
  const radiusLvalue = getRadiusValue(radiusL);

  const radiusTvalueH = getRadiusValue(hoverRadiusT);
  const radiusRvalueH = getRadiusValue(hoverRadiusR);
  const radiusBvalueH = getRadiusValue(hoverRadiusB);
  const radiusLvalueH = getRadiusValue(hoverRadiusL);

  const normalBorderRadius = `border-radius:${radiusTvalue} ${radiusRvalue} ${radiusBvalue} ${radiusLvalue};`;
  const chooseStyle = arrChoseDayIndex.reduce((p, n) => {
    return `${p}
    &:nth-child(${n})>i{
      background:${bgColor};
      color:${color};
      ${normalBorderRadius};
      ${getBorderStyle(border)};
      box-shadow:${x}px ${y}px ${blur}px ${spread}px ${boxShadowColor} ${
      type === 'inset' ? type : ''
    };
    }`;
  }, '');
  const todayInd = noToday ? '' : selectToday ? todayIndex : '';
  let todayStyle = `
      &:nth-child(${todayInd})>i{
        border:1px solid ${normalColor};
        color:${darkGreyColor};
        background:${defaultColor};
        ${normalBorderRadius};
        &:hover {
          background: ${hoverColor};
          color:#fff;
          border-radius:${radiusTvalueH} ${radiusRvalueH} ${radiusBvalueH} ${radiusLvalueH};
        }
      }

  `;
  let chooseWeeks;
  if (isChooseWeek || isHoverWeek) {
    const backG = isChooseWeek ? `${normalColor}` : `${hoverColor}`;
    const start = isChooseWeek ? startInWeeks : weekHoverStart;
    const end = isChooseWeek ? endInWeeks : weekHoverEnd;
    const todayIn = valueInRange(todayIndex, [start, end]);
    if (todayIn) {
      todayStyle = `
      &:nth-child(${todayInd})>i{
        border:1px solid transparent;
        border-radius:50%;
      }
  `;
    }
    chooseWeeks = `
    background:${backG};

      &>i{
        color:#fff;
        border-radius:50%;
      }

      &:nth-child(${start}){
        border-top-left-radius:20px;
        border-bottom-left-radius:20px;
      }

      &:nth-child(${end}){
        border-top-right-radius:20px;
        border-bottom-right-radius:20px;
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
function getRadiusValue(radiusValue: string | number) {
  return typeof radiusValue === 'number' ? em(radiusValue) : radiusValue;
}
function getBorderStyle(border) {
  const {
    top: { width: borderWidthT, color: botderColorT, style: borderSolidT },
    right: { width: borderWidthR, color: botderColorR, style: borderSolidR },
    bottom: { width: borderWidthB, color: botderColorB, style: borderSolidB },
    left: { width: borderWidthL, color: botderColorL, style: borderSolidL },
  } = border;
  return `border-top:${em(borderWidthT)} ${botderColorT} ${borderSolidT};
      border-right:${em(borderWidthR)} ${botderColorR} ${borderSolidR};
      border-bottom:${em(borderWidthB)} ${botderColorB} ${borderSolidB};
      border-left:${em(borderWidthL)} ${botderColorL} ${borderSolidL};`;
}
