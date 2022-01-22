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
import { modalListener } from './create-show-modal';

export const quickcall = (
  iconType: 'confirm' | 'info' | 'success' | 'warning' | 'error' = 'info'
) => {
  return (props: Object) => {
    const div = document.createElement('div');
    document.body && document.body.appendChild(div);

    ReactDOM.render(
      <FncModal
        parentDom={div}
        {...props}
        iconType={iconType}
        showIcon={true}
        listener={modalListener}
      />,
      div
    );
  };
};
