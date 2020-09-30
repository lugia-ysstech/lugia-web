import React from 'react';
import ReactDOM from 'react-dom';
import Message from '../message/message';
import Notification from '../notification/notification';
import { FncModal } from '../modal/fncmodal';
import PopupComps from './fncPopupComps';

let wrap = '';
let messageWrap = '';
const messageStyle = `
  line-height: 1.5;
  text-align:center;
  color: #333;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  position: fixed;
  z-index: 100000;
  width: 100%;
  top: 16px;
  left: 0;
  pointer-events: none;
`;

function getPosition(placement: string): string {
  if (placement === 'bottomLeft') {
    return 'left: 0px; bottom: 24px;';
  }
  if (placement === 'bottomRight') {
    return 'right: 0px; bottom: 24px;';
  }
  if (placement === 'topLeft') {
    return 'left: 0px; top: 24px;';
  }
  return 'right: 0px; top: 24px;';
}
function getNotificationStyle(placement) {
  return `
    line-height: 1.5; 
    color: rgba(0, 0, 0, 0.65);
    box-sizing: border-box; 
    margin: 0;
    padding: 0; 
    list-style: none;
    position: fixed; 
    z-index: 4001;
    width: 384px; 
    margin-right: 24px;
    ${getPosition(placement)}    
  `;
}

const popupComps = {
  message(props = {}) {
    if (typeof document === 'undefined') {
      return;
    }
    if (!messageWrap) {
      messageWrap = document.createElement('div');
      messageWrap.style.cssText = messageStyle;
      if (messageWrap) {
        document.body && document.body.appendChild(messageWrap);
      }
    }
    const divs = document.createElement('div');
    messageWrap.appendChild(divs);

    ReactDOM.render(<Message {...props} rootDom={messageWrap} parentDom={divs} />, divs);
  },

  notification(props = {}) {
    const { placement = 'topRight', iconType } = props;
    const div = document.getElementsByClassName(`lugia-notification-${placement}`);
    let wrap = div && div[0];
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = `lugia-notification-${placement}`;
      wrap.style.cssText = getNotificationStyle(placement);
      document.body && document.body.appendChild(wrap);
    }
    const divs = document.createElement('div');
    wrap.appendChild(divs);
    const config = iconType ? { iconType } : null;
    ReactDOM.render(<Notification {...props} {...config} rootDom={wrap} parentDom={divs} />, divs);
  },

  modal(props = {}) {
    const div = document.createElement('div');
    document.body && document.body.appendChild(div);
    ReactDOM.render(<FncModal parentDom={div} {...props} />, div);
  },

  tooltip(props, nodeId) {
    if (!nodeId) {
      return;
    }
    props.popupName = 'Tootiple';
    renderPopupComponent(props, nodeId);
  },

  popover(props = {}, nodeId) {
    if (!nodeId) {
      return;
    }
    props.popupName = 'Popover';
    renderPopupComponent(props, nodeId);
  },

  popconfirm(props, nodeId) {
    if (!nodeId) {
      return;
    }
    props.popupName = 'Popconfirm';
    renderPopupComponent(props, nodeId);
  },
};

function getTargetDom(nodeId) {
  return document.getElementById(nodeId);
}
function renderPopupComponent(props, nodeId) {
  const { popupName } = props;
  if (typeof document === 'undefined') {
    return;
  }
  if (!wrap) {
    wrap = document.createElement('div');
    if (wrap) {
      document.body && document.body.appendChild(wrap);
    }
  } else {
    document.body && document.body.appendChild(wrap);
  }

  ReactDOM.render(
    <PopupComps
      {...props}
      parentDom={wrap}
      popupName={popupName}
      getPopTargetDom={() => getTargetDom(nodeId)}
    />,
    wrap
  );
}

export default popupComps;
