/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { Message, MessageContent } from '../css/message';
import type { MessageProps, MessageState } from '../css/message';
import IconContent from './icon-content';

export default class extends React.Component<MessageProps, MessageState> {
  node: any;
  parentDom: (SyntheticEvent<HTMLButtonElement>) => any;
  rootDom: (SyntheticEvent<HTMLButtonElement>) => any;
  closeTimer: any;
  removeTimer: any;
  constructor() {
    super();
    this.state = {
      visible: true,
      opening: true,
      closing: false,
    };
  }
  componentDidMount() {
    this.parentDom = this.node && this.node.parentNode;
    this.rootDom = this.parentDom && this.parentDom.parentNode;
    setTimeout(() => {
      this.setState({
        opening: false,
      });
    }, 300);
    const { time, callBack } = this.props;
    const endTime = time * 1000;
    const closeStart = endTime - 150;
    this.closeTimer = setTimeout(() => {
      this.setState({
        closing: true,
      });
    }, closeStart);
    this.removeTimer = setTimeout(() => {
      this.setState({
        visible: false,
        closing: false,
      });
      callBack && callBack();
      this.removeDom();
    }, endTime);
  }
  componentWillUnmount() {
    clearTimeout(this.closeTimer);
    clearTimeout(this.removeTimer);
  }

  render() {
    const { iconType = 'info', content } = this.props;
    const { visible, opening, closing } = this.state;
    if (visible) {
      return (
        <Message innerRef={node => (this.node = node)}>
          <MessageContent opening={opening} closing={closing}>
            <IconContent iconType={iconType} content={content} />
          </MessageContent>
        </Message>
      );
    }
    return null;
  }
  removeDom = () => {
    if (this.parentDom && this.rootDom) {
      this.rootDom.removeChild(this.parentDom);
    }
  };
}
