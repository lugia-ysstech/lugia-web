/**
 * create by szfeng
 *
 * @flow
 */
import styled, { keyframes } from 'styled-components';
import { FontSizeNumber } from '../css';
import { px2emcss } from '../css/units';
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

const getPaddingBottom = (props: ParagraphProps) => {
  const { type } = props;
  return `padding-bottom: ${type === 'title' ? em(16) : em(8)}`;
};

const getWidth = (props: ParagraphProps) => {
  const { type, lastItem, paragraphWidth, titleWidth } = props;
  if (type === 'title') {
    return `width: ${titleWidth === 0 || titleWidth ? em(titleWidth) : em(176)}`;
  }

  return `width: ${
    paragraphWidth === 0 || paragraphWidth ? em(paragraphWidth) : lastItem ? em(400) : em(480)
  }`;
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

const getPictureWidth = (props: PictrueProps) => {
  const { pictureWidth } = props;
  return `width: ${pictureWidth ? em(pictureWidth) : em(180)}`;
};

const getPictureHeight = (props: PictrueProps) => {
  const { pictureHeight } = props;
  return `height: ${pictureHeight ? em(pictureHeight) : em(180)}`;
};

export const CommonPicture = styled.div`
  ${getPictureWidth};
  ${getPictureHeight};
  background: #e8e8e8;
  position: relative;
  overflow: hidden;
`;
