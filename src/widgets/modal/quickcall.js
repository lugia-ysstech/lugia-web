/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import { FncModal } from './fncmodal';
import React from 'react';
import ReactDOM from 'react-dom';

export const quickcall = (
  iconType: 'confirm' | 'info' | 'success' | 'warning' | 'error' = 'info'
) => {
  return (props: Object) => {
    const { title, content, cancelText = '取消', okText = '确定', footer, onOk, onCancel } = props;

    const config: Object = {
      title,
      cancelText,
      okText,
      showIcon: true,
      iconType,
      content,
      onOk,
      onCancel,
    };
    if (footer || footer === null) {
      config.footer = footer;
    }
    const div = document.createElement('div');
    document.body && document.body.appendChild(div);

    ReactDOM.render(<FncModal parentDom={div} {...config} />, div);
  };
};
