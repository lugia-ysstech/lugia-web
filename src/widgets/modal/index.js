/**
 *
 * create by guorg
 *
 * @flow
 */
import Modal from './modal';
import { quickcall } from './quickcall';
import createShowModal, { modalListener } from './create-show-modal';

Modal.confirm = quickcall('confirm');
Modal.info = quickcall('info');
Modal.success = quickcall('success');
Modal.error = quickcall('error');
Modal.warning = quickcall('warning');
Modal.createShowModal = createShowModal;

Modal.onShow = (cb: (props: Object) => void) => {
  return modalListener.on('onShow', (props: Object) => {
    cb(props);
  });
};

Modal.onOk = (cb: (props: Object) => void) => {
  return modalListener.on('onOk', (props: Object) => {
    cb(props);
  });
};

Modal.onCancel = (cb: (props: Object) => void) => {
  return modalListener.on('onCancel', (props: Object) => {
    cb(props);
  });
};

export default Modal;
