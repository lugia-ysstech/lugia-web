/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message';

let wrap = '';
export const createMessage = (
  iconType: 'info' | 'success' | 'error' | 'warning' | 'loading' = 'info'
) => {
  return (content: string, time?: number = 2, callBack?: Function) => {
    if (typeof document === 'undefined') {
      return;
    }
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.style.cssText = `line-height:
        1.5;text-align:
        center;color: #333;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
        position: fixed;
        z-index: 100000;
        width: 100%;
        top: 16px;
        left: 0;
        pointer-events: none;`;
      if (wrap) {
        document.body && document.body.appendChild(wrap);
      }
    }
    const divs = document.createElement('div');
    wrap.appendChild(divs);
    const config = {
      content,
      iconType,
      time,
      callBack,
    };
    ReactDOM.render(<Message {...config} rootDom={wrap} parentDom={divs} />, divs);
  };
};
