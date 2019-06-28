/*
 * by wangcuixia
 * */
import { css } from 'styled-components';
import colorsFunc from '../css/stateColor';
import CSSProvider from '../theme/CSSProvider';
import { px2remcss } from '../css/units';
const em = px2remcss;

const { themeColor } = colorsFunc();
export const SwitchContainer = CSSProvider({
  tag: 'span',
  className: 'SwitchContainer',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['border'],
      ['margin'],
      ['padding'],
      ['background'],
      ['opacity'],
    ],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [
      ['width'],
      ['height'],
      ['border'],
      ['margin'],
      ['padding'],
      ['background'],
      ['opacity'],
    ],
  },
  css: css`
    display: inline-block;
  `,
});
export const SwitchWrapper = CSSProvider({
  tag: 'span',
  className: 'SwitchWrapper',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['fontSize'],
      ['borderRadius'],
      ['border'],
      ['boxShadow'],
      ['color'],
      ['font'],
    ],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  disabled: {
    selectNames: [['background'], ['border']],
  },
  css: css`
    display: inline-block;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
    &:focus {
      outline: none;
    }
  `,
});

export const SwitchText = CSSProvider({
  tag: 'span',
  className: 'SwitchText',
  normal: {
    selectNames: [['fontSize'], ['color'], ['padding']],
    getCSS(themeMeta, themeProps) {
      const { fontSize, fontWeight, color } = themeMeta;
      const {
        propsConfig: { textPosition, textBox },
      } = themeProps;
      return `
          
          & > *:first-child {
          ${textBox};
            ${textPosition};
            font-size:${em(fontSize)};
            font-weight:${fontWeight};
            color:${color};
            & > *:first-child{
              font-size:${em(fontSize)};
              font-weight:${fontWeight};
              color:${color};
            }
          }         
        `;
    },
  },
  css: css`
    user-select: none;
    & > *:first-child {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      font-style: normal;
      font-size: ${em(12)};
      color: #fff;
      line-height: ${em(12)};
    }
  `,
});

export const SwitchCircle = CSSProvider({
  tag: 'span',
  className: 'SwitchButton',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['borderRadius'],
      ['border'],
      ['boxShadow'],
      ['color'],
    ],
    getCSS(themeMeta, themeProps) {
      const { height } = themeMeta;
      const {
        propsConfig: { switchButtonPosition },
      } = themeProps;
      return `
          ${switchButtonPosition};
          & > *:first-child {
            height:${em(height)};            
          }
        `;
    },
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [
      ['width'],
      ['height'],
      ['background'],
      ['borderRadius'],
      ['border'],
      ['boxShadow'],
    ],
  },
  disabled: {
    selectNames: [['background'], ['border'], ['width'], ['height'], ['borderRadius']],
  },
  css: css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    transition: 1s;
    -webkit-transition: all 0.2s;
    & > *:first-child {
      display: block;
      color: ${themeColor};
      animation: rotate 1.5s linear infinite;
      position: relative;
      & > *:first-child {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      &::before {
        transform: scale(0.65);
      }
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
});
