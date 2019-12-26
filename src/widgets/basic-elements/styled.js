import { css } from 'styled-components';
import CSSProvider from '../theme/CSSProvider';

export const Box = CSSProvider({
  tag: 'span',
  className: 'Container',
  normal: {
    selectNames: [
      ['width'],
      ['height'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['margin'],
      ['background'],
      ['opacity'],
    ],
  },
  css: css`
    display: table-cell;
  `,
});
