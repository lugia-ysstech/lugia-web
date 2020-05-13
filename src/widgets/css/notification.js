/**
 * Layout
 * create by guorg
 * @flow
 */
import styled, { css, keyframes } from 'styled-components';
import Icon from '../icon';
import get from './theme-common-dict';
import { px2remcss } from './units';

export type NotificationProps = {
  duration?: number | null,
  title: string | React.ReactNode,
  description: string | React.ReactNode,
  icon?: string,
  iconType?: string,
  placement?: 'topRight' | 'bottomLeft' | 'bottomRight' | 'topLeft',
} & ForTestType &
  ForRemoveType;
type ForRemoveType = {
  parentDom?: any,
  rootDom?: any,
};
export type NotificationState = {
  visible: boolean,
  opening: boolean,
  closing: boolean,
};
type CSSProps = {
  opening: boolean,
  closing: boolean,
  placement: 'topRight' | 'bottomLeft' | 'bottomRight' | 'topLeft',
};
type ForTestType = {
  create?: boolean,
};

const em = px2remcss;
const getAnimateDirection = (props: CSSProps): 'left' | 'right' => {
  const { placement } = props;
  if (placement === 'bottomLeft' || placement === 'topLeft') {
    return 'left';
  }
  return 'right';
};
const getAnimate = (props: CSSProps) => {
  const { opening, closing } = props;
  const Direction = getAnimateDirection(props);
  const value = em(-410);
  const zero = em(0);
  const openAnimate = keyframes`
    0% {
      ${Direction}: ${value};
    }

    50% {
      ${Direction}: ${zero};
    }
  `;
  const closeAnimate = keyframes`
    0% {
      opacity: 1;
      ${Direction}: ${zero};
    }

    50% {
      opacity: 0.2;
      ${Direction}: ${value};
    }
  `;
  if (opening) {
    return css`
      animation: ${openAnimate} 0.3s ease-in;
    `;
  }
  if (closing) {
    return css`
      animation: ${closeAnimate} 0.4s ease-in;
    `;
  }
};
const getOutBoxShadow = () => {
  const { x, y, color, blur, spread } = get('normalBoxShadow');
  return `${em(x)} ${em(y)} ${em(blur)} ${em(spread)} ${color}`;
};
export const Notification = styled.div`
  font-size: ${em(14)};
  box-sizing: border-box;
  padding: ${em(20)} ${props => (props.needIcon ? em(44) : em(20))};
  border-radius: ${em(get('largeBorderRadiusValue'))};
  box-shadow: ${getOutBoxShadow};
  background: #fff;
  line-height: 1.5;
  position: relative;
  margin-bottom: ${em(16)};
  ${getAnimate};
`;
export const Content = styled.div`
  box-sizing: border-box;
`;
export const Title = styled.div`
  font-size: ${em(16)};
  font-weight: 500;
  color: ${get('blackColor')};
  margin-bottom: ${em(8)};
  line-height: ${em(24)};
  display: inline-block;
  word-break: break-all;
`;
export const Text = styled.div`
  font-size: ${em(14)};
  font-weight: 500;
  color: ${get('darkGreyColor')};
  word-break: break-all;
`;
export const CloseIcon: Object = styled(Icon)`
  font-size: ${em(get('xsFontSize'))};
`;
export const CloseIconWrap = styled.div`
  position: absolute;
  right: ${em(16)};
  top: ${em(11.5)};
  color: ${get('mediumGreyColor')};
  outline: none;
  cursor: pointer;
  :hover {
    color: ${get('darkGreyColor')};
  }
`;
export const Icons: Object = styled(Icon)`
  position: absolute;
  font-size: ${em(20)};
  line-height: ${em(22)};
  top: ${em(22)};
  left: ${em(16)};
  cursor: default;
  color: ${props => (props.iconColor ? get(props.iconColor) : get('themeColor'))};
`;
