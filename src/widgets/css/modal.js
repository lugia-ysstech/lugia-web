/**
 * Layout
 * create by guorg
 * @flow
 */
import { px2emcss } from '../css/units';
import colorsFunc from '../css/stateColor';
import styled, { keyframes } from 'styled-components';
import Icon from '../icon';

type IconType = 'confirm' | 'info' | 'success' | 'warning' | 'error';
type FunctionPropsType = {
  showIcon?: boolean,
  iconType?: IconType,
};
export type ModalProps = {
  title?: string | React.ReactNode,
  children: string | React.ReactNode,
  visible: boolean,
  cancelText?: string,
  okText?: string,
  onOk: Function,
  onCancel: Function,
  confirmLoading?: boolean,
  footer?: string | React.ReactNode,
  maskClosable?: boolean,
} & FunctionPropsType;
export type ModalState = {
  visible: boolean,
  closing: boolean,
  opening: boolean,
};
type CSSProps = {
  showIcon: boolean,
  iconType: IconType,
  closing: boolean,
  opening: boolean,
};

const FontSize = 1.4;
const em = px2emcss(FontSize);
const specialEM = px2emcss(1.6);
const {
  themeColor,
  successColor,
  warningColor,
  dangerColor,
  blackColor,
  darkGreyColor,
} = colorsFunc();
export const IconInfo = {
  info: { class: 'lugia-icon-reminder_info_circle', color: themeColor },
  confirm: { class: 'lugia-icon-reminder_question_circle', color: warningColor },
  success: { class: 'lugia-icon-reminder_check_circle', color: successColor },
  error: { class: 'lugia-icon-reminder_close_circle', color: dangerColor },
  warning: { class: 'lugia-icon-reminder_exclamation_circle', color: warningColor },
};

export const Wrap = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
`;
const getAnimate = (props: CSSProps) => {
  const { closing, opening } = props;
  const OpenKeyframe = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;
  const CloseKeyframe = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
  `;
  if (closing) {
    return `
     animation:${CloseKeyframe} .4s;
     `;
  }
  if (opening) {
    return `
     animation:${OpenKeyframe} .4s;
     `;
  }
};
export const ModalMask = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 99999;
  ${getAnimate};
`;
export const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
`;

export const Modal = styled.div`
  box-sizing: border-box;
  font-size: ${FontSize}rem;
  position: relative;
  width: ${em(520)};
  top: ${em(100)};
  margin: 0 auto;
  z-index: 99999;
  ${getAnimate};
`;
export const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  border: 0;
  border-radius: ${em(4)};
  box-shadow: 0 ${em(4)} ${em(12)} rgba(0, 0, 0, 0.15);
  ${props => (props.showIcon ? `padding-left: ${em(20)};` : '')};
`;
export const ModalClose = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: ${em(64)};
  height: ${em(64)};
  cursor: pointer;
  text-align: center;
  line-height: ${em(64)};
`;
export const ModalTitle = styled.div`
  padding: ${specialEM(30)} ${specialEM(80)} ${specialEM(16)} ${specialEM(30)};
  border-radius: ${specialEM(4)} ${specialEM(4)} 0 0;
  background: #fff;
  color: ${blackColor};
  font-size: ${em(16)};
  font-weight: 500;
`;
export const ModalBody = styled.div`
  padding: 0 ${em(80)} 0 ${em(30)};
  color: ${darkGreyColor};
  word-wrap: break-word;
`;
export const ModalFooter = styled.div`
  padding: ${em(22)} ${em(80)} ${em(26)} ${em(30)};
  border-radius: 0 0 4px 4px;
  & > button {
    margin-left: ${em(14)};
  }
  & > button:first-child {
    margin-left: 0;
  }
`;
export const Icons: Object = styled(Icon)`
  font-size: ${em(16)};
`;
const getIconColor = (props: CSSProps) => {
  const { iconType } = props;
  return `color: ${IconInfo[iconType].color};`;
};
export const BigIcons: Object = styled(Icon)`
  font-size: ${em(20)};
  position: absolute;
  left: ${px2emcss(2)(22)};
  top: ${px2emcss(2)(28)};
  ${getIconColor};
`;
