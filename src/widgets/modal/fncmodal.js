/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';
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
    this.setState({
      visible: false,
    });
    onOk && onOk();
  };
  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      visible: false,
    });
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
}
