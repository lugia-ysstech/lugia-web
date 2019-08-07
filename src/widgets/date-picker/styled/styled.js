import styled, { css } from 'styled-components';
import { valueInRange } from '../../common/Math';
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
const { hoverColor, normalColor, disableColor, spiritColor } = themeColor;
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
    selectNames: [['boxShadow'], ['background', 'color'], ['width']],
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
        color: '#fff',
      },
    },
    getCSS(themeMate) {
      const { width } = themeMate;
      return `
        width:${em(width)}
      `;
    },
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
    getCSS(themeMate, themeConfig) {
      const { width: themeMateWidth } = themeMate;
      const { propsConfig } = themeConfig;
      const { width } = getThemeProperty({ ...propsConfig, width: themeMateWidth });
      return `
        width:${em(width)}
      `;
    },
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
export const RangeInput = CSSComponent({
  tag: 'div',
  className: 'RangeInput',
  css: css`
    display: inline-block;
    border: 1px solid #e8e8e8;
    border-radius: ${em(borderRadius)};

    & input {
      border: none;
      text-align: center;
    }
    & input:focus {
      border: none;
      box-shadow: none;
    }
  `,
});
export const RangeSpan = CSSComponent({
  tag: 'span',
  className: 'RangeSpan',
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
      color: '#333',
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
      const { width } = themeMeta;
      const { propsConfig } = themeConfig;
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
  `,
});
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
      const { width } = themeMeta;
      const { propsConfig } = themeConfig;
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
    ${props => (props.rangeChose ? `background:${spiritColor}` : '')};
    ${props => getDateChildStyle(props).todayStyle};
    ${props => getDateChildStyle(props).chooseStyle};
    ${rangeBorderDireStyle('7n', 'right')};
    ${rangeBorderDireStyle('7n+1', 'left')};
    ${props =>
      props && props.rangeStartIndex && rangeBorderDireStyle(props.rangeStartIndex, 'left')};
    ${props => props && props.rangeEndIndex && rangeBorderDireStyle(props.rangeEndIndex, 'right')};
  `,
});
export const DateChildInner = CSSComponent({
  tag: 'i',
  className: 'DateChildInner',
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
      background: ${hoverColor};
      color: #fff;
      border-radius: 50%;
    }

    color: ${props => (props.outMonth ? '#ccc' : '#666')};
  `,
});

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
    selectNames: [['boxShadow'], ['background', 'color']],
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
        color: '#fff',
      },
      width: 600,
    },
    getCSS(themeMate, themeConfig) {
      const { width } = themeMate;
      const { propsConfig } = themeConfig;
      const { rangeWrapWidth } = getThemeProperty({ ...propsConfig, width });
      return `
        width:${em(rangeWrapWidth)};
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
    font-size: ${fontSize}rem;
    width: ${props => em(getThemeProperty(props).rangeWrapWidth)};
  `,
});
export const RangeInnerTop = CSSComponent({
  tag: 'span',
  className: 'RangeInnerTop',
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
    display: block;
  `,
});
export const RangeInputWrap = CSSComponent({
  tag: 'div',
  className: 'RangeInputWrap',
  normal: {
    selectNames: [],
    getCSS(themeMate, themeConfig) {
      // console.log(themeMate, themeConfig);
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
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: ${em(borderRadius)};
    width: ${props => em(props.width)};
  `,
});
export const RangeInputInner = CSSComponent({
  tag: 'span',
  className: 'RangeInputInner',
  normal: {
    selectNames: [],
    getCSS(themeMate, themeConfig) {
      //  console.log(themeMate, themeConfig);
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
    & input {
      border: none;
      text-align: center;
    }

    & input:focus {
      border: none;
      box-shadow: none;
    }

    display: inline-block;
    background: ${props => (props.disabled ? disableColor : '')};
  `,
});
export const RangeMiddleSpan = CSSComponent({
  tag: 'span',
  className: 'RangeMiddleSpan',
  normal: {
    selectNames: [],
    getCSS(themeMate, themeConfig) {
      // console.log(themeMate, themeConfig);
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
  } = props;
  const arrChoseDayIndex = Array.isArray(choseDayIndex) ? choseDayIndex : [choseDayIndex];
  const chooseStyle = arrChoseDayIndex.reduce((p, n) => {
    return `${p}
    &:nth-child(${n})>i{
      background:${normalColor};
      color:#fff;
      border-radius:50%;
    }`;
  }, '');
  const todayInd = noToday ? '' : selectToday ? todayIndex : '';
  let todayStyle = `
      &:nth-child(${todayInd})>i{
        border:1px solid ${normalColor};        
        color:#666;
        background:#fff;      
        border-radius:50%;
        &:hover {
          background: ${hoverColor};
          color: #fff;
          border-radius: 50%;
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
function rangeBorderDireStyle(index, dire) {
  return `
  &:nth-child(${index}){
    border-top-${dire}-radius:${em(20)};
    border-bottom-${dire}-radius:${em(20)};
  }`;
}
