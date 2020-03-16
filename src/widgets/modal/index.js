/**
 *
 * create by guorg
 *
 * @flow
 */
import Modal from './modal';
import { quickcall } from './quickcall';
import createShowModal from './create-show-modal';

Modal.confirm = quickcall('confirm');
Modal.info = quickcall('info');
Modal.success = quickcall('success');
Modal.error = quickcall('error');
Modal.warning = quickcall('warning');
Modal.createShowModal = createShowModal;
export default Modal;
