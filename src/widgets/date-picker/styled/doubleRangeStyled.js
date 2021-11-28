/**
 * @Author:cuixiawang
 * @Date:
 */
import CSSComponent from '@lugia/theme-css-hoc';
import styled from 'styled-components';

export const Wrap = CSSComponent({
  tag: 'div',
  className: 'DoubleRangeWrap',
  normal: {
    defaultTheme: { width: '100%' },
    selectNames: [['width'], ['margin']],
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
  css: `
    display: flex;
    align-items: center;
  `,
});

export const RangeSingle = styled.div`
  flex-grow: 1;
`;
