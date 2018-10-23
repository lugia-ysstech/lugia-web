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
import { Message, MessageContent } from '../css/message';
import type { MessageProps, MessageState } from '../css/message';
import IconContent from './icon-content';

export default ThemeProvider(
  class extends React.Component<MessageProps, MessageState> {
    alert: any;
    constructor() {
      super();
      this.state = {
        visible: true,
        opening: true,
        closing: false,
      };
    }
    componentDidMount() {
      setTimeout(() => {
        this.setState({
          opening: false,
        });
      }, 300);
      const { time } = this.props;
      const endTime = time * 1000;
      const closeStart = endTime - 150;
      setTimeout(() => {
        this.setState({
          closing: true,
        });
      }, closeStart);
      setTimeout(() => {
        this.setState({
          visible: false,
          closing: false,
        });
      }, endTime);
    }

    render() {
      const { iconType = 'info', content } = this.props;
      const { visible, opening, closing } = this.state;
      if (visible) {
        return (
          <Message>
            <MessageContent opening={opening} closing={closing}>
              <IconContent iconType={iconType} content={content} />
            </MessageContent>
          </Message>
        );
      }
      return null;
    }
  },
  Widget.Message
);
