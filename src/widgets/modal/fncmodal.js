/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Modal from './modal';

export class FncModal extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      visible: true,
    };
  }
  handleOk = () => {
    const { onOk } = this.props;
    this.setState(
      {
        visible: false,
      },
      this.removeDom
    );
    onOk && onOk();
  };
  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState(
      {
        visible: false,
      },
      this.removeDom
    );
    onCancel && onCancel();
  };
  render() {
    const { visible } = this.state;
    const { content } = this.props;
    return (
      <Modal {...this.props} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        {content}
      </Modal>
    );
  }
  removeDom = () => {
    const { visible } = this.state;
    const { parentDom } = this.props;
    if (!visible && parentDom) {
      unmountComponentAtNode(parentDom);
      document.body && document.body.removeChild(parentDom);
    }
  };
}
