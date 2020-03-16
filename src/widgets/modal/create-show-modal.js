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

export default (defaultProps: Object) => {
  return (props: Object) => {
    const div = document.createElement('div');
    document.body && document.body.appendChild(div);
    if (!defaultProps) {
      defaultProps = {};
    }
    if (!props) {
      props = {};
    }
    const lastProps = { ...defaultProps, ...props };
    ReactDOM.render(<FncModal parentDom={div} {...lastProps} />, div);
  };
};
