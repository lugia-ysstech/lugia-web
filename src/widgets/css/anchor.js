/**
 * Anchor
 * create by guorg
 * @flow
 */
import CSSComponent, { css } from '@lugia/theme-css-hoc';
import get from './theme-common-dict';
import { getBorder } from '@lugia/theme-utils';

export type AnchorProps = {
  children: any,
  affix?: boolean,
  offsetTop?: number,
  slideType?: 'circle' | 'line',
  slideLine?: boolean,
  useHref?: boolean,
  onClick?: Function,
  data?: Object[],
};
export type AnchorState = {
  activeLink: string,
};
type CSSProps = {
  index?: number,
  slideType: 'circle' | 'line' | 'hollowCircle',
  slideLine?: boolean,
  height?: number,
};
const defaultWidth = 8;
const defaultHeight = 8;

export const Anchor = CSSComponent({
  tag: 'div',
  className: 'Anchor',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['border', ['left']],
      ['padding'],
      ['margin'],
      ['borderRadius'],
      ['background'],
      ['opacity'],
      ['boxShadow'],
    ],
    defaultTheme: {
      border: {
        left: {
          width: 1,
          style: 'solid',
          color: get('borderColor'),
        },
      },
      padding: {
        bottom: 6,
      },
      background: {
        color: '#fff',
      },
    },
  },

  css: css`
    position: relative;
    box-sizing: border-box;
    & > div:first-child {
      padding-top: 6px;
    }
  `,
});

const getPositionCSS = (props: CSSProps) => {
  const { index, slideType, height } = props;
  if (index || index >= 0) {
    let top = index * 24;
    if (slideType !== 'line') {
      top += height || defaultHeight;
    }
    return `top: ${top}px; left:-0.5px;`;
  }
  return 'display: none;';
};

function getIndicatorCSS() {
  return 'position:absolute;transition: all 0.3s ease-in-out;transform: translateX(-50%);';
}

export const Indicator = CSSComponent({
  tag: 'div',
  className: 'Indicator',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['padding'],
      ['margin'],
      ['border'],
      ['borderRadius'],
      ['background'],
      ['opacity'],
      ['boxShadow'],
    ],
    defaultTheme: {
      width: defaultWidth,
      height: defaultHeight,
      background: {
        color: get('themeColor'),
      },
    },
    getCSS(themeMeta, themeProps) {
      const { propsConfig: { slideType, index } = {} } = themeProps;
      const { height } = themeMeta;
      if (slideType === 'circle') {
        return `border-radius: 50%;${getPositionCSS({ slideType, index, height })}`;
      }

      return `width: 2px;height:24px;${getPositionCSS({ slideType, index, height })}`;
    },
  },
  css: css`
    ${getIndicatorCSS()}
  `,
});
