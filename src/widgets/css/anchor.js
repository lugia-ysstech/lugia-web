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
  linkHeight?: number,
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
  `,
});

const getPositionCSS = (props: CSSProps) => {
  const { index, slideType, height, linkHeight = 24 } = props;
  if (index || index >= 0) {
    let top = index * linkHeight;
    if (slideType !== 'line') {
      top += (linkHeight - (height || defaultHeight)) / 2;
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
      const { propsConfig: { slideType, index, linkHeight } = {} } = themeProps;
      const { height } = themeMeta;
      if (slideType === 'circle') {
        return `border-radius: 50%;${getPositionCSS({ slideType, index, height, linkHeight })}`;
      }

      return `width: 2px;height:24px;${getPositionCSS({ slideType, index, height, linkHeight })}`;
    },
  },
  css: css`
    ${getIndicatorCSS()}
  `,
});
