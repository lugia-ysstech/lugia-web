/**
 * create by szfeng
 *
 * @flow
 */
import styled, { keyframes } from 'styled-components';
import { FontSizeNumber } from '../css';
import { px2emcss } from '../css/units';
import { toNumber } from '../common/NumberUtils';

const em = px2emcss(FontSizeNumber);
const getCommonAnimation = (props: Object) => {
  const { distance = 1000 } = props;
  const animationCSS = keyframes`
    0% {
      transform: translate(0, -50%);
    }
    100% {
      transform: translate(${em(distance)}, -50%);
    }
  `;
  return animationCSS;
};

const getAnimationItemCSS = (props: Object) => {
  const { width, height } = props;
  return `width: ${em(width)};
  height: ${em(height)};
  box-shadow: 0 0 ${em(width * 2)} ${em(width)} #f2f2f2;
  left: -${em(width * 2)}; 
  `;
};

export const AnimationItem = styled.div`
  ${getAnimationItemCSS};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  background: #f2f2f2;
  animation: ${getCommonAnimation} 1s linear infinite;
`;

/**
 * avatar
 */

export const CommonAvatar = styled.div`
  display: inline-block;
  width: ${em(32)};
  height: ${em(32)};
  border-radius: 50%;
  background: #e8e8e8;
  position: relative;
  overflow: hidden;
`;

/**
 * paragraph
 */

const getPaddingBottom = (props: Object) => {
  const { type } = props;
  return `padding-bottom: ${type === 'title' ? em(16) : em(8)}`;
};

const getWidth = (props: Object) => {
  let { paragraphWidth, titleWidth } = props;
  const { type, lastItem } = props;

  titleWidth = toNumber(titleWidth, 176);
  paragraphWidth = toNumber(paragraphWidth, lastItem ? 400 : 480);

  if (type === 'title') {
    return `width: ${em(titleWidth)}`;
  }

  return `width: ${em(paragraphWidth)}`;
};

export const ParagraphWrap = styled.div`
  ${getWidth};
  padding: ${em(8)} 0;
  ${getPaddingBottom};
`;

export const CommonParagraph = styled.div`
  height: ${em(16)};
  background: #e8e8e8;
  position: relative;
  overflow: hidden;
`;

/**
 * picture
 */

const getPictureWidth = (props: Object) => {
  let { pictureWidth } = props;
  pictureWidth = toNumber(pictureWidth, 180);
  return `width: ${em(pictureWidth)}`;
};

const getPictureHeight = (props: Object) => {
  let { pictureHeight } = props;
  pictureHeight = toNumber(pictureHeight, 180);
  return `height: ${em(pictureHeight)}`;
};

export const CommonPicture = styled.div`
  ${getPictureWidth};
  ${getPictureHeight};
  background: #e8e8e8;
  position: relative;
  overflow: hidden;
`;
