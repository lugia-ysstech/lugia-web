/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import { Message } from '../css/message';
import type { MessageProps, MessageState } from '../css/message';

export default ThemeProvider(
  class extends React.Component<MessageProps, MessageState> {
    alert: any;
    constructor() {
      super();
    }

    render() {
      return (
        <Message>
          <span>Message</span>
        </Message>
      );
    }
  },
  Widget.Message
);
