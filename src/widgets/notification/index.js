/**
 *
 * create by guorg
 *
 * @flow
 */
import { createNotification } from './create';

const notification = {};
notification.info = createNotification('info');
notification.success = createNotification('success');
notification.error = createNotification('error');
notification.warning = createNotification('warning');
notification.open = createNotification();

export default notification;
