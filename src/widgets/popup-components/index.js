import React from 'react';
import ReactDOM from 'react-dom';
import Message from '../message/message';
import Notification from '../notification/notification';

let wrap = '';
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

const popupComps = {
  message(props) {
    if (typeof document === 'undefined') {
      return;
    }
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.style.cssText = messageStyle;
      if (wrap) {
        document.body && document.body.appendChild(wrap);
      }
    }
    const divs = document.createElement('div');
    wrap.appendChild(divs);

    ReactDOM.render(<Message {...props} rootDom={wrap} parentDom={divs} />, divs);
  },

  notification(props) {
    const { placement = 'topRight', iconType } = props;

    const div = document.getElementsByClassName(`lugia-notification-${placement}`);
    let wrap = div && div[0];
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = `lugia-notification-${placement}`;
      wrap.style.cssText = `
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

      document.body && document.body.appendChild(wrap);
    }
    const divs = document.createElement('div');
    wrap.appendChild(divs);
    const config = iconType ? { iconType } : null;
    ReactDOM.render(<Notification {...props} {...config} rootDom={wrap} parentDom={divs} />, divs);
  },
};

export default popupComps;
