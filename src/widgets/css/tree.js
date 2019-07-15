/**
 * UI颜色公共值
 * create by ligx
 *
 * @flow
 */
import colorsFunc from '../css/stateColor';
import { px2remcss } from '../css/units';
import CSSComponent, { css, StaticComponent } from '@lugia/theme-css-hoc';
import { getBorderRadius } from '@lugia/theme-utils';

export const {
  themeColor,
  darkGreyColor,
  mediumGreyColor,
  hoverColor,
  spiritColor,
  mouseDownColor,
} = colorsFunc();
export const MenuItemHeight = 34;
export const DefaultHeight = 250;
export const ItemBackgroundColor = '#edf0fe';

export const Switch = CSSComponent({
  tag: 'span',
  className: 'Switch',
  normal: {
    selectNames: [['color'], ['font']],
  },
  hover: {
    selectNames: [['color'], ['font']],
  },
  active: {
    selectNames: [['color'], ['font']],
  },
  disabled: {
    selectNames: [['color'], ['font']],
  },
  css: css`
    font-size: ${px2remcss(14)};
    color: ${mediumGreyColor};
    display: inline-block;
    padding: 0 ${px2remcss(5)};
    vertical-align: top;
    transition: all 0.3s;
  `,
  option: { hover: true, active: true },
});
Switch.displayName = 'switcherButton';

export const NullSwitch = CSSComponent({
  extend: Switch,
  className: 'NullSwitch',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    opacity: 0;
  `,
});

export const TreeUl = CSSComponent({
  tag: 'ul',
  className: 'TreeUl',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['boxShadow'],
      ['background'],
      ['opacity'],
      ['border'],
      ['borderRadius'],
      ['margin'],
      ['padding'],
    ],
    getCSS: themeMeta => {},
  },
  hover: {
    selectNames: [['boxShadow'], ['background'], ['opacity'], ['border'], ['borderRadius']],
  },
  active: {
    selectNames: [],
  },
  css: css`
    margin: 0;
    overflow: hidden;
    transition: all 0.3s;
  `,
  option: { hover: true },
});

export const Li = StaticComponent({
  tag: 'li',
  className: 'Li',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    min-height: ${px2remcss(MenuItemHeight)};
    line-height: ${px2remcss(MenuItemHeight)};
    list-style: none;
    white-space: nowrap;
    outline: 0;
    user-select: none;
  `,
});
Li.displayName = 'liItem';

export const SubTreeWrap = CSSComponent({
  tag: 'ul',
  className: 'SubTreeWrap',
  normal: {
    selectNames: [['width'], ['background'], ['opacity'], ['border'], ['margin'], ['padding']],
    getCSS: (themeMeta, themeProps) => {},
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
    transition: all 0.3s;
  `,
  option: { hover: true },
});

const getNormalBgColor = (selected: boolean) => {
  return selected ? `${hoverColor}` : '';
};

const getHoverBgCSS = (mutliple: boolean) => {
  return !mutliple ? `${hoverColor}` : '';
};

const getActiveBgCSS = (mutliple: boolean) => {
  return !mutliple ? `${hoverColor}` : '';
};

export const TitleWrap = CSSComponent({
  tag: 'div',
  className: 'TitleWrap',
  normal: {
    selectNames: [['color'], ['font'], ['background'], ['padding'], ['border'], ['borderRadius']],
    getCSS: (themeMeta, themeProps) => {},
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { shape, selected } = propsConfig;
      const borderRadius = shape === 'round' ? 99999 : 4;
      return {
        background: {
          color: getNormalBgColor(selected),
        },
        borderRadius: getBorderRadius(borderRadius),
      };
    },
  },
  hover: {
    selectNames: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { mutliple } = propsConfig;
      return {
        background: {
          color: getHoverBgCSS(mutliple),
        },
      };
    },
  },
  active: {
    selectNames: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
    getThemeMeta: (themeMeta, themeProps) => {
      const { propsConfig } = themeProps;
      const { mutliple } = propsConfig;

      return {
        background: {
          color: getActiveBgCSS(mutliple),
        },
      };
    },
  },
  disabled: {
    selectNames: [['color'], ['font'], ['background'], ['border'], ['borderRadius']],
    getCSS: () => {
      return {
        color: `${mediumGreyColor}`,
        cursor: 'not-allowed',
      };
    },
  },
  css: css`
    flex: 1;
    overflow: hidden;
    vertical-align: top;
    padding-left: ${px2remcss(10)};
    transition: all 0.3s;
  `,
  option: { hover: true, active: true },
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
  `,
});

TitleSpan.displayName = 'titleSpan';

const getFlexBoxPaddingLeft = pos => {
  const num = pos.split('-').length - 2;
  return num ? num * 16 : 0;
};

export const FlexWrap = CSSComponent({
  tag: 'div',
  className: 'FlexWrap',
  normal: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
    getCSS: (themeMeta, themeProps) => {
      const { pos } = themeProps.propsConfig;
      const paddingLeft = getFlexBoxPaddingLeft(pos);
      return `
          padding-left: ${px2remcss(paddingLeft)}
        `;
    },
  },
  hover: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
  },
  active: {
    selectNames: [['background'], ['border'], ['borderRadius'], ['opacity'], ['color']],
  },
  css: css`
    transition: all 0.3s;
    cursor: pointer;
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
  css: css`
    display: flex;
    box-sizing: border-box;
  `,
});

export const CheckBoxWrap = StaticComponent({
  tag: 'div',
  className: 'CheckBoxWrap',
  normal: {
    selectNames: [],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    flex: 1;
  `,
});
