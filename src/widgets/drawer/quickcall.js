/**
 *
 * create by Shine_Lee
 *
 * @flow
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { FncDrawer } from './fncdrawer';

export const quickcall = () => {
  return (props: Object) => {
    const {
      visible,
      children,
      closable = false,
      title,
      onClose,
      mask = true,
      placement,
      getTheme,
      maskClosable = true,
      handle = false,
      onToggle,
    } = props;
    const config: Object = {
      visible,
      children,
      closable,
      title,
      onClose,
      mask,
      placement,
      getTheme,
      maskClosable,
      handle,
      onToggle,
    };
    const div = document.createElement('div');
    document.body && document.body.appendChild(div);

    ReactDOM.render(<FncDrawer parentDom={div} {...config} />, div);
  };
};
