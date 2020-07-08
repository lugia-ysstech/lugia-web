/**
 * Col
 * create by guorg
 * @flow
 */
import styled from 'styled-components';
import { getHalfGutter } from './row';

// const share = 24;
// const width = 100 / share;

type BasicType = {
  span: number,
  offset?: number,
  pull?: number,
  push?: number,
  order?: number,
  gutter?: number,
};
type ForDesignType = {
  equable: number,
};
export type ColProps = {
  children?: any,
  onMouseEnter?: Function,
  onMouseOut?: Function,
  onMouseOver?: Function,
  scrrenSize?: string,
} & BasicType &
  ForDesignType;
export type ColState = {};
type ColCSSProps = {
  width: number,
} & BasicType;

const getSpanCSS = (props: ColCSSProps): string => {
  const { span = 1, width } = props;
  return `
      width: ${width * span}%;
    `;
};
const getOffsetCSS = (props: ColCSSProps): string => {
  const { offset = 0, width } = props;
  return `
      margin-left: ${width * offset}%;
    `;
};
const getPullAndPushCSS = (props: ColCSSProps) => {
  const { push = 0, pull = 0, width } = props;
  if (push) {
    return `
      left: ${width * push}%;
    `;
  }
  if (pull) {
    return `
      right: ${width * pull}%;
    `;
  }
};
const getOrderCSS = (props: ColCSSProps) => {
  const { order = 0 } = props;
  if (order) {
    return `
      order: ${order};
    `;
  }
};
const getGutterCSS = (props: ColCSSProps) => {
  const { gutter } = props;
  const gutterCSS = [];
  if (gutter && Array.isArray(gutter)) {
    const { halfGutterX, halfGutterY } = getHalfGutter(gutter);
    if (halfGutterX) {
      gutterCSS.push(`
      padding-left: ${halfGutterX}px;
      padding-right: ${halfGutterX}px;
    `);
    }
    if (halfGutterY) {
      gutterCSS.push(`
      padding-top: ${halfGutterY}px;
      padding-bottom: ${halfGutterY}px;
    `);
    }
  }

  return gutterCSS.join(';');
};

export const ColWrap = styled.div`
  display: block;
  box-sizing: border-box;
  float: left;
  position: relative;
  min-height: 1px;
  ${getSpanCSS}
  ${getOffsetCSS}
  ${getPullAndPushCSS}
  ${getOrderCSS}
  ${getGutterCSS}
`;
