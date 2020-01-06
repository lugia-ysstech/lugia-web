/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import colorsFunc from './stateColor';
import { px2remcss } from './units';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import { getBorderRadius } from '@lugia/theme-utils';

export const {
  themeColor,
  darkGreyColor,
  mediumGreyColor,
  hoverColor,
  spiritColor,
  mouseDownColor,
  lightGreyColor,
  transitionTime,
} = colorsFunc();

export const TreeItemHeight = 35;
export const DefaultHeight = 250;
export const ItemBackgroundColor = '#edf0fe';

export const Switch = StaticComponent({
  tag: 'span',
  className: 'Switch',
  css: css`
    font-size: ${px2remcss(14)};
    color: ${mediumGreyColor};
    display: inline-block;
    padding: 0 ${px2remcss(5)};
  `,
  option: { hover: true, active: true },
});
Switch.displayName = 'switcherButton';

export const NullSwitch = StaticComponent({
  extend: Switch,
  className: 'NullSwitch',
  css: css`
    opacity: 0;
  `,
});

export const TreeUl = CSSComponent({
  tag: 'ul',
  className: 'TreeUl',
  normal: {
    selectNames: [['width'], ['background'], ['padding', 'left'], ['padding', 'right']],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { top } = propsConfig;
      return `
        top: ${px2remcss(top)}
      `;
    },
  },
  hover: {
    selectNames: [['background']],
  },
  active: {
    selectNames: [],
  },
  css: css`
    margin: 0;
    overflow: hidden;
    transition-property: background-color, border, border-radius, opacity, box-shadow;
    transition-duration: ${transitionTime};
    position: relative;
    box-sizing: border-box;
  `,
  option: { hover: true },
});

export const Li = CSSComponent({
  tag: 'li',
  className: 'Li',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig: { dragState } = {} } = themeProps;
      const dragStateCss = getDragState(dragState);
      return `${dragStateCss}`;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    min-height: ${px2remcss(20)};
    list-style: none;
    white-space: nowrap;
    position: relative;
    outline: 0;
    user-select: none;
    box-sizing: border-box;
    overflow: hidden;
  `,
});
Li.displayName = 'liItem';

const getSelectIconOpacity = selected => {
  return `opacity: ${selected ? 1 : 0}`;
};

const getLiIcon = (inlineType, itemHeight, selected) => {
  const opacity = getSelectIconOpacity(selected);
  return inlineType === 'ellipse'
    ? ''
    : `
  ::before {
    content: '';
    width: ${px2remcss(6)};
    border-radius: ${px2remcss(4)};
    height: ${px2remcss(itemHeight)};
    background: ${themeColor};
    transition: all ${transitionTime};
    position: absolute;
    left: 0;
    top: 0;
    ${opacity}
  }
  `;
};

const getDragState = dragState => {
  if (dragState === 'dragOver') {
    return 'background: #E8E8E8;';
  } else if (dragState === 'dragOverGapTop') {
    return ` ::after {
      content: '';
      width: 100%;
      border-top: 2px dashed #979797;
      position: absolute;
      left: 0;
      top: 0;
    }`;
  } else if (dragState === 'dragOverGapBottom') {
    return ` ::after {
      content: '';
      width: 100%;
      border-top: 2px dashed #979797;
      position: absolute;
      left: 0;
      bottom: 0;
    }`;
  }
  return '';
};
export const NavLi = CSSComponent({
  tag: 'li',
  className: 'NavLi',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { inlineType, itemHeight, selected } = propsConfig;
      const selectedCSS = getLiIcon(inlineType, itemHeight, selected);
      return `${selectedCSS}`;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    list-style: none;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    outline: 0;
    user-select: none;
    box-sizing: border-box;
  `,
});
NavLi.displayName = 'NavLi';

export const SubTreeWrap = CSSComponent({
  tag: 'ul',
  className: 'SubTreeWrap',
  normal: {
    selectNames: [
      ['width'],
      ['background'],
      ['opacity'],
      ['border'],
      ['margin'],
      ['padding', 'left'],
      ['padding', 'right'],
    ],
  },
  hover: {
    selectNames: [['background'], ['opacity'], ['border']],
  },
  active: {
    selectNames: [],
  },
  css: css`
    margin: 0;
    overflow: hidden;
    transition-property: background-color, border, border-radius, opacity, box-shadow;
    transition-duration: ${transitionTime};
  `,
  option: { hover: true },
});

const getNormalBgColor = (selected: boolean) => {
  return selected ? 'rgba(77,99,255,0.2)' : '';
};

const getNavNolmalBgColor = (selected: boolean, inlineType: 'primary' | 'ellipse') => {
  return !selected
    ? ''
    : inlineType === 'primary'
    ? ''
    : `linear-gradient(to right, ${themeColor}, #808eff)`;
};

export const TitleWrap = CSSComponent({
  tag: 'div',
  className: 'TitleWrap',
  normal: {
    selectNames: [
      ['height'],
      ['lineHeight'],
      ['color'],
      ['font'],
      ['background'],
      ['padding'],
      ['border'],
      ['opacity'],
      ['boxShadow'],
      ['borderRadius'],
    ],

    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { selected, inlineType, __navmenu, shape } = propsConfig;

      const borderRadius = shape === 'round' || inlineType === 'ellipse' ? 99999 : 4;
      const bgColor = __navmenu
        ? getNavNolmalBgColor(selected, inlineType)
        : getNormalBgColor(selected);
      return {
        borderRadius: getBorderRadius(borderRadius),
        background: {
          color: bgColor,
        },
      };
    },
  },
  hover: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['background'],
      ['border'],
      ['opacity'],
      ['boxShadow'],
      ['borderRadius'],
    ],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { mutliple } = propsConfig;
      const color = !mutliple ? `${spiritColor}` : '';

      return {
        background: {
          color,
        },
      };
    },
  },
  active: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['background'],
      ['border'],
      ['opacity'],
      ['boxShadow'],
      ['borderRadius'],
    ],
  },
  disabled: {
    selectNames: [
      ['height'],
      ['color'],
      ['font'],
      ['fontSize'],
      ['background'],
      ['padding'],
      ['border'],
      ['opacity'],
      ['boxShadow'],
      ['borderRadius'],
    ],
    defaultTheme: {
      cursor: 'not-allowed',
      color: lightGreyColor,
      font: {
        fontWeight: 500,
      },
    },
  },

  css: css`
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
    vertical-align: top;
    padding-left: ${px2remcss(10)};
    box-sizing: border-box;
    transition-property: background-color, border, border-radius, opacity, box-shadow;
    transition-duration: 0.2s;
    & span {
      vertical-align: middle;
    }
  `,
  option: { hover: true, active: true, disabled: true },
});

export const TitleSpan = CSSComponent({
  tag: 'div',
  className: 'TitleSpan',
  normal: {
    selectNames: [],
    getCSS: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { describe } = propsConfig;
      const color = describe ? '#ccc' : '';
      return `color: ${color}`;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    opacity: 1;
    transition: all ${transitionTime};
    & > i {
      vertical-align: middle;
    }
  `,
});

TitleSpan.displayName = 'titleSpan';

export const CheckboxContainer = StaticComponent({
  tag: 'div',
  className: 'CheckboxContainer',
  css: css`
    position: relative;
    & label {
      vertical-align: middle;
    }
  `,
});

const getFlexBoxPaddingLeft = pos => {
  const num = pos.split('-').length - 2;
  return num ? num * 22 : 0;
};

export const FlexWrap = CSSComponent({
  tag: 'div',
  className: 'FlexWrap',
  normal: {
    selectNames: [
      ['background'],
      ['height'],
      ['border'],
      ['borderRadius'],
      ['opacity'],
      ['cursor'],
    ],
    getCSS: (themeMeta, themeProps) => {
      const { pos, itemHeight } = themeProps.propsConfig;
      const paddingLeft = getFlexBoxPaddingLeft(pos);
      return `
          padding-left: ${px2remcss(paddingLeft)};
          height: ${px2remcss(itemHeight)}
        `;
    },
  },
  hover: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity']],
  },
  active: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity']],
  },
  disabled: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity'], ['cursor']],
    defaultTheme: {
      cursor: 'not-allowed',
      color: lightGreyColor,
      font: {
        fontWeight: 500,
      },
    },
  },
  css: css`
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    transition-property: background-color, border, border-radius, opacity, box-shadow;
    transition-duration: ${transitionTime};
  `,
  option: { hover: true, active: true },
});

export const FlexBox = CSSComponent({
  tag: 'div',
  className: 'FlexBox',
  normal: {
    selectNames: [['padding']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['padding']],
  },
  css: css`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    padding-right: ${px2remcss(10)};
  `,
});

export const SuffixWrap = StaticComponent({
  tag: 'div',
  className: 'SuffixWrap',
  css: css`
    position: absolute;
    height: 100%;
    right: ${px2remcss(12)};
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    z-index: 100;
  `,
});

export const DragCopyWrap = StaticComponent({
  tag: 'div',
  css: css`
    position: fixed;
    text-align: center;
    width: 186px;
    background-image: linear-gradient(-180deg, #f5f5f5 0%, #e8e8e8 100%);
    border: 1px dashed #ccc;
    border-radius: 2px;
    line-height: 28px;
    z-index: 100;
  `,
});
