/**
 *
 * create by guorg
 *
 * @flow
 */
import Modal from './modal';
import { quickcall } from './quickcall';

Modal.confirm = quickcall('confirm');
Modal.info = quickcall('info');
Modal.success = quickcall('success');
Modal.error = quickcall('error');
Modal.warning = quickcall('warning');

export default Modal;
