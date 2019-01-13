/**
 *
 * create by guorg
 *
 * @flow
 */
import { createNotification } from './create';

const Notification = {};
Notification.info = createNotification('info');
Notification.success = createNotification('success');
Notification.error = createNotification('error');
Notification.warning = createNotification('warning');
Notification.open = createNotification();

export default Notification;
