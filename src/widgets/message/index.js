/**
 *
 * create by guorg
 *
 * @flow
 */
import { createMessage } from './create-message';

const Message = {};
Message.info = createMessage('info');
Message.success = createMessage('success');
Message.error = createMessage('error');
Message.warning = createMessage('warning');
Message.loading = createMessage('loading');

export default Message;
