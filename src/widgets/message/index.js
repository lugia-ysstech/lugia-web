/**
 *
 * create by guorg
 *
 * @flow
 */
import { createMessage } from './create-message';

const message = {};
message.info = createMessage('info');
message.success = createMessage('success');
message.error = createMessage('error');
message.warning = createMessage('warning');
message.loading = createMessage('loading');

export default message;
