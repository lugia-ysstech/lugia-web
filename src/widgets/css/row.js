/**
 * Col
 * create by guorg
 * @flow
 */
import styled from 'styled-components';
import { getMargin } from '../common/ThemeUtils';

type justifyType = 'start' | 'end' | 'center' | 'spaceAround' | 'spaceBetween';
type alignType = 'top' | 'middle' | 'bottom';
type BaseProps = {
  justify?: justifyType,
  align?: alignType,
  gutter?: number | Object,
  getTheme: Function,
};

export type RowProps = {
  onMouseEnter?: Function,
  onMouseOut?: Function,
  onMouseOver?: Function,
  type?: 'default' | 'flex',
  children: any,
} & BaseProps;

export type screensType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type RowState = {
  screens: { [key: screensType]: boolean },
};

type RowCSSProps = {
  type: 'default' | 'flex',
} & BaseProps;

const getTypeCSS = (props: RowCSSProps): string => {
  const { type } = props;
  if (type === 'flex') {
    return `
      display: flex;
      flex-flow: row wrap;
    `;
  }

  return `
    position: relative;
    margin-left: 0;
    margin-right: 0;
    height: auto;
    zoom: 1;
    display: block;
    box-sizing: border-box;
    
    &:after {
      content: "";
      clear: both;
      display:block;
      width:0;
      height:0;
      visibility:hidden;
    }
    
    &::before {
      content: "";
      display: table;
    }
   
  `;
};

const JustifyTypeCSS: { [key: justifyType]: string } = {
  start: 'flex-star',
  end: 'flex-end',
  center: 'center',
  spaceAround: 'space-around',
  spaceBetween: 'space-between',
};
const getJustifyCSS = (props: RowCSSProps) => {
  const { justify = '' } = props;
  if (justify) {
    return `
      justify-content: ${JustifyTypeCSS[justify]};
    `;
  }
};
const AlignTypeCSS: { [key: alignType]: string } = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
};
const getAlignCSS = (props: RowCSSProps) => {
  const { align = '' } = props;
  if (align) {
    return `
      align-items: ${AlignTypeCSS[align]};
    `;
  }
};
const getGutterCSS = (props: RowCSSProps) => {
  const { gutter } = props;
  if (gutter && typeof gutter === 'number') {
    return `
      margin-left: -${gutter / 2}px;
      margin-right: -${gutter / 2}px;
    `;
  }
};

export const RowWrap = styled.div`
  ${getTypeCSS}
  ${getJustifyCSS}
  ${getAlignCSS}
  ${getGutterCSS}
  ${getMargin}
`;
