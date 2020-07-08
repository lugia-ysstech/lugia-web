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
type ForDesignType = {
  equable?: number,
  data?: Object[],
};
export type RowProps = {
  onMouseEnter?: Function,
  onMouseOut?: Function,
  onMouseOver?: Function,
  type?: 'default' | 'flex',
  children: any,
} & BaseProps &
  ForDesignType;

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
  start: 'flex-start',
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

export function getHalfGutter(gutter: number[]): { halfGutterX?: number, halfGutterY?: number } {
  const result = {};
  if (typeof gutter[0] === 'number') {
    result.halfGutterX = gutter[0] / 2;
  }

  if (typeof gutter[1] === 'number') {
    result.halfGutterY = gutter[1] / 2;
  }

  return result;
}

const getGutterCSS = (props: RowCSSProps): string => {
  const { gutter } = props;
  const marginCSS = [];
  if (gutter && Array.isArray(gutter)) {
    const { halfGutterX, halfGutterY } = getHalfGutter(gutter);
    if (halfGutterX) {
      marginCSS.push(`
      margin-left: -${halfGutterX}px;
      margin-right: -${halfGutterX}px;
    `);
    }
    if (halfGutterY) {
      marginCSS.push(`
      margin-top: -${halfGutterY}px;
      margin-bottom: ${halfGutterY}px;
    `);
    }
  }

  return marginCSS.join(';');
};

export const RowWrap = styled.div`
  ${getTypeCSS}
  ${getJustifyCSS}
  ${getAlignCSS}
  ${getGutterCSS}
  ${getMargin}
`;
